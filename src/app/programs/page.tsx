import type { Metadata } from "next";
import Link from "next/link";
import { createServerSupabase } from "@/lib/supabase/server";
import { listActivePrograms } from "@/lib/db/programs";
import { LandingNav } from "@/components/landing-nav";
import { ProgramFilters } from "./filters";
import {
  Heart,
  DollarSign,
  Home,
  Zap,
  GraduationCap,
  Receipt,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Government Benefit Programs | Benefind",
  description:
    "Browse all government benefit programs Benefind screens for. Filter by category, find eligibility requirements, and start your application.",
  alternates: { canonical: "https://benefind.app/programs" },
  openGraph: {
    title: "Government Benefit Programs | Benefind",
    description:
      "Browse all government benefit programs. Filter by category, check eligibility, apply.",
    url: "https://benefind.app/programs",
    siteName: "Benefind",
    locale: "en_US",
    type: "website",
  },
};

const CATEGORY_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  benefit: Heart,
  assistance: Home,
  grant: GraduationCap,
  tax_credit: Receipt,
  incentive: DollarSign,
  contracting: ShieldCheck,
};

const CATEGORY_LABELS: Record<string, string> = {
  benefit: "Benefits",
  assistance: "Assistance",
  grant: "Grants",
  tax_credit: "Tax Credits",
  incentive: "Incentives",
  contracting: "Contracting",
};

interface Props {
  searchParams: Promise<{ category?: string; q?: string }>;
}

export default async function ProgramsPage({ searchParams }: Props) {
  const params = await searchParams;
  const supabase = await createServerSupabase();

  const { data: programs, count } = await listActivePrograms(supabase, {
    category: params.category,
    pageSize: 100,
  });

  // Client-side search filtering (q param)
  const searchQuery = params.q?.toLowerCase().trim();
  const filtered = searchQuery
    ? (programs ?? []).filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery) ||
          p.description?.toLowerCase().includes(searchQuery) ||
          p.agency?.toLowerCase().includes(searchQuery),
      )
    : (programs ?? []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Government Benefit Programs",
    url: "https://benefind.app/programs",
    description: "Browse all government benefit programs Benefind screens for.",
    numberOfItems: filtered.length,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: filtered.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.name,
        url: `https://benefind.app/programs/${p.id}`,
      })),
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

        {/* Hero */}
        <div className="border-b border-dashed border-border">
          <div className="mx-auto max-w-[1520px] px-6 py-16 md:py-24">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-brand">
              [Programs Catalog]
            </p>
            <h1 className="mb-3 font-display text-3xl font-semibold tracking-tight text-text md:text-5xl">
              Every program we screen for.
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-text-muted md:text-lg">
              Browse {count ?? filtered.length} government benefit programs.
              Filter by category, check eligibility requirements, and find your
              next steps.
            </p>
          </div>
        </div>

        {/* Filters + Content */}
        <div className="mx-auto max-w-[1520px] px-6 py-12 md:py-16">
          <ProgramFilters
            activeCategory={params.category}
            searchQuery={params.q}
            categories={Object.entries(CATEGORY_LABELS).map(([k, v]) => ({
              value: k,
              label: v,
            }))}
          />

          {/* Program Cards */}
          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <ShieldCheck className="mx-auto mb-4 h-10 w-10 text-text-subtle" />
              <p className="text-sm text-text-muted">
                No programs match your filters. Try broadening your search.
              </p>
            </div>
          ) : (
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((program) => {
                const Icon = CATEGORY_ICONS[program.category] ?? ShieldCheck;
                const categoryLabel =
                  CATEGORY_LABELS[program.category] ?? program.category;

                return (
                  <Link
                    key={program.id}
                    href={`/programs/${program.id}`}
                    className="group block"
                  >
                    <article className="flex h-full flex-col rounded-xl border border-border bg-surface-dim p-5 transition-all hover:border-brand/40 hover:bg-surface-bright">
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/10">
                          <Icon
                            className="h-4.5 w-4.5 text-brand"
                            aria-hidden="true"
                          />
                        </div>
                        <span className="rounded bg-surface-bright px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-text-subtle">
                          {categoryLabel}
                        </span>
                      </div>

                      <h2 className="mb-2 text-base font-semibold text-text transition-colors group-hover:text-brand">
                        {program.name}
                      </h2>

                      <p className="mb-4 flex-1 text-sm leading-relaxed text-text-muted line-clamp-3">
                        {program.plain_language_summary ?? program.description}
                      </p>

                      {program.agency && (
                        <p className="mb-3 text-xs text-text-subtle">
                          {program.agency}
                        </p>
                      )}

                      <div className="flex items-center gap-1 text-sm font-medium text-brand">
                        View details
                        <ArrowRight
                          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
