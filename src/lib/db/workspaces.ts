import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables, TablesInsert } from "@/types/database";

type Client = SupabaseClient<Database>;
type Workspace = Tables<"workspaces">;
type WorkspaceMember = Tables<"workspace_members">;

/**
 * Returns all workspaces where the given user is a member.
 */
export async function listWorkspacesForUser(client: Client, userId: string) {
  return client
    .from("workspace_members")
    .select("workspace_id, role, workspaces(*)")
    .eq("user_id", userId)
    .is("workspaces.deleted_at", null);
}

/**
 * Returns a single workspace by ID.
 */
export async function getWorkspace(client: Client, workspaceId: string) {
  return client
    .from("workspaces")
    .select("*")
    .eq("id", workspaceId)
    .is("deleted_at", null)
    .single();
}

/**
 * Creates a workspace and inserts the owner as the first member.
 */
export async function createWorkspace(
  client: Client,
  input: {
    name: string;
    slug: string;
    type: Database["public"]["Enums"]["workspace_type"];
    ownerUserId: string;
  },
) {
  const { data: workspace, error: wsError } = await client
    .from("workspaces")
    .insert({
      name: input.name,
      slug: input.slug,
      type: input.type,
      owner_user_id: input.ownerUserId,
    } satisfies TablesInsert<"workspaces">)
    .select("*")
    .single();

  if (wsError || !workspace) {
    return { data: null, error: wsError };
  }

  const { error: memberError } = await client.from("workspace_members").insert({
    workspace_id: workspace.id,
    user_id: input.ownerUserId,
    role: "owner",
  } satisfies TablesInsert<"workspace_members">);

  if (memberError) {
    return { data: workspace, error: memberError };
  }

  return { data: workspace, error: null };
}

/**
 * Partially updates a workspace (name, slug).
 */
export async function updateWorkspace(
  client: Client,
  workspaceId: string,
  updates: { name?: string; slug?: string },
) {
  return client
    .from("workspaces")
    .update(updates)
    .eq("id", workspaceId)
    .select("*")
    .single();
}
