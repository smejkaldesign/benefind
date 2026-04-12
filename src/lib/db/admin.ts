import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables } from "@/types/database";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Client = SupabaseClient<Database, any>;

/**
 * Checks whether a user exists in the admin_users table and is not disabled.
 * Note: for RLS-protected contexts, the built-in is_admin() RPC may be more
 * appropriate. This function is for application-level checks.
 */
export async function isUserAdmin(client: Client, userId: string) {
  const { data, error } = await client
    .from("admin_users")
    .select("user_id, role, disabled_at")
    .eq("user_id", userId)
    .single();

  if (error || !data) {
    return { data: false, error };
  }

  return { data: data.disabled_at === null, error: null };
}

interface AdminActionFilters {
  targetTable?: string;
  actorId?: string;
  limit?: number;
}

/**
 * Lists admin audit log entries, newest first.
 * Requires service_role or admin-level access to read admin_actions.
 */
export async function listAdminActions(
  client: Client,
  filters?: AdminActionFilters,
) {
  const limit = filters?.limit ?? 50;

  let query = client
    .from("admin_actions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (filters?.targetTable) {
    query = query.eq("target_table", filters.targetTable);
  }
  if (filters?.actorId) {
    query = query.eq("actor_id", filters.actorId);
  }

  return query;
}

interface SupportTicketFilters {
  status?: Database["public"]["Enums"]["ticket_status"];
  assignedTo?: string;
  limit?: number;
}

/**
 * Lists support tickets, newest first.
 * Requires service_role or admin-level access.
 */
export async function listSupportTickets(
  client: Client,
  filters?: SupportTicketFilters,
) {
  const limit = filters?.limit ?? 50;

  let query = client
    .from("support_tickets")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (filters?.status) {
    query = query.eq("status", filters.status);
  }
  if (filters?.assignedTo) {
    query = query.eq("assigned_to", filters.assignedTo);
  }

  return query;
}

/**
 * Returns aggregate stats for the admin dashboard.
 */
export async function getAdminStats(client: Client) {
  const [workspaces, screenings, docsPending, docsInfected, openTickets] =
    await Promise.all([
      client
        .from("workspaces")
        .select("*", { count: "exact", head: true })
        .is("deleted_at", null),
      client
        .from("screenings")
        .select("*", { count: "exact", head: true })
        .is("deleted_at", null),
      client
        .from("documents")
        .select("*", { count: "exact", head: true })
        .eq("scan_status", "pending")
        .is("deleted_at", null),
      client
        .from("documents")
        .select("*", { count: "exact", head: true })
        .eq("scan_status", "infected")
        .is("deleted_at", null),
      client
        .from("support_tickets")
        .select("*", { count: "exact", head: true })
        .eq("status", "open"),
    ]);

  return {
    workspaceCount: workspaces.count ?? 0,
    screeningCount: screenings.count ?? 0,
    docsPendingCount: docsPending.count ?? 0,
    docsInfectedCount: docsInfected.count ?? 0,
    openTicketCount: openTickets.count ?? 0,
  };
}

/**
 * Returns recent screenings across all workspaces.
 */
export async function listRecentScreenings(client: Client, limit = 20) {
  return client
    .from("screenings")
    .select("*")
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .limit(limit);
}

/**
 * Lists all programs (active, draft, archived) for admin CMS.
 */
export async function listAllPrograms(client: Client) {
  return client.from("programs").select("*").order("name", { ascending: true });
}

/**
 * Updates a program by ID. Caller must verify admin status.
 */
export async function updateProgramById(
  client: Client,
  programId: string,
  fields: {
    name: string;
    description: string | null;
    plain_language_summary: string | null;
    category: string;
    status: string;
    eligibility_criteria: Tables<"programs">["eligibility_criteria"];
    application_url: string | null;
  },
) {
  return client
    .from("programs")
    .update({
      ...fields,
      updated_at: new Date().toISOString(),
    })
    .eq("id", programId);
}
