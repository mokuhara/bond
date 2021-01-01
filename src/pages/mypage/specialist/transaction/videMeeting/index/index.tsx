import React, { useState, useEffect } from 'react'
import { Grid, CssBaseline, Button, Table, TableHead, TableRow, TableCell, TableContainer, TableBody, Paper} from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'

import { get, destroy } from '../../../../../../libs/fetch'
import videMeetingsState from './store'

const VideoMeetings : React.FC<{transactionId: number}> = ({transactionId}) => {
    const useStyles = makeStyles((theme: Theme) => ({
        tabaleHeader: {
            fontSize: '13px',
            color: 'rgba(0,16,14,0.55)',
        },
        tableBody: {
            fontSize: '13px',
        },
    }))
    const classes = useStyles()

    type videomeetings = typeof videMeetingsState
    const [videoMeetings, setVideoMeetings] = useState(videMeetingsState)

    const reshapeVideoMeetings = (videoMeetings: videomeetings) => {
        return videoMeetings.map(videoMeeting => {
            return {
                ID: videoMeeting.ID,
                topic: videoMeeting.topic,
                join_url: videoMeeting.join_url,
                start_time: videoMeeting.start_time,
                transactionId: videoMeeting.transactionId
            }
        })
    }

    const asyncGetVideoMeetings = () => {
        const apiUrl = "http://localhost:8000/v1";
        get(`${apiUrl}/mypage/videomeeting/${transactionId}`, {}, true)
            .then(res => res.json())
            .then(json => {
                setVideoMeetings(reshapeVideoMeetings(json.data))
            })
    }

    useEffect(() => {
        asyncGetVideoMeetings()
    },[])

    const deleteHandler = (videoMeetingId: number) => {
        const apiUrl = "http://localhost:8000/v1";
        destroy(`${apiUrl}/mypage/videomeeting/${videoMeetingId}/delete`, {}, true)
            .then(res => res.json())
            .then(json => {
                setVideoMeetings(videoMeetings.filter(videoMeeting => videoMeeting.ID != videoMeetingId))
            })
    }

    return (
        <>
            <Grid container component="main" spacing={2} justify="center">
                <CssBaseline />
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tabaleHeader} align="left">ミーティング名</TableCell>
                                <TableCell className={classes.tabaleHeader} align="left">開始時間</TableCell>
                                <TableCell className={classes.tabaleHeader} align="left">操作</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                             {videoMeetings && videoMeetings.map(videoMeeting => (
                                 <TableRow key={videoMeeting.ID}>
                                    <TableCell align="left" className={classes.tableBody}><a href={videoMeeting.join_url}>{videoMeeting.topic}</a></TableCell>
                                    <TableCell align="left" className={classes.tableBody}>{videoMeeting.start_time}</TableCell>
                                    <TableCell align="left" className={classes.tableBody}><Button color="secondary" variant="contained" onClick={() => deleteHandler(videoMeeting.ID)}>削除</Button></TableCell>
                                 </TableRow>
                             ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </>
    )
}

export default VideoMeetings