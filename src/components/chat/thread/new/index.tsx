import React, { useState, useEffect } from 'react'
import { TextField, Button, FormControl } from "@material-ui/core"
import firebase from "firebase/app"

import threadState from './store'
import { db } from '../../firebase'


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
            <FormControl>
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
                    // type="submit"
                    variant="contained"
                    color="primary"
                    onClick={onSubmit}
                >
                    スレッドを作成する
                </Button>
            </FormControl>
        </>
    )
}

export default ThreacNew