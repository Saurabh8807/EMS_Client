// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from '../axios.js';  // Import the configured axios instance

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, setUser } = authSlice.actions;

export const login = (email, password) => async (dispatch) => {
  dispatch(loginStart());
  try {
    console.log('Login attempt with email:', email, 'password:', password);
    const response = await axios.post('/login', { email, password });
    console.log('Login response:', response);
    console.log(response.data.data)
    dispatch(loginSuccess({ user: response.data.data }));
  } catch (error) {
    console.error('Login error:', error);
    dispatch(loginFailure(error.response?.data?.message || 'Login failed'));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await axios.post('/logout', {});
    dispatch(logout());
  } catch (error) {
    console.error('Logout error:', error);
  }
};

export const refreshTokens = () => async (dispatch) => {
  try {
    const response = await axios.post('/refreshTokens', {});
    dispatch(loginSuccess({ user: response.data.data}));
  } catch (error) {
    console.error('Refresh tokens error:', error);
  }
};

export default authSlice.reducer;
