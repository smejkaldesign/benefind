/** Household member for eligibility calculation */
export interface HouseholdMember {
  age: number;
  relationship: "self" | "spouse" | "child" | "parent" | "other";
  isDisabled?: boolean;
  isPregnant?: boolean;
  isVeteran?: boolean;
  isStudent?: boolean;
  isCitizen?: boolean; // US citizen or qualified immigrant
}

/** Core screening input from the user */
export interface ScreeningInput {
  state: string; // 2-letter state code
  householdSize: number;
  householdMembers: HouseholdMember[];
  monthlyIncome: number; // gross monthly
  monthlyExpenses?: {
    rent?: number;
    childcare?: number;
    medical?: number;
  };
  assets?: number; // liquid assets
  isEmployed?: boolean;
  hasHealthInsurance?: boolean;
}

/** A single benefit program definition */
export interface BenefitProgram {
  id: string;
  name: string;
  shortName: string;
  description: string;
  category: ProgramCategory;
  federalOrState: "federal" | "state";
  applicationUrl?: string;
  documentsNeeded: string[];
  estimateMonthly?: (input: ScreeningInput) => number | null;
  checkEligibility: (input: ScreeningInput) => EligibilityResult;
}

export type ProgramCategory =
  | "food"
  | "healthcare"
  | "housing"
  | "income"
  | "childcare"
  | "energy"
  | "education"
  | "tax-credit";

export interface EligibilityResult {
  eligible: boolean;
  confidence: "high" | "medium" | "low";
  reason: string;
  estimatedMonthlyValue?: number;
  estimatedAnnualValue?: number;
  nextSteps?: string[];
}

/** Full screening result for a user */
export interface ScreeningResult {
  input: ScreeningInput;
  timestamp: string;
  programs: {
    program: BenefitProgram;
    result: EligibilityResult;
  }[];
  totalEstimatedMonthly: number;
  totalEstimatedAnnual: number;
}

/** Federal Poverty Level thresholds (2025) */
export const FPL_2025: Record<number, number> = {
  1: 15650,
  2: 21150,
  3: 26650,
  4: 32150,
  5: 37650,
  6: 43150,
  7: 48650,
  8: 54150,
};

/** Get FPL for household size (extrapolate for 9+) */
export function getFPL(householdSize: number): number {
  if (householdSize <= 8) return FPL_2025[householdSize] ?? FPL_2025[1]!;
  return FPL_2025[8]! + (householdSize - 8) * 5500;
}

/** Check if income is below X% of FPL */
export function isBelowFPLPercent(
  annualIncome: number,
  householdSize: number,
  percent: number,
): boolean {
  return annualIncome <= getFPL(householdSize) * (percent / 100);
}
