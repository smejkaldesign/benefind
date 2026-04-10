import type { BenefitProgram, ScreeningInput } from "../types";
import { isBelowFPLPercent } from "../types";

export const medicaid: BenefitProgram = {
  id: "medicaid",
  name: "Medicaid",
  shortName: "Medicaid",
  description:
    "Free or low-cost health coverage for low-income adults, children, pregnant women, elderly, and people with disabilities.",
  category: "healthcare",
  federalOrState: "federal",
  applicationUrl:
    "https://www.healthcare.gov/medicaid-chip/getting-medicaid-chip/",
  documentsNeeded: [
    "Photo ID",
    "Proof of income",
    "Proof of residency",
    "Social Security number",
    "Proof of citizenship or immigration status",
  ],
  checkEligibility(input: ScreeningInput) {
    const annualIncome = input.monthlyIncome * 12;

    // Most expansion states: 138% FPL for adults
    // Children: up to 200-300% FPL depending on state
    // Pregnant women: up to 200% FPL in most states
    const hasChildren = input.householdMembers.some((m) => m.age < 19);
    const hasPregnant = input.householdMembers.some((m) => m.isPregnant);

    if (
      hasPregnant &&
      isBelowFPLPercent(annualIncome, input.householdSize, 200)
    ) {
      return {
        eligible: true,
        confidence: "high",
        reason:
          "Pregnant women in most states qualify for Medicaid at up to 200% FPL.",
        estimatedMonthlyValue: 500,
        estimatedAnnualValue: 6000,
        nextSteps: [
          "Apply through your state Medicaid office or Healthcare.gov",
          "Coverage can begin the same month you apply",
        ],
      };
    }

    if (
      hasChildren &&
      isBelowFPLPercent(annualIncome, input.householdSize, 200)
    ) {
      return {
        eligible: true,
        confidence: "high",
        reason:
          "Children under 19 typically qualify at higher income levels than adults.",
        estimatedMonthlyValue: 350,
        estimatedAnnualValue: 4200,
        nextSteps: [
          "Apply through your state Medicaid office",
          "Children may qualify even if parents do not",
          "Also check CHIP if income is slightly above Medicaid limits",
        ],
      };
    }

    // Adult expansion (ACA): 138% FPL
    if (isBelowFPLPercent(annualIncome, input.householdSize, 138)) {
      return {
        eligible: true,
        confidence: "medium",
        reason:
          "Your income is below 138% FPL. Most states have expanded Medicaid to this level.",
        estimatedMonthlyValue: 500,
        estimatedAnnualValue: 6000,
        nextSteps: [
          "Apply through Healthcare.gov or your state Medicaid office",
          "Check if your state has expanded Medicaid (10 states have not)",
        ],
      };
    }

    return {
      eligible: false,
      confidence: "medium",
      reason:
        "Income appears above Medicaid limits, but eligibility varies by state. Check ACA marketplace subsidies.",
    };
  },
};
