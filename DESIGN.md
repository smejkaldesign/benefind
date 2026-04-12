# DESIGN.md -- Benefind Design System

Authoritative frontend reference. All tokens live in `src/app/globals.css` under the `@theme` block. Visual examples at `/docs/design-system`.

---

## Component Library Stack

| Layer | Library | Purpose |
|---|---|---|
| Base primitives | shadcn/ui (`base-nova` style) | Button, Card, Dialog, Input, etc. |
| Marketing blocks | shadcnblocks (`@shadcnblocks` registry) | Navbar, Footer, Hero, CTA sections |
| Visual effects | reactbits (custom wrappers) | DitherFade, Grainient, GradientBlinds, etc. |
| App-specific | Custom components | AuthGuard, WorkspacePicker, ScreeningFlow |

---

## How to Add Components

### From shadcn/ui (base primitives)

```bash
npx shadcn@latest add {component-name}
# Example: npx shadcn@latest add dialog
```

Components land in `src/components/ui/`. Config uses `base-nova` style, `neutral` base color, Lucide icons, and CSS variables. See `components.json`.

### From shadcnblocks (marketing blocks)

```bash
npx shadcn@latest add @shadcnblocks/{block-name}
# Requires SHADCNBLOCKS_API_KEY in .env
```

Registry URL: `https://shadcnblocks.com/r/{name}` (configured in `components.json`).

---

## Theme System

**Dual-theme design.** Dark mode is the primary experience, but a full light mode is supported. Powered by `next-themes` with `attribute="class"`, `defaultTheme="dark"`, and `enableSystem`.

**How theme switching works:**
- The `ThemeProvider` wraps the app in `src/app/layout.tsx`
- `ThemeToggle` component lives in the main nav
- CSS variables automatically switch via `:root` (light) and `.dark` scopes in `globals.css`
- Access the current theme in components: `const { resolvedTheme } = useTheme()` from `next-themes`
- All semantic tokens (`bg-surface`, `text-text`, etc.) adapt automatically; no manual switching needed for most components

**Brand color:** `#cab1f7` (dark) / `#9b7dd4` (light), used for CTAs, links, focus rings, and accent gradients. The light variant is deeper to maintain contrast on white backgrounds.

**Font stack:**
- **Display:** `Aguzzo-TRIAL` (serif, `font-display`, loaded via `@font-face` from `/fonts/`) -- headings, hero text
- **Body:** `Geist` (Google Fonts, `--font-sans`) -- paragraphs, UI labels
- **UI fallback:** `Inter` (Google Fonts, `--font-inter`) -- form elements, smaller UI text
- **Mono:** system monospace -- code, eyebrows, meta labels

**Border radius:** `--radius: 0.625rem` base, scaled via `--radius-sm` through `--radius-4xl`.

---

## Design Tokens

All tokens switch automatically between `:root` (light) and `.dark` scopes in `globals.css`.

### Brand

| Token | Light | Dark | Use |
|---|---|---|---|
| `--color-brand` | `#9b7dd4` | `#cab1f7` | Primary CTAs, links, focus rings |
| `--color-brand-light` | `#b794f6` | `#deb0f7` | Hover states, gradient endpoints |
| `--color-brand-dark` | `#7c5db8` | `#b19eef` | Pressed states, deeper accent |
| `--color-brand-50` | `rgba(155,125,212,0.08)` | `rgba(202,177,247,0.12)` | Soft background fills, badge tints |

### Surfaces

| Token | Light | Dark | Use |
|---|---|---|---|
| `--color-surface` | `#ffffff` | `#121212` | Default page background |
| `--color-surface-dim` | `#f8f8f7` | `#1a1a1a` | Cards, panels, elevated sections |
| `--color-surface-bright` | `#f0efed` | `#2a2b25` | Hover/emphasis highlights |
| `--color-surface-deep` | `#e8e7e5` | `#0e0e0e` | Deep recessed areas |
| `--color-surface-deepest` | `#dddbd8` | `#0a0a0a` | Deepest background layer |

### Text

| Token | Light | Dark | Use |
|---|---|---|---|
| `--color-text` | `#1c1917` | `#faf9f6` | Primary text |
| `--color-text-muted` | `#57534e` | `#afaeac` | Body copy, captions |
| `--color-text-subtle` | `#a8a29e` | `#868584` | Meta, timestamps, helper text |

### Borders

