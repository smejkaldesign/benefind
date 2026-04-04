import type { BenefitProgram, ScreeningInput } from '../types';

export const ssi: BenefitProgram = {
  id: 'ssi',
  name: 'Supplemental Security Income (SSI)',
  shortName: 'SSI',
  description:
    'Monthly cash payments for people who are aged (65+), blind, or disabled with limited income and resources.',
  category: 'income',
  federalOrState: 'federal',
  applicationUrl: 'https://www.ssa.gov/ssi/',
  documentsNeeded: [
    'Social Security card',
    'Birth certificate or proof of age',
    'Proof of disability (medical records)',
    'Proof of income and resources',
    'Proof of living situation',
    'Bank statements',
  ],
  checkEligibility(input: ScreeningInput) {
    const hasEligiblePerson = input.householdMembers.some(
      (m) => m.age >= 65 || m.isDisabled,
    );

    if (!hasEligiblePerson) {
      return {
        eligible: false,
        confidence: 'high',
        reason: 'SSI is for people who are 65+, blind, or disabled.',
      };
    }

    // SSI income limit: roughly $1,971/mo individual, $2,915/mo couple (2025)
    // Resource limit: $2,000 individual, $3,000 couple
    const isSingle = !input.householdMembers.some((m) => m.relationship === 'spouse');
    const incomeLimit = isSingle ? 1971 : 2915;
    const assetLimit = isSingle ? 2000 : 3000;

    if (input.monthlyIncome > incomeLimit) {
      return {
        eligible: false,
        confidence: 'medium',
        reason: `Monthly income ($${input.monthlyIncome.toLocaleString()}) exceeds SSI limit of $${incomeLimit.toLocaleString()}.`,
      };
    }

    if (input.assets && input.assets > assetLimit) {
      return {
        eligible: false,
        confidence: 'medium',
        reason: `Countable resources ($${input.assets.toLocaleString()}) exceed the $${assetLimit.toLocaleString()} limit. Home and one vehicle are typically excluded.`,
      };
    }

    // Federal SSI max: $967/mo individual, $1,450/mo couple (2025)
    const maxBenefit = isSingle ? 967 : 1450;
    const estimated = Math.max(maxBenefit - Math.round(input.monthlyIncome * 0.5), 100);

    return {
      eligible: true,
      confidence: 'medium',
      reason: 'You may qualify based on age/disability and income level.',
      estimatedMonthlyValue: estimated,
      estimatedAnnualValue: estimated * 12,
      nextSteps: [
        'Apply at your local Social Security office or call 1-800-772-1213',
        'Gather medical records documenting disability',
        'The application process can take 3-6 months',
        'Many states add a supplement on top of federal SSI',
      ],
    };
  },
};
