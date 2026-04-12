import { checkFreshness } from "../src/lib/blog-freshness";

const report = checkFreshness();
const stale = report.filter((r) => r.isStale);

console.log(`\n Content Freshness Report`);
console.log(`Total posts: ${report.length}`);
console.log(`Stale (90+ days): ${stale.length}`);
console.log(`Fresh: ${report.length - stale.length}\n`);

if (stale.length > 0) {
  console.log("  Stale posts:");
  for (const s of stale) {
    console.log(
      `  - ${s.title} (${s.daysSinceUpdate} days, last: ${s.lastModified})`,
    );
  }
}

// Exit with code 1 if stale posts found (useful for CI)
process.exit(stale.length > 0 ? 1 : 0);
