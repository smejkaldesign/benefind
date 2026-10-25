import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it, expect } from "vitest";
import { ALL_PROGRAMS } from "../engine";
import { getStatePrograms, getSupportedStates } from "../state-programs";
import { ALL_COMPANY_PROGRAMS } from "../company-engine";

// screening_results.program_id has a foreign key to programs.id, and a
// screening saves a result row for every program the engine evaluates. Any
// engine id missing from the seed makes every screening fail to save.
describe("programs seed", () => {
  const seed = readFileSync(
    join(process.cwd(), "supabase/seed/programs.sql"),
    "utf8",
  );
  const seededIds = new Set(
    [...seed.matchAll(/^\(\s*'([a-z0-9-]+)',/gm)].map((m) => m[1]),
  );

  it("contains every federal engine program id", () => {
    const missing = ALL_PROGRAMS.map((p) => p.id).filter(
      (id) => !seededIds.has(id),
    );
    expect(missing).toEqual([]);
  });

  it("contains every state program id", () => {
    const stateIds = getSupportedStates().flatMap((s) =>
      getStatePrograms(s).map((p) => p.id),
    );
    const missing = stateIds.filter((id) => !seededIds.has(id));
    expect(missing).toEqual([]);
  });

  it("contains every company program id", () => {
    const missing = ALL_COMPANY_PROGRAMS.map((p) => p.id).filter(
      (id) => !seededIds.has(id),
    );
    expect(missing).toEqual([]);
  });
});
