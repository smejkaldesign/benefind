import { createHash, timingSafeEqual } from "node:crypto";

/**
 * Constant-time check of an `Authorization: Bearer <secret>` header. Both
 * sides are hashed first so the comparison does not leak the secret's length.
 * An empty or missing secret never authorizes.
 */
export function isAuthorizedCron(
  authorization: string | null,
  secret: string | undefined,
): boolean {
  if (!secret || !authorization?.startsWith("Bearer ")) return false;
  const given = createHash("sha256")
    .update(authorization.slice("Bearer ".length))
    .digest();
  const expected = createHash("sha256").update(secret).digest();
  return timingSafeEqual(given, expected);
}
