import type { BenefitProgram, ScreeningInput } from './types';
import { isBelowFPLPercent } from './types';

/** State-specific supplement programs for top 5 states by unclaimed benefits */

// California
const calFresh: BenefitProgram = {
  id: 'ca-calfresh',
  name: 'CalFresh (California SNAP)',
  shortName: 'CalFresh',
  description: 'California\'s SNAP program with state supplements. Broader eligibility than federal SNAP — includes some college students and immigrants.',
  category: 'food',
  federalOrState: 'state',
  applicationUrl: 'https://www.getcalfresh.org',
  documentsNeeded: ['Photo ID', 'Proof of income', 'Proof of CA residency', 'SSN or immigration documents'],
  checkEligibility(input: ScreeningInput) {
    if (input.state !== 'CA') return { eligible: false, confidence: 'high', reason: 'CalFresh is a California program.' };
    const annual = input.monthlyIncome * 12;
    if (!isBelowFPLPercent(annual, input.householdSize, 200)) {
      return { eligible: false, confidence: 'medium', reason: 'Income exceeds California\'s expanded 200% FPL limit for CalFresh.' };
    }
    return {
      eligible: true, confidence: 'medium',
      reason: 'California has expanded SNAP eligibility to 200% FPL. You likely qualify for CalFresh.',
      estimatedMonthlyValue: Math.round(input.householdSize * 120),
      estimatedAnnualValue: Math.round(input.householdSize * 120 * 12),
      nextSteps: ['Apply at GetCalFresh.org (takes 10 minutes)', 'Call 1-877-847-3663 for help in your language'],
    };
  },
};

const caCalWORKs: BenefitProgram = {
  id: 'ca-calworks',
  name: 'CalWORKs (California Cash Aid)',
  shortName: 'CalWORKs',
  description: 'Cash assistance for families with children. Includes job training, childcare, and housing support.',
  category: 'income',
  federalOrState: 'state',
  applicationUrl: 'https://www.cdss.ca.gov/calworks',
  documentsNeeded: ['Photo ID', 'Children\'s birth certificates', 'Proof of income', 'Proof of CA residency'],
  checkEligibility(input: ScreeningInput) {
    if (input.state !== 'CA') return { eligible: false, confidence: 'high', reason: 'CalWORKs is a California program.' };
    const hasChildren = input.householdMembers.some(m => m.relationship === 'child' && m.age < 18);
    if (!hasChildren) return { eligible: false, confidence: 'high', reason: 'CalWORKs requires children under 18 in the household.' };
    const annual = input.monthlyIncome * 12;
    if (!isBelowFPLPercent(annual, input.householdSize, 130)) {
      return { eligible: false, confidence: 'medium', reason: 'Income exceeds CalWORKs limits.' };
    }
    return {
      eligible: true, confidence: 'medium',
      reason: 'You have children and meet income requirements for CalWORKs cash aid.',
      estimatedMonthlyValue: input.householdSize * 150,
      estimatedAnnualValue: input.householdSize * 150 * 12,
      nextSteps: ['Apply at your county welfare office', 'Also provides childcare, job training, and transportation'],
    };
  },
};

// Texas
const txSnap: BenefitProgram = {
  id: 'tx-snap',
  name: 'Texas SNAP (Lone Star Card)',
  shortName: 'TX SNAP / Lone Star',
  description: 'Texas SNAP benefits loaded onto a Lone Star Card. Texas has NOT expanded Medicaid, so SNAP may be your primary benefit.',
  category: 'food',
  federalOrState: 'state',
  applicationUrl: 'https://www.yourtexasbenefits.com',
  documentsNeeded: ['Photo ID', 'Proof of income', 'Proof of TX residency', 'SSN for all applicants'],
  checkEligibility(input: ScreeningInput) {
    if (input.state !== 'TX') return { eligible: false, confidence: 'high', reason: 'This is a Texas program.' };
    const annual = input.monthlyIncome * 12;
    if (!isBelowFPLPercent(annual, input.householdSize, 165)) {
      return { eligible: false, confidence: 'medium', reason: 'Income exceeds Texas SNAP limits (165% FPL for broad-based categorical eligibility).' };
    }
    return {
      eligible: true, confidence: 'medium',
      reason: 'Texas uses broad-based categorical eligibility at 165% FPL.',
      estimatedMonthlyValue: Math.round(input.householdSize * 110),
      estimatedAnnualValue: Math.round(input.householdSize * 110 * 12),
      nextSteps: ['Apply at YourTexasBenefits.com', 'Texas has NO Medicaid expansion — check CHIP for children'],
    };
  },
};

// Florida
const flAccessFlorida: BenefitProgram = {
  id: 'fl-access',
  name: 'ACCESS Florida (FL SNAP)',
  shortName: 'ACCESS Florida',
  description: 'Florida\'s food assistance program. Apply online for SNAP, Medicaid, and cash assistance all at once.',
  category: 'food',
  federalOrState: 'state',
  applicationUrl: 'https://www.myflorida.com/accessflorida/',
  documentsNeeded: ['Photo ID', 'Proof of income', 'Proof of FL residency', 'SSN'],
  checkEligibility(input: ScreeningInput) {
    if (input.state !== 'FL') return { eligible: false, confidence: 'high', reason: 'This is a Florida program.' };
    const annual = input.monthlyIncome * 12;
    if (!isBelowFPLPercent(annual, input.householdSize, 200)) {
      return { eligible: false, confidence: 'medium', reason: 'Income exceeds Florida SNAP limits.' };
    }
    return {
      eligible: true, confidence: 'medium',
      reason: 'Florida uses broad-based categorical eligibility at 200% FPL for SNAP.',
      estimatedMonthlyValue: Math.round(input.householdSize * 115),
      estimatedAnnualValue: Math.round(input.householdSize * 115 * 12),
      nextSteps: ['Apply at MyFlorida.com/accessflorida', 'One application covers SNAP, Medicaid, and cash aid', 'Florida has NO Medicaid expansion for adults'],
    };
  },
};

