import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/docs/breadcrumbs";

export const metadata: Metadata = {
  title: "Application Guides | Benefind Docs",
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
  // ── Existing guides ───────────────────────────────────────────────
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

  // ── Consumer program guides ───────────────────────────────────────
  {
    href: "/blog/medicaid-eligibility-2026",
    title: "Apply for Medicaid in every state",
    summary:
      "State-by-state Medicaid expansion rules, income limits, and application links for all 50 states and DC.",
    audience: "Consumer",
    status: "Published",
  },
  {
    href: "/blog/section-8-eligibility-2026",
    title: "Apply for Section 8 housing choice vouchers",
    summary:
      "How the waitlist works, how to get on multiple lists at once, and what to do while you wait.",
    audience: "Consumer",
    status: "Published",
  },
  {
    href: "/blog/ssi-eligibility-2026",
    title: "Apply for SSI (Supplemental Security Income)",
    summary:
      "Payment amounts, income and asset limits, who qualifies, and step-by-step application instructions.",
    audience: "Consumer",
    status: "Published",
  },
  {
    href: "/blog/eitc-eligibility-2026",
    title: "Claim the Earned Income Tax Credit",
    summary:
      "EITC income thresholds, credit amounts by filing status, and how to claim whether you file yourself or use free tax prep.",
    audience: "Consumer",
    status: "Published",
  },
  {
    href: "/blog/chip-eligibility-2026",
    title: "Enroll your child in CHIP",
    summary:
      "Income limits, what CHIP covers for kids, how it differs from Medicaid, and how to enroll in every state.",
    audience: "Consumer",
    status: "Published",
  },

  // ── Family guides ─────────────────────────────────────────────────
  {
    href: "/blog/wic-eligibility-2026",
    title: "Apply for WIC (food support for pregnancy and young children)",
    summary:
      "How WIC is different from SNAP, what it pays for, and how to enroll same-day at your county WIC office.",
    audience: "Family",
    status: "Published",
  },
  {
    href: "/blog/pell-grant-eligibility-2026",
    title: "Apply for the Pell Grant (2026-2027)",
    summary:
      "Maximum award amounts, EFC cutoffs, FAFSA deadlines, and tips to maximize your Pell Grant for college.",
    audience: "Family",
    status: "Published",
  },

  // ── Business program guides ───────────────────────────────────────
  {
    href: "/blog/wotc-tax-credit-2026",
    title: "Claim the Work Opportunity Tax Credit (WOTC)",
    summary:
      "Target groups, credit amounts per hire, certification steps, and how to claim WOTC on your tax return.",
    audience: "Business",
    status: "Published",
  },
  {
    href: "/blog/sbir-sttr-grants-2026",
    title: "Apply for SBIR/STTR small business innovation grants",
    summary:
      "The Phase I/Phase II/Phase III structure, which agencies fund which kinds of work, and how to win your first award.",
    audience: "Business",
    status: "Published",
  },
  {
    href: "/blog/sba-8a-program-2026",
    title: "Apply for the SBA 8(a) Business Development Program",
    summary:
      "Eligibility criteria, application process, sole-source contract benefits, and how to maximize the nine-year program term.",
    audience: "Business",
    status: "Published",
  },
  {
    href: "/blog/clean-energy-itc-2026",
    title: "Claim the Clean Energy Investment Tax Credit (Section 48)",
    summary:
      "ITC rates, bonus adders for domestic content and energy communities, eligible technologies, and how to claim the credit.",
    audience: "Business",
    status: "Published",
  },
  {
    href: "/blog/opportunity-zones-2026",
    title: "Invest in Opportunity Zones for tax benefits",
    summary:
      "How Opportunity Zones defer and reduce capital gains taxes, qualified fund requirements, and key deadlines.",
    audience: "Business",
    status: "Published",
  },
  {
    href: "/blog/step-export-grants-2026",
    title: "Get STEP export grants for international expansion",
    summary:
      "Eligible export activities, award amounts by state, and application tips for first-time exporters.",
    audience: "Business",
    status: "Published",
  },
  {
    href: "/blog/usda-rural-business-grants-2026",
    title: "Apply for USDA Rural Business Development Grants",
    summary:
      "RBDG eligibility, grant amounts, rural area definitions, and application steps for small businesses and nonprofits.",
    audience: "Business",
    status: "Published",
  },
  {
    href: "/blog/state-workforce-training-grants-2026",
    title: "Find state workforce training grants",
    summary:
      "State-by-state workforce training grants, reimbursement rates, eligible training types, and how to apply.",
    audience: "Business",
    status: "Published",
  },
  {
    href: "/blog/small-business-grants-2026",
    title: "Small business grants you can actually get",
    summary:
      "Curated list of federal and state small business grants with real eligibility requirements and application links.",
    audience: "Business",
    status: "Published",
  },

  // ── Supporting / cross-cutting guides ─────────────────────────────
  {
    href: "/blog/government-benefits-for-veterans-2026",
    title: "Government benefits for veterans",
    summary:
      "VA healthcare, disability compensation, education benefits, home loans, and other federal programs for veterans.",
    audience: "Consumer",
    status: "Published",
  },
  {
    href: "/blog/snap-benefits-college-students-2026",
    title: "SNAP benefits for college students",
    summary:
      "Student exemptions, work-study rules, state waivers, and how to apply if you're enrolled in higher education.",
    audience: "Consumer",
    status: "Published",
  },
  {
    href: "/blog/medicaid-vs-medicare-2026",
    title: "Medicaid vs Medicare: what's the difference?",
    summary:
      "Side-by-side comparison of eligibility, coverage, costs, and how to know which program is right for you.",
    audience: "Consumer",
    status: "Published",
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
