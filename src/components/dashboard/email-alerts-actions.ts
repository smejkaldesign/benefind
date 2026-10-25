"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { newMatchEmailsEnabled } from "@/lib/alerts/preferences";

/** Current new-match email setting for the signed-in user, or null if signed out. */
export async function getNewMatchEmails(): Promise<boolean | null> {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: settings } = await supabase
    .from("user_settings")
    .select("email_notifications, new_match_emails")
    .eq("user_id", user.id)
    .maybeSingle();
  return newMatchEmailsEnabled(settings, user.user_metadata);
}

/** Saves the setting under the user's own RLS. Returns the stored value, or null on failure. */
export async function setNewMatchEmails(
  enabled: boolean,
): Promise<boolean | null> {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { error } = await supabase.from("user_settings").upsert(
    enabled
      ? {
          user_id: user.id,
          new_match_emails: true,
          email_notifications: true,
        }
      : { user_id: user.id, new_match_emails: false },
    { onConflict: "user_id" },
  );
  return error ? null : enabled;
}
