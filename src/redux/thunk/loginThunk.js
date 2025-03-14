import { createAsyncThunk } from '@reduxjs/toolkit';
import supabase from '../../../supabaseClient.js';

export const LoginThunk = createAsyncThunk(
  'loginThunk',
  async ({ value, provider, type }, { rejectWithValue }) => {
    let responseData, error;
    try {
      if (provider && type === 'google') {
        ({ data: responseData, error } = await supabase.auth.signInWithOAuth({
          provider,
          options: { queryParams: { access_type: 'offline', prompt: 'consent' } },
        }));
      } else if (provider && type === 'github') {
        ({ data: responseData, error } = await supabase.auth.signInWithOAuth({
          provider,
        }));
      } else {
        ({ data: responseData, error } = await supabase.auth.signInWithPassword({
          email: value.email,
          password: value.password,
        }));
      }

      if (!responseData.session) {
        return rejectWithValue('로그인 실패');
      }
      if (error) {
        return rejectWithValue(error);
      }
      return responseData.session.user;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const loadUserSession = createAsyncThunk('auth/loadSession', async () => {
  const { data } = await supabase.auth.getSession();

  return data.session ? data.session.user : null;
});
