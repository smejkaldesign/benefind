import type {
  CompanyEligibilityResult,
  CompanyProgram,
  CompanyProgramCategory,
} from "@/lib/benefits/company-types";

export interface CompanyMatchDetails {
  agency: string;
  description: string;
  status: CompanyProgram["status"];
  estimatedValue: string | null;
  whyYouQualify: string[];
  nextSteps: string[];
  applicationUrl: string | null;
  deadlineInfo: string | null;
}

export interface CompanyMatchView {
  id: string;
  shortName: string;
  category: CompanyProgramCategory;
  /** Null when the workspace is not on the Business plan. */
  details: CompanyMatchDetails | null;
}

/**
 * Builds what the UI may show for each matched company program. Without the
 * Business plan only the name and category leave this function, so details
 * never reach the page or the client payload.
 */
export function toCompanyMatchViews(
  programs: ReadonlyArray<{
    program: Pick<
      CompanyProgram,
      | "id"
      | "shortName"
      | "category"
      | "agency"
      | "description"
      | "status"
      | "applicationUrl"
      | "deadlineInfo"
    >;
    result: Pick<
      CompanyEligibilityResult,
      "eligible" | "estimatedValue" | "whyYouQualify" | "nextSteps"
    >;
  }>,
  showDetails: boolean,
): CompanyMatchView[] {
  return programs
    .filter((p) => p.result.eligible)
    .map(({ program, result }) => ({
      id: program.id,
      shortName: program.shortName,
      category: program.category,
      details: showDetails
        ? {
            agency: program.agency,
            description: program.description,
            status: program.status,
            estimatedValue: result.estimatedValue ?? null,
            whyYouQualify: result.whyYouQualify ?? [],
            nextSteps: result.nextSteps,
            applicationUrl: program.applicationUrl ?? null,
            deadlineInfo: program.deadlineInfo ?? null,
          }
        : null,
    }));
}
