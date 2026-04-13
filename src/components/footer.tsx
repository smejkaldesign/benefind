"use client";

import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/lib/i18n/context";
import type { Locale } from "@/lib/i18n/types";
import { Separator } from "@/components/ui/separator";

const LANGUAGES: { label: string; locale: Locale; available: boolean }[] = [
  { label: "English", locale: "en", available: true },
  { label: "Español", locale: "es", available: true },
  { label: "中文", locale: "zh", available: false },
  { label: "Tiếng Việt", locale: "vi", available: false },
  { label: "العربية", locale: "ar", available: false },
];

export function Footer() {
  const { t, locale, setLocale } = useI18n();

  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto max-w-[1520px]">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <Image
              src="/images/brand/logo-light.svg"
              alt={t.common.appName}
              width={120}
              height={32}
              className="h-auto"
            />
            <p className="mt-2 text-sm text-text-muted">
              {t.landing.footerTagline}
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-subtle">
              {t.landing.footerProduct}
            </h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/screening"
                  className="text-sm text-text-muted transition-colors hover:text-brand"
                >
                  {t.landing.footerScreening}
                </Link>
              </li>
              <li>
                <Link
                  href="/screening/company"
                  className="text-sm text-text-muted transition-colors hover:text-brand"
                >
                  {t.landing.footerCompanyGrants}
                </Link>
              </li>
              <li>
                <Link
                  href="#how-it-works"
                  className="text-sm text-text-muted transition-colors hover:text-brand"
                >
                  {t.landing.footerHowItWorks}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-subtle">
              {t.landing.footerResources}
            </h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-text-muted transition-colors hover:text-brand"
                >
                  {t.landing.footerBlog}
                </Link>
              </li>
              <li>
                <Link
                  href="/tools"
                  className="text-sm text-text-muted transition-colors hover:text-brand"
                >
                  {t.landing.footerTools}
                </Link>
              </li>
              <li>
                <Link
                  href="/benefits-for/low-income-families"
                  className="text-sm text-text-muted transition-colors hover:text-brand"
                >
                  {t.landing.footerBenefitsFor}
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/guides"
                  className="text-sm text-text-muted transition-colors hover:text-brand"
                >
                  {t.landing.footerGuides}
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-sm text-text-muted transition-colors hover:text-brand"
                >
                  {t.landing.footerDocs}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-subtle">
              {t.landing.footerCompany}
            </h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-text-muted transition-colors hover:text-brand"
                >
                  {t.landing.footerAbout}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-text-muted transition-colors hover:text-brand"
                >
                  {t.landing.footerPrivacy}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-text-muted transition-colors hover:text-brand"
                >
                  {t.landing.footerTerms}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-subtle">
              {t.landing.footerLanguages}
            </h4>
            <ul className="mt-3 space-y-2">
              {LANGUAGES.map((lang) => (
                <li key={lang.locale}>
                  {lang.available ? (
                    <button
                      type="button"
                      onClick={() => setLocale(lang.locale)}
                      className={`text-sm cursor-pointer transition-colors ${
                        locale === lang.locale
                          ? "text-brand"
                          : "text-text-muted hover:text-brand"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ) : (
                    <span className="text-sm text-text-subtle/40 cursor-default">
                      {lang.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Separator className="mt-10" />
        <div className="pt-6 text-center text-sm text-text-subtle">
          <p>
            &copy; {new Date().getFullYear()} {t.common.appName}.{" "}
            {t.common.free}
          </p>
        </div>
      </div>
    </footer>
  );
}
