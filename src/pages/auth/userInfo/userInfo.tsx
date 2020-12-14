import React , {useState} from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Paper, Stepper, Step, StepLabel, Button, Typography, Grid } from "@material-ui/core"
import PersonalInfo from "../personalInfo/personalInfo"
import CompanyInfo from "../companyInfo/companyInfo"
import UsageInfo from "../usageInfo/usageInfo"
import { useSelector } from "react-redux"
import { useHistory } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';

import { selectUserInfo,  fetchAsyncSendUserInfo} from "../authSlice"
import { SnackBar } from "../../utils/snackbar"
import { useAppDispatch } from "../../../store/storeHelper";


const useStyles = makeStyles((theme: Theme) => ({
    appBar: {
      position: 'relative',
    },
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
    stepper: {
      padding: theme.spacing(3, 0, 5),
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
  }));

const steps = ['基本情報', '企業情報', '利用情報'];

const getStepContent = (step: number) => {
    switch (step) {
        case 0:
            return <PersonalInfo />
        case 1:
            return <CompanyInfo />
        case 2:
            return <UsageInfo />
        default:
            throw new Error('Unknown step')
    }
}

const UserInfo: React.FC = () => {
    const classes = useStyles()
    const asyncDispatch = useAppDispatch();
    const userInfo = useSelector(selectUserInfo)
    const history = useHistory()
    const [activeStep, setActiveStep] = React.useState(0);
    const [errMessage, setErrMessage] = useState({severity: "error", message: "", isOpen: false})
    const changeOpenStatus = (openStatus: boolean) => { setErrMessage({...errMessage, isOpen: openStatus})}

    const sendUserInfo = async () => {
        asyncDispatch(fetchAsyncSendUserInfo(userInfo))
            .then(unwrapResult)
            .then(()=>{
                setActiveStep(activeStep + 1)
                setTimeout(() => {
                    history.push(`/mypage`)
                }, 2000);
            })
            .catch(error =>{
                console.error(error)
                setErrMessage({...errMessage, message: "入力に誤りがあります", isOpen: true})
            })
    }

    const handleNext = () => {
        setActiveStep(activeStep + 1);
        if(activeStep === steps.length -1) {
            sendUserInfo()
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const validationHandler = () => {
        switch (activeStep) {
            case 0:
                const validKane = userInfo.kana.match(/^[ァ-ンヴー]*$/)
                const validPhoneNumber = userInfo.phone.match(/^0\d{2,3}-\d{1,4}-\d{4}$/)
                return !Boolean(userInfo.kana && validKane && validPhoneNumber)
            case 1:
                const validCompanyPhone = userInfo.companyPhone.match( /^0([0-9]-[0-9]{4}|[0-9]{2}-[0-9]{3}|[0-9]{3}-[0-9]{2}|[0-9]{4}-[0-9])-[0-9]{4}$/)
                return !Boolean(userInfo.companyName && userInfo.department && userInfo.position && validCompanyPhone)
            case 2:
                return !userInfo.consent
            default:
                return true
        }
    }

    return (
        <Grid container component="main" className={classes.layout}>
            <Paper className={classes.paper}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                    ))}
                </Stepper>
                <React.Fragment>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                ご登録ありがとうございました
                            </Typography>
                            <Typography variant="subtitle1">
                                マイページに移動します。
                            </Typography>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(activeStep)}
                            <div className={classes.buttons}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack}>
                                        戻る
                                    </Button>
                                )}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={validationHandler()}
                                    onClick={handleNext}
                                    className={classes.buttons}>
                                        {activeStep === steps.length - 1 ? '登録する' : '次へ'}
                                    </Button>
                            </div>
                        </React.Fragment>
                    )}
                </React.Fragment>
            </Paper>
            {errMessage.isOpen && <SnackBar severity={errMessage.severity} message={errMessage.message} isOpen={errMessage.isOpen} stateFunc={changeOpenStatus}/>}
        </Grid>
    )
}

export default UserInfo