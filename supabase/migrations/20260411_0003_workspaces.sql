-- Migration: Workspaces — the aggregation unit for benefit-bearing entities
--
-- Domain: workspaces
-- Tables: workspaces, workspace_members
-- Decisions: D1 (workspace model: users own multiple workspaces, cap 50 at app layer),
--            D2 (pricing: stripe_subscription_item_id per workspace).
-- Order: 03 / 09
--
-- The workspace is the entity being benefited (household or company). One
-- user can own multiple workspaces; sharing is modeled via workspace_members.
-- The `is_workspace_member()` helper from 0001 reads workspace_members.

-- ----------------------------------------------------------------------------
-- workspaces
-- ----------------------------------------------------------------------------

create table if not exists public.workspaces (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references auth.users(id) on delete cascade,
  type workspace_type not null,
  tier workspace_tier not null default 'free',
  name text not null,
  slug text not null,
  stripe_subscription_item_id text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  constraint workspaces_slug_per_owner unique (owner_user_id, slug),
  constraint workspaces_name_length check (length(name) between 1 and 80)
);

create index if not exists idx_workspaces_owner
  on public.workspaces(owner_user_id) where deleted_at is null;
create index if not exists idx_workspaces_tier
  on public.workspaces(tier) where deleted_at is null;

comment on table public.workspaces is
  'Entity being benefited. Household or company. One user can own up to 50 (app-layer cap).';

drop trigger if exists trg_workspaces_updated_at on public.workspaces;
create trigger trg_workspaces_updated_at
  before update on public.workspaces
  for each row execute function public.set_updated_at();

alter table public.workspaces enable row level security;

-- Now that workspaces exists, add the deferred FK from user_settings.
alter table public.user_settings
  drop constraint if exists user_settings_last_viewed_workspace_id_fkey;
alter table public.user_settings
  add constraint user_settings_last_viewed_workspace_id_fkey
  foreign key (last_viewed_workspace_id)
  references public.workspaces(id)
  on delete set null;

-- ----------------------------------------------------------------------------
-- workspace_members
-- ----------------------------------------------------------------------------

create table if not exists public.workspace_members (
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role workspace_role not null default 'owner',
  joined_at timestamptz not null default now(),
  primary key (workspace_id, user_id)
);

create index if not exists idx_workspace_members_user
  on public.workspace_members(user_id);

comment on table public.workspace_members is
  'Join table. v1: one row per workspace (the owner). v2: sharing, accountants, co-owners.';

alter table public.workspace_members enable row level security;

-- Workspace RLS policies (defined now that workspace_members exists so the
-- is_workspace_member() helper resolves cleanly).

create policy "workspaces_member_select"
  on public.workspaces
  for select
  using (public.is_workspace_member(id) and deleted_at is null);

create policy "workspaces_owner_insert"
  on public.workspaces
  for insert
  with check (auth.uid() = owner_user_id);

create policy "workspaces_member_update"
  on public.workspaces
  for update
  using (public.is_workspace_member(id) and deleted_at is null)
  with check (public.is_workspace_member(id));

-- workspace_members policies: members can read rows for their own workspaces;
-- only the workspace owner can insert/delete.
create policy "workspace_members_select_own"
  on public.workspace_members
  for select
  using (public.is_workspace_member(workspace_id));

create policy "workspace_members_owner_insert"
  on public.workspace_members
  for insert
  with check (
    exists (
      select 1 from public.workspaces w
      where w.id = workspace_id
        and w.owner_user_id = auth.uid()
    )
  );

create policy "workspace_members_owner_delete"
  on public.workspace_members
  for delete
  using (
    exists (
      select 1 from public.workspaces w
      where w.id = workspace_id
        and w.owner_user_id = auth.uid()
    )
  );
