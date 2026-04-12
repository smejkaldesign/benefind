"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { createScreening } from "@/lib/db/screenings";
import { listWorkspacesForUser } from "@/lib/db/workspaces";
import { cookies } from "next/headers";
import type { Json } from "@/types/database";

interface PersistScreeningInput {
  answers: Record<string, string>;
  engineVersion: string;
  state?: string;
  zip?: string;
  householdSize?: number;
  language?: string;
  results: Array<{
    programId: string;
    confidenceScore: number;
    eligibilityTier?: string;
    estimatedValue?: string | null;
    reasons: Record<string, unknown>;
  }>;
}

/**
 * Server action to persist a screening result. Called after the client-side
 * engine runs, if the user is authenticated and has a workspace.
 *
 * Returns the screening ID on success, or null if the user is not
 * authenticated (screening still works client-only in that case).
 */
export async function persistScreening(input: PersistScreeningInput) {
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
