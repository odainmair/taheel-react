/* eslint-disable */
import { Field } from 'react-final-form';

import { TextField as TextFieldFinal } from 'final-form-material-ui';
import {
  Box,
  Grid,
} from '@material-ui/core';

const PasswordConfirmation = () => {
  return (
    <>
      <Box sx={{
        mt: '3%',
        // padding: 2,
      }}>
        <Grid
          container
          spacing={2}
        >
          لقد تم ارسال رمز تحقق الى جهازك يرجى اعادة كتابته في خانة رمز الأمان

          <Grid
            item
            xs={12}
            md={12}
          >
            <Field
              sx={{ mb: 2 }}
              fullWidth
              required
              label="رمز الأمان"
              name="oldPassword"
              component={TextFieldFinal}
              type="password"
              variant="outlined"
              dir="rtl"
              className="custom-field"
            />
            <Field
              sx={{ mb: 2 }}
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
              // sx={{ mb: 1 }}
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
                padding: 2,
              }}
            >
              <ul>
                <li id="digitsNo"> 8 احرف على الاقل </li>
                <li id="digitExist">رقم واحد على الاقل </li>
                <li id="UpperCase"> حرف واحد صغير على الاقل </li>
                <li id="LowerCase"> حرف واحد كبير على الاقل </li>
                <li id="symbol"> رمز على الاقل </li>
                <li id="EnglishFormat"> لغة انجليزية فقط </li>
              </ul>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PasswordConfirmation;
