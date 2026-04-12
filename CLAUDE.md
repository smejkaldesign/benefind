# context-mode — MANDATORY routing rules

You have context-mode MCP tools available. These rules are NOT optional — they protect your context window from flooding. A single unrouted command can dump 56 KB into context and waste the entire session.

## BLOCKED commands — do NOT attempt these

### curl / wget — BLOCKED
Any Bash command containing `curl` or `wget` is intercepted and replaced with an error message. Do NOT retry.
Instead use:
- `ctx_fetch_and_index(url, source)` to fetch and index web pages
- `ctx_execute(language: "javascript", code: "const r = await fetch(...)")` to run HTTP calls in sandbox

### Inline HTTP — BLOCKED
Any Bash command containing `fetch('http`, `requests.get(`, `requests.post(`, `http.get(`, or `http.request(` is intercepted and replaced with an error message. Do NOT retry with Bash.
Instead use:
- `ctx_execute(language, code)` to run HTTP calls in sandbox — only stdout enters context

### WebFetch — BLOCKED
WebFetch calls are denied entirely. The URL is extracted and you are told to use `ctx_fetch_and_index` instead.
Instead use:
- `ctx_fetch_and_index(url, source)` then `ctx_search(queries)` to query the indexed content

## REDIRECTED tools — use sandbox equivalents

### Bash (>20 lines output)
Bash is ONLY for: `git`, `mkdir`, `rm`, `mv`, `cd`, `ls`, `npm install`, `pip install`, and other short-output commands.
For everything else, use:
- `ctx_batch_execute(commands, queries)` — run multiple commands + search in ONE call
- `ctx_execute(language: "shell", code: "...")` — run in sandbox, only stdout enters context

### Read (for analysis)
If you are reading a file to **Edit** it → Read is correct (Edit needs content in context).
If you are reading to **analyze, explore, or summarize** → use `ctx_execute_file(path, language, code)` instead. Only your printed summary enters context. The raw file content stays in the sandbox.

### Grep (large results)
Grep results can flood context. Use `ctx_execute(language: "shell", code: "grep ...")` to run searches in sandbox. Only your printed summary enters context.

## Tool selection hierarchy

1. **GATHER**: `ctx_batch_execute(commands, queries)` — Primary tool. Runs all commands, auto-indexes output, returns search results. ONE call replaces 30+ individual calls.
2. **FOLLOW-UP**: `ctx_search(queries: ["q1", "q2", ...])` — Query indexed content. Pass ALL questions as array in ONE call.
3. **PROCESSING**: `ctx_execute(language, code)` | `ctx_execute_file(path, language, code)` — Sandbox execution. Only stdout enters context.
4. **WEB**: `ctx_fetch_and_index(url, source)` then `ctx_search(queries)` — Fetch, chunk, index, query. Raw HTML never enters context.
5. **INDEX**: `ctx_index(content, source)` — Store content in FTS5 knowledge base for later search.

## Subagent routing

When spawning subagents (Agent/Task tool), the routing block is automatically injected into their prompt. Bash-type subagents are upgraded to general-purpose so they have access to MCP tools. You do NOT need to manually instruct subagents about context-mode.

## Output constraints

- Keep responses under 500 words.
- Write artifacts (code, configs, PRDs) to FILES — never return them as inline text. Return only: file path + 1-line description.
- When indexing content, use descriptive source labels so others can `ctx_search(source: "label")` later.

## ctx commands

| Command | Action |
|---------|--------|
| `ctx stats` | Call the `ctx_stats` MCP tool and display the full output verbatim |
| `ctx doctor` | Call the `ctx_doctor` MCP tool, run the returned shell command, display as checklist |
| `ctx upgrade` | Call the `ctx_upgrade` MCP tool, run the returned shell command, display as checklist |

---

# benefind — repo conventions

## Format conventions (CI-enforced)

- **Prettier is the only source of truth** for JS/TS/TSX/JSON/MD (where unignored) formatting. Run `pnpm format` to fix, `pnpm format:check` to verify.
- **`.prettierignore` is load-bearing**, do not shrink it carelessly. It excludes `pnpm-lock.yaml`, `docs/**`, `CLAUDE.md`, `DESIGN.md`, `.claude/**`, `src/content/**/*.{md,mdx}`, and `docker/**/README.md`. Without these, `pnpm format` rewrites lockfiles and reflows hand-maintained specs. Sprint Z retro captured the incident.
- **CI enforces format on every PR** via `.github/workflows/ci.yml` (the `Prettier` job). Merges are blocked on format drift.
- **Pre-commit hook** (`.husky/pre-commit`) runs `prettier --check` on staged files only. Catches drift locally before it becomes a CI failure.

## Factual data conventions

Any factual `Set` or constant that touches benefits eligibility (state EITC lists, Medicaid expansion status, FPL tables, income thresholds, deadlines, etc.) MUST carry:

1. A **source citation** in a comment above the declaration — primary sources only (CBPP, KFF, IRS, gov sites, legislative text)
2. A **`Last verified: YYYY-MM-DD`** comment
3. A **pointer to the annual data-refresh task** so drift gets caught on a known schedule

Example (see `src/lib/benefits/programs/eitc.ts`):

```ts
// States with a matching state EITC program.
// Source: CBPP "Policy Basics: State Earned Income Tax Credits" + IRS publications.
// Last verified: 2026-04-11 for 2025 tax year.
// Note: North Carolina is deliberately NOT on this list — NC eliminated its
// state EITC in 2014 (the only state ever to do so) and has not reenacted.
// Re-check annually — see umbrella task "Annual state benefits data refresh".
const STATE_EITC_STATES = new Set([...]);
```

**Why:** LLM code reviewers (SCAN) can confidently hallucinate policy facts. On Sprint Z, SCAN claimed NC had state EITC since 2024 — factually wrong. Primary-source citations are the cheapest defense and let future reviewers resolve disputes in seconds instead of an hour of research.

## Database migrations

- All migrations live in `supabase/migrations/` with timestamp prefix `YYYYMMDD_NNNN_<domain>.sql`
- `docs/data-model.md` is the source of truth for schema; migrations must stay in sync with the spec
- Never alter an already-applied migration — write a new one that transforms the schema
- Helper functions (`is_workspace_member`, `is_admin`) live in the earliest foundation migration
- Every table gets `deleted_at timestamptz` for the D6 30-day soft-delete retention policy

