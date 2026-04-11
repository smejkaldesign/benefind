import type {
  EligibilityEvaluation,
  EligibilityResult,
  EligibilityTier,
  ReasonsPayload,
  RuleResult,
  ScoredEligibilityResult,
  Signal,
  MissingField,
} from "./types";
import { ENGINE_VERSION } from "./types";

/**
 * Map a numeric confidence score (0-100) to one of 5 eligibility tiers.
 * Matches the Postgres generated column in screening_results table.
 *
 * See benefind/docs/data-model.md §D3 for the canonical mapping.
 */
export function tierFromScore(score: number): EligibilityTier {
  const clamped = Math.max(0, Math.min(100, Math.round(score)));
  if (clamped >= 70) return "eligible_with_requirements";
  if (clamped >= 50) return "probably_eligible";
  if (clamped >= 25) return "maybe_eligible";
  if (clamped >= 5) return "not_likely";
  return "ineligible";
}

/**
 * Compute a confidence score from a rich EligibilityEvaluation.
 *
 * Algorithm (per data model §D3):
 * 1. If any rule with `veto: true` failed → return 0 (hard disqualifier)
 * 2. Else: weighted sum of passed rules + matched signals
 * 3. Divide by total possible weight (passed + failed) to get a 0-1 ratio
 * 4. Scale to 0-100 and subtract missing-field penalties
 * 5. Clamp to [0, 100]
 */
export function scoreEvaluation(evaluation: EligibilityEvaluation): number {
  const { rules, signals = [], missing = [] } = evaluation;

  // Guard: a rules array with every weight at 0 (or empty) is almost
  // certainly a misconfiguration. We fall back to 0 instead of silently
  // dividing by zero, but warn loudly so the bug surfaces in dev.
  if (rules.length === 0) {
    console.warn(
      "[scoring] scoreEvaluation called with empty rules array — returning 0",
    );
    return 0;
  }

  // Step 1: veto check
  const vetoFailed = rules.some((r) => r.veto === true && !r.passed);
  if (vetoFailed) return 0;

  // Step 2: weighted sum of rules
  const totalRuleWeight = rules.reduce((sum, r) => sum + r.weight, 0);
  const passedRuleWeight = rules.reduce(
    (sum, r) => sum + (r.passed ? r.weight : 0),
    0,
  );

  // Step 3: weighted sum of signals (signals are additive bonuses)
  const totalSignalWeight = signals.reduce((sum, s) => sum + s.weight, 0);
  const matchedSignalWeight = signals.reduce(
    (sum, s) => sum + (s.matched ? s.weight : 0),
    0,
  );

  // Step 4: compute base ratio and scale to 0-100
  // Rules dominate; signals add up to a 20% bonus on top of the rule score.
  // NOTE: Clamp baseScore to [0, 100] BEFORE adding the signal bonus, so
  // the intermediate never exceeds the documented 100% rule-weight ceiling.
  // Previously the algorithm relied on the final clamp alone, which is
  // fragile if weights grow.
  const ruleRatio = totalRuleWeight > 0 ? passedRuleWeight / totalRuleWeight : 0;
  const signalRatio =
    totalSignalWeight > 0 ? matchedSignalWeight / totalSignalWeight : 0;

  const baseScore = Math.max(0, Math.min(100, ruleRatio * 100));
  const signalBonus = signalRatio * 20;

  // Step 5: apply missing-field penalties
  const missingPenalty = missing.reduce((sum, m) => sum + m.penalty, 0);

  const finalScore = baseScore + signalBonus - missingPenalty;

  // Clamp to [0, 100]
  return Math.max(0, Math.min(100, Math.round(finalScore)));
}

/**
 * Finalize a rich evaluation into a ScoredEligibilityResult with the
 * reasons payload ready to persist to screening_results.reasons.
 */
