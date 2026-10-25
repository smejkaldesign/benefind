import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerSupabase } from "@/lib/supabase/server";
import { ensureWorkspace } from "@/lib/workspace/ensure-workspace";
import { WorkspaceProvider } from "@/lib/workspace/context";
import { AppShell } from "@/components/layout/app-shell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?next=/dashboard");
  }

  const { data: memberships, error } = await ensureWorkspace(supabase, user.id);

  if (!memberships || memberships.length === 0) {
    console.error(
      "ensureWorkspace failed:",
      error?.message ?? "no memberships",
    );
    redirect("/auth/login?error=workspace_error");
  }

  // Read active workspace from cookie, fall back to first workspace
  const cookieStore = await cookies();
  const activeWorkspaceId = cookieStore.get("bf-workspace")?.value;

  return (
    <WorkspaceProvider
      memberships={memberships}
      initialWorkspaceId={activeWorkspaceId}
    >
      <AppShell>{children}</AppShell>
    </WorkspaceProvider>
  );
}
