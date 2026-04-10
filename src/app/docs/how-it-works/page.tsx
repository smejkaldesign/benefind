import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, MessageSquare, Users, Lock } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Breadcrumbs } from "@/components/docs/breadcrumbs";

export const metadata: Metadata = {
  title: "How Benefind Works | Documentation",
  description:
    "The deep version of how Benefind screens you against 80+ federal and state benefit programs, in plain language, with privacy by default.",
  alternates: { canonical: "https://benefind.app/docs/how-it-works" },
};

interface Pillar {
  icon: LucideIcon;
  title: string;
  tagline: string;
  body: string[];
  example?: { label: string; text: string };
}

const PILLARS: Pillar[] = [
  {
    icon: Sparkles,
    title: "AI-Powered Screening",
    tagline: "2 minutes of questions, 80+ programs checked.",
    body: [
      "Traditional eligibility portals ask you the same questions 80 different times, once per program. Benefind asks each question once and reuses your answers across every program we check. A typical intake is about 20 questions, and most people finish in under 3 minutes.",
      "Under the hood, we use structured rule sets for every program, the same eligibility rules the agencies use, plus an LLM layer that handles the ambiguous cases (like what counts as a household member when you have roommates, or whether self-employed income counts differently for SNAP vs Medicaid).",
      "You only answer a question if the answer could actually change your eligibility. If you've already told us you're not a veteran, we don't ask you about VA benefits again.",
    ],
    example: {
      label: "Example",
      text: "A single parent with 2 kids earning $2,400/month says so once. Benefind checks SNAP (qualifies), Medicaid (qualifies), WIC (qualifies), LIHEAP (qualifies), Section 8 (waitlist), CHIP (kids qualify), and TANF (qualifies in most states) in about 3 minutes.",
    },
  },
  {
    icon: MessageSquare,
    title: "Plain Language",
    tagline: "No jargon. No policy-speak. Clear next steps.",
    body: [
      "Government eligibility language is notoriously bad, often still written at college reading level and sprinkled with acronyms. Benefind translates every rule into clear, action-oriented language. We tell you exactly what the rule means, why it matters, and what document you'll need to prove it.",
      "When you see a result, you don't just get 'You may be eligible for SNAP.' You get: 'You probably qualify for about $520/month of SNAP benefits. To apply, you'll need your last 4 paystubs and a utility bill. It takes about 30 minutes and approval usually comes in 10 days.'",
      "We also explain what happens if you get denied, what your appeal rights are, and how long benefits typically last. The whole system is built to answer the questions a good benefits navigator would answer.",
    ],
    example: {
      label: "Before / after",
      text: 'Traditional: "Applicant must demonstrate gross income at or below 130% FPL based on MAGI methodology." Benefind: "Your household earns under about $3,485/month, so you qualify. We\'ll need a recent paystub to confirm."',
    },
  },
  {
    icon: Users,
    title: "People and Companies",
    tagline: "One platform for both consumer benefits and business incentives.",
    body: [
      "Most benefits tools focus on either the consumer side (SNAP, Medicaid, housing) or the business side (R&D tax credits, SBIR grants). Benefind does both. Individuals run the consumer screener. Small-business owners run the company screener. If you're both, like a solo founder who also qualifies for SNAP, you can use both.",
      "On the consumer side we cover SNAP, WIC, Medicaid, CHIP, LIHEAP, Section 8, TANF, SSI, SSDI, EITC, Child Tax Credit, Pell Grants, Head Start, and dozens of state-specific programs. On the business side we cover R&D tax credits, SBIR/STTR grants, WOTC, state-level small business incentives, and industry-specific programs.",
      "Both sides share the same underlying rule engine, so adding new programs is structured, and updates when rules change propagate everywhere.",
    ],
    example: {
      label: "Example",
      text: "A solo founder pre-revenue startup runs both screeners. The consumer screener says she qualifies for Medicaid and ACA subsidies. The company screener says her startup qualifies for about $30k in R&D tax credits she can offset against payroll taxes immediately.",
    },
  },
  {
    icon: Lock,
    title: "Privacy by Design",
    tagline: "Your data stays on your device. No signup. No tracking.",
    body: [
      "Benefind doesn't require an account, an email, or a phone number to run the screener. All of your answers live in your browser's local storage and are never uploaded to a server by default. If you want to save your results across devices, you can opt in to creating an account, but it's always optional.",
      "We also don't sell data. We don't show ads. We don't share your info with third-party marketers. The business model is: free for individuals, paid tiers for companies and enterprise integrations.",
      "For users who are undocumented, between immigration statuses, or otherwise cautious about government systems, privacy by default is non-negotiable. Benefind is built for you too.",
    ],
    example: {
      label: "What we DO and DO NOT store",
      text: "We DO NOT store: your name, SSN, address, income, household details, or results, unless you create an account. We DO store (anonymously): aggregate metrics about which programs people qualify for, to improve our rule coverage.",
    },
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Breadcrumbs
        items={[{ label: "Docs", href: "/docs" }, { label: "How it works" }]}
      />

      <header className="mb-10">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-brand">
          [How it works]
        </p>
        <h1 className="mb-3 font-display text-3xl font-semibold tracking-tight text-text md:text-4xl">
          How Benefind works
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-text-muted md:text-lg">
          The four pillars of Benefind, with real examples of what they look
          like in practice. If you only read one doc, read this one.
        </p>
      </header>

      <div className="flex flex-col gap-12">
        {PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <section key={pillar.title}>
              <div className="mb-4 flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg border border-border bg-surface-dim text-brand">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h2 className="font-display text-2xl font-semibold text-text">
                    {pillar.title}
                  </h2>
                  <p className="text-sm text-text-subtle">{pillar.tagline}</p>
                </div>
              </div>
              <div className="flex flex-col gap-4 text-base leading-relaxed text-text-muted">
                {pillar.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              {pillar.example && (
                <div className="mt-4 rounded-lg border border-dashed border-border bg-surface-dim p-4">
                  <p className="mb-1 font-mono text-[11px] uppercase tracking-widest text-brand">
                    {pillar.example.label}
                  </p>
                  <p className="text-sm leading-relaxed text-text-muted">
                    {pillar.example.text}
                  </p>
                </div>
              )}
            </section>
          );
        })}
      </div>

      <section className="mt-16 rounded-xl border border-border bg-surface-dim p-6">
        <h2 className="mb-2 font-display text-lg font-semibold text-text">
          Ready to try it?
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-text-muted">
          Run the consumer screener or the company screener, both take about 3
          minutes and neither requires an account.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/screening"
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-surface transition-colors hover:bg-brand-light"
          >
            For individuals →
          </Link>
          <Link
            href="/screening/company"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-semibold text-text transition-colors hover:border-brand/40 hover:text-brand"
          >
            For companies →
          </Link>
        </div>
      </section>
    </>
  );
}
