import type { Locale } from "../types";

const en = {};

export type CompanyMessages = typeof en;

const es: CompanyMessages = {};

const zh: CompanyMessages = {};

const vi: CompanyMessages = {};

const ar: CompanyMessages = {};

export const company: Record<Locale, CompanyMessages> = { en, es, zh, vi, ar };
