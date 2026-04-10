# Benefind Design System

> The single source of truth for visual & interaction patterns across Benefind.
> Every page must inherit these tokens and patterns. If you need to deviate, update this doc first.

---

## 1. Brand & Voice

**Mission:** Help people and businesses claim every government benefit they deserve.

**Voice:** Direct, confident, accessible. No jargon. No fluff. Plain language that respects the user's intelligence.

**Visual identity:** Dark, premium, modern. Animated lilac gradients on a near-black surface. Serif headlines for authority, sans-serif body for clarity.

---

## 2. Design Tokens

All tokens live in `src/app/globals.css` under `@theme`. Reference them via Tailwind utility classes (`bg-surface`, `text-text`, `border-border`, etc.) — never hardcode hex values in components.

### 2.1 Color Tokens

| Token | Value | Usage |
|---|---|---|
| `--color-surface` | `#121212` | Page background, dark text on lilac |
| `--color-surface-dim` | `#1A1A1A` | Subtle alternate backgrounds (FAQ section, video bg) |
| `--color-surface-bright` | `#2A2B25` | Cards, elevated surfaces |
| `--color-surface-dark` | `#0E0E0E` | Deepest dark (rare) |
| `--color-text` | `#FAF9F6` | Primary text on dark surface |
| `--color-text-muted` | `#AFAEAC` | Secondary text, descriptions |
| `--color-text-subtle` | `#868584` | Tertiary text, captions, footer copy |
| `--color-border` | `#353534` | Card borders, dividers |
| `--color-border-light` | `#E3E2E0` | Light borders (rare; on white surfaces) |
| `--color-brand` | `#CAB1F7` | Primary CTA backgrounds, accent (lilac) |
| `--color-brand-light` | `#DEB0F7` | Brand gradient end |
| `--color-brand-dark` | `#B19EEF` | CTA hover state |
| `--color-accent` | `#CAB1F7` | Same as brand — gradient start |
| `--color-accent-end` | `#DEB0F7` | Gradient end |
| `--color-success` | `#10B981` | Genuine success states only (NOT brand) |
| `--color-warning` | `#F59E0B` | Warning toasts, badges |
| `--color-error` | `#EF4444` | Error states |

**Critical rule:** Lilac brand backgrounds ALWAYS use `text-surface` (dark text), never `text-white`. Lilac is too light for white text.

### 2.2 Typography

Two type families, both loaded in `globals.css`:

| Family | Variable | Usage | Weights |
|---|---|---|---|
| **Aguzzo-TRIAL** | `font-display` | Headlines, hero titles, section H2s | 400, 500-600, 700 |
| **Inter** | `font-inter` (default) | Body, UI, buttons, labels | 100-900 |

**Hierarchy:**
- **Hero headline:** `font-display text-4xl sm:text-6xl lg:text-[64px] font-semibold leading-[1.05] tracking-tight`
- **Section H2:** `font-display text-3xl sm:text-4xl font-semibold tracking-tight`
- **Stats values:** `font-display text-5xl font-semibold`
- **Body:** `text-sm sm:text-base text-text-muted leading-relaxed`
- **Labels:** `text-xs uppercase tracking-wider font-semibold text-text-subtle`

### 2.3 Spacing & Layout

**Page container widths:**
- **Hero outer container:** `max-w-[1600px]` — visually 80px wider than content
- **All other content sections:** `max-w-[1520px]` inside `px-6` (24px) — effective 1472px content area
- The 40px-each-side offset is intentional and gives the hero a "wider canvas" feel.

**Section padding (horizontal):**
- All sections except hero: `px-6` (24px)
- Hero: no padding (full bleed inside the 1600px outer)

**Section padding (vertical):**
- Standard sections: `py-20 sm:py-28` or `py-24 sm:py-32`
- Footer: `py-12`
- Hero top: `pt-20 sm:pt-24` (clears the fixed nav)

