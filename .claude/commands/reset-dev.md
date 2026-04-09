Reset a development user in the Benefind Supabase project.

Usage: /reset-dev <email>

Steps:
1. Read the Supabase URL and service role key from `.env.local` (NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY). Never print these values.
2. Call the Supabase Admin API to list users and find the one matching the provided email.
3. If found, delete the user via `DELETE /auth/v1/admin/users/{id}`.
4. Confirm the deletion to the user with the email address and status.
5. If not found, tell the user the email wasn't found and list available emails (redact if more than 10).

Important:
- Never expose the service role key or any secrets in output.
- Use `ctx_execute` with JavaScript fetch to make the API calls (keeps secrets out of context).
- This is a destructive action for development use only. Confirm before deleting if the email looks like a real user (not a test/dev address).
