"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DesignLink {
  href: string;
  label: string;
}

const DESIGN_NAV: DesignLink[] = [
  { href: "/docs/design-system", label: "Overview" },
  { href: "/docs/design-system#colors", label: "Colors" },
  { href: "/docs/design-system#typography", label: "Typography" },
  { href: "/docs/design-system#components", label: "Components" },
  { href: "/docs/design-system#spacing", label: "Spacing" },
  { href: "/docs/design-system#contributing", label: "Contributing" },
];

export function DesignSidebarNav() {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    setActiveHash(window.location.hash);

    function onHashChange() {
      setActiveHash(window.location.hash);
    }

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <nav aria-label="Design system navigation" className="flex flex-col gap-8">
      <div>
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-text-muted">
          Design System
        </p>
        <ul aria-label="Design system" className="flex flex-col gap-1">
          {DESIGN_NAV.map((link) => {
            const hash = link.href.includes("#")
              ? `#${link.href.split("#")[1]}`
              : "";
            const isActive =
              pathname === "/docs/design-system" &&
              (hash ? activeHash === hash : !activeHash);
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
    </nav>
  );
}