**Border radius:**
| Token | Value | Usage |
|---|---|---|
| `rounded-lg` | 8px | Buttons, inputs, dropdowns |
| `rounded-[10px]` | 10px | Small icon containers |
| `rounded-[16px]` | 16px | Cards, callout chips |
| `rounded-[20px]` | 20px | Hero container top corners, large feature cards |
| `rounded-full` | 50% | Avatars, circular icons |

**Card pattern (universal):**
```jsx
<div className="rounded-[16px] border border-border bg-surface-bright p-6 sm:p-8 transition-all hover:border-accent/20">
```

---

## 3. Components

### 3.1 Buttons

Three variants. ALL buttons use `rounded-lg` (8px) and `font-semibold`.

**Primary (lilac, dark text):**
```jsx
<button className="inline-flex h-[52px] items-center gap-2 rounded-lg bg-brand px-6 text-sm font-semibold text-surface transition-colors hover:bg-brand-dark focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none">
```

**White (hero CTAs, dropdown triggers):**
```jsx
<button className="inline-flex h-[52px] items-center gap-2 rounded-lg border border-surface/20 bg-white px-6 text-sm font-semibold text-surface shadow-sm transition-all hover:bg-white/95">
```

**Outline (secondary, on dark backgrounds):**
```jsx
<button className="rounded-lg border border-border px-4 py-1.5 text-sm font-semibold text-text-muted transition-colors hover:border-brand hover:text-brand">
```

**Hover arrow dissolve (hero CTAs):**
Wrap in `group`, append:
```jsx
<ArrowRight className="h-4 w-4 max-w-0 -translate-x-2 overflow-hidden opacity-0 transition-all duration-200 group-hover:max-w-[16px] group-hover:translate-x-0 group-hover:opacity-100" />
```

### 3.2 Dropdowns (Nav menus)

Pattern from `landing-nav.tsx`:
- Trigger: same white button styling, `ChevronDown` indicator that `rotate-180` on open
- Wrapper: `relative w-[200px]` (fixed width so menu matches)
- Menu: `absolute left-0 right-0 top-[calc(100%+8px)] overflow-hidden rounded-lg border border-surface/20 bg-white shadow-lg`
- Items: `flex items-center px-5 py-3 text-sm font-semibold text-surface hover:bg-surface/5`
- Divider between items: `<div className="h-px bg-surface/10" />`
- Close on outside click and on item click

### 3.3 Hero Background — Grainient

The signature animated gradient lives in `src/components/grainient.tsx` (WebGL2 shader).

**Standard usage (matches homepage hero):**
```jsx
<Grainient
  color1="#FF9FFC"
  color2="#5227FF"
  color3="#B19EEF"
  timeSpeed={0.25}
  rotationAmount={120}
  centerY={-0.25}
  colorBalance={0.15}
/>
```

Always layer a dark vignette gradient at the top for headline legibility:
```jsx
<div className="pointer-events-none absolute inset-x-0 top-0 h-[55%]"
     style={{ background: "linear-gradient(to bottom, rgba(20,10,40,0.55) 0%, rgba(20,10,40,0.35) 40%, transparent 100%)" }} />
```

And a fade-to-dark gradient at the bottom (45% height) for content transition.

### 3.4 Cards

| Use case | Pattern |
|---|---|
| Standard feature card | `rounded-[16px] border border-border bg-surface-bright p-6 sm:p-8` |
| Stats card | Same + `font-display text-5xl font-semibold text-text` for the value |
| Bento card with accent | Add left divider: `<div className="absolute inset-y-0 left-0 w-[2px] bg-brand opacity-60" />` |
| Hero callout chip (lilac) | `bg: rgb(236, 222, 255)`, `rounded-[16px]`, `border 0.6px solid rgba(255,255,255,0.5)`, dark text, layered shadow |

### 3.5 Forms / Inputs

Used in `/contact` and screening:
```jsx
<input className="rounded-lg border border-border bg-surface-dim px-4 py-3 text-text placeholder:text-text-subtle focus:border-accent focus:outline-none transition-colors" />
```

