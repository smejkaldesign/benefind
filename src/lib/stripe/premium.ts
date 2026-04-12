import { createServerSupabase } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { isWorkspacePremium } from "@/lib/db/billing";

/**
 * Check if the current workspace is on the premium tier.
 * Reads workspace ID from cookie. Returns false if no workspace or not premium.
 */
export async function checkPremium(): Promise<boolean> {
  const cookieStore = await cookies();
  const workspaceId = cookieStore.get("bf-workspace")?.value;
  if (!workspaceId) return false;

  const supabase = await createServerSupabase();
  const { data } = await isWorkspacePremium(supabase, workspaceId);
  return data ?? false;
}
