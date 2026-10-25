import type {
  CompanyEligibilityResult,
  CompanyProgram,
} from "@/lib/benefits/company-types";
import type { Dictionary } from "./dictionaries";
import { fmt } from "./format";

type CompanyText = Dictionary["company"];

function industryLabel(value: string, c: CompanyText): string {
  return c.industries[value as keyof CompanyText["industries"]] ?? value;
}

/** Translates one engine sentence; returns the input when no translation exists. */
export function localizeCompanyText(text: string, t: Dictionary): string {
  const c = t.company;
  const phrase = c.phrases[text as keyof CompanyText["phrases"]];
  if (phrase) return phrase;

  let m = text.match(/^Estimated (\d+) qualifying hires per year$/);
  if (m) return fmt(c.templates.estimatedHires, { n: m[1]! });

  m = text.match(/^Your industry \(([\w-]+)\) aligns with SBIR focus areas$/);
  if (m) {
    return fmt(c.templates.industryAlignsSbir, {
      industry: industryLabel(m[1]!, c),
    });
  }

  m = text.match(
    /^Your state \(([A-Z]{2})\) offers the (.+) with up to (\$[\d,]+) per employee\.$/,
  );
  if (m) {
    return fmt(c.templates.stateOffers, {
      state: m[1]!,
      name: m[2]!,
      amount: m[3]!,
    });
  }

  m = text.match(/^([A-Z]{2}) has the (.+)$/);
  if (m) return fmt(c.templates.stateHasProgram, { state: m[1]!, name: m[2]! });

  m = text.match(/^Apply through the (.+)$/);
  if (m) return fmt(c.templates.applyThrough, { name: m[1]! });

  m = text.match(/^Up to (\$[\d.,]+[KM]?)$/);
  if (m) return fmt(c.templates.upTo, { amount: m[1]! });

  m = text.match(/^(\$[\d.,KM$-]+)\/year$/);
  if (m) return fmt(c.templates.perYear, { amount: m[1]! });

  m = text.match(/^(\$[\d.,$-]+)\/sq ft$/);
  if (m) return fmt(c.templates.perSqFt, { amount: m[1]! });

  return text;
}

/** Returns the program with its display text in the active locale. */
export function localizeCompanyProgram<
  P extends Pick<
    CompanyProgram,
    "id" | "name" | "shortName" | "description" | "agency" | "deadlineInfo"
  >,
>(program: P, t: Dictionary): P {
  const entry = (
    t.company.programs as Record<
      string,
      {
        name: string;
        shortName: string;
        description: string;
        agency: string;
        deadlineInfo?: string;
      }
    >
  )[program.id];
  if (!entry) return program;
  return {
    ...program,
    name: entry.name,
    shortName: entry.shortName,
    description: entry.description,
    agency: entry.agency,
    deadlineInfo: program.deadlineInfo
      ? (entry.deadlineInfo ?? program.deadlineInfo)
      : program.deadlineInfo,
  };
}

/** Returns the eligibility result with its display text in the active locale. */
export function localizeCompanyResult<
  R extends Pick<
    CompanyEligibilityResult,
    "reason" | "nextSteps" | "whyYouQualify" | "estimatedValue"
  >,
>(result: R, t: Dictionary): R {
  return {
    ...result,
    reason: localizeCompanyText(result.reason, t),
    nextSteps: result.nextSteps.map((s) => localizeCompanyText(s, t)),
    whyYouQualify: (result.whyYouQualify ?? []).map((s) =>
      localizeCompanyText(s, t),
    ),
    estimatedValue: result.estimatedValue
      ? localizeCompanyText(result.estimatedValue, t)
      : result.estimatedValue,
  };
}
