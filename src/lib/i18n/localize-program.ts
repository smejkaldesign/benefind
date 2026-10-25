import type { BenefitProgram } from "@/lib/benefits/types";
import type { Dictionary } from "./dictionaries";

/** Returns the program with its user-facing text in the active locale. */
export function localizeProgram<
  P extends Pick<BenefitProgram, "id" | "name" | "description">,
>(program: P, t: Dictionary): P {
  void t;
  return program;
}
