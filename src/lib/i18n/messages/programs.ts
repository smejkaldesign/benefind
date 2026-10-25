import type { Locale } from "../types";

const en = {};

export type ProgramsMessages = typeof en;

const es: ProgramsMessages = {};

const zh: ProgramsMessages = {};

const vi: ProgramsMessages = {};

const ar: ProgramsMessages = {};

export const programs: Record<Locale, ProgramsMessages> = {
  en,
  es,
  zh,
  vi,
  ar,
};
