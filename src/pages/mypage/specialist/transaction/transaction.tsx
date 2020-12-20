import React, {useState} from 'react'
import { useLocation } from 'react-router-dom'
import {Grid, CssBaseline, FormControl, MenuItem, Select, TextField, Typography, Button} from '@material-ui/core'
import {makeStyles, Theme, withStyles} from "@material-ui/core/styles";
import Rating, { IconContainerProps } from '@material-ui/lab/Rating';
import {SentimentVeryDissatisfied, SentimentDissatisfied, SentimentSatisfied, SentimentSatisfiedAlt, SentimentVerySatisfied} from "@material-ui/icons"

import transactionJson from './transaction.json'
import respReviewJson from './resReview.json'
import fetcher from '../../../utils/fetcher'

type transactionState = {transaction: typeof transactionJson}
type transaction = typeof transactionJson
type review = typeof transactionJson.reviews[0]
type respReview = typeof respReviewJson

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

const StyledRating = withStyles({
    iconFilled: {
      color: '#ff6d75',
    },
    iconHover: {
      color: '#ff3d47',
    },
  })(Rating);

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

const TransactionIndex: React.FC = () => {
    const classes = useStyles()
    const location = useLocation<transactionState>();
    const [transaction, setTransaction] = useState(location.state.transaction)
    const [status, setStatus] = useState(transaction.status)
    const [review, setReview] = useState({rating:0, message:""})

    const handleStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const status = event.target.value
        if (typeof status === 'number'){
            setTransaction({...transaction, status: status})
            setStatus(status)
            // asyncChangeStatus(transaction)
        }
    };

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
                        onChange={handleStatusChange}
                        className={classes.selectEmpty}
                        >
                            <MenuItem selected={true} value={transaction.status}>aaaa</MenuItem>
                            <MenuItem value={2}>hoge</MenuItem>
                            <MenuItem value={3}>piyo</MenuItem>
                            <MenuItem value={4}>fuga</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                {transaction.status === 4 && (
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
                )}
            </Grid>
        </>
    )
}

export default TransactionIndex