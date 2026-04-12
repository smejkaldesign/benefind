// State-specific benefit program overlay data for SEO landing pages.
// Source: benefind-state-benefits-research.md (2026-04-12)

export interface StateOverlay {
  state: string;
  stateCode: string;
  programSlug: string;
  programName: string;
  stateProgramName: string;
  incomeLimits: string;
  applicationPortal: string;
  portalUrl: string;
  processingTime: string;
  notes: string;
}

/** Canonical list of state codes with full names. */
const STATE_NAMES: Record<string, string> = {
  CA: "California",
  TX: "Texas",
  FL: "Florida",
  NY: "New York",
  PA: "Pennsylvania",
  IL: "Illinois",
  OH: "Ohio",
  GA: "Georgia",
  NC: "North Carolina",
  MI: "Michigan",
};

/** Program slug to parent guide path mapping. */
export const PROGRAM_GUIDES: Record<string, { label: string; href: string }> = {
  snap: {
    label: "SNAP Eligibility Guide 2026",
    href: "/blog/snap-eligibility-2026",
  },
  medicaid: {
    label: "Medicaid Eligibility Guide 2026",
    href: "/blog/medicaid-eligibility-2026",
  },
  "section-8": {
    label: "Section 8 Eligibility Guide 2026",
    href: "/blog/section-8-eligibility-2026",
  },
  ssi: {
    label: "SSI Benefits Guide 2026",
    href: "/blog/ssi-eligibility-2026",
  },
  eitc: {
    label: "EITC Guide 2026",
    href: "/blog/eitc-eligibility-2026",
  },
  chip: {
    label: "CHIP Guide 2026",
    href: "/blog/chip-eligibility-2026",
  },
  wic: {
    label: "WIC Guide 2026",
    href: "/blog/wic-eligibility-2026",
  },
  "pell-grant": {
    label: "Pell Grant Guide 2026",
    href: "/blog/pell-grant-eligibility-2026",
  },
};

