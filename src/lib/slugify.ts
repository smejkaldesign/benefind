/**
 * Convert heading text to a URL-friendly slug.
 * Shared by blog MDX heading IDs (mdx-components.tsx) and the TOC extractor.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
