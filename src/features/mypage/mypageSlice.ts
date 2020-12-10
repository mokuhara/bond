import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import bizpack from "./bizpack.json"
import httpStatus from "../auth/httpStatus.json"
import { RootState } from '../../app/store';
import Cookies from 'js-cookie'
import resGetBizpacksType from './resGetBizpacks.json'
import resGetBizpackType from './resGetBizpack.json'


const apiUrl = "http://localhost:3000/v1";

type sendBizpack = typeof bizpack
type resGetBizpacks = typeof resGetBizpacksType
type resGetBizpack = typeof resGetBizpackType

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
        console.error("action=fetchAsyncCreateBizpack error: auth response error")
        //TODO errorHanling
        throw new Error('action=fetchAsyncCreateBizpack error: auth response error');
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
        console.error("action=fetchAsyncGetBizpacks error: auth response error")
        //TODO errorHanling
        throw new Error('action=fetchAsyncGetBizpacks error: auth response error');
    }
    return data
})

export const fetchAsyncGetBizpack = createAsyncThunk("bizpack/getById", async (bizpackId: number) => {
    const token = Cookies.get('bdt')
    const userId = Number(Cookies.get('bd-uid'))
    const res = await axios.get<resGetBizpack>(`${apiUrl}/mypage/bizpack/get/${bizpackId}`, {
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
        console.error("action=fetchAsyncGetBizpack error: auth response error")
        //TODO errorHanling
        throw new Error('action=fetchAsyncGetBizpack error: auth response error');
    }
    return {
        id: data.data.ID,
        products: data.data.products.map(product => { return { name: product.name}}),
        industry: data.data.industry,
        scale: data.data.scale,
        title: data.data.title,
        userId: userId,
        category: {type: data.data.category.type},
        description: data.data.description,
        unitPrice: data.data.unitPrice,
        duration: data.data.duration,
        isPublic: data.data.isPublic,
        // TODO: party追加修正する
        // Party: data.data.Party.use rs,
    }
})



export const fetchAsyncUpdateBizpack = createAsyncThunk("bizpack/update", async (bizpackId:number) => {
    const token = Cookies.get('bdt')
    const res = await axios.put(`${apiUrl}/mypage/bizpack/${bizpackId}/update`, {
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
        console.error("action=fetchAsyncUpdateBizpack error: auth response error")
        //TODO errorHanling
        throw new Error('action=fetchAsyncUpdateBizpack error: auth response error');
    }
    return
})


export const fetchAsyncDeleteBizpack = createAsyncThunk("bizpack/delete", async (bizpackId: number) => {
    const token = Cookies.get('bdt')
    const res = await axios.delete(`${apiUrl}/mypage/bizpack/${bizpackId}/delete`, {
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
        console.error("action=fetchAsyncDeleteBizpack error: auth response error")
        //TODO errorHanling
        throw new Error('action=fetchAsyncDeleteBizpack error: auth response error');
    }
    return
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
        editId(state, action) {
            state.bizpack.id = action.payload
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
        builder.addCase(fetchAsyncGetBizpack.fulfilled, (state, action) => {
            const bizpack = action.payload
            if(bizpack) {
                return {
                    ...state,
                    bizpack: bizpack
                }
            }
        })
    }
})

export const { editProduct,  editId, editCategory, editTitle, editUserId, editIndustry, editScale, editDescription, editUnitPrice, editDuration, editIsPublic} = mypageSlice.actions
export const selectBizpack = (state: RootState) => state.mypage.bizpack
export const selectBizpacks = (state: RootState) => state.mypage.bizpacks


export default mypageSlice.reducer