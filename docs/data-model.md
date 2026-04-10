# Benefind Canonical Data Model

**Status:** draft · **Last updated:** 2026-04-10

The single source of truth for every Supabase table Benefind ships. Every PRD, migration, and engineer implementing schema changes must reference this doc. If you need a new table, add it here first, then write the migration.

Supabase migration files live in `supabase/migrations/` (once bootstrapped); this doc is the human-readable spec they implement.

Planning context, decision history, and cross-references to PRDs live in the second-brain vault at `MyBrain/05-knowledge/benefind-data-model.md` (pointer only). The canonical version is here.

---

## TL;DR

- **26 tables** across 8 domains: identity, workspaces, screening, programs, applications, billing, admin/ops, content, compliance
- **Workspace is the aggregation unit** for benefit-bearing entities (a household OR a company). One user can own up to 50 workspaces; each has its own tier (free/premium) and onboarding flow.
- **Billing is per-workspace** via Stripe subscription items on a single per-user subscription. Individual workspace = $5/mo, company workspace = $20/mo.
- **Free tier** is view-only: screen once, see results, that's it. The dashboard, re-screening, history, documents, application tracker, notifications, and auto-submission are all premium features.
- **Confidence scores** are integer 0–100, with a generated `eligibility_tier` column mapping to 5 buckets.
- **Retention:** 30-day soft-delete window, daily purge cron, with exceptions for Stripe financial records (7-year) and immediate-delete opt-out.

## ER overview

```
auth.users (Supabase built-in)
  |
  +-- user_profiles (1:1) ----- display_name, locale, persona
  +-- user_settings (1:1) ----- language, notification prefs, last_viewed_workspace_id
  +-- subscriptions (1:1*) ---- Stripe subscription (one active at a time per user)
  |     |
  |     +-- invoices (1:N) ---- cached from Stripe webhooks
  +-- consents (1:N) ---------- privacy/marketing consent log
  +-- workspace_members (1:N) - workspaces this user can access
  |
  +-- workspaces (1:N owned) -- entities being benefited
        |
        +-- tier: free | premium
        +-- type: individual | company
        +-- stripe_subscription_item_id (null if free)
        |
        +-- screenings (1:N) -------- one per screening run
        |     |
        |     +-- screening_results (1:N) --- (screening_id, program_id) eligibility row
        +-- company_profiles (1:1 if company type)
        |     |
        |     +-- company_program_matches (1:N)
        +-- applications (1:N) ------ user-tracked program applications
        |     |
        |     +-- application_events (1:N)
        +-- documents (1:N) --------- user-uploaded files (scanned, encrypted)
        +-- notifications (1:N) ----- per-workspace inbox (some are user-scoped via nullable workspace_id)

programs (catalog, no user or workspace FK)
  +-- program_translations (1:N) ----- localized strings per locale

posts (blog content, v2 only)
  +-- post_tags (M:N via tags)
  +-- authors

admin_users (subset of auth.users with elevated role)
  +-- admin_actions (audit log)

feature_flags (global)
support_tickets (user-linked, admin-managed)
purge_runs (system audit of retention cron)
data_export_requests (GDPR/CCPA request log)
```

---

## Workspace model

**The user is the human (login, billing, settings). The workspace is the entity being benefited.** A user owns one or more workspaces. Each workspace has:

- A **type** (`individual` or `company`) set at creation, immutable
- A **tier** (`free` or `premium`) that gates access to the dashboard and premium features
- An independent screening flow (the screener runs per-workspace, not per-user)
- Its own history, documents, applications, and notifications

### Pricing

| Workspace type | Free | Premium |
|---|---|---|
| Individual | View results only | **$5/mo** — dashboard, re-screen, history, documents, tracker, auto-submission |
| Company | View results only | **$20/mo** — same feature set, company track |

- **Free tier is read-only after the first screening.** No re-screen, no dashboard, no history. The only path forward is upgrade.
- **Each workspace bills independently.** A user with one household ($5) and one LLC ($20) pays $25/mo total on a single consolidated Stripe invoice.
- **Additional workspaces** cost the same as the first at the same type — no multi-workspace discount yet.
- **Cap: 50 workspaces per user.** Enforced at the app layer, not the DB.

### Stripe shape

- **One Stripe customer per user**
- **One Stripe subscription per user** with multiple subscription items
- Each subscription item references either `price_individual_5` or `price_company_20`
- Upgrading a workspace = add subscription item; downgrading = remove item; consolidated invoice

This is the Notion/Linear/Figma per-seat billing pattern, well-trodden.

### Onboarding

