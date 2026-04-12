-- Migration: Admin & ops — admin users, audit log, feature flags, support, notifications
--
-- Domain: admin / ops
-- Tables: admin_users, admin_actions, feature_flags, support_tickets, notifications
-- Decisions: the is_admin() helper (defined in 0001) reads admin_users — the table
--            must exist before any admin policy actually fires.
-- Order: 08 / 09
--
-- Notifications live here (not with workspaces) because they cross-cut: most
-- are workspace-scoped but billing/security notifications are user-scoped
-- (workspace_id null). Support tickets also cross-cut: a user can open a
-- ticket without a workspace.

-- ----------------------------------------------------------------------------
-- admin_users
-- ----------------------------------------------------------------------------

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role admin_role not null default 'operator',
  invited_by uuid references auth.users(id),
  invited_at timestamptz not null default now(),
  last_login_at timestamptz,
  disabled_at timestamptz
);

create index if not exists idx_admin_users_active
  on public.admin_users(role) where disabled_at is null;

comment on table public.admin_users is
  'Subset of auth.users with elevated permissions. Read by is_admin() helper.';

alter table public.admin_users enable row level security;

-- Only owner-role admins can read/write this table.
create policy "admin_users_owner_all"
  on public.admin_users
  for all
  using (
    exists (
      select 1 from public.admin_users a
      where a.user_id = auth.uid()
        and a.role = 'owner'
        and a.disabled_at is null
    )
  )
  with check (
    exists (
      select 1 from public.admin_users a
      where a.user_id = auth.uid()
        and a.role = 'owner'
        and a.disabled_at is null
    )
  );

-- ----------------------------------------------------------------------------
-- admin_actions (append-only audit log)
-- ----------------------------------------------------------------------------

create table if not exists public.admin_actions (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid not null references public.admin_users(user_id),
  action text not null,
  target_table text not null,
  target_id text,
  diff jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_admin_actions_actor
  on public.admin_actions(actor_id, created_at desc);
create index if not exists idx_admin_actions_target
  on public.admin_actions(target_table, target_id);

alter table public.admin_actions enable row level security;

-- Admin read-only; service role writes via bypass.
create policy "admin_actions_admin_select"
  on public.admin_actions
  for select
  using (public.is_admin());

-- ----------------------------------------------------------------------------
-- feature_flags
-- ----------------------------------------------------------------------------

create table if not exists public.feature_flags (
  name text primary key,
  enabled boolean not null default false,
  rollout_percent int not null default 0 check (rollout_percent between 0 and 100),
  payload jsonb,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_feature_flags_updated_at on public.feature_flags;
create trigger trg_feature_flags_updated_at
  before update on public.feature_flags
  for each row execute function public.set_updated_at();

alter table public.feature_flags enable row level security;

-- Public read, admin write.
create policy "feature_flags_public_read"
  on public.feature_flags
  for select
  using (true);

create policy "feature_flags_admin_write"
  on public.feature_flags
  for all
  using (public.is_admin())
  with check (public.is_admin());

-- ----------------------------------------------------------------------------
-- support_tickets
-- ----------------------------------------------------------------------------
-- Open tickets block the retention purge for that user (see 0009 / cron).

create table if not exists public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  workspace_id uuid references public.workspaces(id) on delete set null,
  email text not null,
  subject text not null,
  body text not null,
  status ticket_status not null default 'open',
  assigned_to uuid references public.admin_users(user_id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  closed_at timestamptz
);

create index if not exists idx_support_tickets_status on public.support_tickets(status);
create index if not exists idx_support_tickets_user on public.support_tickets(user_id);
create index if not exists idx_support_tickets_open
  on public.support_tickets(user_id)
  where status in ('open', 'pending');

drop trigger if exists trg_support_tickets_updated_at on public.support_tickets;
create trigger trg_support_tickets_updated_at
  before update on public.support_tickets
  for each row execute function public.set_updated_at();

alter table public.support_tickets enable row level security;

create policy "support_tickets_select_own"
  on public.support_tickets
  for select
  using (auth.uid() = user_id or public.is_admin());

create policy "support_tickets_insert_own"
  on public.support_tickets
  for insert
  with check (auth.uid() = user_id);

create policy "support_tickets_admin_update"
  on public.support_tickets
  for update
  using (public.is_admin())
  with check (public.is_admin());

-- ----------------------------------------------------------------------------
-- notifications
-- ----------------------------------------------------------------------------
-- workspace_id is nullable: billing + security notifications are user-scoped.

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  workspace_id uuid references public.workspaces(id) on delete cascade,
  type text not null,
  title text not null,
  body text,
  payload jsonb,
  link_url text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists idx_notifications_user_unread
  on public.notifications(user_id, created_at desc)
  where read_at is null;

create index if not exists idx_notifications_workspace
  on public.notifications(workspace_id, created_at desc)
  where workspace_id is not null;

alter table public.notifications enable row level security;

-- Users read their own rows (both workspace-scoped and user-scoped).
create policy "notifications_select_own"
  on public.notifications
  for select
  using (auth.uid() = user_id);

-- Users can mark their own notifications read (update read_at).
create policy "notifications_update_own"
  on public.notifications
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Service role writes via bypass (no client inserts).
