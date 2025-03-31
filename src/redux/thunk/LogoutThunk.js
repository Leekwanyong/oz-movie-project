import { createAsyncThunk } from '@reduxjs/toolkit';
import { getSupabaseClient } from '../../utils/getSupabaseClient.js';


const LogoutThunk = createAsyncThunk('logout', async (_, { rejectWithValue }) => {
  try {
    const supabase = await getSupabaseClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      return rejectWithValue(error.message);
    }
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

export default LogoutThunk;
