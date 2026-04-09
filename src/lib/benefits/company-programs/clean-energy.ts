import type { CompanyProgram, CompanyScreeningInput } from '../company-types';

export const cleanEnergyItc: CompanyProgram = {
  id: 'clean-energy-itc',
  name: 'Clean Energy Investment Tax Credit (Section 48)',
  shortName: 'Clean Energy ITC',
  description:
    '30% federal tax credit for investments in solar, wind, geothermal, battery storage, and other clean energy property. Bonus credits for domestic content and energy community locations.',
  category: 'tax-credit',
  tier: 'industry',
  agency: 'IRS',
  status: 'active',
  applicationUrl: 'https://www.irs.gov/credits-deductions/clean-energy-tax-credits',

  checkEligibility(input: CompanyScreeningInput) {
    if (!input.hasCleanEnergy && input.industry !== 'clean-energy') {
      return {
        eligible: false,
        matchScore: 0,
        confidence: 'high',
        reason: 'This credit requires clean energy investments or operations.',
        nextSteps: [],
        whyYouQualify: [],
      };
    }

    const isCleanEnergyCompany = input.industry === 'clean-energy';
    const score = isCleanEnergyCompany ? 90 : 70;

    return {
      eligible: true,
      matchScore: score,
      confidence: 'medium',
      reason: 'Companies investing in clean energy property qualify for a 30% investment tax credit, with additional bonuses possible.',
      estimatedValue: '30% of clean energy investment',
      nextSteps: [
        'Identify qualifying clean energy property investments',
        'Check for domestic content bonus (10% additional credit)',
        'Check if your location qualifies as an energy community (10% bonus)',
        'Consult a tax advisor for optimal credit structure',
      ],
      whyYouQualify: [
        ...(isCleanEnergyCompany ? ['You operate in the clean energy industry'] : []),
        'You have clean energy or sustainability initiatives',
      ],
    };
  },
};

export const section179d: CompanyProgram = {
  id: 'section-179d',
  name: 'Energy-Efficient Commercial Buildings Deduction (Section 179D)',
  shortName: 'Section 179D',
  description:
    'Federal tax deduction for energy-efficient improvements to commercial buildings. $0.59-$1.19 per square foot based on energy savings achieved.',
  category: 'tax-credit',
  tier: 'situation',
  agency: 'IRS',
  status: 'active',
  applicationUrl: 'https://www.irs.gov/credits-deductions/energy-efficient-commercial-buildings-deduction',
  deadlineInfo: 'Construction must begin by June 30, 2026 (termination provision).',

  checkEligibility(input: CompanyScreeningInput) {
    if (!input.hasCleanEnergy && input.industry !== 'construction') {
      return {
        eligible: false,
        matchScore: 0,
        confidence: 'high',
        reason: 'This deduction applies to commercial building energy efficiency improvements.',
        nextSteps: [],
        whyYouQualify: [],
      };
    }

    return {
      eligible: true,
      matchScore: 55,
      confidence: 'low',
      reason: 'If you own or improve commercial buildings with energy-efficient systems, you may qualify. Note: construction must begin by June 30, 2026.',
      estimatedValue: '$0.59-$1.19/sq ft',
      nextSteps: [
        'Identify qualifying improvements (lighting, HVAC, building envelope)',
        'Ensure 25% minimum energy savings threshold is met',
        'Begin construction before June 30, 2026 deadline',
        'Get energy modeling certification from qualified professional',
      ],
      whyYouQualify: [
        'You have clean energy or sustainability initiatives',
        ...(input.industry === 'construction' ? ['You operate in the construction industry'] : []),
      ],
    };
  },
};
