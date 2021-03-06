import React, { useState, useEffect } from 'react'
import { TextField, IconButton, Grid, InputAdornment } from "@material-ui/core"
import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom';
import SendIcon from '@material-ui/icons/Send';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import { post, apiUrl } from '../../../../libs/fetch'
import {format} from 'date-fns'

import { messageState } from '../store'
import { db } from '../firebase'


const MessageNew: React.FC<{threadId: number, transactionId: number}> = ({threadId, transactionId}) => {
    const history = useHistory()
    const [message, setMessage] = useState(messageState)

    useEffect(() => {
        const userId = Cookies.get('bd-uid') ? parseInt(Cookies.get('bd-uid') as string, 10) : undefined
        // TODO userIdからiconURLとるロジック作成する
        const iconUrl = "https://www.palcloset.jp/shared/pc_pal/event/typy/2019_doraemon/images/dora.png"
        if(!userId){ history.push("/")}
        setMessage(Object.assign(message, {userId, threadId, iconUrl}))
    }, [])

    const setValue = (obj: object) => {
        setMessage(Object.assign(message, obj))
      }

    const onSubmit = async () => {
    setMessage(Object.assign(message, {createdAt: new Date()}))
    db.collection("messages").add(message)
    }

    const createVideoMeeting = () => {
        const vidoMeeting =  {
            topic: 'automate_create_meeting',
            type: "2",
            start_time: format(new Date(), 'yyyy-MM-dd hh:mm').replace(' ', 'T' ),
            timezone: "Asia/Tokyo",
            settings: {
                use_pmi: "false"
            },
            transactionId: transactionId
        }
        console.log('videoMeeting')
        console.log(vidoMeeting)
        post(`${apiUrl}/mypage/videomeeting/create`, vidoMeeting, {}, true)
            .then(res => res.json())
            .then(json => {
                setValue({message: json.data.join_url})
                setMessage(Object.assign(message, {createdAt: new Date()}))
                db.collection("messages").add(message)
            })

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
                        multiline
                        rows={2}
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={onSubmit}>
                                    <SendIcon />
                                </IconButton>
                                <IconButton onClick={createVideoMeeting}>
                                    <VideoCallIcon />
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