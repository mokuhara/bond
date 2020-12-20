import React, {useState} from 'react'
import { useLocation } from 'react-router-dom'
import {Grid, CssBaseline, FormControl, MenuItem, Select} from '@material-ui/core'
import {makeStyles, Theme} from "@material-ui/core/styles";

import transactionJson from './transaction.json'
import fetcher from '../../../utils/fetcher'

type transactionState = {transaction: typeof transactionJson}
type transaction = typeof transactionJson

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
    const transaction = location.state.transaction
    console.log(transaction)
    const [status, setStatus] = useState(transaction.status)

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const status = event.target.value
        if (typeof status === 'number'){
            transaction.status = status
            setStatus(status)
            // asyncChangeStatus(transaction)
        }
    };

    const apiUrl = "http://localhost:8000/v1";

    const asyncChangeStatus = async (transaction: transaction) => {
        const res = await fetcher<transaction>(`${apiUrl}/mypage/transaction/${transaction.id}/update`, {
            mode: 'no-cors',
            method: 'PUT',
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(transaction)
        })
        return res
    }

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
                <Grid item xs={6} className={classes.label}>
                    ステータス
                </Grid>
                <Grid item xs={6} className={classes.data}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <Select
                        value={transaction.status}
                        onChange={handleChange}
                        className={classes.selectEmpty}
                        >
                            <MenuItem selected={true} value={transaction.status}>aaaa</MenuItem>
                            <MenuItem value={2}>hoge</MenuItem>
                            <MenuItem value={3}>piyo</MenuItem>
                            <MenuItem value={4}>fuga</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </>
    )
}

export default TransactionIndex