// supabase/functions/purge-expired/index.ts
//
// Scheduled Edge Function that runs the data retention/purge cycle.
// Calls public.purge_expired_data() which handles both soft-delete
// (retention window) and hard-delete (grace period) phases.
//
// Schedule: daily at 3:00 AM UTC via Supabase cron or external trigger.
//
// Environment variables:
//   - SUPABASE_URL
//   - SUPABASE_SERVICE_ROLE_KEY
//
// Deploy:
//   supabase functions deploy purge-expired --no-verify-jwt
//
// Manual trigger (for testing):
//   curl -X POST https://<project>.supabase.co/functions/v1/purge-expired \
//     -H "Authorization: Bearer <service-role-key>"

/// <reference types="https://esm.sh/@supabase/functions-js@2.4.1/src/edge-runtime.d.ts" />
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return jsonResponse({ error: "method_not_allowed" }, 405);
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("Missing required environment variables");
    return jsonResponse({ error: "server_misconfigured" }, 500);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  // Parse optional overrides from request body
  let retentionDays = 365;
  let graceDays = 30;
  try {
    const body = await req.json();
    if (typeof body.retention_days === "number") {
      retentionDays = body.retention_days;
    }
    if (typeof body.grace_days === "number") {
      graceDays = body.grace_days;
    }
  } catch {
    // No body or invalid JSON — use defaults
  }

  const { data, error } = await supabase.rpc("purge_expired_data", {
    retention_days: retentionDays,
    grace_days: graceDays,
  });

  if (error) {
    console.error("Purge failed:", error.message);
    return jsonResponse({ error: "purge_failed", detail: error.message }, 500);
  }

  console.log("Purge completed:", JSON.stringify(data));
  return jsonResponse({ ok: true, result: data }, 200);
});

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
