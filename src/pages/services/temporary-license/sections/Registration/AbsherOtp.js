/* eslint-disable */
import { useNavigate, useLocation } from 'react-router-dom';
// import { useState } from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Avatar from '@material-ui/core/Avatar';
import { Field } from 'react-final-form';
import { TextField as TextFieldFinal, Select } from 'final-form-material-ui';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Alert,
  Container,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import useRequest from '../../../../../hooks/use-request';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(38),
    height: theme.spacing(38),
  },
}));

const AbsherOtp = () => {

  const { doRequest, error } = useRequest({
    url: 'https://inspiredemo2.appiancloud.com/suite/webapi/taheel-apis-utilities-sendSms-v2',
    method: 'post',
    body: {

    },
    onSuccess: () => console.log('DONE')
  });

  // useEffect(async () => {
  //   const response = await doRequest(JSON.stringify(bodyRequest));
  //   console.log('OTP::', otp);
  // })

  const navigate = useNavigate();
  const classes = useStyles();
  // const otp = Math.floor(Math.random() * (1000000 - 100000) + 100000);
  // const bodyRequest = {
  //   recipient: '078586754',
  //   message: `Hello, use this OTP to validate your login: ${otp}.`
  // };
  // useEffect(async () => {
  //   const response = await doRequest(JSON.stringify(bodyRequest));
  //   console.log('OTP::', otp);
  // })
  return (
    <>
 {/* <Formik
            initialValues={{
              otp: '',
            }}
            validationSchema={Yup.object().shape({
              otp: Yup.string().length(6, 'حقل كلمة المرور يجب أن يحتوي على 6 ارقام').required('يجب تعبئة الحقل'),
            })}
            onSubmit={async (values) => {
              if (values.otp == otp) {
                navigate('/app/products', { replace: true });
              }
            }}
          >
            {({
              errors,
              handleBlur,
              handleSubmit,
              isSubmitting,
              handleChange,
              values,
              touched,
            }) => (
              <form onSubmit={handleSubmit}> */}
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
   
      <img style={{ width: '10%', marginRight: '46%' }} src='https://proven-sa.com/wp-content/uploads/2016/09/Absher-logo.png'></img>

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

      {/* <TextField
        error={Boolean(touched.otp && errors.otp)}
        fullWidth
        helperText={touched.otp && errors.otp}
        label="رمز التحقق"
        margin="normal"
        name="otp"
        // onBlur={handleBlur}
        onChange={handleChange}
        type="text"
        value={values.otp}
        variant="outlined"
        className="custom-field"
      /> */}

         {/* {(values.otp && otp+"" !== values.otp) && (
              <Box mt={3}>
                <Alert variant="outlined" severity="error">
                رمز التحقق المدخل غير صحيح
                </Alert>
              </Box>
            )} */}
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
          // onClick={async () => { const response = await doRequest(JSON.stringify(bodyRequest)); }}
          >
            إعادة ارسال رمز التحقق
                      </a>
        </Typography>
      </Box>
      {/* </form>
            )}
          </Formik> */}
    </>
  );
};

export default AbsherOtp;