export function finalizeEvaluation(
  evaluation: EligibilityEvaluation,
): ScoredEligibilityResult {
  const score = scoreEvaluation(evaluation);
  const tier = tierFromScore(score);

  const reasons: ReasonsPayload = {
    rules: evaluation.rules,
    signals: evaluation.signals ?? [],
    missing: evaluation.missing ?? [],
    computed_score: score,
    engine_version: ENGINE_VERSION,
  };

  return {
    confidenceScore: score,
    eligibilityTier: tier,
    reason: evaluation.reason,
    reasons,
    estimatedMonthlyValue: evaluation.estimatedMonthlyValue,
    estimatedAnnualValue: evaluation.estimatedAnnualValue,
    nextSteps: evaluation.nextSteps,
  };
}

/**
 * Bridge legacy EligibilityResult → ScoredEligibilityResult.
 *
 * Legacy programs return `{eligible, confidence, reason}` booleans with a
 * vague confidence string. This bridge maps that shape to a numeric score
 * and a synthesized single-rule reasons payload so downstream consumers
 * (dashboard UI, Supabase rows, admin debug) get a uniform shape.
 *
 * Programs should be incrementally upgraded to return EligibilityEvaluation
 * directly, which gives the rule-by-rule explainability we actually want.
 * Until then, this bridge keeps the system working end-to-end.
 *
 * Mapping (deterministic):
 *   eligible=true  + high   → 90  (eligible_with_requirements)
 *   eligible=true  + medium → 65  (probably_eligible)
 *   eligible=true  + low    → 40  (maybe_eligible)
 *   eligible=false + low    → 30  (maybe_eligible — "not sure, maybe")
 *   eligible=false + medium → 15  (not_likely)
 *   eligible=false + high   → 2   (ineligible — clear no)
 */
export function bridgeLegacyResult(
  legacy: EligibilityResult,
): ScoredEligibilityResult {
  const score = mapLegacyToScore(legacy.eligible, legacy.confidence);
  const tier = tierFromScore(score);

  // Synthesize a single-rule reasons payload so the UI has something
  // to render in the "Why?" panel. When the program is upgraded to
  // return EligibilityEvaluation, this bridge will no longer be used
  // for that program and the rules array will be the real thing.
  const syntheticRule: RuleResult = {
    name: "legacy_eligibility_check",
    label: legacy.eligible ? "Passed eligibility check" : "Failed eligibility check",
    passed: legacy.eligible,
    weight: 100,
    actual: legacy.reason,
  };

  const syntheticMissing: MissingField[] = legacy.eligible
    ? []
    : [
        {
          field: "rule_level_detail",
          label: "Detailed rule-by-rule breakdown",
          penalty: 0,
        },
      ];

  const reasons: ReasonsPayload = {
    rules: [syntheticRule],
    signals: [],
    missing: syntheticMissing,
    computed_score: score,
    engine_version: `${ENGINE_VERSION}-legacy-bridge`,
  };

  return {
    confidenceScore: score,
    eligibilityTier: tier,
    reason: legacy.reason,
    reasons,
    estimatedMonthlyValue: legacy.estimatedMonthlyValue,
    estimatedAnnualValue: legacy.estimatedAnnualValue,
    nextSteps: legacy.nextSteps,
  };
}

function mapLegacyToScore(
  eligible: boolean,
  confidence: "high" | "medium" | "low",
): number {
  if (eligible) {
    if (confidence === "high") return 90;
    if (confidence === "medium") return 65;
    return 40; // low
  }
  if (confidence === "low") return 30;
  if (confidence === "medium") return 15;
  return 2; // high confidence ineligible
}

/**
 * Detect whether a value is an EligibilityEvaluation (rich) or a legacy
 * EligibilityResult. The discriminator is the presence of `rules` array.
 */
export function isEvaluation(
  value: EligibilityResult | EligibilityEvaluation,
): value is EligibilityEvaluation {
  return Array.isArray((value as EligibilityEvaluation).rules);
}

/**
 * Normalize any shape a program returns into the canonical ScoredEligibilityResult.
 * This is the single entry point the engine uses regardless of whether a program
 * has been upgraded or not.
 */
export function normalizeProgramResult(
  raw: EligibilityResult | EligibilityEvaluation,
): ScoredEligibilityResult {
  if (isEvaluation(raw)) {
    return finalizeEvaluation(raw);
  }
  return bridgeLegacyResult(raw);
}