- First workspace auto-creates on signup with the persona the user picked (individual or company)
- Each additional workspace triggers its own onboarding/screening flow
- The user can toggle between workspaces via a switcher in the dashboard header (Slack/Linear-style)
- `user_settings.last_viewed_workspace_id` persists the current selection

---

## Naming and conventions

- **Primary keys** are `uuid` with `default gen_random_uuid()` unless the table is a global catalog with stable string IDs (`programs.id = 'snap-federal'`).
- **Timestamps** are `timestamptz`, default `now()`. Every table has `created_at`. Mutable tables also have `updated_at` with a trigger.
- **Soft delete:** nullable `deleted_at timestamptz`. RLS hides rows where `deleted_at is not null` from end users. Hard purge via daily cron after 30 days.
- **JSONB** only for free-form payloads (`scan_data`, `notifications.payload`, `feature_flags.payload`, `screening_results.reasons`). Never for queryable fields.
- **Enums** via Postgres `enum` types where practical, check constraints for smaller sets.
- **Foreign keys are required.** Child tables with no standalone meaning use `on delete cascade`.
- **Workspace-scoped tables** denormalize `workspace_id` onto child rows (not just the parent) for cheap RLS joins.
- **All `user_id` columns** reference `auth.users(id)` directly. No `profiles` indirection.
- **Indexes:** every FK gets an index. Common filter columns get an index. Unique constraints replace lookup indexes where applicable.

## RLS strategy

Enable RLS on every public table. Two helper functions anchor the policies:

```sql
create function is_admin() returns boolean
language sql stable
as $$
  select exists (
    select 1 from public.admin_users
    where user_id = auth.uid()
      and disabled_at is null
  );
$$;

create function is_workspace_member(ws_id uuid) returns boolean
language sql stable
as $$
  select exists (
    select 1 from public.workspace_members
    where workspace_id = ws_id
      and user_id = auth.uid()
  );
$$;
```

**Default policy for workspace-scoped tables:**

```sql
create policy "member_select" on <table>
  for select using (
    is_workspace_member(workspace_id)
    and deleted_at is null
  );

create policy "member_insert" on <table>
  for insert with check (is_workspace_member(workspace_id));

create policy "member_update" on <table>
  for update using (is_workspace_member(workspace_id))
  with check (is_workspace_member(workspace_id));

-- No client deletes; soft delete via update
```

**Default policy for user-scoped tables** (user_profiles, user_settings, subscriptions, consents):

```sql
create policy "user_select_own" on <table>
  for select using (auth.uid() = user_id and deleted_at is null);
-- ...mirror insert/update
```

**Admin override** is added to tables that need it:

```sql
create policy "admin_full_access" on <table>
  for all using (is_admin()) with check (is_admin());
```

**Catalog tables** (`programs`, `program_translations`, `posts`, `authors`, `tags`) are publicly readable where published, admin-writable.

---

## Tables

### 1. `user_profiles`

Extends `auth.users` with app-specific metadata. One row per authenticated user, created via trigger on `auth.users` insert.

```sql
create table user_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  locale text not null default 'en' check (locale in ('en', 'es', 'zh', 'vi', 'ar')),
  persona text check (persona in ('individual', 'company_admin', 'both')),
  marketing_opt_in boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_user_profiles_persona on user_profiles(persona);
```

**RLS:** standard own-row read/write.

### 2. `user_settings`

Mutable per-user preferences.

```sql
create table user_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email_notifications boolean not null default true,
  notification_prefs jsonb not null default '{}'::jsonb,
  timezone text not null default 'UTC',
  last_viewed_workspace_id uuid references workspaces(id) on delete set null,
  updated_at timestamptz not null default now()
);
```

**RLS:** standard own-row.

### 3. `workspaces`

The aggregation unit. Every benefit-bearing entity (a household, a company) is a workspace. Immutable type, mutable tier.

```sql
create type workspace_type as enum ('individual', 'company');
create type workspace_tier as enum ('free', 'premium');

create table workspaces (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references auth.users(id) on delete cascade,
  type workspace_type not null,
  tier workspace_tier not null default 'free',
  name text not null,
  slug text not null,
  stripe_subscription_item_id text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  constraint workspaces_slug_per_owner unique (owner_user_id, slug),
  constraint workspaces_name_length check (length(name) between 1 and 80)
);

create index idx_workspaces_owner on workspaces(owner_user_id) where deleted_at is null;
create index idx_workspaces_tier on workspaces(tier) where deleted_at is null;
```

**App-layer enforcement:** max 50 workspaces per user. Attempting to create the 51st returns a 409 with "workspace cap reached, contact support."

**RLS:** read/write via `is_workspace_member()`.

