import type {
  BenefitProgram,
  ReasonsPayload,
  ScoredEligibilityResult,
} from "@/lib/benefits/types";
import type { DocumentItem } from "@/lib/benefits/documents";
import type { Dictionary } from "./dictionaries";

type Pattern = { re: RegExp; names: string[]; key: string };

const patternCache = new WeakMap<object, Pattern[]>();

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function placeholderSource(name: string): string {
  if (name === "state") return "([A-Z]{2})";
  if (name === "pathway") return "([a-z ]+)";
  return "(-?[\\d,.]+)";
}

function patternsFor(text: Record<string, string>): Pattern[] {
  const cached = patternCache.get(text);
  if (cached) return cached;
  const list: Pattern[] = [];
  for (const key of Object.keys(text)) {
    if (!key.includes("{")) continue;
    const names: string[] = [];
    const source = key
      .split(/(\{\w+\})/)
      .map((part) => {
        const m = /^\{(\w+)\}$/.exec(part);
        if (!m) return escapeRegExp(part);
        names.push(m[1]!);
        return placeholderSource(m[1]!);
      })
      .join("");
    list.push({ re: new RegExp(`^${source}$`), names, key });
  }
  patternCache.set(text, list);
  return list;
}

/**
 * Translates English program text (names, reasons, rule labels, next steps,
 * document names). Numbers, state codes and Medicaid pathway names inside the
 * text are matched as placeholders. Unknown text is returned in English.
 */
export function localizeText(value: string, t: Dictionary): string;
export function localizeText(
  value: string | undefined,
  t: Dictionary,
): string | undefined;
export function localizeText(
  value: string | undefined,
  t: Dictionary,
): string | undefined {
  if (!value) return value;
  const text = t.programs.text as Record<string, string>;
  const s = value.replace(/\s*\u2014\s*/g, "; ").trim();
  const exact = text[s];
  if (exact !== undefined) return exact;
  const pathways = t.programs.pathways as Record<string, string>;
  for (const { re, names, key } of patternsFor(text)) {
    const m = re.exec(s);
    if (!m) continue;
    let out = text[key]!;
    names.forEach((name, i) => {
      const raw = m[i + 1]!;
      const v = name === "pathway" ? (pathways[raw] ?? raw) : raw;
      out = out.split(`{${name}}`).join(v);
    });
    return out;
  }
  return s;
}

function localizeList(
  list: string[] | undefined,
  t: Dictionary,
): string[] | undefined {
  return list?.map((item) => localizeText(item, t));
}

/** Returns the program with its user-facing text in the active locale. */
export function localizeProgram<
  P extends Pick<BenefitProgram, "id" | "name" | "description">,
>(program: P, t: Dictionary): P {
  const p = program as P & Partial<BenefitProgram>;
  return {
    ...program,
    name: localizeText(program.name, t),
    description: localizeText(program.description, t),
    ...(p.shortName !== undefined && {
      shortName: localizeText(p.shortName, t),
    }),
    ...(p.documentsNeeded !== undefined && {
      documentsNeeded: localizeList(p.documentsNeeded, t),
    }),
  };
}

/** Localized short name for a program id, falling back to the id. */
export function localizeProgramName(
  programId: string,
  t: Dictionary,
  fallback?: string,
): string {
  const names = t.programs.shortNames as Record<string, string>;
  return names[programId] ?? (fallback ? localizeText(fallback, t) : programId);
}

/** Translates the reasons payload shown in the "Why this result?" panel. */
export function localizeReasons<R extends Partial<ReasonsPayload>>(
  reasons: R | null | undefined,
  t: Dictionary,
): R | null | undefined {
  if (!reasons) return reasons;
  return {
    ...reasons,
    rules: reasons.rules?.map((r) => ({
      ...r,
      label: localizeText(r.label, t),
      actual: localizeText(r.actual, t),
      threshold: localizeText(r.threshold, t),
    })),
    signals: reasons.signals?.map((s) => ({
      ...s,
      label: localizeText(s.label, t),
    })),
    missing: reasons.missing?.map((m) => ({
      ...m,
      label: localizeText(m.label, t),
    })),
  };
}

/** Translates the reason, next steps and explanation of a scored result. */
export function localizeResult<R extends ScoredEligibilityResult>(
  result: R,
  t: Dictionary,
): R {
  return {
    ...result,
    reason: localizeText(result.reason, t),
    nextSteps: localizeList(result.nextSteps, t),
    reasons: localizeReasons(result.reasons, t) ?? result.reasons,
  };
}

/** Translates a document checklist item. */
export function localizeDocument(
  doc: DocumentItem,
  t: Dictionary,
): DocumentItem {
  return {
    ...doc,
    name: localizeText(doc.name, t),
    description: localizeText(doc.description, t),
    alternatives: localizeList(doc.alternatives, t),
    tip: localizeText(doc.tip, t),
  };
}
