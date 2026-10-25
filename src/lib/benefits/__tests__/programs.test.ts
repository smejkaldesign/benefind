import { describe, it, expect } from "vitest";
import { snap } from "../programs/snap";
import { medicaid } from "../programs/medicaid";
import { eitc } from "../programs/eitc";
import { runScreening } from "../engine";
import { isEvaluation } from "../scoring";
import type { ScreeningInput } from "../types";
import { PURSUABLE_TIERS } from "../types";
import { answersToScreeningInput } from "../../screening/steps";

// Sample inputs for common scenarios
const lowIncomeFamily: ScreeningInput = {
  state: "CA",
  householdSize: 4,
  householdMembers: [
    { age: 30, relationship: "self", isCitizen: true },
    { age: 28, relationship: "spouse", isCitizen: true },
    { age: 6, relationship: "child", isCitizen: true },
    { age: 3, relationship: "child", isCitizen: true },
  ],
  monthlyIncome: 2500, // $30K/yr — well below 130% FPL for family of 4
  monthlyExpenses: { rent: 1500, childcare: 800 },
  assets: 500,
  isEmployed: true,
};

const highIncomeSingle: ScreeningInput = {
  state: "TX",
  householdSize: 1,
  householdMembers: [{ age: 35, relationship: "self", isCitizen: true }],
  monthlyIncome: 8000, // $96K/yr — way above any FPL threshold
  assets: 50000,
  isEmployed: true,
};

const nonCitizenHousehold: ScreeningInput = {
  state: "NY",
  householdSize: 3,
  householdMembers: [
    { age: 28, relationship: "self", isCitizen: false },
    { age: 30, relationship: "spouse", isCitizen: false },
    { age: 2, relationship: "child", isCitizen: false },
  ],
  monthlyIncome: 1500,
  isEmployed: true,
};

const elderlyCouple: ScreeningInput = {
  state: "FL",
  householdSize: 2,
  householdMembers: [
    { age: 72, relationship: "self", isCitizen: true },
    { age: 70, relationship: "spouse", isCitizen: true },
  ],
  monthlyIncome: 1800, // social security
  assets: 3000,
  isEmployed: false,
};

const pregnantLowIncome: ScreeningInput = {
  state: "GA", // non-expansion state
  householdSize: 2,
  householdMembers: [
    { age: 26, relationship: "self", isCitizen: true, isPregnant: true },
    { age: 28, relationship: "spouse", isCitizen: true },
  ],
  monthlyIncome: 2000,
  isEmployed: true,
};

// 2-person, $250k Oregon household with no children, with optional overrides.
function oregon250k(overrides: Record<string, string> = {}): ScreeningInput {
  return answersToScreeningInput({
    state: "OR",
    householdSize: "2",
    hasChildren: "no",
    annualIncome: "250000",
    isEmployed: "yes",
    hasHealthInsurance: "all",
    monthlyRent: "3750",
    specialCircumstances: "none",
    ...overrides,
  });
}

function scoreFor(input: ScreeningInput, programId: string) {
  const p = runScreening(input).programs.find(
    (x) => x.program.id === programId,
  );
  expect(p).toBeDefined();
  return p!.result;
}

