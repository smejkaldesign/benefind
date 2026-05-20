/**
 * Resolve the canonical app origin for outbound links (magic-link redirects,
 * shareable URLs, etc.). Prefers `NEXT_PUBLIC_APP_URL` so links land on the
 * right host regardless of the browsing context — e.g. a user testing on
 * `0.0.0.0:8080` shouldn't receive a magic link pointing at an unreachable host.
 */
export function getAppOrigin(): string {
  const envUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (envUrl) {
    return envUrl.replace(/\/$/, "");
  }
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "http://localhost:3010";
}
