import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Client = SupabaseClient<Database, any>;

interface ProgramFilters {
  category?: string;
  track?: string;
  state?: string;
  page?: number;
  pageSize?: number;
}

/**
 * Lists active (published) programs with optional filters and pagination.
 */
export async function listActivePrograms(
  client: Client,
  filters?: ProgramFilters,
) {
  const page = filters?.page ?? 0;
  const pageSize = filters?.pageSize ?? 25;
  const from = page * pageSize;
  const to = from + pageSize - 1;

  let query = client
    .from("programs")
    .select("*", { count: "exact" })
    .eq("status", "active")
    .order("name", { ascending: true })
    .range(from, to);

  if (filters?.category) {
    query = query.eq("category", filters.category);
  }
  if (filters?.track) {
    query = query.eq("track", filters.track);
  }
  if (filters?.state) {
    query = query.eq("state", filters.state);
  }

  return query;
}

/**
 * Returns a single program by its text ID (slug).
 */
export async function getProgram(client: Client, programId: string) {
  return client.from("programs").select("*").eq("id", programId).single();
}

/**
 * Returns a program with its translations for the given locale (defaults to "en").
 */
export async function getProgramWithTranslations(
  client: Client,
  programId: string,
  locale: string = "en",
) {
  return client
    .from("programs")
    .select("*, program_translations(*)")
    .eq("id", programId)
    .eq("program_translations.locale", locale)
    .single();
}
