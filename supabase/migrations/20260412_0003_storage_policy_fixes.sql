-- Fix storage policies per SCAN review:
-- 1. Wrap UUID cast in a safe-cast helper to return clean denial instead of 500
-- 2. Add UPDATE policy for metadata changes
-- 3. Fix path convention comment

-- Helper: safely cast text to uuid, returning null on invalid input.
-- This prevents a Postgres 500 error when someone uploads to a path
-- that doesn't start with a valid UUID.
create or replace function public.safe_cast_uuid(val text)
returns uuid
language plpgsql
immutable
as $$
begin
  return val::uuid;
exception when others then
  return null;
end;
$$;

-- Drop and recreate member policies with safe UUID casting.
drop policy if exists "workspace_members_can_upload" on storage.objects;
drop policy if exists "workspace_members_can_read" on storage.objects;
drop policy if exists "workspace_members_can_delete" on storage.objects;

create policy "workspace_members_can_upload"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'documents'
    and public.is_workspace_member(
      public.safe_cast_uuid((storage.foldername(name))[1])
    )
  );

create policy "workspace_members_can_read"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'documents'
    and public.is_workspace_member(
      public.safe_cast_uuid((storage.foldername(name))[1])
    )
  );

-- UPDATE policy: Supabase Storage may update object metadata.
create policy "workspace_members_can_update"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'documents'
    and public.is_workspace_member(
      public.safe_cast_uuid((storage.foldername(name))[1])
    )
  )
  with check (
    bucket_id = 'documents'
    and public.is_workspace_member(
      public.safe_cast_uuid((storage.foldername(name))[1])
    )
  );

create policy "workspace_members_can_delete"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'documents'
    and public.is_workspace_member(
      public.safe_cast_uuid((storage.foldername(name))[1])
    )
  );
