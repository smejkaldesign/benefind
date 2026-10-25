/**
 * "New benefit match" alert email. Same layout and palette as the auth
 * templates in supabase/templates/ (table layout, inline styles, lilac
 * button). The subject stays generic so program names do not show on a lock
 * screen or in an inbox preview.
 */

interface NewMatchEmailInput {
  programNames: string[];
  dashboardUrl: string;
  unsubscribeUrl: string;
}

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

const SANS =
  "-apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif";
const SERIF = "Georgia, &quot;Times New Roman&quot;, serif";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function renderNewMatchEmail({
  programNames,
  dashboardUrl,
  unsubscribeUrl,
}: NewMatchEmailInput): RenderedEmail {
  const count = programNames.length;
  const intro =
    count === 1
      ? "We checked your last screening against our current list of programs. You may now qualify for 1 program that you have not seen yet:"
      : `We checked your last screening against our current list of programs. You may now qualify for ${count} programs that you have not seen yet:`;
  const subject = "New benefits may be available to you";
  const dashboard = escapeHtml(dashboardUrl);
  const unsubscribe = escapeHtml(unsubscribeUrl);

  const rows = programNames
    .map(
      (name, i) => `
                  <tr>
                    <td style="padding: 12px 16px;${i > 0 ? " border-top: 1px solid #e8e2f3;" : ""} font-family: ${SANS}; font-size: 15px; line-height: 22px; color: #1c1917">
                      ${escapeHtml(name)}
                    </td>
                  </tr>`,
    )
    .join("");

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light" />
    <title>${subject}</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f4f1fa">
    <div style="display: none; max-height: 0; overflow: hidden">
      New programs match your last Benefind screening. Log in to view them.
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f1fa">
      <tr>
        <td align="center" style="padding: 40px 16px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 480px; background-color: #ffffff; border: 1px solid #e8e2f3; border-radius: 16px">
            <tr>
              <td align="center" style="padding: 40px 40px 8px">
                <img src="https://benefind.ai/images/brand/favilight.png" width="48" height="48" alt="Benefind" style="display: block; border: 0" />
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 16px 40px 0; font-family: ${SERIF}; font-size: 28px; line-height: 34px; color: #1c1917">
                New benefits match your screening
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 12px 40px 0; font-family: ${SANS}; font-size: 16px; line-height: 24px; color: #57534e">
                ${intro}
              </td>
            </tr>
            <tr>
              <td style="padding: 20px 40px 0">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #faf8fd; border: 1px solid #e8e2f3; border-radius: 10px">${rows}
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 28px 40px 0">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center" bgcolor="#b794f6" style="border-radius: 10px">
                      <a href="${dashboard}" style="display: inline-block; padding: 14px 32px; font-family: ${SANS}; font-size: 16px; font-weight: 600; line-height: 20px; color: #1c1917; text-decoration: none; border-radius: 10px">Log in to view</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 24px 40px 0; font-family: ${SANS}; font-size: 13px; line-height: 20px; color: #78716c">
                These results are estimates based on the answers you gave. Log in to see the details and how to apply.
              </td>
            </tr>
            <tr>
              <td style="padding: 24px 40px 0">
                <div style="border-top: 1px solid #efeaf7"></div>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 20px 40px 36px; font-family: ${SANS}; font-size: 13px; line-height: 20px; color: #78716c">
                You get this email because you saved a screening on Benefind.
                <a href="${unsubscribe}" style="color: #7c5db8; text-decoration: underline">Stop new benefit emails</a>
              </td>
            </tr>
          </table>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 480px">
            <tr>
              <td align="center" style="padding: 20px 16px 0; font-family: ${SANS}; font-size: 12px; line-height: 18px; color: #78716c">
                <a href="https://benefind.ai" style="color: #7c5db8; text-decoration: none">benefind.ai</a>
                &middot; Find every benefit you deserve
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

  const text = [
    "New benefits match your screening",
    "",
    intro,
    "",
    ...programNames.map((name) => `- ${name}`),
    "",
    `Log in to view: ${dashboardUrl}`,
    "",
    "These results are estimates based on the answers you gave. Log in to see the details and how to apply.",
    "",
    "You get this email because you saved a screening on Benefind.",
    `Stop new benefit emails: ${unsubscribeUrl}`,
  ].join("\n");

  return { subject, html, text };
}