Labels: `text-sm font-medium text-text-muted mb-1.5`

---

## 4. Motion & Animation

All page-level entrance animations use **framer-motion** with these defaults:

**Entrance (hero, on mount):**
```jsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, delay: 0.1 }}
```

**Scroll reveal (sections):**
```jsx
initial={{ opacity: 0, y: 24 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-80px" }}
transition={{ duration: 0.5 }}
```

**Stagger child reveals:**
```jsx
variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
```

**Smooth scroll:** Site uses **Lenis** (`src/components/smooth-scroll.tsx`). Don't add per-section scroll handlers.

**Performance rules:**
- Always use `will-change: transform` + `translate3d(0,0,0)` on infinite-scroll animations (chip rows)
- Avoid `backdrop-filter: blur` on multiple elements — it tanks frame rate
- Animations should run on the compositor thread (transforms + opacity only)

---

## 5. Page Layout Pattern

Every authenticated/screening page follows this structure when paired with hero-style content:

```
┌─────────────────────────────────────────┐
│ Fixed Nav (max-w-[1520px], px-6, py-4)  │
├──────────────────┬──────────────────────┤
│                  │                      │
│  Conversation    │   Grainient + value  │
│  / Form panel    │   prop panel         │
│  bg-surface      │   (right column)     │
│  text-text       │                      │
│                  │   Same Grainient as  │
│                  │   homepage hero      │
│                  │                      │
└──────────────────┴──────────────────────┘
```

**Two-column page rules:**
- Left: `flex-1 lg:max-w-[55%]` — interactive content (chat, form)
- Right: `lg:flex-1` — visual context (Grainient + value prop)
- Background of left: `bg-surface` (dark)
- Background of right: Grainient component
- Text on Grainient: white/text-white with dark vignette overlay for legibility

---

## 6. Navigation

Fixed top nav, transparent until `scrollY > 20`, then `bg-surface/80 backdrop-blur-[30px]`.

**Structure:**
- Left: Logo + LanguageSelector (left-aligned dropdown)
- Right: Sign In (outline button) + Eligibility dropdown (white button, opens menu)
- Inner container: `max-w-[1520px] mx-auto`
- Padding: `px-6 py-4`

---

## 7. Edge Treatments

**Hero edge gradients:** 200px dark fade on left and right of the section, hidden at viewport >= 2000px (`min-[2000px]:hidden`). These create the cinematic letterbox effect at narrow viewports.

**Dither/dissolve transitions:** Use a simple linear gradient for the bottom of the hero (transparent → `#121212`), NOT canvas-based dither (too expensive).

---

## 8. Iconography

- **Library:** `lucide-react` exclusively
- **Default size:** `h-4 w-4` (16px) for inline, `h-6 w-6` for card icons, `h-5 w-5` for nav
- **Icon containers:** `h-10 w-10 rounded-[10px] bg-brand/10` with `text-brand` icon inside

---

## 9. Don'ts

- ❌ No emerald/green colors (the brand is lilac)
- ❌ No `text-white` on `bg-brand` — always `text-surface`
- ❌ No hardcoded hex values in components — use tokens
- ❌ No `pt-20` style padding on screening/full-screen pages — they're flush
- ❌ No `backdrop-filter: blur` on more than 2 elements per page
- ❌ No `font-medium` on display headings — always `font-semibold`
- ❌ No `rounded-xl` (use `rounded-lg` 8px or `rounded-[16px]`)
- ❌ No `text-emerald-*` anywhere — replace with `text-brand`

---

## 10. Adding a New Page

Checklist:
1. Wrap in `<main className="bg-surface text-text min-h-dvh">`
2. If it has a hero, use `Grainient` with the standard color set
3. If it has a nav, use `<LandingNav />`
4. Use `max-w-[1520px]` for content width + `px-6` for section padding
5. All buttons: `rounded-lg`, `font-semibold`, lilac primary or white CTA
6. Run `pnpm type-check` before committing
7. Update this DESIGN.md if you introduce a new pattern
