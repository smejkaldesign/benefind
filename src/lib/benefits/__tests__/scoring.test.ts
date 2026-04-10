import { describe, it, expect } from "vitest";
import {
  tierFromScore,
  scoreEvaluation,
  finalizeEvaluation,
  bridgeLegacyResult,
  normalizeProgramResult,
  isEvaluation,
} from "../scoring";
import type {
  EligibilityEvaluation,
  EligibilityResult,
  RuleResult,
  Signal,
  MissingField,
} from "../types";
import { ENGINE_VERSION } from "../types";

describe("tierFromScore — boundary conditions", () => {
  // Exact tier boundaries from data model §D3
  it("returns eligible_with_requirements at score >= 70", () => {
    expect(tierFromScore(100)).toBe("eligible_with_requirements");
    expect(tierFromScore(85)).toBe("eligible_with_requirements");
    expect(tierFromScore(70)).toBe("eligible_with_requirements");
  });

  it("returns probably_eligible at 50..69", () => {
    expect(tierFromScore(69)).toBe("probably_eligible");
    expect(tierFromScore(60)).toBe("probably_eligible");
    expect(tierFromScore(50)).toBe("probably_eligible");
  });

  it("returns maybe_eligible at 25..49", () => {
    expect(tierFromScore(49)).toBe("maybe_eligible");
    expect(tierFromScore(35)).toBe("maybe_eligible");
    expect(tierFromScore(25)).toBe("maybe_eligible");
  });

  it("returns not_likely at 5..24", () => {
    expect(tierFromScore(24)).toBe("not_likely");
    expect(tierFromScore(15)).toBe("not_likely");
    expect(tierFromScore(5)).toBe("not_likely");
  });

  it("returns ineligible at 0..4", () => {
    expect(tierFromScore(4)).toBe("ineligible");
    expect(tierFromScore(1)).toBe("ineligible");
    expect(tierFromScore(0)).toBe("ineligible");
  });

  it("clamps scores above 100 to eligible_with_requirements", () => {
    expect(tierFromScore(150)).toBe("eligible_with_requirements");
    expect(tierFromScore(Number.MAX_SAFE_INTEGER)).toBe(
      "eligible_with_requirements",
    );
  });

  it("clamps scores below 0 to ineligible", () => {
    expect(tierFromScore(-10)).toBe("ineligible");
    expect(tierFromScore(Number.MIN_SAFE_INTEGER)).toBe("ineligible");
  });

  it("rounds non-integer scores before mapping", () => {
    expect(tierFromScore(69.6)).toBe("eligible_with_requirements"); // rounds to 70
    expect(tierFromScore(49.4)).toBe("maybe_eligible"); // rounds to 49
    expect(tierFromScore(4.7)).toBe("not_likely"); // rounds to 5
  });
});

