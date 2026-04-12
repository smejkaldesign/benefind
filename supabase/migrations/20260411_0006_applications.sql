-- Migration: Applications — user-tracked applications, event log, and documents
--
-- Domain: applications
-- Tables: applications, application_events, documents
-- Decisions: D4 (documents.scan_status + scanned_at, NO encrypted column; force_pending
--               trigger ensures service-role inserts also start pending).
-- Order: 06 / 09
--
-- The documents table originally landed in supabase/migrations/20260410_0001_documents_table.sql
-- as part of PR #11 (ClamAV scanning). That file had hard FKs to workspaces +
-- workspace_members + admin_users which did not exist yet. This migration
-- absorbs the full documents content (table, indexes, policies, helper trigger)
-- at the correct point in the ordering. The document_scan_status enum has
-- moved to 0001_foundation.sql.

-- ----------------------------------------------------------------------------
-- applications
-- ----------------------------------------------------------------------------

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  program_id text not null references public.programs(id),
  screening_result_id uuid references public.screening_results(id) on delete set null,
  company_match_id uuid references public.company_program_matches(id) on delete set null,
  status text not null default 'considering' check (
    status in ('considering', 'in_progress', 'submitted', 'approved', 'denied', 'withdrawn')
  ),
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

create index if not exists idx_applications_workspace on public.applications(workspace_id);
create index if not exists idx_applications_program on public.applications(program_id);
create index if not exists idx_applications_status
  on public.applications(workspace_id, status);

comment on column public.applications.auto_submitted is
  'True if the auto-submission feature (premium) submitted this application. Auditable.';

drop trigger if exists trg_applications_updated_at on public.applications;
create trigger trg_applications_updated_at
  before update on public.applications
  for each row execute function public.set_updated_at();

alter table public.applications enable row level security;

create policy "applications_member_select"
  on public.applications
  for select
  using (public.is_workspace_member(workspace_id) and deleted_at is null);

create policy "applications_member_insert"
  on public.applications
  for insert
  with check (public.is_workspace_member(workspace_id));

create policy "applications_member_update"
  on public.applications
  for update
  using (public.is_workspace_member(workspace_id))
  with check (public.is_workspace_member(workspace_id));

-- ----------------------------------------------------------------------------
-- application_events
-- ----------------------------------------------------------------------------

create table if not exists public.application_events (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id) on delete cascade,
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  actor_user_id uuid references auth.users(id),
  event_type text not null check (event_type in (
    'status_change', 'note', 'document_attached', 'reminder_set',
    'auto_submit_attempt', 'auto_submit_success', 'auto_submit_failed'
  )),
  payload jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_application_events_app
  on public.application_events(application_id, created_at desc);

alter table public.application_events enable row level security;

create policy "application_events_member_select"
  on public.application_events
  for select
  using (public.is_workspace_member(workspace_id));

create policy "application_events_member_insert"
  on public.application_events
  for insert
  with check (public.is_workspace_member(workspace_id));

-- ----------------------------------------------------------------------------
-- documents (absorbed from deleted 20260410_0001_documents_table.sql per PR #11)
-- ----------------------------------------------------------------------------
-- D4: no `encrypted` column (encryption is a bucket-policy concern).
-- Virus scanning runs via an Edge Function + ClamAV on storage object-create.
-- Rows are inserted with scan_status='pending'; the Edge Function updates
-- them to 'clean' / 'infected' / 'error'.

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  uploaded_by_user_id uuid not null references auth.users(id),
  filename text not null check (length(filename) between 1 and 255),
  mime_type text,
  byte_size bigint check (byte_size > 0),
  storage_path text not null,
  storage_bucket text not null default 'user-documents',
  tags text[],
  scan_status document_scan_status not null default 'pending',
  scanned_at timestamptz,
  scan_error text,
  uploaded_at timestamptz not null default now(),
  deleted_at timestamptz,
  -- A file is uniquely identified by its bucket + path; no two rows should
  -- reference the same blob.
  constraint documents_storage_path_unique unique (storage_bucket, storage_path)
);

create index if not exists idx_documents_workspace
  on public.documents(workspace_id)
  where deleted_at is null;

create index if not exists idx_documents_tags
  on public.documents using gin(tags);

-- Partial index used by the scan-monitoring cron to find stuck pending rows.
create index if not exists idx_documents_scan_pending
  on public.documents(uploaded_at)
  where scan_status = 'pending';

-- Partial index used by admin monitoring ("infected in last 24h").
create index if not exists idx_documents_scan_infected
  on public.documents(scanned_at desc)
  where scan_status = 'infected';

alter table public.documents enable row level security;

-- Workspace members can read their own documents (not soft-deleted, not
-- infected). Infected files are quarantined at the row level, not just UI.
create policy "member_select_own_clean_documents"
  on public.documents
  for select
  using (
    public.is_workspace_member(workspace_id)
    and deleted_at is null
    and scan_status <> 'infected'
  );

-- Members can insert rows for workspaces they belong to. The pending
-- invariant is enforced below via the BEFORE INSERT trigger (defense in depth
-- since service_role bypasses RLS).
create policy "member_insert_own_documents"
  on public.documents
  for insert
  with check (
    public.is_workspace_member(workspace_id)
    and uploaded_by_user_id = auth.uid()
  );

-- Members can update metadata (tags, filename) on their own documents but
-- NOT scan_status / scanned_at / scan_error / storage fields — the Edge
-- Function owns those via service_role.
create policy "member_update_own_document_metadata"
  on public.documents
  for update
  using (
    public.is_workspace_member(workspace_id)
    and deleted_at is null
  )
  with check (public.is_workspace_member(workspace_id));

-- Admin override: admins can read ALL rows including infected + soft-deleted
-- for moderation.
create policy "documents_admin_all"
  on public.documents
  for all
  using (public.is_admin())
  with check (public.is_admin());

-- SECURITY: force scan_status to 'pending' on every insert, regardless of the
-- caller role. Runs in the database engine so it applies even when the caller
-- is using a service_role key (which bypasses RLS).
create or replace function public.force_pending_scan_status()
returns trigger
language plpgsql
as $$
begin
  new.scan_status := 'pending'::document_scan_status;
  new.scanned_at := null;
  new.scan_error := null;
  return new;
end;
$$;

drop trigger if exists trg_documents_force_pending_on_insert on public.documents;
create trigger trg_documents_force_pending_on_insert
  before insert on public.documents
  for each row
  execute function public.force_pending_scan_status();

-- ----------------------------------------------------------------------------
-- Storage bucket creation reminder
-- ----------------------------------------------------------------------------
-- The `user-documents` Storage bucket must be created separately in the
-- Supabase Dashboard or via the Management API. Configuration:
--
--   Name: user-documents
--   Public: false
--   File size limit: 25 MB
--   Allowed mime types: application/pdf, image/*, text/plain,
--     application/vnd.openxmlformats-officedocument.*
--
-- See docs/clamav-deploy.md for the full bucket + webhook setup runbook.
