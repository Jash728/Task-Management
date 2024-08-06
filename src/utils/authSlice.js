import { createSlice } from '@reduxjs/toolkit';
import { addUser, findUser } from './mockData';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!localStorage.getItem('user'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signUp: (state, action) => {
      const { username, email, password } = action.payload;
      addUser({ username, email, password });
      state.user = { username, email };
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    login: (state, action) => {
      const { email, password } = action.payload;
      const user = findUser(email, password);
      if (user) {
        state.user = { username: user.username, email: user.email };
        state.isAuthenticated = true;
        localStorage.setItem('user', JSON.stringify(state.user));
      } else {
        state.isAuthenticated = false;
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
  },
});

export const { signUp, login, logout } = authSlice.actions;
export default authSlice.reducer;
