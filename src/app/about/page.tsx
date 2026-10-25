import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Lock,
  Heart,
  Users,
  MapPin,
  Globe,
} from "lucide-react";
import { LandingNav } from "@/components/landing-nav";
import { Footer } from "@/components/footer";
import { TrustBar } from "@/components/trust-bar";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-jsonld";
import { getServerI18n } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "About Benefind | Making Benefits Accessible to Everyone",
  description:
    "Benefind is a free, private tool that helps individuals and families discover federal and state benefits they may be missing. Learn about our mission, how it works, and who built it.",
  alternates: { canonical: "https://benefind.app/about" },
  openGraph: {
    title: "About Benefind | Making Benefits Accessible to Everyone",
    description:
      "Benefind is a free, private tool that helps individuals and families discover federal and state benefits they may be missing.",
    url: "https://benefind.app/about",
    siteName: "Benefind",
    locale: "en_US",
    type: "website",
  },
};

const trustIcons = [Shield, Lock, Heart];

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Benefind",
  url: "https://benefind.app",
  description:
    "Benefind helps individuals and families find federal and state benefits they may be missing. Free, private, and available in 5 languages.",
  foundingDate: "2025",
  founder: {
    "@type": "Person",
    name: "Eric Smejkal",
    jobTitle: "Founder and Product Designer",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    url: "https://benefind.app/contact",
  },
};

export default async function AboutPage() {
  const { t } = await getServerI18n();
  const a = t.marketing.about;
  return (
    <main className="flex min-h-dvh flex-col bg-surface">
      <LandingNav />

      <BreadcrumbJsonLd
        items={[{ name: "Home", href: "/" }, { name: "About" }]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero */}
      <section className="border-b border-border px-6 pb-16 pt-[100px]">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 font-display text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            {a.heroTitle}
          </h1>
          <p className="text-lg leading-relaxed text-text-muted">
            {a.heroBody}
          </p>
        </div>
      </section>

      <TrustBar />

      {/* Mission */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 font-display text-2xl font-semibold text-text">
            {a.whyTitle}
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-text-muted">
            <p>{a.whyP1}</p>
            <p>{a.whyP2}</p>
            <p>{a.whyP3}</p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="border-y border-border bg-surface-dim px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center font-display text-2xl font-semibold text-text">
            {a.scaleTitle}
          </h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {a.impactStats.map((stat) => (
              <div key={stat.value} className="text-center">
                <p className="font-display text-4xl font-semibold text-text">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 font-display text-2xl font-semibold text-text">
            {a.howTitle}
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {a.steps.map((step, i) => (
              <div key={i} className="flex flex-col">
                <div className="mb-4 font-mono text-4xl font-bold text-brand/30">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mb-2 font-semibold text-text">{step.title}</h3>
                <p className="text-sm leading-relaxed text-text-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/screening"
              className="inline-flex items-center gap-2 rounded-lg bg-brand px-8 py-4 font-medium text-white transition-opacity hover:opacity-90"
            >
              {a.startScreening}
              <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
            </Link>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="border-y border-border bg-surface-dim px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 font-display text-2xl font-semibold text-text">
            {a.whoTitle}
          </h2>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-2xl">
              ES
            </div>
            <div>
              <p className="font-semibold text-text">Eric Smejkal</p>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-text-subtle">
                <span>{a.founderRole}</span>
                <span className="h-1 w-1 rounded-full bg-border" />
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {a.founderLocation}
                </span>
                <span className="h-1 w-1 rounded-full bg-border" />
                <span className="flex items-center gap-1">
                  <Globe className="h-3 w-3" /> {a.founderCompany}
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-text-muted">
                {a.founderP1}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                {a.founderP2}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center font-display text-2xl font-semibold text-text">
            {a.trustTitle}
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {a.trustBadges.map((badge, i) => {
              const Icon = trustIcons[i];
              return (
                <div
                  key={badge.title}
                  className="flex flex-col items-center rounded-xl border border-border bg-surface-dim p-6 text-center"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-brand/20 bg-brand/5">
                    <Icon className="h-5 w-5 text-brand" />
                  </div>
                  <p className="mb-1 font-semibold text-text">{badge.title}</p>
                  <p className="text-sm leading-relaxed text-text-muted">
                    {badge.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border bg-surface-dim px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-3 font-display text-2xl font-semibold text-text">
            {a.ctaTitle}
          </h2>
          <p className="mb-8 text-text-muted">{a.ctaSubtitle}</p>
          <Link
            href="/screening"
            className="inline-flex items-center gap-2 rounded-lg bg-brand px-8 py-4 font-medium text-white transition-opacity hover:opacity-90"
          >
            {a.ctaButton}
            <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
