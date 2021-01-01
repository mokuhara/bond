import React, {useState} from 'react'
import { useLocation } from 'react-router-dom'
import {Grid, CssBaseline, Button } from '@material-ui/core'
import {makeStyles, Theme } from "@material-ui/core/styles";
import {format} from 'date-fns'
import { useHistory } from 'react-router-dom';


import { destroy } from '../../../../../libs/fetch'
import issueState from './store'

type issueState = {issue: typeof issueState}

const useStyles = makeStyles((theme: Theme) => ({
    label: {
        fontWeight:'bold'
    },
    data: {}
    ,
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    button: {
        margin: 10,
    }
}))

const Issue: React.FC = () => {
    const history = useHistory()
    const classes = useStyles()
    const location = useLocation<issueState>();
    const [issue, setIssue] = useState(location.state.issue)
    const categoryTypes = [
        {id: 1, name: "選定"},
        {id: 2, name: "導入"},
        {id: 3, name: "運用"},
    ]
    const category = (categoryTypes.filter(category => category.id === issue.categoryId))[0]

    const moveEditIssue = () => {
        history.push({
            pathname: '/mypage/issue/edit',
            state: {issue}
        })

    }

    const deleteIssue = async () => {
        const apiUrl = "http://localhost:8000/v1";
        destroy(`${apiUrl}/mypage/issue/${issue.ID}/delete`, issue, true)
              .then(res => res.json())
              .then(json => {
                if(json) { history.push('/mypage/issue/index') }
              })
    }


    return (
        <>
            <Grid container component="main" spacing={2}>
                <CssBaseline />
                <Grid item xs={6} className={classes.label}>
                    タイトル
                </Grid>
                <Grid item xs={6} className={classes.data}>
                    {issue.title}
                </Grid>
                <Grid item xs={6} className={classes.label}>
                    依頼背景
                </Grid>
                <Grid item xs={6} className={classes.data}>
                    {issue.background}
                </Grid>
                <Grid item xs={6} className={classes.label}>
                    依頼詳細
                </Grid>
                <Grid item xs={6} className={classes.data}>
                    {issue.description}
                </Grid>

                <Grid item xs={6} className={classes.label}>
                    カテゴリー
                </Grid>
                <Grid item xs={6} className={classes.data}>
                    {category.name}
                </Grid>
                <Grid item xs={6} className={classes.label}>
                    想定するスペシャリスト
                </Grid>
                <Grid item xs={6} className={classes.data}>
                    {issue.desiredSpecialist}
                </Grid>
                <Grid item xs={6} className={classes.label}>
                    提案時に記入してほしいこと
                </Grid>
                <Grid item xs={6} className={classes.data}>
                    {issue.requiredItem}
                </Grid>
                <Grid item xs={6} className={classes.label}>
                    依頼者情報
                </Grid>
                <Grid item xs={6} className={classes.data}>
                    {issue.clientInfo}
                </Grid>
                <Grid item xs={6} className={classes.label}>
                    予算(円)
                </Grid>
                <Grid item xs={6} className={classes.data}>
                    {issue.budget}
                </Grid>
                <Grid item xs={6} className={classes.label}>
                    募集人数
                </Grid>
                <Grid item xs={6} className={classes.data}>
                    {issue.recruitmentCapacity}
                </Grid>
                <Grid item xs={6} className={classes.label}>
                    開始時期
                </Grid>
                <Grid item xs={6} className={classes.data}>
                    {format(new Date(issue.startAt), 'yyyy/MM/dd')}
                </Grid>
                <Grid item xs={6} className={classes.label}>
                    終了時期
                </Grid>
                <Grid item xs={6} className={classes.data}>
                    {format(new Date(issue.endAt), 'yyyy/MM/dd')}
                </Grid>
                <Grid item xs={6} className={classes.label}>
                    募集期限
                </Grid>
                <Grid item xs={6} className={classes.data}>
                    {format(new Date(issue.applicationDeadline), 'yyyy/MM/dd')}
                </Grid>
                <Grid container spacing={2} justify="center" alignItems="center" className={classes.button}>
                    <Grid item xs={4}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={()=>moveEditIssue()}
                        >
                            編集する
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            variant="contained"
                            color="secondary"
                            // disabled={btnDisabler}
                            onClick={()=>deleteIssue()}
                        >
                            削除する
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default Issue
