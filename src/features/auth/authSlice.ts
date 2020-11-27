import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import  axios from 'axios'
import { RootState } from "../../app/store"
import authResponse from "./authen/auth.json"
import httpStatus from "./httpStatus.json"
import postUserInfo from "./userInfo.json"

const apiUrl = "http://localhost:3000/v1";

type AUTHRESPONSE = typeof authResponse
type USERINFORESPONSE = {
    status: number
    data: string
}

type sendUserInfo = typeof postUserInfo

type auth = {
    email : string
    password : string
    type: number
}

export const fetchAsyncLogin = createAsyncThunk("auth/login", async (auth: auth) => {
    const res = await axios.post<AUTHRESPONSE>(`${apiUrl}/auth/login`, auth, {
        headers: {
            "Content-Type": "application/json",
        }
    })
    const data = res.data
    if(data.status !== httpStatus.StatusOK && data.status !== httpStatus.StatusCreated){
        console.error("action=fetchAsyncLogin error: auth response error")
        //TODO errorHanling
        // throw new Error('action=fetchAsyncLogin error: auth response error');
    }
    if (!data.data || !data.data.token){
        console.error("action=fetchAsyncLogin error: token is not found")
        //TODO errorHanling
        // throw new Error('action=fetchAsyncLogin error: token is not found');
    }
    return {
        token: data.data.token,
        userId: data.data.userId
    }
})


export const fetchAsyncSignup = createAsyncThunk("auth/signup", async(auth: auth)=>{
    const res = await axios.post<AUTHRESPONSE>(`${apiUrl}/auth/signup`, auth, {
        headers: {
            "Content-Type": "application/json",
        }
    })
    const data = res.data
    if(data.status !== httpStatus.StatusOK && data.status !== httpStatus.StatusCreated){
        console.error("action=fetchAsyncLogin error: auth response error")
        //TODO errorHanling
        // throw new Error('action=fetchAsyncLogin error: auth response error');
    }
    if (!data.data || !data.data.token){
        console.error("action=fetchAsyncLogin error: token is not found")
        //TODO errorHanling
        // throw new Error('action=fetchAsyncLogin error: token is not found');
    }
    return {
        token: data.data.token,
        userId: data.data.userId
    }
})

export const fetchAsyncSendUserInfo = createAsyncThunk("auth/sendUserInfo", async(userInfo: sendUserInfo)=>{
    const token = localStorage.getItem('bdt')
    if(!token){
        console.error("action=fetchAsyncLogin error: token is not found in localstrage")
        //TODO errorHanling
        throw new Error('action=fetchAsyncLogin error: token is not found in localstrage');
    }
    const res = await axios.post<USERINFORESPONSE>(`${apiUrl}/userInfo/${userInfo.userId}/create`, userInfo, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `bearer ${token}`
        }
    })
    const data = res.data
    if(data.status !== httpStatus.StatusOK ){
        console.error("action=fetchAsyncLogin error: auth response error")
        //TODO errorHanling
        throw new Error('action=fetchAsyncLogin error: auth response error');
    }
    return
})

const authSlice = createSlice({
    name: "auth",
    initialState: {
        authen: {
            email: "",
            password: "",
            type: 0,
        },
        userInfo: {
            userId: 0,
            usage: 0,
            name: "",
            kana: "",
            phone: "",
            companyName: "",
            department: "",
            position: "",
            companyPhone: "",
            motivation: 0,
            supportRequest: false,
            consent: false
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
        editUserId(state, action) {
            state.userInfo.userId = action.payload
        },
        editUsage(state, action) {
            state.userInfo.usage = action.payload
        },
        editName(state, action) {
            state.userInfo.name = action.payload
        },
        editKana(state, action) {
            state.userInfo.kana = action.payload
        },
        editPhone(state, action) {
            state.userInfo.phone = action.payload
        },
        editCompanyName(state, action) {
            state.userInfo.companyName = action.payload
        },
        editDepartment(state, action) {
            state.userInfo.department = action.payload
        },
        editPosition(state, action) {
            state.userInfo.position = action.payload
        },
        editCompanyPhone(state, action) {
            state.userInfo.companyPhone = action.payload
        },
        editMotivation(state, action) {
            state.userInfo.motivation = action.payload
        },
        editSupportRequest(state, action) {
            state.userInfo.supportRequest = action.payload
        },
        editConsent(state, action) {
            state.userInfo.consent = action.payload
        },
        toggleMode(state) {
            state.isLoginView = !state.isLoginView
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAsyncLogin.fulfilled, (state, action)=>{
            localStorage.setItem("bdt", action.payload.token)
            const userId = action.payload.userId
            return {
                ...state,
                userInfo: {
                    ...state["userInfo"],
                    userId: userId
                }
            }
        })
        builder.addCase(fetchAsyncSignup.fulfilled, (state, action)=>{
            localStorage.setItem("bdt", action.payload.token)
            const userId = action.payload.userId
            return {
                ...state,
                userInfo: {
                    ...state["userInfo"],
                    userId: userId
                }
            }
        })
        builder.addCase(fetchAsyncSendUserInfo.fulfilled, (state, action) =>{
            return state
        })
    }
})

export const { editEmail, editPassword, editType, editUserId, editUsage, editName, editKana, editPhone, editCompanyName,  editDepartment, editPosition, editCompanyPhone, editMotivation , editSupportRequest, editConsent, toggleMode } = authSlice.actions
export const selectAuth = (state: RootState) => state.auth.authen
export const selectUserInfo = (state: RootState) => state.auth.userInfo
export const selectIsLoginView = (state: RootState) => state.auth.isLoginView

export default authSlice.reducer