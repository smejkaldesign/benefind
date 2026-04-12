import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import { listWorkspacesForUser, createWorkspace } from "@/lib/db/workspaces";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Client = SupabaseClient<Database, any>;

/**
 * Ensures the user has at least one workspace. If they don't (first login),
 * creates a default personal workspace.
 *
 * Returns the list of workspace memberships (always at least one).
 */
export async function ensureWorkspace(client: Client, userId: string) {
  const { data: memberships, error } = await listWorkspacesForUser(
    client,
    userId,
  );

  if (error) {
    return { data: null, error };
  }

  // User already has workspaces
  if (memberships && memberships.length > 0) {
    return { data: memberships, error: null };
  }

  // First login: create a default personal workspace
  const { data: workspace, error: createError } = await createWorkspace(
    client,
    {
      name: "Personal",
      slug: `personal-${userId.slice(0, 8)}`,
      type: "individual",
      ownerUserId: userId,
    },
  );

  if (createError || !workspace) {
    return { data: null, error: createError };
  }

  // Re-fetch to get the full membership shape
  const { data: newMemberships, error: refetchError } =
    await listWorkspacesForUser(client, userId);

  return { data: newMemberships, error: refetchError };
}
