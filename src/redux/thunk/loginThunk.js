import { createAsyncThunk } from '@reduxjs/toolkit';
import { getSupabaseClient } from '../../utils/getSupabaseClient.js';

export const LoginThunk = createAsyncThunk(
  'loginThunk',
  async ({ value, provider, type }, { rejectWithValue }) => {
    let data, error;
    try {
      const supabase = await getSupabaseClient();
      if (provider && type === 'google') {
        ({ data, error } = await supabase.auth.signInWithOAuth({
          provider,
          options: { queryParams: { access_type: 'offline', prompt: 'consent' } },
        }));
      } else if (provider && type === 'github') {
        ({ data, error } = await supabase.auth.signInWithOAuth({
          provider,
        }));
      } else {
        ({ data, error } = await supabase.auth.signInWithPassword({
          email: value.email,
          password: value.password,
        }));
      }

      if (error) {
        return new Error(error);
      }
      return data.session ? data.session.user : null;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const loadUserSession = createAsyncThunk('auth/loadSession', async () => {
  const supabase = await getSupabaseClient();
  const { data } = await supabase.auth.getSession();

  return data.session ? data.session.user : null;
});
