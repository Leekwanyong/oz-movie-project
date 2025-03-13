import { createAsyncThunk } from '@reduxjs/toolkit';
import { data } from 'autoprefixer';
import supabase from '../../../supabaseClient.js';

export const LoginThunk = createAsyncThunk(
  'loginThunk',
  async ({ value, provider, type }, { rejectWithValue }) => {
    try {
      if (provider && type === 'google') {
        ({ data, error } = await supabase.auth.signInWithOAuth({
          provider,
          options: { queryParams: { access_type: 'offline', prompt: 'consent' } },
        }));
        console.log('1');
      } else if (provider && type === 'github') {
        ({ data, error } = await supabase.auth.signInWithOAuth({
          provider,
        }));
      } else {
        ({ data, error } = await supabase.auth.signInWithPassword({
          email: value.email,
          password: value.password,
        }));
        console.log(2);
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
  const { data } = await supabase.auth.getSession();

  return data.session ? data.session.user : null;
});
