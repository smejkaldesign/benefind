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
  /** Path relative to /public, e.g. /blog/covers/my-post.svg */
  heroImage?: string;
  /** Primary SEO keyword cluster for the post. */
  keyword?: string;
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
    title: "What Government Benefits Do I Qualify For? A 2026 Guide",
    description:
      "The fastest way to find out which federal and state benefit programs you qualify for in 2026 — without filling out 80 separate applications.",
    date: "2026-04-09",
    author: "Benefind Team",
    tags: ["Government Benefits", "Eligibility", "Guide"],
    published: true,
    heroImage: "/blog/covers/what-government-benefits-do-i-qualify-for.svg",
    keyword: "government benefits I qualify for",
  },
  {
    slug: "snap-eligibility-2026",
    title:
      "SNAP Eligibility 2026: Income Limits, Work Requirements, How to Apply",
    description:
      "Everything you need to know about SNAP (food stamps) eligibility in 2026 — income limits, household rules, work requirements, and the exact application steps by state.",
    date: "2026-04-09",
    author: "Benefind Team",
    tags: ["SNAP", "Food Assistance", "Eligibility", "Government Benefits"],
    published: true,
    heroImage: "/blog/covers/snap-eligibility-2026.svg",
    keyword: "snap eligibility 2026",
  },
  {
    slug: "rd-tax-credit-small-business-2026",
    title: "R&D Tax Credit for Small Businesses: A Complete 2026 Guide",
    description:
      "The R&D Tax Credit can cut your federal tax bill by tens of thousands — even if you're a pre-revenue startup. Here's how to qualify and claim it in 2026.",
    date: "2026-04-09",
    author: "Benefind Team",
    tags: [
      "R&D Tax Credit",
      "Small Business",
      "Government Benefits",
      "Startup",
    ],
    published: true,
    heroImage: "/blog/covers/rd-tax-credit-small-business-2026.svg",
    keyword: "R&D tax credit small business",
  },
  {
    slug: "how-to-apply-for-liheap-heating-assistance",
    title: "How to Apply for LIHEAP Heating Assistance (Step-by-Step)",
    description:
      "LIHEAP helps millions of households pay their heating bills every winter. Here is exactly how to apply, what documents you need, and how long it takes.",
    date: "2026-04-09",
    author: "Benefind Team",
    tags: ["LIHEAP", "Energy Assistance", "Government Benefits", "How To"],
    published: true,
    heroImage: "/blog/covers/how-to-apply-for-liheap-heating-assistance.svg",
    keyword: "how to apply for LIHEAP",
  },
  {
    slug: "free-government-grants-single-mothers",
    title: "Free Government Grants for Single Mothers: What's Real, What's Not",
    description:
      "Cash 'grants' for single moms are mostly a scam. But real federal and state programs can cover rent, food, child care, and college. Here's what actually exists.",
    date: "2026-04-09",
    author: "Benefind Team",
    tags: ["Single Mothers", "Government Benefits", "Grants", "Family"],
    published: true,
    heroImage: "/blog/covers/free-government-grants-single-mothers.svg",
    keyword: "free government grants for single mothers",
  },
];

/** Read MDX file and count words to estimate reading time. */
function getWordCount(slug: string): number {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require("fs");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require("path");
    const filePath = path.join(
      process.cwd(),
      "src",
      "content",
      "blog",
      `${slug}.mdx`,
    );
    const content = fs.readFileSync(filePath, "utf-8") as string;
    const stripped = content
      .replace(/```[\s\S]*?```/g, "")
      .replace(/^import\s.*$/gm, "")
      .replace(/<[^>]+>/g, "")
      .replace(/[#*`\-_>|]/g, "");
    return stripped.split(/\s+/).filter(Boolean).length;
  } catch {
    return 0;
  }
}

export function getAllPosts(): BlogPostWithMeta[] {
  return posts
    .filter((p) => p.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map((p) => ({
      ...p,
      readingTime: estimateReadingTime(getWordCount(p.slug)),
    }));
}

export function getPost(slug: string): BlogPostWithMeta | undefined {
  const post = posts.find((p) => p.slug === slug && p.published);
  if (!post) return undefined;
  return {
    ...post,
    readingTime: estimateReadingTime(getWordCount(post.slug)),
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
