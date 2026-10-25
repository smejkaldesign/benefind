import { runScreening } from "../benefits/engine";
import { PURSUABLE_TIERS } from "../benefits/types";
import type {
  EligibilityTier,
  ReasonsPayload,
  ScreeningResult,
} from "../benefits/types";
import { answersToScreeningInput } from "../screening/steps";
import type { Json, TablesInsert } from "../../types/database";

export interface NewMatch {
  programId: string;
  programName: string;
  confidenceScore: number;
  eligibilityTier: EligibilityTier;
  estimatedValue: string | null;
  reasons: ReasonsPayload;
}

interface FindNewMatchesInput {
  /** The latest screening's stored answers. */
  answers: Record<string, string>;
  /** Program ids the user has already seen as pursuable or been emailed about. */
  knownProgramIds: ReadonlySet<string>;
  /**
   * Program ids present in the programs table. screening_results and
   * new_match_alerts both reference programs(id), so anything else cannot be
   * stored or announced.
   */
  catalogProgramIds: ReadonlySet<string>;
  run?: (answers: Record<string, string>) => ScreeningResult;
}

const runFromAnswers = (answers: Record<string, string>) =>
  runScreening(answersToScreeningInput(answers));

/**
 * Re-runs the current engine against a saved screening and returns programs
 * that are now pursuable but were never shown or announced. A screening with
 * zero stored results has an empty known set, so every pursuable catalog
 * program counts as new.
 */
export function findNewMatches({
  answers,
  knownProgramIds,
  catalogProgramIds,
  run = runFromAnswers,
}: FindNewMatchesInput): NewMatch[] {
  return run(answers)
    .programs.filter(
      ({ program, result }) =>
        PURSUABLE_TIERS.has(result.eligibilityTier) &&
        catalogProgramIds.has(program.id) &&
        !knownProgramIds.has(program.id),
    )
    .map(({ program, result }) => ({
      programId: program.id,
      programName: program.name,
      confidenceScore: result.confidenceScore,
      eligibilityTier: result.eligibilityTier,
      estimatedValue: result.estimatedMonthlyValue
        ? `$${result.estimatedMonthlyValue}/mo`
        : null,
      reasons: result.reasons,
    }));
}

/**
 * Program ids the user already knows about: stored results in a pursuable
 * tier plus every program previously announced for the workspace. A stored
 * result in a non-pursuable tier does not count, so a program that moves up
 * into a pursuable tier is announced.
 */
export function knownProgramIds(
  storedResults: ReadonlyArray<{
    program_id: string;
    eligibility_tier: string;
  }>,
  announcedProgramIds: Iterable<string>,
): Set<string> {
  const known = new Set(announcedProgramIds);
  for (const r of storedResults) {
    if (PURSUABLE_TIERS.has(r.eligibility_tier as EligibilityTier)) {
      known.add(r.program_id);
    }
  }
  return known;
}

/**
 * screening_results rows for announced matches. eligibility_tier is a
 * generated column derived from confidence_score, so it is never written;
 * confidence_score is a 0..100 smallint.
 */
export function toResultRows(
  screeningId: string,
  workspaceId: string,
  matches: readonly NewMatch[],
): TablesInsert<"screening_results">[] {
  return matches.map((m) => ({
    screening_id: screeningId,
    workspace_id: workspaceId,
    program_id: m.programId,
    confidence_score: Math.max(0, Math.min(100, Math.round(m.confidenceScore))),
    estimated_value: m.estimatedValue,
    reasons: m.reasons as unknown as Json,
  }));
}
