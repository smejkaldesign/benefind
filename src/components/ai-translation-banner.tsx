"use client";

import { useI18n } from "@/lib/i18n/context";

/** Fixed notice shown above every page whenever the locale is not English. */
export function AiTranslationBanner() {
  const { locale, t } = useI18n();
  if (locale === "en") return null;

  return (
    <div
      role="note"
      className="fixed inset-x-0 top-0 z-[60] flex h-[var(--ai-banner-h)] items-center justify-center border-y border-border bg-white px-4 text-center text-xs leading-4 text-text-muted dark:bg-black"
    >
      <p className="line-clamp-2">{t.common.aiTranslationNotice}</p>
    </div>
  );
}
