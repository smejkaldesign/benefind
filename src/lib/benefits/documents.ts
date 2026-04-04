/** Detailed document requirements per program with explanations */
export interface DocumentItem {
  name: string;
  description: string;
  alternatives?: string[];
  tip?: string;
}

export interface ProgramDocuments {
  programId: string;
  required: DocumentItem[];
  optional: DocumentItem[];
}

const PROGRAM_DOCUMENTS: Record<string, ProgramDocuments> = {
  snap: {
    programId: 'snap',
    required: [
      {
        name: 'Photo ID',
        description: "A government-issued ID that proves who you are.",
        alternatives: ["Driver's license", 'State ID card', 'Passport'],
        tip: 'Expired IDs may be accepted in some states.',
      },
      {
        name: 'Proof of income',
        description: 'Shows how much money you earn each month.',
        alternatives: ['Pay stubs (last 30 days)', 'Tax return', 'Letter from employer', 'Benefit award letter'],
        tip: 'If self-employed, bring records of your earnings.',
      },
      {
        name: 'Proof of residency',
        description: 'Shows you live in the state where you are applying.',
        alternatives: ['Utility bill', 'Lease agreement', 'Mortgage statement', 'Letter from landlord'],
      },
      {
        name: 'Social Security numbers',
        description: 'For every person in your household applying for benefits.',
        alternatives: ['SSN cards', 'SSA letter', 'Tax documents showing SSN'],
        tip: 'If someone does not have an SSN, they can still apply — the rest of the household may qualify.',
      },
    ],
    optional: [
      {
        name: 'Bank statements',
        description: 'Shows your savings and checking account balances.',
        tip: 'Most states have eliminated the asset test for SNAP, but some still check.',
      },
      {
        name: 'Medical bills',
        description: 'If anyone in your household is elderly or disabled, medical expenses can increase your benefit.',
        tip: 'Keep receipts for prescriptions, doctor visits, and medical equipment.',
      },
      {
        name: 'Childcare expenses',
        description: 'If you pay for childcare to work or attend school, this counts as a deduction.',
        alternatives: ['Daycare receipts', 'After-school program invoices'],
      },
    ],
  },
  medicaid: {
    programId: 'medicaid',
    required: [
      {
        name: 'Photo ID',
        description: 'A government-issued ID for the person applying.',
        alternatives: ["Driver's license", 'State ID', 'Passport'],
      },
      {
        name: 'Proof of income',
        description: 'Your household income for the current month.',
        alternatives: ['Pay stubs', 'Tax return', 'Self-employment records'],
      },
      {
        name: 'Proof of citizenship or immigration status',
        description: 'Shows you are a US citizen or have qualified immigration status.',
        alternatives: ['Birth certificate', 'Passport', 'Naturalization certificate', 'Permanent resident card'],
        tip: 'Children born in the US are citizens regardless of parents\' status.',
      },
      {
        name: 'Social Security number',
        description: 'Required for each person applying for coverage.',
      },
    ],
    optional: [
      {
        name: 'Proof of pregnancy',
        description: 'If applying based on pregnancy, a doctor\'s note helps speed up approval.',
      },
      {
        name: 'Proof of disability',
        description: 'If applying based on disability, medical records can help.',
        alternatives: ['Doctor\'s letter', 'SSI/SSDI award letter'],
      },
    ],
  },
  eitc: {
    programId: 'eitc',
    required: [
      {
        name: 'W-2 forms',
        description: 'From every job you worked during the tax year.',
        tip: 'Employers must send W-2s by January 31st each year.',
      },
      {
        name: 'Social Security numbers',
        description: 'For yourself, your spouse (if filing jointly), and all dependents.',
      },
      {
        name: 'Filing status information',
        description: 'Whether you file as single, married, or head of household.',
        tip: 'Head of household often gives a bigger credit if you have dependents.',
      },
    ],
    optional: [
      {
        name: '1099 forms',
        description: 'If you did freelance or gig work (Uber, DoorDash, etc.).',
      },
      {
        name: 'Childcare provider information',
        description: 'Name, address, and tax ID of your childcare provider to claim additional credits.',
      },
    ],
  },
  wic: {
    programId: 'wic',
    required: [
      { name: 'Photo ID', description: 'For the parent or guardian applying.', alternatives: ["Driver's license", 'State ID'] },
      { name: 'Proof of income', description: 'Shows household income is within WIC limits.', alternatives: ['Pay stubs', 'Tax return', 'Benefit letters'] },
      { name: 'Proof of residency', description: 'Shows you live in the state.', alternatives: ['Utility bill', 'Lease'] },
      { name: 'Proof of pregnancy or child', description: 'Doctor\'s note for pregnancy, or birth certificate for children.', alternatives: ['Pregnancy verification', 'Birth certificate', 'Hospital records'] },
    ],
    optional: [
      { name: 'Immunization records', description: 'For children — your WIC office may be able to look these up.' },
      { name: 'Proof of other benefits', description: 'If you receive SNAP, Medicaid, or TANF, you automatically qualify for WIC income-wise.' },
    ],
  },
  liheap: {
    programId: 'liheap',
    required: [
      { name: 'Photo ID', description: 'For the head of household.', alternatives: ["Driver's license", 'State ID'] },
      { name: 'Proof of income', description: 'For all household members.', alternatives: ['Pay stubs', 'Tax return', 'Benefit letters'] },
      { name: 'Recent utility bill', description: 'Shows your energy costs and account number.', tip: 'Bring both heating and electric bills if they are separate.' },
      { name: 'Social Security numbers', description: 'For all household members.' },
    ],
    optional: [
      { name: 'Proof of disability', description: 'May qualify you for priority assistance.' },
      { name: 'Disconnection notice', description: 'If your utilities are about to be shut off, bring the notice — you may get emergency help faster.' },
    ],
  },
  chip: {
    programId: 'chip',
    required: [
      { name: 'Parent/guardian photo ID', description: 'Government-issued ID for the applying parent.' },
      { name: 'Child\'s birth certificate', description: 'Proves age and citizenship.', alternatives: ['Birth certificate', 'Passport'] },
      { name: 'Social Security numbers', description: 'For children being enrolled.' },
      { name: 'Proof of income', description: 'Household income documentation.', alternatives: ['Pay stubs', 'Tax return'] },
    ],
    optional: [
      { name: 'Current insurance information', description: 'If children currently have insurance that is ending.' },
    ],
  },
  section8: {
    programId: 'section8',
    required: [
      { name: 'Photo ID for all adults', description: 'Every adult household member needs a government-issued ID.' },
      { name: 'Birth certificates for children', description: 'Proves ages and household composition.' },
      { name: 'Social Security cards', description: 'For all household members.' },
      { name: 'Proof of income', description: 'All sources for all household members.', alternatives: ['Pay stubs', 'Tax returns', 'Benefit letters', 'Child support documentation'] },
      { name: 'Proof of citizenship/immigration', description: 'For all household members.', alternatives: ['Birth certificate', 'Passport', 'Permanent resident card'] },
    ],
    optional: [
      { name: 'Bank statements', description: 'May be requested to verify assets.' },
      { name: 'Landlord reference', description: 'A letter from a current or previous landlord.' },
      { name: 'Criminal background info', description: 'Some PHAs run background checks — be upfront about any issues.' },
    ],
  },
  ssi: {
    programId: 'ssi',
    required: [
      { name: 'Social Security card', description: 'Or document showing your SSN.' },
      { name: 'Birth certificate or proof of age', description: 'If applying based on age (65+).' },
      { name: 'Medical records', description: 'If applying based on disability �� doctor\'s notes, hospital records, test results.', tip: 'The more medical evidence you provide, the stronger your application.' },
      { name: 'Proof of income and resources', description: 'Pay stubs, bank statements, investment statements.' },
      { name: 'Proof of living situation', description: 'Lease, mortgage statement, or letter from someone you live with.' },
    ],
    optional: [
      { name: 'Previous work history', description: 'List of jobs for the past 15 years — helps evaluate disability claim.' },
      { name: 'Medications list', description: 'All current medications with dosages.' },
    ],
  },
  'pell-grant': {
    programId: 'pell-grant',
    required: [
      { name: 'Social Security number', description: 'Required for the FAFSA application.' },
      { name: 'Federal tax returns', description: 'Your (and your parents\' if dependent) most recent tax return.', tip: 'You can use the IRS Data Retrieval Tool to auto-fill tax info on FAFSA.' },
      { name: 'W-2 forms', description: 'From all jobs during the tax year.' },
    ],
    optional: [
      { name: "Driver's license", description: 'Optional but helps verify identity.' },
      { name: 'Records of untaxed income', description: 'Child support received, veterans\' benefits, etc.' },
      { name: 'Bank statements', description: 'Current savings and checking balances.' },
    ],
  },
};

export function getDocumentsForProgram(programId: string): ProgramDocuments | null {
  return PROGRAM_DOCUMENTS[programId] ?? null;
}

export function getDocumentsForPrograms(programIds: string[]): ProgramDocuments[] {
  return programIds.map((id) => PROGRAM_DOCUMENTS[id]).filter(Boolean) as ProgramDocuments[];
}

/** Deduplicate documents across multiple programs */
export function getMergedDocumentChecklist(programIds: string[]): {
  document: DocumentItem;
  neededFor: string[];
}[] {
  const docs = getDocumentsForPrograms(programIds);
  const merged = new Map<string, { document: DocumentItem; neededFor: string[] }>();

  for (const pd of docs) {
    for (const doc of [...pd.required, ...pd.optional]) {
      const key = doc.name.toLowerCase();
      if (merged.has(key)) {
        merged.get(key)!.neededFor.push(pd.programId);
      } else {
        merged.set(key, { document: doc, neededFor: [pd.programId] });
      }
    }
  }

  // Sort: most-needed documents first
  return Array.from(merged.values()).sort(
    (a, b) => b.neededFor.length - a.neededFor.length,
  );
}