### 4. `workspace_members`

Join table. v1 always has exactly one row per workspace (the owner). The table exists so future "share workspace with my accountant" is a row insert, not a migration.

```sql
create type workspace_role as enum ('owner', 'member', 'viewer');

create table workspace_members (
  workspace_id uuid not null references workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role workspace_role not null default 'owner',
  joined_at timestamptz not null default now(),
  primary key (workspace_id, user_id)
);

create index idx_workspace_members_user on workspace_members(user_id);
```

**RLS:** users can read rows where they are a member; only the owner can insert or delete rows.

### 5. `screenings`

One row per screening run. On the individual track, re-screening creates a new row (premium-only). On the company track, same pattern via `company_profiles`.

```sql
create table screenings (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  answers jsonb not null,
  household_size int,
  state text,
  zip text,
  language text not null default 'en',
  is_latest boolean not null default true,
  engine_version text not null,
  saved_at timestamptz,
  last_viewed_at timestamptz,
  created_at timestamptz not null default now(),
  deleted_at timestamptz
);

create unique index idx_screenings_workspace_latest
  on screenings(workspace_id) where is_latest = true and deleted_at is null;
create index idx_screenings_workspace_created on screenings(workspace_id, created_at desc);
```

**Trigger:** when a new screening is inserted for a workspace, set `is_latest = false` on all prior rows for that workspace.

**Free tier constraint:** the app layer enforces "at most one completed screening per free workspace." Free users never see the re-screen button. Enforcement is app-layer, not DB, because drafts are session state.

**RLS:** `is_workspace_member(workspace_id)`.

### 6. `screening_results`

Computed eligibility per program for a given screening run. **This is where the confidence model lives.**

```sql
create table screening_results (
  id uuid primary key default gen_random_uuid(),
  screening_id uuid not null references screenings(id) on delete cascade,
  workspace_id uuid not null references workspaces(id) on delete cascade, -- denormalized for cheap RLS
  program_id text not null references programs(id),
  confidence_score smallint not null check (confidence_score between 0 and 100),
  eligibility_tier text not null generated always as (
    case
      when confidence_score >= 70 then 'eligible_with_requirements'
      when confidence_score >= 50 then 'probably_eligible'
      when confidence_score >= 25 then 'maybe_eligible'
      when confidence_score >= 5  then 'not_likely'
      else 'ineligible'
    end
  ) stored,
  estimated_value text,
  reasons jsonb not null,
  created_at timestamptz not null default now()
);

create unique index idx_screening_results_unique
  on screening_results(screening_id, program_id);
create index idx_screening_results_workspace_tier
  on screening_results(workspace_id, eligibility_tier);
create index idx_screening_results_score_desc
  on screening_results(workspace_id, confidence_score desc);
create index idx_screening_results_program on screening_results(program_id);
```

**`reasons` jsonb shape** (explainability for admin debug + user "why" panels):

```jsonc
{
  "rules": [
    { "name": "income_under_fpl", "passed": true, "weight": 30,
      "actual": "85% FPL", "threshold": "130% FPL", "veto": false },
    { "name": "state_residency", "passed": true, "weight": 10 }
  ],
  "signals": [
    { "name": "has_dependents", "matched": true, "weight": 10 }
  ],
  "missing": [
    { "field": "tax_filing_status", "penalty": 5 }
  ],
  "computed_score": 75,
  "engine_version": "1.0.0"
}
```

**Veto rules:** any rule with `veto=true` that fails immediately sets score = 0 and `eligibility_tier = 'ineligible'`, regardless of other signals. E.g., "not a US resident" vetoes SNAP.

**Tier mapping:**

| Score | Tier | Label |
|---|---|---|
| 70–100 | `eligible_with_requirements` | ✓ Eligible (gather these docs) |
| 50–69 | `probably_eligible` | ◐ Probably eligible |
| 25–49 | `maybe_eligible` | ? Maybe eligible |
| 5–24 | `not_likely` | ◌ Not likely |
| 0–4 | `ineligible` | ✗ Not eligible |

**RLS:** `is_workspace_member(workspace_id)` (uses the denormalized column).

### 7. `company_profiles`

One row per company workspace. Always 1:1 with a company-type workspace — the profile IS the workspace's primary data.

```sql
create table company_profiles (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade unique,
  company_name text,
  website_url text,
  state text,
  industry text,
  company_age text,
  employee_count text,
  annual_revenue text,
  has_rnd boolean default false,
  rnd_percentage numeric,
  ownership_demographics text[],
  is_rural boolean,
  exports_or_plans boolean,
  is_hiring boolean,
  has_clean_energy boolean,
  scan_data jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);
```

