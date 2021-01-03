import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Modal , Grid, Typography} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import ThreadIndex from './thread/index'
import ThreadNew from './thread/new'

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

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    title: {
        fontSize: '14px',
        paddingRight: '5px',
        fontWeight: 'bold'
    }
  }));

const Chat: React.FC<{transactionId: number}> = ({transactionId}) => {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return (
        <div>
          <ThreadIndex transactionId={transactionId}/>
          <Grid container justify="flex-end" alignItems="center">
            <Typography className={classes.title}>スレッド追加</Typography>
            <AddCircleIcon color="primary" onClick={handleOpen}/>
          </Grid>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
             <div style={modalStyle} className={classes.paper}>
                <ThreadNew transactionId={transactionId} />
            </div>
          </Modal>
        </div>
      );
}

export default Chat