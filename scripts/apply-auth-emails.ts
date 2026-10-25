/**
 * Pushes the branded auth email templates in supabase/templates/ to the
 * Benefind Supabase project. When RESEND_API_KEY is set, also routes auth
 * email through Resend SMTP so it comes from noreply@benefind.ai instead of
 * Supabase's shared sender (which is capped at 2 emails per hour).
 *
 * Usage:
 *   pnpm tsx --env-file=.env.local scripts/apply-auth-emails.ts
 *
 * Env:
 *   SUPABASE_ACCESS_TOKEN  personal access token with access to the project
 *   SUPABASE_PROJECT_ID    defaults to the production project
 *   RESEND_API_KEY         optional; sending-access key for benefind.ai
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

const projectId = process.env.SUPABASE_PROJECT_ID ?? "ttbjntphwogjdzqxftas";
const token = process.env.SUPABASE_ACCESS_TOKEN;
const resendKey = process.env.RESEND_API_KEY;

if (!token) {
  console.error("SUPABASE_ACCESS_TOKEN not set. Add it to .env.local");
  process.exit(1);
}

const template = (name: string) =>
  readFileSync(join(process.cwd(), "supabase/templates", name), "utf8");

const config: Record<string, string | number | boolean> = {
  mailer_subjects_magic_link: "Your Benefind sign-in link",
  mailer_templates_magic_link_content: template("magic-link.html"),
  mailer_subjects_confirmation: "Confirm your email for Benefind",
  mailer_templates_confirmation_content: template("confirm-signup.html"),
};

if (resendKey) {
  Object.assign(config, {
    smtp_host: "smtp.resend.com",
    smtp_port: "465",
    smtp_user: "resend",
    smtp_pass: resendKey,
    smtp_admin_email: "noreply@benefind.ai",
    smtp_sender_name: "Benefind",
    rate_limit_email_sent: 60,
  });
}

async function main() {
  const res = await fetch(
    `https://api.supabase.com/v1/projects/${projectId}/config/auth`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(config),
    },
  );

  if (!res.ok) {
    console.error(`Supabase API error (${res.status}): ${await res.text()}`);
    process.exit(1);
  }

  console.log("Applied auth email templates.");
  console.log(
    resendKey
      ? "Auth email now sends through Resend as Benefind <noreply@benefind.ai>."
      : "RESEND_API_KEY not set; still using Supabase's default sender.",
  );
}

main();