**RLS:** `is_workspace_member(workspace_id)`.

### 8. `company_program_matches`

Matching engine output per company. Uses the same confidence-score model as `screening_results`.

```sql
create table company_program_matches (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  company_id uuid not null references company_profiles(id) on delete cascade,
  program_id text not null references programs(id),
  confidence_score smallint not null check (confidence_score between 0 and 100),
  eligibility_tier text not null generated always as (
    case
      when confidence_score >= 70 then 'eligible_with_requirements'
      when confidence_score >= 50 then 'probably_eligible'
      when confidence_score >= 25 then 'maybe_eligible'
      when confidence_score >= 5  then 'not_likely'
      else 'ineligible'
    end
  ) stored,
  status text not null default 'new' check (status in ('new', 'saved', 'applied', 'ineligible', 'dismissed')),
  estimated_value text,
  reasons jsonb not null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index idx_company_matches_unique
  on company_program_matches(company_id, program_id);
create index idx_company_matches_workspace_tier
  on company_program_matches(workspace_id, eligibility_tier);
create index idx_company_matches_program on company_program_matches(program_id);
```

**RLS:** `is_workspace_member(workspace_id)`.

### 9. `programs`

Global catalog. Text PKs for stability, grep-ability, and URL reuse.

```sql
create table programs (
  id text primary key
    constraint programs_id_format check (id ~ '^[a-z0-9-]+$' and length(id) between 3 and 60),
  name text not null,
  agency text,
  category text not null check (category in ('tax_credit', 'grant', 'incentive', 'contracting', 'benefit', 'assistance')),
  track text not null check (track in ('individual', 'company', 'both')),
  tier text check (tier in ('universal', 'industry', 'situation', 'state')),
  description text,
  plain_language_summary text,
  eligibility_criteria jsonb not null,
  typical_award text,
  application_url text,
  deadline_info text,
  state text,
  industries text[],
  cover_image text,
  seo_title text,
  seo_description text,
  status text not null default 'active' check (status in ('active', 'draft', 'paused', 'expired')),
  published_at timestamptz,
  last_reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_programs_status on programs(status);
create index idx_programs_track on programs(track);
create index idx_programs_state on programs(state);
create index idx_programs_industries on programs using gin(industries);
```

The `id` IS the URL slug. No separate `slug` column.

**RLS:** public read of `status = 'active'`, admin full access.

### 10. `program_translations`

Localized strings per program per locale.

```sql
create table program_translations (
  program_id text not null references programs(id) on delete cascade,
  locale text not null check (locale in ('en', 'es', 'zh', 'vi', 'ar')),
  name text not null,
  description text,
  plain_language_summary text,
  seo_title text,
  seo_description text,
  updated_at timestamptz not null default now(),
  primary key (program_id, locale)
);
```

**RLS:** public read, admin write.

### 11. `applications`

Workspace-tracked program applications. References a specific `screening_result_id` or `company_match_id` so history is preserved across re-screens.

```sql
create table applications (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  program_id text not null references programs(id),
  screening_result_id uuid references screening_results(id) on delete set null,
  company_match_id uuid references company_program_matches(id) on delete set null,
  status text not null default 'considering' check (status in ('considering', 'in_progress', 'submitted', 'approved', 'denied', 'withdrawn')),
  auto_submitted boolean not null default false,
  submitted_at timestamptz,
  decision_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  constraint exactly_one_source check (
    (screening_result_id is not null and company_match_id is null)
    or (screening_result_id is null and company_match_id is not null)
    or (screening_result_id is null and company_match_id is null)
  )
);

create index idx_applications_workspace on applications(workspace_id);
create index idx_applications_program on applications(program_id);
create index idx_applications_status on applications(workspace_id, status);
```

**`auto_submitted`** flag: tracks whether this application was submitted by the auto-submission feature (premium-only) so the admin can audit + rerun if needed.

**RLS:** `is_workspace_member(workspace_id)`.

### 12. `application_events`

Status change history + user-attached notes/files.

```sql
create table application_events (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references applications(id) on delete cascade,
  workspace_id uuid not null references workspaces(id) on delete cascade,
  actor_user_id uuid references auth.users(id),
  event_type text not null check (event_type in ('status_change', 'note', 'document_attached', 'reminder_set', 'auto_submit_attempt', 'auto_submit_success', 'auto_submit_failed')),
  payload jsonb not null,
  created_at timestamptz not null default now()
);

create index idx_application_events_app on application_events(application_id, created_at desc);
```

**RLS:** `is_workspace_member(workspace_id)`.

### 13. `documents`

