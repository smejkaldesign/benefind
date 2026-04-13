"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  persistScreening,
  persistCompanyScreening,
} from "@/app/screening/actions";
import { ENGINE_VERSION } from "@/lib/benefits/types";
import { STORAGE_KEYS } from "@/lib/constants";

/**
 * Client component that persists sessionStorage screening results to the
 * database after a post-screening signup flow. Mounts invisibly on the
 * dashboard; runs once when `?from=screening` or `?from=company-screening`
 * is in the URL.
 *
 * Flow: user completes screening (unauthenticated) -> signs up -> callback
 * redirects to /dashboard?from=screening -> this component reads
 * sessionStorage, calls persistScreening(), clears storage, and refreshes
 * so the server component picks up the new DB data.
 */
export function PersistScreeningOnMount() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const persisted = useRef(false);

  useEffect(() => {
    if (persisted.current) return;

    const from = searchParams.get("from");
    if (from !== "screening" && from !== "company-screening") return;

    if (from === "company-screening") {
      const raw = sessionStorage.getItem(STORAGE_KEYS.COMPANY_SCREENING_RESULT);
      const rawAnswers = sessionStorage.getItem(
        STORAGE_KEYS.COMPANY_SCREENING_ANSWERS,
      );
      if (!raw) return;

      persisted.current = true;

      try {
        const result = JSON.parse(raw);
        const answers: Record<string, string> = rawAnswers
          ? JSON.parse(rawAnswers)
          : {};
        if (!Array.isArray(result.programs)) return;

        persistCompanyScreening({
          answers,
          engineVersion: result.engineVersion ?? ENGINE_VERSION,
          companyName: answers.companyName,
          state: answers.state,
          industry: answers.industry,
          companyAge: answers.companyAge,
          employeeCount: answers.employeeCount,
          annualRevenue: answers.annualRevenue,
          hasRnd: answers.hasRnd === "yes",
          rndPercentage: answers.rndPercentage
            ? parseInt(answers.rndPercentage) || undefined
            : undefined,
          ownershipDemographics: answers.ownershipDemographics
            ? answers.ownershipDemographics
                .split(",")
                .filter((v) => v !== "none")
            : undefined,
          isRural: answers.isRural === "yes",
          exportsOrPlans: answers.exportsOrPlans === "yes",
          isHiring: answers.isHiring === "yes",
          hasCleanEnergy: answers.hasCleanEnergy === "yes",
          results: result.programs.map(
            (p: {
              program: { id: string };
              result: {
                matchScore: number;
                eligible: boolean;
                estimatedValue?: string | null;
                reason: string;
                whyYouQualify: string[];
                nextSteps: string[];
              };
            }) => ({
              programId: p.program.id,
              confidenceScore: p.result.matchScore,
              eligible: p.result.eligible,
              estimatedValue: p.result.estimatedValue ?? null,
              reasons: {
                reason: p.result.reason,
                whyYouQualify: p.result.whyYouQualify,
                nextSteps: p.result.nextSteps,
              },
            }),
          ),
        })
          .then(() => {
            sessionStorage.removeItem(STORAGE_KEYS.COMPANY_SCREENING_RESULT);
            sessionStorage.removeItem(STORAGE_KEYS.COMPANY_SCREENING_ANSWERS);
            router.replace("/dashboard");
            router.refresh();
          })
          .catch(() => {
            // Non-blocking: dashboard still shows DB results if available
          });
      } catch {
        // Malformed sessionStorage data; ignore
      }
      return;
    }

    // Personal screening flow
    const raw = sessionStorage.getItem(STORAGE_KEYS.SCREENING_RESULT);
    const rawAnswers = sessionStorage.getItem(STORAGE_KEYS.SCREENING_ANSWERS);
    if (!raw) return;

    persisted.current = true;

    try {
      const result = JSON.parse(raw);
      const answers: Record<string, string> = rawAnswers
        ? JSON.parse(rawAnswers)
        : {};

      if (!Array.isArray(result.programs)) return;

      persistScreening({
        answers,
        engineVersion: result.engineVersion ?? ENGINE_VERSION,
        state: answers.state,
        householdSize: answers.householdSize
          ? parseInt(answers.householdSize) || undefined
          : undefined,
        results: result.programs.map(
          (p: {
            program: { id: string };
            result: {
              confidenceScore: number;
              eligibilityTier?: string;
              estimatedMonthlyValue?: number;
              reasons: Record<string, unknown>;
            };
          }) => ({
            programId: p.program.id,
            confidenceScore: p.result.confidenceScore,
            eligibilityTier: p.result.eligibilityTier,
            estimatedValue: p.result.estimatedMonthlyValue
              ? `$${p.result.estimatedMonthlyValue}/mo`
              : null,
            reasons: p.result.reasons,
          }),
        ),
      })
        .then(() => {
          // Clear sessionStorage so we don't re-persist on next visit
          sessionStorage.removeItem(STORAGE_KEYS.SCREENING_RESULT);
          sessionStorage.removeItem(STORAGE_KEYS.SCREENING_ANSWERS);
          // Refresh the page to pick up DB data (strips ?from=screening)
          router.replace("/dashboard");
          router.refresh();
        })
        .catch(() => {
          // Non-blocking: the dashboard still shows DB results if available
        });
    } catch {
      // Malformed sessionStorage data; ignore
    }
  }, [searchParams, router]);

  return null;
}
