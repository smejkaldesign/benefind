"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { persistScreening } from "@/app/screening/actions";
import { ENGINE_VERSION } from "@/lib/benefits/types";
import { STORAGE_KEYS } from "@/lib/constants";

/**
 * Client component that persists sessionStorage screening results to the
 * database after a post-screening signup flow. Mounts invisibly on the
 * dashboard; runs once when `?from=screening` is in the URL.
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
    if (searchParams.get("from") !== "screening") return;

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
