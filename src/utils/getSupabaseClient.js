export async function getSupabaseClient() {
  const { VITE_SUPABASE_USER_URL, VITE_SUPABASE_API_KEY } = import.meta.env;
  const { createClient } = await import('@supabase/supabase-js');
  return createClient(VITE_SUPABASE_USER_URL, VITE_SUPABASE_API_KEY);
}