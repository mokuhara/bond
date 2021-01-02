import React, { useState, useEffect } from 'react'
import { TextField, Button, FormControl } from "@material-ui/core"
import firebase from "firebase/app"
import { useLocation } from 'react-router-dom'

import threadState from './store'
import { db } from '../../firebase'

type thread = { thread: typeof threadState }
const ThreacNew: React.FC = () => {
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
                updatedAtL: new Date(),
            }, {merge: true})
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
                    スレッドを億進する
                </Button>
            </FormControl>
        </>
    )
}

export default ThreacNew