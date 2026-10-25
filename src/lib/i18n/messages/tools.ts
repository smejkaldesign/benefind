import type { Locale } from "../types";

const en = {};

export type ToolsMessages = typeof en;

const es: ToolsMessages = {};

const zh: ToolsMessages = {};

const vi: ToolsMessages = {};

const ar: ToolsMessages = {};

export const tools: Record<Locale, ToolsMessages> = { en, es, zh, vi, ar };
