-- Migration: Compliance — consent log, data export/erasure requests, purge audit
--
-- Domain: compliance
-- Tables: consents, data_export_requests, purge_runs
-- Decisions: D6 (30-day soft-delete window, daily purge cron, Stripe 7yr exception,
--               immediate-delete opt-out via data_export_requests.immediate,
--               support ticket hold, purge_runs audit).
-- Order: 09 / 09
--
-- This migration is the last in the initial schema bootstrap. The retention
-- cron itself is deployed as a Supabase Edge Function + pg_cron schedule in a
-- later migration (outside this F.1 batch).

-- ----------------------------------------------------------------------------
-- consents (append-only)
-- ----------------------------------------------------------------------------

create table if not exists public.consents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  consent_type text not null check (
    consent_type in ('terms', 'privacy', 'marketing', 'analytics', 'data_sharing')
  ),
  granted boolean not null,
  version text not null,
  ip_address inet,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists idx_consents_user_type
  on public.consents(user_id, consent_type, created_at desc);

alter table public.consents enable row level security;

create policy "consents_select_own"
  on public.consents
  for select
  using (auth.uid() = user_id);

create policy "consents_insert_own"
  on public.consents
  for insert
  with check (auth.uid() = user_id);

-- No updates, no deletes — append-only.

-- ----------------------------------------------------------------------------
-- data_export_requests
-- ----------------------------------------------------------------------------
-- Also records immediate-delete opt-outs so the retention cron can distinguish
-- "delayed purge" from "expedited per user request."

create table if not exists public.data_export_requests (
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

create index if not exists idx_data_export_requests_user
  on public.data_export_requests(user_id);

create index if not exists idx_data_export_requests_pending
  on public.data_export_requests(status)
  where status in ('requested', 'processing');

comment on column public.data_export_requests.immediate is
  'True for GDPR immediate-delete opt-out. Cron purges that same run (D6).';

alter table public.data_export_requests enable row level security;

create policy "data_export_requests_select_own"
  on public.data_export_requests
  for select
  using (auth.uid() = user_id);

create policy "data_export_requests_insert_own"
  on public.data_export_requests
  for insert
  with check (auth.uid() = user_id);

-- Admin-managed updates (status transitions, download_url).
create policy "data_export_requests_admin_update"
  on public.data_export_requests
  for update
  using (public.is_admin())
  with check (public.is_admin());

-- ----------------------------------------------------------------------------
-- purge_runs (audit)
-- ----------------------------------------------------------------------------

create table if not exists public.purge_runs (
  id uuid primary key default gen_random_uuid(),
  run_at timestamptz not null default now(),
  table_name text not null,
  rows_purged int not null,
  duration_ms int,
  errors jsonb
);

create index if not exists idx_purge_runs_table_date
  on public.purge_runs(table_name, run_at desc);

comment on table public.purge_runs is
  'Audit of every retention cron run. Populated by the Edge Function via service_role.';

alter table public.purge_runs enable row level security;

-- Admin read-only.
create policy "purge_runs_admin_select"
  on public.purge_runs
  for select
  using (public.is_admin());
