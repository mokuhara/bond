import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import bizpack from "./bizpack.json"
import portfolio from "./portfolio.json"
import httpStatus from "../auth/httpStatus.json"
import { RootState } from '../../app/store';
import Cookies from 'js-cookie'
import resGetBizpacksType from './resGetBizpacks.json'
import resGetBizpackType from './resGetBizpack.json'
import resGetPortfoliosType from './resGetPortfolios.json'
import resGetPortfolioType from './resGetPortfolio.json'


const apiUrl = "http://localhost:3000/v1";

type sendBizpack = typeof bizpack
type sendPortfolio = typeof portfolio
type resGetBizpacks = typeof resGetBizpacksType
type resGetBizpack = typeof resGetBizpackType
type resGetPortfolios = typeof resGetPortfoliosType
type resGetPortfolio = typeof resGetPortfolioType

const initBizpacks: resGetBizpacks = resGetBizpacksType
const initPortfolios: resGetPortfolios = resGetPortfoliosType

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




export const fetchAsyncCreatePortfolio = createAsyncThunk("portfolio/create", async (portfolio: sendPortfolio) => {
    const token = Cookies.get('bdt')
    const res = await axios.post<{data: string, status:number}>(`${apiUrl}/mypage/portfolio/create`, portfolio, {
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
        console.error("action=fetchAsyncCreatePortfolio error: auth response error")
        //TODO errorHanling
        throw new Error('action=fetchAsyncCreatePortfolio error: auth response error');
    }
    return
})

export const fetchAsyncGetPortfolios = createAsyncThunk("portfolio/get", async ()=> {
    const token = Cookies.get('bdt')
    const res = await axios.get<resGetBizpacks>(`${apiUrl}/mypage/portfolio`, {
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
        console.error("action=fetchAsyncGetPortfolios error: auth response error")
        //TODO errorHanling
        throw new Error('action=fetchAsyncGetPortfolios error: auth response error');
    }
    return data
})

export const fetchAsyncGetPortfolio = createAsyncThunk("portfolio/getById", async (portfolioId: number) => {
    const token = Cookies.get('bdt')
    const userId = Number(Cookies.get('bd-uid'))
    const res = await axios.get<resGetBizpack>(`${apiUrl}/mypage/portfolio/get/${portfolioId}`, {
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
        console.error("action=fetchAsyncPortfolio error: auth response error")
        //TODO errorHanling
        throw new Error('action=fetchAsyncPortfolio error: auth response error');
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
    }
})



export const fetchAsyncUpdatePortfolio = createAsyncThunk("portfolio/update", async (portfolioId:number) => {
    const token = Cookies.get('bdt')
    const res = await axios.put(`${apiUrl}/mypage/portfolio/${portfolioId}/update`, {
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
        console.error("action=fetchAsyncUpdatePortfolio error: auth response error")
        //TODO errorHanling
        throw new Error('action=fetchAsyncUpdatePortfolio error: auth response error');
    }
    return
})


export const fetchAsyncDeletePortfolio = createAsyncThunk("portfolio/delete", async (portfolioId: number) => {
    const token = Cookies.get('bdt')
    const res = await axios.delete(`${apiUrl}/mypage/portfolio/${portfolioId}/delete`, {
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
        console.error("action=fetchAsyncDeletePortfolio error: auth response error")
        //TODO errorHanling
        throw new Error('action=fetchAsyncDeletePortfolio error: auth response error');
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
        bizpacks: initBizpacks,
        portfolio: {
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
        portfolios: initPortfolios,
    },
    reducers:{
        editBizpackProduct(state, action: {payload: string[], type: string;}) {
            const products = action.payload.map(product =>  { return {name: product}})
            state.bizpack.products = products;
        },
        editBizpackId(state, action) {
            state.bizpack.id = action.payload
        },
        editBizpackCategory(state, action) {
            state.bizpack.category = action.payload;
        },
        editBizpackTitle(state, action) {
            state.bizpack.title = action.payload;
        },
        editBizpackUserId(state, action) {
            state.bizpack.userId = action.payload;
        },
        editBizpackIndustry(state, action) {
            state.bizpack.industry = action.payload;
        },
        editBizpackScale(state, action) {
            state.bizpack.scale = action.payload;
        },
        editBizpackDescription(state, action) {
            state.bizpack.description = action.payload;
        },
        editBizpackUnitPrice(state, action) {
            state.bizpack.unitPrice = action.payload;
        },
        editBizpackDuration(state, action) {
            state.bizpack.duration = action.payload;
        },
        editBizpackIsPublic(state, action) {
            state.bizpack.isPublic = action.payload;
        },

        editPortfolioProduct(state, action: {payload: string[], type: string;}) {
            const products = action.payload.map(product =>  { return {name: product}})
            state.portfolio.products = products;
        },
        editPortfolioId(state, action) {
            state.portfolio.id = action.payload
        },
        editPortfolioCategory(state, action) {
            state.portfolio.category = action.payload;
        },
        editPortfolioTitle(state, action) {
            state.portfolio.title = action.payload;
        },
        editPortfolioUserId(state, action) {
            state.portfolio.userId = action.payload;
        },
        editPortfolioIndustry(state, action) {
            state.portfolio.industry = action.payload;
        },
        editPortfolioScale(state, action) {
            state.portfolio.scale = action.payload;
        },
        editPortfolioDescription(state, action) {
            state.portfolio.description = action.payload;
        },
        editPortfolioUnitPrice(state, action) {
            state.portfolio.unitPrice = action.payload;
        },
        editPortfolioDuration(state, action) {
            state.portfolio.duration = action.payload;
        },
        editPortfolioIsPublic(state, action) {
            state.portfolio.isPublic = action.payload;
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

        builder.addCase(fetchAsyncCreatePortfolio.fulfilled, (state, action) => {
            return
        })
        builder.addCase(fetchAsyncGetPortfolios.fulfilled, (state, action) => {
            const portfolios = action.payload
            if(portfolios){
                return {
                    ...state,
                    portfolios: portfolios
                  };
            }
        })
        builder.addCase(fetchAsyncGetPortfolio.fulfilled, (state, action) => {
            const portfolio = action.payload
            if(portfolio) {
                return {
                    ...state,
                    portfolio: portfolio
                }
            }
        })
    }
})

export const {
    editBizpackProduct,
    editBizpackId,
    editBizpackCategory,
    editBizpackTitle,
    editBizpackUserId,
    editBizpackIndustry,
    editBizpackScale,
    editBizpackDescription,
    editBizpackUnitPrice,
    editBizpackDuration,
    editBizpackIsPublic,

    editPortfolioProduct,
    editPortfolioId,
    editPortfolioCategory,
    editPortfolioTitle,
    editPortfolioUserId,
    editPortfolioIndustry,
    editPortfolioScale,
    editPortfolioDescription,
    editPortfolioUnitPrice,
    editPortfolioDuration,
    editPortfolioIsPublic,

} = mypageSlice.actions
export const selectBizpack = (state: RootState) => state.mypage.bizpack
export const selectBizpacks = (state: RootState) => state.mypage.bizpacks
export const selectPortfolio = (state: RootState) => state.mypage.portfolio
export const selectPortfolios = (state: RootState) => state.mypage.portfolios


export default mypageSlice.reducer