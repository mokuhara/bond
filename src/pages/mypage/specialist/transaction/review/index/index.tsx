import React, {useState, useEffect} from 'react'
import {Grid, CssBaseline, Paper, Avatar, CardContent, Card, Typography } from '@material-ui/core'
import {makeStyles, Theme } from "@material-ui/core/styles";
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';


import { get, apiUrl } from '../../../../../../libs/fetch'
import { transactionState } from '../../index/store'
import reviewsState from './store'

type transaction = typeof transactionState[0]
type reviews = typeof reviewsState

export const customIcons = [
    {
        rating: 1,
        icon: <SentimentVeryDissatisfiedIcon />,
        label: '大変不満',
    },
    {
        rating: 2,
        icon: <SentimentDissatisfiedIcon />,
        label: '不満',
    },
    {
        rating: 3,
        icon: <SentimentSatisfiedIcon />,
        label: '普通',
    },
    {
        rating: 4,
        icon: <SentimentSatisfiedAltIcon />,
        label: '満足',
    },
    {
        rating: 5,
        icon: <SentimentVerySatisfiedIcon />,
        label: '大変満足',
    }
]

const useStyles = makeStyles((theme: Theme) => ({
    rating: {
        fontSize: '12px',
    },
    data: {
    },
    label: {
        paddingLeft: '5px'
    },
    message: {
        padding: '24px',
        background: 'rgba(0,16,14,0.03)',
        borderRadius: '4px'
    },
    user: {
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    name: {
        paddingLeft: '5px'
    },
    review: {
        margin: theme.spacing(1),
    },
    container: {
        width: '100%',
        marginBottom: '10px'
    },
    title: {
        fontSize: '14px',
        margin: '15px',
        fontWeight: 'bold'
    },
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
    }, [])

    const getCustomIcon =(rating: number) => {
        const icon = customIcons.find(customIcon => customIcon.rating === rating)
        return icon
    }


    return (
        <>
            <Typography variant="h6" component="h2" className={classes.title}>レビュー一覧</Typography>
            <Grid item xs={12}>
                <Card  className={classes.container} variant="outlined">
                    <CardContent>
                    <Grid container component="main" spacing={1} justify="center">
                        <CssBaseline />
                        {reviews.length > 0 && reviews.map(review => {
                            return (<Grid container component="main" spacing={2} key={review.ID} className={classes.review}>
                                {/* ICON とかにする */}
                                <Grid item xs={4}>
                                    <div className={classes.user}>
                                        <Avatar className={classes.icon}>H</Avatar>
                                        <span className={classes.name}>hoge</span>
                                    </div>
                                </Grid>
                                <Grid item xs={8} className={classes.rating}>
                                    <div className={classes.user}>
                                        { (getCustomIcon(review.rating))?.icon}
                                        <span className={classes.label}>{ (getCustomIcon(review.rating))?.label}</span>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className={classes.message}>
                                    {review.message}
                                    </div>
                                </Grid>
                            </Grid>)
                        })}
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </>
    )
}

export default Review