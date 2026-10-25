/** Company screening input from the questionnaire */
export interface CompanyScreeningInput {
  companyName: string;
  state: string; // 2-letter state code
  industry: CompanyIndustry;
  companyAge: CompanyAge;
  employeeCount: EmployeeRange;
  annualRevenue: RevenueRange;
  hasRnd: boolean;
  rndPercentage: number; // 0-100
  ownershipDemographics: OwnershipType[];
  isRural: boolean;
  exportsOrPlans: boolean;
  isHiring: boolean;
  hasCleanEnergy: boolean;
}

export type CompanyIndustry =
  | "technology"
  | "healthcare"
  | "manufacturing"
  | "agriculture"
  | "clean-energy"
  | "retail"
  | "services"
  | "construction"
  | "other";

export type CompanyAge = "<1" | "1-5" | "5-10" | "10+";

export type EmployeeRange = "1-10" | "11-50" | "51-100" | "101-500" | "500+";

export type RevenueRange = "<250k" | "250k-1m" | "1m-5m" | "5m-25m" | "25m+";

export type OwnershipType = "minority" | "woman" | "veteran" | "none";

/** A company-targeted government program */
export interface CompanyProgram {
  id: string;
  name: string;
  shortName: string;
  description: string;
  category: CompanyProgramCategory;
  tier: "universal" | "industry" | "situation" | "state";
  agency: string;
  status: "active" | "paused" | "expired";
  applicationUrl?: string;
  deadlineInfo?: string;
  checkEligibility: (input: CompanyScreeningInput) => CompanyEligibilityResult;
}

export type CompanyProgramCategory =
  "tax-credit" | "grant" | "incentive" | "contracting";

export interface CompanyEligibilityResult {
  eligible: boolean;
  matchScore: number; // 0-100
  confidence: "high" | "medium" | "low";
  reason: string;
  estimatedValue?: string; // Human-readable, e.g. "$48K-$96K/year"
  nextSteps: string[];
  whyYouQualify: string[];
}

/**
 * The shape returned by the company engine after tier derivation.
 * Adds the canonical `eligibilityTier` to the raw program result.
 */
export interface CompanyScoredResult extends CompanyEligibilityResult {
  eligibilityTier:
    | "eligible_with_requirements"
    | "probably_eligible"
    | "maybe_eligible"
    | "not_likely"
    | "ineligible";
}

/** Full company screening result */
export interface CompanyScreeningResult {
  input: CompanyScreeningInput;
  timestamp: string;
  engineVersion: string;
  programs: {
    program: CompanyProgram;
    result: CompanyScoredResult;
  }[];
  totalMatched: number;
}

/** Helper: parse employee range to a midpoint number */
export function employeeRangeToNumber(range: EmployeeRange): number {
  switch (range) {
    case "1-10":
      return 5;
    case "11-50":
      return 30;
    case "51-100":
      return 75;
    case "101-500":
      return 300;
    case "500+":
      return 750;
  }
}

/** Helper: parse revenue range to a midpoint number */
export function revenueRangeToNumber(range: RevenueRange): number {
  switch (range) {
    case "<250k":
      return 125_000;
    case "250k-1m":
      return 625_000;
    case "1m-5m":
      return 3_000_000;
    case "5m-25m":
      return 15_000_000;
    case "25m+":
      return 50_000_000;
  }
}

/** Helper: check if company is a small business (<500 employees) */
export function isSmallBusiness(range: EmployeeRange): boolean {
  return range !== "500+";
}

/**
 * Parse a human-readable estimatedValue string into a dollar amount.
 * Handles formats like:
 *   "$48K-$96K/year"  → midpoint 72000
 *   "$150K"           → 150000
 *   "$2.1M"           → 2100000
 *   "$1,500,000"      → 1500000
 *   "Up to $250K"     → 250000
 *
 * Only "$" amounts count. Percentages ("30% of clean energy investment")
 * and per-unit rates ("$0.59-$1.19/sq ft") have no fixed dollar value
 * without the company's spend or square footage, so they return 0, as does
 * anything unparseable.
 */
export function parseEstimatedValue(value: string | undefined): number {
  if (!value) return 0;
  if (/%|\/\s*(sq|unit|hour|hr|employee)|\bper\b/i.test(value)) return 0;

  const matches = [...value.matchAll(/\$\s*(\d[\d,]*(?:\.\d+)?)\s*([KkMm])?/g)];
  if (matches.length === 0) return 0;

  const numbers = matches.map(([, digits, suffix]) => {
    const num = parseFloat(digits!.replace(/,/g, ""));
    if (suffix && /m/i.test(suffix)) return num * 1_000_000;
    if (suffix && /k/i.test(suffix)) return num * 1_000;
    return num;
  });

  // If we have a range (2+ numbers), return midpoint
  if (numbers.length >= 2) {
    return Math.round((numbers[0]! + numbers[1]!) / 2);
  }
  return Math.round(numbers[0]!);
}

/**
 * Sum estimated dollar values across eligible programs that are accepting
 * applications. Paused or expired programs (e.g. SBIR Phase II) still appear
 * in results but would inflate the headline total with money the company
 * cannot apply for today.
 */
export function totalEstimatedAnnualValue(
  programs: {
    program?: { status?: CompanyProgram["status"] };
    result: { eligible: boolean; estimatedValue?: string };
  }[],
): number {
  return programs
    .filter(
      (p) => p.result.eligible && (p.program?.status ?? "active") === "active",
    )
    .reduce((sum, p) => sum + parseEstimatedValue(p.result.estimatedValue), 0);
}
