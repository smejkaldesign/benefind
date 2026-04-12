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

  // First login: create a default personal workspace.
  // Race condition guard: if two concurrent requests (auth callback + dashboard
  // layout) both reach this point, the slug uniqueness constraint will cause
  // one to fail. We catch that and re-fetch instead of erroring out.
  const { error: createError } = await createWorkspace(client, {
    name: "Personal",
    slug: `personal-${userId.slice(0, 8)}`,
    type: "individual",
    ownerUserId: userId,
  });

  if (createError) {
    // If the error is a uniqueness violation, the other request won the race.
    // Re-fetch and return the workspace it created.
    const isConflict =
      createError.code === "23505" ||
      createError.message?.includes("duplicate");
    if (!isConflict) {
      return { data: null, error: createError };
    }
  }

  // Re-fetch to get the full membership shape (works for both success and race-loser)
  const { data: newMemberships, error: refetchError } =
    await listWorkspacesForUser(client, userId);

  return { data: newMemberships, error: refetchError };
}
