import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

function safePath(raw: string | null): string {
  const fallback = '/dashboard';
  if (!raw || !raw.startsWith('/') || raw.startsWith('//')) return fallback;
  // Strip protocol-relative and any non-path characters
  try {
    const url = new URL(raw, 'http://localhost');
    if (url.hostname !== 'localhost') return fallback;
  } catch {
    return fallback;
  }
  return raw;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const origin = process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin;
  const code = searchParams.get('code');
  const next = safePath(searchParams.get('next'));

  if (code) {
    const supabase = await createServerSupabase();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/login?error=auth_failed`);
}
