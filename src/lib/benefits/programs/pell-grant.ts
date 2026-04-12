import type {
  BenefitProgram,
  EligibilityEvaluation,
  MissingField,
  RuleResult,
  ScreeningInput,
  Signal,
} from "../types";

export const pellGrant: BenefitProgram = {
  id: "pell-grant",
  name: "Federal Pell Grant",
  shortName: "Pell Grant",
  description:
    "Free money for college; does not need to be repaid. For undergraduate students with financial need.",
  category: "education",
  federalOrState: "federal",
  applicationUrl: "https://studentaid.gov/h/apply-for-aid/fafsa",
  documentsNeeded: [
    "Social Security number",
    "Federal tax returns or W-2 forms",
    "Driver's license (if applicable)",
    "Records of untaxed income",
    "Bank statements",
  ],
  checkEligibility(input: ScreeningInput): EligibilityEvaluation {
    const hasStudent = input.householdMembers.some((m) => m.isStudent);
    const selfIsStudent = input.householdMembers.find(
      (m) => m.relationship === "self",
    )?.isStudent;
    const annualIncome = input.monthlyIncome * 12;

    // Rules
    const rules: RuleResult[] = [
      {
        name: "has_undergraduate_student",
        label:
          "Household includes a current or prospective undergraduate student",
        passed: hasStudent || selfIsStudent === true,
        weight: 40,
        veto: true,
        actual: hasStudent || selfIsStudent ? "Yes" : "No",
        threshold: "Required",
      },
      {
        name: "income_under_pell_threshold",
        label: "Family income below typical Pell Grant threshold (~$60,000)",
        passed: annualIncome <= 60000,
        weight: 35,
        actual: `$${annualIncome.toLocaleString()}/yr`,
        threshold: "≤$60,000/yr",
      },
    ];

    // Signals
    const signals: Signal[] = [
      {
        name: "very_low_income",
        label: "Income under $30,000 (likely qualifies for maximum Pell)",
        matched: annualIncome < 30000,
        weight: 15,
      },
      {
        name: "has_dependents",
        label: "Household has dependent children (increases financial need)",
        matched: input.householdMembers.some((m) => m.relationship === "child"),
        weight: 5,
      },
    ];

    // Missing fields
    const missing: MissingField[] = [];
    if (input.assets === undefined) {
      missing.push({
        field: "liquid_assets",
        label: "Savings and investment balances (affects EFC calculation)",
        penalty: 5,
      });
    }
    if (!input.householdMembers.some((m) => m.isStudent !== undefined)) {
      missing.push({
        field: "student_status",
        label: "Student enrollment status for household members",
        penalty: 5,
      });
    }

    // Determine reason
    const studentPassed = rules[0]!.passed;
    const incomePassed = rules[1]!.passed;

    let reason: string;
    if (!studentPassed) {
      reason =
        "Pell Grants are for current or prospective undergraduate students.";
    } else if (!incomePassed) {
      reason =
        "Family income may be above typical Pell Grant threshold. File FAFSA to check; special circumstances may qualify.";
    } else {
      reason =
        "Based on household income, you likely qualify for a Pell Grant.";
    }

    // Max Pell 2025-26: $7,395
    let estimated: number | undefined;
    if (studentPassed && incomePassed) {
      if (annualIncome < 30000) {
        estimated = 7395;
      } else {
        estimated = Math.round(7395 * (1 - (annualIncome - 30000) / 30000));
      }
      estimated = Math.max(estimated, 750);
    }

    return {
      rules,
      signals,
      missing,
      reason,
      estimatedAnnualValue: estimated,
      estimatedMonthlyValue:
        estimated !== undefined ? Math.round(estimated / 12) : undefined,
      nextSteps:
        studentPassed && incomePassed
          ? [
              "Complete the FAFSA at studentaid.gov",
              "FAFSA opens October 1 each year",
              "You can receive Pell Grants for up to 12 semesters",
              "No repayment required; this is free money",
            ]
          : undefined,
    };
  },
};
