import { cookies } from "next/headers";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables } from "@/types/database";
import { listWorkspacesForUser } from "@/lib/db/workspaces";
import { getEntitlements, type Entitlements } from "./entitlements";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Client = SupabaseClient<Database, any>;

export interface WorkspaceAccess {
  workspace: Tables<"workspaces">;
  entitlements: Entitlements;
}

/**
 * Resolves the signed-in user's active workspace the same way the dashboard
 * does (the bf-workspace cookie if the user is a member of it, otherwise the
 * first workspace) and returns its entitlements. Membership comes from the
 * database, so a forged cookie never grants access. Null when the user has
 * no workspace.
 */
export async function getWorkspaceAccess(
  supabase: Client,
  userId: string,
): Promise<WorkspaceAccess | null> {
  const cookieStore = await cookies();
  const cookieWorkspaceId = cookieStore.get("bf-workspace")?.value;

  const { data: memberships } = await listWorkspacesForUser(supabase, userId);
  const workspaces = (memberships ?? [])
    .map((m) => (Array.isArray(m.workspaces) ? m.workspaces[0] : m.workspaces))
    .filter((w): w is Tables<"workspaces"> => !!w);

  const workspace =
    workspaces.find((w) => w.id === cookieWorkspaceId) ?? workspaces[0];
  if (!workspace) return null;

  return { workspace, entitlements: getEntitlements(workspace) };
}
