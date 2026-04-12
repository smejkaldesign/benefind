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
    .select(
      "id, workspace_id, answers, created_at, state, is_latest, household_size, engine_version, screening_results(id, program_id, confidence_score, eligibility_tier, estimated_value, reasons)",
    )
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
    .select("id, created_at, state, is_latest, engine_version, household_size")
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
    .select(
      "id, workspace_id, created_at, state, is_latest, household_size, engine_version, screening_results(id, program_id, confidence_score, eligibility_tier, estimated_value, reasons)",
    )
    .eq("id", screeningId)
    .is("deleted_at", null)
    .single();
}
