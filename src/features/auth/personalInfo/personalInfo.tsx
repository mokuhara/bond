import React from "react"
import {Grid, TextField, FormControl, FormControlLabel, Radio, RadioGroup} from "@material-ui/core"
import { useSelector, useDispatch } from "react-redux"
import {makeStyles, Theme} from "@material-ui/core/styles";
import { useForm } from 'react-hook-form';

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
    const userInfo = useSelector(selectUserInfo)
    const { register, errors, formState } = useForm({
        mode: 'onBlur',
        reValidateMode: 'onChange'
      });

    const handleChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
        dispatch(editUsage(parseInt(event.target.value, 10)))
    }

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <form className={classes.form} noValidate>
                        {/* TODO validation追加 */}
                        <FormControl component="label">
                            <RadioGroup
                                value={userInfo.usage}
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
                            value={userInfo.name}
                            onChange={(e)=> dispatch(editName(e.target.value))}
                            inputRef={register({ required: true })}
                            error={Boolean(errors.name)}
                            helperText={errors.name && "入力必須です"}
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
                            value={userInfo.kana}
                            onChange={(e)=> dispatch(editKana(e.target.value))}
                            inputRef={register({ pattern: /^[ァ-ンヴー]*$/})}
                            error={Boolean(errors.kana)}
                            helperText={errors.kana && "全角カタカナで入力してください"}
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
                            value={userInfo.phone}
                            onChange={(e)=> {dispatch(editPhone(e.target.value))}}
                            inputRef={register({ pattern: /^0\d{2,3}-\d{1,4}-\d{4}$/})}
                            error={Boolean(errors.phone)}
                            helperText={errors.phone && "ハイフン(-)つきの電話番号を入力してください"}
                        />
                    </form>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default PersonalInfo