import React from "react"
import {Grid, TextField} from "@material-ui/core"
import { useSelector, useDispatch } from "react-redux"
import {makeStyles, Theme} from "@material-ui/core/styles";
import { useForm } from 'react-hook-form';

import {
    editCompanyName,
    editDepartment,
    editPosition,
    editCompanyPhone,
    selectUserInfo
} from "../authSlice"


const useStyles = makeStyles((theme: Theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
}))

const CompanyInfo: React.FC = () => {
    const classes = useStyles()
    const dispatch = useDispatch();
    const userInfo = useSelector(selectUserInfo)
    const { register, errors } = useForm({
        mode: 'onBlur',
        reValidateMode: 'onChange'
      });


    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <form className={classes.form} noValidate>
                        {/* TODO validation追加 */}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            id="companyName"
                            label="companyName"
                            name="companyName"
                            autoComplete="companyName"
                            autoFocus
                            value={userInfo.companyName}
                            onChange={(e)=> dispatch(editCompanyName(e.target.value))}
                            inputRef={register({ required: true })}
                            error={Boolean(errors.companyName)}
                            helperText={errors.companyName && "入力必須です"}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            id="department"
                            label="department"
                            name="department"
                            autoComplete="department"
                            autoFocus
                            value={userInfo.department}
                            onChange={(e)=> dispatch(editDepartment(e.target.value))}
                            inputRef={register({ required: true })}
                            error={Boolean(errors.department)}
                            helperText={errors.department && "入力必須です"}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            id="position"
                            label="position"
                            name="position"
                            autoComplete="position"
                            autoFocus
                            value={userInfo.position}
                            onChange={(e)=> dispatch(editPosition(e.target.value))}
                            inputRef={register({ required: true })}
                            error={Boolean(errors.position)}
                            helperText={errors.position && "入力必須です"}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            id="companyPhone"
                            label="companyPhone"
                            name="companyPhone"
                            autoComplete="companyPhone"
                            autoFocus
                            value={userInfo.companyPhone}
                            onChange={(e)=> dispatch(editCompanyPhone(e.target.value))}
                            inputRef={register({ pattern: /^0([0-9]-[0-9]{4}|[0-9]{2}-[0-9]{3}|[0-9]{3}-[0-9]{2}|[0-9]{4}-[0-9])-[0-9]{4}$/})}
                            error={Boolean(errors.companyPhone)}
                            helperText={errors.companyPhone && "ハイフン(-)つきの電話番号を入力してください"}
                        />
                    </form>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default CompanyInfo