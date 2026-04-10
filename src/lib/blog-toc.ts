import fs from "node:fs";
import path from "node:path";
import { slugify } from "./slugify";

export interface TOCItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface FAQItem {
  question: string;
  answer: string;
}

/** In-memory cache of MDX source by slug, avoids re-reading per TOC/FAQ/word-count call. */
const mdxCache = new Map<string, string>();

/** Read an MDX file once per request cycle; cached in-memory. */
export function readMdx(slug: string): string | null {
  const cached = mdxCache.get(slug);
  if (cached !== undefined) return cached;
  try {
    const filePath = path.join(
      process.cwd(),
      "src",
      "content",
      "blog",
      `${slug}.mdx`,
    );
    const content = fs.readFileSync(filePath, "utf-8");
    mdxCache.set(slug, content);
    return content;
  } catch {
    return null;
  }
}

/** Strip MDX code fences to avoid matching headings inside them. */
function stripCodeBlocks(src: string): string {
  return src.replace(/```[\s\S]*?```/g, "");
}

/**
 * Extract table-of-contents headings from an MDX file.
 * Parses h2/h3 markdown headings from the raw source.
 * Server-only (reads from disk).
 */
export function extractTOC(slug: string): TOCItem[] {
  const content = readMdx(slug);
  if (!content) return [];
  const stripped = stripCodeBlocks(content);
  const items: TOCItem[] = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(stripped)) !== null) {
    const level = match[1].length as 2 | 3;
    const text = match[2].trim();
    items.push({ id: slugify(text), text, level });
  }
  return items;
}

/**
 * Extract FAQ items from the "Frequently asked questions" h2 section.
 * Treats every h3 under that section as a question and the following
 * paragraphs (until the next h3 or h2) as the answer.
 * Returns [] if no FAQ section is found.
 */
export function extractFAQ(slug: string): FAQItem[] {
  const content = readMdx(slug);
  if (!content) return [];
  const stripped = stripCodeBlocks(content);

  // Find the FAQ section by locating the h2 header and slicing to the next h2.
  const faqHeaderRegex = /^##\s+Frequently asked questions\s*$/m;
  const headerMatch = faqHeaderRegex.exec(stripped);
  if (!headerMatch) return [];

  const sectionStart = headerMatch.index + headerMatch[0].length;
  const afterHeader = stripped.slice(sectionStart);
  // Find the next top-level (##) heading to bound the section.
  const nextH2 = afterHeader.search(/^##\s+/m);
  const section = nextH2 === -1 ? afterHeader : afterHeader.slice(0, nextH2);
  const items: FAQItem[] = [];

  // Split on h3 boundaries
  const parts = section.split(/^###\s+/m).slice(1);
  for (const part of parts) {
    const [firstLine, ...rest] = part.split("\n");
    const question = firstLine.trim();
    const answerRaw = rest.join("\n").trim();
    if (!question || !answerRaw) continue;
    // Strip trailing/leading markdown artifacts for plain-text schema output
    const answer = answerRaw
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/`([^`]+)`/g, "$1")
      .trim();
    items.push({ question, answer });
  }
  return items;
}

/** Estimate word count of an MDX post (server-only). */
export function getPostWordCount(slug: string): number {
  const content = readMdx(slug);
  if (!content) return 0;
  const stripped = content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/^import\s.*$/gm, "")
    .replace(/<[^>]+>/g, "")
    .replace(/[#*`\-_>|]/g, "");
  return stripped.split(/\s+/).filter(Boolean).length;
}
