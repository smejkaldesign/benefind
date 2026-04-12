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
        href: "/blog/medicaid-eligibility-2026",
        label: "Apply for Medicaid",
      },
      {
        href: "/blog/section-8-eligibility-2026",
        label: "Apply for Section 8",
      },
      { href: "/blog/ssi-eligibility-2026", label: "Apply for SSI" },
      { href: "/blog/eitc-eligibility-2026", label: "Claim the EITC" },
      { href: "/blog/wic-eligibility-2026", label: "Apply for WIC" },
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
    title: "Legal",
    links: [{ href: "/docs/privacy", label: "Privacy policy" }],
  },
];

/**
 * Docs sidebar with flat section/link structure.
 * The shadcn/ui Sidebar was evaluated but not adopted because:
 * 1. This sidebar has no collapsible groups, sub-menus, or icon-only mode.
 * 2. All links are simple anchor elements; no actions, badges, or tooltips.
 * 3. The current implementation is ~30 lines and fully accessible (aria-label,
 *    aria-current). Wrapping in shadcn Sidebar primitives would add abstraction
 *    without improving functionality.
 */
export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Docs navigation" className="flex flex-col gap-8">
      {DOCS_NAV.map((section) => (
        <div key={section.title}>
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-text-muted">
            {section.title}
          </p>
          <ul aria-label={section.title} className="flex flex-col gap-1">
            {section.links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
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
