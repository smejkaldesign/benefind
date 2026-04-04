import type { BenefitProgram, ScreeningInput, ScreeningResult } from './types';
import { snap } from './programs/snap';
import { medicaid } from './programs/medicaid';
import { eitc } from './programs/eitc';
import { wic } from './programs/wic';
import { liheap } from './programs/liheap';
import { chip } from './programs/chip';
import { section8 } from './programs/section8';
import { ssi } from './programs/ssi';
import { pellGrant } from './programs/pell-grant';
import { getStatePrograms } from './state-programs';

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
 * Returns results sorted by estimated value (highest first).
 */
export function runScreening(input: ScreeningInput): ScreeningResult {
  // Combine federal programs with state-specific ones
  const statePrograms = getStatePrograms(input.state);
  const allPrograms = [...ALL_PROGRAMS, ...statePrograms];

  const results = allPrograms.map((program) => ({
    program,
    result: program.checkEligibility(input),
  }));

  // Sort: eligible first, then by estimated value descending
  results.sort((a, b) => {
    if (a.result.eligible !== b.result.eligible) {
      return a.result.eligible ? -1 : 1;
    }
    return (b.result.estimatedAnnualValue ?? 0) - (a.result.estimatedAnnualValue ?? 0);
  });

  const eligible = results.filter((r) => r.result.eligible);
  const totalMonthly = eligible.reduce(
    (sum, r) => sum + (r.result.estimatedMonthlyValue ?? 0),
    0,
  );
  const totalAnnual = eligible.reduce(
    (sum, r) => sum + (r.result.estimatedAnnualValue ?? 0),
    0,
  );

  return {
    input,
    timestamp: new Date().toISOString(),
    programs: results,
    totalEstimatedMonthly: totalMonthly,
    totalEstimatedAnnual: totalAnnual,
  };
}

/** Get program by ID (searches federal + all state programs) */
export function getProgram(id: string): BenefitProgram | undefined {
  const federal = ALL_PROGRAMS.find((p) => p.id === id);
  if (federal) return federal;
  // Search all state programs
  for (const state of ['CA', 'TX', 'FL', 'NY', 'PA']) {
    const found = getStatePrograms(state).find((p) => p.id === id);
    if (found) return found;
  }
  return undefined;
}
