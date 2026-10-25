const RESEND_ENDPOINT = "https://api.resend.com/emails";
const FROM = "Benefind <noreply@benefind.ai>";

interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
  text: string;
  headers?: Record<string, string>;
  /** Resend dedupes sends with the same key for 24 hours. */
  idempotencyKey?: string;
}

/**
 * Sends one email through Resend's REST API. Throws on a non-2xx response so
 * callers never record a send that did not happen. The error message carries
 * the status code only; Resend error bodies can echo the recipient.
 */
export async function sendEmail(
  apiKey: string,
  input: SendEmailInput,
): Promise<void> {
  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...(input.idempotencyKey
        ? { "Idempotency-Key": input.idempotencyKey }
        : {}),
    },
    body: JSON.stringify({
      from: FROM,
      to: [input.to],
      subject: input.subject,
      html: input.html,
      text: input.text,
      headers: input.headers,
    }),
  });
  if (!res.ok) {
    throw new Error(`Resend responded ${res.status}`);
  }
}
