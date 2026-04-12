"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { createScreening, getLatestScreening } from "@/lib/db/screenings";
import { listWorkspacesForUser } from "@/lib/db/workspaces";
import { cookies } from "next/headers";
import type { Json } from "@/types/database";
import { z } from "zod";

const PersistScreeningSchema = z.object({
  answers: z
    .record(z.string(), z.string())
    .refine((obj) => Object.keys(obj).length <= 100, {
      message: "Too many answer entries (max 100)",
    }),
  engineVersion: z.string().min(1),
  state: z.string().optional(),
  zip: z.string().optional(),
  householdSize: z.number().int().positive().optional(),
  language: z.string().optional(),
  results: z.array(
    z.object({
      programId: z.string().min(1),
      confidenceScore: z.number().min(0).max(100),
      eligibilityTier: z.string().optional(),
      estimatedValue: z.string().nullable().optional(),
      reasons: z.record(z.string(), z.unknown()),
    }),
  ),
});

type PersistScreeningInput = z.infer<typeof PersistScreeningSchema>;

/**
 * Server action to persist a screening result. Called after the client-side
 * engine runs, if the user is authenticated and has a workspace.
 *
 * Returns the screening ID on success, or null if the user is not
 * authenticated (screening still works client-only in that case).
 */
export async function persistScreening(rawInput: unknown) {
  const parsed = PersistScreeningSchema.safeParse(rawInput);
  if (!parsed.success) {
    console.error("Invalid screening input:", parsed.error.message);
    return { screeningId: null };
  }
  const input: PersistScreeningInput = parsed.data;

  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // Not authenticated: screening still works client-only
    return { screeningId: null };
  }

  // Read active workspace from cookie and verify membership
  const cookieStore = await cookies();
  const workspaceId = cookieStore.get("bf-workspace")?.value;

  if (!workspaceId) {
    return { screeningId: null };
  }

  // SECURITY: verify the user is actually a member of this workspace.
  // The cookie is set client-side and could be forged.
  const { data: memberships } = await listWorkspacesForUser(supabase, user.id);
  const isMember = memberships?.some((m) => m.workspace_id === workspaceId);
  if (!isMember) {
    return { screeningId: null };
  }

  const { data, error } = await createScreening(supabase, {
    workspaceId,
    answers: input.answers as unknown as Json,
    engineVersion: input.engineVersion,
    state: input.state ?? null,
    zip: input.zip ?? null,
    householdSize: input.householdSize ?? null,
    language: input.language ?? "en",
    results: input.results.map((r) => ({
      programId: r.programId,
      confidenceScore: r.confidenceScore,
      eligibilityTier: r.eligibilityTier,
      estimatedValue: r.estimatedValue,
      reasons: r.reasons as unknown as Json,
    })),
  });

  if (error) {
    console.error("Failed to persist screening:", error.message);
    return { screeningId: null };
  }

  return { screeningId: data?.id ?? null };
}

/**
 * Server action to fetch the latest screening's answers for re-screening.
 * Returns the answers record so the screening page can pre-populate fields.
 */
export async function getLatestAnswers(): Promise<{
  answers: Record<string, string> | null;
}> {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { answers: null };
  }

  const cookieStore = await cookies();
  const workspaceId = cookieStore.get("bf-workspace")?.value;

  if (!workspaceId) {
    return { answers: null };
  }

  // SECURITY: verify the user is actually a member of this workspace.
  // The cookie is set client-side and could be forged.
  const { data: memberships } = await listWorkspacesForUser(supabase, user.id);
  const isMember = memberships?.some((m) => m.workspace_id === workspaceId);
  if (!isMember) {
    return { answers: null };
  }

  const { data: screening } = await getLatestScreening(supabase, workspaceId);

  if (!screening?.answers) {
    return { answers: null };
  }

  // The answers column is typed as Json; cast to the expected shape
  return { answers: screening.answers as Record<string, string> };
}
