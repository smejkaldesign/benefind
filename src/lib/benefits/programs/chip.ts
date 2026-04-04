import type { BenefitProgram, ScreeningInput } from '../types';
import { isBelowFPLPercent } from '../types';

export const chip: BenefitProgram = {
  id: 'chip',
  name: "Children's Health Insurance Program (CHIP)",
  shortName: 'CHIP',
  description:
    "Low-cost health coverage for children in families that earn too much for Medicaid but can't afford private insurance.",
  category: 'healthcare',
  federalOrState: 'federal',
  applicationUrl: 'https://www.healthcare.gov/medicaid-chip/childrens-health-insurance-program/',
  documentsNeeded: [
    'Photo ID for parent/guardian',
    "Child's birth certificate or Social Security number",
    'Proof of income',
    'Proof of residency',
  ],
  checkEligibility(input: ScreeningInput) {
    const annualIncome = input.monthlyIncome * 12;
    const children = input.householdMembers.filter(
      (m) => m.relationship === 'child' && m.age < 19,
    );

    if (children.length === 0) {
      return {
        eligible: false,
        confidence: 'high',
        reason: 'CHIP is for children under 19.',
      };
    }

    // CHIP covers up to ~200-300% FPL depending on state
    // If below Medicaid threshold, they'd qualify for Medicaid instead
    if (isBelowFPLPercent(annualIncome, input.householdSize, 138)) {
      return {
        eligible: false,
        confidence: 'medium',
        reason: 'Your children likely qualify for Medicaid instead (lower cost). Check Medicaid first.',
      };
    }

    if (!isBelowFPLPercent(annualIncome, input.householdSize, 250)) {
      return {
        eligible: false,
        confidence: 'low',
        reason: 'Income may exceed CHIP limits in most states. Some states go up to 300% FPL — check your state.',
      };
    }

    return {
      eligible: true,
      confidence: 'medium',
      reason: `${children.length} ${children.length === 1 ? 'child' : 'children'} may qualify for CHIP coverage.`,
      estimatedMonthlyValue: children.length * 200,
      estimatedAnnualValue: children.length * 2400,
      nextSteps: [
        'Apply through Healthcare.gov or your state CHIP program',
        'Coverage often starts immediately once approved',
        'Premiums are very low or free depending on income',
      ],
    };
  },
};
