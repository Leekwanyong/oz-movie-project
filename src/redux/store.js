import { configureStore } from '@reduxjs/toolkit';
import darkModeReducer from './store/DarkModeSlice.js';
import loginReducer from './store/LoginSlice.js';

const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    OnLogin: loginReducer,
  },
});

export default store;
