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
