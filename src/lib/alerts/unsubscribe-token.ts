import { createHmac, timingSafeEqual } from "node:crypto";

const PURPOSE = "unsubscribe:new_match_emails:v1";
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function sign(userId: string, secret: string): string {
  return createHmac("sha256", secret)
    .update(`${PURPOSE}:${userId.toLowerCase()}`)
    .digest("base64url");
}

/**
 * Token for the one-click unsubscribe link: `<userId>.<hmac>`. It has no
 * expiry because unsubscribe links in old emails must keep working.
 */
export function createUnsubscribeToken(userId: string, secret: string): string {
  if (!secret) throw new Error("Missing signing secret");
  if (!UUID_RE.test(userId)) throw new Error("Invalid user id");
  return `${userId.toLowerCase()}.${sign(userId, secret)}`;
}

/** Returns the user id when the token is authentic, otherwise null. */
export function verifyUnsubscribeToken(
  token: string | null | undefined,
  secret: string,
): string | null {
  if (!token || !secret) return null;
  const dot = token.indexOf(".");
  if (dot < 0) return null;
  const userId = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!UUID_RE.test(userId)) return null;

  const expected = Buffer.from(sign(userId, secret));
  const given = Buffer.from(sig);
  if (expected.length !== given.length) return null;
  return timingSafeEqual(expected, given) ? userId.toLowerCase() : null;
}
