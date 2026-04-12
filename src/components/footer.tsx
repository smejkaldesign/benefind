"use client";

import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/lib/i18n/context";

export function Footer() {
  const { t } = useI18n();

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
                  href="/docs"
                  className="text-sm text-text-muted transition-colors hover:text-brand"
                >
                  {t.landing.footerDocs}
                </Link>
              </li>
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
                  href="/docs/guides"
                  className="text-sm text-text-muted transition-colors hover:text-brand"
                >
                  {t.landing.footerGuides}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-subtle">
              {t.landing.footerLegal}
            </h4>
            <ul className="mt-3 space-y-2">
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
              <li className="text-sm text-text-muted">English</li>
              <li className="text-sm text-text-muted">Español</li>
              <li className="text-sm text-text-muted">中文</li>
              <li className="text-sm text-text-muted">Tiếng Việt</li>
              <li className="text-sm text-text-muted">العربية</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-text-subtle">
          <p>
            &copy; {new Date().getFullYear()} {t.common.appName}.{" "}
            {t.common.free}
          </p>
        </div>
      </div>
    </footer>
  );
}
