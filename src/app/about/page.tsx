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

const impactStats = [
  { value: "80+", label: "Federal and state programs" },
  { value: "50", label: "States covered" },
  { value: "5", label: "Languages" },
  { value: "$0", label: "Cost to use, forever" },
];

const steps = [
  {
    number: "01",
    title: "Answer a few questions",
    description:
      "We ask about your household size, income, and situation — no account required. Takes about 5 minutes.",
  },
  {
    number: "02",
    title: "AI matches your profile",
    description:
      "Our system checks your answers against eligibility rules for 80+ programs across every state.",
  },
  {
    number: "03",
    title: "See your results",
    description:
      "You get a personalized list of programs you likely qualify for, with instructions on how to apply.",
  },
];

const trustBadges = [
  {
    icon: Shield,
    title: "Free",
    description:
      "Benefind will always be free to use. No subscriptions, no paywalls.",
  },
  {
    icon: Lock,
    title: "Private",
    description:
      "We don't sell your data or track you across the web. Your answers are yours.",
  },
  {
    icon: Heart,
    title: "No Tracking",
    description:
      "No advertising. No data brokers. No hidden costs. Just answers.",
  },
];

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

export default function AboutPage() {
  return (
    <main className="flex min-h-dvh flex-col bg-surface">
      <LandingNav />

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
            Making Benefits Accessible to Everyone
          </h1>
          <p className="text-lg leading-relaxed text-text-muted">
            Every year, billions of dollars in benefits go unclaimed — not
            because people don't qualify, but because the system is too
            complicated to navigate. Benefind exists to fix that.
          </p>
        </div>
      </section>

      <TrustBar />

      {/* Mission */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 font-display text-2xl font-semibold text-text">
            Why we built this
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-text-muted">
            <p>
              The federal benefits system was designed agency by agency, not
              person by person. SNAP, Medicaid, Section 8, the EITC, WIC — each
              program has its own application, its own office, its own language.
              You have to know they exist before you can access them.
            </p>
            <p>
              An estimated 20% of SNAP-eligible households never claim benefits.
              About $60 billion in tax credits go unclaimed each year. Families
              cycle through emergency rooms because they never discovered they
              qualify for Medicaid.
            </p>
            <p>
              Benefind is a free screening tool that asks a few simple questions
              and tells you every program you may qualify for — in plain English
              (or Spanish, or four other languages), with no account required
              and nothing to sell you.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="border-y border-border bg-surface-dim px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center font-display text-2xl font-semibold text-text">
            Built to scale
          </h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {impactStats.map((stat) => (
              <div key={stat.label} className="text-center">
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
            How it works
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col">
                <div className="mb-4 font-mono text-4xl font-bold text-brand/30">
                  {step.number}
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
              Start My Free Screening
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="border-y border-border bg-surface-dim px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 font-display text-2xl font-semibold text-text">
            Who built this
          </h2>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-2xl">
              ES
            </div>
            <div>
              <p className="font-semibold text-text">Eric Smejkal</p>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-text-subtle">
                <span>Product Designer</span>
                <span className="h-1 w-1 rounded-full bg-border" />
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> United States
                </span>
                <span className="h-1 w-1 rounded-full bg-border" />
                <span className="flex items-center gap-1">
                  <Globe className="h-3 w-3" /> Notable Health (healthcare)
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-text-muted">
                Eric is a product designer with a background in healthcare
                software. Working in the healthcare industry made the complexity
                of the benefits system viscerally real — watching people fall
                through the cracks of a system they didn't know how to navigate
                was the motivation for building Benefind.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                Benefind is an independent project built with a belief that
                access to public programs should not require a social worker, an
                attorney, or a lot of free time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center font-display text-2xl font-semibold text-text">
            Free. Private. No Tracking.
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {trustBadges.map((badge) => {
              const Icon = badge.icon;
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
            Ready to see what you qualify for?
          </h2>
          <p className="mb-8 text-text-muted">
            It takes 5 minutes. No account required. Completely free.
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

      <Footer />
    </main>
  );
}
