// authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { addUser, findUser } from './mockData';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    signUp: (state, action) => {
      const { username, email, password } = action.payload;
      addUser({ username, email, password });
      state.user = { username, email };
      state.isAuthenticated = true;
    },
    login: (state, action) => {
      const { email, password } = action.payload;
      const user = findUser(email, password);
      if (user) {
        state.user = { username: user.username, email: user.email };
        state.isAuthenticated = true;
      } else {
        state.isAuthenticated = false;
      }
     
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { signUp, login, logout } = authSlice.actions;
export default authSlice.reducer;
