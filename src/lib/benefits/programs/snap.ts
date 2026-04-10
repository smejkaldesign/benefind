import type {
  BenefitProgram,
  EligibilityEvaluation,
  MissingField,
  RuleResult,
  ScreeningInput,
  Signal,
} from "../types";
import { getFPL, isBelowFPLPercent } from "../types";

/** SNAP max monthly allotments by household size (FY2025) */
const SNAP_MAX_ALLOTMENT: Record<number, number> = {
  1: 292,
  2: 536,
  3: 768,
  4: 975,
  5: 1158,
  6: 1390,
  7: 1536,
  8: 1756,
};

function getMaxAllotment(size: number): number {
  if (size <= 8) return SNAP_MAX_ALLOTMENT[size] ?? 292;
  return SNAP_MAX_ALLOTMENT[8]! + (size - 8) * 220;
}

export const snap: BenefitProgram = {
  id: "snap",
  name: "Supplemental Nutrition Assistance Program (SNAP)",
  shortName: "SNAP / Food Stamps",
  description:
    "Monthly benefits on an EBT card to buy groceries. Accepted at most grocery stores and farmers markets.",
  category: "food",
  federalOrState: "federal",
  applicationUrl: "https://www.fns.usda.gov/snap/state-directory",
  documentsNeeded: [
    "Photo ID",
    "Proof of income (pay stubs, tax return)",
    "Proof of residency (utility bill, lease)",
    "Social Security numbers for household members",
    "Bank statements (if applicable)",
  ],
  checkEligibility(input: ScreeningInput): EligibilityEvaluation {
    const annualIncome = input.monthlyIncome * 12;
    const fpl = getFPL(input.householdSize);
    const grossIncomePercent = Math.round((annualIncome / fpl) * 100);

    // Compute net income with simplified deductions
    const deductions =
      (input.monthlyExpenses?.childcare ?? 0) * 0.5 +
      Math.min(input.monthlyExpenses?.medical ?? 0, 200);
    const standardDeduction = 184; // 2025 standard deduction (approx)
    const netMonthly =
      input.monthlyIncome - deductions - standardDeduction;
    const netAnnual = netMonthly * 12;
    const netIncomePercent = Math.round((netAnnual / fpl) * 100);

    const hasElderlyOrDisabled = input.householdMembers.some(
      (m) => m.age >= 60 || m.isDisabled,
    );
    const hasCitizenMember = input.householdMembers.some(
      (m) => m.isCitizen !== false, // undefined = assume citizen
    );

    // Rules (hard constraints with veto power on the critical ones)
    const rules: RuleResult[] = [
      {
        name: "has_citizen_or_eligible_immigrant",
        label: "At least one household member is a US citizen or eligible immigrant",
        passed: hasCitizenMember,
        weight: 40,
        veto: true,
        actual: hasCitizenMember ? "Yes" : "No",
        threshold: "Required",
      },
      {
        name: "gross_income_under_130_fpl",
        label: "Gross income below 130% of FPL (or elderly/disabled exempt)",
        passed:
          isBelowFPLPercent(annualIncome, input.householdSize, 130) ||
          hasElderlyOrDisabled,
        weight: 35,
        veto: !hasElderlyOrDisabled, // elderly/disabled households skip this test
        actual: `${grossIncomePercent}% FPL`,
        threshold: "≤130% FPL",
      },
      {
        name: "net_income_under_100_fpl",
        label: "Net income (after deductions) below 100% of FPL",
        passed: isBelowFPLPercent(netAnnual, input.householdSize, 100),
        weight: 25,
        actual: `${netIncomePercent}% FPL (estimated)`,
        threshold: "≤100% FPL",
      },
    ];

    // Signals (bonuses, non-veto)
    const signals: Signal[] = [
      {
        name: "has_elderly_or_disabled_member",
        label: "Household includes someone age 60+ or disabled",
        matched: hasElderlyOrDisabled,
        weight: 10,
      },
      {
        name: "has_children",
        label: "Household includes children under 18",
        matched: input.householdMembers.some((m) => m.age < 18),
        weight: 10,
      },
      {
        name: "low_assets",
        label: "Liquid assets below $2,750 (or $4,250 for elderly/disabled households)",
        matched: (input.assets ?? 0) <= (hasElderlyOrDisabled ? 4250 : 2750),
        weight: 5,
      },
    ];

    // Missing fields that reduce confidence
    const missing: MissingField[] = [];
    if (input.assets === undefined) {
      missing.push({
        field: "liquid_assets",
        label: "Liquid asset total (bank accounts, cash)",
        penalty: 5,
      });
    }
    if (!input.monthlyExpenses) {
      missing.push({
        field: "monthly_expenses",
        label: "Monthly expenses (rent, childcare, medical) for accurate deductions",
        penalty: 5,
      });
    }
    const hasCitizenshipData = input.householdMembers.every(
      (m) => m.isCitizen !== undefined,
    );
    if (!hasCitizenshipData) {
      missing.push({
        field: "citizenship_status",
        label: "Citizenship or immigration status for all household members",
        penalty: 3,
      });
    }

    // Estimate benefit (only meaningful if rules mostly pass)
    const maxBenefit = getMaxAllotment(input.householdSize);
    const estimatedMonthly = Math.max(
      maxBenefit - Math.round(netMonthly * 0.3),
      23, // $23 minimum allotment
    );

    // Determine the user-facing reason string based on which rules passed
    const grossPassed = rules[1]!.passed;
    const netPassed = rules[2]!.passed;
    const citizenPassed = rules[0]!.passed;

    let reason: string;
    if (!citizenPassed) {
      reason =
        "SNAP requires at least one household member to be a US citizen or qualified immigrant.";
    } else if (!grossPassed) {
      reason = `Your gross income (${grossIncomePercent}% FPL) exceeds the 130% SNAP threshold.`;
    } else if (!netPassed) {
      reason = `Your estimated net income (${netIncomePercent}% FPL) exceeds the 100% threshold. Actual deductions may differ — apply to confirm.`;
    } else {
      reason =
        "Based on your household size and income, you likely qualify for SNAP benefits.";
    }

    return {
      rules,
      signals,
      missing,
      reason,
      estimatedMonthlyValue: netPassed ? estimatedMonthly : undefined,
      estimatedAnnualValue: netPassed ? estimatedMonthly * 12 : undefined,
      nextSteps: netPassed
        ? [
            "Apply online through your state SNAP office",
            "Prepare income verification documents (last 30 days of pay stubs)",
            "Schedule an interview (phone or in-person)",
            "Bring ID, proof of residency, and Social Security numbers",
          ]
        : undefined,
    };
  },
  estimateMonthly(input: ScreeningInput) {
    const raw = this.checkEligibility(input);
    // Both shapes have estimatedMonthlyValue in the same place
    return (raw as { estimatedMonthlyValue?: number }).estimatedMonthlyValue ?? null;
  },
};
