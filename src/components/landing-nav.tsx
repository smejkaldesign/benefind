"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { LanguageSelector } from "@/components/language-selector";
import { useI18n } from "@/lib/i18n/context";

export function LandingNav() {
  const { t } = useI18n();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isDocsRoute = pathname.startsWith("/docs");
  const isDesignSystem = pathname.startsWith("/docs/design-system");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    const onClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [dropdownOpen]);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 px-6 py-4 transition-all duration-300 ${
        scrolled
          ? "bg-surface/80 shadow-[0_0_16px_rgba(18,18,18,0.4)] backdrop-blur-[30px]"
          : ""
      }`}
    >
      <div className="mx-auto flex max-w-[1520px] items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/brand/logo-light.svg"
              alt={t.common.appName}
              width={120}
              height={22}
              priority
            />
          </Link>
          <LanguageSelector />
          {isDocsRoute && (
            <nav className="flex items-center gap-4" aria-label="Docs tabs">
              <Link
                href="/docs"
                className={`text-sm transition-colors hover:text-brand ${
                  isDocsRoute && !isDesignSystem
                    ? "font-medium text-brand"
                    : "text-text-muted"
                }`}
              >
                Docs
              </Link>
              <Link
                href="/docs/design-system"
                className={`text-sm transition-colors hover:text-brand ${
                  isDesignSystem ? "font-medium text-brand" : "text-text-muted"
                }`}
              >
                Design
              </Link>
            </nav>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/auth/login"
            className="rounded-lg border border-border px-4 py-1.5 text-sm font-semibold text-text-muted transition-colors hover:border-brand hover:text-brand focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
          >
            {t.common.signIn}
          </Link>

          {/* Eligibility dropdown — same white style as hero buttons */}
          <div className="relative w-[200px]" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen((v) => !v)}
              aria-expanded={dropdownOpen}
              aria-haspopup="menu"
              className="inline-flex h-[44px] w-full items-center justify-between gap-2 rounded-lg border border-surface/20 bg-white px-5 text-sm font-semibold text-surface shadow-sm transition-all hover:bg-white/95 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            >
              {t.landing.heroCta}
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {dropdownOpen && (
              <div
                role="menu"
                className="absolute left-0 right-0 top-[calc(100%+8px)] overflow-hidden rounded-lg border border-surface/20 bg-white shadow-lg"
              >
                <Link
                  href="/screening"
                  role="menuitem"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center px-5 py-3 text-sm font-semibold text-surface transition-colors hover:bg-surface/5"
                >
                  Personal Benefits
                </Link>
                <div className="h-px bg-surface/10" />
                <Link
                  href="/screening/company"
                  role="menuitem"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center px-5 py-3 text-sm font-semibold text-surface transition-colors hover:bg-surface/5"
                >
                  Business Benefits
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
