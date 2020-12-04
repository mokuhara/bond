import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const apiUrl = "http://localhost:3000/v1";

const mypageSlice = createSlice({
    name: "mypage",
    initialState: {

    },
    reducers:{

    }
})

export default mypageSlice.reducer