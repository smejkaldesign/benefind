export interface SituationProgram {
  name: string;
  slug: string;
  summary: string;
  eligibilityHint: string;
}

export interface SituationFAQ {
  q: string;
  a: string;
}

export interface Situation {
  slug: string;
  title: string;
  hero: string;
  description: string;
  programs: SituationProgram[];
  faqs: SituationFAQ[];
  relatedSituations: string[];
}

export const situations: Situation[] = [
  {
    slug: "veterans",
    title: "Benefits for Veterans",
    hero: "You served. You've earned more than you might know.",
    description:
      "Veterans and their families often qualify for a wide range of federal and state benefits — from healthcare to housing assistance to education funding. Many go unclaimed because the system is hard to navigate. Benefind helps you find everything you're entitled to.",
    programs: [
      {
        name: "VA Healthcare",
        slug: "va-healthcare",
        summary:
          "Free or low-cost healthcare through VA medical centers and clinics.",
        eligibilityHint: "Most veterans with honorable discharge qualify.",
      },
      {
        name: "VA Disability Compensation",
        slug: "va-disability",
        summary:
          "Monthly tax-free payments for service-connected disabilities.",
        eligibilityHint:
          "Requires a service-connected disability rating from the VA.",
      },
      {
        name: "GI Bill (Post-9/11)",
        slug: "gi-bill",
        summary: "Tuition, housing, and book stipends for higher education.",
        eligibilityHint: "90+ days of active duty after Sept. 10, 2001.",
      },
      {
        name: "Section 8 (HCV)",
        slug: "section-8",
        summary:
          "Rental assistance vouchers that cover the gap between rent and income.",
        eligibilityHint: "Income at or below 50% of area median income.",
      },
      {
        name: "SNAP",
        slug: "snap",
        summary: "Monthly grocery benefits loaded onto an EBT card.",
        eligibilityHint:
          "Gross income at or below 130% of federal poverty level.",
      },
      {
        name: "Medicaid",
        slug: "medicaid",
        summary:
          "Free or low-cost health coverage for qualifying individuals and families.",
        eligibilityHint: "Income and household size vary by state.",
      },
      {
        name: "SSI",
        slug: "ssi",
        summary:
          "Monthly cash assistance for disabled or elderly veterans with limited income.",
        eligibilityHint: "Under $2,000 in countable resources; limited income.",
      },
    ],
    faqs: [
      {
        q: "Do veterans automatically qualify for VA healthcare?",
        a: "Not automatically — you need to apply and meet eligibility criteria including discharge status and length of service. Most veterans with an honorable discharge qualify, but priority is assigned by a group system based on disability ratings and income.",
      },
      {
        q: "Can veterans use both VA benefits and Medicaid?",
        a: "Yes. VA healthcare and Medicaid are separate programs. Many veterans use VA for service-connected care and Medicaid for other health needs. Eligibility for each is determined independently.",
      },
      {
        q: "Is the GI Bill only for college?",
        a: "No. Post-9/11 GI Bill benefits can be used for undergraduate and graduate programs, vocational training, on-the-job training, apprenticeships, and flight training. Benefits can also be transferred to dependents in some cases.",
      },
      {
        q: "Are VA disability payments taxable?",
        a: "No. VA disability compensation is tax-free at both the federal and state level.",
      },
    ],
    relatedSituations: [
      "people-with-disabilities",
      "seniors",
      "recently-unemployed",
    ],
  },
  {
    slug: "students",
    title: "Benefits for Students",
    hero: "College shouldn't cost everything you have.",
    description:
      "Between tuition, housing, and food, students face a financial squeeze that many federal and state programs were designed to ease. You may qualify for more than just financial aid.",
    programs: [
      {
        name: "Pell Grant",
        slug: "pell-grant",
        summary:
          "Federal grant up to $7,395/year that doesn't need to be repaid.",
        eligibilityHint: "Based on Expected Family Contribution from FAFSA.",
      },
      {
        name: "SNAP",
        slug: "snap",
        summary:
          "Monthly grocery benefits — some students qualify with work or dependent status.",
        eligibilityHint: "Must work 20+ hrs/week or meet an exemption.",
      },
      {
        name: "Medicaid / CHIP",
        slug: "medicaid",
        summary: "Free or low-cost health coverage based on income.",
        eligibilityHint:
          "Many full-time students qualify based on their own income.",
      },
      {
        name: "LIHEAP",
        slug: "liheap",
        summary:
          "Help with utility bills including heating, cooling, and energy crises.",
        eligibilityHint: "Income at or below 150% of federal poverty level.",
      },
      {
        name: "Work-Study",
        slug: "federal-work-study",
        summary:
          "Part-time jobs funded by the federal government through your school.",
        eligibilityHint: "Determined by financial need via FAFSA.",
      },
      {
        name: "State Tuition Grants",
        slug: "state-tuition-grants",
        summary: "State-specific grants that supplement federal aid.",
        eligibilityHint:
          "Varies by state — check your state's higher ed office.",
      },
    ],
    faqs: [
      {
        q: "Can college students get SNAP benefits?",
        a: "Most full-time students ages 18–49 are ineligible for SNAP unless they meet an exemption: working 20+ hours/week, participating in work-study, caring for a dependent child, or receiving TANF.",
      },
      {
        q: "Does the Pell Grant cover community college?",
        a: "Yes. The Pell Grant applies to accredited community colleges, vocational programs, and four-year universities. It's based on financial need, not academic merit.",
      },
      {
        q: "Can international students get federal benefits?",
        a: "Most federal benefits require U.S. citizenship or qualified alien status. International students on F-1 or J-1 visas are generally not eligible for SNAP, Medicaid, or Pell Grants.",
      },
    ],
    relatedSituations: ["recently-unemployed", "single-parents", "immigrants"],
  },
  {
    slug: "seniors",
    title: "Benefits for Seniors",
    hero: "You've put in a lifetime of work. These benefits are yours.",
    description:
      "Seniors aged 60 and older are among the most underserved populations when it comes to benefits. Many programs offer expanded eligibility or additional protections for older adults — from prescription drug help to food assistance.",
    programs: [
      {
        name: "Medicare",
        slug: "medicare",
        summary:
          "Federal health insurance for adults 65+ covering hospital, medical, and drug costs.",
        eligibilityHint:
          "Age 65+ or younger with certain disabilities or ESRD.",
      },
      {
        name: "Medicaid",
        slug: "medicaid",
        summary:
          "May supplement Medicare, covering long-term care and additional costs.",
        eligibilityHint:
          "Income and asset limits vary by state; many seniors qualify for both.",
      },
      {
        name: "SSI",
        slug: "ssi",
        summary:
          "Monthly cash for seniors 65+ with limited income and resources.",
        eligibilityHint: "Age 65+, income and resources below SSA limits.",
      },
      {
        name: "SNAP",
        slug: "snap",
        summary:
          "Grocery benefits; seniors may qualify at higher income thresholds.",
        eligibilityHint:
          "Households with seniors/disabled members skip the gross income test.",
      },
      {
        name: "LIHEAP",
        slug: "liheap",
        summary: "Energy bill assistance — seniors are a priority population.",
        eligibilityHint:
          "Income at or below 150% federal poverty level; seniors prioritized.",
      },
      {
        name: "Low Income Subsidy (LIS)",
        slug: "lis-extra-help",
        summary: "Extra Help with Medicare Part D prescription drug costs.",
        eligibilityHint: "Income below ~150% poverty line; limited resources.",
      },
      {
        name: "HECM (Reverse Mortgage)",
        slug: "hecm",
        summary:
          "FHA-insured program allowing seniors to convert home equity to cash.",
        eligibilityHint:
          "Age 62+, own your home outright or have significant equity.",
      },
    ],
    faqs: [
      {
        q: "Can I have both Medicare and Medicaid?",
        a: "Yes. Dual eligibility (Medicare + Medicaid) is common for low-income seniors. Medicaid often covers what Medicare doesn't — like long-term care, dental, and vision.",
      },
      {
        q: "What's the income limit for SSI in 2026?",
        a: "For 2026, the federal SSI payment standard is $967/month for individuals and $1,450 for couples. Income limits are lower than the payment amount due to how SSA counts income. Many states add a supplement.",
      },
      {
        q: "Are seniors exempt from SNAP work requirements?",
        a: "Yes. Seniors aged 60 and older are exempt from SNAP work requirements. Households with elderly or disabled members also receive more favorable income rules.",
      },
    ],
    relatedSituations: [
      "people-with-disabilities",
      "veterans",
      "recently-unemployed",
    ],
  },
  {
    slug: "single-parents",
    title: "Benefits for Single Parents",
    hero: "Raising a family alone is one of the hardest jobs there is. You shouldn't have to do it without support.",
    description:
      "Single parents often qualify for the broadest range of benefits — food assistance, healthcare for kids, childcare subsidies, housing help, and more. The challenge is knowing where to look.",
    programs: [
      {
        name: "SNAP",
        slug: "snap",
        summary: "Monthly grocery benefits for families with limited income.",
        eligibilityHint:
          "Gross income at or below 130% FPL; larger families receive more.",
      },
      {
        name: "CHIP",
        slug: "chip",
        summary:
          "Low-cost health coverage for children in families that earn too much for Medicaid.",
        eligibilityHint:
          "Children under 19 in families with income above Medicaid limits.",
      },
      {
        name: "WIC",
        slug: "wic",
        summary:
          "Nutrition benefits for pregnant women, new mothers, and children under 5.",
        eligibilityHint:
          "Income at or below 185% FPL; must have a nutritional risk factor.",
      },
      {
        name: "TANF",
        slug: "tanf",
        summary:
          "Cash assistance and support services for families with children.",
        eligibilityHint:
          "Families with children under 18; income and work requirements vary by state.",
      },
      {
        name: "CCDF (Childcare Subsidies)",
        slug: "ccdf",
        summary:
          "Federal childcare subsidies to help low-income families afford childcare.",
        eligibilityHint:
          "Parents working or in school; income varies by state.",
      },
      {
        name: "EITC",
        slug: "eitc",
        summary:
          "Refundable tax credit worth up to $7,830 for families with three or more children.",
        eligibilityHint:
          "Must have earned income and meet AGI limits; much higher with children.",
      },
      {
        name: "Section 8 (HCV)",
        slug: "section-8",
        summary:
          "Rental vouchers that keep housing costs capped at 30% of income.",
        eligibilityHint:
          "Income at or below 50% area median; families with children prioritized.",
      },
    ],
    faqs: [
      {
        q: "Can I get SNAP and TANF at the same time?",
        a: "Yes. SNAP and TANF are separate programs. Many single-parent families receive both simultaneously. TANF receipt can actually trigger automatic SNAP eligibility in some states.",
      },
      {
        q: "Is WIC only for pregnant women?",
        a: "No. WIC serves pregnant women, breastfeeding mothers, postpartum women up to 6 months, and children up to age 5. A child in your household may qualify even if you don't.",
      },
      {
        q: "What is the max EITC for a single parent with one child?",
        a: "For tax year 2025, the maximum EITC for a single filer with one qualifying child is $4,328. With two children it's $7,152, and with three or more it's $7,830.",
      },
    ],
    relatedSituations: ["students", "recently-unemployed", "immigrants"],
  },
  {
    slug: "gig-workers",
    title: "Benefits for Gig Workers",
    hero: "Self-employed doesn't mean on your own.",
    description:
      "Freelancers, rideshare drivers, delivery workers, and independent contractors often fall through the cracks. But many federal and state programs count self-employment income and offer real support.",
    programs: [
      {
        name: "Marketplace Insurance (ACA)",
        slug: "aca-marketplace",
        summary:
          "Health insurance with income-based subsidies for those without employer coverage.",
        eligibilityHint:
          "No employer coverage available; income between 100–400% FPL.",
      },
      {
        name: "SNAP",
        slug: "snap",
        summary:
          "Self-employment income counts — net earnings often qualify more people.",
        eligibilityHint:
          "Net self-employment income used; deductions reduce countable income.",
      },
      {
        name: "EITC",
        slug: "eitc",
        summary:
          "Tax credit for lower-income workers — gig income qualifies as earned income.",
        eligibilityHint:
          "Self-employment income counts; must file Schedule SE.",
      },
      {
        name: "Medicaid",
        slug: "medicaid",
        summary:
          "Free or low-cost coverage if your income falls below state thresholds.",
        eligibilityHint: "Annual income below ~138% FPL in expansion states.",
      },
      {
        name: "LIHEAP",
        slug: "liheap",
        summary:
          "Help paying energy bills, especially during peak heating/cooling seasons.",
        eligibilityHint:
          "Income at or below 150% FPL; irregular income averages over time.",
      },
      {
        name: "SBIR / STTR",
        slug: "sbir",
        summary:
          "Federal R&D grants for small businesses developing innovative technologies.",
        eligibilityHint:
          "US-owned small business; must have under 500 employees.",
      },
    ],
    faqs: [
      {
        q: "Does gig income count for SNAP?",
        a: "Yes. SNAP uses net self-employment income — your gross earnings minus allowable business expenses. This often results in lower countable income than a W-2 worker with the same revenue.",
      },
      {
        q: "Can I get unemployment if I'm a gig worker?",
        a: "Standard unemployment insurance (UI) doesn't cover independent contractors. However, Pandemic Unemployment Assistance (PUA) did during COVID-19. Some states are exploring gig-worker UI programs. Check your state's labor department for current rules.",
      },
      {
        q: "Can I deduct health insurance premiums as a self-employed person?",
        a: "Yes. Self-employed individuals can deduct 100% of health insurance premiums for themselves, their spouse, and dependents from federal taxable income — even if you don't itemize.",
      },
    ],
    relatedSituations: ["recently-unemployed", "students", "veterans"],
  },
  {
    slug: "immigrants",
    title: "Benefits for Immigrants",
    hero: "Navigating a new country is hard enough. Knowing your options shouldn't be.",
    description:
      "Eligibility for federal benefits depends on immigration status, length of residence, and the specific program. Many immigrants and their U.S.-born children qualify for significant support.",
    programs: [
      {
        name: "SNAP",
        slug: "snap",
        summary:
          "Lawful permanent residents may qualify after 5 years; some exceptions apply sooner.",
        eligibilityHint:
          "Qualified alien status required; 5-year bar applies to most adults.",
      },
      {
        name: "Medicaid / CHIP",
        slug: "medicaid",
        summary:
          "Emergency Medicaid available regardless of status; CHIP varies by state.",
        eligibilityHint:
          "LPRs qualify after 5 years; children often qualify immediately in many states.",
      },
      {
        name: "WIC",
        slug: "wic",
        summary:
          "WIC does not have a 5-year waiting period for most immigration statuses.",
        eligibilityHint:
          "All lawful immigrants eligible regardless of length of US residency.",
      },
      {
        name: "EITC",
        slug: "eitc",
        summary:
          "Available to lawful residents with Social Security numbers who earned income.",
        eligibilityHint: "Must have a valid SSN and qualifying earned income.",
      },
      {
        name: "ACA Marketplace",
        slug: "aca-marketplace",
        summary:
          "Health coverage with subsidies; DACA recipients eligible in most states.",
        eligibilityHint:
          "Lawful presence required; DACA status is treated as lawful presence in most states.",
      },
      {
        name: "LIHEAP",
        slug: "liheap",
        summary: "Energy assistance available to many lawful immigrants.",
        eligibilityHint:
          "Lawful immigrant status; income and resource limits apply.",
      },
    ],
    faqs: [
      {
        q: "Will applying for benefits affect my green card application?",
        a: "The 'public charge' rule applies to certain federal benefits. As of 2023, SNAP, Medicaid, CHIP, and housing vouchers are NOT considered in most immigration decisions. TANF and SSI still may be. Always consult an immigration attorney before applying if you're in the green card process.",
      },
      {
        q: "Can undocumented immigrants get any benefits?",
        a: "Emergency Medicaid is available to anyone regardless of status in a medical emergency. U.S.-born children of undocumented parents qualify for full benefits. Many state and local programs have no immigration status requirement.",
      },
      {
        q: "What is a 'qualified alien' for benefits purposes?",
        a: "Qualified aliens include lawful permanent residents (green card holders), refugees, asylees, people granted withholding of deportation, Cuban/Haitian entrants, and certain survivors of domestic violence. The exact definition varies by program.",
      },
    ],
    relatedSituations: ["single-parents", "students", "recently-unemployed"],
  },
  {
    slug: "recently-unemployed",
    title: "Benefits for Recently Unemployed",
    hero: "Losing a job is hard. Finding support shouldn't be.",
    description:
      "A job loss can make you eligible for programs you didn't qualify for before. Acting quickly matters — many benefits are available from day one, and others have short application windows.",
    programs: [
      {
        name: "Unemployment Insurance",
        slug: "unemployment-insurance",
        summary:
          "Weekly cash payments based on prior wages while you look for work.",
        eligibilityHint:
          "Must have lost job through no fault of your own; prior earnings required.",
      },
      {
        name: "Medicaid / ACA Marketplace",
        slug: "medicaid",
        summary:
          "Job loss is a qualifying life event — you have 60 days to enroll.",
        eligibilityHint:
          "Losing job-based coverage triggers a special enrollment period.",
      },
      {
        name: "SNAP",
        slug: "snap",
        summary:
          "Income drop from job loss often makes households immediately eligible.",
        eligibilityHint:
          "Apply as soon as income drops; processing takes up to 30 days.",
      },
      {
        name: "LIHEAP",
        slug: "liheap",
        summary:
          "Energy bill help to prevent shutoffs during periods of income disruption.",
        eligibilityHint:
          "Income drop often qualifies; crisis assistance available for imminent shutoffs.",
      },
      {
        name: "COBRA",
        slug: "cobra",
        summary:
          "Continuation of employer health coverage for up to 18 months.",
        eligibilityHint:
          "Available if you had employer coverage; typically expensive.",
      },
      {
        name: "EITC",
        slug: "eitc",
        summary:
          "If you worked part of the year, you may still qualify at tax time.",
        eligibilityHint:
          "Based on the full tax year; partial-year earnings may still qualify.",
      },
      {
        name: "WIOA Training",
        slug: "wioa",
        summary:
          "Federally funded job training, resume help, and career services.",
        eligibilityHint:
          "Available at American Job Centers; income verification required.",
      },
    ],
    faqs: [
      {
        q: "How quickly can I get SNAP after losing my job?",
        a: "You can apply the same day you lose your job. Standard processing is up to 30 days, but Expedited SNAP is available within 7 days if your income and resources are very low.",
      },
      {
        q: "Is unemployment insurance taxable?",
        a: "Yes, federal unemployment benefits are considered taxable income. You can choose to have federal taxes withheld from your payments to avoid a surprise bill at tax time.",
      },
      {
        q: "What if I was fired — can I still get unemployment?",
        a: "It depends on the reason. If you were fired for misconduct you can be disqualified. If you were laid off or fired for performance reasons (not intentional misconduct), you generally qualify. Each state makes its own determination.",
      },
    ],
    relatedSituations: ["gig-workers", "single-parents", "veterans"],
  },
  {
    slug: "people-with-disabilities",
    title: "Benefits for People with Disabilities",
    hero: "Support systems exist. Finding them shouldn't require a full-time job.",
    description:
      "People living with disabilities — physical, cognitive, or otherwise — are among the most underserved when it comes to benefits access. Multiple overlapping programs can provide income, healthcare, housing, and more.",
    programs: [
      {
        name: "SSI",
        slug: "ssi",
        summary:
          "Monthly cash for individuals with limited income who have a qualifying disability.",
        eligibilityHint:
          "Must meet SSA's disability definition; income and resource limits apply.",
      },
      {
        name: "SSDI",
        slug: "ssdi",
        summary:
          "Disability income based on your work history and Social Security credits.",
        eligibilityHint:
          "Must have worked enough quarters; disability must prevent substantial work.",
      },
      {
        name: "Medicaid",
        slug: "medicaid",
        summary: "Free health coverage often automatically paired with SSI.",
        eligibilityHint:
          "SSI recipients are often auto-enrolled; others apply separately.",
      },
      {
        name: "Medicare",
        slug: "medicare",
        summary:
          "Available after 24 months on SSDI — covers hospital, medical, and prescriptions.",
        eligibilityHint:
          "Automatically enrolled after 24 months of SSDI receipt.",
      },
      {
        name: "Section 8 (HCV)",
        slug: "section-8",
        summary:
          "Rental assistance; people with disabilities receive preference on many waiting lists.",
        eligibilityHint:
          "Disability preference often available; income at or below 50% AMI.",
      },
      {
        name: "SNAP",
        slug: "snap",
        summary:
          "Disability exempts households from many standard SNAP rules and work requirements.",
        eligibilityHint:
          "Households with disabled members skip gross income test; net income used.",
      },
      {
        name: "ABLE Accounts",
        slug: "able-accounts",
        summary:
          "Tax-advantaged savings accounts that don't affect SSI or Medicaid eligibility.",
        eligibilityHint:
          "Disability onset before age 26; annual contribution limits apply.",
      },
    ],
    faqs: [
      {
        q: "What's the difference between SSI and SSDI?",
        a: "SSI (Supplemental Security Income) is need-based — it's for people with limited income and resources regardless of work history. SSDI (Social Security Disability Insurance) is based on your work history and the Social Security taxes you've paid. You can receive both if you qualify.",
      },
      {
        q: "How long does it take to get approved for disability?",
        a: "Initial decisions typically take 3–6 months. Denials are common and appeals can take 1–2 years. Working with a disability attorney (who typically only gets paid if you win) is often worth it.",
      },
      {
        q: "Does getting disability benefits affect my family members?",
        a: "SSDI has auxiliary benefits available to your spouse and children. SSI does not extend to family members. Getting disability benefits does not disqualify your spouse or children from their own benefits.",
      },
    ],
    relatedSituations: ["seniors", "veterans", "recently-unemployed"],
  },
];

export function getSituation(slug: string): Situation | undefined {
  return situations.find((s) => s.slug === slug);
}

export function getAllSituationSlugs(): string[] {
  return situations.map((s) => s.slug);
}
