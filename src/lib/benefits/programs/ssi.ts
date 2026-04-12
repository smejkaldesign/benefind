import type {
  BenefitProgram,
  EligibilityEvaluation,
  MissingField,
  RuleResult,
  ScreeningInput,
  Signal,
} from "../types";

export const ssi: BenefitProgram = {
  id: "ssi",
  name: "Supplemental Security Income (SSI)",
  shortName: "SSI",
  description:
    "Monthly cash payments for people who are aged (65+), blind, or disabled with limited income and resources.",
  category: "income",
  federalOrState: "federal",
  applicationUrl: "https://www.ssa.gov/ssi/",
  documentsNeeded: [
    "Social Security card",
    "Birth certificate or proof of age",
    "Proof of disability (medical records)",
    "Proof of income and resources",
    "Proof of living situation",
    "Bank statements",
  ],
  checkEligibility(input: ScreeningInput): EligibilityEvaluation {
    const hasEligiblePerson = input.householdMembers.some(
      (m) => m.age >= 65 || m.isDisabled,
    );
    const isSingle = !input.householdMembers.some(
      (m) => m.relationship === "spouse",
    );
    const incomeLimit = isSingle ? 1971 : 2915;
    const assetLimit = isSingle ? 2000 : 3000;

    // Rules
    const rules: RuleResult[] = [
      {
        name: "has_aged_blind_disabled",
        label: "Household includes someone who is 65+, blind, or disabled",
        passed: hasEligiblePerson,
        weight: 40,
        veto: true,
        actual: hasEligiblePerson ? "Yes" : "No",
        threshold: "Required",
      },
      {
        name: "income_under_ssi_limit",
        label: `Monthly income below SSI limit ($${incomeLimit.toLocaleString()})`,
        passed: input.monthlyIncome <= incomeLimit,
        weight: 30,
        veto: true,
        actual: `$${input.monthlyIncome.toLocaleString()}/mo`,
        threshold: `≤$${incomeLimit.toLocaleString()}/mo`,
      },
      {
        name: "assets_under_ssi_limit",
        label: `Countable resources below $${assetLimit.toLocaleString()} (home and one vehicle excluded)`,
        passed: input.assets === undefined || input.assets <= assetLimit,
        weight: 20,
        veto: input.assets !== undefined,
        actual:
          input.assets !== undefined
            ? `$${input.assets.toLocaleString()}`
            : "Not provided",
        threshold: `≤$${assetLimit.toLocaleString()}`,
      },
    ];

    // Signals
    const signals: Signal[] = [
      {
        name: "is_single_filer",
        label: "Single individual (different limits than couples)",
        matched: isSingle,
        weight: 5,
      },
      {
        name: "has_state_supplement",
        label: "Many states add a supplement on top of federal SSI",
        matched: true, // always a positive signal for awareness
        weight: 5,
      },
    ];

    // Missing fields
    const missing: MissingField[] = [];
    if (input.assets === undefined) {
      missing.push({
        field: "liquid_assets",
        label: "Countable resources (bank accounts, cash, investments)",
        penalty: 8,
      });
    }

    // Determine reason
    const categoryPassed = rules[0]!.passed;
    const incomePassed = rules[1]!.passed;
    const assetsPassed = rules[2]!.passed;

    let reason: string;
    if (!categoryPassed) {
      reason = "SSI is for people who are 65+, blind, or disabled.";
    } else if (!incomePassed) {
      reason = `Monthly income ($${input.monthlyIncome.toLocaleString()}) exceeds SSI limit of $${incomeLimit.toLocaleString()}.`;
    } else if (!assetsPassed) {
      reason = `Countable resources ($${input.assets!.toLocaleString()}) exceed the $${assetLimit.toLocaleString()} limit. Home and one vehicle are typically excluded.`;
    } else {
      reason = "You may qualify based on age/disability and income level.";
    }

    // Federal SSI max: $967/mo individual, $1,450/mo couple (2025)
    const maxBenefit = isSingle ? 967 : 1450;
    const allPassed = categoryPassed && incomePassed && assetsPassed;
    const estimated = allPassed
      ? Math.max(maxBenefit - Math.round(input.monthlyIncome * 0.5), 100)
      : undefined;

    return {
      rules,
      signals,
      missing,
      reason,
      estimatedMonthlyValue: estimated,
      estimatedAnnualValue:
        estimated !== undefined ? estimated * 12 : undefined,
      nextSteps: allPassed
        ? [
            "Apply at your local Social Security office or call 1-800-772-1213",
            "Gather medical records documenting disability",
            "The application process can take 3-6 months",
            "Many states add a supplement on top of federal SSI",
          ]
        : undefined,
    };
  },
};
