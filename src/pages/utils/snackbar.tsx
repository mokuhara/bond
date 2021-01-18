import React, { useEffect}  from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

type Color = "success" | "info" | "warning" | "error"

interface profile {
    severity: string,
    message: string,
    isOpen: boolean,
    stateFunc: Function
}

export const SnackBar:React.FC<profile> = ({severity, message, isOpen, stateFunc}) => {
    const classes = useStyles();

    useEffect(()=>{
        stateFunc(isOpen)
        return
    },[isOpen, stateFunc])

    const handleClose = () => {
        // setOpen(false);
        stateFunc(false)
    };

    return (
    <div className={classes.root}>
        <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity as Color}>
            {message}
            </Alert>
        </Snackbar>
    </div>
    );
}
