import React, {useState} from 'react'
import { useLocation } from 'react-router-dom'
import {Grid, CssBaseline } from '@material-ui/core'
import {makeStyles, Theme } from "@material-ui/core/styles";


import CreateReview from '../review/new'
import Review from '../review/index'
import Status from './status'
import { transactionState } from '../index/store'
import Cookies from 'js-cookie'
import VideoMeetings from '../videMeeting/index'

type transaction = {transaction: typeof transactionState[0]}

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
}))

const Transaction: React.FC = () => {
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


    return (
        <>
            <Grid container component="main" spacing={2}>
                <CssBaseline />
                <Grid item xs={6} className={classes.label}>
                    タイトル
                </Grid>
                <Grid item xs={6} className={classes.data}>
                    {transaction.Bizpack.title}
                </Grid>
                <Grid item xs={6} className={classes.label}>
                    カテゴリ
                </Grid>
                <Grid item xs={6} className={classes.data}>
                    {transaction.Bizpack.category.type}
                </Grid>
                <Grid item xs={6} className={classes.label}>
                    詳細
                </Grid>
                <Grid item xs={6} className={classes.data}>
                    {transaction.Bizpack.description}
                </Grid>
                <Status transaction={transaction} setTransaction={setTransaction}/>
                {transaction.status === 6 && !existOwnReview() && transaction.reviews.length < 1 && (
                    <CreateReview transaction={transaction} />
                )}
                { transaction.reviews.length > 0 && (
                    <Grid item xs={12} className={classes.data}>
                        {transaction.reviews && (<Review transaction={transaction}/>)}
                    </Grid>
                )}
                {transaction.videoMeetings.length > 0 && (
                    <Grid item xs={12} >
                      <VideoMeetings transactionId={transaction.ID}/>
                    </Grid>
                )}
            </Grid>
        </>
    )
}

export default Transaction