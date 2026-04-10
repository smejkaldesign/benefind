import type { BenefitProgram, ScreeningInput } from "../types";

/** EITC income limits and max credits (2025 tax year, approximate) */
const EITC_LIMITS = {
  0: { maxIncome: 18591, maxCredit: 632 },
  1: { maxIncome: 49084, maxCredit: 3995 },
  2: { maxIncome: 55768, maxCredit: 6604 },
  3: { maxIncome: 59899, maxCredit: 7430 },
};

export const eitc: BenefitProgram = {
  id: "eitc",
  name: "Earned Income Tax Credit (EITC)",
  shortName: "EITC",
  description:
    "A tax credit for working people with low to moderate income. You may get money back even if you owe no tax.",
  category: "tax-credit",
  federalOrState: "federal",
  applicationUrl:
    "https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit-eitc",
  documentsNeeded: [
    "W-2 forms from all employers",
    "Social Security numbers for you and dependents",
    "Valid filing status information",
    "Tax return (filed or to be filed)",
  ],
  checkEligibility(input: ScreeningInput) {
    if (!input.isEmployed && input.monthlyIncome === 0) {
      return {
        eligible: false,
        confidence: "high",
        reason:
          "EITC requires earned income (wages, salary, or self-employment income).",
      };
    }

    const annualIncome = input.monthlyIncome * 12;
    const qualifyingChildren = input.householdMembers.filter(
      (m) => m.relationship === "child" && m.age < 19 && m.isCitizen !== false,
    ).length;

    const tier = Math.min(qualifyingChildren, 3) as 0 | 1 | 2 | 3;
    const limits = EITC_LIMITS[tier];

    if (annualIncome > limits.maxIncome) {
      return {
        eligible: false,
        confidence: "medium",
        reason: `Annual income ($${annualIncome.toLocaleString()}) exceeds the EITC limit of $${limits.maxIncome.toLocaleString()} for ${qualifyingChildren} qualifying ${qualifyingChildren === 1 ? "child" : "children"}.`,
      };
    }

    // Simplified estimate — actual depends on filing status and exact income curve
    const incomeRatio = annualIncome / limits.maxIncome;
    let estimated: number;
    if (incomeRatio < 0.5) {
      estimated = Math.round(limits.maxCredit * incomeRatio * 1.5);
    } else {
      estimated = Math.round(
        limits.maxCredit * (1 - (incomeRatio - 0.5) * 1.2),
      );
    }
    estimated = Math.max(estimated, 100);
    estimated = Math.min(estimated, limits.maxCredit);

    return {
      eligible: true,
      confidence: "medium",
      reason: `You likely qualify for the EITC with ${qualifyingChildren} qualifying ${qualifyingChildren === 1 ? "child" : "children"}.`,
      estimatedAnnualValue: estimated,
      estimatedMonthlyValue: Math.round(estimated / 12),
      nextSteps: [
        "File a federal tax return to claim the credit",
        "Use IRS Free File if income is under $84,000",
        "Check if your state has a matching state EITC",
      ],
    };
  },
};
