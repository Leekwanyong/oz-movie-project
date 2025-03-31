import { createAsyncThunk } from '@reduxjs/toolkit';
import supabase from '../../../supabaseClient.js';



export const loadUserSession = createAsyncThunk('auth/loadSession', async () => {
  const { data } = await supabase.auth.getSession();

  return data.session ? data.session.user : null;
});
