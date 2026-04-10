/**
 * Hero Image Generation — Prompt Templates & Configuration
 *
 * Ported from celune-web/apps/site/scripts/hero-image-config.ts and re-themed
 * for Benefind's lilac/lavender brand on warm parchment-dark surfaces.
 *
 * Abstract watercolor-style images branded to Benefind:
 * - Warm dark backgrounds (#121212 to #2a2b25)
 * - Lilac / lavender accents (#cab1f7, #deb0f7, #b19eef)
 * - Watercolor textures, organic forms, no text
 */

export const IMAGE_CONFIG = {
  /** Replicate model identifier */
  model: "black-forest-labs/flux-1.1-pro" as const,

  /** Output dimensions — 16:9 for hero display, also works for OG cards after crop */
  width: 1440,
  height: 810,

  /** JPEG compression quality for final output */
  jpegQuality: 85,

  /** Max file size target in bytes (200KB) */
  maxFileSize: 200 * 1024,

  /** Output directory relative to project root */
  outputDir: "public/blog/covers",
};

interface PromptVariation {
  colorEmphasis: string;
  shapes: string;
  texture: string;
  mood: string;
}

const VARIATIONS: PromptVariation[] = [
  {
    colorEmphasis: "soft lilac and pale lavender",
    shapes: "flowing organic ribbons and gentle curves",
    texture: "soft wet-on-wet watercolor washes with bleeding edges",
    mood: "calm and contemplative",
  },
  {
    colorEmphasis: "dusty violet and warm plum",
    shapes: "layered circular forms and soft halos",
    texture: "granulated watercolor with visible paper grain",
    mood: "mysterious and elegant",
  },
  {
    colorEmphasis: "bright lilac with hints of warm amber",
    shapes: "scattered droplets and splatter patterns",
    texture: "wet watercolor splashes on dark parchment surface",
    mood: "energetic and dynamic",
  },
  {
    colorEmphasis: "muted mauve and pale orchid",
    shapes: "horizontal bands and atmospheric layers",
    texture: "diffused watercolor gradients blending into shadow",
    mood: "serene and expansive",
  },
  {
    colorEmphasis: "rich periwinkle and cool lavender mist",
    shapes: "branching tree-like fractals and veins",
    texture: "ink-in-water diffusion with fine tendrils",
    mood: "intricate and organic",
  },
];

const SLUG_VARIATION_MAP: Record<string, number> = {
  "what-government-benefits-do-i-qualify-for": 0,
  "snap-eligibility-2026": 3,
  "rd-tax-credit-small-business-2026": 1,
  "how-to-apply-for-liheap-heating-assistance": 2,
  "free-government-grants-single-mothers": 4,
};

function slugToIndex(slug: string): number {
  if (slug in SLUG_VARIATION_MAP) return SLUG_VARIATION_MAP[slug];
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) % VARIATIONS.length;
}

/** Build the full generation prompt for a blog post. */
export function buildPrompt(slug: string): string {
  const v = VARIATIONS[slugToIndex(slug)];

  return [
    `Abstract watercolor painting on a very dark warm background (#121212).`,
    `Color palette: ${v.colorEmphasis}, with the colors appearing luminous against the dark ground.`,
    `Composition: ${v.shapes}, arranged with generous negative space.`,
    `Texture: ${v.texture}.`,
    `Mood: ${v.mood}.`,
    `The painting should feel like a premium gallery piece — minimal, refined, and striking.`,
    `No text, no letters, no words, no symbols, no logos, no recognizable objects.`,
    `Pure abstract expressionist watercolor art. High resolution, photographic capture of the painting.`,
  ].join(" ");
}

/** Get the variation palette (for SVG placeholder fallback). */
export function getVariation(slug: string): PromptVariation {
  return VARIATIONS[slugToIndex(slug)];
}

/** Get all blog slugs that need hero images generated. */
export function getAllSlugs(): string[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { posts } = require("../src/lib/blog") as {
    posts: { slug: string; published: boolean; heroImage?: string }[];
  };
  return posts.filter((p) => p.published && p.heroImage).map((p) => p.slug);
}
