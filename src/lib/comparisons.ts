export interface ComparisonDimension {
  label: string;
  a: string;
  b: string;
}

export interface ComparisonProgram {
  name: string;
  tagline: string;
  dimensions: ComparisonDimension[];
}

export interface ComparisonFAQ {
  q: string;
  a: string;
}

export interface Comparison {
  slug: string;
  title: string;
  description: string;
  programA: ComparisonProgram;
  programB: ComparisonProgram;
  verdict: string;
  verdictDetail: string;
  faqs: ComparisonFAQ[];
}

export const comparisons: Comparison[] = [
  {
    slug: "snap-vs-wic",
    title: "SNAP vs WIC: Which Food Benefit Is Right for You?",
    description:
      "SNAP and WIC are both federal food assistance programs, but they work very differently. Understanding the key differences helps you apply for the right program — or both.",
    programA: {
      name: "SNAP",
      tagline: "Broad grocery benefits for households with limited income",
      dimensions: [
        {
          label: "Who qualifies",
          a: "Most households with income below 130% FPL",
          b: "",
        },
        {
          label: "Benefit format",
          a: "Monthly dollar amount loaded on EBT card",
          b: "",
        },
        {
          label: "What you can buy",
          a: "Most grocery items at approved retailers",
          b: "",
        },
        {
          label: "Age requirements",
          a: "No age limit — whole household covered",
          b: "",
        },
        {
          label: "Income limit (family of 4)",
          a: "~$3,250/month gross",
          b: "",
        },
        {
          label: "Application",
          a: "Apply at your state SNAP office or online",
          b: "",
        },
      ],
    },
    programB: {
      name: "WIC",
      tagline: "Targeted nutrition support for women, infants, and children",
      dimensions: [
        {
          label: "Who qualifies",
          a: "",
          b: "Pregnant/postpartum women, infants, children under 5",
        },
        {
          label: "Benefit format",
          a: "",
          b: "Vouchers or EBT for specific approved foods",
        },
        {
          label: "What you can buy",
          a: "",
          b: "A set list: milk, eggs, cereal, produce, formula",
        },
        {
          label: "Age requirements",
          a: "",
          b: "Children must be under 5; women during/after pregnancy",
        },
        {
          label: "Income limit (family of 4)",
          a: "",
          b: "~$3,868/month gross (185% FPL)",
        },
        {
          label: "Application",
          a: "",
          b: "Apply at a local WIC clinic or health department",
        },
      ],
    },
    verdict: "Apply for both if you can — they cover different needs.",
    verdictDetail:
      "SNAP gives you broad flexibility to buy nearly any grocery item, but gives you less per person. WIC provides more value per dollar for the specific foods it covers, and has a slightly higher income limit. If you have a child under 5 or are pregnant, apply for WIC first — its income limit is higher and benefits are immediate. Then apply for SNAP if your household income is below the SNAP threshold.",
    faqs: [
      {
        q: "Can I use both SNAP and WIC at the same time?",
        a: "Yes. SNAP and WIC are completely separate programs with separate applications. Many families receive both simultaneously. WIC benefits are targeted at specific foods while SNAP covers general groceries.",
      },
      {
        q: "Which program gives more money?",
        a: "It depends on household size and composition. SNAP benefits average around $230/month per household but scale with household size. WIC provides a fixed package of foods — roughly $50–100/month in value depending on what you qualify for.",
      },
      {
        q: "Is there a work requirement for WIC?",
        a: "No. WIC has no work requirements. SNAP has work requirements for able-bodied adults without dependents (ABAWDs) ages 18–54, though many states have waivers.",
      },
    ],
  },
  {
    slug: "medicaid-vs-marketplace",
    title:
      "Medicaid vs ACA Marketplace: Which Health Coverage Should You Choose?",
    description:
      "If you're uninsured or lost employer coverage, you have two main paths to affordable health insurance. The right one depends on your income and where you live.",
    programA: {
      name: "Medicaid",
      tagline: "Free or near-free coverage for lower incomes",
      dimensions: [
        {
          label: "Income range",
          a: "Up to ~138% FPL in expansion states",
          b: "",
        },
        { label: "Monthly premium", a: "$0 in most cases", b: "" },
        { label: "Deductibles", a: "None or very low", b: "" },
        {
          label: "Enrollment period",
          a: "Open year-round — apply any time",
          b: "",
        },
        {
          label: "Dental/vision",
          a: "Often included for adults in expansion states",
          b: "",
        },
        { label: "Provider network", a: "Varies; may be more limited", b: "" },
      ],
    },
    programB: {
      name: "ACA Marketplace",
      tagline: "Subsidized private insurance for moderate incomes",
      dimensions: [
        {
          label: "Income range",
          a: "",
          b: "100–400% FPL (subsidies available)",
        },
        {
          label: "Monthly premium",
          a: "",
          b: "After subsidies: often $0–$50/month",
        },
        {
          label: "Deductibles",
          a: "",
          b: "Typically $500–$3,000 depending on plan tier",
        },
        {
          label: "Enrollment period",
          a: "",
          b: "Nov 1–Jan 15 or qualifying life event",
        },
        {
          label: "Dental/vision",
          a: "",
          b: "Separate plans; not included in health coverage",
        },
        {
          label: "Provider network",
          a: "",
          b: "Larger network options available",
        },
      ],
    },
    verdict:
      "If your income is below 138% FPL, Medicaid is almost always the better choice.",
    verdictDetail:
      "Medicaid is free, covers more services, and you can enroll any time of year. If your income is above the Medicaid threshold (or you live in a non-expansion state), the ACA Marketplace with premium tax credits is your best option. Check whether your state expanded Medicaid — 40 states have. If you're near the income cutoff, run the numbers both ways at healthcare.gov.",
    faqs: [
      {
        q: "What if my income is too high for Medicaid but I can't afford Marketplace plans?",
        a: "Enhanced premium tax credits from the Inflation Reduction Act have significantly reduced Marketplace premiums. Many people earning 200–300% FPL pay $0 or very little per month. Use the Healthcare.gov calculator to see your actual cost before deciding.",
      },
      {
        q: "Can I switch from Medicaid to Marketplace if my income changes?",
        a: "Yes. Income changes are a qualifying life event for special enrollment. If your income rises above the Medicaid threshold, you have 60 days to enroll in a Marketplace plan.",
      },
      {
        q: "Does Medicaid cover prescriptions?",
        a: "Yes. All Medicaid programs cover prescription drugs, though formularies vary by state. Marketplace plans also cover prescriptions, but cost-sharing varies significantly by plan tier.",
      },
    ],
  },
  {
    slug: "section-8-vs-public-housing",
    title: "Section 8 vs Public Housing: What's the Difference?",
    description:
      "Both programs help low-income families afford housing, but they work in fundamentally different ways. Understanding the difference helps you decide where to apply.",
    programA: {
      name: "Section 8 (Housing Choice Vouchers)",
      tagline: "Portable vouchers you use in private market housing",
      dimensions: [
        {
          label: "How it works",
          a: "Voucher paid directly to private landlord",
          b: "",
        },
        {
          label: "Housing choice",
          a: "Rent any qualifying private unit",
          b: "",
        },
        {
          label: "Portability",
          a: "Can move between states with voucher",
          b: "",
        },
        { label: "Wait time", a: "1–10+ years; many lists are closed", b: "" },
        { label: "Rent share", a: "You pay ~30% of adjusted income", b: "" },
        {
          label: "Administered by",
          a: "Local Public Housing Authority (PHA)",
          b: "",
        },
      ],
    },
    programB: {
      name: "Public Housing",
      tagline: "Government-owned units managed by local housing authorities",
      dimensions: [
        {
          label: "How it works",
          a: "",
          b: "You live in a government-owned property",
        },
        {
          label: "Housing choice",
          a: "",
          b: "Limited to units in the public housing stock",
        },
        {
          label: "Portability",
          a: "",
          b: "Not portable — tied to specific development",
        },
        {
          label: "Wait time",
          a: "",
          b: "1–5+ years; availability varies by city",
        },
        { label: "Rent share", a: "", b: "You pay ~30% of adjusted income" },
        {
          label: "Administered by",
          a: "",
          b: "Local Public Housing Authority (PHA)",
        },
      ],
    },
    verdict:
      "Apply to both through your local PHA — they're the same application in most areas.",
    verdictDetail:
      "Section 8 vouchers give you more choice and flexibility — you can rent most private apartments and even move between cities. Public housing is typically faster to get (where available) but locks you into a specific development. In most cities, you apply for both simultaneously through your local Public Housing Authority. Given long wait times for both, applying as early as possible is essential.",
    faqs: [
      {
        q: "Can I use a Section 8 voucher to buy a home?",
        a: "Yes. The Homeownership Voucher program (also called HCV Homeownership) allows qualifying families to use their voucher toward mortgage payments instead of rent. You must meet income, employment, and first-time buyer requirements.",
      },
      {
        q: "What income qualifies for Section 8?",
        a: "You must earn at or below 50% of the Area Median Income (AMI) for your area. At least 75% of vouchers must go to families at or below 30% AMI. Income limits vary significantly by city.",
      },
      {
        q: "How do I get off the wait list faster?",
        a: "Apply to multiple PHAs simultaneously — wait times vary significantly by location. Watch for open enrollment periods. Preference categories (veterans, disabled persons, homeless families) may move you up the list.",
      },
    ],
  },
  {
    slug: "rd-credit-vs-sbir",
    title: "R&D Tax Credit vs SBIR Grant: Which Should Your Business Pursue?",
    description:
      "Small businesses investing in research and development have two major federal incentives available. They serve different purposes and can often be used together.",
    programA: {
      name: "R&D Tax Credit (Section 41)",
      tagline:
        "A permanent tax credit for qualified research and experimentation expenses",
      dimensions: [
        { label: "Type", a: "Tax credit against income or payroll tax", b: "" },
        {
          label: "Amount",
          a: "20% of qualified research expenses above base",
          b: "",
        },
        {
          label: "Who qualifies",
          a: "Any business with qualifying R&D activities",
          b: "",
        },
        {
          label: "Application process",
          a: "Claimed on annual tax return",
          b: "",
        },
        {
          label: "Upfront cash",
          a: "No — reduces tax bill, or carryforward",
          b: "",
        },
        { label: "IP retention", a: "Yes — you own all resulting IP", b: "" },
      ],
    },
    programB: {
      name: "SBIR Grant",
      tagline:
        "Competitive federal grants for small businesses doing innovative R&D",
      dimensions: [
        {
          label: "Type",
          a: "",
          b: "Direct grant (Phase I: ~$275K; Phase II: ~$1.85M)",
        },
        {
          label: "Amount",
          a: "",
          b: "Phase I: up to $275,000; Phase II: up to $1.85M",
        },
        {
          label: "Who qualifies",
          a: "",
          b: "US small businesses with <500 employees",
        },
        {
          label: "Application process",
          a: "",
          b: "Competitive proposal to federal agencies",
        },
        {
          label: "Upfront cash",
          a: "",
          b: "Yes — direct cash disbursement to your business",
        },
        {
          label: "IP retention",
          a: "",
          b: "Yes — you retain ownership of resulting IP",
        },
      ],
    },
    verdict:
      "Pursue both — they're not mutually exclusive and serve different cash flow needs.",
    verdictDetail:
      "The R&D tax credit is available to almost any business doing qualifying research — software, manufacturing, biotech, and more. It's not cash upfront but reduces your tax burden immediately or creates a carryforward. SBIR is competitive and takes months, but provides real cash to fund research you couldn't otherwise afford. Startups often use SBIR to fund early R&D, then claim the R&D credit for remaining expenses. They can be combined in the same year.",
    faqs: [
      {
        q: "Can a startup that isn't profitable use the R&D tax credit?",
        a: "Yes. Qualified Small Businesses (QSBs) — companies with less than $5M in gross receipts and no more than 5 years of gross receipts — can apply up to $500,000 of the R&D credit against payroll taxes instead of income taxes.",
      },
      {
        q: "How competitive are SBIR grants?",
        a: "Acceptance rates vary by agency and topic area, but typically range from 10–25% for Phase I. Phase II acceptance rates for Phase I awardees are higher, often 40–60%. Strong commercialization potential is as important as technical merit.",
      },
      {
        q: "Can I claim the R&D credit for the same expenses funded by SBIR?",
        a: "No. You cannot claim the R&D tax credit for expenses paid with SBIR funds. You can claim the credit on R&D expenses paid with your own funds in the same year you receive an SBIR award.",
      },
    ],
  },
];

export function getComparison(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug);
}

export function getAllComparisonSlugs(): string[] {
  return comparisons.map((c) => c.slug);
}
