/**
 * CI check: validates DESIGN.md component count matches src/components/ui/.
 *
 * Exits 0 if counts match, 1 if they drift.
 * Run via: pnpm design-sync
 */

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const UI_DIR = join(__dirname, "../src/components/ui");
const DESIGN_MD = join(__dirname, "../DESIGN.md");

// Count .tsx files in src/components/ui/
const uiFiles = readdirSync(UI_DIR).filter((f) => f.endsWith(".tsx"));
const actualCount = uiFiles.length;

// Extract count from DESIGN.md (looks for "N components" pattern)
const designContent = readFileSync(DESIGN_MD, "utf-8");
const countMatch = designContent.match(
  /(\d+)\s+(?:components|in\s+`src\/components\/ui)/i,
);
const documentedCount = countMatch ? parseInt(countMatch[1], 10) : -1;

// Check which components are in the dir but missing from DESIGN.md
const missing: string[] = [];
for (const file of uiFiles) {
  const name = file.replace(/\.tsx$/, "");
  // Check if the component name appears anywhere in DESIGN.md
  if (!designContent.includes(name)) {
    missing.push(name);
  }
}

console.log("\n Design System Sync Check");
console.log(`  src/components/ui/: ${actualCount} components`);
console.log(`  DESIGN.md claims:   ${documentedCount} components`);
console.log(`  Missing from docs:  ${missing.length}`);

if (missing.length > 0) {
  console.log(`\n  Components in ui/ but not in DESIGN.md:`);
  for (const m of missing) {
    console.log(`    - ${m}`);
  }
}

if (actualCount !== documentedCount || missing.length > 0) {
  console.log(
    "\n DESIGN.md is out of sync. Update DESIGN.md and /docs/design-system/components.\n",
  );
  process.exit(1);
} else {
  console.log("\n DESIGN.md is in sync.\n");
  process.exit(0);
}
