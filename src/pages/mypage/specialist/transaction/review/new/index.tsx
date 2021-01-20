import React, { useState } from 'react'
import {Grid, TextField, Typography, Button, Card, CardContent} from '@material-ui/core'
import {makeStyles, Theme } from "@material-ui/core/styles";
import Rating, { IconContainerProps } from '@material-ui/lab/Rating';
import {SentimentVeryDissatisfied, SentimentDissatisfied, SentimentSatisfied, SentimentSatisfiedAlt, SentimentVerySatisfied} from "@material-ui/icons"
import Cookies from 'js-cookie'

import { post, apiUrl } from '../../../../../../libs/fetch'
import { transactionState } from '../../index/store'
import reviewState from './store'


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

const customIcons: { [index: string]: { icon: React.ReactElement; label: string } } = {
    1: {
      icon: <SentimentVeryDissatisfied />,
      label: 'Very Dissatisfied',
    },
    2: {
      icon: <SentimentDissatisfied />,
      label: 'Dissatisfied',
    },
    3: {
      icon: <SentimentSatisfied />,
      label: 'Neutral',
    },
    4: {
      icon: <SentimentSatisfiedAlt />,
      label: 'Satisfied',
    },
    5: {
      icon: <SentimentVerySatisfied />,
      label: 'Very Satisfied',
    },
};

const IconContainer = (props: IconContainerProps) => {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
}

type transaction = typeof transactionState[0]
const CreateReview: React.FC<{transaction: transaction}> = ({transaction}) => {
    const classes = useStyles()


    type review = typeof reviewState
    const [review, setReview] = useState({rating:0, message:""})
    const asyncCreateReview = async (review: review) => {
        post(`${apiUrl}/mypage/review/create`, review, {}, true)
            .then(res => res.json())
            .then(json => {
                console.log(json)
            })
    }

    //TODO update未実装
    type respReview = {
        id: number,
        transactionId: number,
        userId: number,
        message: string,
        rating: number
    }
    const asyncUpdateReview = async (review: respReview) => {
        post(`${apiUrl}/mypage/transaction/review/${review.id}/update`, review, {}, true)
            .then(res => res.json())
            .then(json => {
                console.log(json)
            })
    }

    const handleReviewMessageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const message = event.target.value
        if (typeof message === 'string') {
            setReview({...review, message: message})
        }
    }

    const handleReviewRatingChange = (event :React.ChangeEvent<{}>
        , values: number | null): void => {
        if( typeof values === 'number') {
            setReview({...review, rating: values})
        }
    }

    const handleSendReview = () => {
        const userId = Cookies.get('bd-uid')
        if(!userId) return
        const payload = {
            transactionId: transaction.ID,
            userId: parseInt(userId, 10),
            message: review.message,
            rating: review.rating,
        }
        asyncCreateReview(payload)
    }

    return (
        <>
            <Typography variant="h6" component="h2" className={classes.title}>レビュー</Typography>
            <Grid item xs={12}>
                <Card  className={classes.container} variant="outlined">
                    <CardContent>
                        <Grid item xs={6} className={classes.label}>
                            評価
                        </Grid>
                        <Grid item xs={6} className={classes.data}>
                            <Rating
                                name="customized-icons"
                                defaultValue={2}
                                getLabelText={(value: number) => customIcons[value].label}
                                IconContainerComponent={IconContainer}
                                onChange={(event,value) =>handleReviewRatingChange(event, value)}
                            />
                        </Grid>
                        <Grid item xs={10} className={classes.label}>
                            内容
                        </Grid>
                        <Grid item xs={10} className={classes.data}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                                id="description"
                                label="description"
                                name="description"
                                autoComplete="description"
                                autoFocus
                                multiline
                                rows={4}
                                value={review.message}
                                onChange={handleReviewMessageChange}
                            />
                        </Grid>
                        <Button
                            // fullWidth
                            // type="submit"
                            variant="contained"
                            color="primary"
                            onClick={handleSendReview}
                        >
                            レビューする
                        </Button>
                    </CardContent>
                </Card>
            </Grid>

        </>
    )

}

export default CreateReview
