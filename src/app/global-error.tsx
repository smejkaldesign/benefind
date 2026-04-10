"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-dvh items-center justify-center bg-white px-4">
        <div className="max-w-sm space-y-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Something went wrong
          </h1>
          <p className="text-sm text-gray-500">
            An unexpected error occurred. Your data is safe.
          </p>
          <button
            onClick={reset}
            className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-surface hover:bg-brand-dark"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
