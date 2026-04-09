import type { CompanyProgram, CompanyScreeningInput } from '../company-types';
import { isSmallBusiness } from '../company-types';

export const usdaRuralBusiness: CompanyProgram = {
  id: 'usda-rural-business',
  name: 'USDA Rural Business Development Grants',
  shortName: 'USDA Rural Grants',
  description:
    'Grants supporting economic development and job creation in rural areas. Covers business training, technical assistance, feasibility studies, and incubators.',
  category: 'grant',
  tier: 'situation',
  agency: 'USDA Rural Development',
  status: 'active',
  applicationUrl: 'https://www.rd.usda.gov/programs-services/business-programs/rural-business-development-grants',
  deadlineInfo: 'Typically May-June annually.',

  checkEligibility(input: CompanyScreeningInput) {
    if (!input.isRural) {
      return {
        eligible: false,
        matchScore: 0,
        confidence: 'high',
        reason: 'USDA Rural Business grants are for businesses in rural areas (outside cities with 50,000+ population).',
        nextSteps: [],
        whyYouQualify: [],
      };
    }

    const small = isSmallBusiness(input.employeeCount);
    const isAg = input.industry === 'agriculture';
    const score = isAg ? 85 : small ? 70 : 50;

    return {
      eligible: true,
      matchScore: score,
      confidence: 'medium',
      reason: 'Your rural location makes you eligible for USDA business development grants for training, technical assistance, and feasibility studies.',
      estimatedValue: '$10K-$500K',
      nextSteps: [
        'Check eligibility at rd.usda.gov/eligibility (address lookup)',
        'Contact your local USDA Rural Development office',
        'Identify specific grant programs (Enterprise or Opportunity)',
        'Prepare application with business plan and economic impact data',
      ],
      whyYouQualify: [
        'Your business is in a rural area',
        ...(isAg ? ['Your industry (agriculture) aligns with USDA priorities'] : []),
        ...(small ? ['You are a small or emerging business'] : []),
      ],
    };
  },
};
