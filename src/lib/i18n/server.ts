import { cookies } from "next/headers";
import { getDictionary } from "./dictionaries";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  getLocaleConfig,
  isLocale,
} from "./types";
import type { Locale } from "./types";

export async function getServerLocale(): Promise<Locale> {
  const value = (await cookies()).get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

/** Locale and dictionary for Server Components, read from the locale cookie. */
export async function getServerI18n() {
  const locale = await getServerLocale();
  return {
    locale,
    t: getDictionary(locale),
    dir: getLocaleConfig(locale).dir,
  };
}
