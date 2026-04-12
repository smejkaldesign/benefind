import type {
  BenefitProgram,
  EligibilityEvaluation,
  MissingField,
  RuleResult,
  ScreeningInput,
  Signal,
} from "../types";
import { getFPL, isBelowFPLPercent } from "../types";

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
  checkEligibility(input: ScreeningInput): EligibilityEvaluation {
    const annualIncome = input.monthlyIncome * 12;
    const fpl = getFPL(input.householdSize);
    const incomePercent = Math.round((annualIncome / fpl) * 100);
    const hasElderlyOrDisabled = input.householdMembers.some(
      (m) => m.age >= 60 || m.isDisabled,
    );

    // Rules
    const rules: RuleResult[] = [
      {
        name: "income_under_150_fpl",
        label:
          "Household income below 150% of FPL (some states use higher thresholds)",
        passed: isBelowFPLPercent(annualIncome, input.householdSize, 150),
        weight: 50,
        veto: true,
        actual: `${incomePercent}% FPL`,
        threshold: "≤150% FPL",
      },
    ];

    // Signals
    const signals: Signal[] = [
      {
        name: "has_elderly_or_disabled",
        label: "Household includes elderly (60+) or disabled members",
        matched: hasElderlyOrDisabled,
        weight: 15,
      },
      {
        name: "has_children",
        label: "Household includes children under 18",
        matched: input.householdMembers.some((m) => m.age < 18),
        weight: 5,
      },
      {
        name: "high_energy_burden",
        label: "Energy costs are a significant share of income",
        matched:
          input.monthlyExpenses?.rent !== undefined &&
          input.monthlyIncome > 0 &&
          input.monthlyExpenses.rent / input.monthlyIncome > 0.3,
        weight: 5,
      },
    ];

    // Missing fields
    const missing: MissingField[] = [];
    if (!input.monthlyExpenses) {
      missing.push({
        field: "monthly_expenses",
        label: "Monthly utility and energy expenses",
        penalty: 5,
      });
    }

    // Determine reason
    const incomePassed = rules[0]!.passed;

    let reason: string;
    if (!incomePassed) {
      reason =
        "Income exceeds 150% FPL. Some states use higher thresholds; check your state.";
    } else if (hasElderlyOrDisabled) {
      reason =
        "You qualify and may receive priority as a household with elderly or disabled members.";
    } else {
      reason = "Your income is within LIHEAP limits for your household size.";
    }

    return {
      rules,
      signals,
      missing,
      reason,
      estimatedMonthlyValue: incomePassed ? 50 : undefined,
      estimatedAnnualValue: incomePassed ? 600 : undefined,
      nextSteps: incomePassed
        ? [
            "Apply through your local Community Action Agency",
            "Apply before winter heating season for best chances",
            hasElderlyOrDisabled
              ? "Mention elderly/disabled status; you may get priority"
              : "",
          ].filter(Boolean)
        : undefined,
    };
  },
};
