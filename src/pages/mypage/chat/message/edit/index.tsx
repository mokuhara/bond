import React, { useState, useEffect } from 'react'
import { TextField, IconButton, Grid, InputAdornment } from "@material-ui/core"
import firebase from "firebase/app"
import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom';
import SendIcon from '@material-ui/icons/Send';

import messageState from './store'
import { db } from '../../firebase'


// 設置場所考える
const MessageNew: React.FC<{messageId: string, userId: number, threadId: number, messageText: string, handleCloseEdit: Function}> = ({messageId, userId, threadId, messageText, handleCloseEdit}) => {
    const history = useHistory()
    const [message, setMessage] = useState(messageState)

    useEffect(() => {
        // TODO userIdからiconURLとるロジック作成する
        const iconUrl = "https://www.palcloset.jp/shared/pc_pal/event/typy/2019_doraemon/images/dora.png"
        if(!userId){ history.push("/")}
        setMessage(Object.assign(message, {userId, threadId, iconUrl, id: messageId, message: messageText}))
    }, [message])

    const setValue = (obj: object) => {
        setMessage(Object.assign(message, obj))
      }

    const onSubmit = async () => {
        db.collection("messages")
        .doc(message.id)
        .set({
            message: message.message,
            updatedAt: new Date(),
        }, {merge: true})
        handleCloseEdit()
    }

    return (
        <>
            <Grid container alignItems="center" justify="space-between">
                <Grid item xs={12} >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="message"
                        label="message"
                        value={message.message ? message.message: messageText}
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={onSubmit}>
                                    <SendIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                        }}
                        onChange={e => setValue({message: e.target.value})}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default MessageNew