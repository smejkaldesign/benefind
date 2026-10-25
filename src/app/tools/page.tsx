import type { Metadata } from "next";
import Link from "next/link";
import { getServerI18n } from "@/lib/i18n/server";

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
  { href: "/tools/snap-calculator", key: "snap" },
  { href: "/tools/medicaid-estimator", key: "medicaid" },
  { href: "/tools/tax-credit-calculator", key: "rd" },
] as const;

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

export default async function ToolsIndexPage() {
  const { t } = await getServerI18n();
  const tt = t.tools.index;
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
            {tt.eyebrow}
          </p>
          <h1 className="mb-3 font-display text-3xl font-semibold tracking-tight text-text md:text-5xl">
            {tt.title}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-text-muted md:text-lg">
            {tt.intro}
          </p>
        </div>
      </div>

      {/* Tool cards */}
      <div className="mx-auto max-w-[1520px] px-6 py-12 md:py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map(({ href, key }) => {
            const tool = tt[key];
            return (
              <Link
                key={href}
                href={href}
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
                    {tool.cta}{" "}
                    <span aria-hidden className="inline-block rtl:-scale-x-100">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
