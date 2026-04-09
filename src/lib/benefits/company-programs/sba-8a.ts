import type { CompanyProgram, CompanyScreeningInput } from '../company-types';
import { isSmallBusiness } from '../company-types';

export const sba8a: CompanyProgram = {
  id: 'sba-8a',
  name: '8(a) Business Development Program',
  shortName: 'SBA 8(a) Program',
  description:
    'Nine-year federal program providing contracting preferences, mentoring, and business development support for socially and economically disadvantaged small businesses.',
  category: 'contracting',
  tier: 'situation',
  agency: 'SBA',
  status: 'active',
  applicationUrl: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/8a-business-development-program',

  checkEligibility(input: CompanyScreeningInput) {
    const hasQualifyingOwnership = input.ownershipDemographics.some(
      (d) => d === 'minority' || d === 'veteran'
    );

    if (!hasQualifyingOwnership) {
      return {
        eligible: false,
        matchScore: 0,
        confidence: 'high',
        reason: 'The 8(a) program requires ownership by socially disadvantaged individuals (minority, veteran, or other qualifying groups).',
        nextSteps: [],
        whyYouQualify: [],
      };
    }

    if (!isSmallBusiness(input.employeeCount)) {
      return {
        eligible: false,
        matchScore: 0,
        confidence: 'high',
        reason: 'The 8(a) program is for small businesses only.',
        nextSteps: [],
        whyYouQualify: [],
      };
    }

    return {
      eligible: true,
      matchScore: 80,
      confidence: 'medium',
      reason: 'Your business ownership profile qualifies for the 8(a) Business Development Program, providing federal contracting preferences.',
      estimatedValue: 'Federal contracting preferences',
      nextSteps: [
        'Apply through the SBA 8(a) portal (certify.sba.gov)',
        'Prepare financial documents, tax returns, and ownership documentation',
        'Once certified, access sole-source and set-aside federal contracts',
        'Connect with a mentor through the SBA mentor-protege program',
      ],
      whyYouQualify: [
        'Owned by socially disadvantaged individual(s)',
        'Small business with fewer than 500 employees',
      ],
    };
  },
};

export const wosbContracting: CompanyProgram = {
  id: 'wosb-contracting',
  name: 'Women-Owned Small Business Federal Contracting',
  shortName: 'WOSB Contracting',
  description:
    'Federal contracting preferences for women-owned small businesses. The government targets 5% of federal contracting dollars to WOSBs.',
  category: 'contracting',
  tier: 'situation',
  agency: 'SBA',
  status: 'active',
  applicationUrl: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/women-owned-small-business-federal-contracting-program',

  checkEligibility(input: CompanyScreeningInput) {
    const isWomanOwned = input.ownershipDemographics.includes('woman');

    if (!isWomanOwned) {
      return {
        eligible: false,
        matchScore: 0,
        confidence: 'high',
        reason: 'This program requires 51%+ woman-owned businesses.',
        nextSteps: [],
        whyYouQualify: [],
      };
    }

    if (!isSmallBusiness(input.employeeCount)) {
      return {
        eligible: false,
        matchScore: 0,
        confidence: 'high',
        reason: 'WOSB contracting is for small businesses only.',
        nextSteps: [],
        whyYouQualify: [],
      };
    }

    return {
      eligible: true,
      matchScore: 80,
      confidence: 'medium',
      reason: 'As a women-owned small business, you can access set-aside federal contracts targeting 5% of contracting dollars.',
      estimatedValue: 'Federal contracting preferences',
      nextSteps: [
        'Self-certify as WOSB through certify.sba.gov',
        'Register on SAM.gov for federal contracting',
        'Search for WOSB set-aside contracts on SAM.gov',
      ],
      whyYouQualify: [
        'Woman-owned business',
        'Small business with fewer than 500 employees',
      ],
    };
  },
};
