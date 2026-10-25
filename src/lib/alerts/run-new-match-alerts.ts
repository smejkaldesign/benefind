import { createHash } from "node:crypto";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Json, TablesInsert } from "@/types/database";
import {
  findNewMatches,
  knownProgramIds,
  toResultRows,
  type NewMatch,
} from "./new-matches";
import { newMatchEmailsEnabled } from "./preferences";
import { createUnsubscribeToken } from "./unsubscribe-token";
import { renderNewMatchEmail } from "../email/new-match-alert";
import { sendEmail } from "../email/resend";
import {
  getEntitlements,
  type WorkspaceTier,
  type WorkspaceType,
} from "../billing/entitlements";

type Client = SupabaseClient<Database>;

const PAGE_SIZE = 200;

interface LatestScreeningRow {
  id: string;
  workspace_id: string;
  answers: Json;
  screening_results: Array<{ program_id: string; eligibility_tier: string }>;
  workspaces: {
    owner_user_id: string;
    tier: WorkspaceTier;
    type: WorkspaceType;
  } | null;
}

interface WorkspaceMatches {
  screeningId: string;
  workspaceId: string;
  matches: NewMatch[];
}

export interface NewMatchAlertSummary {
  dryRun: boolean;
  screeningsChecked: number;
  workspacesWithNewMatches: number;
  usersWithNewMatches: number;
  emailsSent: number;
  programsAnnounced: number;
  skippedOptedOut: number;
  skippedNoVerifiedEmail: number;
  skippedNotEntitled: number;
  failed: number;
}

interface RunOptions {
  dryRun: boolean;
  appOrigin: string;
  /** Required unless dryRun. */
  resendApiKey?: string;
  /** Required unless dryRun. */
  signingSecret?: string;
}

/**
 * Checks every workspace's latest screening against the current engine and
 * emails each owner once about programs they have not seen. Writes happen
 * only after a successful send, so a failed send is retried on the next run.
 * new_match_alerts has a unique (workspace_id, program_id) key, so a second
 * run in the same day finds nothing new and sends nothing.
 */
