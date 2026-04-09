# Benefind Design System

> Reference document for all Benefind UI development. Every agent reads this before touching any component.
> Inspired by [Mobbin.com](https://mobbin.com). Dark theme, premium feel, generous whitespace.
> Audience: Americans navigating government benefits. Tone: warm, trustworthy, approachable (not cold/corporate).

---

## Typography

### Fonts

| Role | Font | Source | Fallback |
|------|------|--------|----------|
| **Primary** (body, UI) | Plus Jakarta Sans | Google Fonts | system-ui, sans-serif |
| **Display** (headlines) | Cabinet Grotesk | Fontshare | Plus Jakarta Sans, sans-serif |

### Scale

| Token | Desktop | Mobile | Tailwind |
|-------|---------|--------|----------|
| Hero headline | 56-72px | 36-44px | `text-6xl` / `text-4xl` |
| Section headline | 40-48px | 28-32px | `text-5xl` / `text-3xl` |
| Subheadline | 20-24px | 20-24px | `text-xl` / `text-lg` |
| Body | 16-18px | 16px | `text-base` / `text-lg` |
| Small / caption | 14px | 14px | `text-sm` |

### Weights

| Token | Weight | Tailwind |
|-------|--------|----------|
| Body | 400 | `font-normal` |
| Subheads | 500 | `font-medium` |
| Section heads | 600 | `font-semibold` |
| Hero | 700 | `font-bold` |

### Line Heights

| Context | Value | Tailwind |
|---------|-------|----------|
| Headings | 1.1-1.2 | `leading-tight` |
| Body | 1.6-1.7 | `leading-relaxed` |

---

## Color Palette

All colors pass WCAG AA contrast on their respective backgrounds.

### Core

| Token | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| Background | `#09090B` | `bg-zinc-950` | Page background |
| Surface | `#18181B` | `bg-zinc-900` | Cards, panels |
| Surface hover | `#27272A` | `bg-zinc-800` | Card hover, active states |
| Border | `#3F3F46` | `border-zinc-700` | Card borders, dividers |

### Text

| Token | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| Primary | `#FAFAFA` | `text-zinc-50` | Headlines, primary body |
| Secondary | `#A1A1AA` | `text-zinc-400` | Supporting text, descriptions |
| Muted | `#71717A` | `text-zinc-500` | Captions, placeholders |

### Accent (Emerald)

Green = benefits, hope, growth. Warm and inviting.

| Token | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| Primary CTA | `#10B981` | `text-emerald-500` / `bg-emerald-500` | Buttons, links, highlights |
| Hover | `#059669` | `bg-emerald-600` | Button hover state |
| Soft | `#10B98120` | `bg-emerald-500/[0.12]` | Badge backgrounds, subtle fills |

### Semantic

| Token | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| Error | `#EF4444` | `text-red-500` | Validation, destructive |
| Warning | `#F59E0B` | `text-amber-500` | Caution, attention |

---

## Spacing

| Token | Desktop | Mobile | Tailwind |
|-------|---------|--------|----------|
| Section padding (vertical) | 96px | 64px | `py-24` / `py-16` |
| Container max-width | 1200px | 100% | `max-w-[1200px] mx-auto` |
| Card padding | 32px | 24px | `p-8` / `p-6` |
| Gap: tight | 16px | 16px | `gap-4` |
| Gap: normal | 24px | 24px | `gap-6` |
| Gap: relaxed | 32px | 32px | `gap-8` |
| Gap: section | 48px | 48px | `gap-12` |
| Button padding | 16px 32px | 16px 32px | `py-4 px-8` |

---

## Border Radius

| Element | Radius | Tailwind |
|---------|--------|----------|
| Cards / containers | 16px | `rounded-2xl` |
| Buttons | 12px | `rounded-xl` |
| Badges / tags | 8px (or full-round for pills) | `rounded-lg` / `rounded-full` |
| Input fields | 10px | `rounded-[10px]` |
| Screenshots / previews | 20px | `rounded-[20px]` |

---

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| Card | `0 4px 6px -1px rgba(0,0,0,0.3), 0 2px 4px -2px rgba(0,0,0,0.2)` | Default card elevation |
| Elevated | `0 20px 25px -5px rgba(0,0,0,0.4), 0 8px 10px -6px rgba(0,0,0,0.3)` | Modals, dropdowns, popovers |
| Glow (accent) | `0 0 40px rgba(16, 185, 129, 0.15)` | CTA highlight, hero elements |

Tailwind usage:
```
shadow-card: shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3),0_2px_4px_-2px_rgba(0,0,0,0.2)]
shadow-elevated: shadow-[0_20px_25px_-5px_rgba(0,0,0,0.4),0_8px_10px_-6px_rgba(0,0,0,0.3)]
shadow-glow: shadow-[0_0_40px_rgba(16,185,129,0.15)]
```

---

## Components

### Buttons

**Primary**
```
bg-emerald-500 text-white font-medium rounded-xl py-4 px-8
hover:bg-emerald-600 transition-colors duration-200
```

**Secondary**
```
bg-transparent border border-zinc-300 text-white font-medium rounded-xl py-4 px-8
hover:bg-zinc-800 transition-colors duration-200
```

**Ghost**
```
bg-transparent text-zinc-300 font-medium rounded-xl py-4 px-8
hover:bg-zinc-800/50 transition-colors duration-200
```

### Cards

```
bg-zinc-900 border border-zinc-700 rounded-2xl p-8
hover:border-zinc-600 transition-colors duration-200
```

Optional glow on hover:
```
hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]
```

### Badges

Small pill shape for program names, confidence levels, trust signals.

```
bg-emerald-500/[0.12] text-emerald-500 text-sm font-medium px-3 py-1 rounded-lg
```

For full pill variant: use `rounded-full` instead of `rounded-lg`.

### Marquee

- Infinite horizontal scroll, smooth CSS animation
- Items spaced 48px apart (`gap-12`)
- Duration: 30s, linear, infinite
- No pause on hover
- Used for: program icons/logos in hero area

```css
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.marquee { animation: marquee 30s linear infinite; }
```

### Stats Counter

- Large bold number: 48px+ (`text-5xl font-bold`)
- Accent color for the number: `text-emerald-500`
- Label below: `text-zinc-400 text-base`
- Animate count-up on scroll-in via Framer Motion

---

## Section Structure (Page Order)

| # | Section | Key Notes |
|---|---------|-----------|
| 1 | **Nav** | Sticky, transparent initially, `bg-zinc-900/80 backdrop-blur` on scroll |
| 2 | **Hero** | Headline + subline + dual CTA (primary + secondary) + program marquee below |
| 3 | **Product Preview** | Large screenshots: mobile chat mockup + desktop results view |
| 4 | **Problem** | "Benefits are hard to find" section, empathy-first |
| 5 | **How It Works** | 3 steps with icons + text, numbered |
| 6 | **Interactive Demo** | Tabbed interface: Chat / Results / Documents / Languages |
| 7 | **Impact Stats** | Animated counters (count-up on scroll) |
| 8 | **Trust** | "Your Data Stays Yours" + encryption/privacy details |
| 9 | **Testimonials** | Card carousel |
| 10 | **Final CTA** | "Don't Leave Money on the Table" + primary action |
| 11 | **Footer** | Links + language selector + "Built by Smejkal Design" credit |

---

## Animation Guidelines

Use **Framer Motion** for all animations.

### Allowed Patterns

| Animation | Details |
|-----------|---------|
| Scroll fade-up | Sections fade in + slide up on enter; stagger children by 100ms |
| Hero text | Fade-in + slide-up, 0.6s ease-out |
| Stats count-up | Animate from 0 to target number on scroll-in |
| Marquee | CSS infinite scroll, 30s linear |
| Card hover | `scale(1.02)` transform, 200ms ease |
| Color transitions | 200ms on all hover/focus states |

### Forbidden

- No parallax scrolling
- No 3D transforms
- No heavy particle effects or canvas animations
- No scroll-jacking

**Rule:** 3-4 key animations per page max. Everything else is static. Performance matters more than flash.

### Framer Motion Defaults

```tsx
// Scroll-triggered section wrapper
const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 }
  }
};
```

---

## Responsive Breakpoints

| Breakpoint | Width | Tailwind | Layout |
|------------|-------|----------|--------|
| Mobile | < 640px | default | Single column, stack everything |
| Tablet | 640-1024px | `sm:` / `md:` | 2 columns where applicable |
| Desktop | > 1024px | `lg:` | Full layout |

Container: `max-w-7xl` (1280px), centered with `mx-auto px-6`.

---

## Implementation Notes

- **Framework:** Next.js with Tailwind v4
- **Font loading:** Use `next/font` for Plus Jakarta Sans; self-host Cabinet Grotesk via `@font-face`
- **Icons:** Lucide React (consistent, tree-shakeable)
- **Animations:** Framer Motion only (no GSAP, no AOS)
- **Images:** Next.js `<Image>` with WebP/AVIF, lazy loading by default
- **Accessibility:** All interactive elements need focus-visible styles; skip-nav link; semantic HTML throughout; minimum touch target 44x44px on mobile
