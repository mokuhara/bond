import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import  axios from 'axios'
import { RootState } from "../../app/store"
import authResponse from "./authen/auth.json"
import httpStatus from "./httpStatus.json"

const apiUrl = "http://localhost:3000/v1";

type AUTHRESPONSE = typeof authResponse

type auth = {
    email : string
    password : string
    type: number
}

export const fetchAsyncLogin = createAsyncThunk("auth/login", async(auth: auth)=>{
    const res = await axios.post<AUTHRESPONSE>(`${apiUrl}/auth/login`, auth, {
        headers: {
            "Content-Type": "application/json",
        }
    })
    const data = res.data
    if(data.status !== httpStatus.StatusOK || data.status !== httpStatus.StatusCreated){
        console.error("action=fetchAsyncLogin error: auth response error")
        //TODO errorHanling
    }
    if (!data.data || !data.data.token){
        console.error("action=fetchAsyncLogin error: token is not found")
        //TODO errorHanling
    }
    return {token: data.data.token}
})

export const fetchAsyncSignup = createAsyncThunk("auth/signup", async(auth: auth)=>{
    const res = await axios.post<AUTHRESPONSE>(`${apiUrl}/auth/signup`, auth, {
        headers: {
            "Content-Type": "application/json",
        }
    })
    const data = res.data
    if(data.status !== httpStatus.StatusOK || data.status !== httpStatus.StatusCreated){
        console.error("action=fetchAsyncLogin error: auth response error")
        //TODO errorHanling
    }
    if (!data.data || !data.data.token){
        console.error("action=fetchAsyncLogin error: token is not found")
        //TODO errorHanling
    }
    return {token: data.data.token}
})

const authSlice = createSlice({
    name: "auth",
    initialState: {
        authen: {
            email: "",
            password: "",
            type: 0,
        },
        isLoginView: true,
    },
    reducers: {
        editEmail(state, action) {
            state.authen.email = action.payload;
        },
        editPassword(state, action) {
            state.authen.password = action.payload;
        },
        editType(state, action) {
            state.authen.type = action.payload
        },
        toggleMode(state) {
            state.isLoginView = !state.isLoginView
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAsyncLogin.fulfilled, (state, action)=>{
            localStorage.setItem("bdt", action.payload.token)
            console.log(`token: ${action.payload.token}`)
            //TODO トップページへ遷移
            window.location.href = "/"
        })
        builder.addCase(fetchAsyncSignup.fulfilled, (state, action)=>{
            localStorage.setItem("bdt", action.payload.token)
            console.log(`token: ${action.payload.token}`)
            //TODO トップページへ遷移
            window.location.href = "/"
        })
    }
})
export const { editEmail, editPassword, editType, toggleMode } = authSlice.actions
export const selectAuth = (state: RootState) => state.auth.authen
export const selectIsLoginView = (state: RootState) => state.auth.isLoginView

export default authSlice.reducer