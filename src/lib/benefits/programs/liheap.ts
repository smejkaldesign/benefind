import type { BenefitProgram, ScreeningInput } from "../types";
import { isBelowFPLPercent } from "../types";

export const liheap: BenefitProgram = {
  id: "liheap",
  name: "Low Income Home Energy Assistance Program (LIHEAP)",
  shortName: "LIHEAP / Energy Assistance",
  description:
    "Helps pay heating and cooling bills. May also help with weatherization and energy-related home repairs.",
  category: "energy",
  federalOrState: "federal",
  applicationUrl: "https://www.acf.hhs.gov/ocs/programs/liheap",
  documentsNeeded: [
    "Photo ID",
    "Proof of income for all household members",
    "Recent utility bill",
    "Social Security numbers",
    "Proof of residency",
  ],
  checkEligibility(input: ScreeningInput) {
    const annualIncome = input.monthlyIncome * 12;

    // LIHEAP: 150% FPL or 60% state median income (varies by state)
    if (!isBelowFPLPercent(annualIncome, input.householdSize, 150)) {
      return {
        eligible: false,
        confidence: "medium",
        reason:
          "Income exceeds 150% FPL. Some states use higher thresholds — check your state.",
      };
    }

    const hasElderlyOrDisabled = input.householdMembers.some(
      (m) => m.age >= 60 || m.isDisabled,
    );

    return {
      eligible: true,
      confidence: "medium",
      reason: hasElderlyOrDisabled
        ? "You qualify and may receive priority as a household with elderly or disabled members."
        : "Your income is within LIHEAP limits for your household size.",
      estimatedMonthlyValue: 50,
      estimatedAnnualValue: 600,
      nextSteps: [
        "Apply through your local Community Action Agency",
        "Apply before winter heating season for best chances",
        hasElderlyOrDisabled
          ? "Mention elderly/disabled status — you may get priority"
          : "",
      ].filter(Boolean),
    };
  },
};
