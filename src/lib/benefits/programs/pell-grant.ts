import type { BenefitProgram, ScreeningInput } from '../types';

export const pellGrant: BenefitProgram = {
  id: 'pell-grant',
  name: 'Federal Pell Grant',
  shortName: 'Pell Grant',
  description:
    'Free money for college — does not need to be repaid. For undergraduate students with financial need.',
  category: 'education',
  federalOrState: 'federal',
  applicationUrl: 'https://studentaid.gov/h/apply-for-aid/fafsa',
  documentsNeeded: [
    'Social Security number',
    'Federal tax returns or W-2 forms',
    "Driver's license (if applicable)",
    'Records of untaxed income',
    'Bank statements',
  ],
  checkEligibility(input: ScreeningInput) {
    const hasStudent = input.householdMembers.some((m) => m.isStudent);
    const selfIsStudent = input.householdMembers.find((m) => m.relationship === 'self')?.isStudent;

    if (!hasStudent && !selfIsStudent) {
      return {
        eligible: false,
        confidence: 'high',
        reason: 'Pell Grants are for current or prospective undergraduate students.',
      };
    }

    const annualIncome = input.monthlyIncome * 12;

    // Rough EFC calculation — Pell is generally for families under ~$60K
    if (annualIncome > 60000) {
      return {
        eligible: false,
        confidence: 'low',
        reason: 'Family income may be above typical Pell Grant threshold. File FAFSA to check — special circumstances may qualify.',
      };
    }

    // Max Pell 2025-26: $7,395
    let estimated: number;
    if (annualIncome < 30000) {
      estimated = 7395; // Max Pell
    } else {
      estimated = Math.round(7395 * (1 - (annualIncome - 30000) / 30000));
    }
    estimated = Math.max(estimated, 750);

    return {
      eligible: true,
      confidence: 'medium',
      reason: 'Based on household income, you likely qualify for a Pell Grant.',
      estimatedAnnualValue: estimated,
      estimatedMonthlyValue: Math.round(estimated / 12),
      nextSteps: [
        'Complete the FAFSA at studentaid.gov',
        'FAFSA opens October 1 each year',
        'You can receive Pell Grants for up to 12 semesters',
        'No repayment required — this is free money',
      ],
    };
  },
};
