import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/docs/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Design System | Benefind Docs",
  description:
    "Benefind brand tokens, typography scale, color palette, button variants, spacing, and badges. For designers and contributors.",
  alternates: { canonical: "https://benefind.app/docs/design-system" },
};

interface ColorToken {
  name: string;
  cssVar: string;
  hex: string;
  description: string;
  textOn?: "dark" | "light";
}

const BRAND_COLORS: ColorToken[] = [
  {
    name: "brand",
    cssVar: "--color-brand",
    hex: "#cab1f7",
    description: "Primary lilac for CTAs, links, and brand emphasis.",
    textOn: "dark",
  },
  {
    name: "brand-light",
    cssVar: "--color-brand-light",
    hex: "#deb0f7",
    description: "Hover state and lighter brand accents.",
    textOn: "dark",
  },
  {
    name: "brand-dark",
    cssVar: "--color-brand-dark",
    hex: "#b19eef",
    description: "Deeper lilac for pressed states and mixed layouts.",
    textOn: "dark",
  },
  {
    name: "brand-50",
    cssVar: "--color-brand-50",
    hex: "rgba(202,177,247,0.12)",
    description: "Translucent brand fill for soft backgrounds and badges.",
    textOn: "dark",
  },
];

const SURFACE_COLORS: ColorToken[] = [
  {
    name: "surface",
    cssVar: "--color-surface",
    hex: "#121212",
    description: "Default page background. Warm near-black.",
    textOn: "light",
  },
  {
    name: "surface-dim",
    cssVar: "--color-surface-dim",
    hex: "#1a1a1a",
    description: "Elevated surface, cards, panels, sections.",
    textOn: "light",
  },
  {
    name: "surface-bright",
    cssVar: "--color-surface-bright",
    hex: "#2a2b25",
    description: "Warm highlight surface used on hover and emphasis.",
    textOn: "light",
  },
  {
    name: "surface-dark",
    cssVar: "--color-surface-dark",
    hex: "#0e0e0e",
    description: "Deep recessed surface.",
    textOn: "light",
  },
];

const TEXT_COLORS: ColorToken[] = [
  {
    name: "text",
    cssVar: "--color-text",
    hex: "#faf9f6",
    description: "Primary text. Warm off-white for reduced eye strain.",
    textOn: "dark",
  },
  {
    name: "text-muted",
    cssVar: "--color-text-muted",
    hex: "#afaeac",
    description: "Secondary text. Body copy, captions.",
    textOn: "dark",
  },
  {
    name: "text-subtle",
    cssVar: "--color-text-subtle",
    hex: "#868584",
    description: "Tertiary text. Meta, timestamps, helper text.",
    textOn: "dark",
  },
];

const BORDER_COLORS: ColorToken[] = [
  {
    name: "border",
    cssVar: "--color-border",
    hex: "#353534",
    description: "Default border. Subtle separation.",
    textOn: "light",
  },
  {
    name: "border-dark",
    cssVar: "--color-border-dark",
    hex: "#2a2b25",
    description: "Quieter border for soft divisions.",
    textOn: "light",
  },
];

const BUTTON_VARIANTS = [
  "default",
  "outline",
  "secondary",
  "ghost",
  "destructive",
  "link",
] as const;
const BUTTON_SIZES = ["xs", "sm", "default", "lg"] as const;

function Swatch({ token }: { token: ColorToken }) {
  const textClass = token.textOn === "dark" ? "text-surface" : "text-text";
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface-dim">
      <div
        className="flex h-24 items-end justify-between px-4 py-3"
        style={{ background: token.hex }}
      >
        <div className={`font-mono text-[11px] ${textClass}`}>{token.hex}</div>
      </div>
      <div className="p-4">
        <p className="font-mono text-sm font-semibold text-text">
          {token.name}
        </p>
        <p className="mt-0.5 font-mono text-[11px] text-text-subtle">
          {token.cssVar}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-text-muted">
          {token.description}
        </p>
      </div>
    </div>
  );
}