Workspace-uploaded files. Storage path points to a private Supabase Storage bucket.

```sql
create type document_scan_status as enum ('pending', 'clean', 'infected', 'error');

create table documents (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  uploaded_by_user_id uuid not null references auth.users(id),
  filename text not null,
  mime_type text,
  byte_size bigint,
  storage_path text not null,
  storage_bucket text not null default 'user-documents',
  tags text[],
  scan_status document_scan_status not null default 'pending',
  scanned_at timestamptz,
  uploaded_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index idx_documents_workspace on documents(workspace_id);
create index idx_documents_tags on documents using gin(tags);
create index idx_documents_scan_pending on documents(scan_status) where scan_status = 'pending';
```

**Encryption:** enforced by the Supabase Storage bucket policy on `user-documents`. No redundant column.

**Virus scanning:** a Supabase Edge Function with ClamAV integration runs on every new upload. The row is inserted with `scan_status = 'pending'`, the function scans the file, and updates to `'clean'` or `'infected'`. Infected files are quarantined and the upload is soft-deleted. The UI blocks download of non-`'clean'` documents.

**Storage policy:** the matching bucket policy mirrors the row-level RLS — only workspace members can read/write objects under the workspace's path prefix.

**RLS:** `is_workspace_member(workspace_id)`.

### 14. `notifications`

Per-workspace inbox. Some notifications are user-scoped (billing, security) — those leave `workspace_id` null.

```sql
create table notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  workspace_id uuid references workspaces(id) on delete cascade,
  type text not null,
  title text not null,
  body text,
  payload jsonb,
  link_url text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index idx_notifications_user_unread
  on notifications(user_id, created_at desc) where read_at is null;
create index idx_notifications_workspace
  on notifications(workspace_id, created_at desc) where workspace_id is not null;
```

**RLS:** users read their own rows (both workspace-scoped and user-scoped); admins write via service role only.

### 15. `subscriptions`

One row per user representing their Stripe subscription. Individual workspace add-ons live on `workspaces.stripe_subscription_item_id`, not here.

```sql
create type subscription_status as enum (
  'trialing', 'active', 'past_due', 'canceled', 'incomplete', 'incomplete_expired', 'unpaid'
);

create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade unique,
  stripe_customer_id text not null,
  stripe_subscription_id text unique,
  status subscription_status not null,
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  canceled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_subscriptions_stripe_customer on subscriptions(stripe_customer_id);
```

**RLS:** read own row; no client writes (service role bypasses RLS when webhooks update).

**Note:** no `plan` column — the plan is implied by the set of subscription items attached to `workspaces` rows. A user with 1 individual + 1 company workspace has items for both.

### 16. `invoices`

Cached Stripe invoices for the customer portal fallback and email PDFs.

```sql
create table invoices (
  id uuid primary key default gen_random_uuid(),
  subscription_id uuid not null references subscriptions(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete set null, -- nullable to support 7yr retention
  stripe_invoice_id text not null unique,
  amount_due_cents int not null,
  amount_paid_cents int not null,
  currency text not null default 'usd',
  status text not null,
  invoice_pdf_url text,
  hosted_invoice_url text,
  created_at timestamptz not null default now()
);

create index idx_invoices_user on invoices(user_id, created_at desc);
```

**Retention:** `user_id` is nullable so that when a user hard-deletes their account, their invoices can be anonymized (user_id set to null) while preserving the financial record for the 7-year legal requirement.

**RLS:** read own row; no client writes.

### 17. `admin_users`

Subset of `auth.users` with elevated permissions.

```sql
create type admin_role as enum ('owner', 'operator', 'viewer');

create table admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role admin_role not null default 'operator',
  invited_by uuid references auth.users(id),
  invited_at timestamptz not null default now(),
  last_login_at timestamptz,
  disabled_at timestamptz
);

create index idx_admin_users_active on admin_users(role) where disabled_at is null;
```

**RLS:** only `owner`-role admins can read/write this table.

### 18. `admin_actions`

Append-only audit log of admin mutations.

```sql
create table admin_actions (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid not null references admin_users(user_id),
  action text not null,
  target_table text not null,
  target_id text,
  diff jsonb,
  created_at timestamptz not null default now()
);

create index idx_admin_actions_actor on admin_actions(actor_id, created_at desc);
create index idx_admin_actions_target on admin_actions(target_table, target_id);
```

**RLS:** admin read-only; service role writes.

### 19. `feature_flags`

Global flags read by both app and admin.

