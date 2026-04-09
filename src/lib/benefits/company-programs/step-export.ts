import type { CompanyProgram, CompanyScreeningInput } from '../company-types';
import { isSmallBusiness } from '../company-types';

export const stepExport: CompanyProgram = {
  id: 'step-export',
  name: 'State Trade Expansion Program (STEP)',
  shortName: 'STEP Export Grant',
  description:
    'SBA-funded grants through state governments to help small businesses enter or expand into export markets. Covers trade shows, marketing, and localization.',
  category: 'grant',
  tier: 'situation',
  agency: 'SBA (via state agencies)',
  status: 'active',
  applicationUrl: 'https://www.sba.gov/funding-programs/grants/state-trade-expansion-program-step',
  deadlineInfo: 'Varies by state. Typically annual application cycles.',

  checkEligibility(input: CompanyScreeningInput) {
    if (!input.exportsOrPlans) {
      return {
        eligible: false,
        matchScore: 0,
        confidence: 'high',
        reason: 'STEP grants are for companies that export or plan to export products/services.',
        nextSteps: [],
        whyYouQualify: [],
      };
    }

    if (!isSmallBusiness(input.employeeCount)) {
      return {
        eligible: false,
        matchScore: 0,
        confidence: 'high',
        reason: 'STEP is limited to small businesses (fewer than 500 employees).',
        nextSteps: [],
        whyYouQualify: [],
      };
    }

    return {
      eligible: true,
      matchScore: 75,
      confidence: 'medium',
      reason: 'You are a small business that exports or plans to export, making you eligible for STEP grants.',
      estimatedValue: '$10K-$15K',
      nextSteps: [
        'Contact your state international trade office',
        'Identify upcoming international trade shows in your industry',
        'Apply for STEP funding for export activities (shows, marketing, localization)',
        'Ensure your products/services have 51%+ US content',
      ],
      whyYouQualify: [
        'You are a small business (<500 employees)',
        'You export or plan to export',
      ],
    };
  },
};
