import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/docs/breadcrumbs";

export const metadata: Metadata = {
  title: "Documentation | Benefind",
  description:
    "Everything you need to know about how Benefind works, how to apply for benefits, and how to integrate with us.",
  alternates: { canonical: "https://benefind.app/docs" },
};

interface DocCard {
  href: string;
  title: string;
  description: string;
}

const CARDS: DocCard[] = [
  {
    href: "/docs/how-it-works",
    title: "How Benefind works",
    description:
      "The deep version of the landing-page bento: what each value prop means in practice, with real examples.",
  },
  {
    href: "/docs/guides",
    title: "Application guides",
    description:
      "Step-by-step walkthroughs for applying to SNAP, LIHEAP, Medicaid, R&D tax credits, and more.",
  },
  {
    href: "/docs/design-system",
    title: "Design system",
    description:
      "Benefind brand tokens, typography, colors, spacing, and button variants. For designers and contributors.",
  },
  {
    href: "/docs/privacy",
    title: "Privacy policy",
    description:
      "How Benefind handles your data, what we collect, what we don't, and your rights.",
  },
  {
    href: "/blog",
    title: "Blog",
    description:
      "Deep guides on specific programs and eligibility rules. Updated weekly.",
  },
];

export default function DocsIndexPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Docs" }]} />

      <header className="mb-10">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-brand">
          [Documentation]
        </p>
        <h1 className="mb-3 font-display text-3xl font-semibold tracking-tight text-text md:text-4xl">
          Everything about Benefind, in one place.
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-text-muted md:text-lg">
          Guides to how Benefind works, how to apply for specific benefits, and
          how to build on top of our screening tools. If you&apos;re a designer
          or developer, check out the{" "}
          <Link
            href="/docs/design-system"
            className="text-brand hover:underline"
          >
            design system
          </Link>
          .
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group block rounded-xl border border-border bg-surface-dim p-6 transition-all hover:border-brand/40 hover:bg-surface-bright"
          >
            <h2 className="mb-2 font-display text-lg font-semibold text-text group-hover:text-brand">
              {card.title}
            </h2>
            <p className="text-sm leading-relaxed text-text-muted">
              {card.description}
            </p>
            <span className="mt-4 inline-block text-sm font-medium text-brand">
              Read more →
            </span>
          </Link>
        ))}
      </div>

      <section className="mt-12 rounded-xl border border-dashed border-border bg-surface-dim p-6">
        <h2 className="mb-2 font-display text-lg font-semibold text-text">
          Not sure where to start?
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-text-muted">
          Most people should just run the 2-minute screener. It&apos;ll tell you
          exactly which programs to apply for, in order, with the right links.
        </p>
        <Link
          href="/screening"
          className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-surface transition-colors hover:bg-brand-light"
        >
          Run the screener →
        </Link>
      </section>
    </>
  );
}