```sql
create table feature_flags (
  name text primary key,
  enabled boolean not null default false,
  rollout_percent int not null default 0 check (rollout_percent between 0 and 100),
  payload jsonb,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

**RLS:** public read, admin write.

### 20. `support_tickets`

User-submitted help requests. Important because an open ticket **blocks the retention purge** for that user until resolved.

```sql
create type ticket_status as enum ('open', 'pending', 'resolved', 'closed');

create table support_tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  workspace_id uuid references workspaces(id) on delete set null,
  email text not null,
  subject text not null,
  body text not null,
  status ticket_status not null default 'open',
  assigned_to uuid references admin_users(user_id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  closed_at timestamptz
);

create index idx_support_tickets_status on support_tickets(status);
create index idx_support_tickets_user on support_tickets(user_id);
create index idx_support_tickets_open on support_tickets(user_id) where status in ('open', 'pending');
```

**RLS:** user reads own tickets; admin full access.

### 21. `posts` (v2 — MVP ships MDX-in-git per follow-up #4)

```sql
create type post_status as enum ('draft', 'review', 'scheduled', 'published', 'archived');

create table posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  subtitle text,
  body_mdx text not null,
  excerpt text,
  cover_image text,
  author_id uuid references authors(id),
  status post_status not null default 'draft',
  published_at timestamptz,
  scheduled_for timestamptz,
  reading_minutes int,
  related_post_ids uuid[],
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_posts_status_published on posts(status, published_at desc);
```

### 22. `authors`, `tags`, `post_tags` (v2)

```sql
create table authors (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  bio text,
  avatar_url text,
  twitter text,
  linkedin text,
  created_at timestamptz not null default now()
);

create table tags (
  slug text primary key,
  name text not null,
  description text
);

create table post_tags (
  post_id uuid not null references posts(id) on delete cascade,
  tag_slug text not null references tags(slug) on delete cascade,
  primary key (post_id, tag_slug)
);

create index idx_post_tags_tag on post_tags(tag_slug);
```

**RLS for content tables:** public read where `status='published'`, admin write.

### 23. `consents`

Privacy and marketing consent log. Append-only.

```sql
create table consents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  consent_type text not null check (consent_type in ('terms', 'privacy', 'marketing', 'analytics', 'data_sharing')),
  granted boolean not null,
  version text not null,
  ip_address inet,
  user_agent text,
  created_at timestamptz not null default now()
);

create index idx_consents_user_type on consents(user_id, consent_type, created_at desc);
```

**RLS:** read own rows; no client writes.

### 24. `data_export_requests`

GDPR/CCPA export and erasure request log. **Also records immediate-delete opt-outs** so the retention cron can distinguish "delayed purge" from "expedited per user request."

```sql
create type export_status as enum ('requested', 'processing', 'ready', 'delivered', 'failed', 'expired');
create type export_kind as enum ('export', 'erasure');

create table data_export_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  kind export_kind not null,
  immediate boolean not null default false,
  status export_status not null default 'requested',
  requested_at timestamptz not null default now(),
  delivered_at timestamptz,
  download_url text,
  expires_at timestamptz
);

create index idx_data_export_requests_user on data_export_requests(user_id);
create index idx_data_export_requests_pending on data_export_requests(status) where status in ('requested', 'processing');
```

**RLS:** read own rows; no client writes (admin-managed).

### 25. `purge_runs`

System audit table. Tracks every run of the retention cron.

```sql
create table purge_runs (
  id uuid primary key default gen_random_uuid(),
  run_at timestamptz not null default now(),
  table_name text not null,
  rows_purged int not null,
  duration_ms int,
  errors jsonb
);

create index idx_purge_runs_table_date on purge_runs(table_name, run_at desc);
```

**RLS:** admin read-only.

---

## Deletion and retention policy

Soft-delete window: **30 days**. Every user-owned or workspace-owned row sets `deleted_at = now()` instead of hard-deleting. A daily cron at 03:00 UTC purges rows where `deleted_at < now() - interval '30 days'`.

### Exceptions

**1. Stripe financial records — 7-year retention.** When a user account is hard-deleted:
- `subscriptions.user_id` → set to NULL (row retained for audit)
- `invoices.user_id` → set to NULL (row retained for 7 years per GAAP + IRS)
- PII on those rows (billing email, address) is wiped
- `payment_methods` → hard-deleted (Stripe holds real data)

**2. Immediate-delete opt-out.** Privacy-conscious users can choose "delete immediately, skip grace period" in settings. GDPR's right-to-erasure overrides the default 30-day grace:
- `data_export_requests` row inserted with `kind='erasure'` and `immediate=true`
- Cron picks it up that same run and hard-purges all non-financial rows for that user
- Stripe rows still follow the 7-year rule (legally required and defensible)

**3. Support ticket hold.** If a user has any `support_tickets` row with `status in ('open', 'pending')`, their purge is **delayed until the ticket closes**. Prevents mid-conversation data loss.

### Cron pseudocode (runs via Supabase Edge Function + pg_cron)

```sql
-- Skip users with open support tickets
with eligible_users as (
  select distinct w.owner_user_id
  from workspaces w
  where w.deleted_at < now() - interval '30 days'
    and not exists (
      select 1 from support_tickets t
      where t.user_id = w.owner_user_id
        and t.status in ('open', 'pending')
    )
)
-- Hard delete workspace-scoped rows for eligible users (cascade handles children)
delete from workspaces w
using eligible_users e
where w.owner_user_id = e.owner_user_id
  and w.deleted_at < now() - interval '30 days';

