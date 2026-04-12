import type {
  BenefitProgram,
  EligibilityEvaluation,
  MissingField,
  RuleResult,
  ScreeningInput,
  Signal,
} from "../types";

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
  checkEligibility(input: ScreeningInput): EligibilityEvaluation {
    const annualIncome = input.monthlyIncome * 12;
    // Section 8: generally 50% of Area Median Income (AMI)
    // Simplified: ~50% AMI roughly equals household size * 15000
    const roughAMI50 = input.householdSize * 15000;
    const incomeRatio = Math.round((annualIncome / roughAMI50) * 100);

    const hasElderlyOrDisabled = input.householdMembers.some(
      (m) => m.age >= 62 || m.isDisabled,
    );
    const hasChildren = input.householdMembers.some(
      (m) => m.relationship === "child",
    );
    const rentEstimate = input.monthlyExpenses?.rent ?? 0;
    const rentBurden =
      input.monthlyIncome > 0 ? rentEstimate / input.monthlyIncome : 0;

    // Rules
    const rules: RuleResult[] = [
      {
        name: "income_under_80_ami",
        label:
          "Income below 80% of Area Median Income (approximate national average)",
        passed: annualIncome <= roughAMI50 * 1.6,
        weight: 50,
        veto: true,
        actual: `~${incomeRatio}% of 50% AMI`,
        threshold: "≤160% of 50% AMI (~80% AMI)",
      },
    ];

    // Signals
    const signals: Signal[] = [
      {
        name: "has_elderly_or_disabled",
        label: "Household includes elderly (62+) or disabled members",
        matched: hasElderlyOrDisabled,
        weight: 10,
      },
      {
        name: "has_children",
        label: "Families with children often receive preference",
        matched: hasChildren,
        weight: 10,
      },
      {
        name: "high_rent_burden",
        label: "Rent exceeds 50% of income (priority indicator)",
        matched: rentBurden > 0.5,
        weight: 10,
      },
      {
        name: "income_under_50_ami",
        label: "Income below 50% AMI (very low income, higher priority)",
        matched: annualIncome <= roughAMI50,
        weight: 5,
      },
    ];

    // Missing fields
    const missing: MissingField[] = [];
    if (!input.monthlyExpenses?.rent) {
      missing.push({
        field: "monthly_rent",
        label: "Current monthly rent payment",
        penalty: 5,
      });
    }
    if (input.assets === undefined) {
      missing.push({
        field: "liquid_assets",
        label: "Liquid assets (bank accounts, cash)",
        penalty: 3,
      });
    }

    // Determine reason
    const incomePassed = rules[0]!.passed;

    let reason: string;
    if (!incomePassed) {
      reason =
        "Income likely exceeds 80% of Area Median Income. Limits vary significantly by location.";
    } else {
      reason =
        "You may qualify based on household income. Waitlists can be long; apply early.";
    }

    const estimatedMonthly =
      rentEstimate > 0 ? Math.round(rentEstimate * 0.5) : 500;

    return {
      rules,
      signals,
      missing,
      reason,
      estimatedMonthlyValue: incomePassed ? estimatedMonthly : undefined,
      estimatedAnnualValue: incomePassed ? estimatedMonthly * 12 : undefined,
      nextSteps: incomePassed
        ? [
            "Contact your local Public Housing Authority (PHA)",
            "Waitlists are common; apply as soon as possible",
            rentBurden > 0.5
              ? "Your rent is over 50% of income; mention this for possible priority"
              : "",
            hasElderlyOrDisabled
              ? "Elderly/disabled households may qualify for preference"
              : "",
            hasChildren ? "Families with children often get preference" : "",
          ].filter(Boolean)
        : undefined,
    };
  },
};
