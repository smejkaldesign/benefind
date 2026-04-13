import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ChevronRight, Check } from "lucide-react";
import { getComparison, getAllComparisonSlugs } from "@/lib/comparisons";
import { LandingNav } from "@/components/landing-nav";
import { Footer } from "@/components/footer";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-jsonld";
import { TrustBar } from "@/components/trust-bar";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllComparisonSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const comparison = getComparison(slug);
  if (!comparison) return {};

  const title = `${comparison.title} | Benefind`;
  const url = `https://benefind.app/compare/${slug}`;

  return {
    title,
    description: comparison.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: comparison.description,
      url,
      siteName: "Benefind",
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: comparison.description,
    },
  };
}

export default async function ComparisonPage({ params }: Props) {
  const { slug } = await params;
  const comparison = getComparison(slug);
  if (!comparison) notFound();

  const allDimensions = comparison.programA.dimensions.map((d, i) => ({
    label: d.label,
    a: d.a,
    b: comparison.programB.dimensions[i]?.b ?? "",
  }));

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: comparison.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <main className="flex min-h-dvh flex-col bg-surface">
      <LandingNav />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqLd).replace(/</g, "\\u003c"),
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Compare Programs", href: "/compare" },
          { name: comparison.title },
        ]}
      />

      {/* Hero */}
      <section className="border-b border-border px-6 pb-12 pt-[100px]">
        <div className="mx-auto max-w-4xl">
          <div className="mb-4 flex items-center gap-2 text-sm text-text-subtle">
            <Link href="/" className="transition-colors hover:text-text">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-text-muted">Compare Programs</span>
          </div>
          <h1 className="mb-4 font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            {comparison.title}
          </h1>
          <p className="text-lg leading-relaxed text-text-muted">
            {comparison.description}
          </p>
        </div>
      </section>

      <TrustBar />

      {/* Comparison Table */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-xl border border-border">
            {/* Header */}
            <div className="grid grid-cols-3 border-b border-border bg-surface-dim">
              <div className="border-r border-border p-4" />
              <div className="border-r border-border p-4">
                <p className="font-semibold text-text">
                  {comparison.programA.name}
                </p>
                <p className="mt-0.5 text-xs text-text-subtle">
                  {comparison.programA.tagline}
                </p>
              </div>
              <div className="p-4">
                <p className="font-semibold text-text">
                  {comparison.programB.name}
                </p>
                <p className="mt-0.5 text-xs text-text-subtle">
                  {comparison.programB.tagline}
                </p>
              </div>
            </div>

            {/* Rows */}
            {allDimensions.map((dim, i) => (
              <div
                key={dim.label}
                className={`grid grid-cols-3 border-b border-border last:border-b-0 ${
                  i % 2 === 0 ? "bg-surface" : "bg-surface-dim/50"
                }`}
              >
                <div className="border-r border-border p-4">
                  <p className="text-sm font-medium text-text-muted">
                    {dim.label}
                  </p>
                </div>
                <div className="border-r border-border p-4">
                  <p className="text-sm text-text">{dim.a || "—"}</p>
                </div>
                <div className="p-4">
                  <p className="text-sm text-text">{dim.b || "—"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verdict */}
      <section className="border-y border-border bg-surface-dim px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-2 flex items-center gap-2">
            <Check className="h-5 w-5 text-brand" />
            <h2 className="font-display text-xl font-semibold text-text">
              Which is right for you?
            </h2>
          </div>
          <p className="mb-4 font-medium text-text">{comparison.verdict}</p>
          <p className="text-sm leading-relaxed text-text-muted">
            {comparison.verdictDetail}
          </p>
        </div>
      </section>

      {/* Dual CTA */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-3 font-display text-2xl font-semibold text-text">
            Check eligibility for both programs
          </h2>
          <p className="mb-8 text-text-muted">
            Answer a few questions and Benefind will tell you which programs you
            qualify for — including both {comparison.programA.name} and{" "}
            {comparison.programB.name}.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/screening"
              className="inline-flex items-center gap-2 rounded-lg bg-brand px-8 py-4 font-medium text-white transition-opacity hover:opacity-90"
            >
              Check {comparison.programA.name} Eligibility
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/screening"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-8 py-4 font-medium text-text transition-colors hover:border-brand/40"
            >
              Check {comparison.programB.name} Eligibility
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 font-display text-2xl font-semibold text-text">
            Frequently Asked Questions
          </h2>
          <div>
            {comparison.faqs.map((faq, i) => (
              <div
                key={i}
                className="border-b border-border py-6 last:border-b-0"
              >
                <h3 className="mb-3 font-medium text-text">{faq.q}</h3>
                <p className="text-sm leading-relaxed text-text-muted">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
