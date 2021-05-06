/* eslint-disable */
import { Field } from 'react-final-form';
import { TextField as TextFieldFinal } from 'final-form-material-ui';
import { useContext } from 'react';
import {
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import localContext from 'src/localContext'
import APIRequest from 'src/api/APIRequest';

const AbsherOtp = () => {
  const { otp, setOtp} = useContext(localContext);
  const url = 'https://inspiredemo2.appiancloud.com/suite/webapi/taheel-apis-utilities-AbsherOTP-v2?BeneficiaryId=7273&OTP=7537555'
  const requestBody = {
    BeneficiaryId: "273",
    OTP: otp
  }

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
        </Grid>
      </Grid>
      <img alt="Absher Logo" style={{ width: '10%', marginRight: '46%' }} src="https://proven-sa.com/wp-content/uploads/2016/09/Absher-logo.png" />
      <Box
        sx={{
          pb: 1,
          pt: 3
        }}
      >
        <Typography
          align="center"
          color="textSecondary"
          variant="body1"
        >
          تم إرسال رمز التحقق الى رقم جوالك المسجل في أبشر
        </Typography>
      </Box>
      <Field
        fullWidth
        required
        label="رمز التحقق"
        name="AbsherOtp"
        component={TextFieldFinal}
        type="text"
        variant="outlined"
        dir="rtl"
        className="custom-field"
      />
      <Box
        textAlign="center"
        sx={{
          py: 2,
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          color="textSecondary"
          variant="body1"
          sx={{
            paddingBottom: '16px',
          }}
        >
          لم يصلك رمز التحقق ؟
        </Typography>

        <Typography
          color="textSecondary"
          variant="body1"
          sx={{
            paddingBottom: '16px',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          <a
           onClick={() => APIRequest({ requestBody, url })}
          >
       
            إعادة ارسال رمز التحقق
          </a>
        </Typography>
      </Box>
    </>
  );
};

export default AbsherOtp;
