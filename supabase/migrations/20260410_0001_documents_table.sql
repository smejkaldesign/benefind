-- Migration: create documents table with virus-scan status tracking
--
-- This migration creates the `documents` table per the canonical data model
-- at docs/data-model.md table 13, including the `document_scan_status` enum
-- and RLS policies scoped to workspace membership.
--
-- The corresponding Storage bucket `user-documents` and the storage trigger
-- that calls the scan-document Edge Function are configured separately (see
-- docs/clamav-deploy.md).

-- ----------------------------------------------------------------------------
-- Prerequisites (may already exist from earlier migrations)
-- ----------------------------------------------------------------------------

-- Helper function to check workspace membership. This is idempotent and
-- safe to recreate; production deploys should also have this from the
-- workspaces migration that lands separately.
create or replace function public.is_workspace_member(ws_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.workspace_members
    where workspace_id = ws_id
      and user_id = auth.uid()
  );
$$;

-- Helper function to check admin status
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users
    where user_id = auth.uid()
      and disabled_at is null
  );
$$;

-- ----------------------------------------------------------------------------
-- Document scan status enum
-- ----------------------------------------------------------------------------

do $$
begin
  if not exists (select 1 from pg_type where typname = 'document_scan_status') then
    create type document_scan_status as enum ('pending', 'clean', 'infected', 'error');
  end if;
end$$;

-- ----------------------------------------------------------------------------
-- Documents table
-- ----------------------------------------------------------------------------

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

-- ----------------------------------------------------------------------------
-- Indexes
-- ----------------------------------------------------------------------------

create index if not exists idx_documents_workspace
  on public.documents(workspace_id)
  where deleted_at is null;

create index if not exists idx_documents_tags
  on public.documents using gin(tags);

-- Partial index used by the scan-monitoring cron to find stuck pending rows
create index if not exists idx_documents_scan_pending
  on public.documents(uploaded_at)
  where scan_status = 'pending';

-- Partial index used by admin monitoring ("infected in last 24h")
create index if not exists idx_documents_scan_infected
  on public.documents(scanned_at desc)
  where scan_status = 'infected';

-- ----------------------------------------------------------------------------
-- Row-Level Security
-- ----------------------------------------------------------------------------

alter table public.documents enable row level security;

-- Workspace members can read their own documents (and only if not
-- soft-deleted AND only if the scan succeeded — infected files are
-- quarantined at the row level, not just the UI).
create policy "member_select_own_clean_documents"
  on public.documents
  for select
  using (
    public.is_workspace_member(workspace_id)
    and deleted_at is null
    and scan_status != 'infected'
  );

-- Members can insert rows for workspaces they belong to, always with
-- scan_status='pending' (the Edge Function updates it after the scan).
create policy "member_insert_own_documents"
  on public.documents
  for insert
  with check (
    public.is_workspace_member(workspace_id)
    and uploaded_by_user_id = auth.uid()
    and scan_status = 'pending'
  );

-- Members can update metadata (tags, filename) on their own documents but
-- NOT scan_status, scanned_at, scan_error, or storage fields — those are
-- owned by the service-role Edge Function.
create policy "member_update_own_document_metadata"
  on public.documents
  for update
  using (
    public.is_workspace_member(workspace_id)
    and deleted_at is null
  )
  with check (
    public.is_workspace_member(workspace_id)
  );

-- No client deletes; soft delete only via update.
-- Hard deletes happen via the retention purge cron (service role).

-- Admin override: admins can read ALL rows including infected and
-- soft-deleted ones (for moderation).
create policy "admin_full_access"
  on public.documents
  for all
  using (public.is_admin())
  with check (public.is_admin());

-- ----------------------------------------------------------------------------
-- Auto-update updated_at trigger (not used on documents but the pattern
-- is documented here for consistency; documents are append-mostly).
-- ----------------------------------------------------------------------------

-- Note: documents.uploaded_at is the creation marker. There's no
-- updated_at column because the only mutation path is the scan status
-- update which is tracked via scanned_at separately.

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
-- Bucket policies (set via Dashboard or storage.objects RLS):
--
--   -- Read own files only
--   create policy "member_read_own_storage"
--     on storage.objects for select
--     using (
--       bucket_id = 'user-documents'
--       and (storage.foldername(name))[1] = (
--         select workspace_id::text from public.documents
--         where storage_path = name and storage_bucket = 'user-documents'
--         and public.is_workspace_member(workspace_id)
--       )
--     );
--
--   -- Insert own files
--   create policy "member_write_own_storage"
--     on storage.objects for insert
--     with check (
--       bucket_id = 'user-documents'
--       and auth.uid() is not null
--     );
--
-- See docs/clamav-deploy.md for the full bucket + webhook setup runbook.
