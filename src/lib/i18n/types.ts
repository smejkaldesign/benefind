export type Locale = "en" | "es" | "zh" | "vi" | "ar";

export interface LocaleConfig {
  code: Locale;
  name: string;
  nativeName: string;
  dir: "ltr" | "rtl";
}

export const LOCALES: LocaleConfig[] = [
  { code: "en", name: "English", nativeName: "English", dir: "ltr" },
  { code: "es", name: "Spanish", nativeName: "Español", dir: "ltr" },
  { code: "zh", name: "Chinese", nativeName: "中文", dir: "ltr" },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", dir: "ltr" },
  { code: "ar", name: "Arabic", nativeName: "العربية", dir: "rtl" },
];

export const DEFAULT_LOCALE: Locale = "en";

export function getLocaleConfig(locale: Locale): LocaleConfig {
  return LOCALES.find((l) => l.code === locale) ?? LOCALES[0]!;
}

export const LOCALE_COOKIE = "benefind_locale";

export function isLocale(value: unknown): value is Locale {
  return LOCALES.some((l) => l.code === value);
}
