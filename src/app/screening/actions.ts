"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import {
  createScreening,
  getLatestScreening,
  upsertCompanyProfile,
  replaceCompanyMatches,
} from "@/lib/db/screenings";
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

  const { data: screening } = await getLatestScreening(supabase, workspaceId);

  if (!screening?.answers) {
    return { answers: null };
  }

  // The answers column is typed as Json; cast to the expected shape
  return { answers: screening.answers as Record<string, string> };
}

// ── Company screening persistence ──────────────────────────────────────────

interface PersistCompanyScreeningInput {
  answers: Record<string, string>;
  engineVersion: string;
  companyName?: string;
  state?: string;
  industry?: string;
  companyAge?: string;
  employeeCount?: string;
  annualRevenue?: string;
  hasRnd?: boolean;
  rndPercentage?: number;
  ownershipDemographics?: string[];
  isRural?: boolean;
  exportsOrPlans?: boolean;
  isHiring?: boolean;
  hasCleanEnergy?: boolean;
  results: Array<{
    programId: string;
    confidenceScore: number;
    eligible: boolean;
    estimatedValue?: string | null;
    reasons: Record<string, unknown>;
  }>;
}

/**
 * Server action to persist a company screening result.
 * Upserts the company_profiles row and inserts company_program_matches.
 *
 * Returns the company profile ID on success, or null if unauthenticated.
 */
export async function persistCompanyScreening(
  input: PersistCompanyScreeningInput,
) {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { companyId: null };
  }

  const cookieStore = await cookies();
  const workspaceId = cookieStore.get("bf-workspace")?.value;

  if (!workspaceId) {
    return { companyId: null };
  }

  // SECURITY: verify workspace membership
  const { data: memberships } = await listWorkspacesForUser(supabase, user.id);
  const isMember = memberships?.some((m) => m.workspace_id === workspaceId);
  if (!isMember) {
    return { companyId: null };
  }

  // Upsert company profile (one per workspace)
  const { data: profile, error: profileError } = await upsertCompanyProfile(
    supabase,
    {
      workspaceId,
      companyName: input.companyName,
      state: input.state,
      industry: input.industry,
      companyAge: input.companyAge,
      employeeCount: input.employeeCount,
      annualRevenue: input.annualRevenue,
      hasRnd: input.hasRnd,
      rndPercentage: input.rndPercentage,
      ownershipDemographics: input.ownershipDemographics,
      isRural: input.isRural,
      exportsOrPlans: input.exportsOrPlans,
      isHiring: input.isHiring,
      hasCleanEnergy: input.hasCleanEnergy,
      scanData: input.answers as unknown as Json,
    },
  );

  if (profileError || !profile) {
    console.error("Failed to upsert company profile:", profileError?.message);
    return { companyId: null };
  }

  // Replace program matches for this company
  if (input.results.length > 0) {
    const { error: matchesError } = await replaceCompanyMatches(
      supabase,
      profile.id,
      workspaceId,
      input.results.map((r) => ({
        programId: r.programId,
        confidenceScore: r.confidenceScore,
        estimatedValue: r.estimatedValue ?? null,
        reasons: r.reasons as unknown as Json,
      })),
    );

    if (matchesError) {
      console.error("Failed to persist company matches:", matchesError.message);
      return { companyId: profile.id };
    }
  }

  return { companyId: profile.id };
}
