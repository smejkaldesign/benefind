import Link from "next/link";
import Image from "next/image";
import { Home, MessageCircle, LayoutDashboard } from "lucide-react";
import { HoverHint } from "@/components/hover-hint";
import { SignOutButton } from "@/components/sign-out-button";
import { LanguageSelector } from "@/components/language-selector";
import { WorkspacePicker } from "@/components/workspace-picker";
import { ThemeToggle } from "@/components/theme-toggle";
import { getServerI18n } from "@/lib/i18n/server";

/**
 * AppShell is a lightweight mobile-first layout (header + content + tab bar).
 * The shadcn/ui Sidebar component was evaluated but not adopted here because:
 * 1. AppShell has no collapsible sidebar; it uses a bottom tab bar on mobile.
 * 2. The shadcn Sidebar assumes a desktop-first left-rail pattern with tooltips,
 *    keyboard shortcuts, and collapsible groups, none of which apply.
 * 3. Adopting it would add complexity without improving the mobile UX.
 */
interface AppShellProps {
  children: React.ReactNode;
}

export async function AppShell({ children }: AppShellProps) {
  const { t } = await getServerI18n();
  return (
    <div className="flex min-h-dvh flex-col">
      {/* Top nav — mobile-friendly */}
      <header className="sticky top-banner z-30 border-b border-border bg-surface/95 px-4 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center" aria-label="Benefind">
              <Image
                src="/images/brand/logo-dark.svg"
                alt=""
                width={104}
                height={19}
                priority
                className="dark:hidden"
              />
              <Image
                src="/images/brand/logo-light.svg"
                alt=""
                width={104}
                height={19}
                priority
                className="hidden dark:block"
              />
            </Link>
            <span className="text-border" aria-hidden="true">
              /
            </span>
            <WorkspacePicker />
          </div>
          <div className="-me-3 flex items-center gap-2">
            <HoverHint label={t.app.shell.toggleTheme}>
              <ThemeToggle />
            </HoverHint>
            <HoverHint label={t.app.shell.changeLanguage}>
              <LanguageSelector compact />
            </HoverHint>
            <SignOutButton />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 px-4 py-6">
        <div className="mx-auto max-w-3xl">{children}</div>
      </main>

      {/* Bottom nav — mobile tab bar */}
      <nav className="sticky bottom-0 z-30 border-t border-border bg-surface/95 backdrop-blur-sm sm:hidden">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-around">
          <NavTab href="/" icon={Home} label={t.common.home} />
          <NavTab
            href="/screening"
            icon={MessageCircle}
            label={t.common.screening}
          />
          <NavTab
            href="/dashboard"
            icon={LayoutDashboard}
            label={t.common.dashboard}
          />
        </div>
      </nav>
    </div>
  );
}

function NavTab({
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
      className="flex flex-col items-center gap-0.5 px-3 py-1 text-text-muted transition-colors hover:text-brand"
    >
      <Icon className="h-5 w-5" />
      <span className="text-[10px] font-medium">{label}</span>
    </Link>
  );
}
