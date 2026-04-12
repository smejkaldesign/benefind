import { redirect } from "next/navigation";
import Link from "next/link";
import { createServerSupabase } from "@/lib/supabase/server";
import { isUserAdmin } from "@/lib/db/admin";
import { SignOutButton } from "@/components/sign-out-button";
import {
  LayoutDashboard,
  BookOpen,
  HeadphonesIcon,
  Shield,
} from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?next=/admin");
  }

  const { data: admin } = await isUserAdmin(supabase, user.id);
  if (!admin) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-30 border-b border-border bg-surface/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-brand" />
              <span className="text-lg font-bold text-brand">
                Benefind Admin
              </span>
            </Link>
          </div>
          <nav className="flex items-center gap-1">
            <AdminNavLink
              href="/admin"
              icon={LayoutDashboard}
              label="Overview"
            />
            <AdminNavLink
              href="/admin/programs"
              icon={BookOpen}
              label="Programs"
            />
            <AdminNavLink
              href="/admin/support"
              icon={HeadphonesIcon}
              label="Support"
            />
            <div className="ml-2 border-l border-border pl-2">
              <SignOutButton />
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1 px-4 py-6">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
}

function AdminNavLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-text-muted transition-colors hover:bg-surface-bright hover:text-text"
    >
      <Icon className="h-4 w-4" />
      <span className="hidden sm:inline">{label}</span>
    </Link>
  );
}
