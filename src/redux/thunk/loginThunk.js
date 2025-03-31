import { createAsyncThunk } from '@reduxjs/toolkit';
import { getSupabaseClient } from '../../utils/getSupabaseClient.js';



export const loadUserSession = createAsyncThunk('auth/loadSession', async () => {
  const supabase = getSupabaseClient();
  const { data } = await supabase.auth.getSession();

  return data.session ? data.session.user : null;
});
