"use client";

import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useI18n();
  return (
    <main className="flex min-h-dvh items-center justify-center px-4">
      <div className="max-w-sm space-y-4 text-center">
        <h1 className="text-2xl font-bold text-text">{t.app.error.title}</h1>
        <p className="text-sm text-text-muted">{t.app.error.body}</p>
        <div className="flex justify-center gap-3">
          <Button onClick={reset} variant="default" size="default">
            <RotateCcw className="h-4 w-4" />
            {t.app.error.tryAgain}
          </Button>
          <Link href="/">
            <Button variant="secondary" size="default">
              {t.app.error.goHome}
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
