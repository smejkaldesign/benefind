import type { Locale } from "../types";

const en = {};

export type MarketingMessages = typeof en;

const es: MarketingMessages = {};

const zh: MarketingMessages = {};

const vi: MarketingMessages = {};

const ar: MarketingMessages = {};

export const marketing: Record<Locale, MarketingMessages> = {
  en,
  es,
  zh,
  vi,
  ar,
};
