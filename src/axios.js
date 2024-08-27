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
    const originalReqeust = error.config;
    const { dispatch } = store;
    if (error && error.response.status === 500 || error.response.status === 405 && originalReqeust &&
      !originalReqeust._isRetry) {
        originalReqeust._isRetry = true
      await dispatch(refreshTokens());
      // const newToken = store.getState().auth.accessToken;
      // console.log(newToken)
      // console.log("store =>",store)
      // console.log("stor.getState =>",store.getState())
      // console.log("store.getState.auth =>",store.getState().auth)
      // console.log("store.getState.auth.accessToken =>",store.getState.auth.accessToken)
      // originalReqeust.headers['Authorization'] = `Bearer ${newToken}`;
      // return instance.request(originalReqeust);
      // try {
      //   const res = await instance.post("/auth/refreshTokens");
      //   console.log(res)
      //   return instance(originalReqeust);
      // } catch (error) {
      //     console.log("Token Refresh failed",error);
      // }
    }
    return Promise.reject(error);
  }
);

export default instance;
