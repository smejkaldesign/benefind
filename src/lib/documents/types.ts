/**
 * Canonical TypeScript types for the `documents` table and the virus-scan
 * workflow. Mirrors the Supabase schema from supabase/migrations/*.
 *
 * See docs/data-model.md §D4 for the design rationale.
 */

/** Virus-scan status for a stored document. */
export type DocumentScanStatus = "pending" | "clean" | "infected" | "error";

/** Row in the `documents` table. */
export interface Document {
  id: string;
  workspace_id: string;
  uploaded_by_user_id: string;
  filename: string;
  mime_type: string | null;
  byte_size: number | null;
  storage_path: string;
  storage_bucket: string;
  tags: string[] | null;
  scan_status: DocumentScanStatus;
  scanned_at: string | null;
  scan_error: string | null;
  uploaded_at: string;
  deleted_at: string | null;
}

/** Payload the client sends when creating a document row after upload. */
export interface CreateDocumentInput {
  workspace_id: string;
  filename: string;
  mime_type?: string;
  byte_size?: number;
  storage_path: string;
  tags?: string[];
}

/**
 * Whether a document is safe to download/display in the UI.
 * Anything other than `clean` should be blocked or show a status indicator.
 */
export function isDocumentDownloadable(doc: Pick<Document, "scan_status" | "deleted_at">): boolean {
  return doc.scan_status === "clean" && doc.deleted_at === null;
}

/** Human-readable label for the scan status. */
export function scanStatusLabel(status: DocumentScanStatus): string {
  switch (status) {
    case "pending":
      return "Scanning…";
    case "clean":
      return "Safe";
    case "infected":
      return "Blocked — infected file";
    case "error":
      return "Scan failed — try again";
  }
}

/** Whether the UI should show a spinner/loading state. */
export function isScanPending(status: DocumentScanStatus): boolean {
  return status === "pending";
}

/** Whether the UI should show an error/retry state. */
export function isScanFailed(status: DocumentScanStatus): boolean {
  return status === "error" || status === "infected";
}
