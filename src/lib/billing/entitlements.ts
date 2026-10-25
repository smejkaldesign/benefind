import type { Database } from "@/types/database";

export type WorkspaceTier = Database["public"]["Enums"]["workspace_tier"];
export type WorkspaceType = Database["public"]["Enums"]["workspace_type"];

export type PlanId =
  "personal_free" | "personal_premium" | "business_free" | "business";

export interface Entitlements {
  plan: PlanId;
  paid: boolean;
  /** Older screenings in the dashboard list and /dashboard/screenings/[id]. */
  screeningHistory: boolean;
  /** Re-screen with answers from the latest screening (?prefill=latest). */
  rescreenPrefill: boolean;
  /** Upload and list files in /dashboard/documents. */
  documents: boolean;
  /** Daily new-match emails. */
  newMatchAlerts: boolean;
  prioritySupport: boolean;
  /** Estimated value, reasons, and next steps for matched company programs. */
  companyProgramDetails: boolean;
}

/**
 * Maps a workspace to what it may use. A missing workspace (signed out, or no
 * workspace selected) gets the free plan for the given type. Every gate in
 * the app reads from this so pricing changes happen in one place.
 */
export function getEntitlements(
  workspace: { tier: WorkspaceTier; type: WorkspaceType } | null,
  fallbackType: WorkspaceType = "individual",
): Entitlements {
  const type = workspace?.type ?? fallbackType;
  const paid = workspace?.tier === "premium";

  if (type === "company") {
    return {
      plan: paid ? "business" : "business_free",
      paid,
      screeningHistory: false,
      rescreenPrefill: false,
      documents: paid,
      newMatchAlerts: false,
      prioritySupport: paid,
      companyProgramDetails: paid,
    };
  }

  return {
    plan: paid ? "personal_premium" : "personal_free",
    paid,
    screeningHistory: paid,
    rescreenPrefill: paid,
    documents: paid,
    newMatchAlerts: paid,
    prioritySupport: paid,
    companyProgramDetails: false,
  };
}
