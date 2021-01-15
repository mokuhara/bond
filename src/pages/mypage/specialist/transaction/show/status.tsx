import React, {useState} from 'react'
import {Grid, FormControl, MenuItem, Select } from '@material-ui/core'
import {makeStyles, Theme } from "@material-ui/core/styles";

import { put, apiUrl } from '../../../../../libs/fetch'
import { transactionState } from '../index/store'
import { SignalCellularNoSimOutlined } from '@material-ui/icons';

type transaction = typeof transactionState[0]

const useStyles = makeStyles((theme: Theme) => ({
    label: {
        fontWeight:'bold'
    },
    data: {}
    ,
    formControl: {
        minWidth: 120,
        marginLeft: 0,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}))

const statusArr = [
    {id: 1, name: "面談前"},
    {id: 2, name: "承認前"},
    {id: 3, name: "見積書送付前"},
    {id: 4, name: "申込書送付前"},
    {id: 5, name: "契約中(申込完了)"},
    {id: 6, name: "契約終了"},
    {id: 7, name: "失注"},
]

const Status: React.FC<{transaction: transaction, setTransaction:Function}> = ({transaction, setTransaction}) => {
    const classes = useStyles()
    console.log('transaction')
    console.log(transaction)
    console.log(transaction.SpecialistAcceptance)
    console.log(transaction.clientAcceptance)
    console.log(transaction.SpecialistAcceptance === 1 && transaction.clientAcceptance === 1)

    const [status, setStatus] = useState(transaction.status)
    const handleStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const status = event.target.value
        if (typeof status === 'number'){
            setTransaction({...transaction, status: status})
            setStatus(status)
            asyncChangeStatus({...transaction, status: status})
        }
    };

    const asyncChangeStatus = async (transaction: transaction) => {
        put(`${apiUrl}/mypage/transaction/${transaction.ID}/update`, transaction, {}, true)
            .then(res => res.json())
            .then(json => {
                console.log(json)
            })
    }

    return (
        <>
            <Grid item xs={4} className={classes.label}>
                    ステータス
            </Grid>
            <Grid item xs={8} className={classes.data}>
                <FormControl variant="outlined" className={classes.formControl}>
                    <Select
                    value={transaction.status}
                    onChange={handleStatusChange}
                    className={classes.selectEmpty}
                    >
                        {statusArr.map(status => {
                            if(status.id === transaction.status) return (<MenuItem selected={true} value={status.id}>{status.name}</MenuItem>)
                            if(status.id >= 3){
                               return transaction.SpecialistAcceptance === 1 && transaction.clientAcceptance === 1 && (<MenuItem value={status.id}>{status.name}</MenuItem>)
                            }else {
                                return (<MenuItem value={status.id}>{status.name}</MenuItem>)
                            }
                        })}
                    </Select>
                </FormControl>
            </Grid>
        </>
    )
}

export default Status