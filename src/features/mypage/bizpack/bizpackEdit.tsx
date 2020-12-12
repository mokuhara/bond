import React, { useEffect, useState } from 'react'
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Grid, CssBaseline, TextField, Paper, Switch, FormControl, FormControlLabel, Button } from "@material-ui/core"


import { useAppDispatch } from "../../../../src/app/storeHelper";
import { SnackBar } from "../../utils/snackbar"

import {
    editBizpackCategory,
    editBizpackTitle,
    editBizpackProduct,
    editBizpackIndustry,
    editBizpackScale,
    editBizpackDescription,
    editBizpackUnitPrice,
    editBizpackDuration,
    editBizpackIsPublic,
    selectBizpack,
    fetchAsyncGetBizpack,
    fetchAsyncUpdateBizpack
} from "../mypageSlice"

const BizPackEdit: React.FC = () => {
    const dispatch = useDispatch();
    const asyncDispatch = useAppDispatch();
    const bizpack = useSelector(selectBizpack)
    const history = useHistory()
    const [errMessage, setErrMessage] = useState({severity: "error", message: "", isOpen: false})
    const changeOpenStatus = (openStatus: boolean) => { setErrMessage({...errMessage, isOpen: openStatus})}
    const { register, errors } = useForm({
      mode: 'onBlur',
      reValidateMode: 'onChange'
    })
    const btnDisabler = Boolean(errors.category) || Boolean(errors.title) || Boolean(errors.industry) || Boolean(errors.scale) || Boolean(errors.description) || Boolean(errors.unitPrice) || Boolean(errors.duration) 
    const handleIsPublicChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
        dispatch(editBizpackIsPublic(event.target.checked))
    }
    const updateBizpack = async (bizpackId: number) => {
        asyncDispatch(fetchAsyncUpdateBizpack(bizpackId))
            .catch(error => {
                console.error(error)
                setErrMessage({...errMessage, message: "更新に失敗しました", isOpen: true})
            });
        history.push("/mypage/bizpack")
    }

    useEffect(() => {
        asyncDispatch(fetchAsyncGetBizpack(bizpack.id))
    },[asyncDispatch, bizpack.id])

    return (
        <Grid container component="main" >
            <CssBaseline />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    type="number"
                    id="category"
                    label="category"
                    name="category"
                    autoComplete="category"
                    autoFocus
                    value={bizpack.category.type}
                    onChange={(e)=> dispatch(editBizpackCategory(e.target.value))}
                    inputRef={register({ required: true })}
                    error={Boolean(errors.category)}
                    helperText={errors.category && "入力必須です"}
                />
                <ReactTagInput
                    placeholder="input SaaS tools"
                    tags={bizpack.products.map(product => { return product.name})}
                    onChange={(newTags) => dispatch(editBizpackProduct(newTags))}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    id="industry"
                    label="industry"
                    name="industry"
                    autoComplete="industry"
                    autoFocus
                    value={bizpack.industry}
                    onChange={(e)=> dispatch(editBizpackIndustry(e.target.value))}
                    inputRef={register({ required: true })}
                    error={Boolean(errors.industry)}
                    helperText={errors.industry && "入力必須です"}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    type="number"
                    id="scale"
                    label="scale"
                    name="scale"
                    autoComplete="scale"
                    autoFocus
                    value={bizpack.scale}
                    onChange={(e)=> dispatch(editBizpackScale(Number(e.target.value)))}
                    inputRef={register({ required: true })}
                    error={Boolean(errors.scale)}
                    helperText={errors.scale && "入力必須です"}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    id="title"
                    label="title"
                    name="title"
                    autoComplete="title"
                    autoFocus
                    value={bizpack.title}
                    onChange={(e)=> dispatch(editBizpackTitle(e.target.value))}
                    inputRef={register({ required: true })}
                    error={Boolean(errors.title)}
                    helperText={errors.title && "入力必須です"}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    id="description"
                    label="description"
                    name="description"
                    autoComplete="description"
                    autoFocus
                    value={bizpack.description}
                    onChange={(e)=> dispatch(editBizpackDescription(e.target.value))}
                    inputRef={register({ required: true })}
                    error={Boolean(errors.description)}
                    helperText={errors.description && "入力必須です"}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    type="number"
                    id="unitPrice"
                    label="unitPrice"
                    name="unitPrice"
                    autoComplete="unitPrice"
                    autoFocus
                    value={bizpack.unitPrice}
                    onChange={(e)=> dispatch(editBizpackUnitPrice(Number(e.target.value)))}
                    inputRef={register({ required: true })}
                    error={Boolean(errors.unitPrice)}
                    helperText={errors.unitPrice && "入力必須です"}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    type="number"
                    id="duration"
                    label="duration"
                    name="duration"
                    autoComplete="duration"
                    autoFocus
                    value={bizpack.duration}
                    onChange={(e)=> dispatch(editBizpackDuration(Number(e.target.value)))}
                    inputRef={register({ required: true })}
                    error={Boolean(errors.duration)}
                    helperText={errors.duration && "入力必須です"}
                />
                <FormControl component="label">
                <FormControlLabel
                    control={<Switch checked={bizpack.isPublic} onChange={handleIsPublicChange} name="gilad" />}
                    label={bizpack.isPublic ? "公開": "下書き保存"}
                />
                </FormControl>
                <Button
                    fullWidth
                    // type="submit"
                    variant="contained"
                    color="primary"
                    disabled={btnDisabler}
                    onClick={()=>updateBizpack(bizpack.id)}
                >
                    bizpackを更新する
                </Button>
                {errMessage.isOpen && <SnackBar severity={errMessage.severity} message={errMessage.message} isOpen={errMessage.isOpen} stateFunc={changeOpenStatus}/>}
            </Grid>
        </Grid>
    )
}

export default BizPackEdit