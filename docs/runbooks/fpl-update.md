# Annual FPL Threshold Update Runbook

## When
- **HHS publishes**: Usually late January/early February
- **Effective date**: Programs begin using new thresholds on varying schedules
  - SNAP: October 1
  - Medicaid: When state plans are updated (varies)
  - Section 8: When HUD publishes new AMI limits (usually April)

## What Changes
Every eligibility guide has income limit tables. The Federal Poverty Level thresholds change annually.

## Steps

1. **Monitor**: Watch for HHS Federal Register notice (usually published in late January at https://aspe.hhs.gov/poverty-guidelines)
2. **Update FPL reference table** in benefind-consumer-programs-research.md
3. **Batch-update all consumer guides** (7 posts):
   - snap-eligibility-2026 -> update gross/net income tables
   - medicaid-eligibility-2026 -> update 138% FPL thresholds
   - section-8-eligibility-2026 -> update when HUD publishes new AMI
   - ssi-eligibility-2026 -> update when SSA publishes new FBR
   - eitc-eligibility-2026 -> update when IRS publishes new limits
   - chip-eligibility-2026 -> update state FPL thresholds
   - wic-eligibility-2026 -> update 185% FPL thresholds
4. **Update state overlay pages** (30 pages)
5. **Update lastModified dates** in blog.ts
6. **Update year in titles/slugs** if changing year (e.g., 2026->2027):
   - Create new slug versions
   - Redirect old slugs
   - Update internal cross-links
7. **Run freshness check**: `pnpm freshness`
8. **Create PR** with all updates
9. **Update sitemap lastmod dates**

## Automation Candidates
- Script to find/replace FPL dollar amounts across all MDX files
- Script to update lastModified dates in blog.ts
- CI check that flags posts with outdated year in title

## Key URLs
- HHS Poverty Guidelines: https://aspe.hhs.gov/poverty-guidelines
- HUD AMI Limits: https://www.huduser.gov/portal/datasets/il.html
- SSA FBR: https://www.ssa.gov/oact/cola/SSI.html
- IRS EITC: https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit-eitc
