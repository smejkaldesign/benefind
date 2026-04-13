/**
 * Blog registry and helpers.
 *
 * Structure mirrors celune-web/apps/site: a typed registry of published posts,
 * reading-time estimated from the MDX word count, and a TOC extractor that
 * parses h2/h3 headings out of the raw MDX source.
 *
 * MDX files live at src/content/blog/{slug}.mdx and are dynamically imported
 * by the [slug] route at request time.
 */

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  /** ISO date string: YYYY-MM-DD */
  date: string;
  author: string;
  tags: string[];
  published: boolean;
  /** Path relative to /public, e.g. /blog/covers/my-post.jpg */
  heroImage?: string;
  /** Primary SEO keyword cluster for the post. */
  keyword?: string;
  /** ISO date string for last modification. Defaults to `date` if omitted. */
  lastModified?: string;
}

export interface BlogPostWithMeta extends BlogPost {
  readingTime: number;
}

/** Estimate reading time in minutes from word count (200 WPM). */
export function estimateReadingTime(wordCount: number): number {
  return Math.max(1, Math.ceil(wordCount / 200));
}

export const posts: BlogPost[] = [
  {
    slug: "what-government-benefits-do-i-qualify-for",
    title: "Government Benefits You Qualify For in 2026",
    description:
      "Find out in minutes which federal and state benefit programs you qualify for in 2026, without filling out 80 separate applications.",
    date: "2026-04-09",
    author: "Benefind Team",
    tags: ["Government Benefits", "Eligibility", "Guide"],
    published: true,
    keyword: "government benefits I qualify for",
    lastModified: "2026-04-09",
  },
  {
    slug: "snap-eligibility-2026",
    title: "SNAP Eligibility 2026: Rules and How to Apply",
    description:
      "SNAP eligibility in 2026: income limits, household rules, work requirements, and the exact state-by-state application steps for food stamps.",
    date: "2026-04-09",
    author: "Benefind Team",
    tags: ["SNAP", "Food Assistance", "Eligibility", "Government Benefits"],
    published: true,
    keyword: "snap eligibility 2026",
    lastModified: "2026-04-09",
  },
  {
    slug: "rd-tax-credit-small-business-2026",
    title: "R&D Tax Credit for Small Business: 2026 Guide",
    description:
      "The R&D Tax Credit can cut your federal tax bill by tens of thousands, even for pre-revenue startups. How to qualify and claim it in 2026.",
    date: "2026-04-09",
    author: "Benefind Team",
    tags: [
      "R&D Tax Credit",
      "Small Business",
      "Government Benefits",
      "Startup",
    ],
    published: true,
    keyword: "R&D tax credit small business",
    lastModified: "2026-04-09",
  },
  {
    slug: "how-to-apply-for-liheap-heating-assistance",
    title: "How to Apply for LIHEAP Heating Assistance",
    description:
      "LIHEAP helps millions of households pay heating bills every winter. Exactly how to apply, what documents you need, and how long it takes.",
    date: "2026-04-09",
    author: "Benefind Team",
    tags: ["LIHEAP", "Energy Assistance", "Government Benefits", "How To"],
    published: true,
    keyword: "how to apply for LIHEAP",
    lastModified: "2026-04-09",
  },
  {
    slug: "free-government-grants-single-mothers",
    title: "Government Grants for Single Mothers in 2026",
    description:
      "Most 'free cash grants' for single moms are scams. The real federal and state programs that cover rent, food, child care, and college.",
    date: "2026-04-09",
    author: "Benefind Team",
    tags: ["Single Mothers", "Government Benefits", "Grants", "Family"],
    published: true,
    keyword: "free government grants for single mothers",
    lastModified: "2026-04-09",
  },

  // ── Consumer program guides (2026-04-12) ──────────────────────────
  {
    slug: "medicaid-eligibility-2026",
    title: "Medicaid Eligibility 2026: Income Limits, Coverage & How to Apply",
    description:
      "2026 Medicaid income limits by state, who qualifies under expansion, what's covered, and how to apply online or in person.",
    date: "2026-04-12",
    author: "Benefind Team",
    tags: ["Medicaid", "Healthcare", "Eligibility", "Government Benefits"],
    published: true,
    keyword: "medicaid eligibility 2026",
    lastModified: "2026-04-12",
  },
  {
    slug: "section-8-eligibility-2026",
    title:
      "Section 8 Housing Eligibility 2026: Income Limits, Waitlists & How to Apply",
    description:
      "Section 8 income limits, how waitlists work, tips for getting on multiple lists, and what happens after you're approved.",
    date: "2026-04-12",
    author: "Benefind Team",
    tags: ["Section 8", "Housing", "Eligibility", "Government Benefits"],
    published: true,
    keyword: "section 8 eligibility 2026",
    lastModified: "2026-04-12",
  },
  {
    slug: "ssi-eligibility-2026",
    title: "SSI Benefits 2026: Eligibility, Payment Amounts & How to Apply",
    description:
      "SSI payment amounts, income and asset limits, who qualifies for Supplemental Security Income, and how to file your application.",
    date: "2026-04-12",
    author: "Benefind Team",
    tags: ["SSI", "Disability", "Eligibility", "Government Benefits"],
    published: true,
    keyword: "ssi eligibility 2026",
    lastModified: "2026-04-12",
  },
  {
    slug: "eitc-eligibility-2026",
    title: "Earned Income Tax Credit 2026: Amounts, Eligibility & How to Claim",
    description:
      "EITC income thresholds, credit amounts by filing status, and step-by-step instructions to claim the Earned Income Tax Credit.",
    date: "2026-04-12",
    author: "Benefind Team",
    tags: ["EITC", "Tax Credit", "Eligibility", "Government Benefits"],
    published: true,
    keyword: "earned income credit 2026",
    lastModified: "2026-04-12",
  },
  {
    slug: "pell-grant-eligibility-2026",
    title: "Pell Grant 2026-2027: Eligibility, Amounts & FAFSA Guide",
    description:
      "Maximum Pell Grant amounts, EFC cutoffs, FAFSA deadlines, and how to maximize your award for the 2026-2027 school year.",
    date: "2026-04-12",
    author: "Benefind Team",
    tags: ["Pell Grant", "Education", "FAFSA", "Government Benefits"],
    published: true,
    keyword: "pell grant eligibility 2026",
    lastModified: "2026-04-12",
  },
  {
    slug: "chip-eligibility-2026",
    title: "CHIP 2026: Free & Low-Cost Health Insurance for Children",
    description:
      "CHIP income limits, what's covered for kids, how it differs from Medicaid, and how to enroll your child in every state.",
    date: "2026-04-12",
    author: "Benefind Team",
    tags: ["CHIP", "Healthcare", "Children", "Government Benefits"],
    published: true,
    keyword: "chip insurance eligibility",
    lastModified: "2026-04-12",
  },
  {
    slug: "wic-eligibility-2026",
    title: "WIC Eligibility 2026: Income Limits, Benefits & How to Enroll",
    description:
      "WIC income guidelines, food packages, how to find your local WIC office, and same-day enrollment tips for pregnant women and families.",
    date: "2026-04-12",
    author: "Benefind Team",
    tags: ["WIC", "Food Assistance", "Family", "Government Benefits"],
    published: true,
    keyword: "wic eligibility 2026",
    lastModified: "2026-04-12",
  },

  // ── Business program guides (2026-04-12) ──────────────────────────
  {
    slug: "wotc-tax-credit-2026",
    title:
      "Work Opportunity Tax Credit (WOTC) 2026: Hiring Credits for Employers",
    description:
      "WOTC target groups, credit amounts per hire, certification steps, and how to claim the Work Opportunity Tax Credit on your return.",
    date: "2026-04-12",
    author: "Benefind Team",
    tags: ["WOTC", "Tax Credit", "Small Business", "Hiring"],
    published: true,
    keyword: "wotc tax credit 2026",
    lastModified: "2026-04-12",
  },
  {
    slug: "sbir-sttr-grants-2026",
    title:
      "SBIR/STTR Grants 2026: How to Win Small Business Innovation Funding",
    description:
      "Phase I/II/III structure, agency budgets, proposal tips, and timelines for winning SBIR and STTR innovation grants.",
    date: "2026-04-12",
    author: "Benefind Team",
    tags: ["SBIR", "STTR", "Grants", "Small Business"],
    published: true,
    keyword: "sbir grants 2026",
    lastModified: "2026-04-12",
  },
  {
    slug: "sba-8a-program-2026",
    title: "SBA 8(a) Business Development Program: Eligibility & How to Apply",
    description:
      "SBA 8(a) eligibility criteria, application process, sole-source contract benefits, and how to maximize the nine-year program term.",
    date: "2026-04-12",
    author: "Benefind Team",
    tags: ["SBA", "8(a)", "Small Business", "Government Benefits"],
    published: true,
    keyword: "sba 8(a) program eligibility",
    lastModified: "2026-04-12",
  },
  {
    slug: "clean-energy-itc-2026",
    title:
      "Clean Energy Investment Tax Credit 2026: Section 48 Guide for Businesses",
    description:
      "Section 48 ITC rates, bonus adders for domestic content and energy communities, eligible technologies, and how to claim the credit.",
    date: "2026-04-12",
    author: "Benefind Team",
    tags: ["Clean Energy", "ITC", "Tax Credit", "Small Business"],
    published: true,
    keyword: "clean energy tax credit 2026",
    lastModified: "2026-04-12",
  },
  {
    slug: "opportunity-zones-2026",
    title:
      "Opportunity Zone Tax Benefits 2026: Capital Gains Deferral & Investment Guide",
    description:
      "How Opportunity Zones defer and reduce capital gains taxes, qualified fund requirements, and key deadlines investors need to know.",
    date: "2026-04-12",
    author: "Benefind Team",
    tags: ["Opportunity Zones", "Tax Benefits", "Investment", "Small Business"],
    published: true,
    keyword: "opportunity zone tax benefits",
    lastModified: "2026-04-12",
  },
  {
    slug: "step-export-grants-2026",
    title:
      "STEP Export Grants for Small Business: Fund Your International Expansion",
    description:
      "How to apply for STEP grants, eligible export activities, award amounts by state, and tips for first-time exporters.",
    date: "2026-04-12",
    author: "Benefind Team",
    tags: ["STEP", "Export", "Grants", "Small Business"],
    published: true,
    keyword: "step export grants",
    lastModified: "2026-04-12",
  },
  {
    slug: "usda-rural-business-grants-2026",
    title:
      "USDA Rural Business Development Grants 2026: Eligibility & How to Apply",
    description:
      "USDA RBDG eligibility, grant amounts, rural area definitions, and application steps for small businesses and nonprofits.",
    date: "2026-04-12",
    author: "Benefind Team",
    tags: ["USDA", "Rural", "Grants", "Small Business"],
    published: true,
    keyword: "usda rural business grants",
    lastModified: "2026-04-12",
  },
  {
    slug: "state-workforce-training-grants-2026",
    title:
      "State Workforce Training Grants 2026: Employee Training Incentives by State",
    description:
      "State-by-state workforce training grants, reimbursement rates, eligible training types, and how to apply for employee development funds.",
    date: "2026-04-12",
    author: "Benefind Team",
    tags: ["Workforce Training", "State Programs", "Small Business", "Grants"],
    published: true,
    keyword: "state workforce training grants",
    lastModified: "2026-04-12",
  },

  // ── Supporting posts (2026-04-12) ─────────────────────────────────
  {
    slug: "small-business-grants-2026",
    title:
      "Small Business Grants 2026: Federal and State Programs You Can Actually Get",
    description:
      "Curated list of federal and state small business grants with real eligibility requirements, award sizes, and application links.",
    date: "2026-04-12",
    author: "Benefind Team",
    tags: ["Small Business", "Grants", "Government Benefits", "Guide"],
    published: true,
    keyword: "small business grants 2026",
    lastModified: "2026-04-12",
  },
  {
    slug: "government-benefits-for-veterans-2026",
    title: "Government Benefits for Veterans in 2026",
    description:
      "VA healthcare, disability compensation, education benefits, home loans, and other federal programs available to veterans in 2026.",
    date: "2026-04-12",
    author: "Benefind Team",
    tags: ["Veterans", "Government Benefits", "Guide"],
    published: true,
    keyword: "government benefits for veterans",
    lastModified: "2026-04-12",
  },
  {
    slug: "snap-benefits-college-students-2026",
    title: "SNAP Benefits for College Students 2026: Do You Qualify?",
    description:
      "SNAP exemptions for college students, work-study rules, state waivers, and how to apply if you're enrolled in higher education.",
    date: "2026-04-12",
    author: "Benefind Team",
    tags: ["SNAP", "College Students", "Food Assistance", "Eligibility"],
    published: true,
    keyword: "snap benefits college students",
    lastModified: "2026-04-12",
  },
  {
    slug: "medicaid-vs-medicare-2026",
    title: "Medicaid vs Medicare: What's the Difference in 2026?",
    description:
      "Side-by-side comparison of Medicaid and Medicare eligibility, coverage, costs, and how to know which program is right for you.",
    date: "2026-04-12",
    author: "Benefind Team",
    tags: ["Medicaid", "Medicare", "Healthcare", "Comparison"],
    published: true,
    keyword: "medicaid vs medicare",
    lastModified: "2026-04-12",
  },

  // ── AFK blog batch (2026-04-12) ──────────────────────────────────
  {
    slug: "how-to-appeal-ssi-denial-2026",
    title: "How to Appeal a Denied SSI Claim in 2026",
    description:
      "The 4 levels of SSI appeal, timelines, success rates, and when to get a disability lawyer.",
    date: "2026-04-12",
    author: "Benefind Team",
    tags: ["SSI", "Disability", "Appeals", "How To"],
    published: true,
    keyword: "how to appeal SSI denial",
    lastModified: "2026-04-12",
  },
  {
    slug: "snap-myths-debunked-2026",
    title: "10 SNAP Myths Debunked: What People Get Wrong About Food Stamps",
    description:
      "Common myths about SNAP benefits, from who qualifies to what you can buy, backed by data.",
    date: "2026-04-12",
    author: "Benefind Team",
    tags: ["SNAP", "Food Assistance", "Myths", "Guide"],
    published: true,
    keyword: "food stamps myths",
    lastModified: "2026-04-12",
  },
  {
    slug: "how-to-find-snap-office-2026",
    title: "How to Find Your Local SNAP Office in 2026",
    description:
      "Locate your nearest SNAP/DHHS office, what to bring, and how to apply in person or by phone.",
    date: "2026-04-12",
    author: "Benefind Team",
    tags: ["SNAP", "Food Assistance", "How To", "Local"],
    published: true,
    keyword: "find SNAP office near me",
    lastModified: "2026-04-12",
  },
  {
    slug: "how-to-apply-multiple-benefits-2026",
    title: "How to Apply for Multiple Government Benefits at Once",
    description:
      "Which programs share applications, the best order to apply, and how to manage multiple benefit applications.",
    date: "2026-04-12",
    author: "Benefind Team",
    tags: ["Government Benefits", "How To", "Guide", "Eligibility"],
    published: true,
    keyword: "apply for multiple government benefits",
    lastModified: "2026-04-12",
  },
  {
    slug: "benefits-for-seniors-over-65-2026",
    title: "Government Benefits for Seniors Over 65 in 2026",
    description:
      "Every federal and state benefit available to Americans over 65, from Medicare to SSI to senior SNAP deductions.",
    date: "2026-04-12",
    author: "Benefind Team",
    tags: ["Seniors", "Medicare", "SSI", "Government Benefits"],
    published: true,
    keyword: "government benefits for seniors over 65",
    lastModified: "2026-04-12",
  },
  {
    slug: "benefits-for-disabled-adults-2026",
    title: "Government Benefits for Disabled Adults in 2026",
    description:
      "SSI, SSDI, Medicaid, SNAP, Section 8, and state programs for adults with disabilities. Complete guide.",
    date: "2026-04-12",
    author: "Benefind Team",
    tags: ["Disability", "SSI", "SSDI", "Government Benefits"],
    published: true,
    keyword: "government benefits for disabled adults",
    lastModified: "2026-04-12",
  },
  {
    slug: "emergency-benefits-homeless-2026",
    title: "Emergency Benefits for Homeless Individuals in 2026",
    description:
      "Expedited SNAP, emergency Medicaid, shelter programs, and how to apply without an address or ID.",
    date: "2026-04-12",
    author: "Benefind Team",
    tags: ["Homeless", "Emergency", "SNAP", "Government Benefits"],
    published: true,
    keyword: "government benefits for homeless",
    lastModified: "2026-04-12",
  },
  {
    slug: "tax-credits-you-are-missing-2026",
    title: "5 Tax Credits You're Probably Missing in 2026",
    description:
      "EITC, Child Tax Credit, Saver's Credit, AOTC, and CDCC. Who qualifies, how much they're worth, and how to claim.",
    date: "2026-04-12",
    author: "Benefind Team",
    tags: ["Tax Credits", "EITC", "Guide", "Government Benefits"],
    published: true,
    keyword: "tax credits 2026",
    lastModified: "2026-04-12",
  },
  {
    slug: "help-paying-rent-2026",
    title: "How to Get Help Paying Rent in 2026",
    description:
      "Section 8, emergency rental assistance, HUD housing, and state programs to help cover rent.",
    date: "2026-04-12",
    author: "Benefind Team",
    tags: ["Housing", "Section 8", "Rent Assistance", "Government Benefits"],
    published: true,
    keyword: "help paying rent 2026",
    lastModified: "2026-04-12",
  },
  {
    slug: "lost-job-benefits-guide-2026",
    title: "Lost Your Job? Every Benefit You Can Get in 2026",
    description:
      "Unemployment insurance, COBRA vs Medicaid, expedited SNAP, rent help, and retraining programs after job loss.",
    date: "2026-04-12",
    author: "Benefind Team",
    tags: ["Unemployment", "Job Loss", "Government Benefits", "Guide"],
    published: true,
    keyword: "lost my job what benefits can I get",
    lastModified: "2026-04-12",
  },
];

/**
 * getPostWordCount is loaded lazily to avoid pulling node:fs into
 * edge-runtime bundles (e.g. opengraph-image.tsx imports `posts`).
 */
let _getPostWordCount: ((slug: string) => number) | null = null;
function wordCount(slug: string): number {
  if (!_getPostWordCount) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    _getPostWordCount = require("./blog-toc").getPostWordCount;
  }
  return _getPostWordCount!(slug);
}

export function getAllPosts(): BlogPostWithMeta[] {
  return posts
    .filter((p) => p.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map((p) => ({
      ...p,
      readingTime: estimateReadingTime(wordCount(p.slug)),
    }));
}

export function getPost(slug: string): BlogPostWithMeta | undefined {
  const post = posts.find((p) => p.slug === slug && p.published);
  if (!post) return undefined;
  return {
    ...post,
    readingTime: estimateReadingTime(wordCount(post.slug)),
  };
}

/** Return up to `limit` related posts by tag overlap (excluding the current post). */
export function getRelatedPosts(slug: string, limit = 3): BlogPostWithMeta[] {
  const current = getPost(slug);
  if (!current) return [];
  return getAllPosts()
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      post: p,
      score: p.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.post);
}

/** Format an ISO date string for display: "April 9, 2026" */
export function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
