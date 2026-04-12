import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";
import { getProgram, listActivePrograms } from "@/lib/db/programs";
import { LandingNav } from "@/components/landing-nav";
import {
  ArrowLeft,
  ExternalLink,
  Clock,
  Building2,
  CheckCircle2,
  FileText,
} from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

// Return empty array: pages are generated on-demand via ISR.
// We can't call createServerSupabase() here because generateStaticParams
// runs at build time outside a request scope (no cookies).
export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createServerSupabase();
  const { data: program } = await getProgram(supabase, id);

  if (!program) return { title: "Program Not Found | Benefind" };

  const title = program.seo_title ?? `${program.name} | Benefind`;
  const description =
    program.seo_description ??
    program.plain_language_summary ??
    program.description ??
    "";

  return {
    title,
    description,
    alternates: { canonical: `https://benefind.app/programs/${id}` },
    openGraph: {
      title,
      description,
      url: `https://benefind.app/programs/${id}`,
      siteName: "Benefind",
      locale: "en_US",
      type: "article",
    },
  };
}

export default async function ProgramDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createServerSupabase();
  const { data: program } = await getProgram(supabase, id);

  if (!program) notFound();

  const eligibility =
    (program.eligibility_criteria as Record<string, unknown>) ?? {};

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "GovernmentService",
    name: program.name,
    description: program.plain_language_summary ?? program.description,
    provider: {
      "@type": "GovernmentOrganization",
      name: program.agency ?? "U.S. Government",
    },
    url: `https://benefind.app/programs/${program.id}`,
    serviceType: program.category,
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

        {/* Breadcrumb + Back */}
        <div className="border-b border-dashed border-border">
          <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
            <Link
              href="/programs"
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-brand transition-colors"
              aria-label="Back to programs catalog"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All Programs
            </Link>

            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-brand">
              [{program.category.replace("_", " ")}]
            </p>
            <h1 className="mb-4 font-display text-3xl font-semibold tracking-tight text-text md:text-4xl">
              {program.name}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-text-muted md:text-lg">
              {program.plain_language_summary ?? program.description}
            </p>

            {program.agency && (
              <div className="mt-4 flex items-center gap-2 text-sm text-text-subtle">
                <Building2 className="h-4 w-4" aria-hidden="true" />
                {program.agency}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16 space-y-10">
          {/* Eligibility */}
          {Object.keys(eligibility).length > 0 && (
            <section>
              <h2 className="mb-4 font-display text-xl font-semibold text-text">
                Eligibility Requirements
              </h2>
              <div className="space-y-3">
                {Object.entries(eligibility).map(([key, value]) => {
                  if (key === "notes") return null;
                  const label = key
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase());
                  return (
                    <div
                      key={key}
                      className="flex items-start gap-3 rounded-lg border border-border bg-surface-dim p-4"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-sm font-medium text-text">{label}</p>
                        <p className="text-sm text-text-muted">
                          {String(value)}
                        </p>
                      </div>
                    </div>
                  );
                })}
                {typeof (eligibility as Record<string, unknown>).notes ===
                  "string" && (
                  <p className="text-sm text-text-muted italic">
                    {(eligibility as Record<string, unknown>).notes as string}
                  </p>
                )}
              </div>
            </section>
          )}

          {/* Award Info */}
          {program.typical_award && (
            <section>
              <h2 className="mb-4 font-display text-xl font-semibold text-text">
                Typical Award
              </h2>
              <p className="text-base text-text-muted">
                {program.typical_award}
              </p>
            </section>
          )}

          {/* Deadline */}
          {program.deadline_info && (
            <section className="flex items-start gap-3 rounded-lg border border-warning/30 bg-warning/5 p-4">
              <Clock
                className="mt-0.5 h-5 w-5 shrink-0 text-warning"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-medium text-text">Deadline</p>
                <p className="text-sm text-text-muted">
                  {program.deadline_info}
                </p>
              </div>
            </section>
          )}

          {/* CTA */}
          <div className="flex flex-col items-center gap-4 rounded-xl border border-brand/20 bg-brand/5 p-8 text-center">
            <FileText className="h-8 w-8 text-brand" aria-hidden="true" />
            <div>
              <p className="text-lg font-semibold text-text">
                Check your eligibility
              </p>
              <p className="text-sm text-text-muted">
                Answer a few questions and we will tell you if you qualify.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/screening"
                className="rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-surface transition-colors hover:bg-brand-dark focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
              >
                Start Screening
              </Link>
              {program.application_url && (
                <a
                  href={program.application_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Apply for ${program.name} (opens in new tab)`}
                  className="rounded-lg border border-border px-6 py-3 text-sm font-semibold text-text-muted transition-colors hover:border-brand hover:text-brand focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
                >
                  Apply Now{" "}
                  <ExternalLink
                    className="ml-1 inline h-3.5 w-3.5"
                    aria-hidden="true"
                  />
                </a>
              )}
            </div>
          </div>

          {/* Related programs */}
          <section>
            <h2 className="mb-4 font-display text-xl font-semibold text-text">
              Related Programs
            </h2>
            <p className="text-sm text-text-muted">
              <Link
                href={`/programs?category=${program.category}`}
                className="text-brand hover:text-brand-dark"
              >
                Browse all {program.category.replace("_", " ")} programs
              </Link>{" "}
              or{" "}
              <Link
                href="/screening"
                className="text-brand hover:text-brand-dark"
              >
                run a full screening
              </Link>{" "}
              to see everything you qualify for.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
