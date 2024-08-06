import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    user : null,
    accessToken : null,
    refreshToken:null,
    loading: false,
    error:null,
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        loginStart:(state)=>{
            state.loading = true
        },
        loginSuccess:(state,action)=>{
            state.user= action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.loading = false;
            state.error = null
        },
        loginFailure:(state,action)=>{
            state.user =  null;
            state.accessToken = null;
            state.refreshToken = null;
        },
        logout:(state)=>{
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
        },
        setUser:(state, action)=>{
            state.user = action.payload.user;
        }
    }
})

export const { loginStart, loginSuccess, loginFailure, logout, setUser } = authSlice.actions

export const login = (email, password) => async (dispatch) => {
    dispatch(loginStart())

    try {
        const response =  await axios.post('/api/login', { email,password} ,{withCredentials:true} )
        dispatch(loginSuccess({user : response.data.user, accessToken:response.data.accessToken, refreshToken:response.data.refreshToken}))
    } catch (error) {
        dispatch(loginFailure(error.response.data.message))
    }
}

export const logoutUser = async (dispatch) =>{
    try {
        await axios.post('/api/logout', {},{withCredentials:true})
        dispatch(logout())
    } catch (error) {
        console.error(error)
    }
}

export const refreshToken = async (dispatch) => {
    try {
        const response =  await axios.post('/api/refreshToken',{},{withCredentials:true})
        dispatch(loginSuccess({user:response.user, accessToken:response.data.accessToken, refreshToken:response.data.refreshToken}))
    } catch (error) {
        console.error(error)
    }
}

export default authSlice.reducer