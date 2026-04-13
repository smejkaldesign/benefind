import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Benefit Calculators | Benefind",
  description:
    "Free, instant calculators for SNAP food stamps, Medicaid eligibility, and R&D tax credits. Get an estimate in under 2 minutes, then start a full screening.",
  alternates: { canonical: "https://benefind.app/tools" },
  openGraph: {
    title: "Free Benefit Calculators | Benefind",
    description:
      "Instant estimates for SNAP, Medicaid, and R&D tax credits. No account required.",
    url: "https://benefind.app/tools",
    siteName: "Benefind",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Benefit Calculators | Benefind",
    description:
      "Instant estimates for SNAP, Medicaid, and R&D tax credits. No account required.",
  },
};

const TOOLS = [
  {
    href: "/tools/snap-calculator",
    label: "[SNAP]",
    title: "SNAP Benefit Calculator",
    description:
      "Estimate your monthly food stamp benefit in under 60 seconds. Enter household size, income, and state to see how much you could receive.",
    badge: "Free food assistance",
    cta: "Calculate SNAP benefits",
  },
  {
    href: "/tools/medicaid-estimator",
    label: "[Medicaid]",
    title: "Medicaid Eligibility Estimator",
    description:
      "Find out if your income qualifies for Medicaid in your state. Expansion and non-expansion states handled separately.",
    badge: "Free health coverage",
    cta: "Check Medicaid eligibility",
  },
  {
    href: "/tools/tax-credit-calculator",
    label: "[R&D Tax Credit]",
    title: "R&D Tax Credit Calculator",
    description:
      "Estimate your federal R&D tax credit using the ASC method. Startups may qualify for the payroll tax offset — find out instantly.",
    badge: "Business tax savings",
    cta: "Calculate R&D credit",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://benefind.app",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Tools",
      item: "https://benefind.app/tools",
    },
  ],
};

export default function ToolsIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero */}
      <div className="border-b border-dashed border-border">
        <div className="mx-auto max-w-[1520px] px-6 py-16 md:py-24">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-brand">
            [Free Calculators]
          </p>
          <h1 className="mb-3 font-display text-3xl font-semibold tracking-tight text-text md:text-5xl">
            Know before you apply.
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-text-muted md:text-lg">
            Instant estimates for the programs that matter most. No account
            required. Full screenings available when you're ready.
          </p>
        </div>
      </div>

      {/* Tool cards */}
      <div className="mx-auto max-w-[1520px] px-6 py-12 md:py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface-dim p-6 transition-all hover:border-brand/40 hover:bg-surface-bright"
            >
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-brand">
                {tool.label}
              </p>
              <h2 className="mb-2 font-display text-xl font-semibold text-text transition-colors group-hover:text-brand">
                {tool.title}
              </h2>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-text-muted">
                {tool.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="rounded bg-surface-bright px-2 py-1 font-mono text-[10px] text-text-subtle">
                  {tool.badge}
                </span>
                <span className="text-sm font-medium text-brand transition-colors group-hover:underline">
                  {tool.cta} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
