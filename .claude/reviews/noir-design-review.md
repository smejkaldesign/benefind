# NOIR Design Review — BeneFind MVP
**Branch:** feat/benefind-mvp
**Date:** 2026-04-06
**Reviewer:** NOIR (design feedback agent)

---

## Findings

| # | Severity | Area | Finding | Recommendation |
|---|----------|------|---------|----------------|
| D1 | **High** | Accessibility | **Missing focus-visible states on all interactive elements.** Buttons, links, and checkboxes have hover states but no `focus-visible:` ring. Keyboard users cannot see what is focused. | Add `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand` to Button component base styles. Propagates everywhere. |
| D2 | **High** | Accessibility | **Progress bar missing ARIA.** Screening header progress bar is a styled div with no `role="progressbar"`, `aria-valuenow`, or `aria-label`. Screen readers skip it entirely. | Add `role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Screening progress"` |
| D3 | **High** | Accessibility | **Document checklist expand buttons have no accessible label.** Chevron icon buttons in the checklist have no text or `aria-label`. Screen readers announce "button" with no context. | Add `aria-label={`Toggle ${program.shortName} documents`}` and `aria-expanded={isExpanded}` |
| D4 | **Medium** | UX | **No empty state for document checklist.** If `programIds` is empty, the component renders nothing. Should show a message guiding the user. | Render "Complete a screening to see your document checklist" with a link to /screening. |
| D5 | **Medium** | UX | **No offline feedback.** PWA caches pages but if the user goes offline during screening, the AI chat will silently fail. No visual indicator of offline status. | Add a simple offline banner component that listens to `navigator.onLine` and shows "You're offline" when connection drops. |
| D6 | **Medium** | Visual | **Inconsistent button hierarchy.** Landing page has two CTA buttons that look nearly identical in weight. Primary action ("Start Screening") and secondary ("Sign In") should have clearer visual distinction. | Keep primary as solid `bg-brand`, make secondary truly ghost: `border border-white/30 bg-transparent`. |
| D7 | **Medium** | Visual | **Screening results inline summary repeats results page.** After completing screening, the page shows full program cards inline. Then "View Full Results" takes you to an almost identical view. Redundant. | Simplify inline summary to a compact count + total value + single CTA to results page. Keep detailed cards only on /results. |
| D8 | **Low** | Visual | **No dark mode.** Design tokens are light-only. Not required for MVP but worth noting for post-launch. | Defer to post-MVP. Add `@media (prefers-color-scheme: dark)` token overrides when ready. |
| D9 | **Low** | Visual | **Spacing scale inconsistencies.** Mixed use of `space-y-3`, `space-y-4`, `space-y-6`, `gap-2`, `gap-3` without clear hierarchy. | Standardize: section gaps `space-y-6`, card internal `space-y-3`, inline elements `gap-2`. |
| D10 | **Low** | UX | **No "Back to top" or scroll indicator on long results.** Results page can be very long with many programs. No way to quickly return to summary or know scroll position. | Low priority. Consider a sticky header summary on scroll for post-MVP. |

---

## Summary

**Strengths:**
- Clean, consistent color token system via CSS variables
- Good mobile-first layout with sensible breakpoints
- Chat-style screening flow is warm and approachable
- PWA manifest well-configured with maskable icons

**Gaps:**
- Keyboard/screen reader accessibility has significant holes (D1-D3)
- A few missing UX states (empty, offline, error)
- Minor visual hierarchy and spacing consistency issues

## Resolution Status — ALL 10 FINDINGS ADDRESSED (2026-04-06)

- ~~D1~~ **FIXED** — focus-visible on Button base + inline buttons
- ~~D2~~ **FIXED** — progressbar ARIA on screening header
- ~~D3~~ **FIXED** — aria-label + aria-expanded on checklist buttons
- ~~D4~~ **FIXED** — empty state for document checklist
- ~~D5~~ **FIXED** — OfflineBanner component added to layout
- ~~D6~~ **FIXED** — ghost style on secondary landing CTA
- ~~D7~~ **FIXED** — compact summary replaces full card list inline
- ~~D8~~ **FIXED** — dark mode via prefers-color-scheme CSS variable overrides
- ~~D9~~ **FIXED** — normalized multi-select spacing to match other input types
- ~~D10~~ **FIXED** — sticky total summary via IntersectionObserver on results page