describe("scoreEvaluation — basic weighting", () => {
  it("returns 0 when any veto rule fails", () => {
    const evaluation: EligibilityEvaluation = {
      rules: [
        { name: "a", label: "A", passed: true, weight: 50 },
        { name: "b", label: "B", passed: false, weight: 20, veto: true },
        { name: "c", label: "C", passed: true, weight: 30 },
      ],
      reason: "test",
    };
    expect(scoreEvaluation(evaluation)).toBe(0);
  });

  it("is unaffected by veto=true rules that pass", () => {
    const evaluation: EligibilityEvaluation = {
      rules: [
        { name: "a", label: "A", passed: true, weight: 50, veto: true },
        { name: "b", label: "B", passed: true, weight: 50 },
      ],
      reason: "test",
    };
    expect(scoreEvaluation(evaluation)).toBe(100);
  });

  it("returns 100 when all rules pass and no signals/missing", () => {
    const evaluation: EligibilityEvaluation = {
      rules: [
        { name: "a", label: "A", passed: true, weight: 30 },
        { name: "b", label: "B", passed: true, weight: 40 },
        { name: "c", label: "C", passed: true, weight: 30 },
      ],
      reason: "test",
    };
    expect(scoreEvaluation(evaluation)).toBe(100);
  });

  it("computes weighted partial score", () => {
    const evaluation: EligibilityEvaluation = {
      rules: [
        { name: "a", label: "A", passed: true, weight: 50 }, // contributes 50
        { name: "b", label: "B", passed: false, weight: 50 }, // contributes 0
      ],
      reason: "test",
    };
    // 50 / 100 = 50% → base score 50, no signals, no missing
    expect(scoreEvaluation(evaluation)).toBe(50);
  });

  it("adds signal bonus on top of rule ratio", () => {
    const evaluation: EligibilityEvaluation = {
      rules: [{ name: "a", label: "A", passed: true, weight: 100 }],
      signals: [
        { name: "s1", label: "S1", matched: true, weight: 10 },
        { name: "s2", label: "S2", matched: true, weight: 10 },
      ],
      reason: "test",
    };
    // rules: 100/100 = 100%. Already at cap but signals clamp at 100.
    expect(scoreEvaluation(evaluation)).toBe(100);
  });

  it("applies signal bonus when rules are partial", () => {
    const evaluation: EligibilityEvaluation = {
      rules: [
        { name: "a", label: "A", passed: true, weight: 50 },
        { name: "b", label: "B", passed: false, weight: 50 },
      ],
      signals: [
        { name: "s1", label: "S1", matched: true, weight: 100 },
      ],
      reason: "test",
    };
    // rules: 50/100 = 50% = base 50
    // signals: 100/100 = 100% * 20 bonus = +20
    // total: 70
    expect(scoreEvaluation(evaluation)).toBe(70);
  });

  it("subtracts missing-field penalties", () => {
    const evaluation: EligibilityEvaluation = {
      rules: [{ name: "a", label: "A", passed: true, weight: 100 }],
      missing: [
        { field: "f1", label: "F1", penalty: 10 },
        { field: "f2", label: "F2", penalty: 5 },
      ],
      reason: "test",
    };
    // rules: 100, minus 15 = 85
    expect(scoreEvaluation(evaluation)).toBe(85);
  });

  it("combines signals and missing correctly", () => {
    const evaluation: EligibilityEvaluation = {
      rules: [
        { name: "a", label: "A", passed: true, weight: 60 },
        { name: "b", label: "B", passed: false, weight: 40 },
      ],
      signals: [{ name: "s", label: "S", matched: true, weight: 100 }],
      missing: [{ field: "f", label: "F", penalty: 10 }],
      reason: "test",
    };
    // rules: 60/100 = 60% = base 60
    // signals: 100% * 20 = +20
    // missing: -10
    // total: 70
    expect(scoreEvaluation(evaluation)).toBe(70);
  });

  it("clamps final score to [0, 100]", () => {
    const overflowing: EligibilityEvaluation = {
      rules: [{ name: "a", label: "A", passed: true, weight: 100 }],
      signals: [
        { name: "s1", label: "S1", matched: true, weight: 50 },
        { name: "s2", label: "S2", matched: true, weight: 50 },
      ],
      reason: "test",
    };
    expect(scoreEvaluation(overflowing)).toBeLessThanOrEqual(100);

    const underflowing: EligibilityEvaluation = {
      rules: [
        { name: "a", label: "A", passed: false, weight: 10 },
      ],
      missing: [{ field: "f", label: "F", penalty: 100 }],
      reason: "test",
    };
    expect(scoreEvaluation(underflowing)).toBeGreaterThanOrEqual(0);
  });

  it("handles empty rules array (returns 0 gracefully)", () => {
    const evaluation: EligibilityEvaluation = {
      rules: [],
      reason: "test",
    };
    expect(scoreEvaluation(evaluation)).toBe(0);
  });
});

describe("finalizeEvaluation", () => {
  it("produces a full ScoredEligibilityResult with reasons payload", () => {
    const rules: RuleResult[] = [
      { name: "a", label: "A", passed: true, weight: 100 },
    ];
    const signals: Signal[] = [];
    const missing: MissingField[] = [];

    const result = finalizeEvaluation({
      rules,
      signals,
      missing,
      reason: "all good",
      estimatedMonthlyValue: 500,
      nextSteps: ["apply"],
    });

    expect(result.confidenceScore).toBe(100);
    expect(result.eligibilityTier).toBe("eligible_with_requirements");
    expect(result.reason).toBe("all good");
    expect(result.estimatedMonthlyValue).toBe(500);
    expect(result.nextSteps).toEqual(["apply"]);
    expect(result.reasons.rules).toEqual(rules);
    expect(result.reasons.computed_score).toBe(100);
    expect(result.reasons.engine_version).toBe(ENGINE_VERSION);
  });

  it("preserves empty signals/missing arrays in reasons payload", () => {
    const result = finalizeEvaluation({
      rules: [{ name: "a", label: "A", passed: true, weight: 100 }],
      reason: "test",
    });
    expect(result.reasons.signals).toEqual([]);
    expect(result.reasons.missing).toEqual([]);
  });
});

