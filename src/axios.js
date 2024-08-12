// src/axios.js
import axios from 'axios';
import store  from './redux/store.js';
import { refreshTokens } from './redux/authSlice.js';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  withCredentials: true,
});

instance.interceptors.response.use(
  response => response,
  async (error) => {
    
    const { dispatch } = store;
    console.log(dispatch)
    console.log(error.response)
    if (error && error.response.status === 401 && error.config &&
      !error.config._isRetry) {
        originalRequest._isRetry = false
      await dispatch(refreshTokens());
      const newToken = store.getState().auth.accessToken;
      error.config.headers['Authorization'] = `Bearer ${newToken}`;
      return instance.request(error.config);
    }
    return Promise.reject(error);
  }
);

export default instance;
