import { createAsyncThunk } from '@reduxjs/toolkit';
import supabase from '../../../supabaseClient.js';

const LogoutThunk = createAsyncThunk('logout', async ({ rejectWithValue }) => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return new Error(error);
    }
    console.log('Logged out');
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

export default LogoutThunk;
