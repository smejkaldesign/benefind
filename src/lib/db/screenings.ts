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
 * Creates a screening and its associated results.
 *
 * The DB trigger `trg_screenings_mark_prior_not_latest` (0005_screening.sql)
 * atomically clears is_latest on prior rows when a new screening is inserted,
 * so the DAL does NOT need to manually unmark previous screenings. Doing so
 * would create a race condition between the manual update and the insert.
 *
 * If results insertion fails, the screening row is cleaned up to prevent
 * orphaned screenings with no results.
 */
export async function createScreening(
  client: Client,
  input: CreateScreeningInput,
) {
  const { data: screening, error: screeningError } = await client
    .from("screenings")
    .insert({
      workspace_id: input.workspaceId,
      answers: input.answers,
      engine_version: input.engineVersion,
      state: input.state ?? null,
      zip: input.zip ?? null,
      household_size: input.householdSize ?? null,
      language: input.language ?? "en",
      is_latest: true,
    } satisfies TablesInsert<"screenings">)
    .select("*")
    .single();

  if (screeningError || !screening) {
    return { data: null, error: screeningError };
  }

  if (input.results.length > 0) {
    const resultRows: TablesInsert<"screening_results">[] = input.results.map(
      (r) => ({
        screening_id: screening.id,
        workspace_id: input.workspaceId,
        program_id: r.programId,
        confidence_score: r.confidenceScore,
        eligibility_tier: r.eligibilityTier ?? "unknown",
        estimated_value: r.estimatedValue ?? null,
        reasons: r.reasons,
      }),
    );

    const { error: resultsError } = await client
      .from("screening_results")
      .insert(resultRows);

    if (resultsError) {
      // Clean up the orphaned screening to avoid partial state
      await client.from("screenings").delete().eq("id", screening.id);
      return { data: null, error: resultsError };
    }
  }

  return { data: screening, error: null };
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
