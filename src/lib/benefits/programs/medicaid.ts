import type {
  BenefitProgram,
  EligibilityEvaluation,
  MissingField,
  RuleResult,
  ScreeningInput,
  Signal,
} from "../types";
import { getFPL, isBelowFPLPercent } from "../types";

// States that have NOT expanded Medicaid under the ACA (as of 2025)
const NON_EXPANSION_STATES = new Set([
  "AL", "FL", "GA", "KS", "MS", "SC", "TN", "TX", "WI", "WY",
]);

export const medicaid: BenefitProgram = {
  id: "medicaid",
  name: "Medicaid",
  shortName: "Medicaid",
  description:
    "Free or low-cost health coverage for low-income adults, children, pregnant women, elderly, and people with disabilities.",
  category: "healthcare",
  federalOrState: "federal",
  applicationUrl:
    "https://www.healthcare.gov/medicaid-chip/getting-medicaid-chip/",
  documentsNeeded: [
    "Photo ID",
    "Proof of income",
    "Proof of residency",
    "Social Security number",
    "Proof of citizenship or immigration status",
  ],
  checkEligibility(input: ScreeningInput): EligibilityEvaluation {
    const annualIncome = input.monthlyIncome * 12;
    const fpl = getFPL(input.householdSize);
    const incomePercent = Math.round((annualIncome / fpl) * 100);

    const hasChildren = input.householdMembers.some((m) => m.age < 19);
    const hasPregnant = input.householdMembers.some((m) => m.isPregnant);
    const hasDisabled = input.householdMembers.some((m) => m.isDisabled);
    const hasElderly = input.householdMembers.some((m) => m.age >= 65);
    const isExpansionState = !NON_EXPANSION_STATES.has(input.state);
    const hasCitizenMember = input.householdMembers.some(
      (m) => m.isCitizen !== false,
    );

    // Determine the applicable FPL threshold based on the strongest path to eligibility
    let threshold: number;
    let pathway: string;
    if (hasPregnant) {
      threshold = 200;
      pathway = "pregnancy";
    } else if (hasChildren) {
      threshold = 200;
      pathway = "children";
    } else if (hasDisabled || hasElderly) {
      threshold = 138;
      pathway = "disabled_or_elderly";
    } else if (isExpansionState) {
      threshold = 138;
      pathway = "adult_expansion";
    } else {
      threshold = 100; // non-expansion state adults (very restrictive)
      pathway = "adult_non_expansion";
    }

    // Determines whether the user is in the non-expansion-state childless
    // adult coverage gap. We ALWAYS push the coverage_gap rule (instead of
    // conditionally pushing), so rules[2] exists in every evaluation and
    // the veto logic is deterministic. If the gap doesn't apply (because
    // the user has another pathway — pregnancy, children, disability, or
    // lives in an expansion state), the rule auto-passes with weight 0.
    const inCoverageGap =
      !isExpansionState &&
      !hasChildren &&
      !hasPregnant &&
      !hasDisabled &&
      !hasElderly;

    const rules: RuleResult[] = [
      {
        name: "has_citizen_or_eligible_immigrant",
        label: "At least one household member is a US citizen or qualified immigrant",
        passed: hasCitizenMember,
        weight: 40,
        veto: true,
        actual: hasCitizenMember ? "Yes" : "No",
        threshold: "Required",
      },
      {
        name: "income_under_applicable_fpl",
        label: `Income below ${threshold}% FPL for the ${pathway.replace(/_/g, " ")} pathway`,
        passed: isBelowFPLPercent(annualIncome, input.householdSize, threshold),
        weight: 50,
        actual: `${incomePercent}% FPL`,
        threshold: `≤${threshold}% FPL`,
      },
      {
        name: "state_has_pathway_for_adults",
        label: inCoverageGap
          ? `${input.state} has a Medicaid pathway for childless adults`
          : "Not applicable (user qualifies via another pathway)",
        // Rule passes if the gap doesn't apply OR the user has a
        // non-gap pathway available. Only fails when the user is
        // actively in the coverage gap.
        passed: !inCoverageGap,
        // Weight 0 when not in the gap so it doesn't affect scoring;
        // full weight 20 when it IS the determinative factor so the
        // explainability panel can show it prominently.
        weight: inCoverageGap ? 20 : 0,
        // Veto only when we're actually in the gap — otherwise this
        // auto-passing rule would never trigger the veto.
        veto: inCoverageGap,
        actual: inCoverageGap
          ? `${input.state} has not expanded Medicaid`
          : "Has alternate pathway",
        threshold: "Required for childless adult eligibility",
      },
    ];

    const signals: Signal[] = [
      {
        name: "has_pregnant_member",
        label: "Pregnant household member (highest priority pathway)",
        matched: hasPregnant,
        weight: 15,
      },
      {
        name: "has_children_under_19",
        label: "Children under 19 in household (CHIP-adjacent pathway)",
        matched: hasChildren,
        weight: 10,
      },
      {
        name: "has_disabled_member",
        label: "Disabled household member (SSI pathway available)",
        matched: hasDisabled,
        weight: 10,
      },
      {
        name: "expansion_state",
        label: `${input.state} has expanded Medicaid to 138% FPL`,
        matched: isExpansionState,
        weight: 5,
      },
    ];

    const missing: MissingField[] = [];
    if (input.householdMembers.every((m) => m.isCitizen === undefined)) {
      missing.push({
        field: "citizenship_status",
        label: "Citizenship or immigration status for all household members",
        penalty: 5,
      });
    }
    if (input.householdMembers.every((m) => m.isDisabled === undefined)) {
      missing.push({
        field: "disability_status",
        label: "Disability status (affects SSI-linked Medicaid pathway)",
        penalty: 3,
      });
    }

    // Determine reason and estimated values
    const incomePass = rules[1]!.passed;
    const citizenPass = rules[0]!.passed;
    const gapPass = rules[2]?.passed ?? true;

    let reason: string;
    let estimatedMonthly: number | undefined;

    if (!citizenPass) {
      reason =
        "Medicaid requires at least one household member to be a US citizen or qualified immigrant.";
    } else if (!gapPass) {
      reason = `You may fall into the Medicaid coverage gap in ${input.state}. Childless adults without Medicaid expansion have limited options — check ACA marketplace subsidies instead.`;
    } else if (!incomePass) {
      reason = `Your income (${incomePercent}% FPL) is above the ${threshold}% threshold for the ${pathway.replace(/_/g, " ")} pathway. Check ACA marketplace subsidies.`;
    } else {
      if (hasPregnant) {
        reason =
          "Pregnant women in most states qualify for Medicaid at up to 200% FPL.";
        estimatedMonthly = 500;
      } else if (hasChildren) {
        reason =
          "Children under 19 typically qualify at higher income levels than adults.";
        estimatedMonthly = 350;
      } else {
        reason = `Your income is below ${threshold}% FPL. You likely qualify under the ${pathway.replace(/_/g, " ")} pathway.`;
        estimatedMonthly = 500;
      }
    }

    return {
      rules,
      signals,
      missing,
      reason,
      estimatedMonthlyValue: estimatedMonthly,
      estimatedAnnualValue: estimatedMonthly ? estimatedMonthly * 12 : undefined,
      nextSteps: incomePass && citizenPass && gapPass
        ? [
            "Apply through Healthcare.gov or your state Medicaid office",
            hasPregnant
              ? "Coverage can begin the same month you apply"
              : "Expect a 30-45 day enrollment window",
            !isExpansionState
              ? `Check ${input.state}-specific eligibility rules (non-expansion state)`
              : "Check your state's managed care plan options",
          ]
        : undefined,
    };
  },
};
