import React, { useState, useEffect } from 'react'
import { TextField, Button, Grid, Card, Typography, CardContent } from "@material-ui/core"
import { useLocation } from 'react-router-dom'
import { makeStyles, Theme } from '@material-ui/core/styles'

import threadState from './store'
import { db } from '../../firebase'


const useStyles = makeStyles((theme: Theme) => ({
    container: {
        width: '100%',
        marginBottom: '10px'
    },
    title: {
        fontSize: '14px',
        margin: '15px',
        fontWeight: 'bold',
        textAlign: 'center'
    },
}))

type thread = { thread: typeof threadState }
const ThreacNew: React.FC = () => {
    const classes = useStyles()
    const location = useLocation<thread>();
    const thread = location.state.thread
    const [editThread, setEditThread] = useState(thread)
    console.log(editThread)

    const setValue = (obj: object) => {
        setEditThread(Object.assign({}, thread, obj))
      }

      const onSubmit = async () => {
        db.collection("threads")
            .doc(thread.id)
            .set({
                title: editThread.title,
                description: editThread.description,
                updatedAt: new Date(),
            }, {merge: true})
      }


    return (
        <>
            <Grid container justify="center">
                <Grid item xs={7}> <Typography variant="h6" component="h2" className={classes.title}>設定されたミーティング一覧</Typography></Grid>
                <Grid item xs={7}>
                    <Card  className={classes.container} variant="outlined">
                        <CardContent>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="title"
                                label="title"
                                value={editThread.title}
                                onChange={e => setValue({title: e.target.value})}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="description"
                                label="description"
                                value={editThread.description}
                                onChange={e => setValue({description: e.target.value})}
                            />
                            <Button
                                fullWidth
                                // type="submit"
                                variant="contained"
                                color="primary"
                                onClick={onSubmit}
                            >
                                スレッドを更新する
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export default ThreacNew