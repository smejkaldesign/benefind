import type { ScreeningStep } from './steps';
import type { CompanyScreeningInput } from '../benefits/company-types';

export const COMPANY_SCREENING_STEPS: ScreeningStep[] = [
  {
    id: 'companyName',
    question: "What's your company name?",
    helpText: "We'll use this to personalize your results.",
    type: 'text',
    required: true,
    validation: (v) => {
      if (v.length > 100) return 'Company name must be 100 characters or fewer';
      return null;
    },
  },
  {
    id: 'state',
    question: 'Where is your company headquartered?',
    helpText: 'Many programs are state-specific. We need this for accurate matching.',
    type: 'state',
    required: true,
  },
  {
    id: 'industry',
    question: 'What industry are you in?',
    type: 'select',
    options: [
      { label: 'Technology', value: 'technology' },
      { label: 'Healthcare / Biotech', value: 'healthcare' },
      { label: 'Manufacturing', value: 'manufacturing' },
      { label: 'Agriculture / Food', value: 'agriculture' },
      { label: 'Clean Energy', value: 'clean-energy' },
      { label: 'Retail / E-commerce', value: 'retail' },
      { label: 'Professional Services', value: 'services' },
      { label: 'Construction', value: 'construction' },
      { label: 'Other', value: 'other' },
    ],
    required: true,
  },
  {
    id: 'companyAge',
    question: 'How old is your company?',
    helpText: 'Some programs target startups, others require operational history.',
    type: 'select',
    options: [
      { label: 'Less than 1 year', value: '<1' },
      { label: '1-5 years', value: '1-5' },
      { label: '5-10 years', value: '5-10' },
      { label: '10+ years', value: '10+' },
    ],
    required: true,
  },
  {
    id: 'employeeCount',
    question: 'How many employees do you have?',
    type: 'select',
    options: [
      { label: '1-10', value: '1-10' },
      { label: '11-50', value: '11-50' },
      { label: '51-100', value: '51-100' },
      { label: '101-500', value: '101-500' },
      { label: '500+', value: '500+' },
    ],
    required: true,
  },
  {
    id: 'annualRevenue',
    question: "What's your approximate annual revenue?",
    helpText: 'This helps us estimate program values. Your answer stays private.',
    type: 'select',
    options: [
      { label: 'Under $250K', value: '<250k' },
      { label: '$250K - $1M', value: '250k-1m' },
      { label: '$1M - $5M', value: '1m-5m' },
      { label: '$5M - $25M', value: '5m-25m' },
      { label: '$25M+', value: '25m+' },
    ],
    required: true,
  },
  {
    id: 'hasRnd',
    question: 'Do you spend on R&D or product development?',
    helpText: 'This includes software development, engineering, product design, process improvement, and scientific research.',
    type: 'select',
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ],
    required: true,
  },
  {
    id: 'rndPercentage',
    question: 'Roughly what percentage of revenue goes to R&D?',
    helpText: 'Your best estimate is fine. This helps us calculate your R&D Tax Credit.',
    type: 'select',
    options: [
      { label: 'Under 5%', value: '3' },
      { label: '5-10%', value: '7' },
      { label: '10-20%', value: '15' },
      { label: '20-40%', value: '30' },
      { label: '40%+', value: '50' },
    ],
    required: true,
  },
  {
    id: 'ownershipDemographics',
    question: 'Does your business have any of these ownership characteristics?',
    helpText: 'Some federal programs provide contracting preferences. Select all that apply.',
    type: 'multi-select',
    options: [
      { label: 'Minority-owned (51%+)', value: 'minority' },
      { label: 'Woman-owned (51%+)', value: 'woman' },
      { label: 'Veteran-owned', value: 'veteran' },
      { label: 'None of these / Prefer not to say', value: 'none' },
    ],
    required: true,
  },
  {
    id: 'isRural',
    question: 'Is your business in a rural area?',
    helpText: 'Rural = outside cities with 50,000+ population. USDA has grants specifically for rural businesses.',
    type: 'select',
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
      { label: 'Not sure', value: 'not-sure' },
    ],
    required: true,
  },
  {
    id: 'exportsOrPlans',
    question: 'Do you export or plan to export products/services internationally?',
    type: 'select',
    options: [
      { label: 'Yes, we export', value: 'yes' },
      { label: 'Planning to', value: 'yes' },
      { label: 'No', value: 'no' },
    ],
    required: true,
  },
  {
    id: 'isHiring',
    question: 'Are you currently hiring?',
    helpText: 'Several programs offer tax credits and training grants for employers who are hiring.',
    type: 'select',
    options: [
      { label: 'Yes, actively hiring', value: 'yes' },
      { label: 'Planning to hire soon', value: 'yes' },
      { label: 'No', value: 'no' },
    ],
    required: true,
  },
  {
    id: 'hasCleanEnergy',
    question: 'Any clean energy or sustainability initiatives?',
    helpText: 'Solar panels, EV fleet, energy-efficient buildings, renewable energy projects, etc.',
    type: 'select',
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
      { label: 'Considering', value: 'yes' },
    ],
    required: true,
  },
];

