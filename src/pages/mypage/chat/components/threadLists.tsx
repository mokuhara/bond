import React, { useState, useEffect } from 'react'
import { db } from "../firebase"
import { Grid, CssBaseline, Button, Table, TableHead, TableRow, TableCell, TableContainer, TableBody, Paper, CardContent, Card, Typography} from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom';


import { threadsState } from '../store/index'

const useStyles = makeStyles((theme: Theme) => ({
    tabaleHeader: {
        fontSize: '13px',
        color: 'rgba(0,16,14,0.55)',
    },
    tableBody: {
        fontSize: '13px',
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
    moveThread: {
        fontSize: '13px',
        '&:hover': {
	        background: 'rgba(0,16,14,0.06)'
         },
    }
}))

const ThreadLists: React.FC<{transactionId: number}> = ({transactionId}) => {
    type thread = typeof threadsState[0]
    const [threads, setThreads] = useState(threadsState)
    const classes = useStyles()
    const history = useHistory()

    useEffect(() => {
        const unSub = db.collection("threads").where('transactionId', '==', transactionId).onSnapshot((snapshot) => {
            setThreads(
                snapshot.docs.map((doc) =>({
                    id: doc.id,
                    transactionId: doc.data().transactionId,
                    title: doc.data().title,
                    description: doc.data().description,
                    createdAt: doc.data().createdAt,
                    updatedAt: doc.data().updatedAt,
                })))
        })
        console.log(threads)
        return () => {
            unSub()
        }
    }, [])

    const editThread = (thread: thread) => {
        history.push({
            pathname: '/mypage/chat/thread/edit',
            state: {thread}
        })
    }

    const moveThread = (threadId: string, transactionId: number) => {
        history.push({
            pathname: '/mypage/chat/thread',
            state: {threadId, transactionId}
        })
    }

    return (
        <>
            <Typography variant="h6" component="h2" className={classes.title}>スレッド一覧</Typography>
            <Grid item xs={12}>
                <Card  className={classes.container} variant="outlined">
                    <CardContent>
                        <Grid container component="main" spacing={2} justify="center">
                        <CssBaseline />
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={classes.tabaleHeader} style={{ minWidth: 100 }} align="left">タイトル</TableCell>
                                        <TableCell className={classes.tabaleHeader} style={{ minWidth: 200 }} align="left">詳細</TableCell>
                                        <TableCell className={classes.tabaleHeader} style={{ minWidth: 40 }} align="left">操作</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {threads && threads.map(thread => (
                                        <TableRow key={thread.id}>
                                            <TableCell align="left" className={classes.tableBody} style={{ minWidth: 100 }}>{thread.title}</TableCell>
                                            <TableCell align="left" className={classes.tableBody} style={{ minWidth: 200 }}>{thread.description}</TableCell>
                                            <TableCell align="left" className={classes.tableBody} style={{ minWidth: 40 }}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={6}><Grid container justify="flex-end"><Button color="primary" variant="contained" onClick={() => editThread(thread)}>編集</Button></Grid></Grid>
                                                    <Grid item xs={6}><Grid container justify="flex-start"><Button  variant="contained" onClick={() => moveThread(thread.id, transactionId)}>詳細</Button></Grid></Grid>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </>
    )
}

export default ThreadLists