import type { Database } from "@/types/database";
import type { Dictionary } from "./dictionaries";
import type { Locale } from "./types";
import { fmt } from "./format";
import { localizeText } from "./localize-program";
import { localizeCompanyProgram } from "./localize-company-program";

type ProgramRow = Database["public"]["Tables"]["programs"]["Row"];

type CatalogFields = Pick<
  ProgramRow,
  | "id"
  | "track"
  | "name"
  | "description"
  | "plain_language_summary"
  | "agency"
  | "typical_award"
  | "deadline_info"
>;

/**
 * Returns a catalog row with its display text in the active locale. Company
 * programs use the company dictionary; the rest go through localizeText.
 * English rows are returned unchanged.
 */
export function localizeCatalogProgram<P extends CatalogFields>(
  program: P,
  t: Dictionary,
  locale: Locale,
): P {
  if (locale === "en") return program;
  const text = (value: string | null) =>
    value ? localizeText(value, t) : value;

  if (program.track === "company" && program.id in t.company.programs) {
    const localized = localizeCompanyProgram(
      {
        id: program.id,
        name: program.name,
        shortName: program.name,
        description: program.description ?? "",
        agency: program.agency ?? "",
        deadlineInfo: program.deadline_info ?? undefined,
      },
      t,
    );
    return {
      ...program,
      name: localized.name,
      description: program.description && localized.description,
      agency: program.agency && localized.agency,
      deadline_info: localized.deadlineInfo ?? null,
      plain_language_summary: text(program.plain_language_summary),
      typical_award: text(program.typical_award),
    };
  }

  return {
    ...program,
    name: localizeText(program.name, t),
    description: text(program.description),
    plain_language_summary: text(program.plain_language_summary),
    agency: text(program.agency),
    typical_award: text(program.typical_award),
    deadline_info: text(program.deadline_info),
  };
}

export interface CriterionRow {
  key: string;
  label: string;
  lines: string[];
}

// `rules` on seeded rows points at the source file that holds the logic.
const HIDDEN_KEYS = new Set(["rules", "notes"]);

const USD_KEYS = new Set([
  "investment_income_limit",
  "income_soft_cap",
  "max_award_2025_26",
  "estimated_annual_value",
  "minimum_allotment",
  "standard_deduction_2025",
  "estimated_monthly_per_person",
  "asset_limits",
  "max_allotments_monthly",
  "resource_limits",
  "income_limits_monthly",
  "max_federal_benefit_monthly",
]);

/** Dollar amount wrapped in Unicode isolates so it stays LTR inside RTL text. */
function usd(n: number): string {
  return `⁦$${n.toLocaleString("en-US")}⁩`;
}

function titleCase(key: string): string {
  return key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Turns a program's eligibility_criteria JSON into labeled, translated rows.
 * Unknown keys fall back to a title-cased key and the raw value.
 */
export function localizeCriteria(
  criteria: unknown,
  t: Dictionary,
  locale: Locale,
): { rows: CriterionRow[]; notes: string | null } {
  if (!criteria || typeof criteria !== "object" || Array.isArray(criteria)) {
    return { rows: [], notes: null };
  }
  const c = t.seoPages.criteria;
  const labels = c.labels as Record<string, string>;
  const tokens = c.tokens as Record<string, string>;
  const intl = `${locale}-u-nu-latn`;
  const list = new Intl.ListFormat(intl, { type: "conjunction" });

  const word = (value: string) =>
    tokens[value] ?? (locale === "en" ? value : localizeText(value, t));

  const scalar = (key: string, value: unknown, money: boolean): string => {
    if (typeof value === "boolean") return value ? c.yes : c.no;
    if (typeof value === "number") {
      if (key.endsWith("_fpl_percent") || key === "fpl_threshold") {
        return fmt(c.fplPercent, { n: value });
      }
      if (key === "age_limit") return fmt(c.underAge, { n: value });
      return money ? usd(value) : value.toLocaleString(intl);
    }
    if (typeof value === "string") return word(value);
    if (Array.isArray(value)) return list.format(value.map(String).map(word));
    return String(value);
  };

  const countLabel = (parent: string, key: string): string => {
    const n = Number(key);
    if (parent === "income_limits_by_children") {
      if (n === 0) return c.childrenNone;
      return n === 1 ? c.childrenOne : fmt(c.childrenOther, { n });
    }
    return fmt(n === 1 ? c.householdOne : c.householdOther, { n });
  };

  const nested = (
    parent: string,
    value: Record<string, unknown>,
    money: boolean,
  ): string[] => {
    if (parent === "filer_age_range_no_children") {
      return [
        fmt(c.ageRange, { min: String(value.min), max: String(value.max) }),
      ];
    }
    return Object.entries(value).map(([k, v]) => {
      const label = /^\d+$/.test(k) ? countLabel(parent, k) : word(k);
      let text: string;
      if (v && typeof v === "object" && !Array.isArray(v)) {
        const inner = v as Record<string, unknown>;
        if ("max_income" in inner && "max_credit" in inner) {
          text = fmt(c.childLimits, {
            income: usd(Number(inner.max_income)),
            credit: usd(Number(inner.max_credit)),
          });
        } else {
          const parts = Object.entries(inner).map(([ik, iv]) =>
            scalar(ik, iv, money),
          );
          text = list.format(parts);
        }
      } else {
        text = scalar(k, v, money);
      }
      return fmt(c.pair, { label, value: text });
    });
  };

  const record = criteria as Record<string, unknown>;
  const rows: CriterionRow[] = [];
  for (const [key, value] of Object.entries(record)) {
    if (HIDDEN_KEYS.has(key) || value === null || value === undefined) continue;
    const money = USD_KEYS.has(key);
    const lines =
      typeof value === "object" && !Array.isArray(value)
        ? nested(key, value as Record<string, unknown>, money)
        : [scalar(key, value, money)];
    rows.push({ key, label: labels[key] ?? titleCase(key), lines });
  }

  const notes =
    typeof record.notes === "string"
      ? locale === "en"
        ? record.notes
        : localizeText(record.notes, t)
      : null;
  return { rows, notes };
}
