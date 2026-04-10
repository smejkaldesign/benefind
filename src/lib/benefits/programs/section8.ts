import type { BenefitProgram, ScreeningInput } from "../types";

export const section8: BenefitProgram = {
  id: "section8",
  name: "Housing Choice Voucher Program (Section 8)",
  shortName: "Section 8 Housing",
  description:
    "Vouchers that help pay rent in private housing. You find an apartment, and the voucher covers part of the rent.",
  category: "housing",
  federalOrState: "federal",
  applicationUrl:
    "https://www.hud.gov/topics/housing_choice_voucher_program_section_8",
  documentsNeeded: [
    "Photo ID for all adult household members",
    "Birth certificates for children",
    "Social Security cards",
    "Proof of income (pay stubs, tax returns, benefit letters)",
    "Proof of citizenship or eligible immigration status",
    "Bank statements",
  ],
  checkEligibility(input: ScreeningInput) {
    // Section 8: generally 50% of Area Median Income (AMI)
    // Simplified: ~50% AMI ≈ roughly 150-200% FPL depending on area
    // Using conservative 80% AMI threshold for initial eligibility signal
    const annualIncome = input.monthlyIncome * 12;
    const roughAMI50 = input.householdSize * 15000; // Very rough national average

    if (annualIncome > roughAMI50 * 1.6) {
      return {
        eligible: false,
        confidence: "low",
        reason:
          "Income likely exceeds 80% of Area Median Income. Limits vary significantly by location.",
      };
    }

    const hasElderlyOrDisabled = input.householdMembers.some(
      (m) => m.age >= 62 || m.isDisabled,
    );
    const hasChildren = input.householdMembers.some(
      (m) => m.relationship === "child",
    );

    const rentEstimate = input.monthlyExpenses?.rent ?? 0;
    const rentBurden =
      input.monthlyIncome > 0 ? rentEstimate / input.monthlyIncome : 0;

    return {
      eligible: true,
      confidence: "low",
      reason:
        "You may qualify based on household income. Waitlists can be long — apply early.",
      estimatedMonthlyValue:
        rentEstimate > 0 ? Math.round(rentEstimate * 0.5) : 500,
      estimatedAnnualValue:
        (rentEstimate > 0 ? Math.round(rentEstimate * 0.5) : 500) * 12,
      nextSteps: [
        "Contact your local Public Housing Authority (PHA)",
        "Waitlists are common — apply as soon as possible",
        rentBurden > 0.5
          ? "Your rent is over 50% of income — mention this for possible priority"
          : "",
        hasElderlyOrDisabled
          ? "Elderly/disabled households may qualify for preference"
          : "",
        hasChildren ? "Families with children often get preference" : "",
      ].filter(Boolean),
    };
  },
};
