import React, {useState} from 'react'
import { useLocation } from 'react-router-dom'
import {Grid, CssBaseline } from '@material-ui/core'
import {makeStyles, Theme } from "@material-ui/core/styles";


import transactionJson from './transaction.json'
import Review from './review/new'
import Status from './status'

type transactionState = {transaction: typeof transactionJson}

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

const TransactionIndex: React.FC = () => {
    const classes = useStyles()
    const location = useLocation<transactionState>();
    const [transaction, setTransaction] = useState(location.state.transaction)


    return (
        <>
            <Grid container component="main" spacing={2}>
                <CssBaseline />
                <Grid item xs={6} className={classes.label}>
                    タイトル
                </Grid>
                <Grid item xs={6} className={classes.data}>
                    {transaction.bizpack.title}
                </Grid>
                <Grid item xs={6} className={classes.label}>
                    カテゴリ
                </Grid>
                <Grid item xs={6} className={classes.data}>
                    {transaction.bizpack.category.type}
                </Grid>
                <Grid item xs={6} className={classes.label}>
                    詳細
                </Grid>
                <Grid item xs={6} className={classes.data}>
                    {transaction.bizpack.description}
                </Grid>
                <Status transaction={transaction} setTransaction={setTransaction}/>
                {transaction.status === 7 && (
                    <Review transaction={transaction} />
                )}
            </Grid>
        </>
    )
}

export default TransactionIndex