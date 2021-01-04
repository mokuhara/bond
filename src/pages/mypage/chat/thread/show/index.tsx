import React from 'react'
import { useLocation } from 'react-router-dom'
import { Grid , Card} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MessageIndex from '../../message/index'
import MessageNew from '../../message/new'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '10px'
    },
    }))

type threadId = { threadId : number }
const ThreadShow: React.FC = () => {
    const classes = useStyles();
    const location = useLocation<threadId>();
    const threadId = location.state.threadId


    return (
        <>
            <Grid container justify="center">
                <Grid item xs= {6}>
                    <Card variant="outlined" className={classes.root}>
                        <MessageIndex threadId={threadId} />
                        <MessageNew threadId={threadId} />
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export default ThreadShow