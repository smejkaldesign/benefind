import { describe, it, expect } from "vitest";
import { isProtectedPath } from "../protected-paths";

describe("isProtectedPath", () => {
  it.each([
    "/dashboard",
    "/dashboard/billing",
    "/dashboard/screenings/abc",
    "/onboarding",
    "/admin",
    "/admin/programs/snap",
  ])("requires sign-in for %s", (path) => {
    expect(isProtectedPath(path)).toBe(true);
  });

  it.each([
    "/",
    "/about",
    "/contact",
    "/tools",
    "/tools/snap-calculator",
    "/compare/benefind-vs-x",
    "/benefits-for/seniors",
    "/get-started",
    "/blog/some-post",
    "/screening",
    "/results",
    "/programs/snap",
    "/auth/login",
    "/robots.txt",
    "/manifest.json",
    "/sw.js",
    "/feed.xml",
    "/api/webhooks/stripe",
    "/api/health",
    "/api/cron/new-matches",
    "/api/alerts/unsubscribe",
  ])("leaves %s public", (path) => {
    expect(isProtectedPath(path)).toBe(false);
  });

  it("does not match lookalike prefixes", () => {
    expect(isProtectedPath("/dashboards")).toBe(false);
    expect(isProtectedPath("/administrator-guide")).toBe(false);
  });
});
