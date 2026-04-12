-- Migration: Billing — Stripe subscription + invoice mirrors
--
-- Domain: billing
-- Tables: subscriptions, invoices
-- Decisions: D2 (per-workspace pricing: plan is implied by the set of
--               workspaces.stripe_subscription_item_id — subscriptions.user_id is the
--               Stripe customer; no plan column here).
-- Order: 07 / 09
--
-- subscriptions has one row per user. The per-workspace subscription items
-- live on workspaces.stripe_subscription_item_id (see 0003). Invoices are
-- cached from Stripe webhooks and retained 7 years per GAAP/IRS.

-- ----------------------------------------------------------------------------
-- subscriptions
-- ----------------------------------------------------------------------------

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  stripe_customer_id text not null,
  stripe_subscription_id text unique,
  status subscription_status not null,
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  canceled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_subscriptions_stripe_customer
  on public.subscriptions(stripe_customer_id);

comment on table public.subscriptions is
  'One row per user. Plan is implied by the set of workspaces.stripe_subscription_item_id (D2).';

drop trigger if exists trg_subscriptions_updated_at on public.subscriptions;
create trigger trg_subscriptions_updated_at
  before update on public.subscriptions
  for each row execute function public.set_updated_at();

alter table public.subscriptions enable row level security;

create policy "subscriptions_select_own"
  on public.subscriptions
  for select
  using (auth.uid() = user_id);

-- No client writes; webhooks use service_role which bypasses RLS.

-- ----------------------------------------------------------------------------
-- invoices
-- ----------------------------------------------------------------------------
-- user_id is nullable to support 7-year retention after account deletion.

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  subscription_id uuid not null references public.subscriptions(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  stripe_invoice_id text not null unique,
  amount_due_cents int not null,
  amount_paid_cents int not null,
  currency text not null default 'usd',
  status text not null,
  invoice_pdf_url text,
  hosted_invoice_url text,
  created_at timestamptz not null default now()
);

create index if not exists idx_invoices_user
  on public.invoices(user_id, created_at desc);

comment on column public.invoices.user_id is
  'Nullable on purpose: anonymized on account deletion for 7-year financial retention.';

alter table public.invoices enable row level security;

create policy "invoices_select_own"
  on public.invoices
  for select
  using (auth.uid() = user_id);

-- No client writes; webhooks use service_role.
