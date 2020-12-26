import React, {useState} from 'react'
import {Grid, FormControl, MenuItem, Select } from '@material-ui/core'
import {makeStyles, Theme } from "@material-ui/core/styles";


import transactionJson from './transaction.json'
import fetcher from '../../../utils/fetcher'

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

const statusArr = [
    {id: 1, name: "面談前"},
    {id: 2, name: "承認前"},
    {id: 3, name: "失注"},
    {id: 4, name: "見積書送付前"},
    {id: 5, name: "申込書送付前"},
    {id: 6, name: "契約中(申込完了)"},
    {id: 7, name: "契約終了"},
]

const Status: React.FC<{transaction: transaction, setTransaction:Function}> = ({transaction, setTransaction}) => {
    const classes = useStyles()
    const apiUrl = "http://localhost:8000/v1"


    const [status, setStatus] = useState(transaction.status)
    const handleStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const status = event.target.value
        if (typeof status === 'number'){
            setTransaction({...transaction, status: status})
            setStatus(status)
            // asyncChangeStatus(transaction)
        }
    };

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
            <Grid item xs={6} className={classes.label}>
                    ステータス
            </Grid>
            <Grid item xs={6} className={classes.data}>
                <FormControl variant="outlined" className={classes.formControl}>
                    <Select
                    value={transaction.status}
                    onChange={handleStatusChange}
                    className={classes.selectEmpty}
                    >
                        {statusArr.map(status => {
                            if(status.id === transaction.status) return (<MenuItem selected={true} value={status.id}>{status.name}</MenuItem>)
                            return (<MenuItem value={status.id}>{status.name}</MenuItem>)
                        })}
                    </Select>
                </FormControl>
            </Grid>
        </>
    )
}

export default Status