describe("SNAP — refactored to EligibilityEvaluation", () => {
  it("returns EligibilityEvaluation shape, not legacy", () => {
    const raw = snap.checkEligibility(lowIncomeFamily);
    expect(isEvaluation(raw)).toBe(true);
  });

  it("low-income family with children is in a pursuable tier", () => {
    const result = runScreening(lowIncomeFamily);
    const snapResult = result.programs.find((p) => p.program.id === "snap");
    expect(snapResult).toBeDefined();
    expect(snapResult!.result.confidenceScore).toBeGreaterThanOrEqual(50);
    expect(["eligible_with_requirements", "probably_eligible"]).toContain(
      snapResult!.result.eligibilityTier,
    );
    expect(snapResult!.result.estimatedMonthlyValue).toBeGreaterThan(0);
  });

  it("high-income single is ineligible", () => {
    const result = runScreening(highIncomeSingle);
    const snapResult = result.programs.find((p) => p.program.id === "snap");
    expect(snapResult).toBeDefined();
    expect(snapResult!.result.confidenceScore).toBeLessThan(50);
    expect(snapResult!.result.estimatedMonthlyValue).toBeUndefined();
  });

  it("non-citizen household is vetoed (score 0)", () => {
    const result = runScreening(nonCitizenHousehold);
    const snapResult = result.programs.find((p) => p.program.id === "snap");
    expect(snapResult).toBeDefined();
    expect(snapResult!.result.confidenceScore).toBe(0);
    expect(snapResult!.result.eligibilityTier).toBe("ineligible");
  });

  it("elderly couple benefits from exemptions and signals", () => {
    const result = runScreening(elderlyCouple);
    const snapResult = result.programs.find((p) => p.program.id === "snap");
    expect(snapResult).toBeDefined();
    const hasElderlySignal = snapResult!.result.reasons.signals.some(
      (s) => s.name === "has_elderly_or_disabled_member" && s.matched,
    );
    expect(hasElderlySignal).toBe(true);
  });

  it("includes rules with veto flags for citizenship", () => {
    const result = runScreening(lowIncomeFamily);
    const snapResult = result.programs.find((p) => p.program.id === "snap");
    const citizenRule = snapResult!.result.reasons.rules.find(
      (r) => r.name === "has_citizen_or_eligible_immigrant",
    );
    expect(citizenRule).toBeDefined();
    expect(citizenRule!.veto).toBe(true);
  });

  it("records engine_version without legacy bridge marker", () => {
    const result = runScreening(lowIncomeFamily);
    const snapResult = result.programs.find((p) => p.program.id === "snap");
    expect(snapResult!.result.reasons.engine_version).not.toContain("legacy");
  });
});

describe("Medicaid — refactored to EligibilityEvaluation", () => {
  it("returns EligibilityEvaluation shape", () => {
    const raw = medicaid.checkEligibility(lowIncomeFamily);
    expect(isEvaluation(raw)).toBe(true);
  });

  it("low-income family with children is pursuable", () => {
    const result = runScreening(lowIncomeFamily);
    const m = result.programs.find((p) => p.program.id === "medicaid");
    expect(m).toBeDefined();
    expect(m!.result.confidenceScore).toBeGreaterThanOrEqual(50);
  });

  it("pregnant low-income user in non-expansion state still qualifies via pregnancy pathway", () => {
    const result = runScreening(pregnantLowIncome);
    const m = result.programs.find((p) => p.program.id === "medicaid");
    expect(m).toBeDefined();
    // Pregnancy pathway uses 200% FPL which covers this case
    expect(m!.result.confidenceScore).toBeGreaterThanOrEqual(50);
  });

  it("high-income single in non-expansion state is not likely eligible", () => {
    const result = runScreening(highIncomeSingle);
    const m = result.programs.find((p) => p.program.id === "medicaid");
    expect(m).toBeDefined();
    expect(m!.result.confidenceScore).toBeLessThan(50);
  });

  it("non-citizen household is vetoed", () => {
    const result = runScreening(nonCitizenHousehold);
    const m = result.programs.find((p) => p.program.id === "medicaid");
    expect(m).toBeDefined();
    expect(m!.result.confidenceScore).toBe(0);
  });

  it("income over the limit vetoes Medicaid for a 2-person, $250k household", () => {
    const m = scoreFor(oregon250k(), "medicaid");
    expect(m.confidenceScore).toBe(0);
    expect(m.eligibilityTier).toBe("ineligible");
  });

  it("low-income adult in an expansion state matches", () => {
    const m = scoreFor(oregon250k({ annualIncome: "15000" }), "medicaid");
    expect(PURSUABLE_TIERS.has(m.eligibilityTier)).toBe(true);
  });

  it("pregnancy and children above 400% FPL are vetoed", () => {
    expect(
      scoreFor(oregon250k({ specialCircumstances: "pregnant" }), "medicaid")
        .confidenceScore,
    ).toBe(0);
    expect(
      scoreFor(
        oregon250k({
          householdSize: "3",
          hasChildren: "yes",
          childrenAges: "2",
        }),
        "medicaid",
      ).confidenceScore,
    ).toBe(0);
  });

  it("pregnancy between the pathway limit and 400% FPL is not vetoed", () => {
    // 2-person household at ~300% FPL: above the 200% model limit, but
    // several states cover pregnancy at this level.
    const m = scoreFor(
      oregon250k({ annualIncome: "63000", specialCircumstances: "pregnant" }),
      "medicaid",
    );
    expect(m.confidenceScore).toBeGreaterThan(0);
  });

  it("$250k with a disability is maybe eligible (buy-in), not pursuable", () => {
    // Some states run Medicaid buy-in for workers with disabilities with no
    // income cap, so the income rule does not veto. The typical 250% FPL
    // buy-in limit fails, which keeps the match out of pursuable tiers.
    const m = scoreFor(
      oregon250k({ specialCircumstances: "disabled" }),
      "medicaid",
    );
    expect(m.eligibilityTier).toBe("maybe_eligible");
    const buyIn = m.reasons.rules.find(
      (r) => r.name === "disability_buy_in_income",
    );
    expect(buyIn?.passed).toBe(false);
  });

  it("working adult with a disability under 250% FPL is pursuable", () => {
    const m = scoreFor(
      oregon250k({ annualIncome: "40000", specialCircumstances: "disabled" }),
      "medicaid",
    );
    expect(PURSUABLE_TIERS.has(m.eligibilityTier)).toBe(true);
  });
});

