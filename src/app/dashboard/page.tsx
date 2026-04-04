import { requireAuth } from '@/components/auth-guard';
import { SignOutButton } from '@/components/sign-out-button';
import Link from 'next/link';
import { ArrowRight, FileSearch } from 'lucide-react';

export default async function DashboardPage() {
  const user = await requireAuth();

  return (
    <main className="min-h-dvh px-4 py-8">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text">Welcome back</h1>
            <p className="mt-1 text-text-muted">{user.email}</p>
          </div>
          <SignOutButton />
        </div>

        <div className="rounded-xl border border-border bg-surface-dim p-6 text-center">
          <FileSearch className="mx-auto h-10 w-10 text-text-subtle" />
          <h2 className="mt-4 font-semibold text-text">No screenings yet</h2>
          <p className="mt-1 text-sm text-text-muted">
            Start a screening to discover benefits you qualify for.
          </p>
          <Link
            href="/screening"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            Start Screening
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
