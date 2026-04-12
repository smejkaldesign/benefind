"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { LanguageSelector } from "@/components/language-selector";
import { useI18n } from "@/lib/i18n/context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme-toggle";

export function LandingNav() {
  const { t } = useI18n();
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const isDocsRoute = pathname.startsWith("/docs");
  const isDesignSystem = pathname.startsWith("/docs/design-system");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
              src={
                resolvedTheme === "dark"
                  ? "/images/brand/logo-light.svg"
                  : "/images/brand/logo-dark.svg"
              }
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
          <ThemeToggle />
          <Button
            variant="outline"
            size="sm"
            render={<Link href="/auth/login" />}
          >
            {t.common.signIn}
          </Button>

          {/* Eligibility dropdown using shadcn/ui DropdownMenu */}
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex h-[44px] w-[200px] items-center justify-between gap-2 rounded-lg border border-border bg-brand px-5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-dark focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none">
              {t.landing.heroCta}
              <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[popup-open]:rotate-180" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="w-[200px] bg-surface shadow-lg border border-border"
            >
              <DropdownMenuItem
                className="px-5 py-3 text-sm font-semibold text-text hover:bg-surface-dim"
                render={<Link href="/screening" />}
              >
                Personal Benefits
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem
                className="px-5 py-3 text-sm font-semibold text-text hover:bg-surface-dim"
                render={<Link href="/screening/company" />}
              >
                Business Benefits
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
