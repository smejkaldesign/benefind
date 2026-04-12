-- Storage bucket RLS policies for the `documents` bucket.
--
-- The bucket was created as private (public = false). These policies
-- control who can upload, download, and delete objects.
--
-- Path convention: <workspace_id>/<uuid>-<sanitized_filename>
-- The first path segment is always the workspace_id, which the policies
-- use for membership checks via is_workspace_member().

-- Allow workspace members to upload files to their workspace folder.
create policy "workspace_members_can_upload"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'documents'
    and public.is_workspace_member(
      (storage.foldername(name))[1]::uuid
    )
  );

-- Allow workspace members to read (download) their own workspace files.
-- The scan-document Edge Function uses service-role to download, so this
-- policy only gates authenticated user downloads.
create policy "workspace_members_can_read"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'documents'
    and public.is_workspace_member(
      (storage.foldername(name))[1]::uuid
    )
  );

-- Allow workspace members to delete their own uploads.
create policy "workspace_members_can_delete"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'documents'
    and public.is_workspace_member(
      (storage.foldername(name))[1]::uuid
    )
  );

-- Allow admins full access to all documents (for moderation, ClamAV monitoring).
create policy "admins_full_access"
  on storage.objects
  for all
  to authenticated
  using (
    bucket_id = 'documents'
    and public.is_admin()
  )
  with check (
    bucket_id = 'documents'
    and public.is_admin()
  );