| Token | Light | Dark | Use |
|---|---|---|---|
| `--color-border` | oklch light neutral | `oklch(1 0 0 / 10%)` | Default borders, dividers |

### Status

| Token | Value | Use |
|---|---|---|
| `--color-success` | Aliased to `--brand` | Aliased to brand for consistency |
| `--color-warning` | `#f59e0b` | Amber warnings |
| `--color-error` | `#ef4444` | Red errors, destructive actions |

### Spacing

4px base unit. Tailwind scale: `h-1` (4px), `h-2` (8px), `h-3` (12px), `h-4` (16px), `h-6` (24px), `h-8` (32px), `h-12` (48px).

---

## Available Components (40 in `src/components/ui/`)

### Primitives (inputs, forms)
`button`, `input`, `input-group`, `textarea`, `label`, `checkbox`, `radio-group`, `select`, `switch`, `toggle`, `toggle-group`, `slider`

### Layout
`card`, `separator`, `scroll-area`, `resizable`, `carousel`

### Navigation
`breadcrumb`, `tabs`, `navigation-menu`, `menubar`, `pagination`, `context-menu`, `dropdown-menu`

### Overlays
`dialog`, `drawer`, `sheet`, `popover`, `tooltip`, `hover-card`

### Feedback
`alert`, `sonner` (toast), `progress`, `skeleton`, `badge`

### Data Display
`table`, `accordion`, `collapsible`, `avatar`, `command`

---

## Reactbits Components (DO NOT REPLACE)

Custom visual effect components in `src/components/`. Hand-tuned, not from a registry.

| Component | File | Purpose |
|---|---|---|
| `DitherFade` | `dither-fade.tsx` | Dithered fade-in transition for sections |
| `Grainient` | `grainient.tsx` | WebGL2 grainy gradient backgrounds (hero signature) |
| `GradientBlinds` | `gradient-blinds.tsx` | Venetian-blind gradient reveal |
| `AsciiWaves` | `ascii-waves.tsx` | ASCII art wave animation |
| `BorderGlow` | `border-glow.tsx` | Animated glowing border effect |
| `MagicBento` | `magic-bento.tsx` | Interactive bento grid with cursor tracking |
| `SmoothScroll` | `smooth-scroll.tsx` | Lenis-based smooth scroll wrapper (loaded in layout) |

**These are NOT shadcn primitives. Never swap them for registry alternatives.**

### Grainient Standard Config (homepage hero)

```tsx
<Grainient color1="#FF9FFC" color2="#5227FF" color3="#B19EEF"
  timeSpeed={0.25} rotationAmount={120} centerY={-0.25} colorBalance={0.15} />
```

Always layer a dark vignette gradient on top for text legibility.

---

## Patterns

### Page Shell

```tsx
<main className="bg-surface text-text min-h-dvh">
  <div className="mx-auto max-w-[1520px] px-6">
    <header className="mb-12">
      <p className="mb-3 font-mono text-xs uppercase tracking-widest text-brand">[Eyebrow]</p>
      <h1 className="font-display text-3xl font-semibold tracking-tight text-text md:text-4xl">Title</h1>
      <p className="max-w-2xl text-base leading-relaxed text-text-muted">Subtitle</p>
    </header>
  </div>
</main>
```

### Form Layout

```tsx
<div className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="field">Field</Label>
    <Input id="field" className="rounded-lg border-border bg-surface-dim" />
  </div>
</div>
```

### Card Grid

```tsx
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  <Card className="rounded-[16px] border-border bg-surface-bright p-6 sm:p-8 transition-all hover:border-accent/20">
    ...
  </Card>
</div>
```

### Two-Column Page (Screening)

Left panel: `flex-1 lg:max-w-[55%] bg-surface` for interactive content.
Right panel: `lg:flex-1` with Grainient + value prop overlay, white text with dark vignette.

### Theme Rules

- Use `bg-surface` / `bg-surface-dim` for backgrounds, never `bg-black`, `bg-white`, or `bg-gray-*`
- Use `text-text` / `text-text-muted` / `text-text-subtle` for text hierarchy
- Use `border-border` for all borders
- Brand lilac (`text-brand`, `bg-brand`) for interactive elements and emphasis
- On `bg-brand` surfaces, use `text-surface` (dark text), never `text-white`
- Tokens switch automatically between themes; no conditional classes needed for standard UI

### Theme-Aware Component Pattern

