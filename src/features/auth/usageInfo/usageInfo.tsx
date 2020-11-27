import React from "react"
import {Grid, FormLabel, FormControl, FormControlLabel, Radio, RadioGroup, Checkbox} from "@material-ui/core"
import { useSelector, useDispatch } from "react-redux"

import {makeStyles, Theme} from "@material-ui/core/styles";

import {
    editMotivation,
    editSupportRequest,
    editConsent,
    selectUserInfo
} from "../authSlice"


const useStyles = makeStyles((theme: Theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
}))

enum Motivation {
    Soon = 1,
    Consideration,
    JustLooking,
}

const UsageInfo: React.FC = () => {
    const classes = useStyles()
    const dispatch = useDispatch();
    const personalInfo = useSelector(selectUserInfo)
    const [motivation, setMotivationValue] = React.useState<number>(0);
    const [supportRequest, setSupportRequestValue] = React.useState<string>("");
    const [consent, setConsentValue] = React.useState<boolean>(false);

    const toBoolean = (booleanStr: string): boolean => {
        return  booleanStr.toLowerCase() === "true";
    }

    const handleMotivationChange = (event:  React.ChangeEvent<HTMLInputElement>)=> {
        dispatch(editMotivation(parseInt(event.target.value, 10)))
        setMotivationValue(parseInt(event.target.value, 10))
    }

    const handleSupportChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
        const bool = toBoolean(event.target.value)
        dispatch(editSupportRequest(bool))
        setSupportRequestValue(event.target.value)
    }

    const handleConsentChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
        dispatch(editConsent(event.target.checked))
        setConsentValue(event.target.checked)
    }

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <form className={classes.form} noValidate>
                        {/* TODO validation追加 */}
                        <FormControl component="label">
                            <FormLabel component="label">現在の状況</FormLabel>
                            <RadioGroup
                                value={motivation}
                                onChange={handleMotivationChange}
                            >
                                <FormControlLabel
                                    value={Motivation.Soon}
                                    control={<Radio />}
                                    label="すぐ依頼したいことがある"
                                />
                                <FormControlLabel
                                    value={Motivation.Consideration}
                                    control={<Radio />}
                                    label="依頼を検討している"
                                />
                                <FormControlLabel
                                    value={Motivation.JustLooking}
                                    control={<Radio />}
                                    label="現状依頼するつもりはない"
                                />
                            </RadioGroup>
                        </FormControl>
                        <FormControl component="label">
                            <FormLabel component="label">サポート希望</FormLabel>
                            <RadioGroup
                                value={supportRequest}
                                onChange={handleSupportChange}
                            >
                                <FormControlLabel
                                    value={"true"}
                                    control={<Radio />}
                                    label="チャットでサポートしてほしい"
                                />
                                <FormControlLabel
                                    value={"false"}
                                    control={<Radio />}
                                    label="サポートは必要ない"
                                />
                            </RadioGroup>
                        </FormControl>
                        <FormControl component="label">
                             <FormLabel component="label">同意</FormLabel>
                                <FormControlLabel
                                    control={
                                    <Checkbox
                                        checked={consent}
                                        onChange={handleConsentChange}
                                        name="consent"
                                        color="primary"
                                    />
                                    }
                                    label="同意しますか？"
                                />
                        </FormControl>
                    </form>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default UsageInfo