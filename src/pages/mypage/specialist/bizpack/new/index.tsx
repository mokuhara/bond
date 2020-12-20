import React, { useState } from 'react'
import ReactTagInput from "@pathofdev/react-tag-input";
import bizpackState from './store'
import "@pathofdev/react-tag-input/build/index.css";
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Grid, CssBaseline, TextField, Paper, Switch, FormControl, FormControlLabel, Button} from "@material-ui/core"
import Layout from  '../../../../../layouts/mypage/specialist'
import { post } from '../../../../../libs/fetch';

const BizpackNew: React.FC = (_props) => {
  const [bizpack, setBizpack] = useState(bizpackState);

  const { register, errors } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange'
  })

  const btnDisabler = Boolean(errors.category) || Boolean(errors.title) || Boolean(errors.industry) || Boolean(errors.scale) || Boolean(errors.description) || Boolean(errors.unitPrice) || Boolean(errors.duration)

  const setValue = (obj: object) => {
    setBizpack(Object.assign(bizpack, obj))
  }

  // TODO: エラーハンドリング
  const onSubmit = () => {
    const apiUrl = "http://localhost:8000/v1";

    post(`${apiUrl}/mypage/bizpack/create`, bizpack, {}, true)
      .then(res => res.json())
      .then(json => console.log(json))
  }

  return (
    <Layout>
      <h1>Bizpack New</h1>

      <Grid container component="main" >
          <CssBaseline />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
              <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="category"
                  label="category"
                  name="category"
                  type="number"
                  autoComplete="category"
                  onChange={e => setValue({ category: { type: e.target.value } })}
                  defaultValue={bizpack.category.type}
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
                  defaultValue={bizpack.industry}
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
                  defaultValue={bizpack.scale}
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
                  defaultValue={bizpack.title}
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
                  defaultValue={bizpack.description}
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
                  defaultValue={bizpack.unitPrice}
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
                  defaultValue={bizpack.duration}
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
                  label={bizpack.isPublic ? "公開": "下書き保存"}
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
                  bizpackを作成する
              </Button>
          </Grid>
      </Grid>
    </Layout>
  )
}

export default BizpackNew