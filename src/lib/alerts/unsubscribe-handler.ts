import { verifyUnsubscribeToken } from "./unsubscribe-token";

interface UnsubscribeDeps {
  secret: string;
  /** Sets the opt-out. Returns false if the write failed. */
  optOut: (userId: string) => Promise<boolean>;
}

/**
 * GET shows a confirmation page and never changes state, because mail
 * scanners prefetch links. POST sets the opt-out. POST accepts the token from
 * the query string (RFC 8058 one-click: mail clients POST
 * `List-Unsubscribe=One-Click` to the List-Unsubscribe URL) or from the
 * confirmation form body.
 */
export async function handleUnsubscribe(
  request: Request,
  deps: UnsubscribeDeps,
): Promise<Response> {
  const queryToken = new URL(request.url).searchParams.get("token");

  if (request.method !== "POST") {
    const userId = verifyUnsubscribeToken(queryToken, deps.secret);
    if (!userId) return invalidLinkPage();
    return page(
      200,
      "Stop new benefit emails?",
      "We will stop emailing you when new benefits match your last screening. You can turn these emails back on from your dashboard.",
      `<form method="post" action="/api/alerts/unsubscribe" style="margin: 28px 0 0">
        <input type="hidden" name="token" value="${escapeHtml(queryToken!)}" />
        <button type="submit" style="${BUTTON_STYLE}">Stop new benefit emails</button>
      </form>`,
    );
  }

  let token = queryToken;
  if (!token) {
    try {
      const form = await request.formData();
      const value = form.get("token");
      token = typeof value === "string" ? value : null;
    } catch {
      token = null;
    }
  }

  const userId = verifyUnsubscribeToken(token, deps.secret);
  if (!userId) return invalidLinkPage();

  if (!(await deps.optOut(userId))) {
    return page(
      500,
      "Something went wrong",
      "We could not update your email settings. Please try again, or turn off new benefit emails from your dashboard.",
      DASHBOARD_LINK,
    );
  }
  return page(
    200,
    "You are unsubscribed",
    "We will no longer email you about new benefit matches. You can turn these emails back on from your dashboard.",
    DASHBOARD_LINK,
  );
}

const BUTTON_STYLE =
  "display: inline-block; padding: 14px 32px; background-color: #b794f6; border: 0; border-radius: 10px; font-family: inherit; font-size: 16px; font-weight: 600; line-height: 20px; color: #1c1917; text-decoration: none; cursor: pointer";

const DASHBOARD_LINK = `<p style="margin: 28px 0 0"><a href="/dashboard" style="${BUTTON_STYLE}">Go to your dashboard</a></p>`;

function invalidLinkPage(): Response {
  return page(
    400,
    "This link did not work",
    "The unsubscribe link is invalid or incomplete. You can turn off new benefit emails from your dashboard.",
    DASHBOARD_LINK,
  );
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function page(
  status: number,
  title: string,
  body: string,
  action: string,
): Response {
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <title>${title}</title>
  </head>
  <body style="margin: 0; padding: 40px 16px; background-color: #f4f1fa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif">
    <main style="max-width: 480px; margin: 0 auto; padding: 40px 24px; background-color: #ffffff; border: 1px solid #e8e2f3; border-radius: 16px; text-align: center">
      <img src="/images/brand/favilight.png" width="48" height="48" alt="Benefind" />
      <h1 style="margin: 16px 0 0; font-family: Georgia, 'Times New Roman', serif; font-size: 28px; line-height: 34px; font-weight: normal; color: #1c1917">${title}</h1>
      <p style="margin: 12px 0 0; font-size: 16px; line-height: 24px; color: #57534e">${body}</p>
      ${action}
    </main>
  </body>
</html>
`;
  return new Response(html, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
