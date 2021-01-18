import React, { useState, useEffect } from 'react'
import { TextField, Button, Grid } from "@material-ui/core"

import { threadState } from '../store/index'
import { db } from '../firebase'
import styles from './createThread.module.css'


const ThreacNew: React.FC<{transactionId: number}> = ({transactionId}) => {
    const [thread, setThread] = useState(threadState)

    useEffect(() => {
        setThread(Object.assign(thread, {transactionId}))
    }, [])

    const setValue = (obj: object) => {
        setThread(Object.assign(thread, obj))
      }

      const onSubmit = async () => {
        setThread(Object.assign(thread, {createdAt: new Date()}))
        db.collection("threads").add(thread)
      }


    return (
        <>
            <Grid container justify="center">
                <p className={styles.title}>新規スレッド作成</p>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="title"
                    label="title"
                    onChange={e => setValue({title: e.target.value})}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="description"
                    label="description"
                    onChange={e => setValue({description: e.target.value})}
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={onSubmit}
                >
                    スレッドを作成する
                </Button>
            </Grid>
        </>
    )
}

export default ThreacNew