import type {
  CompanyProgram,
  CompanyScreeningInput,
  CompanyScreeningResult,
} from "./company-types";
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
 * Returns results sorted by match score (highest first), eligible programs first.
 */
export function runCompanyScreening(
  input: CompanyScreeningInput,
): CompanyScreeningResult {
  const results = ALL_COMPANY_PROGRAMS.map((program) => ({
    program,
    result: program.checkEligibility(input),
  }));

  // Sort: eligible first, then by match score descending
  results.sort((a, b) => {
    if (a.result.eligible !== b.result.eligible) {
      return a.result.eligible ? -1 : 1;
    }
    return b.result.matchScore - a.result.matchScore;
  });

  const eligible = results.filter((r) => r.result.eligible);

  return {
    input,
    timestamp: new Date().toISOString(),
    programs: results,
    totalMatched: eligible.length,
  };
}

/** Get company program by ID */
export function getCompanyProgram(id: string): CompanyProgram | undefined {
  return ALL_COMPANY_PROGRAMS.find((p) => p.id === id);
}
