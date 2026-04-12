-- Retention/purge function for GDPR compliance.
--
-- Two-phase approach:
-- 1. Soft-delete: mark screenings/documents older than retention_days
-- 2. Hard-delete: permanently remove soft-deleted rows after grace_days
--
-- screening_results has no deleted_at column; it cascades via screening_id.
--
-- Called by the purge-expired Edge Function on a schedule (daily at 3am UTC).
-- Uses SECURITY DEFINER so RLS is bypassed for the cleanup operation.

create or replace function public.purge_expired_data(
  retention_days int default 365,
  grace_days int default 30
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  soft_deleted_screenings int := 0;
  hard_deleted_screenings int := 0;
  hard_deleted_results int := 0;
  hard_deleted_documents int := 0;
  soft_deleted_documents int := 0;
begin
  -- Phase 1: Soft-delete screenings older than retention_days
  with marked as (
    update screenings
    set deleted_at = now()
    where deleted_at is null
      and created_at < now() - make_interval(days => retention_days)
    returning id
  )
  select count(*) into soft_deleted_screenings from marked;

  -- Soft-delete documents older than retention_days
  with marked as (
    update documents
    set deleted_at = now()
    where deleted_at is null
      and uploaded_at < now() - make_interval(days => retention_days)
    returning id
  )
  select count(*) into soft_deleted_documents from marked;

  -- Phase 2: Hard-delete rows past the grace period
  -- screening_results has no deleted_at; delete by joining to soft-deleted screenings
  with removed as (
    delete from screening_results
    where screening_id in (
      select id from screenings
      where deleted_at is not null
        and deleted_at < now() - make_interval(days => grace_days)
    )
    returning id
  )
  select count(*) into hard_deleted_results from removed;

  -- Then delete the screenings themselves
  with removed as (
    delete from screenings
    where deleted_at is not null
      and deleted_at < now() - make_interval(days => grace_days)
    returning id
  )
  select count(*) into hard_deleted_screenings from removed;

  -- Hard-delete documents (storage objects must be cleaned separately)
  with removed as (
    delete from documents
    where deleted_at is not null
      and deleted_at < now() - make_interval(days => grace_days)
    returning id
  )
  select count(*) into hard_deleted_documents from removed;

  return jsonb_build_object(
    'soft_deleted', jsonb_build_object(
      'screenings', soft_deleted_screenings,
      'documents', soft_deleted_documents
    ),
    'hard_deleted', jsonb_build_object(
      'screenings', hard_deleted_screenings,
      'screening_results', hard_deleted_results,
      'documents', hard_deleted_documents
    ),
    'retention_days', retention_days,
    'grace_days', grace_days,
    'executed_at', now()
  );
end;
$$;

-- Grant execute to service_role only (Edge Function uses service-role key)
revoke execute on function public.purge_expired_data from public;
revoke execute on function public.purge_expired_data from anon;
revoke execute on function public.purge_expired_data from authenticated;
