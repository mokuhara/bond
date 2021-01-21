import React, { useCallback } from 'react'
import { Grid, Card, Typography, Chip, CssBaseline } from '@material-ui/core';
import { bizpacksState } from './store'
import { makeStyles , Theme} from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import BusinessIcon from '@material-ui/icons/Business';
import PeopleIcon from '@material-ui/icons/People';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import TimerIcon from '@material-ui/icons/Timer';


import Impliment from '../../../../../assets/img/Implement.jpg'
import Operation from '../../../../../assets/img/Operation.jpg'
import Planing from '../../../../../assets/img/Planing.jpg'

import styles from './bizpack.module.css'

const useStyles = makeStyles((theme: Theme) => ({
    product: {
        marginRight: '5px'
    },
    container: {
        margin: '10px',
        width: '100%'
    },
    context: {
        padding: '10px'
    }
}))


type bizpack = typeof bizpacksState[0]
const Bizpack: React.FC<{bizpack: bizpack}>= ({bizpack}) => {
    const classes = useStyles();
    const history = useHistory()

    const categoryImage = useCallback((categoryId: number) => {
        if(categoryId === 1) {
            return <img className={styles.image} src={Planing} />
        } else if (categoryId === 2) {
            return <img className={styles.image} src={Impliment} />
        } else {
            return <img className={styles.image} src={Operation} />
        }
    }, [bizpack.category])

    const products = useCallback(() => {
        return bizpack.products.map((product, index) => {
            console.log(!!bizpack.products)
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

    const clickHandler = () => {
        history.push({
            pathname: '/mypage/client/bizpack',
            state: {bizpack}
        })
    }



    return (
        <>
            <Card onClick={clickHandler} className={classes.container}>
                <Grid container spacing={2}>
                    <CssBaseline />
                    <Grid item xs={12} md={4}>
                        <div className={styles.imageWrapper}>
                            {(categoryImage(bizpack.category))}
                        </div>
                    </Grid>
                    <Grid item xs={12} md={8} className={classes.context}>
                        <div className={styles.header}>
                            <div className={styles.product}>{products()}</div>
                            <div className={styles.title}><h2>{bizpack.title}</h2></div>
                        </div>
                        <div className={styles.descriptionWrapper}>
                            <div>{bizpack.description}</div>
                        </div>
                        <div>
                            <div className={styles.content}>
                                <div className={styles.iconWrapper}>
                                    <BusinessIcon fontSize="small"/>
                                </div>{bizpack.industry}
                            </div>
                            <div className={styles.content}>
                                <div className={styles.iconWrapper}>
                                    <PeopleIcon fontSize="small"/>
                                </div>{bizpack.scale}
                            </div>
                            <div className={styles.content}>
                                <div className={styles.iconWrapper}>
                                    <AccountBalanceIcon fontSize="small"/>
                                </div>{bizpack.unitPrice}
                            </div>
                            <div className={styles.content}>
                                <div className={styles.iconWrapper}>
                                    <TimerIcon fontSize="small"/>
                                </div>{bizpack.duration}
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Card>
        </>
    )
}

export default Bizpack