// src/axios.js
import axios from 'axios';
import store  from './redux/store.js';
import { refreshTokens } from './redux/authSlice.js';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api/v1/user',
  withCredentials: true,
});

// instance.interceptors.response.use(
//   response => response,
//   async (error) => {
//     const { dispatch } = store;
//     if (error.response.status === 401) {
//       await dispatch(refreshTokens());
//       const newToken = store.getState().auth.accessToken;
//       error.config.headers['Authorization'] = `Bearer ${newToken}`;
//       return instance.request(error.config);
//     }
//     return Promise.reject(error);
//   }
// );

export default instance;
