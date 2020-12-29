import React, {useState, useEffect} from 'react'
import {Grid, CssBaseline, Typography } from '@material-ui/core'
import {makeStyles, Theme } from "@material-ui/core/styles";


import { get } from '../../../../../../libs/fetch'
import { transactionState } from '../../index/store'
import reviewsState from './store'

type transaction = typeof transactionState[0]
type reviews = typeof reviewsState

const useStyles = makeStyles((theme: Theme) => ({
    label: {
        fontWeight:'bold'
    },
    data: {}
    ,
    review: {
        margin: theme.spacing(2),
    }
}))

const Review: React.FC<{transaction: transaction}> = ({transaction}) => {
    const classes = useStyles()
    const [reviews, setReview] = useState(reviewsState)

    const shapeReviews = (reviews: reviews) => {
        return reviews.map(review => {
            return {
                ID: review.ID,
                transactionId: review.transactionId,
                userId: review.userId,
                message: review.message,
                rating: review.rating
            }
        })
    }

    const asyncGetRevies = () => {
        const apiUrl = "http://localhost:8000/v1";
        get(`${apiUrl}/mypage/review/${transaction.ID}`, {}, true)
            .then(res => res.json())
            .then(json => {
                setReview(shapeReviews(json.data))
            })
            .catch(e => {
                console.error(e)
            })
    }

    useEffect(() => {
       asyncGetRevies()
       console.log(reviews)
    }, [])


    return (
        <>
            <Grid container component="main" spacing={2} justify="center">
                <CssBaseline />
                <Typography component="h2" variant="h6">レビュー一覧</Typography>
                {reviews.length > 0 && reviews.map(review => {
                    return (<Grid container component="main" spacing={1} key={review.ID} className={classes.review}>
                        <Grid item xs={6} className={classes.label}>
                            ユーザーID
                        </Grid>
                        <Grid item xs={6} className={classes.data}>
                            {review.userId}
                        </Grid>
                        <Grid item xs={6} className={classes.label}>
                            評価
                        </Grid>
                        <Grid item xs={6} className={classes.data}>
                            {review.rating}
                        </Grid>
                        <Grid item xs={6} className={classes.label}>
                            内容
                        </Grid>
                        <Grid item xs={6} className={classes.data}>
                            {review.message}
                        </Grid>
                    </Grid>)
                })}
            </Grid>
        </>
    )
}

export default Review