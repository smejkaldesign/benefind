/**
 * Client-side helpers for the document scan workflow.
 *
 * The actual scan runs in a Supabase Edge Function (supabase/functions/
 * scan-document) that's triggered on storage INSERT events. These helpers
 * are used by the upload flow (pre-scan) and the dashboard UI (post-scan).
 *
 * Responsibility split:
 *   - UPLOAD flow: inserts a documents row with scan_status='pending'
 *     AFTER uploading the blob to storage. The storage webhook then
 *     fires the Edge Function which runs the scan and updates the row.
 *   - UI polling: dashboard components poll the documents row every N
 *     seconds while scan_status === 'pending', stopping once the terminal
 *     status is reached.
 */

import type {
  CreateDocumentInput,
  Document,
  DocumentScanStatus,
} from "./types";

/**
 * Build a storage path for a new upload. The path is namespaced by
 * workspace_id so the bucket RLS policy can enforce workspace membership.
 *
 * Path shape: `<workspace_id>/<uuid>-<sanitized_filename>`
 */
export function buildStoragePath(
  workspaceId: string,
  filename: string,
): string {
  const sanitized = sanitizeFilename(filename);
  const uuid = crypto.randomUUID();
  return `${workspaceId}/${uuid}-${sanitized}`;
}

/**
 * Strip unsafe characters from a filename for use as a storage key.
 * Keeps the extension intact and limits total length.
 */
export function sanitizeFilename(filename: string): string {
  const lastDot = filename.lastIndexOf(".");
  const ext = lastDot >= 0 ? filename.slice(lastDot) : "";
  const base = lastDot >= 0 ? filename.slice(0, lastDot) : filename;
  const safeBase = base.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 80);
  const safeExt = ext.replace(/[^a-zA-Z0-9.]/g, "_").slice(0, 20);
  return `${safeBase}${safeExt}`;
}

/**
 * Returns true if the scan is still in-flight and the UI should poll.
 * Terminal states (clean, infected, error) stop the poll.
 */
export function isTerminalScanStatus(status: DocumentScanStatus): boolean {
  return status !== "pending";
}

/**
 * Default polling config: start at 2s, back off to 10s max, give up
 * after 60s. Most scans complete in under 5 seconds; the 60s ceiling
 * accounts for ClamAV cold-start or large files.
 */
export interface PollConfig {
  initialIntervalMs: number;
  maxIntervalMs: number;
  maxDurationMs: number;
  backoffFactor: number;
}

export const DEFAULT_POLL_CONFIG: PollConfig = {
  initialIntervalMs: 2000,
  maxIntervalMs: 10000,
  maxDurationMs: 60000,
  backoffFactor: 1.5,
};

/**
 * Compute the next poll interval given the current interval.
 * Used by the dashboard's polling hook (implemented in a separate file
 * once the dashboard documents UI is built).
 */
export function nextPollInterval(
  currentIntervalMs: number,
  config: PollConfig = DEFAULT_POLL_CONFIG,
): number {
  return Math.min(
    Math.round(currentIntervalMs * config.backoffFactor),
    config.maxIntervalMs,
  );
}

/**
 * Whether polling should continue based on elapsed time.
 * Returns false once the scan has been pending longer than maxDurationMs;
 * the UI should show an error state and let the user retry.
 */
export function shouldContinuePolling(
  startedAtMs: number,
  nowMs: number = Date.now(),
  config: PollConfig = DEFAULT_POLL_CONFIG,
): boolean {
  return nowMs - startedAtMs < config.maxDurationMs;
}

/**
 * Validate that a file is acceptable for upload before we even hit
 * storage. Size limit matches the ClamAV service and bucket policy.
 */
export interface FileValidationResult {
  ok: boolean;
  error?: string;
}

export const MAX_UPLOAD_BYTES = 25 * 1024 * 1024; // 25 MB

// SECURITY: exact-match whitelist. Do NOT use startsWith / prefix matching —
// that allows forged types like "image/x-malicious-executable" to slip past
// an "image/" prefix check. Every allowed content type is listed explicitly.
export const ALLOWED_MIME_TYPES: ReadonlySet<string> = new Set([
  // Documents
  "application/pdf",
  "text/plain",
  // Microsoft Office (legacy + modern)
  "application/msword",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  // Images (exact types only)
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/heic",
  "image/heif",
]);

export function validateUploadFile(file: {
  size: number;
  type: string;
  name: string;
}): FileValidationResult {
  if (file.size === 0) {
    return { ok: false, error: "File is empty" };
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return {
      ok: false,
      error: `File is too large (max ${Math.round(MAX_UPLOAD_BYTES / 1024 / 1024)} MB)`,
    };
  }
  if (file.name.length === 0 || file.name.length > 255) {
    return { ok: false, error: "Invalid filename" };
  }
  // Exact-match whitelist; no prefix / partial matching.
  const normalizedType = file.type.toLowerCase().split(";")[0].trim();
  if (!ALLOWED_MIME_TYPES.has(normalizedType)) {
    return {
      ok: false,
      error: `Unsupported file type (${file.type || "unknown"})`,
    };
  }
  return { ok: true };
}

/**
 * Build the CreateDocumentInput payload from an upload event. The caller
 * is responsible for passing this to Supabase to insert the row.
 */
export function buildCreateDocumentInput(args: {
  workspaceId: string;
  file: File;
  storagePath: string;
  tags?: string[];
}): CreateDocumentInput {
  return {
    workspace_id: args.workspaceId,
    filename: args.file.name,
    mime_type: args.file.type || undefined,
    byte_size: args.file.size,
    storage_path: args.storagePath,
    tags: args.tags && args.tags.length > 0 ? args.tags : undefined,
  };
}

/**
 * Format the scan status as a user-facing message suitable for a toast
 * or inline banner. Differs from `scanStatusLabel` (which is a short badge)
 * by giving the user guidance on what to do next.
 *
 * Copy guidelines (per NOIR review on PR #11):
 *   - Use "security check" not "virus scanner" (friendlier tone)
 *   - Never surface raw `scan_error` technical detail — log separately
 *   - Always provide a filename fallback in case `doc.filename` is empty
 *   - Exhaustiveness check via `default` so new statuses fail loud
 *
 * TODO(i18n): when we wire localization, move these strings to
 * src/lib/i18n/messages.ts. benefind's users span multiple languages and
 * every user-facing message needs a t() seam.
 */
export function scanStatusMessage(
  doc: Pick<Document, "scan_status" | "filename" | "scan_error">,
): string {
  const name = doc.filename?.trim() || "your file";
  switch (doc.scan_status) {
    case "pending":
      return `Checking "${name}" — this usually takes just a few seconds.`;
    case "clean":
      return `"${name}" is safe to use.`;
    case "infected":
      return `We couldn't accept "${name}" — our security check flagged an issue with this file. Please try a different file, or contact support if you think this is a mistake.`;
    case "error":
      return `Something went wrong while checking "${name}". Please try uploading again, or contact support if it keeps failing.`;
    default: {
      // Exhaustiveness: if a new scan_status is added to the schema without
      // a case here, TypeScript should fail at compile time. At runtime,
      // return a neutral fallback so the toast doesn't crash.
      const _exhaustive: never = doc.scan_status;
      void _exhaustive;
      return `We're still processing "${name}".`;
    }
  }
}
