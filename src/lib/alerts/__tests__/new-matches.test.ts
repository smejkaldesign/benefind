import { describe, it, expect } from "vitest";
import { findNewMatches, knownProgramIds, toResultRows } from "../new-matches";
import { ALL_PROGRAMS } from "../../benefits/engine";
import type {
  BenefitProgram,
  ScoredEligibilityResult,
  ScreeningResult,
  EligibilityTier,
} from "../../benefits/types";

const catalog = new Set(ALL_PROGRAMS.map((p) => p.id));

// Single parent, two young kids, low income in California.
const lowIncomeAnswers: Record<string, string> = {
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

function fakeRun(
  tiers: Record<string, EligibilityTier>,
): (answers: Record<string, string>) => ScreeningResult {
  return () => ({
    input: {} as ScreeningResult["input"],
    timestamp: "2026-10-25T00:00:00.000Z",
    engineVersion: "test",
    totalEstimatedMonthly: 0,
    totalEstimatedAnnual: 0,
    programs: Object.entries(tiers).map(([id, tier]) => ({
      program: { id, name: `Program ${id}` } as BenefitProgram,
      result: {
        confidenceScore: 80,
        eligibilityTier: tier,
        reason: "",
        reasons: {} as ScoredEligibilityResult["reasons"],
        estimatedMonthlyValue: 100,
      },
    })),
  });
}

describe("findNewMatches", () => {
  it("treats a screening with zero stored results as all-new", () => {
    const matches = findNewMatches({
      answers: lowIncomeAnswers,
      knownProgramIds: new Set(),
      catalogProgramIds: catalog,
    });
    expect(matches.length).toBeGreaterThan(0);
    for (const m of matches) {
      expect(["eligible_with_requirements", "probably_eligible"]).toContain(
        m.eligibilityTier,
      );
      expect(catalog.has(m.programId)).toBe(true);
    }
  });

  it("returns nothing when every pursuable program is already known", () => {
    const first = findNewMatches({
      answers: lowIncomeAnswers,
      knownProgramIds: new Set(),
      catalogProgramIds: catalog,
    });
    const again = findNewMatches({
      answers: lowIncomeAnswers,
      knownProgramIds: new Set(first.map((m) => m.programId)),
      catalogProgramIds: catalog,
    });
    expect(again).toEqual([]);
  });

  it("only returns pursuable tiers that are in the catalog and not known", () => {
    const matches = findNewMatches({
      answers: {},
      knownProgramIds: new Set(["seen"]),
      catalogProgramIds: new Set(["seen", "fresh", "maybe", "likely"]),
      run: fakeRun({
        seen: "eligible_with_requirements",
        fresh: "eligible_with_requirements",
        likely: "probably_eligible",
        maybe: "maybe_eligible",
        "ca-state-only": "eligible_with_requirements",
      }),
    });
    expect(matches.map((m) => m.programId)).toEqual(["fresh", "likely"]);
    expect(matches[0]).toMatchObject({
      programName: "Program fresh",
      estimatedValue: "$100/mo",
    });
  });
});

describe("knownProgramIds", () => {
  it("counts pursuable stored results and announced programs only", () => {
    const known = knownProgramIds(
      [
        { program_id: "snap", eligibility_tier: "eligible_with_requirements" },
        { program_id: "wic", eligibility_tier: "probably_eligible" },
        { program_id: "ssi", eligibility_tier: "not_likely" },
      ],
      ["medicaid"],
    );
    expect([...known].sort()).toEqual(["medicaid", "snap", "wic"]);
  });

  it("is empty for a screening with no results and no alerts", () => {
    expect(knownProgramIds([], []).size).toBe(0);
  });
});

describe("toResultRows", () => {
  const match = {
    programId: "snap",
    programName: "SNAP",
    confidenceScore: 87.6,
    eligibilityTier: "eligible_with_requirements" as const,
    estimatedValue: "$100/mo",
    reasons: {} as ScoredEligibilityResult["reasons"],
  };

  it("never writes the generated eligibility_tier column", () => {
    const [row] = toResultRows("s1", "w1", [match]);
    expect(row).not.toHaveProperty("eligibility_tier");
    expect(row).toMatchObject({
      screening_id: "s1",
      workspace_id: "w1",
      program_id: "snap",
      estimated_value: "$100/mo",
    });
  });

  it("rounds and clamps confidence_score to 0..100", () => {
    const rows = toResultRows("s1", "w1", [
      match,
      { ...match, confidenceScore: 140 },
      { ...match, confidenceScore: -3 },
    ]);
    expect(rows.map((r) => r.confidence_score)).toEqual([88, 100, 0]);
  });
});
