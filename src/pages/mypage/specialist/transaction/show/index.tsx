import React, {useState} from 'react'
import { useLocation } from 'react-router-dom'
import {Grid, CssBaseline, Card, CardContent, Typography } from '@material-ui/core'
import {makeStyles, Theme } from "@material-ui/core/styles";


import CreateReview from '../review/new'
import Review from '../review/index'
import Status from './status'
import { transactionState } from '../index/store'
import Cookies from 'js-cookie'
import VideoMeetings from '../videMeeting/index'

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
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={10}>
                    <Typography variant="h6" component="h2" className={classes.title}>案件詳細</Typography>
                    <Grid item xs={12}>
                        <Card  className={classes.container} variant="outlined">
                            <CardContent>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={4} className={classes.label}>
                                        タイトル
                                    </Grid>
                                    <Grid item xs={8} className={classes.data}>
                                        {transaction.Bizpack.title}
                                    </Grid>
                                    <Grid item xs={4} className={classes.label}>
                                        カテゴリ
                                    </Grid>
                                    <Grid item xs={8} className={classes.data}>
                                        {transaction.Bizpack.category.type}
                                    </Grid>
                                    <Grid item xs={4} className={classes.label}>
                                        詳細
                                    </Grid>
                                    <Grid item xs={8} className={classes.data}>
                                        {transaction.Bizpack.description}
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
            </Grid>
        </>
    )
}

export default Transaction