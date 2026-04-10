#!/usr/bin/env node
/**
 * Generate SVG placeholder cover images for blog posts.
 *
 * This is the overnight fallback for when REPLICATE_API_TOKEN isn't configured.
 * Each cover uses layered radial gradients + noise to approximate the watercolor
 * style from scripts/hero-image-config.ts. Swap these out with real generated
 * images once Replicate access lands.
 *
 * Usage:
 *   node scripts/generate-placeholder-covers.mjs
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const OUTPUT_DIR = path.join(PROJECT_ROOT, "public", "blog", "covers");

// Five hand-tuned palettes, one per launch post.
// Deep warm background, luminous lilac/lavender accents.
const POSTS = [
  {
    slug: "what-government-benefits-do-i-qualify-for",
    colors: {
      bg0: "#121212",
      bg1: "#1a1625",
      glow1: "#cab1f7",
      glow2: "#deb0f7",
      accent: "#b19eef",
    },
    shapes: "ribbons",
  },
  {
    slug: "snap-eligibility-2026",
    colors: {
      bg0: "#121212",
      bg1: "#1c1a22",
      glow1: "#d4b9f2",
      glow2: "#b19eef",
      accent: "#e2c8f5",
    },
    shapes: "bands",
  },
  {
    slug: "rd-tax-credit-small-business-2026",
    colors: {
      bg0: "#0f0f14",
      bg1: "#1e1a2a",
      glow1: "#b89df0",
      glow2: "#cab1f7",
      accent: "#9d85d4",
    },
    shapes: "halos",
  },
  {
    slug: "how-to-apply-for-liheap-heating-assistance",
    colors: {
      bg0: "#131018",
      bg1: "#241c2a",
      glow1: "#e8c8f5",
      glow2: "#f0b8e5",
      accent: "#deb0f7",
    },
    shapes: "droplets",
  },
  {
    slug: "free-government-grants-single-mothers",
    colors: {
      bg0: "#110e16",
      bg1: "#1a1522",
      glow1: "#c9b5ee",
      glow2: "#a892e0",
      accent: "#cab1f7",
    },
    shapes: "fractals",
  },
  {
    slug: "medicaid-expansion-state-by-state-2026",
    colors: {
      bg0: "#11121a",
      bg1: "#1c1a2e",
      glow1: "#b9a5f4",
      glow2: "#d2b4f5",
      accent: "#a085e3",
    },
    shapes: "bands",
  },
  {
    slug: "sbir-vs-sttr-which-grant-fits-your-startup",
    colors: {
      bg0: "#0e0f16",
      bg1: "#1b1a2a",
      glow1: "#c0a8f3",
      glow2: "#b89df0",
      accent: "#9d85d4",
    },
    shapes: "halos",
  },
  {
    slug: "childcare-assistance-programs-you-havent-heard-of",
    colors: {
      bg0: "#131019",
      bg1: "#221c2e",
      glow1: "#ecc5f3",
      glow2: "#e3b8f5",
      accent: "#cab1f7",
    },
    shapes: "droplets",
  },
  {
    slug: "wic-eligibility-myths-debunked",
    colors: {
      bg0: "#0f1218",
      bg1: "#1a1a28",
      glow1: "#d4bff5",
      glow2: "#b6a0ec",
      accent: "#deb0f7",
    },
    shapes: "ribbons",
  },
  {
    slug: "how-to-read-your-benefits-award-letter",
    colors: {
      bg0: "#100e17",
      bg1: "#1a1624",
      glow1: "#c1abf2",
      glow2: "#a892e0",
      accent: "#b89df0",
    },
    shapes: "fractals",
  },
];

const WIDTH = 1440;
const HEIGHT = 810;

function buildSvg({ colors, shapes }) {
  const { bg0, bg1, glow1, glow2, accent } = colors;

  // Deterministic pseudo-random blobs based on palette string
  const seed = Array.from(bg0 + bg1 + glow1).reduce(
    (a, c) => a + c.charCodeAt(0),
    0,
  );
  const rand = (i) => {
    const x = Math.sin(seed + i * 9999) * 10000;
    return x - Math.floor(x);
  };

  const blobs = [];
  const blobCount = shapes === "fractals" ? 14 : shapes === "droplets" ? 18 : 8;
  for (let i = 0; i < blobCount; i++) {
    const cx = rand(i * 3) * WIDTH;
    const cy = rand(i * 3 + 1) * HEIGHT;
    const r = 80 + rand(i * 3 + 2) * 280;
    const fill = i % 3 === 0 ? glow1 : i % 3 === 1 ? glow2 : accent;
    const opacity = 0.12 + rand(i * 5) * 0.22;
    blobs.push(
      `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(1)}" fill="url(#blob${i % 3})" opacity="${opacity.toFixed(2)}"/>`,
    );
  }

  // Signature diagonal wash
  const signatureShape =
    shapes === "bands"
      ? `<rect x="-100" y="${HEIGHT * 0.35}" width="${WIDTH + 200}" height="${HEIGHT * 0.18}" fill="url(#band)" opacity="0.35"/>`
      : shapes === "halos"
        ? `<circle cx="${WIDTH * 0.68}" cy="${HEIGHT * 0.48}" r="${HEIGHT * 0.42}" fill="none" stroke="url(#halo)" stroke-width="2" opacity="0.4"/>
           <circle cx="${WIDTH * 0.68}" cy="${HEIGHT * 0.48}" r="${HEIGHT * 0.32}" fill="none" stroke="url(#halo)" stroke-width="1.5" opacity="0.3"/>
           <circle cx="${WIDTH * 0.68}" cy="${HEIGHT * 0.48}" r="${HEIGHT * 0.22}" fill="none" stroke="url(#halo)" stroke-width="1" opacity="0.2"/>`
        : "";

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" width="${WIDTH}" height="${HEIGHT}" role="img">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bg0}"/>
      <stop offset="100%" stop-color="${bg1}"/>
    </linearGradient>
    <radialGradient id="blob0" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${glow1}" stop-opacity="0.9"/>
      <stop offset="70%" stop-color="${glow1}" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="${glow1}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="blob1" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${glow2}" stop-opacity="0.85"/>
      <stop offset="65%" stop-color="${glow2}" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="${glow2}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="blob2" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.75"/>
      <stop offset="60%" stop-color="${accent}" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="band" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${glow1}" stop-opacity="0"/>
      <stop offset="50%" stop-color="${glow1}" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="${glow2}" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="halo" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${glow1}"/>
      <stop offset="100%" stop-color="${accent}"/>
    </linearGradient>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="${seed % 100}"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.06 0"/>
      <feComposite in2="SourceGraphic" operator="in"/>
    </filter>
    <filter id="blur">
      <feGaussianBlur stdDeviation="18"/>
    </filter>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <g filter="url(#blur)">
    ${blobs.join("\n    ")}
  </g>
  ${signatureShape}
  <rect width="${WIDTH}" height="${HEIGHT}" filter="url(#grain)"/>
  <!-- Subtle vignette -->
  <radialGradient id="vignette" cx="50%" cy="50%" r="75%">
    <stop offset="60%" stop-color="#000000" stop-opacity="0"/>
    <stop offset="100%" stop-color="#000000" stop-opacity="0.55"/>
  </radialGradient>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#vignette)"/>
</svg>`;
}

function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  let count = 0;
  for (const post of POSTS) {
    const svg = buildSvg(post);
    const outPath = path.join(OUTPUT_DIR, `${post.slug}.svg`);
    fs.writeFileSync(outPath, svg);
    console.log(`  wrote ${path.relative(PROJECT_ROOT, outPath)}`);
    count++;
  }
  console.log(
    `\nGenerated ${count} placeholder cover(s) in public/blog/covers/`,
  );
}

main();
