# Benefind Security Audit - 2026-04-12

Auditor: RICK (automated)
Scope: Next.js 15 app, Supabase backend, Stripe billing, ClamAV document scanning

---

## CRITICAL

No critical findings. `.env.local` is properly gitignored and not tracked.

---

## HIGH

### 2. `bf-workspace` cookie is NOT HttpOnly

- **File:** `src/lib/workspace/context.tsx:71`
- **Line:** `document.cookie = \`bf-workspace=${workspaceId};path=/;max-age=${60 _ 60 _ 24 \* 365};samesite=lax${secure}\`;`
- **Details:** Cookie is set client-side via `document.cookie`, so it cannot be HttpOnly by definition. The cookie is readable and writable by any JS on the page, including XSS payloads. It controls which workspace data is loaded.
- **Risk:** An XSS attack could forge the workspace cookie to access another user's data. Server-side code trusts this cookie for data scoping.
- **Mitigating factor:** Server actions like `persistScreening` and `verifyWorkspaceMembership` validate membership before acting. However, the `screenings/[id]/page.tsx` detail page only compares `screening.workspace_id !== workspaceId` against the cookie value without verifying that the user is actually a member.
- **Fix:** Set the cookie server-side as HttpOnly, or always verify workspace membership on every server-side read (not just equality check against the cookie).

### 3. Screening detail page: workspace authorization relies solely on cookie comparison

- **File:** `src/app/dashboard/screenings/[id]/page.tsx:82-93`
- **Details:** The page reads `bf-workspace` from the cookie and compares it to `screening.workspace_id`. It does NOT verify the user is a member of that workspace. A user who forges the cookie to match a target screening's workspace_id could view it.
- **Risk:** Horizontal privilege escalation: authenticated users could view other users' screening results.
- **Fix:** Add workspace membership verification (like `dashboard/page.tsx` does with `listWorkspacesForUser`). Also validate UUID format on the cookie value (like `dashboard/page.tsx` does with `UUID_RE`).

### 4. `getLatestAnswers` action: no workspace membership verification

- **File:** `src/app/screening/actions.ts:88-112`
- **Details:** Reads workspace from cookie and queries `getLatestScreening(supabase, workspaceId)` without verifying the user is a member. Compare to `persistScreening` which correctly calls `listWorkspacesForUser` + `isMember` check.
- **Risk:** Authenticated user could forge the `bf-workspace` cookie to read another workspace's latest screening answers.
- **Fix:** Add the same membership check that `persistScreening` has.

### 5. No Content-Security-Policy headers

- **File:** `next.config.ts`
- **Details:** No CSP headers are configured anywhere in the app (not in next.config.ts, not in middleware, not in custom headers). The `dangerouslySetInnerHTML` usage for JSON-LD structured data is safe (developer-controlled content + `replace(/</g, "\\u003c")`), but the absence of CSP leaves no defense-in-depth against XSS.
- **Fix:** Add a `Content-Security-Policy` header in `next.config.ts` or middleware. At minimum: `default-src 'self'; script-src 'self' 'unsafe-inline'` (tighten the inline policy with nonces).

### 6. `persistScreening` accepts `Record<string, string>` answers without validation

- **File:** `src/app/screening/actions.ts:8-20`
- **Details:** The `PersistScreeningInput` interface accepts `answers: Record<string, string>` and `results: Array<{...reasons: Record<string, unknown>}>`. There is no Zod schema or runtime validation. Arbitrary keys and values are passed through to the database.
- **Risk:** Data integrity issues, potential for oversized payloads or unexpected data shapes stored in the DB. The `reasons: Record<string, unknown>` is cast directly to `Json`.
- **Fix:** Add Zod validation with max key count, max string length, and allowlisted answer keys.

---

## MEDIUM

### 7. Admin pages and support page: no per-page admin auth check

- **Files:** `src/app/admin/page.tsx`, `src/app/admin/support/page.tsx`
- **Details:** These pages call `createServerSupabase()` and query admin data directly without checking `isUserAdmin`. They rely entirely on the admin layout's auth guard.
- **Mitigating factor:** The admin layout (`src/app/admin/layout.tsx`) checks `isUserAdmin` and redirects. Next.js layouts wrap pages, so this works in practice.
- **Risk:** If the layout is ever bypassed (e.g., direct server component import, or a layout refactor), admin data is exposed. Defense-in-depth recommends per-page checks.
- **Fix:** Add `isUserAdmin` check in each admin page, or create a shared `requireAdmin()` utility.