export const STATE_OVERLAYS: StateOverlay[] = [
  // ── SNAP ──────────────────────────────────────────────────
  {
    state: "California",
    stateCode: "CA",
    programSlug: "snap",
    programName: "SNAP",
    stateProgramName: "CalFresh",
    incomeLimits:
      "200% FPL gross income (broad-based categorical eligibility); no asset test",
    applicationPortal: "BenefitsCal",
    portalUrl: "https://benefitscal.com",
    processingTime: "30 days (7 days expedited)",
    notes:
      "California uses the CalFresh brand instead of SNAP. Applications also cover Medi-Cal, CalWORKs, and General Relief through a single form.",
  },
  {
    state: "Texas",
    stateCode: "TX",
    programSlug: "snap",
    programName: "SNAP",
    stateProgramName: "SNAP / Lone Star Card",
    incomeLimits:
      "165% FPL gross income (BBCE); no asset test for most households",
    applicationPortal: "Your Texas Benefits",
    portalUrl: "https://yourtexasbenefits.com",
    processingTime: "30 days (7 days expedited)",
    notes:
      "Texas issues benefits on the Lone Star Card. The single application covers SNAP, Medicaid, CHIP, and TANF.",
  },
  {
    state: "Florida",
    stateCode: "FL",
    programSlug: "snap",
    programName: "SNAP",
    stateProgramName: "SNAP",
    incomeLimits: "200% FPL gross income (BBCE); no asset test",
    applicationPortal: "MyACCESS Florida",
    portalUrl: "https://myflorida.com/accessflorida",
    processingTime: "30 days (7 days expedited)",
    notes:
      "Florida uses the ACCESS Florida system. The same application covers SNAP, Medicaid, and Temporary Cash Assistance.",
  },
  {
    state: "New York",
    stateCode: "NY",
    programSlug: "snap",
    programName: "SNAP",
    stateProgramName: "SNAP",
    incomeLimits: "200% FPL gross income (BBCE); no asset test",
    applicationPortal: "myBenefits.ny.gov",
    portalUrl: "https://mybenefits.ny.gov",
    processingTime: "30 days (7 days expedited)",
    notes:
      "New York's myBenefits portal covers SNAP, cash assistance, and HEAP. Health coverage applications go through NY State of Health separately.",
  },
  {
    state: "Pennsylvania",
    stateCode: "PA",
    programSlug: "snap",
    programName: "SNAP",
    stateProgramName: "SNAP",
    incomeLimits: "200% FPL gross income (BBCE); no asset test",
    applicationPortal: "COMPASS",
    portalUrl: "https://compass.state.pa.us",
    processingTime: "30 days (7 days expedited)",
    notes:
      "COMPASS is one of the most comprehensive state portals, covering SNAP, Medicaid, CHIP, TANF, LIHEAP, school meals, and Child Care Works.",
  },
  {
    state: "Illinois",
    stateCode: "IL",
    programSlug: "snap",
    programName: "SNAP",
    stateProgramName: "SNAP / Link Card",
    incomeLimits: "200% FPL gross income (BBCE); no asset test",
    applicationPortal: "ABE (Application for Benefits Eligibility)",
    portalUrl: "https://abe.illinois.gov",
    processingTime: "30 days (7 days expedited)",
    notes:
      "Illinois issues benefits on the Link Card. ABE covers SNAP, Medicaid, All Kids, TANF, and childcare assistance. Illinois has an 82% SNAP participation rate.",
  },
  {
    state: "Ohio",
    stateCode: "OH",
    programSlug: "snap",
    programName: "SNAP",
    stateProgramName: "SNAP / Direction Card",
    incomeLimits:
      "130% FPL gross income (no BBCE); asset test applies ($2,750 general, $4,250 elderly/disabled)",
    applicationPortal: "Benefits.ohio.gov",
    portalUrl: "https://benefits.ohio.gov",
    processingTime: "30 days (7 days expedited)",
    notes:
      "Ohio does NOT use broad-based categorical eligibility, making SNAP rules stricter than most states. Ohio retains the asset test, which is a critical difference for applicants.",
  },
  {
    state: "Georgia",
    stateCode: "GA",
    programSlug: "snap",
    programName: "SNAP",
    stateProgramName: "SNAP",
    incomeLimits: "130% FPL gross income (BBCE with 130% cap); no asset test",
    applicationPortal: "Georgia Gateway",
    portalUrl: "https://gateway.ga.gov",
    processingTime: "30 days (7 days expedited)",
    notes:
      "Georgia Gateway handles SNAP, Medicaid, TANF, CAPS (childcare), and WIC referrals through a single portal.",
  },
  {
    state: "North Carolina",
    stateCode: "NC",
    programSlug: "snap",
    programName: "SNAP",
    stateProgramName: "Food and Nutrition Services (FNS)",
    incomeLimits: "200% FPL gross income (BBCE); no asset test",
    applicationPortal: "ePASS",
    portalUrl: "https://epass.nc.gov",
    processingTime: "30 days (7 days expedited)",
    notes:
      "North Carolina calls SNAP 'Food and Nutrition Services.' ePASS covers FNS, Medicaid, Work First, childcare, and energy assistance screening.",
  },
  {
    state: "Michigan",
    stateCode: "MI",
    programSlug: "snap",
    programName: "SNAP",
    stateProgramName: "Food Assistance Program / Bridge Card",
    incomeLimits: "200% FPL gross income (BBCE); no asset test",
    applicationPortal: "MI Bridges",
    portalUrl: "https://newmibridges.michigan.gov",
    processingTime: "30 days (7 days expedited)",
    notes:
      "Michigan calls SNAP the Food Assistance Program and issues benefits on the Bridge Card. MI Bridges covers FAP, Medicaid, Healthy Michigan Plan, FIP (TANF), childcare, and State Emergency Relief.",
  },

  // ── Medicaid ──────────────────────────────────────────────
  {
    state: "California",
    stateCode: "CA",
    programSlug: "medicaid",
    programName: "Medicaid",
    stateProgramName: "Medi-Cal",
    incomeLimits:
      "138% FPL for adults; 266% FPL for children; 213% FPL for pregnant women",
    applicationPortal: "BenefitsCal",
    portalUrl: "https://benefitscal.com",
    processingTime: "45 days",
    notes:
      "Medi-Cal expanded to all income-eligible residents regardless of immigration status (phased 2022-2024), the most expansive Medicaid immigration policy in the US. Enrollment is approximately 15.4 million people.",
  },
  {
    state: "Texas",
    stateCode: "TX",
    programSlug: "medicaid",
    programName: "Medicaid",
    stateProgramName: "Texas Medicaid",
    incomeLimits:
      "~14% FPL for parents (~$310/month for family of 3); no coverage for childless adults",
    applicationPortal: "Your Texas Benefits",
    portalUrl: "https://yourtexasbenefits.com",
    processingTime: "45 days",
    notes:
      "Texas has NOT expanded Medicaid. Coverage is among the most restrictive in the US. An estimated 770,000+ Texans fall in the coverage gap. Children qualify through CHIP at 201% FPL.",
  },
  {
    state: "Florida",
    stateCode: "FL",
    programSlug: "medicaid",
    programName: "Medicaid",
    stateProgramName: "Florida Medicaid",
    incomeLimits:
      "~26% FPL for parents; no coverage for childless adults; children 210% FPL via KidCare",
    applicationPortal: "MyACCESS Florida",
    portalUrl: "https://myflorida.com/accessflorida",
    processingTime: "45 days",
    notes:
      "Florida has NOT expanded Medicaid. Adults face very restrictive eligibility. Florida offers a Medically Needy spend-down pathway for those over income limits. KidCare covers children through several sub-programs.",
  },
  {
    state: "New York",
    stateCode: "NY",
    programSlug: "medicaid",
    programName: "Medicaid",
    stateProgramName: "NY Medicaid",
    incomeLimits: "138% FPL for adults; higher for children and pregnant women",
    applicationPortal: "NY State of Health",
    portalUrl: "https://nystateofhealth.ny.gov",
    processingTime: "45 days (often faster)",
    notes:
      "New York also offers the Essential Plan ($0-$20/month) for those just above Medicaid limits, and Child Health Plus up to 400% FPL. NYC residents may access additional local programs through NYCHA and HRA.",
  },
  {
    state: "Pennsylvania",
    stateCode: "PA",
    programSlug: "medicaid",
    programName: "Medicaid",
    stateProgramName: "PA Medical Assistance (MA)",
    incomeLimits: "138% FPL for adults; CHIP up to 319% FPL for children",
    applicationPortal: "COMPASS",
    portalUrl: "https://compass.state.pa.us",
    processingTime: "45 days",
    notes:
      "Pennsylvania created the national model for CHIP. CHIP's 319% FPL threshold is exceptionally generous. PACE/PACENET provides state-funded prescription drug coverage for residents 65+.",
  },
  {
    state: "Illinois",
    stateCode: "IL",
    programSlug: "medicaid",
    programName: "Medicaid",
    stateProgramName: "Illinois Medicaid / HealthChoice Illinois",
    incomeLimits:
      "138% FPL for adults; All Kids covers children regardless of immigration status",
    applicationPortal: "ABE (Application for Benefits Eligibility)",
    portalUrl: "https://abe.illinois.gov",
    processingTime: "45 days",
    notes:
      "Illinois offers Health Benefits for Immigrant Adults/Seniors, providing state-funded Medicaid-like coverage for undocumented immigrants 42+. All Kids covers all children regardless of immigration status or income.",
  },
  {
    state: "Ohio",
    stateCode: "OH",
    programSlug: "medicaid",
    programName: "Medicaid",
    stateProgramName: "Ohio Medicaid",
    incomeLimits:
      "138% FPL for adults; 206% FPL for children; 200% FPL for pregnant women",
    applicationPortal: "Benefits.ohio.gov",
    portalUrl: "https://benefits.ohio.gov",
    processingTime: "45 days",
    notes:
      "Ohio expanded Medicaid under the ACA. Enrollment is approximately 3.3 million. PIPP Plus caps utility bills at 6% of income for eligible Medicaid recipients.",
  },
  {
    state: "Georgia",
    stateCode: "GA",
    programSlug: "medicaid",
    programName: "Medicaid",
    stateProgramName: "Georgia Medicaid / Pathways",
    incomeLimits:
      "~33% FPL for parents (traditional); up to 100% FPL via Pathways (with 80 hr/month work requirement)",
    applicationPortal: "Georgia Gateway",
    portalUrl: "https://gateway.ga.gov",
    processingTime: "45 days",
    notes:
      "Georgia launched Pathways in 2023 with work/qualifying activity requirements instead of full ACA expansion. Coverage remains very restrictive. PeachCare for Kids covers children through CHIP.",
  },
  {
    state: "North Carolina",
    stateCode: "NC",
    programSlug: "medicaid",
    programName: "Medicaid",
    stateProgramName: "NC Medicaid",
    incomeLimits:
      "138% FPL for adults (expanded Dec 2023); higher limits for children and pregnant women",
    applicationPortal: "ePASS",
    portalUrl: "https://epass.nc.gov",
    processingTime: "45 days",
    notes:
      "North Carolina expanded Medicaid in December 2023. The Healthy Opportunities Pilots program is the first in the nation using Medicaid funds to address housing instability, food insecurity, and transportation.",
  },
  {
    state: "Michigan",
    stateCode: "MI",
    programSlug: "medicaid",
    programName: "Medicaid",
    stateProgramName: "Healthy Michigan Plan",
    incomeLimits:
      "138% FPL for adults; children covered through Medicaid/Healthy Kids",
    applicationPortal: "MI Bridges",
    portalUrl: "https://newmibridges.michigan.gov",
    processingTime: "45 days",
    notes:
      "The Healthy Michigan Plan includes healthy behavior incentives: participants can reduce cost-sharing by completing a Health Risk Assessment. Enrollment is approximately 3.0 million across all Medicaid programs.",
  },

  // ── Section 8 ─────────────────────────────────────────────
  {
    state: "California",
    stateCode: "CA",
    programSlug: "section-8",
    programName: "Section 8",
    stateProgramName: "Housing Choice Voucher Program (California)",
    incomeLimits:
      "50% AMI (area median income); varies by county. Extremely competitive.",
    applicationPortal: "Local PHA Waitlists",
    portalUrl: "https://www.hud.gov/states/california/renting",
    processingTime: "Waitlists typically 2-8 years; varies by county PHA",
    notes:
      "California has hundreds of local PHAs. Major agencies include HACLA (Los Angeles), SFHA (San Francisco), and SDHC (San Diego). Most waitlists are closed; check individual PHA websites for openings.",
  },
  {
    state: "Texas",
    stateCode: "TX",
    programSlug: "section-8",
    programName: "Section 8",
    stateProgramName: "Housing Choice Voucher Program (Texas)",
    incomeLimits:
      "50% AMI; varies by metro area. Preference for extremely low income (30% AMI).",
    applicationPortal: "Local PHA Waitlists",
    portalUrl: "https://www.hud.gov/states/texas/renting",
    processingTime: "Waitlists typically 1-5 years; varies by PHA",
    notes:
      "Major PHAs include Houston Housing Authority, San Antonio Housing Authority, and DHA (Dallas). Texas has no state-level housing agency managing vouchers; all administration is local.",
  },
  {
    state: "Florida",
    stateCode: "FL",
    programSlug: "section-8",
    programName: "Section 8",
    stateProgramName: "Housing Choice Voucher Program (Florida)",
    incomeLimits:
      "50% AMI; varies by county. Priority for extremely low income (30% AMI).",
    applicationPortal: "Local PHA Waitlists",
    portalUrl: "https://www.hud.gov/states/florida/renting",
    processingTime: "Waitlists typically 2-7 years; varies by PHA",
    notes:
      "Key PHAs include Miami-Dade Public Housing, Jacksonville Housing Authority, and Orlando Housing Authority. Florida's high rental costs make voucher availability especially limited.",
  },
  {
    state: "New York",
    stateCode: "NY",
    programSlug: "section-8",
    programName: "Section 8",
    stateProgramName: "Housing Choice Voucher Program (New York)",
    incomeLimits:
      "50% AMI; varies by county. NYC has some of the highest AMI thresholds.",
    applicationPortal: "NYCHA / Local PHA Waitlists",
    portalUrl: "https://www.hud.gov/states/new_york/renting",
    processingTime: "Waitlists typically 5-10+ years in NYC; shorter upstate",
    notes:
      "NYCHA is the largest public housing authority in the US. NYC Section 8 waitlists are among the longest in the nation. Upstate PHAs may have shorter wait times.",
  },
  {
    state: "Pennsylvania",
    stateCode: "PA",
    programSlug: "section-8",
    programName: "Section 8",
    stateProgramName: "Housing Choice Voucher Program (Pennsylvania)",
    incomeLimits: "50% AMI; varies by county.",
    applicationPortal: "Local PHA Waitlists",
    portalUrl: "https://www.hud.gov/states/pennsylvania/renting",
    processingTime: "Waitlists typically 2-5 years; varies by PHA",
    notes:
      "Major PHAs include PHA (Philadelphia Housing Authority) and HACP (Housing Authority of the City of Pittsburgh). COMPASS does not handle Section 8; applications go directly to local PHAs.",
  },
  {
    state: "Illinois",
    stateCode: "IL",
    programSlug: "section-8",
    programName: "Section 8",
    stateProgramName: "Housing Choice Voucher Program (Illinois)",
    incomeLimits:
      "50% AMI; varies by county. Chicago has specific AMI thresholds.",
    applicationPortal: "CHA / Local PHA Waitlists",
    portalUrl: "https://www.hud.gov/states/illinois/renting",
    processingTime:
      "Waitlists typically 3-7 years in Chicago; shorter downstate",
    notes:
      "CHA (Chicago Housing Authority) administers vouchers in Chicago. Downstate and suburban PHAs have separate waitlists. ABE does not cover Section 8.",
  },
  {
    state: "Ohio",
    stateCode: "OH",
    programSlug: "section-8",
    programName: "Section 8",
    stateProgramName: "Housing Choice Voucher Program (Ohio)",
    incomeLimits: "50% AMI; varies by metro area.",
    applicationPortal: "Local PHA Waitlists",
    portalUrl: "https://www.hud.gov/states/ohio/renting",
    processingTime: "Waitlists typically 1-4 years; varies by PHA",
    notes:
      "Major PHAs include CMHA (Cuyahoga Metropolitan Housing Authority in Cleveland) and Columbus Metropolitan Housing Authority. PIPP Plus utility assistance can supplement housing aid for eligible residents.",
  },
  {
    state: "Georgia",
    stateCode: "GA",
    programSlug: "section-8",
    programName: "Section 8",
    stateProgramName: "Housing Choice Voucher Program (Georgia)",
    incomeLimits: "50% AMI; varies by county.",
    applicationPortal: "Local PHA Waitlists",
    portalUrl: "https://www.hud.gov/states/georgia/renting",
    processingTime: "Waitlists typically 2-6 years; varies by PHA",
    notes:
      "AHA (Atlanta Housing Authority) is the primary PHA for the Atlanta metro area. Georgia Gateway does not handle Section 8 applications.",
  },
  {
    state: "North Carolina",
    stateCode: "NC",
    programSlug: "section-8",
    programName: "Section 8",
    stateProgramName: "Housing Choice Voucher Program (North Carolina)",
    incomeLimits: "50% AMI; varies by county.",
    applicationPortal: "Local PHA Waitlists",
    portalUrl: "https://www.hud.gov/states/north_carolina/renting",
    processingTime: "Waitlists typically 1-5 years; varies by PHA",
    notes:
      "Key PHAs include Charlotte Housing Authority and Raleigh Housing Authority. NC Housing Finance Agency offers additional homeownership programs. ePASS does not cover Section 8.",
  },
  {
    state: "Michigan",
    stateCode: "MI",
    programSlug: "section-8",
    programName: "Section 8",
    stateProgramName: "Housing Choice Voucher Program (Michigan)",
    incomeLimits: "50% AMI; varies by metro area.",
    applicationPortal: "Local PHA Waitlists",
    portalUrl: "https://www.hud.gov/states/michigan/renting",
    processingTime: "Waitlists typically 1-4 years; varies by PHA",
    notes:
      "Major PHAs include Detroit Housing Commission and Michigan State Housing Development Authority (MSHDA). MI Bridges does not handle Section 8; apply directly through local PHAs.",
  },
];

