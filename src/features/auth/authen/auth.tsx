import React from "react";
import { Button, Avatar, CssBaseline, TextField,  Link, Paper, Box, Grid, Typography} from "@material-ui/core"
import { Search } from "@material-ui/icons"

import {makeStyles, Theme} from "@material-ui/core/styles";

import { useSelector, useDispatch } from "react-redux"
import { useAppDispatch } from "../../../../src/app/storeHelper";

import { useHistory } from 'react-router-dom';

import { unwrapResult } from '@reduxjs/toolkit';

import {
    editEmail,
    editPassword,
    // editType,
    toggleMode,
    fetchAsyncLogin,
    fetchAsyncSignup,
    selectAuth,
    selectIsLoginView,
    selectUserInfo
} from "../authSlice"

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          omochi
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const useStyles = makeStyles((theme: Theme) => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://honote.macromill.com/uploads/20180515-main.png)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

const Auth: React.FC = () => {

    const classes = useStyles()
    const dispatch = useDispatch();
    const asyncDispatch = useAppDispatch();
    const authen = useSelector(selectAuth)
    const isLoginView = useSelector(selectIsLoginView)
    const userInfo = useSelector(selectUserInfo)
    const history = useHistory()
    const btnDisabler = authen.email === "" || authen.password === ""

    const auth = async () => {
        if (isLoginView) {
          console.error("hoge")
          asyncDispatch(fetchAsyncLogin(authen))
            .then(unwrapResult)
            .then(payload =>{
              console.error(payload)
              history.push(`/mypage/${payload.userId}`)
            })
            .catch(error => {
              console.log({ error });
            });
        } else {
          asyncDispatch(fetchAsyncSignup(authen))
            .then(()=>{history.push(`/userInfo`)})
            .catch(error => {
              console.log({ error });
            });
        }
        return
    }
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <Search />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                     Omoch
                    </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            id="email"
                            label="email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(e)=> dispatch(editEmail(e.target.value))}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            onChange={(e)=> dispatch(editPassword(e.target.value))}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={btnDisabler}
                            onClick={auth}
                        >
                            {isLoginView ? "ログインする": "新規登録する"}
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link
                                  variant="body2"
                                  onClick={() => dispatch(toggleMode())}
                                >
                                {isLoginView? "アカウント作成はこちら": "ログインはこちら"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                             <Copyright />
                        </Box>
                </div>
            </Grid>
        </Grid>
    )
}

export default Auth