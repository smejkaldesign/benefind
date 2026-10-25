import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, TablesInsert } from "@/types/database";
import type { Json } from "@/types/database";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Client = SupabaseClient<Database, any>;

interface CreateScreeningInput {
  workspaceId: string;
  answers: Json;
  engineVersion: string;
  state?: string | null;
  zip?: string | null;
  householdSize?: number | null;
  language?: string;
  results: Array<{
    programId: string;
    confidenceScore: number;
    eligibilityTier?: string;
    estimatedValue?: string | null;
    reasons: Json;
  }>;
}

/**
 * Creates a screening and its results in one transaction via the
 * create_screening() RPC (20261026_0002_screening_save.sql). The BEFORE INSERT
 * trigger `trg_screenings_mark_prior_not_latest` clears is_latest on prior
 * rows, so a failed save leaves the previous screening as the latest.
 */
export async function createScreening(
  client: Client,
  input: CreateScreeningInput,
) {
  // eligibility_tier is a generated column (derived from confidence_score
  // with the same buckets as tierFromScore), so it must not be written.
  // confidence_score is a smallint.
  const results = input.results.map((r) => ({
    program_id: r.programId,
    confidence_score: Math.max(0, Math.min(100, Math.round(r.confidenceScore))),
    estimated_value: r.estimatedValue ?? null,
    reasons: r.reasons,
  }));

  const { data: id, error } = await client.rpc("create_screening", {
    p_workspace_id: input.workspaceId,
    p_answers: input.answers,
    p_engine_version: input.engineVersion,
    p_state: input.state ?? null,
    p_zip: input.zip ?? null,
    p_household_size: input.householdSize ?? null,
    p_language: input.language ?? "en",
    p_results: results as unknown as Json,
  });

  if (error || !id) {
    return { data: null, error };
  }
  return { data: { id }, error: null };
}

/**
 * Returns the most recent screening for a workspace, with its results.
 */
export async function getLatestScreening(client: Client, workspaceId: string) {
  return client
    .from("screenings")
    .select("*, screening_results(*)")
    .eq("workspace_id", workspaceId)
    .eq("is_latest", true)
    .is("deleted_at", null)
    .single();
}

/**
 * Lists all screenings for a workspace, newest first.
 */
export async function listScreenings(client: Client, workspaceId: string) {
  return client
    .from("screenings")
    .select("*")
    .eq("workspace_id", workspaceId)
    .is("deleted_at", null)
    .order("created_at", { ascending: false });
}

/**
 * Returns a single screening with all of its results.
 */
export async function getScreeningWithResults(
  client: Client,
  screeningId: string,
) {
  return client
    .from("screenings")
    .select("*, screening_results(*)")
    .eq("id", screeningId)
    .is("deleted_at", null)
    .single();
}

// ── Company screening DAL ──────────────────────────────────────────────────

interface UpsertCompanyProfileInput {
  workspaceId: string;
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
  scanData?: Json;
}

/**
 * Upserts a company profile for a workspace.
 * company_profiles has a unique constraint on workspace_id, so this
 * creates or updates the single profile per workspace.
 */
export async function upsertCompanyProfile(
  client: Client,
  input: UpsertCompanyProfileInput,
) {
  const row: TablesInsert<"company_profiles"> = {
    workspace_id: input.workspaceId,
    company_name: input.companyName ?? null,
    state: input.state ?? null,
    industry: input.industry ?? null,
    company_age: input.companyAge ?? null,
    employee_count: input.employeeCount ?? null,
    annual_revenue: input.annualRevenue ?? null,
    has_rnd: input.hasRnd ?? false,
    rnd_percentage: input.rndPercentage ?? null,
    ownership_demographics: input.ownershipDemographics ?? null,
    is_rural: input.isRural ?? false,
    exports_or_plans: input.exportsOrPlans ?? false,
    is_hiring: input.isHiring ?? false,
    has_clean_energy: input.hasCleanEnergy ?? false,
    scan_data: input.scanData ?? null,
  };

  return client
    .from("company_profiles")
    .upsert(row, { onConflict: "workspace_id" })
    .select("id")
    .single();
}

interface CompanyMatchInput {
  programId: string;
  confidenceScore: number;
  estimatedValue?: string | null;
  reasons: Json;
}

/**
 * Replaces all company program matches for a given company profile.
 * Deletes existing matches, then inserts the new set.
 */
export async function replaceCompanyMatches(
  client: Client,
  companyId: string,
  workspaceId: string,
  matches: CompanyMatchInput[],
) {
  // Delete old matches
  await client
    .from("company_program_matches")
    .delete()
    .eq("company_id", companyId);

  if (matches.length === 0) {
    return { error: null };
  }

  const rows: TablesInsert<"company_program_matches">[] = matches.map((m) => ({
    workspace_id: workspaceId,
    company_id: companyId,
    program_id: m.programId,
    confidence_score: m.confidenceScore,
    estimated_value: m.estimatedValue ?? null,
    reasons: m.reasons,
  }));

  return client.from("company_program_matches").insert(rows);
}
