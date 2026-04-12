import type {
  BenefitProgram,
  EligibilityEvaluation,
  MissingField,
  RuleResult,
  ScreeningInput,
  Signal,
} from "../types";
import { getFPL, isBelowFPLPercent } from "../types";

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
  checkEligibility(input: ScreeningInput): EligibilityEvaluation {
    const annualIncome = input.monthlyIncome * 12;
    const fpl = getFPL(input.householdSize);
    const incomePercent = Math.round((annualIncome / fpl) * 100);
    const hasPregnant = input.householdMembers.some((m) => m.isPregnant);
    const hasInfantsOrToddlers = input.householdMembers.some(
      (m) => m.relationship === "child" && m.age < 5,
    );
    const eligibleCount = input.householdMembers.filter(
      (m) => m.isPregnant || (m.relationship === "child" && m.age < 5),
    ).length;

    // Rules
    const rules: RuleResult[] = [
      {
        name: "has_eligible_category",
        label:
          "Household includes a pregnant/postpartum woman or child under 5",
        passed: hasPregnant || hasInfantsOrToddlers,
        weight: 40,
        veto: true,
        actual:
          hasPregnant || hasInfantsOrToddlers
            ? `${eligibleCount} eligible member${eligibleCount === 1 ? "" : "s"}`
            : "None",
        threshold: "Required",
      },
      {
        name: "income_under_185_fpl",
        label: "Household income below 185% of FPL",
        passed: isBelowFPLPercent(annualIncome, input.householdSize, 185),
        weight: 35,
        veto: false, // adjunctive eligibility via SNAP/Medicaid/TANF can override
        actual: `${incomePercent}% FPL`,
        threshold: "≤185% FPL",
      },
    ];

    // Signals
    const signals: Signal[] = [
      {
        name: "receives_snap_medicaid_tanf",
        label:
          "Receives SNAP, Medicaid, or TANF (auto-qualifies for WIC income)",
        matched: false, // We don't collect this yet, but it's a known signal
        weight: 15,
      },
      {
        name: "has_infants_under_1",
        label: "Household includes infants under 1 year",
        matched: input.householdMembers.some(
          (m) => m.relationship === "child" && m.age < 1,
        ),
        weight: 5,
      },
    ];

    // Missing fields
    const missing: MissingField[] = [];
    if (
      input.householdMembers.every(
        (m) => m.isPregnant === undefined && m.relationship !== "child",
      )
    ) {
      missing.push({
        field: "pregnancy_status",
        label: "Pregnancy status for household members",
        penalty: 5,
      });
    }

    // Determine reason
    const categoryPassed = rules[0]!.passed;
    const incomePassed = rules[1]!.passed;

    let reason: string;
    if (!categoryPassed) {
      reason = "WIC is for pregnant/postpartum women and children under 5.";
    } else if (!incomePassed) {
      reason =
        "Income exceeds 185% FPL. However, if you receive SNAP, Medicaid, or TANF, you automatically qualify.";
    } else {
      reason = `You have ${eligibleCount} eligible household ${eligibleCount === 1 ? "member" : "members"} and meet income requirements.`;
    }

    return {
      rules,
      signals,
      missing,
      reason,
      estimatedMonthlyValue:
        categoryPassed && incomePassed ? eligibleCount * 75 : undefined,
      estimatedAnnualValue:
        categoryPassed && incomePassed ? eligibleCount * 75 * 12 : undefined,
      nextSteps:
        categoryPassed && incomePassed
          ? [
              "Contact your local WIC office to schedule an appointment",
              "Bring proof of income and residency",
              "Appointments are usually available within 2 weeks",
            ]
          : undefined,
    };
  },
};
