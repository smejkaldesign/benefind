-- Billing guards for paid plans.
--
-- 1. workspaces.tier and stripe_subscription_item_id are written only by the
--    Stripe webhook (service role) or by an operator (postgres). Before this,
--    the workspaces_member_update policy let any member set tier = 'premium'
--    from the browser, and workspaces_owner_insert let a user create a
--    premium workspace. The trigger blocks both for the anon and
--    authenticated roles and leaves every other column editable.
-- 2. Document uploads (the documents row and the storage object) require a
--    workspace on a paid plan. The app checks this in server actions; these
--    restrictive policies enforce it for direct API calls too. Existing
--    documents stay readable and deletable after a downgrade.

create or replace function public.workspaces_guard_billing_columns()
returns trigger
language plpgsql
as $$
begin
  if current_user not in ('anon', 'authenticated') then
    return new;
  end if;

  if tg_op = 'INSERT' then
    if new.tier <> 'free' or new.stripe_subscription_item_id is not null then
      raise exception 'workspace billing columns are managed by billing'
        using errcode = '42501';
    end if;
  elsif new.tier is distinct from old.tier
     or new.stripe_subscription_item_id is distinct from old.stripe_subscription_item_id then
    raise exception 'workspace billing columns are managed by billing'
      using errcode = '42501';
  end if;

  return new;
end;
$$;

drop trigger if exists trg_workspaces_guard_billing_columns on public.workspaces;
create trigger trg_workspaces_guard_billing_columns
  before insert or update on public.workspaces
  for each row execute function public.workspaces_guard_billing_columns();

-- plpgsql (not sql) to match is_workspace_member(); security definer so the
-- check works inside storage policies.
create or replace function public.workspace_has_paid_plan(ws_id uuid)
returns boolean
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  return exists (
    select 1 from public.workspaces
    where id = ws_id
      and tier = 'premium'
      and deleted_at is null
  );
end;
$$;

drop policy if exists "documents_insert_requires_paid_plan" on public.documents;
create policy "documents_insert_requires_paid_plan"
  on public.documents
  as restrictive
  for insert
  to authenticated
  with check (
    public.workspace_has_paid_plan(workspace_id) or public.is_admin()
  );

drop policy if exists "documents_upload_requires_paid_plan" on storage.objects;
create policy "documents_upload_requires_paid_plan"
  on storage.objects
  as restrictive
  for insert
  to authenticated
  with check (
    bucket_id <> 'documents'
    or public.is_admin()
    or public.workspace_has_paid_plan(
      public.safe_cast_uuid((storage.foldername(name))[1])
    )
  );
