import type { BenefitProgram } from "@/lib/benefits/types";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { fmt } from "../i18n/format";

/**
 * Programs without a dollar estimate (services, waivers, referrals) total $0,
 * so describe what they are instead of quoting "worth up to $0/year".
 */
export function summarizeEligible(
  programs: Pick<BenefitProgram, "name" | "description">[],
  totalAnnual: number,
  t: Dictionary,
): string {
  const m = t.screeningFlow.summary;
  const count = fmt(programs.length > 1 ? m.programsOther : m.programsOne, {
    count: programs.length,
  });
  if (totalAnnual > 0) {
    return fmt(m.withValue, {
      programs: count,
      amount: totalAnnual.toLocaleString(),
    });
  }
  if (programs.length === 1) {
    const [program] = programs;
    const sentence = (
      program.description.match(/^.*?(?:[.!?](?:\s|$)|[。！？])/)?.[0] ??
      program.description
    ).trim();
    const ending = /[.!?。！？]$/.test(sentence) ? "" : m.sentenceEnd;
    return fmt(m.single, {
      name: program.name,
      sentence: `${sentence}${ending}`,
    });
  }
  return fmt(m.several, {
    programs: count,
    names: programs.map((p) => p.name).join(m.listSeparator),
  });
}
