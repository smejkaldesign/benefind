import { createServiceClient } from "@/lib/supabase/server";
import { handleUnsubscribe } from "@/lib/alerts/unsubscribe-handler";

export const dynamic = "force-dynamic";

async function optOut(userId: string): Promise<boolean> {
  const { error } = await createServiceClient()
    .from("user_settings")
    .upsert(
      { user_id: userId, new_match_emails: false },
      { onConflict: "user_id" },
    );
  if (error) console.error("unsubscribe failed:", error.code ?? "unknown");
  return !error;
}

function handle(request: Request) {
  return handleUnsubscribe(request, {
    secret: process.env.ALERTS_SIGNING_SECRET ?? "",
    optOut,
  });
}

/** Confirmation page from the email link. Changes nothing. */
export const GET = handle;

/** Confirmation form submit, and RFC 8058 one-click from mail clients. */
export const POST = handle;
