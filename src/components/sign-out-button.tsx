'use client';

import { LogOut } from 'lucide-react';

export function SignOutButton() {
  return (
    <form action="/auth/signout" method="post">
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-text-muted transition-colors hover:bg-surface-bright hover:text-text"
      >
        <LogOut className="h-4 w-4" />
        Sign out
      </button>
    </form>
  );
}
