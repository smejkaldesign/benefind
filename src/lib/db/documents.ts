import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables, TablesInsert } from "@/types/database";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Client = SupabaseClient<Database, any>;
type Document = Tables<"documents">;

interface CreateDocumentInput {
  workspaceId: string;
  uploadedByUserId: string;
  filename: string;
  storagePath: string;
  storageBucket?: string;
  mimeType?: string | null;
  byteSize?: number | null;
  tags?: string[] | null;
}

/**
 * Lists documents for a workspace. Excludes soft-deleted docs.
 * RLS handles filtering out infected documents per policy.
 */
export async function listDocuments(client: Client, workspaceId: string) {
  return client
    .from("documents")
    .select("*")
    .eq("workspace_id", workspaceId)
    .is("deleted_at", null)
    .order("uploaded_at", { ascending: false });
}

/**
 * Inserts a pending document row. The scan_status is forced to "pending"
 * by a database trigger, so we don't set it here.
 */
export async function createDocumentRow(
  client: Client,
  input: CreateDocumentInput,
) {
  return client
    .from("documents")
    .insert({
      workspace_id: input.workspaceId,
      uploaded_by_user_id: input.uploadedByUserId,
      filename: input.filename,
      storage_path: input.storagePath,
      storage_bucket: input.storageBucket ?? "documents",
      mime_type: input.mimeType ?? null,
      byte_size: input.byteSize ?? null,
      tags: input.tags ?? null,
    } satisfies TablesInsert<"documents">)
    .select("*")
    .single();
}

/**
 * Soft-deletes a document by setting deleted_at to now.
 */
export async function softDeleteDocument(client: Client, documentId: string) {
  return client
    .from("documents")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", documentId)
    .select("*")
    .single();
}

/**
 * Returns a single document by ID.
 */
export async function getDocument(client: Client, documentId: string) {
  return client
    .from("documents")
    .select("*")
    .eq("id", documentId)
    .is("deleted_at", null)
    .single();
}
