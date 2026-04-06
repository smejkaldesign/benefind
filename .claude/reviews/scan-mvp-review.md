# SCAN — Benefind MVP Code Review
**Branch:** feat/benefind-mvp
**Date:** 2026-04-04
**Reviewer:** SCAN (code review agent)

---

## Findings

| # | Severity | File | Finding | Recommendation |
|---|----------|------|---------|----------------|
| 1 | **Critical** | `src/app/auth/callback/route.ts` | **Open redirect** — `next` param is appended to `origin` without path-only validation. Any value like `//evil.com` or `https://evil.com` becomes `${origin}//evil.com`, which browsers resolve as a valid redirect. Same issue in `auth/confirm/route.ts`. | Validate `next` starts with `/` and contains no `//` or protocol. Use: `const safePath = next.startsWith('/') && !next.startsWith('//') ? next : '/dashboard';` |
| 2 | **Critical** | `src/lib/crypto/encryption.ts` | **Weak KDF secret** — `encryptScreeningData` uses `userEmail` as the PBKDF2 secret. Email is low-entropy, often public, and constant across sessions. An attacker with the encrypted blob and knowledge of the email can brute-force offline. 100k iterations is marginal for a low-entropy secret. | Derive the key from the Supabase session access token (rotates per session) or a server-side per-user secret, not email. If email must be used, increase to 600k+ iterations and add a pepper. |
| 3 | **High** | `src/app/api/chat/route.ts` | **No authentication check** — `/api/chat` and `/api/explain` are public POST endpoints. Any unauthenticated caller can use the app's Anthropic API key at the app's cost. The middleware only guards non-API paths listed in `PUBLIC_PATHS`; `/api/chat` is not in that list but has no auth check of its own. | Add `const supabase = await createServerSupabase(); const { data: { user } } = await supabase.auth.getUser(); if (!user) return 401;` at the top of both handlers. |
| 4 | **High** | `src/app/api/explain/route.ts` | **Prompt injection** — `body.programName` and `body.topic` are interpolated directly into the LLM prompt with no sanitization. A crafted value like `"; Ignore all previous instructions and..."` can hijack model behavior. | Whitelist `programName` against known program IDs from the engine. Limit `topic` to an enum or strip special characters. Never trust free-text user input in prompt construction. |
| 5 | **High** | `src/app/api/chat/route.ts` | **No rate limiting** — Chat endpoint has no per-IP or per-user rate limit. Combined with missing auth (#3), a single actor can exhaust Anthropic quota. | Add an in-memory or Redis rate limiter (e.g. `upstash/ratelimit`) keyed on `user.id` or IP. Suggested: 20 req/min per user, 5 req/min per IP for unauthenticated. |
| 6 | **High** | `src/app/screening/page.tsx` | **`require()` inside render function** — `handleAnswer` calls `const { US_STATES } = require('@/lib/screening/us-states')` at runtime inside a Client Component event handler. This is a CommonJS `require` in an ESM/RSC context, forces synchronous evaluation on every call, and may cause bundler issues. The module is already imported at the top of `steps.ts`. | Remove the inline `require`. Import `US_STATES` at the top of `screening/page.tsx` or use the label lookup already available in `step.options`. |
| 7 | **High** | `src/lib/crypto/use-encrypted-storage.ts` | **Encryption key stays loaded in JS heap** — `userEmail` is held in closure for the lifetime of the hook. If a XSS attack executes, the key material is directly accessible. There is no key zeroization. | This is an inherent limitation of Web Crypto without hardware keys. Document the threat model clearly. At minimum, avoid storing `userEmail` in any global/window state. |
| 8 | **Medium** | `src/app/screening/page.tsx` | **Cleartext PII in sessionStorage** — `sessionStorage.setItem('screening_result', JSON.stringify(screeningResult))` stores the full `ScreeningInput` (income, household size, special circumstances, state) unencrypted. While sessionStorage is tab-scoped, it is readable by any same-origin JS and by browser extensions. | Encrypt the sessionStorage entry using `encryptScreeningData` before storing, or replace with React context/state passed via router to avoid storage entirely. |
| 9 | **Medium** | `src/app/api/chat/route.ts` | **Context injection of raw user data** — `body.context` is sliced to 3000 chars and appended verbatim to the system prompt. If `context` is populated from the sessionStorage screening result (which contains income/circumstances), this PII is sent to Anthropic's API on every chat turn. | Only pass a sanitized summary (e.g., eligible program IDs) as context, not the full `ScreeningInput`. Do not pass raw income figures to the LLM. |
| 10 | **Medium** | `src/components/screening/chat-message.tsx` | **Missing ARIA roles** — `ChatMessage` renders a chat bubble `<div>` with no ARIA. Screen readers cannot identify the conversation region, individual messages, or distinguish assistant from user. `TypingIndicator` has no `aria-live` region or `aria-label`. | Wrap the message list in `<div role="log" aria-live="polite" aria-label="Conversation">`. Add `aria-label={`${role} message`}` to each bubble. Add `role="status" aria-label="Assistant is typing"` to `TypingIndicator`. |
| 11 | **Medium** | `src/components/screening/step-input.tsx` | **Missing form labels and error association** — Number/text inputs render without a `<label>` element or `aria-label`. Error messages (`<p className="text-xs text-error">`) are not linked to their input via `aria-describedby`. | Add `<label htmlFor={step.id}>` or `aria-label={step.question}` to inputs. Add `id="error-{step.id}"` to error paragraphs and `aria-describedby={`error-${step.id}`}` to inputs. |
| 12 | **Medium** | `src/app/auth/callback/route.ts` | **Auth error leaks route info** — On failure the redirect is `/auth/login?error=auth_failed`. The `error` param is rendered in the login page but there's no sanitization of what gets passed back. Ensure the login page never reflects arbitrary query param values into the DOM. | Audit `auth/login/page.tsx` to confirm `error` is matched against a fixed set of known codes — not reflected verbatim. |
| 13 | **Medium** | `src/lib/supabase/server.ts` | **`createServiceClient` uses `require()` with a comment that is misleading** — The comment says "avoids bundling service key into client" but this file is server-only already (used only in API routes/server components). The `require()` call is synchronous and adds no real protection. More importantly, `SUPABASE_SERVICE_ROLE_KEY` with the anon client pattern could be confused in future — no server-side RLS bypass check. | Remove the misleading `require` pattern. Use standard ESM import. Add a comment that this client bypasses RLS and must only be used in trusted server contexts. |
| 14 | **Medium** | `src/app/results/page.tsx` | **Results page accessible without auth** — The route `/results` is not in `PUBLIC_PATHS` so middleware does redirect to login. However the page is a pure Client Component that reads from sessionStorage client-side — no server-side session check. A logged-in user who navigates directly to `/results` with no screening done gets a "No screening results" state rather than being redirected, which is acceptable. But if sessionStorage is ever populated maliciously (XSS), the page will render it. | Low risk given sessionStorage scope, but validate the parsed object shape before rendering (`zod` or manual field checks on `ScreeningResult`). |
| 15 | **Medium** | `src/app/api/chat/route.ts` | **SSE stream missing error event format** — On Anthropic API error inside the stream `start()` function, the code emits `data: ${JSON.stringify({ error: ... })}\n\n` — but the client's `use-chat.ts` only checks `parsed.error` after checking `parsed.text`. If `error` and `text` are both absent in a chunk, the error is silently swallowed. The `catch` block in `start()` calls `controller.close()` without flushing the error event. | Ensure error events are flushed before closing: `controller.enqueue(encoder.encode(...error event...)); controller.close();`. In the client, check `parsed.error` before `parsed.text`. |
| 16 | **Low** | `src/lib/benefits/engine.ts` | **`getProgram` hardcodes 5 states** — The state program search iterates only `['CA', 'TX', 'FL', 'NY', 'PA']`. If a user from another state has a state-specific program and `getProgram` is called with their program ID, it returns `undefined`. | Either iterate all states from a centralized list or use a flat ID-to-program map. |
| 17 | **Low** | `src/lib/crypto/encryption.ts` | **`btoa`/`atob` not safe for all binary data** — `btoa(String.fromCharCode(...combined))` can throw if the spread causes a stack overflow for very large ciphertexts (V8 max ~65k spread elements). Modern usage is fine for typical screening data, but fragile. | Replace with `btoa(Array.from(combined).map(b => String.fromCharCode(b)).join(''))` or use `Buffer.from(combined).toString('base64')` in Node / `TextDecoder` + typed array approach. |
| 18 | **Low** | `src/components/service-worker-register.tsx` | **Service worker registered with no cache strategy defined** — `sw.js` is registered but the actual `sw.js` file was not found in `src/`. If it doesn't cache anything, this is harmless. If it caches API responses (chat, explain), sensitive data could persist in the SW cache beyond the session. | Verify `public/sw.js` exists and review its cache strategy. Ensure API routes (`/api/*`) are explicitly excluded from caching. |
| 19 | **Low** | `src/app/screening/page.tsx` | **`Math.random()` used for message IDs** — `id: \`${Date.now()}-${Math.random()}\`` is fine for React keys but is not cryptographically unique. Not a security issue but worth noting for any future dedup logic. | Use `crypto.randomUUID()` which is available in all modern browsers and Node 19+. |
| 20 | **Low** | `src/app/api/chat/route.ts` | **`role` cast without validation** — `m.role as 'user' \| 'assistant'` casts without checking the actual value. A caller sending `role: 'system'` would pass the cast and be forwarded to Anthropic, potentially injecting a system-level message. | Validate: `if (!['user', 'assistant'].includes(m.role)) skip` before casting. |

---

## Summary by Category

**Security (Critical/High):** 7 findings — open redirect (#1), weak encryption key (#2), unauthenticated AI endpoints (#3), prompt injection (#4), no rate limiting (#5), PII in sessionStorage (#8), raw PII forwarded to LLM (#9).

**Code Quality:** 3 findings — inline `require()` (#6), misleading server client comment (#13), unsafe spread (#17).

**Accessibility:** 2 findings — missing ARIA on chat UI (#10), unlinked form labels/errors (#11).

**Performance:** 1 finding — `require()` in render path on every answer (#6, overlaps quality).

**Error Handling:** 2 findings — SSE stream error not flushed (#15), role cast without validation (#20).

---

## Resolution Status — ALL 20 FINDINGS ADDRESSED (2026-04-06)

### Critical
- ~~#1~~ **FIXED** — Open redirect: `safePath()` validator on `next` param in callback + confirm
- ~~#2~~ **FIXED** — Weak KDF: iterations 100k→600k, added app-level pepper to key derivation

### High
- ~~#3~~ **FIXED** — Auth gate: Supabase `getUser()` check + 401 on both API routes
- ~~#4~~ **FIXED** — Prompt injection: allowlisted program IDs + topic enum in `/api/explain`
- ~~#5~~ **FIXED** — Rate limiting: in-memory 20 req/min/user on both API routes
- ~~#6~~ **FIXED** — Inline `require()`: replaced with top-level `import { US_STATES }`
- ~~#7~~ **FIXED** — Key in JS heap: documented threat model in `use-encrypted-storage.ts`

### Medium
- ~~#8~~ **FIXED** — SessionStorage PII: strips `input` field (income, household data) before storing
- ~~#9~~ **FIXED** — Context to LLM: sanitize to program names only, raw PII never forwarded
- ~~#10~~ **FIXED** — Chat ARIA: `role="log"`, `aria-live="polite"`, `aria-label` per message
- ~~#11~~ **FIXED** — Form labels: `sr-only` labels, `aria-describedby` linking errors to inputs
- ~~#12~~ **N/A** — Login page does not reflect URL `error` param; no sanitization needed
- ~~#13~~ **FIXED** — Misleading require: replaced comment with accurate RLS-bypass warning
- ~~#14~~ **FIXED** — Results page: validates parsed object shape before rendering
- ~~#15~~ **FIXED** — SSE error flush: error event + DONE sent before close; client checks error before text

### Low
- ~~#16~~ **FIXED** — Hardcoded states: `getProgram()` now uses `getSupportedStates()` dynamically
- ~~#17~~ **FIXED** — btoa safety: `Array.from` map instead of spread operator
- ~~#18~~ **FIXED** — Service worker: documented cache strategy; confirmed API routes excluded
- ~~#19~~ **FIXED** — Message IDs: `crypto.randomUUID()` replaces `Date.now()-Math.random()`
- ~~#20~~ **FIXED** — Role validation: filter against `['user','assistant']` allowlist before cast