-- Record the run
insert into purge_runs (table_name, rows_purged, duration_ms)
values ('workspaces', <rows>, <ms>);
```

All cascades fire via `on delete cascade` FK chains. Workspaces → screenings → screening_results → applications → application_events → documents → notifications → all clean.

---

## Migration ordering

1. `programs`, `program_translations`, `feature_flags`, `tags`, `authors` (no FKs)
2. `user_profiles`, `user_settings`, `consents`, `data_export_requests`, `purge_runs`
3. `workspaces`, `workspace_members`
4. `screenings` → `screening_results`
5. `company_profiles` → `company_program_matches`
6. `applications` → `application_events`
7. `documents`, `notifications`, `support_tickets`
8. `admin_users` → `admin_actions`
9. `subscriptions` → `invoices`
10. `posts` → `post_tags` (v2 only)
11. RLS policies + helper functions (`is_admin()`, `is_workspace_member()`, soft-delete triggers, `is_latest` triggers on `screenings`)
12. Storage bucket policies for `user-documents`
13. Edge Functions: ClamAV scanner, retention purge cron
14. Stripe webhook handler + price objects (`price_individual_5`, `price_company_20`)

Each step is one migration file, named `2026MMDD_<n>_<slug>.sql`.

---

## Naming exceptions and tradeoffs

- **`screening_results.workspace_id` is denormalized** from the parent `screenings` row for cheap RLS. It's write-once (set on insert) and enforced by the app layer.
- **`applications` has nullable `screening_result_id` AND `company_match_id`** so a user can manually track an application they discovered outside the screener. A check constraint enforces "0 or 1" so we never get bad data.
- **No `roles` table.** Admin roles are an enum; workspace roles are an enum. If we need finer-grained perms later, swap the enum for a join table.
- **`subscriptions` has no `plan` column.** The plan is the set of `workspaces.stripe_subscription_item_id` rows a user owns. A user with 2 individual + 1 company workspace implicitly has a "$30/mo plan."
- **`programs.id` is the slug.** No separate `programs.slug` column — the ID format CHECK constraint ensures it's URL-safe.

---

## Cross-references

Every PRD in the second-brain vault that touches one of these tables references this file. Touch points:

- **benefind-user-dashboard-prd** → tables 3, 4, 5, 6, 11, 12, 13, 14, 24 — needs a rewrite to reflect that the dashboard is now premium-gated (free tier is results-only)
- **benefind-billing-prd** → tables 3, 15, 16 — needs a rewrite to reflect per-workspace pricing ($5 individual, $20 company) replacing the flat $29/mo model
- **benefind-admin-tools-prd** → tables 17, 18, 19, 20, 25
- **benefind-blog-cms-prd** → tables 21, 22 (v2 only)
- **benefind-programs-catalog-prd** → tables 9, 10
- **benefind-docs-site-prd** → none (static MDX, no DB)
- **benefind-company-expansion-spec** → tables 3, 7, 8, 9
- **benefind-site-architecture** → all (build sequencing)

---

## Decisions log

Decisions made 2026-04-10 in a thought-partner session with Eric. Each one replaces an Open Question from the original draft.

### D1: Workspace model (replaces Q1 "multi-company cap")

**Decision:** Users own multiple **workspaces** (each a household or a company). 1 workspace per plan, additional workspaces purchasable at per-type pricing. Cap of 50 per user, app-layer enforced.

**Rationale:** Capping company profiles didn't match the cost model (screening compute, not storage). The workspace abstraction cleanly separates "the human" (identity, billing, settings) from "the entity being benefited" (history, documents, applications) and scales to sharing, accountant-managed accounts, and multi-entity users without schema rework.

### D2: Pricing (new, came out of Q1)

**Decision:**
- **Free:** view screening results only, no dashboard access
- **Premium individual workspace:** $5/mo
- **Premium company workspace:** $20/mo
- Each additional workspace same price, billed as a Stripe subscription item on the user's single subscription
- Dashboard, re-screen, history, documents, application tracker, notifications, **auto-submission** are all premium-only
- Free users cannot re-screen (premium-only, with full history)

**Rationale:** Company eligibility is worth more per user and has bigger addressable awards. Individual pricing is low friction (under the "don't think about it" threshold). The dashboard-as-premium model creates a clean conversion funnel: free users see the value of the results, then pay to do anything with it.

### D3: Eligibility as confidence score + generated tier (replaces Q2 "boolean vs tri-state")

**Decision:** Drop the boolean + confidence dual-column model. Replace with a single `confidence_score smallint (0..100)` plus a **generated** `eligibility_tier` column mapping to 5 buckets: `eligible_with_requirements` (70+), `probably_eligible` (50–69), `maybe_eligible` (25–49), `not_likely` (5–24), `ineligible` (0–4). Rules can have veto power.

**Rationale:** Reality is a spectrum, not a boolean. A single numeric source of truth with a generated tier eliminates drift, simplifies the rule engine (returns one number), and gives the dashboard both a sortable score and a clean visual bucket. Integer precision is enough — users don't need to see 73.4% vs 73%.

### D4: Drop `documents.encrypted`, add virus scanning (replaces Q3 "encrypted column")

**Decision:** Drop the `encrypted` column entirely. Encryption is enforced by the storage bucket policy; a column that can only ever be `true` is dead weight. Add `scan_status` + `scanned_at` columns and wire a ClamAV Edge Function that runs on every upload.

**Rationale:** The column provided the appearance of diligence without the substance. The bucket policy is the real source of truth. Virus scanning is a bigger win for user safety — sensitive docs from semi-trusted sources should never be served without a clean scan.

### D5: `programs.id` stays text with format CHECK (replaces Q4 "text vs uuid")

**Decision:** Keep text PKs. Add `check (id ~ '^[a-z0-9-]+$' and length(id) between 3 and 60)` to prevent garbage. Drop the redundant `slug` column — the id IS the slug.

**Rationale:** Grep-able logs, stable URLs, readable code, and cross-references outweigh theoretical join performance at scale. The catalog will stay under 5000 rows indefinitely; join cost is irrelevant. The format CHECK prevents the ID from ever being `"SNAP Federal!"` or similar.

### D6: 30-day soft-delete retention + full exception model (replaces Q5 "retention window")

**Decision:**
- **30-day window** for soft-deleted rows before hard purge
- Daily cron at 03:00 UTC
- **Stripe financial records retained 7 years** per legal requirement, with `user_id` anonymized on account deletion
- **Immediate-delete opt-out** available in settings (GDPR right-to-erasure overrides grace period)
- **Support ticket hold** blocks purge for users with open tickets
- `purge_runs` audit table records every cron execution

**Rationale:** 30 days matches Benefind's privacy-forward positioning, gives enough grace for accidental deletes, and is defensible in any regulator conversation. The exceptions are required by law (Stripe) or by user rights (immediate delete) or by basic support hygiene (ticket hold).

---

## Related

**In this repo:**
- [`docs/redesign-prd.md`](./redesign-prd.md) — Warp-inspired landing redesign
- [`docs/design-system.md`](./design-system.md) — tokens, components, variants
- [`docs/landing-copy.md`](./landing-copy.md) — hero and section copy
- `src/lib/benefits/engine.ts` — rule engine that writes `confidence_score` (needs refactor per §D3)
- `src/lib/benefits/company-engine.ts` — company matching engine (same refactor)
- `src/lib/supabase/` — client/server/middleware (migrations folder pending bootstrap)

**Planning context** (second-brain vault, not part of this repo):
- `MyBrain/05-knowledge/benefind-site-architecture.md` — IA, build sequencing, MVP phasing
- `MyBrain/05-knowledge/benefind-product-architecture.md` — high-level component map
- `MyBrain/05-knowledge/benefind-mvp-launch-plan.md` — go-live checklist
- `MyBrain/05-knowledge/benefind-company-expansion-spec.md` — dual-track expansion spec
- `MyBrain/04-projects/benefind-user-dashboard-prd.md`
- `MyBrain/04-projects/benefind-billing-prd.md`
- `MyBrain/04-projects/benefind-admin-tools-prd.md`
- `MyBrain/04-projects/benefind-programs-catalog-prd.md`
- `MyBrain/04-projects/benefind-blog-cms-prd.md`
- `MyBrain/04-projects/benefind-docs-site-prd.md`
