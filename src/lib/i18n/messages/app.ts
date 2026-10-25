import type { Locale } from "../types";

const en = {};

export type AppMessages = typeof en;

const es: AppMessages = {};

const zh: AppMessages = {};

const vi: AppMessages = {};

const ar: AppMessages = {};

export const app: Record<Locale, AppMessages> = { en, es, zh, vi, ar };
