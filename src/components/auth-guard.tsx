import { redirect } from 'next/navigation';
import { createServerSupabase } from '@/lib/supabase/server';

export async function requireAuth() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  return user;
}