describe("Income ceilings on categorical programs", () => {
  it("CHIP and WIC are vetoed for a $250k household with a toddler", () => {
    const input = oregon250k({
      householdSize: "3",
      hasChildren: "yes",
      childrenAges: "2",
    });
    expect(scoreFor(input, "chip").confidenceScore).toBe(0);
    expect(scoreFor(input, "wic").confidenceScore).toBe(0);
  });

  it("WIC is vetoed for a pregnant member at $250k", () => {
    expect(
      scoreFor(oregon250k({ specialCircumstances: "pregnant" }), "wic")
        .confidenceScore,
    ).toBe(0);
  });

  it("SNAP net income test vetoes elderly or disabled households at $250k", () => {
    for (const c of ["elderly", "disabled"]) {
      expect(
        scoreFor(oregon250k({ specialCircumstances: c }), "snap")
          .confidenceScore,
      ).toBe(0);
    }
  });

  it("SNAP is not vetoed for a disabled household near the net limit", () => {
    // ~189% FPL gross; the uncapped shelter deduction the estimate leaves
    // out can bring net income under 100% FPL.
    const s = scoreFor(
      oregon250k({ annualIncome: "40000", specialCircumstances: "disabled" }),
      "snap",
    );
    expect(s.confidenceScore).toBeGreaterThan(0);
  });
});

describe("EITC — refactored to EligibilityEvaluation", () => {
  it("returns EligibilityEvaluation shape", () => {
    const raw = eitc.checkEligibility(lowIncomeFamily);
    expect(isEvaluation(raw)).toBe(true);
  });

  it("low-income employed family with children qualifies", () => {
    const result = runScreening(lowIncomeFamily);
    const e = result.programs.find((p) => p.program.id === "eitc");
    expect(e).toBeDefined();
    expect(e!.result.confidenceScore).toBeGreaterThanOrEqual(50);
    expect(e!.result.estimatedAnnualValue).toBeGreaterThan(0);
  });

  it("no earned income vetoes EITC", () => {
    const noIncome: ScreeningInput = {
      ...lowIncomeFamily,
      monthlyIncome: 0,
      isEmployed: false,
    };
    const result = runScreening(noIncome);
    const e = result.programs.find((p) => p.program.id === "eitc");
    expect(e).toBeDefined();
    expect(e!.result.confidenceScore).toBe(0);
  });

  it("state EITC signal fires for CA but not TX", () => {
    const resultCA = runScreening(lowIncomeFamily);
    const eCA = resultCA.programs.find((p) => p.program.id === "eitc");
    const caSignal = eCA!.result.reasons.signals.find(
      (s) => s.name === "state_has_matching_eitc",
    );
    expect(caSignal?.matched).toBe(true);

    // TX doesn't have a state EITC
    const txFamily = { ...lowIncomeFamily, state: "TX" };
    const resultTX = runScreening(txFamily);
    const eTX = resultTX.programs.find((p) => p.program.id === "eitc");
    const txSignal = eTX!.result.reasons.signals.find(
      (s) => s.name === "state_has_matching_eitc",
    );
    expect(txSignal?.matched).toBe(false);
  });

  it("income over the limit vetoes EITC for a 2-person, $250k household", () => {
    const input = answersToScreeningInput({
      state: "OR",
      householdSize: "2",
      hasChildren: "no",
      annualIncome: "250000",
      isEmployed: "yes",
      hasHealthInsurance: "all",
      monthlyRent: "3750",
      specialCircumstances: "none",
    });
    const result = runScreening(input);
    const e = result.programs.find((p) => p.program.id === "eitc");
    expect(e!.result.confidenceScore).toBe(0);
    expect(e!.result.eligibilityTier).toBe("ineligible");
    expect(
      result.programs.filter((p) =>
        PURSUABLE_TIERS.has(p.result.eligibilityTier),
      ),
    ).toEqual([]);
    expect(result.totalEstimatedAnnual).toBe(0);
  });

  it("childless filer outside ages 25-64 is vetoed", () => {
    const young: ScreeningInput = {
      ...highIncomeSingle,
      householdMembers: [{ age: 22, relationship: "self", isCitizen: true }],
      monthlyIncome: 1000,
    };
    const e = runScreening(young).programs.find((p) => p.program.id === "eitc");
    expect(e!.result.confidenceScore).toBe(0);
  });
});

