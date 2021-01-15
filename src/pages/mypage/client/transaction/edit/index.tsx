import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom'
import {Grid, CssBaseline, TextField, FormControl, Select, MenuItem, InputLabel, Button, Typography, Card} from '@material-ui/core'
import Cookies from 'js-cookie'
import { apiUrl, put } from '../../../../../libs/fetch'
import { useHistory } from 'react-router-dom';

import { transactionState } from "../index/store"

type editTransaction = {transaction: typeof transactionState[0]}
const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        margin: '20px'
    },
}))


const EditTransaction: React.FC = () => {
    const classes = useStyles();
    const history = useHistory()
    const location = useLocation<editTransaction>();
    const [transaction, setTransaction] = useState(location.state.transaction)

    const handleChangeTitle = (title: string) => {
        setTransaction({...transaction, title: title})
    }
    const handleChangeDescription = (description: string) => {
        setTransaction({...transaction, description: description})
    }
    const handleChangeUnitPrice = (unitPrice: string) => {
        setTransaction({...transaction, unitPrice: parseInt(unitPrice, 10)})
    }
    const handleChangeDuration = (duration: string) => {
        setTransaction({...transaction, duration: parseInt(duration, 10)})
    }
    const onSubmit = async () => {
        const clientUserId = Cookies.get('bd-uid')
        if(typeof clientUserId != 'string') return

        const body = {
            // title: transaction.title,
            id: transaction.ID,
            description: transaction.description,
            unitPrice: transaction.unitPrice,
            duration: transaction.duration,
            specialistAcceptance: 0,
            clientAcceptance: 0,
        }
        console.log(body)
        const res = await put(`${apiUrl}/mypage/transaction/${transaction.ID}/update`, body)
                            .then(result => result.json())
        if(res && res.status === 200){
            history.push("/mypage/client/transactions")
        }
    }

    return (
        <Grid container component="main" alignItems="center" justify="center">
            <CssBaseline />
            <Card variant="outlined">
                <Grid container alignItems="center" justify="center">
                    <Grid item xs={10} sm={10} md={10} className={classes.container} >
                        {/* <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            id="title"
                            label="タイトル"
                            name="title"
                            autoComplete="title"
                            autoFocus
                            value={transaction.title}
                            onChange={(e)=> handleChangeTitle(e.target.value)}
                        /> */}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            id="description"
                            label="詳細"
                            name="description"
                            autoComplete="description"
                            autoFocus
                            multiline
                            rows={4}
                            value={transaction.description}
                            onChange={(e)=> handleChangeDescription(e.target.value)}
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
                          defaultValue={transaction.unitPrice}
                          onChange={(e)=> handleChangeUnitPrice(e.target.value)}
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
                          defaultValue={transaction.duration}
                          onChange={(e)=> handleChangeDuration(e.target.value)}
                      />
                      <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={onSubmit}
                        >
                            変更する
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    )
}


export default EditTransaction