const VALID_INDUSTRIES: CompanyScreeningInput['industry'][] = ['technology', 'healthcare', 'manufacturing', 'agriculture', 'clean-energy', 'retail', 'services', 'construction', 'other'];
const VALID_AGES: CompanyScreeningInput['companyAge'][] = ['<1', '1-5', '5-10', '10+'];
const VALID_EMPLOYEE_RANGES: CompanyScreeningInput['employeeCount'][] = ['1-10', '11-50', '51-100', '101-500', '500+'];
const VALID_REVENUE_RANGES: CompanyScreeningInput['annualRevenue'][] = ['<250k', '250k-1m', '1m-5m', '5m-25m', '25m+'];
const VALID_OWNERSHIP: CompanyScreeningInput['ownershipDemographics'][number][] = ['minority', 'woman', 'veteran', 'none'];

/** Convert chat answers to CompanyScreeningInput */
export function answersToCompanyInput(
  answers: Record<string, string>,
): CompanyScreeningInput {
  const ownership = (answers.ownershipDemographics || 'none')
    .split(',')
    .filter((v): v is CompanyScreeningInput['ownershipDemographics'][number] =>
      VALID_OWNERSHIP.includes(v as CompanyScreeningInput['ownershipDemographics'][number]) && v !== 'none'
    );

  const rawIndustry = answers.industry || 'other';
  const rawAge = answers.companyAge || '1-5';
  const rawEmployees = answers.employeeCount || '1-10';
  const rawRevenue = answers.annualRevenue || '<250k';
  const rndParsed = parseInt(answers.rndPercentage);

  return {
    companyName: (answers.companyName || 'Your Company').slice(0, 100),
    state: answers.state || 'CA',
    industry: VALID_INDUSTRIES.includes(rawIndustry as CompanyScreeningInput['industry']) ? rawIndustry as CompanyScreeningInput['industry'] : 'other',
    companyAge: VALID_AGES.includes(rawAge as CompanyScreeningInput['companyAge']) ? rawAge as CompanyScreeningInput['companyAge'] : '1-5',
    employeeCount: VALID_EMPLOYEE_RANGES.includes(rawEmployees as CompanyScreeningInput['employeeCount']) ? rawEmployees as CompanyScreeningInput['employeeCount'] : '1-10',
    annualRevenue: VALID_REVENUE_RANGES.includes(rawRevenue as CompanyScreeningInput['annualRevenue']) ? rawRevenue as CompanyScreeningInput['annualRevenue'] : '<250k',
    hasRnd: answers.hasRnd === 'yes',
    rndPercentage: Number.isFinite(rndParsed) ? rndParsed : 0,
    ownershipDemographics: ownership.length > 0 ? ownership : ['none'],
    isRural: answers.isRural === 'yes',
    exportsOrPlans: answers.exportsOrPlans === 'yes',
    isHiring: answers.isHiring === 'yes',
    hasCleanEnergy: answers.hasCleanEnergy === 'yes',
  };
}
