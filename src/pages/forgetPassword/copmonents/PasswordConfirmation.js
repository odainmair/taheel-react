/* eslint-disable */
import { Field } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';
import { StepLabel, Stepper } from '@material-ui/core';

import { TextField as TextFieldFinal } from 'final-form-material-ui';
import {
  Box,
  Grid,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
 
}));



const PasswordConfirmation = () => {
  const classes = useStyles();

  return (
    <>
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          xs={12}
          md={12}
        >
          لقد تم ارسال كلمة مرور الى جهازك يرجى اعادة كتابته في خانة كلمة المرور السابقة

          <Field
            sx={{ mb: 3 }}
            fullWidth
            required
            label="كلمة المرور السابقة"
            name="oldPassword"
            component={TextFieldFinal}
            type="password"
            variant="outlined"
            dir="rtl"
            className="custom-field"
          />
          <Field
            sx={{ mb: 3 }}
            fullWidth
            required
            label="كلمة المرور"
            name="password"
            component={TextFieldFinal}
            type="password"
            variant="outlined"
            dir="rtl"
            className="custom-field"
          />

          <Field
            sx={{ mb: 3 }}
            fullWidth
            required
            label="تأكيد كلمة المرور"
            name="passwordConfirmation"
            component={TextFieldFinal}
            type="password"
            variant="outlined"
            dir="rtl"
            className="custom-field"
          />
          <Box
            sx={{
              color: 'gray',
              py: 2,
            }}
          >
            <ul>
              <li id="digitsNo"> 8 احرف على الاقل </li>
              <li id="digitExist">رقم واحد على الاقل </li>
              <li id="UpperCase"> حرف واحد صغير على الاقل </li>
              <li id="LowerCase"> حرف واحد كبير على الاقل </li>
              <li id="symbol"> رمز على الاقل </li>
            </ul>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default PasswordConfirmation;
