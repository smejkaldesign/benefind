import { describe, it, expect, vi } from "vitest";
import { createScreening } from "../screenings";

function clientReturning(result: { data: unknown; error: unknown }) {
  const rpc = vi.fn().mockResolvedValue(result);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return { client: { rpc } as any, rpc };
}

const input = {
  workspaceId: "ws-1",
  answers: { state: "OR" },
  engineVersion: "v2",
  state: "OR",
  householdSize: 2,
  results: [
    {
      programId: "eitc",
      confidenceScore: 104.6,
      eligibilityTier: "eligible_with_requirements",
      estimatedValue: "$50/mo",
      reasons: { rules: [] },
    },
    { programId: "snap", confidenceScore: -3, reasons: {} },
  ],
};

describe("createScreening", () => {
  it("saves the screening and results in one create_screening call", async () => {
    const { client, rpc } = clientReturning({ data: "s-1", error: null });

    const { data, error } = await createScreening(client, input);

    expect(error).toBeNull();
    expect(data).toEqual({ id: "s-1" });
    expect(rpc).toHaveBeenCalledTimes(1);
    expect(rpc).toHaveBeenCalledWith("create_screening", {
      p_workspace_id: "ws-1",
      p_answers: { state: "OR" },
      p_engine_version: "v2",
      p_state: "OR",
      p_zip: null,
      p_household_size: 2,
      p_language: "en",
      p_results: [
        {
          program_id: "eitc",
          confidence_score: 100,
          estimated_value: "$50/mo",
          reasons: { rules: [] },
        },
        {
          program_id: "snap",
          confidence_score: 0,
          estimated_value: null,
          reasons: {},
        },
      ],
    });
  });

  it("returns the database error when the save fails", async () => {
    const dbError = { code: "23505", message: "duplicate key" };
    const { client } = clientReturning({ data: null, error: dbError });

    const { data, error } = await createScreening(client, input);

    expect(data).toBeNull();
    expect(error).toBe(dbError);
  });
});
