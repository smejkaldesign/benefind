-- Fix the storage_bucket column default from 'user-documents' to 'documents'.
--
-- The Edge Function, DAL, and actual Supabase Storage bucket all use
-- 'documents'. The column default was left over from an earlier naming
-- convention. Any rows inserted with the old default would fail the
-- Edge Function lookup (eq("storage_bucket", "documents")).

alter table public.documents
  alter column storage_bucket set default 'documents';

-- Also update any existing rows that might have the old default.
update public.documents
  set storage_bucket = 'documents'
  where storage_bucket = 'user-documents';
