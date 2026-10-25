"use client";

import { LogOut } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export function SignOutButton() {
  const { t } = useI18n();
  return (
    <form action="/auth/signout" method="post">
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-text-muted transition-colors hover:bg-surface-bright hover:text-text"
      >
        <LogOut className="h-4 w-4 rtl:-scale-x-100" />
        {t.common.signOut}
      </button>
    </form>
  );
}
