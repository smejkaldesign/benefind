import type {
  CompanyProgram,
  CompanyScreeningInput,
  CompanyScreeningResult,
} from "./company-types";
import { tierFromScore } from "./scoring";
import { ENGINE_VERSION } from "./types";
import { rndTaxCredit } from "./company-programs/rnd-tax-credit";
import { sbirPhaseI, sbirPhaseII } from "./company-programs/sbir-sttr";
import { wotc } from "./company-programs/wotc";
import { stateWorkforceTraining } from "./company-programs/state-workforce-training";
import { stepExport } from "./company-programs/step-export";
import { opportunityZones } from "./company-programs/opportunity-zones";
import { sba8a, wosbContracting } from "./company-programs/sba-8a";
import { cleanEnergyItc, section179d } from "./company-programs/clean-energy";
import { usdaRuralBusiness } from "./company-programs/usda-rural";

/** All registered company programs */
export const ALL_COMPANY_PROGRAMS: CompanyProgram[] = [
  // Tier 1: Universal
  rndTaxCredit,
  stateWorkforceTraining,
  wotc,

  // Tier 2: Industry
  sbirPhaseI,
  sbirPhaseII,
  cleanEnergyItc,

  // Tier 3: Situation
  stepExport,
  opportunityZones,
  sba8a,
  wosbContracting,
  section179d,
  usdaRuralBusiness,
];

/**
 * Run company eligibility screening across all registered programs.
 *
 * The company programs already return numeric `matchScore` values (0-100),
 * so the engine doesn't need the rule/signal normalization that the
 * individual screening engine does. We DO annotate each result with an
 * `eligibilityTier` derived from the matchScore via the same tierFromScore
 * helper, so the downstream UI and screening_results rows use a uniform
 * bucket taxonomy across both tracks.
 *
 * Programs are sorted by matchScore descending. Ties break on matchScore
 * alone (we don't have a separate "value" dimension for the company track
 * because estimatedValue is a free-form string).
 */
export function runCompanyScreening(
  input: CompanyScreeningInput,
): CompanyScreeningResult {
  const results = ALL_COMPANY_PROGRAMS.map((program) => {
    const raw = program.checkEligibility(input);
    return {
      program,
      result: {
        ...raw,
        // Derive canonical tier from the matchScore so dashboards render
        // the same 5-bucket UI as the individual screening results.
        eligibilityTier: tierFromScore(raw.matchScore),
      },
    };
  });

  // Sort by matchScore descending
  results.sort((a, b) => b.result.matchScore - a.result.matchScore);

  // "Matched" means at least "probably_eligible" (matchScore >= 50).
  // Old semantics used the `eligible` boolean which this metric now
  // approximates with the tier boundary.
  const matched = results.filter(
    (r) =>
      r.result.eligibilityTier === "eligible_with_requirements" ||
      r.result.eligibilityTier === "probably_eligible",
  );

  return {
    input,
    timestamp: new Date().toISOString(),
    engineVersion: ENGINE_VERSION,
    programs: results,
    totalMatched: matched.length,
  };
}

/** Get company program by ID */
export function getCompanyProgram(id: string): CompanyProgram | undefined {
  return ALL_COMPANY_PROGRAMS.find((p) => p.id === id);
}
