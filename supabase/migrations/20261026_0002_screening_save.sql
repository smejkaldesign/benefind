-- Make re-screens save.
--
-- 1. idx_screenings_workspace_latest allows one is_latest row per workspace,
--    but trg_screenings_mark_prior_not_latest ran AFTER INSERT. Postgres
--    checks the unique index while inserting the row, before after-triggers
--    run, so every screening after a workspace's first failed with 23505.
--    Running the trigger BEFORE INSERT clears the prior row first.
-- 2. create_screening() inserts the screening and its results in one
--    transaction. The app used to insert them separately and delete the
--    screening when the results insert failed, but screenings has no DELETE
--    policy, so the cleanup was a no-op and left screenings with no results.
--    With the BEFORE trigger, a non-atomic save would also clear the prior
--    is_latest row before a failed results insert. security invoker, so the
--    existing member RLS policies still apply.

drop trigger if exists trg_screenings_mark_prior_not_latest on public.screenings;
create trigger trg_screenings_mark_prior_not_latest
  before insert on public.screenings
  for each row
  when (new.is_latest = true)
  execute function public.screenings_mark_prior_not_latest();

create or replace function public.create_screening(
  p_workspace_id uuid,
  p_answers jsonb,
  p_engine_version text,
  p_state text,
  p_zip text,
  p_household_size int,
  p_language text,
  p_results jsonb
)
returns uuid
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_screening_id uuid;
begin
  insert into public.screenings (
    workspace_id, answers, engine_version, state, zip, household_size,
    language, is_latest
  )
  values (
    p_workspace_id, p_answers, p_engine_version, p_state, p_zip,
    p_household_size, coalesce(p_language, 'en'), true
  )
  returning id into v_screening_id;

  insert into public.screening_results (
    screening_id, workspace_id, program_id, confidence_score,
    estimated_value, reasons
  )
  select
    v_screening_id, p_workspace_id, r.program_id, r.confidence_score,
    r.estimated_value, r.reasons
  from jsonb_to_recordset(coalesce(p_results, '[]'::jsonb)) as r(
    program_id text,
    confidence_score smallint,
    estimated_value text,
    reasons jsonb
  );

  return v_screening_id;
end;
$$;

revoke execute on function public.create_screening(uuid, jsonb, text, text, text, int, text, jsonb) from public, anon;
grant execute on function public.create_screening(uuid, jsonb, text, text, text, int, text, jsonb) to authenticated;
