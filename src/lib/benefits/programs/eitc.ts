import type {
  BenefitProgram,
  EligibilityEvaluation,
  MissingField,
  RuleResult,
  ScreeningInput,
  Signal,
} from "../types";

/** EITC income limits and max credits (2025 tax year, approximate) */
const EITC_LIMITS = {
  0: { maxIncome: 18591, maxCredit: 632 },
  1: { maxIncome: 49084, maxCredit: 3995 },
  2: { maxIncome: 55768, maxCredit: 6604 },
  3: { maxIncome: 59899, maxCredit: 7430 },
};

// States with a matching state EITC program.
// Source: CBPP "Policy Basics: State Earned Income Tax Credits" + IRS publications.
// Last verified: 2026-04-11 for 2025 tax year.
// Note: North Carolina is deliberately NOT on this list — NC eliminated its state
// EITC in 2014 (the only state ever to do so). SB 211 (2025) would reenact it but
// is a proposed bill, not enacted law. Re-check annually — see umbrella task
// "Annual state benefits data refresh" for the audit schedule.
const STATE_EITC_STATES = new Set([
  "CA",
  "CO",
  "CT",
  "DC",
  "DE",
  "IL",
  "IA",
  "KS",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MT",
  "NE",
  "NJ",
  "NM",
  "NY",
  "OH",
  "OK",
  "OR",
  "RI",
  "SC",
  "VT",
  "VA",
  "WA",
  "WI",
]);

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
  checkEligibility(input: ScreeningInput): EligibilityEvaluation {
    const annualIncome = input.monthlyIncome * 12;
    const hasEarnedIncome =
      (input.isEmployed ?? false) || input.monthlyIncome > 0;

    const qualifyingChildren = input.householdMembers.filter(
      (m) => m.relationship === "child" && m.age < 19 && m.isCitizen !== false,
    ).length;
    const tierIndex = Math.min(qualifyingChildren, 3) as 0 | 1 | 2 | 3;
    const limits = EITC_LIMITS[tierIndex];
    const underLimit = annualIncome <= limits.maxIncome;

    const selfMember = input.householdMembers.find(
      (m) => m.relationship === "self",
    );
    const filerAge = selfMember?.age ?? 25;
    const ageOk = qualifyingChildren > 0 || (filerAge >= 25 && filerAge <= 64);

    const rules: RuleResult[] = [
      {
        name: "has_earned_income",
        label: "Has earned income (wages, salary, or self-employment)",
        passed: hasEarnedIncome,
        weight: 40,
        veto: true,
        actual: hasEarnedIncome
          ? `$${annualIncome.toLocaleString()}/yr`
          : "$0/yr",
        threshold: "Must be > $0",
      },
      {
        name: "income_under_eitc_limit",
        label: `Income below EITC limit for ${qualifyingChildren} qualifying children`,
        passed: underLimit,
        weight: 35,
        actual: `$${annualIncome.toLocaleString()}`,
        threshold: `≤$${limits.maxIncome.toLocaleString()}`,
      },
      {
        name: "filer_age_ok",
        label: "Filer age 25-64 (or has qualifying children)",
        passed: ageOk,
        weight: 15,
        actual: `${filerAge} years old`,
        threshold: qualifyingChildren > 0 ? "Any age" : "25-64",
      },
      {
        name: "investment_income_ok",
        label: "Investment income below $11,600 (2025)",
        // We don't collect this, assume true but flag as missing
        passed: true,
        weight: 10,
      },
    ];

    const signals: Signal[] = [
      {
        name: "has_qualifying_children",
        label: `${qualifyingChildren} qualifying ${qualifyingChildren === 1 ? "child" : "children"}`,
        matched: qualifyingChildren > 0,
        weight: 15,
      },
      {
        name: "state_has_matching_eitc",
        label: `${input.state} offers a state EITC that stacks with the federal credit`,
        matched: STATE_EITC_STATES.has(input.state),
        weight: 10,
      },
      {
        name: "under_free_file_threshold",
        label: "Income qualifies for IRS Free File (<$84,000)",
        matched: annualIncome < 84000,
        weight: 5,
      },
    ];

    const missing: MissingField[] = [
      {
        field: "investment_income",
        label: "Investment income (dividends, interest, capital gains)",
        penalty: 3,
      },
      {
        field: "filing_status",
        label: "Tax filing status (single, MFJ, HOH, MFS)",
        penalty: 3,
      },
    ];

    // Compute estimated credit
    let estimatedAnnual: number | undefined;
    if (hasEarnedIncome && underLimit && ageOk) {
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
      estimatedAnnual = estimated;
    }

    let reason: string;
    if (!hasEarnedIncome) {
      reason =
        "EITC requires earned income from wages, salary, or self-employment. If you have unreported cash income, it still counts if you file a return.";
    } else if (!underLimit) {
      reason = `Your annual income ($${annualIncome.toLocaleString()}) exceeds the EITC limit of $${limits.maxIncome.toLocaleString()} for ${qualifyingChildren} qualifying ${qualifyingChildren === 1 ? "child" : "children"}.`;
    } else if (!ageOk) {
      reason =
        "Without qualifying children, EITC requires the filer to be between 25 and 64 years old.";
    } else {
      reason = `You likely qualify for the EITC with ${qualifyingChildren} qualifying ${qualifyingChildren === 1 ? "child" : "children"}. ${STATE_EITC_STATES.has(input.state) ? `${input.state} also offers a matching state credit.` : ""}`;
    }

    return {
      rules,
      signals,
      missing,
      reason,
      estimatedAnnualValue: estimatedAnnual,
      estimatedMonthlyValue: estimatedAnnual
        ? Math.round(estimatedAnnual / 12)
        : undefined,
      nextSteps:
        hasEarnedIncome && underLimit && ageOk
          ? [
              "File a federal tax return to claim the credit",
              annualIncome < 84000
                ? "Use IRS Free File — it's actually free"
                : "Use your preferred tax software or a CPA",
              STATE_EITC_STATES.has(input.state)
                ? `Claim the ${input.state} state EITC on your state return`
                : "Check if your state has added a state EITC recently",
              "The credit is refundable — you can get money back even if you owe $0 in taxes",
            ]
          : undefined,
    };
  },
};
