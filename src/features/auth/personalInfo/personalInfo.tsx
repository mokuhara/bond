import React from "react"
import {Grid, TextField, FormControl, FormControlLabel, Radio, RadioGroup} from "@material-ui/core"
import { useSelector, useDispatch } from "react-redux"

import {makeStyles, Theme} from "@material-ui/core/styles";

import {
    editUsage,
    editName,
    editKana,
    editPhone,
    selectUserInfo
} from "../authSlice"


const useStyles = makeStyles((theme: Theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
}))

enum Usage {
    Admin = 0,
    Specialist,
    Client,
}

const PersonalInfo: React.FC = () => {
    const classes = useStyles()
    const dispatch = useDispatch();
    const [value, setValue] = React.useState<number>(0);

    const handleChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
        dispatch(editUsage(parseInt(event.target.value, 10)))
        setValue(parseInt(event.target.value, 10))
    }

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <form className={classes.form} noValidate>
                        {/* TODO validation追加 */}
                        <FormControl component="label">
                            <RadioGroup
                                value={value}
                                onChange={handleChange}
                            >
                                <FormControlLabel
                                    value={Usage.Client}
                                    control={<Radio />}
                                    label="案件を依頼する"
                                />
                                <FormControlLabel
                                    value={Usage.Specialist}
                                    control={<Radio />}
                                    label="依頼に提案する"
                                />
                            </RadioGroup>
                        </FormControl>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            id="name"
                            label="name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            onChange={(e)=> dispatch(editName(e.target.value))}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            id="kana"
                            label="kana"
                            name="kana"
                            autoComplete="kana"
                            autoFocus
                            onChange={(e)=> dispatch(editKana(e.target.value))}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            id="phone"
                            label="phone"
                            name="phone"
                            autoComplete="phone"
                            autoFocus
                            onChange={(e)=> dispatch(editPhone(e.target.value))}
                        />
                    </form>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default PersonalInfo