import type {
  BenefitProgram,
  EligibilityEvaluation,
  MissingField,
  RuleResult,
  ScreeningInput,
  Signal,
} from "../types";
import { getFPL, isBelowFPLPercent } from "../types";

export const chip: BenefitProgram = {
  id: "chip",
  name: "Children's Health Insurance Program (CHIP)",
  shortName: "CHIP",
  description:
    "Low-cost health coverage for children in families that earn too much for Medicaid but can't afford private insurance.",
  category: "healthcare",
  federalOrState: "federal",
  applicationUrl:
    "https://www.healthcare.gov/medicaid-chip/childrens-health-insurance-program/",
  documentsNeeded: [
    "Photo ID for parent/guardian",
    "Child's birth certificate or Social Security number",
    "Proof of income",
    "Proof of residency",
  ],
  checkEligibility(input: ScreeningInput): EligibilityEvaluation {
    const annualIncome = input.monthlyIncome * 12;
    const fpl = getFPL(input.householdSize);
    const incomePercent = Math.round((annualIncome / fpl) * 100);
    const children = input.householdMembers.filter(
      (m) => m.relationship === "child" && m.age < 19,
    );

    // Rules
    const rules: RuleResult[] = [
      {
        name: "has_children_under_19",
        label: "Household includes children under 19",
        passed: children.length > 0,
        weight: 40,
        veto: true,
        actual:
          children.length > 0
            ? `${children.length} child${children.length === 1 ? "" : "ren"}`
            : "None",
        threshold: "Required",
      },
      {
        name: "income_above_medicaid_threshold",
        label: "Income above Medicaid threshold (138% FPL)",
        passed: !isBelowFPLPercent(annualIncome, input.householdSize, 138),
        weight: 15,
        actual: `${incomePercent}% FPL`,
        threshold: ">138% FPL",
      },
      {
        name: "income_under_250_fpl",
        label: "Income below 250% of FPL (varies by state, some up to 300%)",
        passed: isBelowFPLPercent(annualIncome, input.householdSize, 250),
        weight: 30,
        actual: `${incomePercent}% FPL`,
        threshold: "≤250% FPL",
      },
    ];

    // Signals
    const signals: Signal[] = [
      {
        name: "children_currently_uninsured",
        label: "Children currently lack health insurance",
        matched: input.hasHealthInsurance === false,
        weight: 10,
      },
      {
        name: "state_extends_to_300_fpl",
        label: "Some states extend CHIP to 300% FPL",
        matched:
          !isBelowFPLPercent(annualIncome, input.householdSize, 250) &&
          isBelowFPLPercent(annualIncome, input.householdSize, 300),
        weight: 5,
      },
    ];

    // Missing fields
    const missing: MissingField[] = [];
    if (input.hasHealthInsurance === undefined) {
      missing.push({
        field: "health_insurance_status",
        label: "Current health insurance status for children",
        penalty: 3,
      });
    }

    // Determine reason
    const hasChildren = rules[0]!.passed;
    const aboveMedicaid = rules[1]!.passed;
    const belowCHIP = rules[2]!.passed;

    let reason: string;
    if (!hasChildren) {
      reason = "CHIP is for children under 19.";
    } else if (!aboveMedicaid) {
      reason =
        "Your children likely qualify for Medicaid instead (lower cost). Check Medicaid first.";
    } else if (!belowCHIP) {
      reason =
        "Income may exceed CHIP limits in most states. Some states go up to 300% FPL; check your state.";
    } else {
      reason = `${children.length} ${children.length === 1 ? "child" : "children"} may qualify for CHIP coverage.`;
    }

    return {
      rules,
      signals,
      missing,
      reason,
      estimatedMonthlyValue:
        hasChildren && belowCHIP ? children.length * 200 : undefined,
      estimatedAnnualValue:
        hasChildren && belowCHIP ? children.length * 2400 : undefined,
      nextSteps:
        hasChildren && belowCHIP
          ? [
              "Apply through Healthcare.gov or your state CHIP program",
              "Coverage often starts immediately once approved",
              "Premiums are very low or free depending on income",
            ]
          : undefined,
    };
  },
};
