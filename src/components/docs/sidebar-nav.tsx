"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
  {
    title: "Legal",
    links: [{ href: "/docs/privacy", label: "Privacy policy" }],
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Docs navigation" className="flex flex-col gap-8">
      {DOCS_NAV.map((section) => (
        <div key={section.title}>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-text-subtle">
            {section.title}
          </p>
          <ul aria-label={section.title} className="flex flex-col gap-1">
            {section.links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block rounded px-2 py-1 text-sm transition-colors ${
                      isActive
                        ? "bg-brand/10 font-medium text-brand"
                        : "text-text-muted hover:bg-surface-dim hover:text-brand"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
