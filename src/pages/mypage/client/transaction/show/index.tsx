import React, {useState} from 'react'
import { useLocation } from 'react-router-dom'
import {Grid, CssBaseline, Card, CardContent, Typography, Button } from '@material-ui/core'
import {makeStyles, Theme } from "@material-ui/core/styles";
import { useHistory } from 'react-router-dom';
import { apiUrl, put } from '../../../../../libs/fetch'


import CreateReview from '../review/new'
import Review from '../review/index'
import Status from './status'
import { transactionState } from '../index/store'
import Cookies from 'js-cookie'
import VideoMeetings from '../videMeeting/index'
import Chat from '../../../chat'


type transaction = {transaction: typeof transactionState[0]}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        justifyContent: 'center'
    },
    title: {
        fontSize: '14px',
        margin: '15px',
        fontWeight: 'bold'
    },
    label: {
        fontWeight:'bold',
    },
    data: {}
    ,
    container: {
        width: '100%',
        marginBottom: '10px'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    buttonWrapper: {
        margin: '2px',
        padding: '2px'
    },
    button: {
        fontSize: '12px',
        margin: '10px'
    }
}))

const Transaction: React.FC = () => {
    const history = useHistory()
    const classes = useStyles()
    const location = useLocation<transaction>();
    const [transaction, setTransaction] = useState(location.state.transaction)

    const existOwnReview = () => {
        const userId = Cookies.get('bd-uid')
        if(userId){
            const reviews = transaction.reviews.filter(review => review.userId === parseInt(userId, 10))
            return reviews.length > 0 ? true : false
        }
        return false
    }

    const moveEditIssue = () => {
        history.push({
            pathname: '/mypage/client/transaction/edit',
            state: {transaction}
        })

    }

    const toggleAccept = () => {
        const clientUserId = Cookies.get('bd-uid')
        if(typeof clientUserId != 'string') return
        const newClientAcceptance = transaction.clientAcceptance === 1 ? 2 : 1
        const body = {
            id: transaction.ID,
            description: transaction.description,
            clientAcceptance: newClientAcceptance
        }
        setTransaction({...transaction, clientAcceptance: newClientAcceptance})
        put(`${apiUrl}/mypage/transaction/${transaction.ID}/update`, body)
    }


    return (
        <>
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={10} >
                    <Grid container justify="space-between">
                        <Grid item xs={6}>
                            <Typography variant="h6" component="h2" className={classes.title}>案件詳細</Typography>
                        </Grid>
                        <Grid item xs={6}>
                        <Grid container spacing={2} justify="center" alignItems="center" className={classes.buttonWrapper}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={()=>moveEditIssue()}
                                className={classes.button}
                                disabled={transaction.SpecialistAcceptance === 1 && transaction.clientAcceptance === 1}
                            >
                                編集する
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={()=>toggleAccept()}
                                className={classes.button}
                            >
                                {transaction.clientAcceptance === 1 ? "承認を解除" : "承認する"}
                            </Button>
                        </Grid>
                    </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Card  className={classes.container} variant="outlined">
                            <CardContent>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={4} className={classes.label}>
                                        タイトル
                                    </Grid>
                                    <Grid item xs={8} className={classes.data}>
                                        {transaction.title}
                                    </Grid>
                                    <Grid item xs={4} className={classes.label}>
                                        カテゴリ
                                    </Grid>
                                    <Grid item xs={8} className={classes.data}>
                                        {transaction.category.type}
                                    </Grid>
                                    <Grid item xs={4} className={classes.label}>
                                        詳細
                                    </Grid>
                                    <Grid item xs={8} className={classes.data}>
                                        {transaction.description}
                                    </Grid>
                                    <Status transaction={transaction} setTransaction={setTransaction}/>
                                </Grid>
                            </CardContent>
                        </Card>
                        {transaction.status === 6 && !existOwnReview() && transaction.reviews.length < 1 && (
                            <CreateReview transaction={transaction} />
                        )}
                    </Grid>
                </Grid>
                <Grid item xs={10}>
                    { transaction.reviews.length > 0 && (
                        <Grid item xs={12} className={classes.data}>
                            {transaction.reviews && (<Review transaction={transaction}/>)}
                        </Grid>
                    )}
                </Grid>
                <Grid item xs={10}>
                    {transaction.videoMeetings.length > 0 && (
                        <Grid item xs={12} >
                        <VideoMeetings transactionId={transaction.ID}/>
                        </Grid>
                    )}
                </Grid>
                <Grid item xs={10}>
                    <Grid item xs={12} >
                        <Chat transactionId={transaction.ID}/>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default Transaction
