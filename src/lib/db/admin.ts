import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables } from "@/types/database";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Client = SupabaseClient<Database, any>;
type AdminUser = Tables<"admin_users">;
type AdminAction = Tables<"admin_actions">;
type SupportTicket = Tables<"support_tickets">;

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
