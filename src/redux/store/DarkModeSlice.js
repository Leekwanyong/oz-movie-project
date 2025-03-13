import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: JSON.parse(localStorage.getItem('darkMode')) || false,
};

if (initialState.darkMode) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState: {
    darkMode: initialState,
  },
  reducers: {
    darkModeType: (state) => {
      state.darkMode = !state.darkMode;
      if (state.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('darkMode', JSON.stringify(state.darkMode));
    },
  },
});

export const { darkModeType } = darkModeSlice.actions;
export default darkModeSlice.reducer;
