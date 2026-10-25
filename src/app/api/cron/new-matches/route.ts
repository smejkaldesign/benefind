import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import { createServiceClient } from "@/lib/supabase/server";
import { isAuthorizedCron } from "@/lib/alerts/cron-auth";
import { runNewMatchAlerts } from "@/lib/alerts/run-new-match-alerts";
import { getAppOrigin } from "@/lib/app-url";

export const dynamic = "force-dynamic";

/**
 * Daily new-match alert job, called by .github/workflows/new-match-alerts.yml.
 * `?dry_run=1` computes the summary without sending email or writing rows.
 * The response holds counts only, never emails or user ids.
 */
export async function POST(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    console.error("CRON_SECRET not configured");
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }
  if (!isAuthorizedCron(request.headers.get("authorization"), cronSecret)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const dryRun = new URL(request.url).searchParams.get("dry_run") === "1";
  const resendApiKey = process.env.RESEND_API_KEY;
  const signingSecret = process.env.ALERTS_SIGNING_SECRET;
  if (!dryRun && (!resendApiKey || !signingSecret)) {
    console.error("RESEND_API_KEY or ALERTS_SIGNING_SECRET not configured");
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  try {
    const summary = await runNewMatchAlerts(
      createServiceClient() as SupabaseClient<Database>,
      {
        dryRun,
        appOrigin: process.env.NEXT_PUBLIC_APP_URL
          ? getAppOrigin()
          : "https://benefind.ai",
        resendApiKey,
        signingSecret,
      },
    );
    // A partial failure returns 500 so the scheduled job goes red. Sends that
    // succeeded are already recorded, so a rerun only retries the failures.
    return NextResponse.json(summary, {
      status: summary.failed > 0 ? 500 : 200,
    });
  } catch (err) {
    console.error(
      "new-match alerts run failed:",
      err instanceof Error ? err.message : "unknown error",
    );
    return NextResponse.json({ error: "run_failed" }, { status: 500 });
  }
}
