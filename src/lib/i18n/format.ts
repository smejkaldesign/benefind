import type { Locale } from "./types";

/** Fills `{name}` placeholders in a dictionary string. */
export function fmt(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

/** Attributes for English-only content shown inside a page in another locale. */
export function englishText(locale: Locale) {
  return locale === "en" ? {} : { lang: "en", dir: "ltr" as const };
}
