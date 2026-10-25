import type { BenefitProgram } from "@/lib/benefits/types";

/**
 * Programs without a dollar estimate (services, waivers, referrals) total $0,
 * so describe what they are instead of quoting "worth up to $0/year".
 */
export function summarizeEligible(
  programs: Pick<BenefitProgram, "name" | "description">[],
  totalAnnual: number,
): string {
  const count = `${programs.length} program${programs.length > 1 ? "s" : ""}`;
  if (totalAnnual > 0) {
    return `Great news! We found ${count} you may qualify for, worth up to $${totalAnnual.toLocaleString()}/year.`;
  }
  if (programs.length === 1) {
    const [program] = programs;
    const sentence = (
      program.description.match(/^.*?[.!?](\s|$)/)?.[0] ?? program.description
    ).trim();
    const ending = /[.!?]$/.test(sentence) ? "" : ".";
    return `Great news! You may qualify for ${program.name}. ${sentence}${ending}`;
  }
  return `Great news! We found ${count} you may qualify for: ${programs.map((p) => p.name).join(", ")}.`;
}
