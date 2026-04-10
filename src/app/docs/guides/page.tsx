import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/docs/breadcrumbs";

export const metadata: Metadata = {
  title: "Application Guides — Benefind Docs",
  description:
    "Step-by-step guides for applying to SNAP, LIHEAP, Medicaid, R&D tax credits, and every other program Benefind screens for.",
  alternates: { canonical: "https://benefind.app/docs/guides" },
};

interface Guide {
  href: string;
  title: string;
  summary: string;
  audience: "Consumer" | "Business" | "Family";
  status: "Published" | "Coming soon";
}

const GUIDES: Guide[] = [
  {
    href: "/blog/snap-eligibility-2026",
    title: "Apply for SNAP (food stamps)",
    summary:
      "Income limits, asset rules, work requirements, and the exact state-by-state application steps.",
    audience: "Consumer",
    status: "Published",
  },
  {
    href: "/blog/how-to-apply-for-liheap-heating-assistance",
    title: "Apply for LIHEAP heating assistance",
    summary:
      "How to apply, what documents to bring, and how to fast-track a crisis application.",
    audience: "Consumer",
    status: "Published",
  },
  {
    href: "/blog/rd-tax-credit-small-business-2026",
    title: "Claim the R&D tax credit for your small business",
    summary:
      "The four-part test, what counts as qualified expenditures, and how to use the payroll offset for pre-revenue startups.",
    audience: "Business",
    status: "Published",
  },
  {
    href: "/blog/free-government-grants-single-mothers",
    title: "Real programs for single mothers (not the scams)",
    summary:
      "The 10 real programs that help single-parent households with rent, food, child care, health care, and cash assistance.",
    audience: "Family",
    status: "Published",
  },
  {
    href: "/blog/what-government-benefits-do-i-qualify-for",
    title: "Find out what government benefits you qualify for",
    summary:
      "The seven categories of benefits most households should check, and the fastest way to run through them.",
    audience: "Consumer",
    status: "Published",
  },
  {
    href: "#",
    title: "Apply for Medicaid in every state",
    summary:
      "State-by-state Medicaid expansion rules, income limits, and application links for all 50 states and DC.",
    audience: "Consumer",
    status: "Coming soon",
  },
  {
    href: "#",
    title: "Apply for WIC (food support for pregnancy and young children)",
    summary:
      "How WIC is different from SNAP, what it pays for, and how to enroll same-day at your county WIC office.",
    audience: "Family",
    status: "Coming soon",
  },
  {
    href: "#",
    title: "Apply for SBIR/STTR small business innovation grants",
    summary:
      "The Phase I/Phase II/Phase III structure, which agencies fund which kinds of work, and how to win your first award.",
    audience: "Business",
    status: "Coming soon",
  },
  {
    href: "#",
    title: "Apply for Section 8 housing choice vouchers",
    summary:
      "How the waitlist works, how to get on multiple lists at once, and what to do while you wait.",
    audience: "Consumer",
    status: "Coming soon",
  },
];

const BADGE_COLORS: Record<Guide["audience"], string> = {
  Consumer: "bg-brand/10 text-brand",
  Business: "bg-surface-bright text-text-muted",
  Family: "bg-brand-50 text-brand-light",
};

export default function GuidesPage() {
  return (
    <>
      <Breadcrumbs
        items={[{ label: "Docs", href: "/docs" }, { label: "Guides" }]}
      />

      <header className="mb-10">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-brand">
          [Guides]
        </p>
        <h1 className="mb-3 font-display text-3xl font-semibold tracking-tight text-text md:text-4xl">
          Application guides
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-text-muted md:text-lg">
          Step-by-step walkthroughs for applying to the programs Benefind
          covers. Each guide includes the rules, the documents you need, and the
          exact application path for each state.
        </p>
      </header>

      <ul className="flex flex-col divide-y divide-border rounded-xl border border-border bg-surface-dim">
        {GUIDES.map((guide) => {
          const isPublished = guide.status === "Published";
          const containerClass = `flex flex-col gap-2 px-6 py-5 transition-colors sm:flex-row sm:items-start sm:justify-between ${
            isPublished
              ? "cursor-pointer hover:bg-surface-bright"
              : "opacity-60"
          }`;
          const inner = (
            <>
              <div className="flex-1">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-base font-semibold text-text">
                    {guide.title}
                  </h2>
                  <span
                    className={`rounded px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${BADGE_COLORS[guide.audience]}`}
                  >
                    {guide.audience}
                  </span>
                  {!isPublished && (
                    <span className="rounded bg-surface-bright px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-text-subtle">
                      Coming soon
                    </span>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-text-muted">
                  {guide.summary}
                </p>
              </div>
              {isPublished && (
                <span className="shrink-0 text-sm font-medium text-brand">
                  Read →
                </span>
              )}
            </>
          );
          return (
            <li key={guide.title}>
              {isPublished ? (
                <Link href={guide.href} className={containerClass}>
                  {inner}
                </Link>
              ) : (
                <div className={containerClass}>{inner}</div>
              )}
            </li>
          );
        })}
      </ul>

      <section className="mt-10 rounded-xl border border-dashed border-border bg-surface-dim p-6">
        <h2 className="mb-2 font-display text-lg font-semibold text-text">
          Want a guide we haven&apos;t written yet?
        </h2>
        <p className="text-sm leading-relaxed text-text-muted">
          Tell us which program you want a step-by-step guide for, and
          we&apos;ll prioritize it.{" "}
          <Link href="/contact" className="text-brand hover:underline">
            Contact us →
          </Link>
        </p>
      </section>
    </>
  );
}
