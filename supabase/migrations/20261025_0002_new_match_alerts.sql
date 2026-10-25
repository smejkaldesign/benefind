-- New-match email alerts.
--
-- A daily job (POST /api/cron/new-matches) re-runs the eligibility engine
-- against each workspace's latest screening and emails the owner when a
-- program becomes pursuable that was not shown or announced before.
--
-- 1. user_settings.new_match_emails: per-user opt-out. A missing
--    user_settings row means the user has not opted out. Existing own-row RLS
--    policies on user_settings cover the dashboard toggle.
-- 2. new_match_alerts: one row per (workspace, program) that has been
--    announced, so each program is emailed at most once per workspace.
--    Written only by the service role (cron path); members can read their
--    own workspace's rows.

alter table public.user_settings
  add column if not exists new_match_emails boolean not null default true;

create table if not exists public.new_match_alerts (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  program_id text not null references public.programs(id) on delete cascade,
  screening_id uuid references public.screenings(id) on delete set null,
  sent_at timestamptz not null default now(),
  constraint new_match_alerts_workspace_program_key unique (workspace_id, program_id)
);

alter table public.new_match_alerts enable row level security;

create policy "new_match_alerts_member_select"
  on public.new_match_alerts
  for select
  using (public.is_workspace_member(workspace_id));
