import React, { useEffect }  from 'react'
import { useSelector } from "react-redux"

import { useAppDispatch } from "../../../../src/app/storeHelper";

import {
    selectBizpacks,
    fetchAsyncGetBizpacks
} from "../mypageSlice"

const BizPackIndex: React.FC = () => {
    const asyncDispatch = useAppDispatch();
    const bizpacks = useSelector(selectBizpacks)

    useEffect(()=>{
        asyncDispatch(fetchAsyncGetBizpacks())
        console.log(bizpacks)
    },[bizpacks, asyncDispatch])


    return (
        <div>
            hoge
            {JSON.stringify(bizpacks)}
        </div>
    )
}

export default BizPackIndex