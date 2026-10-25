"use client";

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useTransition,
} from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "./types";
import { LOCALE_COOKIE, getLocaleConfig, isLocale } from "./types";
import type { Dictionary } from "./dictionaries";

interface I18nContext {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
  dir: "ltr" | "rtl";
  /** True while the server re-renders after a locale change. */
  pending: boolean;
}

const I18nCtx = createContext<I18nContext | null>(null);

function writeLocaleCookie(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

/**
 * The server reads the locale cookie and passes only the active dictionary,
 * so server and client render identical text. Changing the locale writes the
 * cookie and refreshes the route to fetch the new dictionary.
 */
export function I18nProvider({
  locale,
  dictionary,
  children,
}: {
  locale: Locale;
  dictionary: Dictionary;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const setLocale = useCallback(
    (newLocale: Locale) => {
      try {
        localStorage.setItem(LOCALE_COOKIE, newLocale);
      } catch {}
      writeLocaleCookie(newLocale);
      startTransition(() => router.refresh());
    },
    [router],
  );

  // Visitors from before the cookie existed only have localStorage.
  useEffect(() => {
    if (document.cookie.includes(`${LOCALE_COOKIE}=`)) return;
    try {
      const stored = localStorage.getItem(LOCALE_COOKIE);
      if (isLocale(stored) && stored !== locale) setLocale(stored);
    } catch {}
  }, [locale, setLocale]);

  return (
    <I18nCtx.Provider
      value={{
        locale,
        setLocale,
        t: dictionary,
        dir: getLocaleConfig(locale).dir,
        pending,
      }}
    >
      {children}
    </I18nCtx.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