describe("bridgeLegacyResult — legacy → scored mapping", () => {
  it("maps eligible=true + high to score 90", () => {
    const legacy: EligibilityResult = {
      eligible: true,
      confidence: "high",
      reason: "you qualify",
    };
    const result = bridgeLegacyResult(legacy);
    expect(result.confidenceScore).toBe(90);
    expect(result.eligibilityTier).toBe("eligible_with_requirements");
  });

  it("maps eligible=true + medium to probably_eligible", () => {
    const result = bridgeLegacyResult({
      eligible: true,
      confidence: "medium",
      reason: "probably",
    });
    expect(result.confidenceScore).toBe(65);
    expect(result.eligibilityTier).toBe("probably_eligible");
  });

  it("maps eligible=true + low to maybe_eligible", () => {
    const result = bridgeLegacyResult({
      eligible: true,
      confidence: "low",
      reason: "maybe",
    });
    expect(result.confidenceScore).toBe(40);
    expect(result.eligibilityTier).toBe("maybe_eligible");
  });

  it("maps eligible=false + low to maybe_eligible (ambiguous no)", () => {
    const result = bridgeLegacyResult({
      eligible: false,
      confidence: "low",
      reason: "not sure",
    });
    expect(result.confidenceScore).toBe(30);
    expect(result.eligibilityTier).toBe("maybe_eligible");
  });

  it("maps eligible=false + medium to not_likely", () => {
    const result = bridgeLegacyResult({
      eligible: false,
      confidence: "medium",
      reason: "probably not",
    });
    expect(result.confidenceScore).toBe(15);
    expect(result.eligibilityTier).toBe("not_likely");
  });

  it("maps eligible=false + high to ineligible (hard no)", () => {
    const result = bridgeLegacyResult({
      eligible: false,
      confidence: "high",
      reason: "no",
    });
    expect(result.confidenceScore).toBe(2);
    expect(result.eligibilityTier).toBe("ineligible");
  });

  it("preserves estimated values and next steps from legacy", () => {
    const result = bridgeLegacyResult({
      eligible: true,
      confidence: "high",
      reason: "test",
      estimatedMonthlyValue: 250,
      estimatedAnnualValue: 3000,
      nextSteps: ["step 1", "step 2"],
    });
    expect(result.estimatedMonthlyValue).toBe(250);
    expect(result.estimatedAnnualValue).toBe(3000);
    expect(result.nextSteps).toEqual(["step 1", "step 2"]);
  });

  it("creates a synthetic legacy-bridge reasons payload", () => {
    const result = bridgeLegacyResult({
      eligible: true,
      confidence: "medium",
      reason: "bridge test",
    });
    expect(result.reasons.rules).toHaveLength(1);
    expect(result.reasons.rules[0]?.name).toBe("legacy_eligibility_check");
    expect(result.reasons.engine_version).toContain("legacy-bridge");
  });
});

describe("isEvaluation — shape discriminator", () => {
  it("returns true for objects with a rules array", () => {
    const ev: EligibilityEvaluation = {
      rules: [{ name: "a", label: "A", passed: true, weight: 1 }],
      reason: "test",
    };
    expect(isEvaluation(ev)).toBe(true);
  });

  it("returns false for legacy shape without rules array", () => {
    const legacy: EligibilityResult = {
      eligible: true,
      confidence: "high",
      reason: "test",
    };
    expect(isEvaluation(legacy)).toBe(false);
  });

  it("returns true for empty rules array", () => {
    const ev: EligibilityEvaluation = {
      rules: [],
      reason: "test",
    };
    expect(isEvaluation(ev)).toBe(true);
  });
});

describe("normalizeProgramResult — end-to-end", () => {
  it("routes EligibilityEvaluation through finalizeEvaluation", () => {
    const result = normalizeProgramResult({
      rules: [{ name: "a", label: "A", passed: true, weight: 100 }],
      reason: "rich",
    });
    expect(result.confidenceScore).toBe(100);
    expect(result.reasons.engine_version).toBe(ENGINE_VERSION);
    expect(result.reasons.engine_version).not.toContain("legacy");
  });

  it("routes legacy EligibilityResult through bridgeLegacyResult", () => {
    const result = normalizeProgramResult({
      eligible: true,
      confidence: "high",
      reason: "legacy",
    });
    expect(result.confidenceScore).toBe(90);
    expect(result.reasons.engine_version).toContain("legacy");
  });
});
