import React, { useEffect, useState } from 'react'
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Grid, CssBaseline, TextField, Paper, Switch, FormControl, FormControlLabel, Button } from "@material-ui/core"
import Layout from '../../../../../layouts/mypage/specialist'
import { bizpackState, errorState } from './store'
import { responseFormat } from './actions'
import { apiUrl, get, put } from '../../../../../libs/fetch'

const BizPackEdit: React.FC = () => {
  const history = useHistory()
  const { id } = useParams();
  const [bizpack, setBizpack] = useState(bizpackState);
  const [errMessage, setErrMessage] = useState(errorState)

  const { register, errors } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange'
  })

  const btnDisabler = Boolean(errors.category) || Boolean(errors.title) || Boolean(errors.industry) || Boolean(errors.scale) || Boolean(errors.description) || Boolean(errors.unitPrice) || Boolean(errors.duration)

  // TODO: エラー処理
  const onSubmit = async () => {
    console.log('update');
    const res = await put(`${apiUrl}/mypage/bizpacks/${id}`, bizpack)
                        .then(res => res.json())
    if (res.status == 200) {
      history.push("/mypage/bizpacks")
    }
  }

  const setValue = (obj: object) => {
    setBizpack(Object.assign({}, bizpack, obj))
  }

  useEffect(() => {
    const getBizpack = async () => {
      const res = await get(`${apiUrl}/mypage/bizpacks/${id}`)
                          .then(res => res.json())

      setBizpack(responseFormat(res.data));
    }

    getBizpack();
  }, [])

  return (
    <Layout>
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
            onChange={(e) => setValue({ category: { type: e.target.value } })}
            inputRef={register({ required: true })}
            error={Boolean(errors.category)}
            helperText={errors.category && "入力必須です"}
          />
          <ReactTagInput
            placeholder="input SaaS tools"
            tags={bizpack.products.map(product => { return product.name })}
            onChange={(newTags) => setValue({ products: newTags.map(product => { return { name: product } }) })}
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
            onChange={e => setValue({industry: e.target.value})}
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
            onChange={e => setValue({scale: e.target.value})}
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
            onChange={e => setValue({title: e.target.value})}
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
            onChange={e => setValue({description: e.target.value})}
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
            onChange={e => setValue({unitPrice: e.target.value})}
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
            onChange={e => setValue({duration: e.target.value})}
            inputRef={register({ required: true })}
            error={Boolean(errors.duration)}
            helperText={errors.duration && "入力必須です"}
          />
          <FormControl component="label">
            <FormControlLabel
              control={
                <Switch
                  checked={bizpack.isPublic}
                  onChange={() => setBizpack({ ...bizpack, isPublic: !bizpack.isPublic })}
                  name="gilad"
                />
              }
              label={bizpack.isPublic ? "公開" : "下書き保存"}
            />
          </FormControl>
          <Button
            fullWidth
            // type="submit"
            variant="contained"
            color="primary"
            disabled={btnDisabler}
            onClick={onSubmit}
          >
            bizpackを更新する
          </Button>
          {/* {errMessage.isOpen && <SnackBar severity={errMessage.severity} message={errMessage.message} isOpen={errMessage.isOpen} stateFunc={changeOpenStatus} />} */}
        </Grid>
      </Grid>
    </Layout>
  )
}

export default BizPackEdit