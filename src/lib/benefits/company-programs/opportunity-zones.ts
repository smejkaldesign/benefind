import type { CompanyProgram, CompanyScreeningInput } from '../company-types';

export const opportunityZones: CompanyProgram = {
  id: 'opportunity-zones',
  name: 'Qualified Opportunity Zone Incentives',
  shortName: 'Opportunity Zones',
  description:
    'Tax incentives for investing capital gains in designated low-income communities. Includes tax deferral and potential exclusion of gains on OZ investments held 10+ years.',
  category: 'incentive',
  tier: 'situation',
  agency: 'IRS',
  status: 'active',
  applicationUrl: 'https://www.irs.gov/credits-deductions/opportunity-zones-frequently-asked-questions',
  deadlineInfo: 'No deadline. Program extended indefinitely by the One Big Beautiful Bill Act.',

  checkEligibility(input: CompanyScreeningInput) {
    // OZ is broadly available but hard to determine eligibility without address
    // Flag as possible for all companies, higher score for rural (more likely in OZ)
    const score = input.isRural ? 55 : 35;

    return {
      eligible: true,
      matchScore: score,
      confidence: 'low',
      reason: 'Opportunity Zone incentives may apply if your business is located in or you invest in a designated Opportunity Zone. Check the OZ map for your area.',
      estimatedValue: 'Tax deferral + potential exclusion',
      nextSteps: [
        'Check if your business is in an Opportunity Zone at opportunityzones.hud.gov',
        'If yes, consult a tax advisor about Qualified Opportunity Fund structure',
        'Capital gains invested in QOFs get tax deferral and potential exclusion after 10 years',
      ],
      whyYouQualify: [
        'Available to any business or investor in designated zones',
        ...(input.isRural ? ['Rural areas are more likely to contain Opportunity Zones'] : []),
      ],
    };
  },
};
