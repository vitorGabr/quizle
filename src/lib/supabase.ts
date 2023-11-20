import { Database } from '@/types/supabase';
import { createServerClient } from '@supabase/ssr';

export const supabase = createServerClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    cookies: {}
  }
);
