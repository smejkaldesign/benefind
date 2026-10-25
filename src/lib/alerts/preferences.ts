/**
 * Whether a user should get new-match emails. A user_settings row is an
 * explicit choice (dashboard toggle or unsubscribe link) and wins. Without
 * one, the onboarding checkbox stored in auth user_metadata applies, and a
 * user who never saw it is opted in.
 */
export function newMatchEmailsEnabled(
  settings:
    | { email_notifications: boolean; new_match_emails: boolean }
    | null
    | undefined,
  userMetadata: Record<string, unknown> | null | undefined,
): boolean {
  if (settings)
    return settings.email_notifications && settings.new_match_emails;
  return userMetadata?.notify_on_eligibility_change !== false;
}
