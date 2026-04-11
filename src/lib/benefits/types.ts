/** Household member for eligibility calculation */
export interface HouseholdMember {
  age: number;
  relationship: "self" | "spouse" | "child" | "parent" | "other";
  isDisabled?: boolean;
  isPregnant?: boolean;
  isVeteran?: boolean;
  isStudent?: boolean;
  isCitizen?: boolean; // US citizen or qualified immigrant
}

/** Core screening input from the user */
export interface ScreeningInput {
  state: string; // 2-letter state code
  householdSize: number;
  householdMembers: HouseholdMember[];
  monthlyIncome: number; // gross monthly
  monthlyExpenses?: {
    rent?: number;
    childcare?: number;
    medical?: number;
  };
  assets?: number; // liquid assets
  isEmployed?: boolean;
  hasHealthInsurance?: boolean;
}

/** A single benefit program definition */
export interface BenefitProgram {
  id: string;
  name: string;
  shortName: string;
  description: string;
  category: ProgramCategory;
  federalOrState: "federal" | "state";
  applicationUrl?: string;
  documentsNeeded: string[];
  estimateMonthly?: (input: ScreeningInput) => number | null;
  /**
   * Returns either the legacy EligibilityResult shape or the new rich
   * EligibilityEvaluation shape. The engine normalizes both into the
   * canonical ScoredEligibilityResult via `normalizeProgramResult()`
   * in scoring.ts.
   *
   * IMPORTANT: Callers of `checkEligibility` MUST route the result
   * through `normalizeProgramResult()` before reading any scored fields
   * (confidenceScore, eligibilityTier, reasons). Neither shape in this
   * union exposes those fields directly — they are computed at
   * normalization time. TypeScript's structural typing enforces this:
   * accessing `.reasons`, `.confidenceScore`, or `.eligibilityTier` on
   * the raw union type will fail to compile, because neither variant
   * declares them.
   *
   * New programs should return EligibilityEvaluation. Legacy programs
   * are bridged automatically via `bridgeLegacyResult()`.
   */
  checkEligibility: (
    input: ScreeningInput,
  ) => EligibilityResult | EligibilityEvaluation;
}

/**
 * Tiers considered actionable for the user — at or above "probably
 * eligible". Exported as a single source of truth so results/page,
 * screening/page, engine.ts, and any future consumer use the same
 * definition. Mutating the set would accidentally widen every filter
 * at once, so it's exported as ReadonlySet.
 */
export const PURSUABLE_TIERS: ReadonlySet<EligibilityTier> =
  new Set<EligibilityTier>(["eligible_with_requirements", "probably_eligible"]);

export type ProgramCategory =
  | "food"
  | "healthcare"
  | "housing"
  | "income"
  | "childcare"
  | "energy"
  | "education"
  | "tax-credit";

// ============================================================================
// Legacy result shape (pre-refactor, still supported via the bridge)
// ============================================================================

/**
 * @deprecated Use EligibilityEvaluation for new programs. The engine
 * bridges this shape to the canonical scored form automatically.
 */
export interface EligibilityResult {
  eligible: boolean;
  confidence: "high" | "medium" | "low";
  reason: string;
  estimatedMonthlyValue?: number;
  estimatedAnnualValue?: number;
  nextSteps?: string[];
}

// ============================================================================
// New rich evaluation shape (canonical going forward)
// ============================================================================

/**
 * A single rule the engine evaluated. Rules are hard constraints with
 * weights. A rule with `veto: true` that fails immediately sets the
 * final score to 0 regardless of other signals.
 */
export interface RuleResult {
  /** Stable identifier for this rule (e.g., "income_under_130_fpl") */
  name: string;
  /** Human-readable label shown in the "Why am I eligible?" panel */
  label: string;
  /** Did the rule pass? */
  passed: boolean;
  /** Relative weight of this rule (higher = more impactful) */
  weight: number;
  /** If true and passed=false, this is a hard disqualifier (score=0, tier=ineligible) */
  veto?: boolean;
  /** The actual value measured (optional, for display) */
  actual?: string;
  /** The threshold the rule is checking against (optional, for display) */
  threshold?: string;
}

