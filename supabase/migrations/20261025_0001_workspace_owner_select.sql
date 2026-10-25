-- Let workspace owners read their own workspace.
--
-- createWorkspace() inserts the workspace with `.select("*")`, which needs the
-- new row to pass a SELECT policy. workspaces_member_select only admits
-- members, and the owner's workspace_members row is inserted after the
-- workspace, so every first-login insert failed with an RLS violation.
-- ensureWorkspace() then returned no memberships and the dashboard layout
-- redirected to /auth/login?error=workspace_error, which looked like a
-- magic-link loop. The same check also blocked workspace_members_owner_insert,
-- whose EXISTS subquery reads workspaces under the caller's RLS.

create policy "workspaces_owner_select"
  on public.workspaces
  for select
  using (auth.uid() = owner_user_id and deleted_at is null);
