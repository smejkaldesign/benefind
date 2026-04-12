import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LandingNav } from "@/components/landing-nav";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-jsonld";
import {
  getStateOverlay,
  getNeighboringStates,
  getAllStateProgramParams,
  PROGRAM_GUIDES,
} from "@/lib/state-programs";
import {
  ArrowLeft,
  ExternalLink,
  Clock,
  DollarSign,
  FileText,
  MapPin,
  ArrowRight,
} from "lucide-react";

interface Props {
  params: Promise<{ id: string; state: string }>;
}

export function generateStaticParams() {
  return getAllStateProgramParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, state } = await params;
  const overlay = getStateOverlay(id, state);
  if (!overlay) return { title: "Not Found | Benefind" };

  const title = `${overlay.stateProgramName} Eligibility 2026 | Benefind`;
  const url = `https://benefind.app/programs/${id}/${state.toLowerCase()}`;
  const description = `How to apply for ${overlay.stateProgramName} in ${overlay.state}. Income limits, application portal, processing times, and eligibility details for 2026.`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Benefind",
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function StateOverlayPage({ params }: Props) {
  const { id, state } = await params;
  const overlay = getStateOverlay(id, state);
  if (!overlay) notFound();

  const neighbors = getNeighboringStates(id, state);
  const guide = PROGRAM_GUIDES[id];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "GovernmentService",
    name: overlay.stateProgramName,
    description: `${overlay.stateProgramName} eligibility, income limits, and application details for ${overlay.state} residents.`,
    provider: {
      "@type": "GovernmentOrganization",
      name: `${overlay.state} Department of Human Services`,
    },
    url: `https://benefind.app/programs/${id}/${state.toLowerCase()}`,
    serviceType: overlay.programName,
    areaServed: {
      "@type": "State",
      name: overlay.state,
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: overlay.portalUrl,
      name: overlay.applicationPortal,
    },
  };

  return (
    <>
      <LandingNav />
      <main className="min-h-screen bg-surface pt-[4.5rem] text-text">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <BreadcrumbJsonLd
          items={[
            { name: "Home", href: "/" },
            { name: "Programs", href: "/programs" },
            { name: overlay.programName, href: guide?.href ?? "/programs" },
            { name: `${overlay.stateProgramName} (${overlay.state})` },
          ]}
        />

        {/* Header */}
        <div className="border-b border-dashed border-border">
          <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
            <Link
              href={guide?.href ?? "/programs"}
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-brand transition-colors"
              aria-label={`Back to ${overlay.programName} guide`}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {guide?.label ?? "All Programs"}
            </Link>

            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-brand">
              [{overlay.programName} &middot; {overlay.state}]
            </p>
            <h1 className="mb-4 font-display text-3xl font-semibold tracking-tight text-text md:text-4xl">
              {overlay.stateProgramName} Eligibility 2026
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-text-muted md:text-lg">
              Everything you need to know about applying for{" "}
              {overlay.stateProgramName} in {overlay.state}, including income
              limits, the application portal, and processing times.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16 space-y-10">
          {/* TL;DR box */}
          <section className="rounded-xl border border-brand/20 bg-brand/5 p-6 md:p-8">
            <h2 className="mb-4 font-display text-xl font-semibold text-text">
              TL;DR
            </h2>
            <ul className="space-y-2 text-sm text-text-muted leading-relaxed">
              <li>
                <strong className="text-text">Program:</strong>{" "}
                {overlay.stateProgramName}
              </li>
              <li>
                <strong className="text-text">Income limit:</strong>{" "}
                {overlay.incomeLimits}
              </li>
              <li>
                <strong className="text-text">Apply at:</strong>{" "}
                <a
                  href={overlay.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:text-brand-dark transition-colors"
                >
                  {overlay.applicationPortal}{" "}
                  <ExternalLink
                    className="ml-0.5 inline h-3 w-3"
                    aria-hidden="true"
                  />
                </a>
              </li>
              <li>
                <strong className="text-text">Processing:</strong>{" "}
                {overlay.processingTime}
              </li>
            </ul>
          </section>

          {/* Income limits */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="h-5 w-5 text-brand" aria-hidden="true" />
              <h2 className="font-display text-xl font-semibold text-text">
                Income Limits in {overlay.state}
              </h2>
            </div>
            <div className="rounded-lg border border-border bg-surface-dim p-5">
              <p className="text-base text-text-muted leading-relaxed">
                {overlay.incomeLimits}
              </p>
              <p className="mt-3 text-sm text-text-subtle">
                Federal Poverty Level (FPL) thresholds are updated annually.
                These limits apply to gross household income before deductions
                unless otherwise noted.
              </p>
            </div>
          </section>

          {/* Application portal */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-5 w-5 text-brand" aria-hidden="true" />
              <h2 className="font-display text-xl font-semibold text-text">
                How to Apply in {overlay.state}
              </h2>
            </div>
            <div className="rounded-lg border border-border bg-surface-dim p-5 space-y-4">
              <div>
                <p className="text-sm font-medium text-text mb-1">
                  Application Portal
                </p>
                <a
                  href={overlay.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-brand hover:text-brand-dark transition-colors"
                >
                  {overlay.applicationPortal}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
              <div>
                <p className="text-sm font-medium text-text mb-1">
                  What You Need
                </p>
                <ul className="list-disc list-inside text-sm text-text-muted space-y-1">
                  <li>
                    Proof of identity (driver&apos;s license, state ID, or
                    passport)
                  </li>
                  <li>Social Security numbers for all household members</li>
                  <li>
                    Proof of income (pay stubs, tax returns, benefit letters)
                  </li>
                  <li>Proof of residency in {overlay.state}</li>
                  <li>Bank statements and asset information</li>
                </ul>
              </div>
              {overlay.notes && (
                <p className="text-sm text-text-subtle italic border-t border-border pt-3">
                  {overlay.notes}
                </p>
              )}
            </div>
          </section>

          {/* Processing times */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Clock className="h-5 w-5 text-brand" aria-hidden="true" />
              <h2 className="font-display text-xl font-semibold text-text">
                Processing Times
              </h2>
            </div>
            <div className="rounded-lg border border-border bg-surface-dim p-5">
              <p className="text-base text-text-muted leading-relaxed">
                {overlay.processingTime}
              </p>
              <p className="mt-3 text-sm text-text-subtle">
                Processing times are mandated by federal regulations but actual
                wait times may vary. Contact your local office if your
                application has been pending longer than expected.
              </p>
            </div>
          </section>

          {/* CTA */}
          <div className="flex flex-col items-center gap-4 rounded-xl border border-brand/20 bg-brand/5 p-8 text-center">
            <FileText className="h-8 w-8 text-brand" aria-hidden="true" />
            <div>
              <p className="text-lg font-semibold text-text">
                Not sure if you qualify?
              </p>
              <p className="text-sm text-text-muted">
                Answer a few questions and we will check your eligibility for{" "}
                {overlay.stateProgramName} and other programs in {overlay.state}
                .
              </p>
            </div>
            <Link
              href="/screening"
              className="rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-surface transition-colors hover:bg-brand-dark focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
            >
              Start Free Screening
            </Link>
          </div>

          {/* Parent guide link */}
          {guide && (
            <section>
              <h2 className="mb-4 font-display text-xl font-semibold text-text">
                Learn More About {overlay.programName}
              </h2>
              <p className="text-sm text-text-muted">
                Read our comprehensive{" "}
                <Link
                  href={guide.href}
                  className="text-brand hover:text-brand-dark transition-colors"
                >
                  {guide.label}
                </Link>{" "}
                for federal-level rules, deduction calculations, and frequently
                asked questions.
              </p>
            </section>
          )}

          {/* Neighboring states */}
          {neighbors.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="h-5 w-5 text-brand" aria-hidden="true" />
                <h2 className="font-display text-xl font-semibold text-text">
                  {overlay.programName} in Other States
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {neighbors.map((n) => (
                  <Link
                    key={n.stateCode}
                    href={`/programs/${n.programSlug}/${n.stateCode.toLowerCase()}`}
                    className="group flex items-center justify-between rounded-lg border border-border bg-surface-dim p-4 transition-colors hover:border-brand/40"
                  >
                    <div>
                      <p className="text-sm font-medium text-text group-hover:text-brand transition-colors">
                        {n.stateProgramName}
                      </p>
                      <p className="text-xs text-text-subtle">{n.state}</p>
                    </div>
                    <ArrowRight
                      className="h-4 w-4 text-text-subtle group-hover:text-brand transition-colors"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
