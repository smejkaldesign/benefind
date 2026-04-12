-- Migration: Screening — eligibility screening runs and results
--
-- Domain: screening
-- Tables: screenings, screening_results, company_profiles, company_program_matches
-- Decisions: D3 (confidence_score smallint 0..100 + generated eligibility_tier text column
--                using the 5-bucket mapping from the Tier mapping table).
-- Order: 05 / 09
--
-- RLS: all tables are workspace-scoped via the denormalized workspace_id column.

-- ----------------------------------------------------------------------------
-- screenings
-- ----------------------------------------------------------------------------

create table if not exists public.screenings (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
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

create unique index if not exists idx_screenings_workspace_latest
  on public.screenings(workspace_id)
  where is_latest = true and deleted_at is null;

create index if not exists idx_screenings_workspace_created
  on public.screenings(workspace_id, created_at desc);

comment on table public.screenings is
  'One row per screening run. Free tier: at most one (app-layer enforced).';

-- Trigger: when a new screening is inserted, clear is_latest on prior rows.
create or replace function public.screenings_mark_prior_not_latest()
returns trigger
language plpgsql
as $$
begin
  update public.screenings
    set is_latest = false
    where workspace_id = new.workspace_id
      and id <> new.id
      and is_latest = true;
  return new;
end;
$$;

drop trigger if exists trg_screenings_mark_prior_not_latest on public.screenings;
create trigger trg_screenings_mark_prior_not_latest
  after insert on public.screenings
  for each row
  when (new.is_latest = true)
  execute function public.screenings_mark_prior_not_latest();

alter table public.screenings enable row level security;

create policy "screenings_member_select"
  on public.screenings
  for select
  using (public.is_workspace_member(workspace_id) and deleted_at is null);

create policy "screenings_member_insert"
  on public.screenings
  for insert
  with check (public.is_workspace_member(workspace_id));

create policy "screenings_member_update"
  on public.screenings
  for update
  using (public.is_workspace_member(workspace_id))
  with check (public.is_workspace_member(workspace_id));

-- ----------------------------------------------------------------------------
-- screening_results
-- ----------------------------------------------------------------------------
-- workspace_id is denormalized from screenings for cheap RLS (spec note).

create table if not exists public.screening_results (
  id uuid primary key default gen_random_uuid(),
  screening_id uuid not null references public.screenings(id) on delete cascade,
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  program_id text not null references public.programs(id),
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

create unique index if not exists idx_screening_results_unique
  on public.screening_results(screening_id, program_id);
create index if not exists idx_screening_results_workspace_tier
  on public.screening_results(workspace_id, eligibility_tier);
create index if not exists idx_screening_results_score_desc
  on public.screening_results(workspace_id, confidence_score desc);
create index if not exists idx_screening_results_program
  on public.screening_results(program_id);

comment on column public.screening_results.eligibility_tier is
  'Generated from confidence_score per D3 tier mapping: >=70 eligible_with_requirements, >=50 probably_eligible, >=25 maybe_eligible, >=5 not_likely, else ineligible.';

alter table public.screening_results enable row level security;

create policy "screening_results_member_select"
  on public.screening_results
  for select
  using (public.is_workspace_member(workspace_id));

create policy "screening_results_member_insert"
  on public.screening_results
  for insert
  with check (public.is_workspace_member(workspace_id));

create policy "screening_results_member_update"
  on public.screening_results
  for update
  using (public.is_workspace_member(workspace_id))
  with check (public.is_workspace_member(workspace_id));

-- ----------------------------------------------------------------------------
-- company_profiles
-- ----------------------------------------------------------------------------

create table if not exists public.company_profiles (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null unique references public.workspaces(id) on delete cascade,
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

drop trigger if exists trg_company_profiles_updated_at on public.company_profiles;
create trigger trg_company_profiles_updated_at
  before update on public.company_profiles
  for each row execute function public.set_updated_at();

alter table public.company_profiles enable row level security;

create policy "company_profiles_member_select"
  on public.company_profiles
  for select
  using (public.is_workspace_member(workspace_id) and deleted_at is null);

create policy "company_profiles_member_insert"
  on public.company_profiles
  for insert
  with check (public.is_workspace_member(workspace_id));

create policy "company_profiles_member_update"
  on public.company_profiles
  for update
  using (public.is_workspace_member(workspace_id))
  with check (public.is_workspace_member(workspace_id));

-- ----------------------------------------------------------------------------
-- company_program_matches
-- ----------------------------------------------------------------------------

create table if not exists public.company_program_matches (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  company_id uuid not null references public.company_profiles(id) on delete cascade,
  program_id text not null references public.programs(id),
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
  status text not null default 'new' check (
    status in ('new', 'saved', 'applied', 'ineligible', 'dismissed')
  ),
  estimated_value text,
  reasons jsonb not null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists idx_company_matches_unique
  on public.company_program_matches(company_id, program_id);
create index if not exists idx_company_matches_workspace_tier
  on public.company_program_matches(workspace_id, eligibility_tier);
create index if not exists idx_company_matches_program
  on public.company_program_matches(program_id);

drop trigger if exists trg_company_program_matches_updated_at on public.company_program_matches;
create trigger trg_company_program_matches_updated_at
  before update on public.company_program_matches
  for each row execute function public.set_updated_at();

alter table public.company_program_matches enable row level security;

create policy "company_program_matches_member_select"
  on public.company_program_matches
  for select
  using (public.is_workspace_member(workspace_id));

create policy "company_program_matches_member_insert"
  on public.company_program_matches
  for insert
  with check (public.is_workspace_member(workspace_id));

create policy "company_program_matches_member_update"
  on public.company_program_matches
  for update
  using (public.is_workspace_member(workspace_id))
  with check (public.is_workspace_member(workspace_id));
