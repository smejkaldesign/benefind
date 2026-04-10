// supabase/functions/scan-document/index.ts
//
// Supabase Edge Function triggered when a new object is uploaded to the
// `user-documents` Storage bucket. Downloads the file, forwards it to the
// ClamAV sidecar service running on Railway, updates the matching
// `documents` row with the scan verdict, and quarantines infected files.
//
// Invocation shape (Supabase Storage webhook event):
//   POST /scan-document
//   {
//     "type": "INSERT",
//     "table": "objects",
//     "schema": "storage",
//     "record": {
//       "bucket_id": "user-documents",
//       "name": "<workspace_id>/<document_id>/<filename>",
//       "owner": "<user_id>",
//       ...
//     }
//   }
//
// Environment variables required:
//   - SUPABASE_URL
//   - SUPABASE_SERVICE_ROLE_KEY   (service-role bypasses RLS)
//   - CLAMAV_SERVICE_URL          (https://clamav-scanner.railway.app)
//   - CLAMAV_SERVICE_TOKEN        (shared secret with the Railway sidecar)
//
// Deploy:
//   supabase functions deploy scan-document --no-verify-jwt
//
// Configure trigger (Supabase Dashboard -> Database -> Webhooks):
//   Table: storage.objects
//   Events: INSERT
//   Filter: bucket_id = user-documents
//   Target: Edge Function -> scan-document

// deno-lint-ignore-file no-explicit-any
/// <reference types="https://esm.sh/@supabase/functions-js@2.4.1/src/edge-runtime.d.ts" />
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

// ----------------------------------------------------------------------------
// Config
// ----------------------------------------------------------------------------

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const CLAMAV_SERVICE_URL = Deno.env.get("CLAMAV_SERVICE_URL");
const CLAMAV_SERVICE_TOKEN = Deno.env.get("CLAMAV_SERVICE_TOKEN");

const BUCKET_ID = "user-documents";
const SCAN_TIMEOUT_MS = 30_000;
const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB

// ----------------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------------

interface StorageWebhookEvent {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  schema: string;
  record: {
    bucket_id: string;
    name: string;
    owner: string | null;
    metadata?: {
      size?: number;
      mimetype?: string;
    };
  };
}

interface ScanResult {
  status: "clean" | "infected" | "error";
  threats?: string[];
  error?: string;
}

// ----------------------------------------------------------------------------
// Main handler
// ----------------------------------------------------------------------------

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return jsonResponse({ error: "method_not_allowed" }, 405);
  }

  // Validate environment
  if (
    !SUPABASE_URL ||
    !SUPABASE_SERVICE_ROLE_KEY ||
    !CLAMAV_SERVICE_URL ||
    !CLAMAV_SERVICE_TOKEN
  ) {
    console.error("Missing required environment variables");
    return jsonResponse({ error: "server_misconfigured" }, 500);
  }

  let event: StorageWebhookEvent;
  try {
    event = await req.json();
  } catch (err) {
    return jsonResponse({ error: "invalid_json", detail: String(err) }, 400);
  }

  // Only process INSERT events on our bucket
  if (event.type !== "INSERT" || event.schema !== "storage" || event.table !== "objects") {
    return jsonResponse({ skipped: true, reason: "not_an_insert_on_storage" }, 200);
  }
  if (event.record.bucket_id !== BUCKET_ID) {
    return jsonResponse({ skipped: true, reason: "wrong_bucket" }, 200);
  }

  // Reject oversized files immediately (should be blocked by bucket policy
  // too, but defense in depth)
  const reportedSize = event.record.metadata?.size ?? 0;
  if (reportedSize > MAX_FILE_SIZE_BYTES) {
    console.error(`File too large: ${reportedSize} bytes`);
    return jsonResponse({ error: "file_too_large" }, 400);
  }

  const storagePath = event.record.name;
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  // Look up the documents row for this storage path
  const { data: docRow, error: lookupError } = await supabase
    .from("documents")
    .select("id, workspace_id, uploaded_by_user_id, filename")
    .eq("storage_bucket", BUCKET_ID)
    .eq("storage_path", storagePath)
    .maybeSingle();

  if (lookupError) {
    console.error(`Failed to look up document row: ${lookupError.message}`);
    return jsonResponse({ error: "lookup_failed" }, 500);
  }

  if (!docRow) {
    // The storage object was uploaded but there's no corresponding document
    // row yet. This can happen if the client uploaded the file but hasn't
    // inserted the metadata row yet. Log and exit — the client's document
    // row insert will be out of sync with the scan.
    console.warn(`No document row found for path ${storagePath}; quarantining`);
    return jsonResponse({ warning: "no_document_row_found" }, 200);
  }

  // Download the file from Storage
  const { data: fileBlob, error: downloadError } = await supabase.storage
    .from(BUCKET_ID)
    .download(storagePath);

  if (downloadError || !fileBlob) {
    console.error(`Failed to download ${storagePath}: ${downloadError?.message}`);
    await markScanResult(supabase, docRow.id, {
      status: "error",
      error: `download_failed: ${downloadError?.message ?? "unknown"}`,
    });
    return jsonResponse({ error: "download_failed" }, 500);
  }

  // Scan via ClamAV sidecar
  let scanResult: ScanResult;
  try {
    scanResult = await scanWithClamAV(fileBlob, docRow.filename);
  } catch (err) {
    console.error(`Scan request failed: ${String(err)}`);
    await markScanResult(supabase, docRow.id, {
      status: "error",
      error: `scan_request_failed: ${String(err).slice(0, 200)}`,
    });
    return jsonResponse({ error: "scan_failed" }, 500);
  }

  // Update the documents row with the verdict
  await markScanResult(supabase, docRow.id, scanResult);

  // Quarantine infected files: soft-delete the row AND delete the storage object
  if (scanResult.status === "infected") {
    await quarantineFile(supabase, docRow.id, storagePath, scanResult.threats ?? []);

    // Notify the user that their upload was blocked
    await notifyUserOfInfection(supabase, docRow, scanResult.threats ?? []);

    // Log admin action for audit trail
    await logAdminAction(supabase, {
      actor_id: docRow.uploaded_by_user_id,
      action: "quarantine_infected_upload",
      target_table: "documents",
      target_id: docRow.id,
      diff: {
        threats: scanResult.threats,
        storage_path: storagePath,
      },
    });
  }

  return jsonResponse(
    {
      ok: true,
      document_id: docRow.id,
      status: scanResult.status,
      threats: scanResult.threats ?? [],
    },
    200,
  );
});

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------

