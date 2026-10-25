/**
 * Areas that require a signed-in user. Everything else is public by default:
 * marketing pages, legal pages, tools, static files (robots.txt, manifest,
 * service worker), and API routes, which authenticate themselves (chat and
 * explain return 401, webhooks verify signatures, cron checks a bearer).
 *
 * This is a deny-list on purpose. The previous allow-list silently sent every
 * new public page (tools, about, contact, robots.txt, ...) to /auth/login.
 */
const PROTECTED_PREFIXES = ["/dashboard", "/onboarding", "/admin"];

export function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );
}
