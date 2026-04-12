-- Migration: Identity — user-scoped profile and settings tables
--
-- Domain: identity
-- Tables: user_profiles, user_settings
-- Decisions: referenced by D1 (user vs workspace split).
-- Order: 02 / 09
--
-- Notes:
-- - Both tables use auth.users(id) as PK with on-delete cascade.
-- - user_settings.last_viewed_workspace_id references workspaces(id); that FK
--   is added in 0003 after workspaces exists (alter table ... add constraint).

-- ----------------------------------------------------------------------------
-- user_profiles
-- ----------------------------------------------------------------------------

create table if not exists public.user_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  locale text not null default 'en' check (locale in ('en', 'es', 'zh', 'vi', 'ar')),
  persona text check (persona in ('individual', 'company_admin', 'both')),
  marketing_opt_in boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_user_profiles_persona on public.user_profiles(persona);

drop trigger if exists trg_user_profiles_updated_at on public.user_profiles;
create trigger trg_user_profiles_updated_at
  before update on public.user_profiles
  for each row execute function public.set_updated_at();

alter table public.user_profiles enable row level security;

create policy "user_profiles_select_own"
  on public.user_profiles
  for select
  using (auth.uid() = user_id);

create policy "user_profiles_insert_own"
  on public.user_profiles
  for insert
  with check (auth.uid() = user_id);

create policy "user_profiles_update_own"
  on public.user_profiles
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ----------------------------------------------------------------------------
-- user_settings
-- ----------------------------------------------------------------------------
-- last_viewed_workspace_id FK is added in 20260411_0003_workspaces.sql so this
-- table can be created before workspaces exists.

create table if not exists public.user_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email_notifications boolean not null default true,
  notification_prefs jsonb not null default '{}'::jsonb,
  timezone text not null default 'UTC',
  last_viewed_workspace_id uuid,
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_user_settings_updated_at on public.user_settings;
create trigger trg_user_settings_updated_at
  before update on public.user_settings
  for each row execute function public.set_updated_at();

alter table public.user_settings enable row level security;

create policy "user_settings_select_own"
  on public.user_settings
  for select
  using (auth.uid() = user_id);

create policy "user_settings_insert_own"
  on public.user_settings
  for insert
  with check (auth.uid() = user_id);

create policy "user_settings_update_own"
  on public.user_settings
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
