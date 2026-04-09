/** Screening steps — defines the conversation flow */
export interface ScreeningStep {
  id: string;
  question: string;
  helpText?: string;
  type: 'select' | 'number' | 'text' | 'multi-select' | 'state';
  options?: { label: string; value: string }[];
  required?: boolean;
  validation?: (value: string) => string | null;
}

export const SCREENING_STEPS: ScreeningStep[] = [
  {
    id: 'state',
    question: 'What state do you live in?',
    helpText: 'Benefits vary by state. We need this to give you accurate results.',
    type: 'state',
    required: true,
  },
  {
    id: 'householdSize',
    question: 'How many people live in your household?',
    helpText: 'Include yourself, your spouse/partner, and all dependents who live with you.',
    type: 'number',
    required: true,
    validation: (v) => {
      const n = parseInt(v);
      if (isNaN(n) || n < 1 || n > 20) return 'Enter a number between 1 and 20';
      return null;
    },
  },
  {
    id: 'hasChildren',
    question: 'Do you have children under 19 in your household?',
    type: 'select',
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ],
    required: true,
  },
  {
    id: 'childrenAges',
    question: 'What are the ages of your children?',
    helpText: 'Separate ages with commas (e.g., 2, 5, 12)',
    type: 'text',
    required: false,
  },
  {
    id: 'annualIncome',
    question: "What's your household's total yearly income before taxes?",
    helpText: 'Include wages, salary, tips, Social Security, disability, child support — all sources. Use your best estimate.',
    type: 'number',
    required: true,
    validation: (v) => {
      const n = parseInt(v);
      if (isNaN(n) || n < 0) return 'Enter a valid dollar amount';
      return null;
    },
  },
  {
    id: 'isEmployed',
    question: 'Is anyone in your household currently employed?',
    type: 'select',
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ],
    required: true,
  },
  {
    id: 'hasHealthInsurance',
    question: 'Does your household currently have health insurance?',
    type: 'select',
    options: [
      { label: 'Yes, for everyone', value: 'all' },
      { label: 'Yes, for some members', value: 'some' },
      { label: 'No', value: 'no' },
    ],
    required: true,
  },
  {
    id: 'monthlyRent',
    question: 'How much do you pay for rent or mortgage each month?',
    helpText: "Enter 0 if you don't pay rent.",
    type: 'number',
    required: false,
    validation: (v) => {
      const n = parseInt(v);
      if (isNaN(n) || n < 0) return 'Enter a valid dollar amount';
      return null;
    },
  },
  {
    id: 'specialCircumstances',
    question: 'Do any of these apply to your household?',
    helpText: 'Select all that apply — these can unlock additional benefits.',
    type: 'multi-select',
    options: [
      { label: 'Someone is pregnant', value: 'pregnant' },
      { label: 'Someone is 60 or older', value: 'elderly' },
      { label: 'Someone has a disability', value: 'disabled' },
      { label: 'Someone is a veteran', value: 'veteran' },
      { label: 'Someone is a student', value: 'student' },
      { label: 'None of these', value: 'none' },
    ],
    required: true,
  },
];

/** Convert chat answers to ScreeningInput */
export function answersToScreeningInput(
  answers: Record<string, string>,
): import('../benefits/types').ScreeningInput {
  const householdSize = parseInt(answers.householdSize) || 1;
  const monthlyIncome = Math.round((parseInt(answers.annualIncome) || 0) / 12);
  const circumstances = (answers.specialCircumstances || '').split(',');

  // Build household members
  const members: import('../benefits/types').HouseholdMember[] = [
    {
      age: 30, // Default for self
      relationship: 'self',
      isDisabled: circumstances.includes('disabled'),
      isPregnant: circumstances.includes('pregnant'),
      isVeteran: circumstances.includes('veteran'),
      isStudent: circumstances.includes('student'),
      isCitizen: true,
    },
  ];

  // Add children if present
  if (answers.hasChildren === 'yes' && answers.childrenAges) {
    const ages = answers.childrenAges.split(',').map((a) => parseInt(a.trim())).filter((a) => !isNaN(a));
    ages.forEach((age) => {
      members.push({
        age,
        relationship: 'child',
        isCitizen: true,
      });
    });
  }

  // Fill remaining household members as generic adults
  while (members.length < householdSize) {
    members.push({
      age: 30,
      relationship: 'other',
      isCitizen: true,
    });
  }

  // Apply elderly flag
  if (circumstances.includes('elderly') && !members.some((m) => m.age >= 60)) {
    const other = members.find((m) => m.relationship === 'other');
    if (other) other.age = 65;
    else members[0]!.age = 65;
  }

  return {
    state: answers.state || 'CA',
    householdSize,
    householdMembers: members,
    monthlyIncome,
    monthlyExpenses: {
      rent: parseInt(answers.monthlyRent) || 0,
    },
    isEmployed: answers.isEmployed === 'yes',
    hasHealthInsurance: answers.hasHealthInsurance === 'all',
  };
}
