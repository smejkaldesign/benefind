import { describe, it, expect, vi } from "vitest";
import { runNewMatchAlerts } from "../run-new-match-alerts";
import { ALL_PROGRAMS } from "../../benefits/engine";

const answers: Record<string, string> = {
  state: "CA",
  householdSize: "3",
  annualIncome: "18000",
  hasChildren: "yes",
  childrenAges: "2,5",
  specialCircumstances: "",
  monthlyRent: "1200",
  isEmployed: "yes",
  hasHealthInsurance: "none",
};

function row(
  id: string,
  owner: string,
  tier: "free" | "premium",
  type: "individual" | "company",
) {
  return {
    id: `screening-${id}`,
    workspace_id: `ws-${id}`,
    answers,
    screening_results: [],
    workspaces: { owner_user_id: owner, tier, type },
  };
}

/**
 * Minimal stand-in for the Supabase query builder. It ignores filters and
 * returns every row, so the test also covers the in-code entitlement check.
 */
function fakeClient(screenings: unknown[]) {
  const calls: Array<{ table: string; method: string; args: unknown[] }> = [];
  const data: Record<string, unknown[]> = {
    programs: ALL_PROGRAMS.map((p) => ({ id: p.id })),
    screenings,
    new_match_alerts: [],
    user_settings: [],
  };
  const from = (table: string) => {
    const builder: Record<string, unknown> = {};
    for (const method of ["select", "eq", "is", "in", "order", "range"]) {
      builder[method] = (...args: unknown[]) => {
        calls.push({ table, method, args });
        return builder;
      };
    }
    builder.then = (resolve: (v: unknown) => void) =>
      resolve({ data: data[table] ?? [], error: null });
    return builder;
  };
  const getUserById = vi.fn(async (id: string) => ({
    data: {
      user: {
        id,
        email: `${id}@example.com`,
        email_confirmed_at: "2026-10-01T00:00:00Z",
        user_metadata: {},
      },
    },
    error: null,
  }));
  return {
    client: { from, auth: { admin: { getUserById } } },
    calls,
    getUserById,
  };
}

describe("runNewMatchAlerts entitlement filter", () => {
  it("only considers premium personal workspaces", async () => {
    const fake = fakeClient([
      row("paid", "owner-paid", "premium", "individual"),
      row("free", "owner-free", "free", "individual"),
      row("biz", "owner-biz", "premium", "company"),
    ]);

    const summary = await runNewMatchAlerts(fake.client as never, {
      dryRun: true,
      appOrigin: "https://benefind.ai",
    });

    expect(summary.screeningsChecked).toBe(3);
    expect(summary.skippedNotEntitled).toBe(2);
    expect(summary.workspacesWithNewMatches).toBe(1);
    expect(summary.usersWithNewMatches).toBe(1);
    expect(fake.getUserById).toHaveBeenCalledTimes(1);
    expect(fake.getUserById).toHaveBeenCalledWith("owner-paid");
  });

  it("filters the screenings query to premium individual workspaces", async () => {
    const fake = fakeClient([]);
    await runNewMatchAlerts(fake.client as never, {
      dryRun: true,
      appOrigin: "https://benefind.ai",
    });
    const eqs = fake.calls
      .filter((c) => c.table === "screenings" && c.method === "eq")
      .map((c) => c.args);
    expect(eqs).toContainEqual(["workspaces.tier", "premium"]);
    expect(eqs).toContainEqual(["workspaces.type", "individual"]);
  });
});
