import React from "react"
import {Grid, TextField} from "@material-ui/core"
import { useSelector, useDispatch } from "react-redux"

import {makeStyles, Theme} from "@material-ui/core/styles";

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
    // const companyInfo = useSelector(selectUserInfo)


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
                            onChange={(e)=> dispatch(editCompanyName(e.target.value))}
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
                            onChange={(e)=> dispatch(editDepartment(e.target.value))}
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
                            onChange={(e)=> dispatch(editPosition(e.target.value))}
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
                            onChange={(e)=> dispatch(editCompanyPhone(e.target.value))}
                        />
                    </form>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default CompanyInfo