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
    heroImage: "/blog/covers/what-government-benefits-do-i-qualify-for.jpg",
    keyword: "government benefits I qualify for",
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
    heroImage: "/blog/covers/snap-eligibility-2026.jpg",
    keyword: "snap eligibility 2026",
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
    heroImage: "/blog/covers/rd-tax-credit-small-business-2026.jpg",
    keyword: "R&D tax credit small business",
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
    heroImage: "/blog/covers/how-to-apply-for-liheap-heating-assistance.jpg",
    keyword: "how to apply for LIHEAP",
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
    heroImage: "/blog/covers/free-government-grants-single-mothers.jpg",
    keyword: "free government grants for single mothers",
  },
];

import { getPostWordCount } from "./blog-toc";

export function getAllPosts(): BlogPostWithMeta[] {
  return posts
    .filter((p) => p.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map((p) => ({
      ...p,
      readingTime: estimateReadingTime(getPostWordCount(p.slug)),
    }));
}

export function getPost(slug: string): BlogPostWithMeta | undefined {
  const post = posts.find((p) => p.slug === slug && p.published);
  if (!post) return undefined;
  return {
    ...post,
    readingTime: estimateReadingTime(getPostWordCount(post.slug)),
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
