import { describe, expect, it } from "vitest";
import { comparisons } from "../../comparisons";
import { situations } from "../../situations";
import { getDictionary } from "../dictionaries";
import { seoPages } from "../messages/seo-pages";
import {
  contentTranslations,
  localizeComparison,
  localizeSituation,
} from "../localize-content";
import { localizeCatalogProgram, localizeCriteria } from "../localize-catalog";

const LOCALES = ["es", "zh", "vi", "ar"] as const;

function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") {
    return Object.values(value).flatMap(strings);
  }
  return [];
}

function placeholders(s: string): string[] {
  return (s.match(/\{\w+\}/g) ?? []).sort();
}

const strip = (s: string) => s.replace(/[⁦⁩]/g, "");

describe("comparison and situation translations", () => {
  it.each(LOCALES)("%s covers every page with the source shape", (locale) => {
    const content = contentTranslations[locale];
    for (const c of comparisons) {
      const tr = content.comparisons[c.slug];
      expect(tr, c.slug).toBeDefined();
      expect(tr!.programA.dimensions).toHaveLength(
        c.programA.dimensions.length,
      );
      expect(tr!.programB.dimensions).toHaveLength(
        c.programB.dimensions.length,
      );
      expect(tr!.faqs).toHaveLength(c.faqs.length);
    }
    for (const s of situations) {
      const tr = content.situations[s.slug];
      expect(tr, s.slug).toBeDefined();
      expect(tr!.programs).toHaveLength(s.programs.length);
      expect(tr!.faqs).toHaveLength(s.faqs.length);
    }
  });

  it.each(LOCALES)("%s has no em dashes", (locale) => {
    const bad = strings(contentTranslations[locale]).filter((s) =>
      s.includes("—"),
    );
    expect(bad).toEqual([]);
  });

  it("keeps slugs and links when localizing", () => {
    const source = situations.find((s) => s.slug === "veterans")!;
    const localized = localizeSituation(source, "es");
    expect(localized.slug).toBe("veterans");
    expect(localized.relatedSituations).toEqual(source.relatedSituations);
    expect(localized.programs.map((p) => p.slug)).toEqual(
      source.programs.map((p) => p.slug),
    );
    expect(localized.title).not.toBe(source.title);
  });

  it("returns the English source for en", () => {
    const source = comparisons[0]!;
    expect(localizeComparison(source, "en")).toBe(source);
  });
});

describe("seoPages dictionary", () => {
  const flat = (o: unknown, prefix = ""): Record<string, string> =>
    Object.entries(o as Record<string, unknown>).reduce<Record<string, string>>(
      (acc, [k, v]) => {
        if (typeof v === "string") acc[`${prefix}${k}`] = v;
        else Object.assign(acc, flat(v, `${prefix}${k}.`));
        return acc;
      },
      {},
    );
  const en = flat(seoPages.en);

  it.each(LOCALES)("%s has no em dashes and only known placeholders", (l) => {
    for (const [key, value] of Object.entries(flat(seoPages[l]))) {
      expect(value, key).not.toContain("—");
      for (const p of placeholders(value)) {
        expect(placeholders(en[key]!), key).toContain(p);
      }
    }
  });
});

describe("localizeCriteria", () => {
  const snap = {
    asset_limits: { general: 2750, elderly_or_disabled: 4250 },
    max_allotments_monthly: { "1": 292, "2": 536 },
    gross_income_limit_fpl_percent: 130,
    requires_citizen_or_qualified_immigrant: true,
  };

  it("labels and formats nested values in English", () => {
    const { rows } = localizeCriteria(snap, getDictionary("en"), "en");
    expect(
      rows.map((r) => ({ label: r.label, lines: r.lines.map(strip) })),
    ).toEqual([
      {
        label: "Asset limits",
        lines: [
          "Most households: $2,750",
          "Households with an older adult or a person with a disability: $4,250",
        ],
      },
      {
        label: "Maximum monthly benefit by household size",
        lines: ["1 person: $292", "2 people: $536"],
      },
      {
        label: "Gross income limit",
        lines: ["130% of the federal poverty level"],
      },
      { label: "Must be a citizen or qualified immigrant", lines: ["Yes"] },
    ]);
  });

  it("translates labels and values", () => {
    const { rows } = localizeCriteria(
      { refundable: true, requires_children: false },
      getDictionary("es"),
      "es",
    );
    expect(rows).toEqual([
      { key: "refundable", label: "Reembolsable", lines: ["Sí"] },
      { key: "requires_children", label: "Debe tener hijos", lines: ["No"] },
    ]);
  });

  it("hides the seeded rules pointer and returns notes separately", () => {
    const result = localizeCriteria(
      { rules: "src/lib/benefits/state-programs.ts", notes: "Some note" },
      getDictionary("en"),
      "en",
    );
    expect(result).toEqual({ rows: [], notes: "Some note" });
  });
});

describe("localizeCatalogProgram", () => {
  const row = {
    id: "wosb-contracting",
    track: "company",
    name: "Women-Owned Small Business Federal Contracting",
    description:
      "Federal contracting preferences for women-owned small businesses.",
    plain_language_summary: null,
    agency: "SBA",
    typical_award: null,
    deadline_info: null,
  };

  it("leaves English rows unchanged", () => {
    expect(localizeCatalogProgram(row, getDictionary("en"), "en")).toBe(row);
  });

  it("uses the company dictionary for company programs", () => {
    const t = getDictionary("es");
    const localized = localizeCatalogProgram(row, t, "es");
    expect(localized.name).toBe(t.company.programs["wosb-contracting"].name);
    expect(localized.name).not.toBe(row.name);
    expect(localized.deadline_info).toBeNull();
  });

  it("translates federal agency names", () => {
    const localized = localizeCatalogProgram(
      {
        ...row,
        id: "ssi",
        track: "individual",
        name: "Supplemental Security Income (SSI)",
        agency: "Social Security Administration (SSA)",
      },
      getDictionary("es"),
      "es",
    );
    expect(localized.agency).toBe("Administración del Seguro Social (SSA)");
  });
});