// New York
const nySnap: BenefitProgram = {
  id: 'ny-snap',
  name: 'New York SNAP',
  shortName: 'NY SNAP',
  description: 'New York\'s SNAP program with some of the highest benefit levels in the country due to higher cost of living adjustments.',
  category: 'food',
  federalOrState: 'state',
  applicationUrl: 'https://mybenefits.ny.gov',
  documentsNeeded: ['Photo ID', 'Proof of income', 'Proof of NY residency', 'SSN', 'Rent/utility bills'],
  checkEligibility(input: ScreeningInput) {
    if (input.state !== 'NY') return { eligible: false, confidence: 'high', reason: 'This is a New York program.' };
    const annual = input.monthlyIncome * 12;
    if (!isBelowFPLPercent(annual, input.householdSize, 200)) {
      return { eligible: false, confidence: 'medium', reason: 'Income exceeds NY SNAP limits (200% FPL).' };
    }
    return {
      eligible: true, confidence: 'medium',
      reason: 'New York has expanded SNAP eligibility and higher benefit amounts due to cost of living.',
      estimatedMonthlyValue: Math.round(input.householdSize * 140),
      estimatedAnnualValue: Math.round(input.householdSize * 140 * 12),
      nextSteps: ['Apply at mybenefits.ny.gov', 'NY has expanded Medicaid — apply for both at once', 'NYC residents can also call 311'],
    };
  },
};

const nyEssentialPlan: BenefitProgram = {
  id: 'ny-essential-plan',
  name: 'Essential Plan (NY Health)',
  shortName: 'NY Essential Plan',
  description: 'New York\'s low-cost health plan for people who earn too much for Medicaid but can\'t afford marketplace plans. $0-$20/month.',
  category: 'healthcare',
  federalOrState: 'state',
  applicationUrl: 'https://nystateofhealth.ny.gov',
  documentsNeeded: ['Photo ID', 'Proof of income', 'Proof of NY residency', 'SSN or immigration documents'],
  checkEligibility(input: ScreeningInput) {
    if (input.state !== 'NY') return { eligible: false, confidence: 'high', reason: 'Essential Plan is a New York program.' };
    const annual = input.monthlyIncome * 12;
    if (isBelowFPLPercent(annual, input.householdSize, 138)) {
      return { eligible: false, confidence: 'medium', reason: 'You likely qualify for full Medicaid instead (lower income).' };
    }
    if (!isBelowFPLPercent(annual, input.householdSize, 200)) {
      return { eligible: false, confidence: 'medium', reason: 'Income exceeds Essential Plan limits (200% FPL).' };
    }
    return {
      eligible: true, confidence: 'high',
      reason: 'Your income is between 138-200% FPL — you qualify for the Essential Plan at $0-$20/month.',
      estimatedMonthlyValue: 400,
      estimatedAnnualValue: 4800,
      nextSteps: ['Apply at NY State of Health marketplace', 'Plans cost $0 or $20/month with no deductible', 'Covers doctor visits, prescriptions, hospital, and mental health'],
    };
  },
};

// Pennsylvania
const paSNAP: BenefitProgram = {
  id: 'pa-snap',
  name: 'Pennsylvania SNAP',
  shortName: 'PA SNAP',
  description: 'Pennsylvania\'s food assistance with broad-based categorical eligibility at 160% FPL.',
  category: 'food',
  federalOrState: 'state',
  applicationUrl: 'https://www.compass.state.pa.us',
  documentsNeeded: ['Photo ID', 'Proof of income', 'Proof of PA residency', 'SSN'],
  checkEligibility(input: ScreeningInput) {
    if (input.state !== 'PA') return { eligible: false, confidence: 'high', reason: 'This is a Pennsylvania program.' };
    const annual = input.monthlyIncome * 12;
    if (!isBelowFPLPercent(annual, input.householdSize, 160)) {
      return { eligible: false, confidence: 'medium', reason: 'Income exceeds PA SNAP limits (160% FPL).' };
    }
    return {
      eligible: true, confidence: 'medium',
      reason: 'Pennsylvania uses broad-based categorical eligibility at 160% FPL.',
      estimatedMonthlyValue: Math.round(input.householdSize * 115),
      estimatedAnnualValue: Math.round(input.householdSize * 115 * 12),
      nextSteps: ['Apply at COMPASS.state.pa.us', 'PA has expanded Medicaid — apply for both at once'],
    };
  },
};

/** All state-specific programs indexed by state code */
const STATE_PROGRAMS: Record<string, BenefitProgram[]> = {
  CA: [calFresh, caCalWORKs],
  TX: [txSnap],
  FL: [flAccessFlorida],
  NY: [nySnap, nyEssentialPlan],
  PA: [paSNAP],
};

/** Get state-specific programs for a given state */
export function getStatePrograms(stateCode: string): BenefitProgram[] {
  return STATE_PROGRAMS[stateCode.toUpperCase()] ?? [];
}

/** Get all supported state codes */
export function getSupportedStates(): string[] {
  return Object.keys(STATE_PROGRAMS);
}
