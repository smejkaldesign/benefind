"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import type { Locale } from "./types";
import { DEFAULT_LOCALE, getLocaleConfig } from "./types";
import { getDictionary, type Dictionary } from "./dictionaries";

interface I18nContext {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
  dir: "ltr" | "rtl";
}

const I18nCtx = createContext<I18nContext>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  t: getDictionary(DEFAULT_LOCALE),
  dir: "ltr",
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("benefind_locale") as Locale | null;
      if (stored && ["en", "es", "zh", "vi", "ar"].includes(stored)) {
        setLocaleState(stored);
      }
    } catch {}
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem("benefind_locale", newLocale);
    } catch {}
    // Update html dir and lang
    document.documentElement.lang = newLocale;
    document.documentElement.dir = getLocaleConfig(newLocale).dir;
  }, []);

  const t = getDictionary(locale);
  const dir = getLocaleConfig(locale).dir;

  return (
    <I18nCtx.Provider value={{ locale, setLocale, t, dir }}>
      {children}
    </I18nCtx.Provider>
  );
}

export function useI18n() {
  return useContext(I18nCtx);
}
