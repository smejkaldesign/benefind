"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { createDocumentRow, listDocuments } from "@/lib/db/documents";
import { getWorkspaceAccess } from "@/lib/billing/workspace-access";
import type { Tables } from "@/types/database";

async function documentsAccess() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const access = await getWorkspaceAccess(supabase, user.id);
  if (!access?.entitlements.documents) return null;
  return { supabase, user, workspaceId: access.workspace.id };
}

/** Documents for the active workspace. Empty when the plan has no document storage. */
export async function listWorkspaceDocuments(): Promise<Tables<"documents">[]> {
  const ctx = await documentsAccess();
  if (!ctx) return [];
  const { data } = await listDocuments(ctx.supabase, ctx.workspaceId);
  return data ?? [];
}

/**
 * Records a file the browser already uploaded to storage. Rejects free
 * plans and paths outside the active workspace's folder.
 */
export async function saveDocumentRow(input: {
  filename: string;
  storagePath: string;
  mimeType: string | null;
  byteSize: number;
}): Promise<Tables<"documents"> | null> {
  const ctx = await documentsAccess();
  if (!ctx) return null;
  if (!input.storagePath.startsWith(`${ctx.workspaceId}/`)) return null;

  const { data, error } = await createDocumentRow(ctx.supabase, {
    workspaceId: ctx.workspaceId,
    uploadedByUserId: ctx.user.id,
    filename: input.filename,
    storagePath: input.storagePath,
    mimeType: input.mimeType,
    byteSize: input.byteSize,
  });
  return error ? null : data;
}
