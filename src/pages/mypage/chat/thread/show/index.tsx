import React from 'react'
import { useLocation } from 'react-router-dom'
import { Grid , Card} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../../../../../layouts/mypage'

import MessageIndex from '../../components/messageBox'
import MessageNew from '../../components/messageCreate'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '10px'
    },
    }))

type payload = { threadId : number, transactionId: number}
const ThreadShow: React.FC = () => {
    const classes = useStyles();
    const location = useLocation<payload>();
    const threadId = location.state.threadId
    const transactionId = location.state.transactionId


    return (
        <Layout>
            <Grid container justify="center">
                <Grid item xs= {6}>
                    <Card variant="outlined" className={classes.root}>
                        <MessageIndex threadId={threadId} />
                        <MessageNew threadId={threadId} transactionId={transactionId}/>
                    </Card>
                </Grid>
            </Grid>
        </Layout>
    )
}

export default ThreadShow