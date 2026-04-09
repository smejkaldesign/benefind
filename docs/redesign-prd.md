# Benefind Website Redesign PRD

> Project 5cff8dab. Created 2026-04-08. Inspiration: Mobbin.com landing page.

## Problem Statement

Benefind's MVP landing page is functional but looks like an MVP. It has the right sections (hero, features, FAQ, marquee, impact stats) but lacks the visual polish that builds instant trust. For a product targeting vulnerable populations navigating government benefits, trust is everything. A clinical or amateur-looking site creates doubt. A polished, premium site says "this is legitimate, you can rely on this."

## Goals

1. **Mobbin-level visual polish**: Dark theme, generous whitespace, premium typography, smooth animations
2. **Section-by-section upgrade**: Preserve existing content structure, elevate every section's design quality
3. **Trust-first design**: Encryption badges, privacy language, zero-data-sale messaging front and center
4. **Conversion optimization**: Clear CTAs, compelling value prop, reduced friction to start screening
5. **Mobile-first**: 70%+ of the target audience will access via phone

## Non-Goals

- Changing the screening flow logic (already works)
- Adding new features or pages
- Changing the tech stack (Next.js 15 + Tailwind v4 stays)
- SEO overhaul (separate project)

## Current State

The landing page already has:
- Hero with CTA buttons
- Marquee scrolling for program names (SNAP, Medicaid, WIC, etc.)
- "How It Works" 3-step section
- Features grid (6 features)
- FAQ accordion
- Impact stats section
- Multi-language footer
- Framer Motion animations
- Dark-first design with CSS variable theme system

## Design Direction: Mobbin-Inspired

Reference: https://mobbin.com

### Section Mapping (Mobbin -> Benefind)

| # | Mobbin Section | Benefind Equivalent | Redesign Notes |
|---|---------------|---------------------|----------------|
| 1 | Hero: "Discover real-world design inspiration" + dual CTAs | Hero: "Find Every Benefit You Deserve" | Match Mobbin's headline weight, generous padding (80-120px), dual CTA (primary: "Start Screening", secondary: "See How It Works") |
| 2 | Animated logo marquee ("Trusted by") | Program icon marquee (already exists) | Upgrade: add program icons/logos, not just text. Animate smoothly like Mobbin's brand carousel |
| 3 | Large product preview screenshots | Chat UI + Results dashboard preview | Side-by-side mobile (chat) + desktop (results) screenshots, large with rounded corners and subtle shadow |
| 4 | Tabbed interactive demo | Interactive feature demo | Tabbed interface: "Chat Flow" / "Results" / "Documents" / "Languages" with live preview switching |
| 5 | Stats bar (1,150 apps, 611K screens) | Impact stats (families helped, benefits found, programs, states) | Animated counter, bold numbers, clean layout |
| 6 | Feature sections with rich visuals | "How It Works" + Features grid | Upgrade to Mobbin's alternating left/right layout with large visuals per feature |
| 7 | Testimonial carousel with avatars | User stories / social proof | Card-based testimonials with avatars, location badges (not company logos) |
| 8 | Trust section | Privacy + encryption | "Your Data Stays Yours": zero-knowledge encryption, no data sold, client-side only, with shield icons |
| 9 | Final CTA with brand logos | "Don't Leave Money on the Table" | Repeat program icons, strong CTA, estimated average benefit value |
| 10 | Footer | Multi-language footer | Clean footer with language selector, privacy policy, "Built by Smejkal Design" |

### Design Tokens (Mobbin-Derived)

- **Background**: Deep charcoal (#0A0A0F) or current dark theme, refined
- **Text**: White (#FFFFFF) for headings, muted gray (#A0A0A8) for body
- **Accent**: Warm green or teal for CTAs (benefits = positive, hopeful)
- **Font pairing**: Custom sans-serif (NOT Inter, NOT system). Something warm and trustworthy. Candidates: Satoshi, General Sans, Plus Jakarta Sans, Cabinet Grotesk
- **Border radius**: 16-20px on cards, 12px on buttons
- **Section spacing**: 80-120px vertical padding
- **Shadows**: Subtle, layered (not flat, not heavy)

### Key Pages to Redesign

1. **Landing page** (full redesign, section by section)
2. **Screening chat UI** (polish: bubbles, typing indicator, progress bar, transitions)
3. **Results dashboard** (polish: program cards, value display, document checklist)

## Technical Approach

- Work in the existing Benefind codebase (`~/Documents/GitHub/benefind/`)
- Preserve existing Tailwind v4 + CSS variable theme system
- Update `globals.css` with new design tokens
- Create a `docs/design-system.md` README that Claude Code references during builds
- Build section by section using reference screenshots
- Screenshot loop QA at desktop (1440px), tablet (768px), mobile (375px)

## Success Metrics

- Lighthouse performance: 90+
- Lighthouse accessibility: 95+
- Mobile usability: 100% touch-target compliance (44px min)
- Visual parity with Mobbin's polish level (Eric's subjective sign-off)
- Time to first CTA click: measurable via analytics (future)

## Related

- [[benefind-prd]]
- [[benefind-product-architecture]]
- [[design-system-reference]]
- [[universal-cockpit-prd]]
