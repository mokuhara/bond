import React, {useState, useEffect, useCallback } from 'react'
import Layout from '../../../../../layouts/mypage/specialist';
import { useLocation } from 'react-router-dom'
import { Grid, Card , CssBaseline, Typography, Chip, Button} from '@material-ui/core';
import { makeStyles , Theme} from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import { bizpacksState } from './store'
import { apiUrl, post } from '../../../../../libs/fetch'
import { Category } from '@material-ui/icons'
import styles from './index.module.css';

// import styles from './index.module.css'

const useStyles = makeStyles((theme: Theme) => ({
    label: {
        fontWeight:'bold'
    },
    data: {}
    ,
    title: {
        fontSize: '14px',
        margin: '15px',
        fontWeight: 'bold'
    },
    container: {
        width: '100%',
        marginBottom: '20px'
    },
    content: {
        padding: '10px',
    },
    product: {
        marginRight: '5px'
    },
    button: {
        fontSize: '12px',
    }
}))

type bizpack = typeof bizpacksState
const ClientBizPackShow: React.FC = () => {
    const history = useHistory()
    const classes = useStyles()
    const location = useLocation<{bizpack: bizpack}>();
    const bizpack = location.state.bizpack
    console.log('bizpack', bizpack);
    const products = useCallback(() => {
        return bizpack.products.map((product, index) => {
            return (bizpack.products &&
                <Chip
                    className={classes.product}
                    key={index}
                    size="small"
                    label={product.name}
                />
                )
        })
    },[bizpack.products])

    const createTransaction = async() => {
        const body = {
            bizpackId: bizpack.id,
            bizpack: {...bizpack, category: { type: bizpack.category}},
            status: 1,
            specialistUserId: bizpack.userId,
        }
        const res = await post(`${apiUrl}/mypage/transaction/create`, body)
                            .then(result => result.json())
        if(res && res.status === 200){
            history.push("/mypage/client/transactions")
        }
        console.log(res)
    }

    return (
        <>
            <Grid container component="main" >
                <CssBaseline />
                <Grid container  justify="center" spacing={4} xs={12}>
                    <Grid container alignItems="center" justify="center">
                        <Grid item xs={12} sm={2}>
                            <Typography variant="h6" component="h2" className={classes.title}>bizpack詳細</Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Grid container justify="flex-end">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={()=>createTransaction()}
                                    className={classes.button}
                                >
                                    相談してみる
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={10}>
                            <Card className={classes.container} variant="outlined">
                                <Grid container xs={12} spacing={2} className={classes.content}>
                                    <Grid item xs={4} className={classes.label}>タイトル</Grid>
                                    <Grid item xs={8} className={classes.data}>{bizpack.description}</Grid>
                                    <Grid item xs={4} className={classes.label}>詳細</Grid>
                                    <Grid item xs={8} className={classes.data}>{bizpack.description}</Grid>
                                    <Grid item xs={4} className={classes.label}>プロダクト</Grid>
                                    <Grid item xs={8} className={classes.data}>{products()}</Grid>
                                    <Grid item xs={4} className={classes.label}>業界</Grid>
                                    <Grid item xs={8} className={classes.data}>{bizpack.industry}</Grid>
                                    <Grid item xs={4} className={classes.label}>規模</Grid>
                                    <Grid item xs={8} className={classes.data}>{bizpack.scale}</Grid>
                                    <Grid item xs={4} className={classes.label}>単価</Grid>
                                    <Grid item xs={8} className={classes.data}>{bizpack.unitPrice}</Grid>
                                    <Grid item xs={4} className={classes.label}>稼働時間</Grid>
                                    <Grid item xs={8} className={classes.data}>{bizpack.duration}</Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center" justify="center">
                        <Grid item xs={12} sm={10}>
                            <Typography variant="h6" component="h2" className={classes.title}>スペシャリスト情報</Typography>
                        </Grid>
                        <Grid item xs={12} sm={10}>
                            <Card className={classes.container} variant="outlined">
                                <Grid container xs={12} spacing={2} className={classes.content}>
                                    <div className={styles.content}>
                                        <p>specialist information</p>
                                    </div>
                                </Grid>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default ClientBizPackShow