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
    const response = await axios.post('/user/login', { email, password });
    console.log(response);
    
    dispatch(loginSuccess({ user: response.data.data }));
  } catch (error) {
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
    const response = await axios.post('/user/refreshTokens', {});
    dispatch(loginSuccess({ user: response.data.user }));
  } catch (error) {
    console.error('Refresh tokens error:', error);
  }
};

export default authSlice.reducer;
