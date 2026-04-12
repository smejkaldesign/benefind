-- Migration: Programs — global benefit/incentive catalog
--
-- Domain: programs
-- Tables: programs, program_translations
-- Decisions: D5 (programs.id is text PK with format CHECK, acts as the URL slug).
-- Order: 04 / 09
--
-- Standalone domain — programs have no workspace or user FK. Public-readable
-- (active rows only); admin-writable via service role.

-- ----------------------------------------------------------------------------
-- programs
-- ----------------------------------------------------------------------------

create table if not exists public.programs (
  id text primary key
    constraint programs_id_format check (
      id ~ '^[a-z0-9-]+$' and length(id) between 3 and 60
    ),
  name text not null,
  agency text,
  category text not null check (
    category in ('tax_credit', 'grant', 'incentive', 'contracting', 'benefit', 'assistance')
  ),
  track text not null check (track in ('individual', 'company', 'both')),
  tier text check (tier in ('universal', 'industry', 'situation', 'state')),
  description text,
  plain_language_summary text,
  eligibility_criteria jsonb not null,
  typical_award text,
  application_url text,
  deadline_info text,
  state text,
  industries text[],
  cover_image text,
  seo_title text,
  seo_description text,
  status text not null default 'active' check (
    status in ('active', 'draft', 'paused', 'expired')
  ),
  published_at timestamptz,
  last_reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_programs_status on public.programs(status);
create index if not exists idx_programs_track on public.programs(track);
create index if not exists idx_programs_state on public.programs(state);
create index if not exists idx_programs_industries on public.programs using gin(industries);

comment on table public.programs is
  'Global benefit/incentive catalog. Text PK per D5 — id IS the URL slug.';
comment on column public.programs.id is
  'Stable text slug. Format: lowercase alphanumerics + hyphens, 3-60 chars.';

drop trigger if exists trg_programs_updated_at on public.programs;
create trigger trg_programs_updated_at
  before update on public.programs
  for each row execute function public.set_updated_at();

alter table public.programs enable row level security;

-- Public read of active programs
create policy "programs_public_read_active"
  on public.programs
  for select
  using (status = 'active');

-- Admin full access
create policy "programs_admin_all"
  on public.programs
  for all
  using (public.is_admin())
  with check (public.is_admin());

-- ----------------------------------------------------------------------------
-- program_translations
-- ----------------------------------------------------------------------------

create table if not exists public.program_translations (
  program_id text not null references public.programs(id) on delete cascade,
  locale text not null check (locale in ('en', 'es', 'zh', 'vi', 'ar')),
  name text not null,
  description text,
  plain_language_summary text,
  seo_title text,
  seo_description text,
  updated_at timestamptz not null default now(),
  primary key (program_id, locale)
);

drop trigger if exists trg_program_translations_updated_at on public.program_translations;
create trigger trg_program_translations_updated_at
  before update on public.program_translations
  for each row execute function public.set_updated_at();

alter table public.program_translations enable row level security;

create policy "program_translations_public_read"
  on public.program_translations
  for select
  using (true);

create policy "program_translations_admin_all"
  on public.program_translations
  for all
  using (public.is_admin())
  with check (public.is_admin());
