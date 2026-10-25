import type { Comparison } from "@/lib/comparisons";
import type { Situation, SituationProgram } from "@/lib/situations";
import type { Locale } from "./types";
import { es } from "./content/es";
import { zh } from "./content/zh";
import { vi } from "./content/vi";
import { ar } from "./content/ar";

/** Translatable fields of a comparison page, in the same order as the source. */
export type ComparisonText = Omit<Comparison, "slug">;

/** Translatable fields of a situation page; programs keep the source order. */
export type SituationText = Omit<
  Situation,
  "slug" | "programs" | "relatedSituations"
> & {
  programs: Omit<SituationProgram, "slug">[];
};

/** Per-page content for one locale, keyed by slug. */
export interface ContentMessages {
  comparisons: Record<string, ComparisonText>;
  situations: Record<string, SituationText>;
}

// Kept out of the Dictionary so the client bundle does not carry page content.
export const contentTranslations: Record<
  Exclude<Locale, "en">,
  ContentMessages
> = { es, zh, vi, ar };

function contentFor(locale: Locale): ContentMessages | undefined {
  return locale === "en" ? undefined : contentTranslations[locale];
}

/** Returns the comparison in the active locale, or the English source. */
export function localizeComparison(
  comparison: Comparison,
  locale: Locale,
): Comparison {
  const text = contentFor(locale)?.comparisons[comparison.slug];
  return text ? { ...text, slug: comparison.slug } : comparison;
}

/** Returns the situation in the active locale, or the English source. */
export function localizeSituation(
  situation: Situation,
  locale: Locale,
): Situation {
  const text = contentFor(locale)?.situations[situation.slug];
  if (!text) return situation;
  return {
    ...situation,
    ...text,
    programs: situation.programs.map((program, i) => ({
      ...program,
      ...text.programs[i],
    })),
  };
}
