import Link from 'next/link';
import { Home, MessageCircle, LayoutDashboard } from 'lucide-react';
import { SignOutButton } from '@/components/sign-out-button';
import { LanguageSelector } from '@/components/language-selector';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-dvh flex-col">
      {/* Top nav — mobile-friendly */}
      <header className="sticky top-0 z-30 border-b border-border bg-surface/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
          <Link href="/" className="text-lg font-bold text-brand">
            Benefind
          </Link>
          <div className="flex items-center gap-2">
            <LanguageSelector compact />
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
