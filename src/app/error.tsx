"use client";

import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-dvh items-center justify-center px-4">
      <div className="max-w-sm space-y-4 text-center">
        <h1 className="text-2xl font-bold text-text">Something went wrong</h1>
        <p className="text-sm text-text-muted">
          An unexpected error occurred. Your data is safe.
        </p>
        <div className="flex justify-center gap-3">
          <Button onClick={reset} variant="default" size="default">
            <RotateCcw className="h-4 w-4" />
            Try again
          </Button>
          <Link href="/">
            <Button variant="secondary" size="default">
              Go home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