### 8. In-memory rate limiting resets on deploy/restart

- **Files:** `src/app/api/chat/route.ts:5-6`, `src/app/api/explain/route.ts:35-36`
- **Details:** Rate limiting uses `new Map()` in-memory. On serverless/edge deployment or process restart, limits reset. Multiple instances don't share state.
- **Risk:** Rate limits are ineffective in production with multiple instances or frequent deploys. AI API abuse could run up Anthropic costs.
- **Fix:** Use Redis or Supabase-backed rate limiting for production. The in-memory approach is fine for dev only.

### 9. Stripe webhook uses service role client (expected but worth noting)

- **File:** `src/app/api/webhooks/stripe/route.ts`
- **Details:** Uses `createServiceClient()` (service role, bypasses RLS) to write subscription data. This is correct for webhooks where there's no user session, but any bug in the webhook handler could write to any row.
- **Mitigating factor:** Signature verification is correctly implemented via `stripe.webhooks.constructEvent()`. The handler only processes known event types.
- **Fix:** No immediate fix needed. Consider adding audit logging for webhook writes.

### 10. No CSRF token on server actions

- **Files:** All server actions in `src/app/screening/actions.ts`, `src/lib/stripe/actions.ts`, `src/app/admin/programs/[id]/actions.ts`
- **Details:** Next.js server actions have built-in CSRF protection (they verify the `Origin` header matches and use a non-guessable action ID). This is sufficient for most cases.
- **Risk:** Low. Next.js handles this at the framework level.
- **Fix:** None needed if using Next.js 15's default protections.

### 11. File upload validation is client-side only

- **File:** `src/app/dashboard/documents/upload-form.tsx`
- **Details:** `validateUploadFile()` runs in the browser before uploading to Supabase Storage. There's no server-side re-validation of file type or size before the blob reaches storage. The ClamAV edge function scans after upload.
- **Mitigating factor:** Supabase Storage bucket policies can enforce size limits. The MIME whitelist is thorough and exact-match. ClamAV scans post-upload.
- **Fix:** Add a Supabase Storage bucket policy limiting file size and allowed MIME types as a second layer.

---

## LOW

### 12. `dangerouslySetInnerHTML` usage is safe (no action needed)

- **Files:** `src/app/blog/page.tsx:179`, `src/app/blog/[slug]/page.tsx:126,133`, `src/app/programs/[id]/page.tsx:85`, `src/app/programs/page.tsx:102`
- **Details:** All instances use `JSON.stringify(structuredData).replace(/</g, "\\u003c")` for JSON-LD `<script>` tags. Data comes from developer-controlled blog registry and program catalog (filesystem MDX), not user input.
- **Risk:** None. This is the standard pattern for JSON-LD in Next.js.

### 13. Encryption uses email as key derivation secret

- **File:** `src/lib/crypto/encryption.ts`
- **Details:** PBKDF2 key derivation uses user email + app pepper. Email is low-entropy and predictable.
- **Mitigating factor:** 600,000 PBKDF2 iterations + random salt + AES-GCM 256-bit. The app pepper adds entropy. This is a zero-knowledge design where the server stores only ciphertext.
- **Fix:** Consider allowing users to set a passphrase instead of relying on email alone. Document the threat model: if an attacker has the encrypted blob AND knows the user's email, they could brute-force the key (but PBKDF2 makes this expensive).

### 14. No SQL injection risk detected

- All database queries use the Supabase client's query builder (`.from().select().eq()`). No raw SQL was found in the application code.

### 15. No hardcoded secrets in source code

- Grep for `sk_live`, `sk_test`, `api_key`, `password=` in `/src` returned no matches. All secrets are in `.env.local`.

---

## Summary

| Severity | Count | Key Issues                                                           |
| -------- | ----- | -------------------------------------------------------------------- |
| Critical | 0     | None                                                                 |
| High     | 5     | Cookie security, missing authz checks, no CSP, no input validation   |
| Medium   | 5     | Admin defense-in-depth, rate limiting, client-only upload validation |
| Low      | 4     | Safe dangerouslySetInnerHTML, encryption design, no SQL injection    |

**Top 3 actions:**

1. Add workspace membership verification to `getLatestAnswers` and `screenings/[id]` page
2. Add Content-Security-Policy headers
3. Move `bf-workspace` cookie to server-side HttpOnly, or enforce membership checks everywhere it's read
