import React, { useEffect }  from 'react'
import { useSelector } from "react-redux"
import { Grid, CssBaseline, Paper } from '@material-ui/core';

import { useAppDispatch } from "../../../../src/app/storeHelper";

import {
    selectBizpacks,
    fetchAsyncGetBizpacks
} from "../mypageSlice"
import BizpackCard from "./bizpackCard"
import resGetBizpacksType from '../resGetBizpacks.json'

type bizpack = typeof resGetBizpacksType.data[0]

const BizPackIndex: React.FC = () => {
    const asyncDispatch = useAppDispatch();
    const bizpacks = useSelector(selectBizpacks)
    const reshapeBizpack = (bizpack: bizpack) => {
        return {
            producs: bizpack.products.map(p => {return {name: p.name}}),
            industry: bizpack.industry,
            scale: bizpack.scale,
            description: bizpack.description,
            unitPrice: bizpack.unitPrice,
            duration: bizpack.duration,
            isPublic: bizpack.isPublic
        }
    }

    useEffect(()=>{
        asyncDispatch(fetchAsyncGetBizpacks())
        console.log(bizpacks)
    },[bizpacks, asyncDispatch])


    return (
        <div>
            <Grid container component="main" >
            <CssBaseline />
            <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
                {bizpacks.data.map(bizpack => {
                    const rbp = reshapeBizpack(bizpack)
                    return ( <BizpackCard props={rbp} /> )
                })}
            </Grid>
             {JSON.stringify(bizpacks)}
            </Grid>
        </div>
    )
}

export default BizPackIndex