/** Look up one overlay by program slug + two-letter state code. */
export function getStateOverlay(
  programSlug: string,
  stateCode: string,
): StateOverlay | undefined {
  const code = stateCode.toUpperCase();
  return STATE_OVERLAYS.find(
    (o) => o.programSlug === programSlug && o.stateCode === code,
  );
}

/** All overlays for a given program (e.g. all 10 SNAP state pages). */
export function getOverlaysForProgram(programSlug: string): StateOverlay[] {
  return STATE_OVERLAYS.filter((o) => o.programSlug === programSlug);
}

/** All overlays for a given state (e.g. all 3 programs in California). */
export function getOverlaysForState(stateCode: string): StateOverlay[] {
  const code = stateCode.toUpperCase();
  return STATE_OVERLAYS.filter((o) => o.stateCode === code);
}

/** Resolve a full state name from a two-letter code. */
export function getStateName(stateCode: string): string {
  return STATE_NAMES[stateCode.toUpperCase()] ?? stateCode;
}

/**
 * Return all 30 slug/state combos for static generation.
 * Used by the route's generateStaticParams export.
 */
export function getAllStateProgramParams(): { id: string; state: string }[] {
  return STATE_OVERLAYS.map((o) => ({
    id: o.programSlug,
    state: o.stateCode.toLowerCase(),
  }));
}

/** Get two neighboring state overlays for cross-linking. */
export function getNeighboringStates(
  programSlug: string,
  stateCode: string,
): StateOverlay[] {
  const siblings = getOverlaysForProgram(programSlug);
  const idx = siblings.findIndex(
    (o) => o.stateCode === stateCode.toUpperCase(),
  );
  if (idx === -1) return siblings.slice(0, 2);
  const prev = siblings[(idx - 1 + siblings.length) % siblings.length];
  const next = siblings[(idx + 1) % siblings.length];
  return [prev, next];
}
