import React, { useState } from 'react'
import Cookies from 'js-cookie'
import {Grid, CssBaseline, Paper, TextField, FormControl, Select, MenuItem, InputLabel, Button, Typography} from '@material-ui/core'
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom'
import {format} from 'date-fns'

import editIssueState from './store'
import { post } from '../../../../../libs/fetch'

type editIssueState = {issue: typeof editIssueState}

const useStyles = makeStyles((theme) => ({
    paper: {
      margin: theme.spacing(1, 2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        margin: theme.spacing(2, 0),
        minWidth: 120,
    },
    textField: {
        margin:  theme.spacing(1, 0),
    },
  }));

const EditIssue: React.FC = () => {
    const classes = useStyles();
    const location = useLocation<editIssueState>();
    const [issue, setIssue] = useState(location.state.issue)

    const handleChangeTitle = (title: string) => {
        setIssue({...issue, title: title})
    }

    const handleChangeBackground = (background: string) => {
        setIssue({...issue, background: background})
    }

    const handleChangeDescription = (description: string) => {
        setIssue({...issue, description: description})
    }

    const handleChangeCategoryId = (categoryId: any) => {
        if(typeof categoryId === 'number'){
            setIssue({...issue, categoryId: categoryId})
        }
    }
    const categoryTypes = [
        {id: 1, name: "選定"},
        {id: 2, name: "導入"},
        {id: 3, name: "運用"},
    ]

    const handleChangeDesiredSpecialist = (desiredSpecialist: string) => {
        setIssue({...issue, desiredSpecialist: desiredSpecialist})
    }

    const handleChangeRequiredItem = (requiredItem: string) => {
        setIssue({...issue, requiredItem: requiredItem})
    }

    const handleChangeClientInfo = (clientInfo: string) => {
        setIssue({...issue, clientInfo: clientInfo})
    }

    const handleChangeBudget = (budget: any) => {
        setIssue({...issue, budget: budget})
    }

    const handleChangeRecruitmentCapacity = (recruitmentCapacity: any) => {
        setIssue({...issue, recruitmentCapacity: recruitmentCapacity})
    }

    const handleChangeStartAt = (startAt: any) => {
        if(typeof startAt === 'string'){
            setIssue({...issue, startAt: startAt})
        }
    }

    const handleChangeEndAt = (endAt: string) => {
        if(typeof endAt === 'string'){
            setIssue({...issue, endAt: endAt})
        }
    }

    const handleChangeApplicationDeadline = (applicationDeadline: string) => {
        if(typeof applicationDeadline === 'string'){
            setIssue({...issue, applicationDeadline: applicationDeadline})
        }
    }

    const asyncUpdateIssue = async () => {
        const apiUrl = "http://localhost:3000/v1";
        post(`${apiUrl}/mypage/issue/${issue.id}/update`, issue, {}, true)
              .then(res => res.json())
              .then(json => console.log(json))
    }
    // const { register, errors } = useForm({
    //     mode: 'onBlur',
    //     reValidateMode: 'onChange'
    // })
    console.log(issue)

    return (
        <Grid container component="main" alignItems="center" justify="center">
            <CssBaseline />
            <Grid item xs={12} sm={10} md={10} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h6">公募作成</Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            id="title"
                            label="タイトル"
                            name="title"
                            autoComplete="title"
                            autoFocus
                            value={issue.title}
                            onChange={(e)=> handleChangeTitle(e.target.value)}
                            // inputRef={register({ required: true })}
                            // error={Boolean(errors.title)}
                            // helperText={errors.title && "入力必須です"}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            id="background"
                            label="依頼背景"
                            name="background"
                            autoComplete="background"
                            autoFocus
                            multiline
                            rows={4}
                            value={issue.background}
                            onChange={(e)=> handleChangeBackground(e.target.value)}
                            // inputRef={register({ required: true })}
                            // error={Boolean(errors.background)}
                            // helperText={errors.background && "入力必須です"}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            id="description"
                            label="依頼詳細"
                            name="description"
                            autoComplete="description"
                            autoFocus
                            multiline
                            rows={4}
                            value={issue.description}
                            onChange={(e)=> handleChangeDescription(e.target.value)}
                            // inputRef={register({ required: true })}
                            // error={Boolean(errors.description)}
                            // helperText={errors.description && "入力必須です"}
                        />
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="category">カテゴリー</InputLabel>
                            <Select
                                labelId="category"
                                value={issue.categoryId}
                                onChange={(e)=> handleChangeCategoryId(e.target.value)}
                                label="カテゴリー"
                            >
                                {categoryTypes.map(categoryType => {
                                    return (<MenuItem value={categoryType.id}>{categoryType.name}</MenuItem>)
                                })}
                            </Select>
                        </FormControl>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            id="desiredSpecialist"
                            label="想定するスペシャリスト"
                            name="desiredSpecialist"
                            autoComplete="desiredSpecialist"
                            autoFocus
                            multiline
                            rows={4}
                            value={issue.desiredSpecialist}
                            onChange={(e)=> handleChangeDesiredSpecialist(e.target.value)}
                            // inputRef={register({ required: true })}
                            // error={Boolean(errors.desiredSpecialist)}
                            // helperText={errors.desiredSpecialist && "入力必須です"}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            id="requiredItem"
                            label="提案時に記入してほしいこと"
                            name="requiredItem"
                            autoComplete="requiredItem"
                            autoFocus
                            multiline
                            rows={4}
                            value={issue.requiredItem}
                            onChange={(e)=> handleChangeRequiredItem(e.target.value)}
                            // inputRef={register({ required: true })}
                            // error={Boolean(errors.requiredItem)}
                            // helperText={errors.requiredItem && "入力必須です"}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            id="clientInfo"
                            label="依頼者情報"
                            name="clientInfo"
                            autoComplete="clientInfo"
                            autoFocus
                            multiline
                            rows={2}
                            value={issue.clientInfo}
                            onChange={(e)=> handleChangeClientInfo(e.target.value)}
                            // inputRef={register({ required: true })}
                            // error={Boolean(errors.clientInfo)}
                            // helperText={errors.clientInfo && "入力必須です"}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            type="number"
                            id="budget"
                            label="予算(円)"
                            name="budget"
                            autoComplete="budget"
                            autoFocus
                            value={issue.budget}
                            onChange={(e)=> handleChangeBudget(e.target.value)}
                            // inputRef={register({ required: true })}
                            // error={Boolean(errors.budget)}
                            // helperText={errors.budget && "入力必須です"}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            type="number"
                            id="recruitmentCapacity"
                            label="募集人数"
                            name="recruitmentCapacity"
                            autoComplete="recruitmentCapacity"
                            autoFocus
                            value={issue.recruitmentCapacity}
                            onChange={(e)=> handleChangeRecruitmentCapacity(e.target.value)}
                            // inputRef={register({ required: true })}
                            // error={Boolean(errors.recruitmentCapacity)}
                            // helperText={errors.recruitmentCapacity && "入力必須です"}
                        />
                        <TextField
                            id="startAt"
                            name="startAt"
                            type="date"
                            label="開始時期"
                            className={classes.textField}
                            defaultValue={format(new Date(issue.startAt), 'yyyy-MM-dd')}
                            InputLabelProps={{
                            shrink: true,
                            }}
                            onChange={(e)=> handleChangeStartAt(e.target.value)}
                            // inputRef={register({ required: true })}
                            // error={Boolean(errors.startAt)}
                            // helperText={errors.startAt && "入力必須です"}
                        />
                        <TextField
                            id="endAt"
                            name="endAt"
                            type="date"
                            label="終了時期"
                            className={classes.textField}
                            defaultValue={format(new Date(issue.endAt), 'yyyy-MM-dd')}
                            InputLabelProps={{
                            shrink: true,
                            }}
                            onChange={(e)=> handleChangeEndAt(e.target.value)}
                            // inputRef={register({ required: true })}
                            // error={Boolean(errors.endAt)}
                            // helperText={errors.endAt && "入力必須です"}
                        />
                        <TextField
                            id="applicationDeadline"
                            name="applicationDeadline"
                            type="date"
                            label="募集期限"
                            className={classes.textField}
                            defaultValue={format(new Date(issue.applicationDeadline), 'yyyy-MM-dd')}
                            InputLabelProps={{
                            shrink: true,
                            }}
                            onChange={(e)=> handleChangeApplicationDeadline(e.target.value)}
                            // inputRef={register({ required: true })}
                            // error={Boolean(errors.applicationDeadline)}
                            // helperText={errors.applicationDeadline && "入力必須です"}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            // disabled={btnDisabler}
                            onClick={()=>asyncUpdateIssue()}
                        >
                          公募を更新する
                        </Button>
                    </form>
                 </div>
                 </Grid>
        </Grid>
    )




}

export default EditIssue