When a component accepts hardcoded color props (e.g., reactbits visual effects), use `useTheme()`:

```tsx
import { useTheme } from "next-themes";

function MyComponent() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <BorderGlow
      backgroundColor={isDark ? "#1A1A1A" : "#F8F8F7"}
      colors={isDark ? ["#CAB1F7", "#DEB0F7", "#B19EEF"] : ["#9B7DD4", "#B794F6", "#7C5DB8"]}
    />
  );
}
```

### Reactbits in Light Mode

Most reactbits components accept color props from their callers. The components themselves are theme-agnostic.

| Component | Light Mode Status | Notes |
|---|---|---|
| Grainient | Works as-is | Full-bleed WebGL background with vignette overlay; brand colors are identity, not theme-dependent |
| GradientBlinds | Works as-is (unused) | Color props from caller; not mounted in any live page |
| BorderGlow | Theme-aware | `stats-strip.tsx` and `bento-grid.tsx` pass `isDark`-switched `backgroundColor` and `colors` |
| DitherFade | Caller must pass color | Default `#121212` is dark; pass `#ffffff` or a light surface color in light mode when mounting |
| AsciiWaves | Caller must pass color | Color is a prop; brand lilac default works on both themes |
| MagicBento | Works as-is (unused) | Semi-transparent glow overlays adapt to any background |
| SmoothScroll | No colors | Lenis scroll wrapper, no visual output |

---

## Typography Hierarchy

| Role | Classes |
|---|---|
| Hero headline | `font-display text-4xl sm:text-6xl lg:text-[64px] font-semibold leading-[1.05] tracking-tight` |
| Section H2 | `font-display text-3xl sm:text-4xl font-semibold tracking-tight` |
| Stats value | `font-display text-5xl font-semibold` |
| Body | `text-sm sm:text-base text-text-muted leading-relaxed` |
| Eyebrow/label | `font-mono text-xs uppercase tracking-widest text-brand` |

---

## Motion

All page-level entrance animations use **framer-motion**.

- **Entrance:** `initial={{ opacity: 0, y: 20 }}` / `animate={{ opacity: 1, y: 0 }}` / `duration: 0.5`
- **Scroll reveal:** `whileInView` with `viewport={{ once: true, margin: "-80px" }}`
- **Stagger:** `staggerChildren: 0.1`
- **Smooth scroll:** Lenis via `SmoothScroll` component (don't add per-section scroll handlers)
- **Performance:** transforms + opacity only on the compositor thread. Avoid `backdrop-filter: blur` on more than 2 elements per page.

---

## Button Variants and Sizes

**Variants:** `default`, `outline`, `secondary`, `ghost`, `destructive`, `link`
**Sizes:** `xs`, `sm`, `default`, `lg`
**Badge variants:** `default`, `brand`, `success`, `warning`, `error`

---

## Iconography

- **Library:** `lucide-react` exclusively
- **Sizes:** `h-4 w-4` (inline), `h-5 w-5` (nav), `h-6 w-6` (card icons)
- **Icon containers:** `h-10 w-10 rounded-[10px] bg-brand/10` with `text-brand` icon

---

## Do's and Don'ts

**DO:**
- Use shadcn/ui components before building custom ones
- Use CSS variables from `globals.css`, never hardcode hex colors
- Use semantic tokens (`text-text`, `bg-surface`) that adapt to both themes
- Test components in both light and dark mode
- Use `font-display` for headings, `font-sans` for body
- Use the `cn()` utility from `@/lib/utils` for conditional classes
- Run `pnpm type-check` before committing
- Pass theme-appropriate color props to reactbits components using `useTheme()`

**DON'T:**
- Replace reactbits visual effects with registry alternatives
- Add new fonts without updating `globals.css` and `layout.tsx`
- Use inline styles for colors or spacing (use tokens)
- Use `bg-black`, `bg-white`, `text-gray-*` -- use semantic tokens
- Use `text-white` or hardcoded hex values for content text -- use `text-text` / `text-text-muted`
- Use `text-white` on `bg-brand` -- always `text-surface` (lilac is too light for white text)
- Assume dark mode -- always use semantic tokens that work in both themes
- Use `backdrop-filter: blur` on more than 2 elements per page
- Skip the `base-nova` style when adding shadcn components
- Use `rounded-xl` -- use `rounded-lg` (8px) or `rounded-[16px]`
