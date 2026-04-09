import type { CompanyProgram, CompanyScreeningInput } from '../company-types';

/** States with notable workforce training grant programs */
const STATE_PROGRAMS: Record<string, { name: string; maxPerEmployee: number; maxPerCompany: number; url: string }> = {
  MA: { name: 'Workforce Training Fund Program', maxPerEmployee: 5000, maxPerCompany: 250000, url: 'https://www.mass.gov/workforce-training-fund-program' },
  IN: { name: 'Indiana Workforce Training Grants', maxPerEmployee: 5000, maxPerCompany: 50000, url: 'https://www.in.gov/dwd/' },
  NY: { name: 'Employee Training Incentive Program (ETIP)', maxPerEmployee: 10000, maxPerCompany: 100000, url: 'https://esd.ny.gov/employee-training-incentive-program-etip' },
  TX: { name: 'Skills Development Fund', maxPerEmployee: 3000, maxPerCompany: 500000, url: 'https://www.twc.texas.gov/programs/skills-development-fund' },
  AR: { name: 'Grow Our Own Grants', maxPerEmployee: 3000, maxPerCompany: 50000, url: 'https://www.dws.arkansas.gov/' },
  PA: { name: 'Workforce Development Grants', maxPerEmployee: 4000, maxPerCompany: 100000, url: 'https://www.dli.pa.gov/' },
  CA: { name: 'Employment Training Panel (ETP)', maxPerEmployee: 8000, maxPerCompany: 250000, url: 'https://etp.ca.gov/' },
  FL: { name: 'Quick Response Training', maxPerEmployee: 3000, maxPerCompany: 250000, url: 'https://floridajobs.org/office-directory/division-of-workforce-services/quick-response-training' },
};

export const stateWorkforceTraining: CompanyProgram = {
  id: 'state-workforce-training',
  name: 'State Workforce Training Grants',
  shortName: 'Workforce Training',
  description:
    'State-funded grants to help companies train current and new employees. Most states offer $3K-$10K per employee with company caps of $50K-$250K.',
  category: 'grant',
  tier: 'universal',
  agency: 'State Workforce Agency',
  status: 'active',
  deadlineInfo: 'Varies by state. Most accept applications year-round.',

  checkEligibility(input: CompanyScreeningInput) {
    if (!input.isHiring) {
      return {
        eligible: true,
        matchScore: 50,
        confidence: 'medium',
        reason: 'Workforce training grants are available even for training existing employees, but hiring companies get higher priority.',
        estimatedValue: '$5K-$50K',
        nextSteps: [
          'Contact your state workforce development agency',
          'Identify employee training needs and programs',
          'Apply for training reimbursement grants',
        ],
        whyYouQualify: [
          'Most states offer workforce training grants to all employers',
        ],
      };
    }

    const stateProgram = STATE_PROGRAMS[input.state];
    const whyYouQualify: string[] = ['You are actively hiring'];

    if (stateProgram) {
      whyYouQualify.push(`${input.state} has the ${stateProgram.name}`);
      return {
        eligible: true,
        matchScore: 85,
        confidence: 'high',
        reason: `Your state (${input.state}) offers the ${stateProgram.name} with up to $${stateProgram.maxPerEmployee.toLocaleString()} per employee.`,
        estimatedValue: `Up to $${(stateProgram.maxPerCompany / 1000).toFixed(0)}K`,
        nextSteps: [
          `Apply through the ${stateProgram.name}`,
          'Prepare a training plan for new and existing employees',
          'Document training costs for reimbursement',
        ],
        whyYouQualify,
      };
    }

    return {
      eligible: true,
      matchScore: 70,
      confidence: 'medium',
      reason: 'Nearly every state offers workforce training grants. Contact your state workforce agency for specific programs.',
      estimatedValue: '$5K-$50K',
      nextSteps: [
        'Search your state workforce agency website for training grants',
        'Contact your local Small Business Development Center (SBDC)',
        'Prepare a training plan with costs and timeline',
      ],
      whyYouQualify,
    };
  },
};