async function scanWithClamAV(file: Blob, filename: string): Promise<ScanResult> {
  const formData = new FormData();
  formData.append("file", file, filename);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), SCAN_TIMEOUT_MS);

  try {
    const response = await fetch(`${CLAMAV_SERVICE_URL}/scan`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${CLAMAV_SERVICE_TOKEN}`,
      },
      body: formData,
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`ClamAV service returned ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    return result as ScanResult;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function markScanResult(
  supabase: any,
  documentId: string,
  result: ScanResult,
): Promise<void> {
  const update: Record<string, any> = {
    scan_status: result.status,
    scanned_at: new Date().toISOString(),
  };
  if (result.error) {
    update.scan_error = result.error;
  }

  const { error } = await supabase
    .from("documents")
    .update(update)
    .eq("id", documentId);

  if (error) {
    console.error(`Failed to update scan result for ${documentId}: ${error.message}`);
  }
}

async function quarantineFile(
  supabase: any,
  documentId: string,
  storagePath: string,
  _threats: string[],
): Promise<void> {
  // Soft-delete the row
  const { error: softDeleteError } = await supabase
    .from("documents")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", documentId);
  if (softDeleteError) {
    console.error(`Soft delete failed: ${softDeleteError.message}`);
  }

  // Delete the storage object so the infected bytes are gone
  const { error: storageError } = await supabase.storage
    .from(BUCKET_ID)
    .remove([storagePath]);
  if (storageError) {
    console.error(`Storage removal failed: ${storageError.message}`);
  }
}

async function notifyUserOfInfection(
  supabase: any,
  docRow: { id: string; workspace_id: string; uploaded_by_user_id: string; filename: string },
  threats: string[],
): Promise<void> {
  const threatList = threats.length > 0 ? threats.join(", ") : "unknown threat";
  const { error } = await supabase.from("notifications").insert({
    user_id: docRow.uploaded_by_user_id,
    workspace_id: docRow.workspace_id,
    type: "document_infected",
    title: "Upload blocked",
    body:
      `We couldn't accept "${docRow.filename}" because our virus scanner detected a problem (${threatList}). ` +
      `Please try uploading a different file. If you believe this is a mistake, contact support.`,
    payload: {
      document_id: docRow.id,
      threats,
      filename: docRow.filename,
    },
  });
  if (error) {
    console.error(`Failed to insert infection notification: ${error.message}`);
  }
}

async function logAdminAction(
  supabase: any,
  action: {
    actor_id: string;
    action: string;
    target_table: string;
    target_id: string;
    diff: Record<string, any>;
  },
): Promise<void> {
  const { error } = await supabase.from("admin_actions").insert(action);
  if (error) {
    // Don't fail the whole scan if audit logging is broken; just warn.
    console.warn(`Admin action log failed (non-fatal): ${error.message}`);
  }
}

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
