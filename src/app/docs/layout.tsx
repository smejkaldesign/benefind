import Link from "next/link";
import { LandingNav } from "@/components/landing-nav";

interface DocsLink {
  href: string;
  label: string;
}

interface DocsSection {
  title: string;
  links: DocsLink[];
}

const DOCS_NAV: DocsSection[] = [
  {
    title: "Overview",
    links: [
      { href: "/docs", label: "Introduction" },
      { href: "/docs/how-it-works", label: "How Benefind works" },
    ],
  },
  {
    title: "Guides",
    links: [
      { href: "/docs/guides", label: "All guides" },
      { href: "/blog/snap-eligibility-2026", label: "Apply for SNAP" },
      {
        href: "/blog/how-to-apply-for-liheap-heating-assistance",
        label: "Apply for LIHEAP",
      },
      {
        href: "/blog/rd-tax-credit-small-business-2026",
        label: "R&D Tax Credit",
      },
    ],
  },
  {
    title: "For designers and developers",
    links: [{ href: "/docs/design-system", label: "Design system" }],
  },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LandingNav />
      <main className="min-h-screen bg-surface pt-[4.5rem] text-text">
        <div className="mx-auto max-w-[1520px] px-6">
          <div className="grid grid-cols-1 gap-12 py-12 lg:grid-cols-[220px_1fr]">
            {/* Sidebar nav */}
            <aside className="lg:sticky lg:top-24 lg:h-fit">
              <nav aria-label="Docs navigation" className="flex flex-col gap-8">
                {DOCS_NAV.map((section) => (
                  <div key={section.title}>
                    <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-text-subtle">
                      {section.title}
                    </p>
                    <ul
                      aria-label={section.title}
                      className="flex flex-col gap-1"
                    >
                      {section.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="block rounded px-2 py-1 text-sm text-text-muted transition-colors hover:bg-surface-dim hover:text-brand"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </aside>

            {/* Content column */}
            <div className="min-w-0 pb-20">{children}</div>
          </div>
        </div>
      </main>
    </>
  );
}
