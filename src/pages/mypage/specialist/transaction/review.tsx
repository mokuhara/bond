import React, {useState} from 'react'
import {Grid, TextField, Typography, Button} from '@material-ui/core'
import {makeStyles, Theme, withStyles} from "@material-ui/core/styles";
import Rating, { IconContainerProps } from '@material-ui/lab/Rating';
import {SentimentVeryDissatisfied, SentimentDissatisfied, SentimentSatisfied, SentimentSatisfiedAlt, SentimentVerySatisfied} from "@material-ui/icons"

import transactionJson from './transaction.json'
import respReviewJson from './resReview.json'
import fetcher from '../../../utils/fetcher'

type transaction = typeof transactionJson
type review = typeof transactionJson.reviews[0]
type respReview = typeof respReviewJson


const StyledRating = withStyles({
    iconFilled: {
      color: '#ff6d75',
    },
    iconHover: {
      color: '#ff3d47',
    },
  })(Rating);

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

  function IconContainer(props: IconContainerProps) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }

  const Review: React.FC<{transaction: transaction}> = ({transaction}) => {
    const [review, setReview] = useState({rating:0, message:""})
    const apiUrl = "http://localhost:8000/v1";
    const classes = useStyles()

    const asyncCreateReview = async (review: review) => {
        const res = await fetcher<review>(`${apiUrl}/mypage/transaction/review/create`, {
            mode: 'cors',
            method: 'POST',
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(review)
        })
        return res
    }

    const asyncUpdateReview = async (review: respReview) => {
        const res = await fetcher<review>(`${apiUrl}/mypage/transaction/review/${review.data.ID}/update`, {
            mode: 'cors',
            method: 'POST',
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(review)
        })
        return res
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
        const payload = {
            transactionId: transaction.id,
            userId: transaction.bizpack.userId,
            message: review.message,
            rating: review.rating,
        }

        asyncCreateReview(payload)
    }

    return (
        <>
            <Grid item xs={12} className={classes.label}>
            <Typography component="legend">　レビュー</Typography>
            </Grid>
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
            <Grid item xs={6} className={classes.label}>
                内容
            </Grid>
            <Grid item xs={6} className={classes.data}>
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
            送信する
            </Button>
        </>
    )

  }

  export default Review
