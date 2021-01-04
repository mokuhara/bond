import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import Cookies from 'js-cookie'
import { RootState } from "../../store/store"
import { post } from "../../libs/fetch"
import authResponse from "./authen/auth.json"
import httpStatus from "./httpStatus.json"
import postUserInfo from "./userInfo.json"

const apiUrl = "http://localhost:8000/v1";

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
    const res = await post(`${apiUrl}/auth/login`, auth)
        .then(res => {
            return res.json();
        })

    if(res.status !== httpStatus.StatusOK && res.status !== httpStatus.StatusCreated){
        console.error("action=fetchAsyncLogin error: auth response error")
        //TODO errorHanling
        throw new Error('action=fetchAsyncLogin error: auth response error');
    }

    if (!res.data || !res.data.token){
        console.error("action=fetchAsyncLogin error: token is not found")
        //TODO errorHanling
        throw new Error('action=fetchAsyncLogin error: token is not found');
    }

    return {
        token: res.data.token,
        userId: res.data.userId,
        type: res.data.type
    }
})


export const fetchAsyncSignup = createAsyncThunk("auth/signup", async (auth: auth) => {
    const res = await post(`${apiUrl}/auth/signup`, auth)
        .then(res => {
            return res.json();
        })
        .catch(err => {
            console.error(err)
            return (
                {
                    data: {
                        token: "",
                        userId: -1,
                        type: -1
                    },
                    status: 500
                }
            )
        })

    if(res.status !== httpStatus.StatusOK && res.status !== httpStatus.StatusCreated){
        debugger;
        //TODO errorHanling
        throw new Error('action=fetchAsyncSignup error: auth response error');
    }

    if (!res.data || !res.data.token){
        //TODO errorHanling
        throw new Error('action=fetchAsyncSignup error: token is not found');
    }

    return {
        token: res.data.token,
        userId: res.data.userId,
        type: res.data.type
    }
})

export const fetchAsyncSendUserInfo = createAsyncThunk("auth/sendUserInfo", async(userInfo: sendUserInfo)=>{
    const token = Cookies.get('bdt')

    if(!token){
        //TODO errorHanling
        throw new Error('action=fetchAsyncSendUserInfo error: token is not found in cookie');
    }

    const res = await post(`${apiUrl}/userInfo/create`, userInfo, { "Authorization": `bearer ${token}` })
        .then(res => res.json())
        .catch(err => {
            console.error(err)
            return { status: 500 }
        })

    if(res.status !== httpStatus.StatusOK ){
        //TODO errorHanling
        throw new Error('action=fetchAsyncLogin error: auth response error');
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState: {
        authen: {
            email: "",
            password: "",
            type: 1,
        },
        userInfo: {
            userId: 0,
            name: "",
            kana: "",
            phone: "",
            companyName: "",
            department: "",
            position: "",
            companyPhone: "",
            motivation: 1,
            supportRequest: true,
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
            const { userId, token, type } = action.payload
            Cookies.set('bdt', token, { expires: 1/24 });
            Cookies.set('bd-uid', String(userId), { expires: 1/24 });
            Cookies.set('bd-type', String(type), { expires: 1/24 });
            return {
                ...state,
                userInfo: {
                    ...state["userInfo"],
                    userId: userId
                }
            }
        })
        builder.addCase(fetchAsyncSignup.fulfilled, (state, action)=>{
            const { userId, token, type } = action.payload
            Cookies.set('bdt', token, { expires: 1/24 });
            Cookies.set('bd-uid', String(userId), { expires: 1/24 });
            Cookies.set('bd-type', String(type), { expires: 1/24 });
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

export const { editEmail, editPassword, editType, editUserId, editName, editKana, editPhone, editCompanyName,  editDepartment, editPosition, editCompanyPhone, editMotivation , editSupportRequest, editConsent, toggleMode } = authSlice.actions
export const selectAuth = (state: RootState) => state.auth.authen
export const selectUserInfo = (state: RootState) => state.auth.userInfo
export const selectIsLoginView = (state: RootState) => state.auth.isLoginView

export default authSlice.reducer