describe("runScreening — integration", () => {
  it("returns programs sorted by confidence score descending", () => {
    const result = runScreening(lowIncomeFamily);
    for (let i = 1; i < result.programs.length; i++) {
      expect(
        result.programs[i - 1]!.result.confidenceScore,
      ).toBeGreaterThanOrEqual(result.programs[i]!.result.confidenceScore);
    }
  });

  it("includes engineVersion on result", () => {
    const result = runScreening(lowIncomeFamily);
    expect(result.engineVersion).toBeDefined();
    expect(typeof result.engineVersion).toBe("string");
  });

  it("every program result has a valid tier", () => {
    const result = runScreening(lowIncomeFamily);
    const validTiers = [
      "eligible_with_requirements",
      "probably_eligible",
      "maybe_eligible",
      "not_likely",
      "ineligible",
    ];
    for (const p of result.programs) {
      expect(validTiers).toContain(p.result.eligibilityTier);
      expect(p.result.confidenceScore).toBeGreaterThanOrEqual(0);
      expect(p.result.confidenceScore).toBeLessThanOrEqual(100);
    }
  });

  it("totalEstimatedMonthly only counts pursuable tiers", () => {
    const result = runScreening(highIncomeSingle);
    // High income single shouldn't qualify for much; total should be low
    // (0 or close to it, since nothing is in the pursuable tiers)
    expect(result.totalEstimatedMonthly).toBeGreaterThanOrEqual(0);
    // None of the pursuable programs should have results
    const pursuable = result.programs.filter(
      (p) =>
        p.result.eligibilityTier === "eligible_with_requirements" ||
        p.result.eligibilityTier === "probably_eligible",
    );
    const totalFromPursuable = pursuable.reduce(
      (sum, p) => sum + (p.result.estimatedMonthlyValue ?? 0),
      0,
    );
    expect(result.totalEstimatedMonthly).toBe(totalFromPursuable);
  });

  it("all programs return native EligibilityEvaluation (no legacy bridge)", () => {
    // All programs have been refactored to return EligibilityEvaluation.
    // They should produce valid scored results without the legacy bridge.
    const result = runScreening(lowIncomeFamily);
    const wic = result.programs.find((p) => p.program.id === "wic");
    const liheap = result.programs.find((p) => p.program.id === "liheap");
    expect(wic).toBeDefined();
    expect(liheap).toBeDefined();
    expect(wic!.result.confidenceScore).toBeGreaterThanOrEqual(0);
    expect(liheap!.result.confidenceScore).toBeGreaterThanOrEqual(0);
    // Native evaluations use the standard engine version (no legacy suffix)
    expect(wic!.result.reasons.engine_version).toBe("1.0.0");
    expect(liheap!.result.reasons.engine_version).toBe("1.0.0");
  });
});