export async function runNewMatchAlerts(
  client: Client,
  options: RunOptions,
): Promise<NewMatchAlertSummary> {
  const summary: NewMatchAlertSummary = {
    dryRun: options.dryRun,
    screeningsChecked: 0,
    workspacesWithNewMatches: 0,
    usersWithNewMatches: 0,
    emailsSent: 0,
    programsAnnounced: 0,
    skippedOptedOut: 0,
    skippedNoVerifiedEmail: 0,
    skippedNotEntitled: 0,
    failed: 0,
  };

  const { data: programs, error: programsError } = await client
    .from("programs")
    .select("id")
    .eq("status", "active");
  if (programsError) throw new Error("Failed to load programs");
  const catalog = new Set((programs ?? []).map((p) => p.id));

  const byOwner = new Map<string, WorkspaceMatches[]>();

  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await client
      .from("screenings")
      .select(
        "id, workspace_id, answers, screening_results(program_id, eligibility_tier), workspaces!inner(owner_user_id, tier, type)",
      )
      .eq("is_latest", true)
      .is("deleted_at", null)
      .is("workspaces.deleted_at", null)
      // New-match alerts are a Premium feature for personal workspaces.
      .eq("workspaces.tier", "premium")
      .eq("workspaces.type", "individual")
      .order("id")
      .range(from, from + PAGE_SIZE - 1);
    if (error) throw new Error("Failed to load screenings");
    const rows = (data ?? []) as unknown as LatestScreeningRow[];
    if (rows.length === 0) break;
    summary.screeningsChecked += rows.length;

    const { data: announced, error: announcedError } = await client
      .from("new_match_alerts")
      .select("workspace_id, program_id")
      .in(
        "workspace_id",
        rows.map((r) => r.workspace_id),
      );
    if (announcedError) throw new Error("Failed to load sent alerts");

    for (const row of rows) {
      if (!row.workspaces || !getEntitlements(row.workspaces).newMatchAlerts) {
        summary.skippedNotEntitled += 1;
        continue;
      }
      const ownerId = row.workspaces.owner_user_id;
      if (!ownerId || !isAnswers(row.answers)) continue;
      const known = knownProgramIds(
        row.screening_results ?? [],
        (announced ?? [])
          .filter((a) => a.workspace_id === row.workspace_id)
          .map((a) => a.program_id),
      );
      const matches = findNewMatches({
        answers: row.answers,
        knownProgramIds: known,
        catalogProgramIds: catalog,
      });
      if (matches.length === 0) continue;
      summary.workspacesWithNewMatches += 1;
      const list = byOwner.get(ownerId) ?? [];
      list.push({
        screeningId: row.id,
        workspaceId: row.workspace_id,
        matches,
      });
      byOwner.set(ownerId, list);
    }

    if (rows.length < PAGE_SIZE) break;
  }

  summary.usersWithNewMatches = byOwner.size;
  if (byOwner.size === 0) return summary;

  const ownerIds = [...byOwner.keys()];
  const { data: settings, error: settingsError } = await client
    .from("user_settings")
    .select("user_id, email_notifications, new_match_emails")
    .in("user_id", ownerIds);
  if (settingsError) throw new Error("Failed to load user settings");
  const settingsByUser = new Map((settings ?? []).map((s) => [s.user_id, s]));

  for (const [userId, workspaces] of byOwner) {
    try {
      const { data: userData, error: userError } =
        await client.auth.admin.getUserById(userId);
      if (userError || !userData?.user) {
        summary.skippedNoVerifiedEmail += 1;
        continue;
      }
      if (
        !newMatchEmailsEnabled(
          settingsByUser.get(userId),
          userData.user.user_metadata,
        )
      ) {
        summary.skippedOptedOut += 1;
        continue;
      }
      const email = userData.user.email;
      if (!email || !userData.user.email_confirmed_at) {
        summary.skippedNoVerifiedEmail += 1;
        continue;
      }

      const programNames = [
        ...new Set(
          workspaces.flatMap((w) => w.matches.map((m) => m.programName)),
        ),
      ];
      const pairs = workspaces.flatMap((w) =>
        w.matches.map((m) => `${w.workspaceId}:${m.programId}`),
      );

      if (options.dryRun) {
        summary.programsAnnounced += pairs.length;
        continue;
      }

      const unsubscribeUrl = `${options.appOrigin}/api/alerts/unsubscribe?token=${encodeURIComponent(
        createUnsubscribeToken(userId, options.signingSecret!),
      )}`;
      const rendered = renderNewMatchEmail({
        programNames,
        dashboardUrl: `${options.appOrigin}/dashboard`,
        unsubscribeUrl,
      });

      await sendEmail(options.resendApiKey!, {
        to: email,
        ...rendered,
        headers: {
          "List-Unsubscribe": `<${unsubscribeUrl}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
        idempotencyKey: `new-match-${createHash("sha256")
          .update(`${userId}|${pairs.sort().join(",")}`)
          .digest("hex")}`,
      });
      summary.emailsSent += 1;
      summary.programsAnnounced += pairs.length;

      for (const w of workspaces) {
        await recordAnnouncement(client, w);
      }
    } catch (err) {
      summary.failed += 1;
      console.error(
        "new-match alert failed:",
        err instanceof Error ? err.message : "unknown error",
      );
    }
  }

  return summary;
}

/**
 * Marks the matches as announced and adds them to the latest screening so the
 * dashboard lists them. Existing rows for the same programs (stored in a
 * non-pursuable tier) are replaced instead of duplicated.
 */
async function recordAnnouncement(client: Client, w: WorkspaceMatches) {
  const alertRows: TablesInsert<"new_match_alerts">[] = w.matches.map((m) => ({
    workspace_id: w.workspaceId,
    program_id: m.programId,
    screening_id: w.screeningId,
  }));
  const { error: alertError } = await client
    .from("new_match_alerts")
    .upsert(alertRows, {
      onConflict: "workspace_id,program_id",
      ignoreDuplicates: true,
    });
  if (alertError) throw new Error("Failed to record sent alert");

  const programIds = w.matches.map((m) => m.programId);
  const { error: deleteError } = await client
    .from("screening_results")
    .delete()
    .eq("screening_id", w.screeningId)
    .in("program_id", programIds);
  if (deleteError) throw new Error("Failed to replace screening results");

  const { error: insertError } = await client
    .from("screening_results")
    .insert(toResultRows(w.screeningId, w.workspaceId, w.matches));
  if (insertError) throw new Error("Failed to add screening results");
}

function isAnswers(value: Json): value is Record<string, string> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
