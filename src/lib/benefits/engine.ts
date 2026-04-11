import type { BenefitProgram, ScreeningInput, ScreeningResult } from "./types";
import { ENGINE_VERSION, PURSUABLE_TIERS } from "./types";
import { normalizeProgramResult } from "./scoring";
import { snap } from "./programs/snap";
import { medicaid } from "./programs/medicaid";
import { eitc } from "./programs/eitc";
import { wic } from "./programs/wic";
import { liheap } from "./programs/liheap";
import { chip } from "./programs/chip";
import { section8 } from "./programs/section8";
import { ssi } from "./programs/ssi";
import { pellGrant } from "./programs/pell-grant";
import { getStatePrograms, getSupportedStates } from "./state-programs";

/** All registered federal benefit programs */
export const ALL_PROGRAMS: BenefitProgram[] = [
  snap,
  medicaid,
  chip,
  eitc,
  wic,
  liheap,
  section8,
  ssi,
  pellGrant,
];

/**
 * Run eligibility screening across all registered programs.
 *
 * Every program is evaluated and its result is normalized into a
 * ScoredEligibilityResult regardless of whether it returns the legacy
 * boolean shape or the new EligibilityEvaluation shape.
 *
 * Results are sorted by confidence score descending so the dashboard
 * shows highest-confidence programs first. Ties are broken by estimated
 * annual value (bigger awards first).
 */
export function runScreening(input: ScreeningInput): ScreeningResult {
  // Combine federal programs with state-specific ones
  const statePrograms = getStatePrograms(input.state);
  const allPrograms = [...ALL_PROGRAMS, ...statePrograms];

  const results = allPrograms.map((program) => {
    const raw = program.checkEligibility(input);
    return {
      program,
      result: normalizeProgramResult(raw),
    };
  });

  // Sort by confidence score descending, then by estimated annual value
  results.sort((a, b) => {
    if (a.result.confidenceScore !== b.result.confidenceScore) {
      return b.result.confidenceScore - a.result.confidenceScore;
    }
    return (
      (b.result.estimatedAnnualValue ?? 0) -
      (a.result.estimatedAnnualValue ?? 0)
    );
  });

  // Sum monetary values only for tiers the user can meaningfully pursue.
  // PURSUABLE_TIERS is the single source of truth — see types.ts.
  const pursuable = results.filter((r) =>
    PURSUABLE_TIERS.has(r.result.eligibilityTier),
  );

  const totalMonthly = pursuable.reduce(
    (sum, r) => sum + (r.result.estimatedMonthlyValue ?? 0),
    0,
  );
  const totalAnnual = pursuable.reduce(
    (sum, r) => sum + (r.result.estimatedAnnualValue ?? 0),
    0,
  );

  return {
    input,
    timestamp: new Date().toISOString(),
    engineVersion: ENGINE_VERSION,
    programs: results,
    totalEstimatedMonthly: totalMonthly,
    totalEstimatedAnnual: totalAnnual,
  };
}

/** Get program by ID (searches federal + all state programs) */
export function getProgram(id: string): BenefitProgram | undefined {
  const federal = ALL_PROGRAMS.find((p) => p.id === id);
  if (federal) return federal;
  for (const state of getSupportedStates()) {
    const found = getStatePrograms(state).find((p) => p.id === id);
    if (found) return found;
  }
  return undefined;
}
