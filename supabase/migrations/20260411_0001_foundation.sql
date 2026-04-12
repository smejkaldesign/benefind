-- Migration: Foundation — enums and RLS helper functions
--
-- Domain: foundation (shared primitives)
-- Tables: none (types + functions only)
-- Decisions: D3 (eligibility enum is NOT used — tier is a generated text column),
--            D4 (document_scan_status enum).
-- Order: 01 / 09
--
-- This migration must be applied first. It creates every Postgres enum used by
-- later migrations and defines the two RLS helper functions (`is_admin()` and
-- `is_workspace_member()`). Both functions reference tables that do not exist
-- yet (`admin_users`, `workspace_members`); Postgres parses function bodies
-- lazily at call time so this is safe — no call site fires until after those
-- tables are created in later migrations.

-- ----------------------------------------------------------------------------
-- Enum types
-- ----------------------------------------------------------------------------

do $$
begin
  if not exists (select 1 from pg_type where typname = 'workspace_type') then
    create type workspace_type as enum ('individual', 'company');
  end if;

  if not exists (select 1 from pg_type where typname = 'workspace_tier') then
    create type workspace_tier as enum ('free', 'premium');
  end if;

  if not exists (select 1 from pg_type where typname = 'workspace_role') then
    create type workspace_role as enum ('owner', 'member', 'viewer');
  end if;

  if not exists (select 1 from pg_type where typname = 'document_scan_status') then
    create type document_scan_status as enum ('pending', 'clean', 'infected', 'error');
  end if;

  if not exists (select 1 from pg_type where typname = 'subscription_status') then
    create type subscription_status as enum (
      'trialing', 'active', 'past_due', 'canceled',
      'incomplete', 'incomplete_expired', 'unpaid'
    );
  end if;

  if not exists (select 1 from pg_type where typname = 'admin_role') then
    create type admin_role as enum ('owner', 'operator', 'viewer');
  end if;

  if not exists (select 1 from pg_type where typname = 'ticket_status') then
    create type ticket_status as enum ('open', 'pending', 'resolved', 'closed');
  end if;

  if not exists (select 1 from pg_type where typname = 'export_status') then
    create type export_status as enum (
      'requested', 'processing', 'ready', 'delivered', 'failed', 'expired'
    );
  end if;

  if not exists (select 1 from pg_type where typname = 'export_kind') then
    create type export_kind as enum ('export', 'erasure');
  end if;
end$$;

-- ----------------------------------------------------------------------------
-- Shared updated_at trigger function
-- ----------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- ----------------------------------------------------------------------------
-- RLS helper: is_workspace_member()
-- References public.workspace_members (created in 0003).
-- ----------------------------------------------------------------------------

-- NOTE: must be language plpgsql, NOT language sql. SQL-language functions
-- have their bodies validated at CREATE time, which fails when the referenced
-- table doesn't exist yet. plpgsql bodies are parsed lazily at call time.
create or replace function public.is_workspace_member(ws_id uuid)
returns boolean
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  return exists (
    select 1 from public.workspace_members
    where workspace_id = ws_id
      and user_id = auth.uid()
  );
end;
$$;

-- ----------------------------------------------------------------------------
-- RLS helper: is_admin()
-- References public.admin_users (created in 0008).
-- Same plpgsql rationale as is_workspace_member above.
-- ----------------------------------------------------------------------------

create or replace function public.is_admin()
returns boolean
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  return exists (
    select 1 from public.admin_users
    where user_id = auth.uid()
      and disabled_at is null
  );
end;
$$;
