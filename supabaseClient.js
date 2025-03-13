import { createClient } from '@supabase/supabase-js';

const { VITE_SUPABASE_USER_URL, VITE_SUPABASE_API_KEY } = import.meta.env;

const supabaseUrl = VITE_SUPABASE_USER_URL;
const supabaseKey = VITE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
