import { type EmailOtpType } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

function safePath(raw: string | null): string {
  const fallback = '/dashboard';
  if (!raw || !raw.startsWith('/') || raw.startsWith('//')) return fallback;
  try {
    const url = new URL(raw, 'http://localhost');
    if (url.hostname !== 'localhost') return fallback;
  } catch {
    return fallback;
  }
  return raw;
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = safePath(searchParams.get('next'));

  if (token_hash && type) {
    const supabase = await createServerSupabase();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/login?error=verification_failed`);
}
