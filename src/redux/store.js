import { configureStore } from '@reduxjs/toolkit';
import darkModeReducer from './store/DarkModeSlice.js';

const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
  },
});

export default store;
