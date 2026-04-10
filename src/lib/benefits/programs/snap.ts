import type { BenefitProgram, ScreeningInput } from "../types";
import { isBelowFPLPercent } from "../types";

/** SNAP max monthly allotments by household size (FY2025) */
const SNAP_MAX_ALLOTMENT: Record<number, number> = {
  1: 292,
  2: 536,
  3: 768,
  4: 975,
  5: 1158,
  6: 1390,
  7: 1536,
  8: 1756,
};

function getMaxAllotment(size: number): number {
  if (size <= 8) return SNAP_MAX_ALLOTMENT[size] ?? 292;
  return SNAP_MAX_ALLOTMENT[8]! + (size - 8) * 220;
}

export const snap: BenefitProgram = {
  id: "snap",
  name: "Supplemental Nutrition Assistance Program (SNAP)",
  shortName: "SNAP / Food Stamps",
  description:
    "Monthly benefits on an EBT card to buy groceries. Accepted at most grocery stores and farmers markets.",
  category: "food",
  federalOrState: "federal",
  applicationUrl: "https://www.fns.usda.gov/snap/state-directory",
  documentsNeeded: [
    "Photo ID",
    "Proof of income (pay stubs, tax return)",
    "Proof of residency (utility bill, lease)",
    "Social Security numbers for household members",
    "Bank statements (if applicable)",
  ],
  checkEligibility(input: ScreeningInput) {
    const annualIncome = input.monthlyIncome * 12;

    // Gross income test: 130% FPL
    if (!isBelowFPLPercent(annualIncome, input.householdSize, 130)) {
      // Exception: elderly/disabled households skip gross income test
      const hasElderlyOrDisabled = input.householdMembers.some(
        (m) => m.age >= 60 || m.isDisabled,
      );
      if (!hasElderlyOrDisabled) {
        return {
          eligible: false,
          confidence: "high",
          reason:
            "Gross income exceeds 130% of the Federal Poverty Level for your household size.",
        };
      }
    }

    // Net income test: 100% FPL (simplified — real calc deducts expenses)
    const deductions =
      (input.monthlyExpenses?.childcare ?? 0) * 0.5 +
      Math.min(input.monthlyExpenses?.medical ?? 0, 200);
    const netMonthly =
      input.monthlyIncome - deductions - (input.householdSize > 1 ? 184 : 184);
    const netAnnual = netMonthly * 12;

    if (!isBelowFPLPercent(netAnnual, input.householdSize, 100)) {
      return {
        eligible: false,
        confidence: "medium",
        reason:
          "Estimated net income exceeds 100% FPL. Actual deductions may differ — apply to confirm.",
      };
    }

    // Estimate benefit: max allotment minus 30% of net income
    const maxBenefit = getMaxAllotment(input.householdSize);
    const estimated = Math.max(maxBenefit - Math.round(netMonthly * 0.3), 23); // $23 minimum

    return {
      eligible: true,
      confidence: "medium",
      reason:
        "Based on your household size and income, you likely qualify for SNAP benefits.",
      estimatedMonthlyValue: estimated,
      estimatedAnnualValue: estimated * 12,
      nextSteps: [
        "Apply online through your state SNAP office",
        "Prepare income verification documents",
        "Schedule an interview (phone or in-person)",
      ],
    };
  },
  estimateMonthly(input: ScreeningInput) {
    const result = this.checkEligibility(input);
    return result.estimatedMonthlyValue ?? null;
  },
};