/** A soft signal that nudges the score but cannot veto. */
export interface Signal {
  /** Stable identifier (e.g., "has_dependents") */
  name: string;
  /** Human-readable label */
  label: string;
  /** Did the signal match? */
  matched: boolean;
  /** Weight (typically smaller than rule weights) */
  weight: number;
}

/** A field the screener did not collect, reducing confidence. */
export interface MissingField {
  /** Field name (e.g., "tax_filing_status") */
  field: string;
  /** Human-readable label */
  label: string;
  /** Penalty applied to the final score (subtracted after weighted sum) */
  penalty: number;
}

/**
 * The rich evaluation shape new programs return. The engine computes
 * the final `confidenceScore` from rules + signals - missing penalties
 * via `scoreEvaluation()`.
 */
export interface EligibilityEvaluation {
  rules: RuleResult[];
  signals?: Signal[];
  missing?: MissingField[];
  /** Short user-facing reason — used as the primary dashboard blurb */
  reason: string;
  estimatedMonthlyValue?: number;
  estimatedAnnualValue?: number;
  nextSteps?: string[];
}

// ============================================================================
// Canonical scored result (what the engine returns to callers)
// ============================================================================

/** 5-tier eligibility bucket, derived from confidenceScore. */
export type EligibilityTier =
  | "eligible_with_requirements" // 70-100
  | "probably_eligible" // 50-69
  | "maybe_eligible" // 25-49
  | "not_likely" // 5-24
  | "ineligible"; // 0-4

/** The rule-engine version string written into every result. */
export const ENGINE_VERSION = "1.0.0";

/**
 * The reasons jsonb payload stored on screening_results rows.
 * Shape matches the canonical data model §D3.
 */
export interface ReasonsPayload {
  rules: RuleResult[];
  signals: Signal[];
  missing: MissingField[];
  computed_score: number;
  engine_version: string;
}

/**
 * Canonical scored result. Every program ultimately produces this shape,
 * either directly (new programs via EligibilityEvaluation) or via the
 * bridge from the legacy EligibilityResult.
 */
export interface ScoredEligibilityResult {
  /** Integer 0-100 confidence score. */
  confidenceScore: number;
  /** Generated tier from the score (matches DB generated column). */
  eligibilityTier: EligibilityTier;
  /** Short user-facing reason. */
  reason: string;
  /** Structured explainability payload. */
  reasons: ReasonsPayload;
  /** Estimated monetary values (if computable). */
  estimatedMonthlyValue?: number;
  estimatedAnnualValue?: number;
  /** Next-step checklist for the user. */
  nextSteps?: string[];
}

/** Full screening result for a user */
export interface ScreeningResult {
  input: ScreeningInput;
  timestamp: string;
  engineVersion: string;
  programs: {
    program: BenefitProgram;
    result: ScoredEligibilityResult;
  }[];
  totalEstimatedMonthly: number;
  totalEstimatedAnnual: number;
}

/** Federal Poverty Level thresholds (2025) */
export const FPL_2025: Record<number, number> = {
  1: 15650,
  2: 21150,
  3: 26650,
  4: 32150,
  5: 37650,
  6: 43150,
  7: 48650,
  8: 54150,
};

/** Get FPL for household size (extrapolate for 9+) */
export function getFPL(householdSize: number): number {
  if (householdSize <= 8) return FPL_2025[householdSize] ?? FPL_2025[1]!;
  return FPL_2025[8]! + (householdSize - 8) * 5500;
}

/** Check if income is below X% of FPL */
export function isBelowFPLPercent(
  annualIncome: number,
  householdSize: number,
  percent: number,
): boolean {
  return annualIncome <= getFPL(householdSize) * (percent / 100);
}
