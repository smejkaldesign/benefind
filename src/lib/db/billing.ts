import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Client = SupabaseClient<Database, any>;

/**
 * Returns the current subscription for a user.
 */
export async function getSubscription(client: Client, userId: string) {
  return client
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();
}

/**
 * Lists all invoices for a user, newest first.
 */
export async function listInvoices(client: Client, userId: string) {
  return client
    .from("invoices")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
}

/**
 * Checks whether a workspace is on the premium tier.
 */
export async function isWorkspacePremium(client: Client, workspaceId: string) {
  const { data, error } = await client
    .from("workspaces")
    .select("tier")
    .eq("id", workspaceId)
    .single();

  if (error || !data) {
    return { data: false, error };
  }

  return { data: data.tier === "premium", error: null };
}
