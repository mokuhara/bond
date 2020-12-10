import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import bizpack from "./bizpack.json"
import httpStatus from "../auth/httpStatus.json"
import { RootState } from '../../app/store';
import Cookies from 'js-cookie'
import resGetBizpacksType from './resGetBizpacks.json'


const apiUrl = "http://localhost:3000/v1";

type sendBizpack = typeof bizpack
type resGetBizpacks = typeof resGetBizpacksType

const initBizpacks: resGetBizpacks = resGetBizpacksType

export const fetchAsyncCreateBizpack = createAsyncThunk("bizpack/create", async (bizpack: sendBizpack) => {
    const token = Cookies.get('bdt')
    const res = await axios.post<{data: string, status:number}>(`${apiUrl}/mypage/bizpack/create`, bizpack, {
        headers: {
            "Authorization": `bearer ${token}`,
            "Content-Type": "application/json",
        }
    }).catch((err) => {
        console.error(err)
        return null
    })
    const data = res && res.data
    if(!data) return
    if(data.status !== httpStatus.StatusOK && data.status !== httpStatus.StatusCreated){
        console.error("action=fetchAsyncLogin error: auth response error")
        //TODO errorHanling
        throw new Error('action=fetchAsyncLogin error: auth response error');
    }
    return
})

export const fetchAsyncGetBizpacks = createAsyncThunk("bizpack/get", async ()=> {
    const token = Cookies.get('bdt')
    const res = await axios.get<resGetBizpacks>(`${apiUrl}/mypage/bizpack`, {
        headers: {
            "Authorization": `bearer ${token}`
        }
    }).catch((err) => {
        console.error(err)
        return null
    })
    const data = res && res.data
    if(!data) return
    if(data.status !== httpStatus.StatusOK && data.status !== httpStatus.StatusCreated){
        console.error("action=fetchAsyncLogin error: auth response error")
        //TODO errorHanling
        throw new Error('action=fetchAsyncLogin error: auth response error');
    }
    return data
})

const mypageSlice = createSlice({
    name: "mypage",
    initialState: {
        bizpack: {
            id: 0,
            category: {type: 1},
            title: "",
            products: [{name: "sample"}],
            userId: Number(Cookies.get('bd-uid')),
            industry: "",
            scale: 0,
            description: "",
            unitPrice: 0,
            duration: 0,
            isPublic: false
        },
        bizpacks: initBizpacks
    },
    reducers:{
        editProduct(state, action: {payload: string[], type: string;}) {
            const products = action.payload.map(product =>  { return {name: product}})
            state.bizpack.products = products;
        },
        editCategory(state, action) {
            state.bizpack.category = action.payload;
        },
        editTitle(state, action) {
            state.bizpack.title = action.payload;
        },
        editUserId(state, action) {
            state.bizpack.userId = action.payload;
        },
        editIndustry(state, action) {
            state.bizpack.industry = action.payload;
        },
        editScale(state, action) {
            state.bizpack.scale = action.payload;
        },
        editDescription(state, action) {
            state.bizpack.description = action.payload;
        },
        editUnitPrice(state, action) {
            state.bizpack.unitPrice = action.payload;
        },
        editDuration(state, action) {
            state.bizpack.duration = action.payload;
        },
        editIsPublic(state, action) {
            state.bizpack.isPublic = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAsyncCreateBizpack.fulfilled, (state, action) => {
            return
        })
        builder.addCase(fetchAsyncGetBizpacks.fulfilled, (state, action) => {
            const bizpacks = action.payload
            if(bizpacks){
                return {
                    ...state,
                    bizpacks: bizpacks
                  };
            }
        })
    }
})

export const { editProduct,  editCategory, editTitle, editUserId, editIndustry, editScale, editDescription, editUnitPrice, editDuration, editIsPublic} = mypageSlice.actions
export const selectBizpack = (state: RootState) => state.mypage.bizpack
export const selectBizpacks = (state: RootState) => state.mypage.bizpacks


export default mypageSlice.reducer