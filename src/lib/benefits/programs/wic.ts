import type { BenefitProgram, ScreeningInput } from "../types";
import { isBelowFPLPercent } from "../types";

export const wic: BenefitProgram = {
  id: "wic",
  name: "Women, Infants, and Children (WIC)",
  shortName: "WIC",
  description:
    "Nutrition assistance for pregnant, breastfeeding, and postpartum women, and children under 5. Provides food vouchers, nutrition education, and healthcare referrals.",
  category: "food",
  federalOrState: "federal",
  applicationUrl: "https://www.fns.usda.gov/wic/wic-how-apply",
  documentsNeeded: [
    "Photo ID",
    "Proof of income",
    "Proof of residency",
    "Proof of pregnancy or child birth certificate",
    "Immunization records for children",
  ],
  checkEligibility(input: ScreeningInput) {
    const annualIncome = input.monthlyIncome * 12;
    const hasPregnant = input.householdMembers.some((m) => m.isPregnant);
    const hasInfantsOrToddlers = input.householdMembers.some(
      (m) => m.relationship === "child" && m.age < 5,
    );

    if (!hasPregnant && !hasInfantsOrToddlers) {
      return {
        eligible: false,
        confidence: "high",
        reason: "WIC is for pregnant/postpartum women and children under 5.",
      };
    }

    // WIC income limit: 185% FPL
    if (!isBelowFPLPercent(annualIncome, input.householdSize, 185)) {
      return {
        eligible: false,
        confidence: "medium",
        reason:
          "Income exceeds 185% FPL. However, if you receive SNAP, Medicaid, or TANF, you automatically qualify.",
      };
    }

    const eligibleCount = input.householdMembers.filter(
      (m) => m.isPregnant || (m.relationship === "child" && m.age < 5),
    ).length;

    return {
      eligible: true,
      confidence: "high",
      reason: `You have ${eligibleCount} eligible household ${eligibleCount === 1 ? "member" : "members"} and meet income requirements.`,
      estimatedMonthlyValue: eligibleCount * 75,
      estimatedAnnualValue: eligibleCount * 75 * 12,
      nextSteps: [
        "Contact your local WIC office to schedule an appointment",
        "Bring proof of income and residency",
        "Appointments are usually available within 2 weeks",
      ],
    };
  },
};
