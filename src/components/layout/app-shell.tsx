import Link from "next/link";
import Image from "next/image";
import { Home, MessageCircle, LayoutDashboard } from "lucide-react";
import { HoverHint } from "@/components/hover-hint";
import { SignOutButton } from "@/components/sign-out-button";
import { LanguageSelector } from "@/components/language-selector";
import { WorkspacePicker } from "@/components/workspace-picker";
import { ThemeToggle } from "@/components/theme-toggle";

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

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-dvh flex-col">
      {/* Top nav — mobile-friendly */}
      <header className="sticky top-banner z-30 border-b border-border bg-surface/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
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
          <div className="flex items-center gap-2">
            <HoverHint label="Toggle theme">
              <ThemeToggle />
            </HoverHint>
            <HoverHint label="Change language">
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
          <NavTab href="/" icon={Home} label="Home" />
          <NavTab href="/screening" icon={MessageCircle} label="Screen" />
          <NavTab href="/dashboard" icon={LayoutDashboard} label="Dashboard" />
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
