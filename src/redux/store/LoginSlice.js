import { createSlice } from '@reduxjs/toolkit';
import { loadUserSession } from '../thunk/loginThunk.js';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    OnLogout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUserSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUserSession.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loadUserSession.rejected, (state) => {
        state.user = null;
        state.loading = false;
      });
  },
});

export const { OnLogout } = loginSlice.actions;
export default loginSlice.reducer;
