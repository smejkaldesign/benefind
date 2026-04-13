import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import {
  getSituation,
  getAllSituationSlugs,
  situations,
} from "@/lib/situations";
import { LandingNav } from "@/components/landing-nav";
import { Footer } from "@/components/footer";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-jsonld";
import { TrustBar } from "@/components/trust-bar";

interface Props {
  params: Promise<{ situation: string }>;
}

export async function generateStaticParams() {
  return getAllSituationSlugs().map((situation) => ({ situation }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { situation: slug } = await params;
  const situation = getSituation(slug);
  if (!situation) return {};

  const title = `${situation.title} | Benefind`;
  const url = `https://benefind.app/benefits-for/${slug}`;

  return {
    title,
    description: situation.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: situation.description,
      url,
      siteName: "Benefind",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: situation.description,
    },
  };
}

const PROGRAM_ICONS: Record<string, string> = {
  snap: "🛒",
  medicaid: "🏥",
  "section-8": "🏠",
  ssi: "💰",
  ssdi: "💳",
  eitc: "📄",
  "pell-grant": "🎓",
  chip: "👶",
  wic: "🥛",
  tanf: "👨‍👩‍👧",
  liheap: "💡",
  medicare: "🏥",
  "aca-marketplace": "🏥",
  "gi-bill": "🎖️",
  "va-healthcare": "🏥",
  "va-disability": "🎖️",
  sbir: "🔬",
  "federal-work-study": "📚",
  "state-tuition-grants": "🎓",
  "unemployment-insurance": "💼",
  cobra: "🏥",
  wioa: "🔧",
  ccdf: "👶",
  "lis-extra-help": "💊",
  hecm: "🏡",
  "able-accounts": "💳",
  "rd-credit": "🔬",
};

export default async function SituationPage({ params }: Props) {
  const { situation: slug } = await params;
  const situation = getSituation(slug);
  if (!situation) notFound();

  const relatedSituations = situations.filter((s) =>
    situation.relatedSituations.includes(s.slug),
  );

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: situation.faqs.map((faq) => ({
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
          { name: "Benefits For", href: "/benefits-for" },
          { name: situation.title },
        ]}
      />

      {/* Hero */}
      <section className="border-b border-border px-6 pb-16 pt-[100px]">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 flex items-center gap-2 text-sm text-text-subtle">
            <Link href="/" className="transition-colors hover:text-text">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-text-muted">{situation.title}</span>
          </div>
          <h1 className="mb-4 font-display text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            {situation.hero}
          </h1>
          <p className="mb-8 text-lg leading-relaxed text-text-muted">
            {situation.description}
          </p>
          <Link
            href="/screening"
            className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
          >
            Check My Eligibility
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Trust Bar */}
      <TrustBar />

      {/* Programs Grid */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-2 font-display text-2xl font-semibold text-text">
            Programs you may qualify for
          </h2>
          <p className="mb-10 text-text-muted">
            These are the most relevant federal and state programs for your
            situation. Click any program to learn more.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {situation.programs.map((program) => {
              const icon = PROGRAM_ICONS[program.slug] ?? "📋";
              return (
                <Link
                  key={program.slug}
                  href={`/blog/${program.slug}-eligibility-2026`}
                  className="group flex flex-col rounded-xl border border-border bg-surface-dim p-5 transition-all hover:border-brand/40"
                >
                  <div className="mb-3 flex items-start gap-3">
                    <span className="text-2xl" aria-hidden="true">
                      {icon}
                    </span>
                    <div>
                      <p className="font-medium text-text">{program.name}</p>
                      <p className="mt-0.5 text-xs text-text-subtle">
                        {program.eligibilityHint}
                      </p>
                    </div>
                  </div>
                  <p className="mt-auto text-sm leading-relaxed text-text-muted">
                    {program.summary}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-medium text-brand opacity-0 transition-opacity group-hover:opacity-100">
                    Learn more <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-y border-border bg-surface-dim px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-3 font-display text-2xl font-semibold text-text">
            See exactly what you qualify for
          </h2>
          <p className="mb-8 text-text-muted">
            Answer a few questions and Benefind will match you with every
            program you may be eligible for — across all 50 states. Free,
            private, takes 5 minutes.
          </p>
          <Link
            href="/screening"
            className="inline-flex items-center gap-2 rounded-lg bg-brand px-8 py-4 font-medium text-white transition-opacity hover:opacity-90"
          >
            Start Free Screening
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 font-display text-2xl font-semibold text-text">
            Frequently Asked Questions
          </h2>
          <div>
            {situation.faqs.map((faq, i) => (
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

      {/* Related Situations */}
      {relatedSituations.length > 0 && (
        <section className="border-t border-border px-6 py-12">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-6 font-display text-xl font-semibold text-text">
              Related situations
            </h2>
            <div className="flex flex-wrap gap-3">
              {relatedSituations.map((related) => (
                <Link
                  key={related.slug}
                  href={`/benefits-for/${related.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-text-muted transition-colors hover:border-brand/40 hover:text-text"
                >
                  {related.title}
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
