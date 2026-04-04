import Link from 'next/link';
import { MessageCircle, ArrowLeft } from 'lucide-react';

export default function ScreeningPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand/10">
          <MessageCircle className="h-7 w-7 text-brand" />
        </div>
        <h1 className="text-2xl font-bold text-text">Eligibility Screening</h1>
        <p className="text-text-muted">
          The conversational screening experience is coming soon. We&apos;ll ask you a few simple
          questions about your household and find every program you qualify for.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-brand hover:text-brand-dark"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to home
        </Link>
      </div>
    </main>
  );
}
