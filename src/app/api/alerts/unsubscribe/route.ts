import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { verifyUnsubscribeToken } from "@/lib/alerts/unsubscribe-token";

export const dynamic = "force-dynamic";

async function optOut(request: Request): Promise<boolean> {
  const token = new URL(request.url).searchParams.get("token");
  const userId = verifyUnsubscribeToken(
    token,
    process.env.ALERTS_SIGNING_SECRET ?? "",
  );
  if (!userId) return false;

  const { error } = await createServiceClient()
    .from("user_settings")
    .upsert(
      { user_id: userId, new_match_emails: false },
      { onConflict: "user_id" },
    );
  if (error) {
    console.error("unsubscribe failed:", error.code ?? "unknown");
    return false;
  }
  return true;
}

function page(title: string, body: string, status: number) {
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <title>${title}</title>
  </head>
  <body style="margin: 0; padding: 40px 16px; background-color: #f4f1fa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif">
    <main style="max-width: 480px; margin: 0 auto; padding: 40px; background-color: #ffffff; border: 1px solid #e8e2f3; border-radius: 16px; text-align: center">
      <img src="/images/brand/favilight.png" width="48" height="48" alt="Benefind" />
      <h1 style="margin: 16px 0 0; font-family: Georgia, 'Times New Roman', serif; font-size: 28px; line-height: 34px; font-weight: normal; color: #1c1917">${title}</h1>
      <p style="margin: 12px 0 0; font-size: 16px; line-height: 24px; color: #57534e">${body}</p>
      <p style="margin: 28px 0 0"><a href="/dashboard" style="display: inline-block; padding: 14px 32px; background-color: #b794f6; border-radius: 10px; font-size: 16px; font-weight: 600; color: #1c1917; text-decoration: none">Go to your dashboard</a></p>
    </main>
  </body>
</html>
`;
  return new Response(html, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

/** Link clicked from the email. */
export async function GET(request: Request) {
  if (await optOut(request)) {
    return page(
      "You are unsubscribed",
      "We will no longer email you about new benefit matches. You can turn these emails back on from your dashboard.",
      200,
    );
  }
  return page(
    "This link did not work",
    "The unsubscribe link is invalid or incomplete. You can turn off new benefit emails from your dashboard.",
    400,
  );
}

/** RFC 8058 one-click unsubscribe, sent by mail clients via List-Unsubscribe-Post. */
export async function POST(request: Request) {
  const ok = await optOut(request);
  return NextResponse.json({ ok }, { status: ok ? 200 : 400 });
}
