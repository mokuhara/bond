import React, { useState }  from 'react'
import { Button, TextField, Typography} from '@material-ui/core';
import { makeStyles , Theme} from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';

import { post } from '../../../../../../libs/fetch';
import videoMeetingState from './store'


const VideoMeetingForm: React.FC<{transactionId: number}> = ({transactionId}) => {
    const useStyles = makeStyles((theme: Theme) => ({
        root: {
          width: '100%',
        },
        container: {
          maxHeight: 440,
        },
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            borderRadius: '4px',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
          },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
        title: {
            fontSize: '14px',
            margin: '0',
            fontWeight: 'bold'
        },
        content: {
            fontSize: '12px',
            marginBottom: '10px'
        },
        button: {
            marginTop: '15px'
        }
    }));
    const classes = useStyles();


    // from validation
    const { register, errors } = useForm({
        mode: 'onBlur',
        reValidateMode: 'onChange'
      })
    const btnDisabler = Boolean(errors.topic) || Boolean(errors.startAt)


    // videoMeeting
    type videoMeeting = typeof videoMeetingState
    const [videoMeeting, setVideoMeeting] = useState(videoMeetingState)

    const extractJoinUrl = (videoMeeting: videoMeeting) => {
        return videoMeeting.join_url
    }

    const asyncCreateVideoMeeting = async () => {
        const apiUrl = "http://localhost:8000/v1";
        const vidoMeeting =  {
            topic: videoMeeting.topic,
            type: "2",
            start_time: videoMeeting.start_time,
            timezone: "Asia/Tokyo",
            settings: {
                use_pmi: "false"
            },
            transactionId: transactionId
        }
        post(`${apiUrl}/mypage/videomeeting/create`, vidoMeeting, {}, true)
            .then(res => res.json())
            .then(json => {
                setVideoMeeting({ ...videoMeeting, join_url: extractJoinUrl(json.data)})
            })
    }


    // modal
    const rand = () => {
        return Math.round(Math.random() * 20) - 10;
      }

    const getModalStyle = () => {
    const top = 50 + rand();
    const left = 50 + rand();
    return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }
    const [modalStyle] = useState(getModalStyle);

    return (
        <div style={modalStyle} className={classes.paper}>
            <Typography variant="h6" component="h2" className={classes.title}>web会議を作成する</Typography>
            <p className={classes.content}>タイトルと日付を入力してください</p>
            <form className={classes.container} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    placeholder="タイトル"
                    fullWidth
                    required
                    id="topic"
                    name="topic"
                    autoComplete="topic"
                    autoFocus
                    value={videoMeeting.topic}
                    onChange={(e)=>{setVideoMeeting({ ...videoMeeting, topic: e.target.value})}}
                    inputRef={register({ required: true })}
                    error={Boolean(errors.topic)}
                    helperText={errors.topic && "入力必須です"}
                />
                <TextField
                    id="startAt"
                    name="startAt"
                    type="datetime-local"
                    defaultValue="2017-05-24T10:30"
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    onChange={(e)=>{setVideoMeeting({ ...videoMeeting, start_time: e.target.value})}}
                    inputRef={register({ required: true })}
                    error={Boolean(errors.startAt)}
                    helperText={errors.startAt && "入力必須です"}
                />
                <Button
                        fullWidth
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        disabled={btnDisabler}
                        onClick={()=>asyncCreateVideoMeeting()}
                    >
                        作成する
                </Button>
            </form>
            {videoMeeting.join_url && (<a href={videoMeeting.join_url}>video会議はこちら</a>)}
        </div>
    );
}

export default VideoMeetingForm