function Section({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-16">
      {eyebrow && (
        <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-brand">
          [{eyebrow}]
        </p>
      )}
      <h2 className="mb-6 font-display text-2xl font-semibold tracking-tight text-text">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <>
      <Breadcrumbs
        items={[{ label: "Docs", href: "/docs" }, { label: "Design system" }]}
      />

      <header className="mb-12">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-brand">
          [Design System]
        </p>
        <h1 className="mb-3 font-display text-3xl font-semibold tracking-tight text-text md:text-4xl">
          Benefind Design System
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-text-muted md:text-lg">
          The tokens, components, and patterns that make Benefind look like
          Benefind. Pulled from{" "}
          <code className="rounded bg-surface-dim px-1.5 py-0.5 font-mono text-[0.85em] text-brand">
            src/app/globals.css
          </code>
          . If you&apos;re contributing, start here.
        </p>
      </header>

      <Section title="Brand colors" eyebrow="Colors">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BRAND_COLORS.map((t) => (
            <Swatch key={t.name} token={t} />
          ))}
        </div>
      </Section>

      <Section title="Surfaces" eyebrow="Colors">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SURFACE_COLORS.map((t) => (
            <Swatch key={t.name} token={t} />
          ))}
        </div>
      </Section>

      <Section title="Text" eyebrow="Colors">
        <div className="grid gap-4 sm:grid-cols-3">
          {TEXT_COLORS.map((t) => (
            <Swatch key={t.name} token={t} />
          ))}
        </div>
      </Section>

      <Section title="Borders" eyebrow="Colors">
        <div className="grid gap-4 sm:grid-cols-2">
          {BORDER_COLORS.map((t) => (
            <Swatch key={t.name} token={t} />
          ))}
        </div>
      </Section>

      <Section title="Typography" eyebrow="Type">
        <div className="space-y-8 rounded-xl border border-border bg-surface-dim p-8">
          <div>
            <p className="mb-1 font-mono text-[11px] uppercase tracking-widest text-text-subtle">
              Display / 5xl, font-display (Aguzzo)
            </p>
            <p className="font-display text-5xl font-semibold tracking-tight text-text">
              Find every benefit you deserve.
            </p>
          </div>
          <div>
            <p className="mb-1 font-mono text-[11px] uppercase tracking-widest text-text-subtle">
              Display / 3xl
            </p>
            <p className="font-display text-3xl font-semibold tracking-tight text-text">
              How Benefind Works
            </p>
          </div>
          <div>
            <p className="mb-1 font-mono text-[11px] uppercase tracking-widest text-text-subtle">
              Sans / lg
            </p>
            <p className="text-lg leading-relaxed text-text">
              Plain-language screening for 80+ federal and state benefit
              programs.
            </p>
          </div>
          <div>
            <p className="mb-1 font-mono text-[11px] uppercase tracking-widest text-text-subtle">
              Sans / base, body copy (text-muted)
            </p>
            <p className="text-base leading-relaxed text-text-muted">
              Body paragraphs use the muted text color and relaxed line height
              for long-form reading. This is what blog posts and guides look
              like by default.
            </p>
          </div>
          <div>
            <p className="mb-1 font-mono text-[11px] uppercase tracking-widest text-text-subtle">
              Mono / xs
            </p>
            <p className="font-mono text-xs tracking-widest text-brand">
              [EYEBROW / CATEGORY / META]
            </p>
          </div>
        </div>
      </Section>

      <Section title="Buttons" eyebrow="Components">
        <div className="mb-6 rounded-xl border border-border bg-surface-dim p-8">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-text-subtle">
            Variants
          </p>
          <div className="flex flex-wrap gap-3">
            {BUTTON_VARIANTS.map((v) => (
              <Button key={v} variant={v}>
                {v}
              </Button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface-dim p-8">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-text-subtle">
            Sizes
          </p>
          <div className="flex flex-wrap items-end gap-3">
            {BUTTON_SIZES.map((s) => (
              <Button key={s} size={s}>
                {s}
              </Button>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Badges" eyebrow="Components">
        <div className="rounded-xl border border-border bg-surface-dim p-8">
          <div className="flex flex-wrap gap-3">
            <Badge>default</Badge>
            <Badge variant="brand">brand</Badge>
            <Badge variant="success">success</Badge>
            <Badge variant="warning">warning</Badge>
            <Badge variant="error">error</Badge>
          </div>
        </div>
      </Section>

      <Section title="Spacing" eyebrow="Layout">
        <div className="rounded-xl border border-border bg-surface-dim p-8">
          <div className="space-y-4">
            {[
              { size: "h-1", label: "4px / tight" },
              { size: "h-2", label: "8px / xs" },
              { size: "h-3", label: "12px / sm" },
              { size: "h-4", label: "16px / base" },
              { size: "h-6", label: "24px / md" },
              { size: "h-8", label: "32px / lg" },
              { size: "h-12", label: "48px / xl" },
            ].map(({ size, label }) => (
              <div key={label} className="flex items-center gap-4">
                <div className={`w-16 ${size} rounded bg-brand`} />
                <span className="font-mono text-xs text-text-muted">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Contributing" eyebrow="Meta">
        <div className="rounded-xl border border-dashed border-border bg-surface-dim p-6">
          <p className="text-sm leading-relaxed text-text-muted">
            All tokens live in{" "}
            <code className="rounded bg-surface-bright px-1.5 py-0.5 font-mono text-[0.85em] text-brand">
              src/app/globals.css
            </code>{" "}
            under the{" "}
            <code className="rounded bg-surface-bright px-1.5 py-0.5 font-mono text-[0.85em] text-brand">
              @theme
            </code>{" "}
            block. Add new tokens there, reference them via Tailwind utilities
            like{" "}
            <code className="rounded bg-surface-bright px-1.5 py-0.5 font-mono text-[0.85em] text-brand">
              bg-brand
            </code>
            ,{" "}
            <code className="rounded bg-surface-bright px-1.5 py-0.5 font-mono text-[0.85em] text-brand">
              text-text-muted
            </code>
            , and{" "}
            <code className="rounded bg-surface-bright px-1.5 py-0.5 font-mono text-[0.85em] text-brand">
              border-border
            </code>
            .
          </p>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">
            Before adding a new color, check if an existing one works. The
            palette is intentionally small, that&apos;s how it stays cohesive.
          </p>
        </div>
      </Section>
    </>
  );
}
