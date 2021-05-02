/* eslint-disable */
import { useNavigate, useLocation } from 'react-router-dom';
// import { useState } from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Field } from 'react-final-form';
import { TextField as TextFieldFinal, Select } from 'final-form-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  InputAdornment,
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

const TaheelOtp = (props) => {
  // console.log("props",props)
  const { doRequest, error } = useRequest({
    url: 'https://inspiredemo2.appiancloud.com/suite/webapi/taheel-apis-utilities-sendSms-v2',
    method: 'post',
    body: {

    },
    onSuccess: (value) => console.log('DONE', value)
  });

  const navigate = useNavigate();
  const classes = useStyles();
  const location = useLocation();
  // const { otp, bodyRequest } = location.state;
  // useEffect(async () => {
  //   const response = await doRequest(JSON.stringify(bodyRequest));
  //   console.log('OTP::', otp);
  // })
  return (
    <>
      {/* <Box
        sx={{
          backgroundColor: '#fafafa',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      > */}
      {/* <Container maxWidth="sm"> */}
      {/* <Formik
        initialValues={{
          otp: '',
        }}
        validationSchema={Yup.object().shape({
          otp: Yup.string().length(6, 'حقل كلمة المرور يجب أن يحتوي على 6 ارقام').required('يجب تعبئة الحقل').test('otp', 'رمز التحقق المدخل غير صحيح', (value) => value == otp),
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
      {/* <Box
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: 5,
                    padding: 8,
                    boxShadow: '5px 10px 18px #ecf1f5'
                  }} */}
      {/* > */}
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          xs={12}
          md={12}
        >
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Typography
              color="textPrimary"
              variant="h2"
            >
              التسجيل
                        </Typography>
          </Box>
        </Grid>
      </Grid>
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
          الرجاء ادخال رقم الهاتف الجوال الذي سيتم ارسال رمز التحقق له
          عند تسجيل الدخول في كل مره
                    </Typography>
      </Box>
      <Field
      sx={{ mb: 3}}
            fullWidth
            required
            label="رقم الجوال"
            name="phoneNumber"
            component={TextFieldFinal}
            type="text"
            variant="outlined"
            dir="rtl"
            className="custom-field"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  | 966+
                </InputAdornment>
              ),
            }}
          />
          
      {/* {(props.values.values && props.values.values.counter === 2)&& */}
      {(props && props.counter === 0)&&

        <Box>
          <Field
            fullWidth
            required
            label="رمز التحقق"
            name="taheelOtp"
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
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.otp}
                    variant="outlined"
                    className="custom-field"
                  /> */}
          <Typography
            color="textSecondary"
            variant="body1"
          >
            ادخل رمز التحقق المرسل الى هاتفك الجوال
                    </Typography>
          {/* {error} */}
          <Box
            textAlign="center"
            sx={{
              py: 2,
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
              mt: 5
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
              }}
            >
              <a
                onClick={async () => { const response = await doRequest(JSON.stringify(bodyRequest)); }}
              >
                إعادة ارسال رمز التحقق
                      </a>
            </Typography>
          </Box>
        </Box>
      }

      {/* <Button
                color="primary"
                // disabled={isSubmitting}
                size="large"
                type="submit"
                variant="contained"
                sx={{
                  borderRadius: '5em',
                  width: '50%',
                  margin: '0 auto'
                }}
              >
                التالي
                    </Button> */}
      {/* </Box> */}
      {/* </Box> */}
      {/* </form>
        )}
      </Formik> */}
      {/* </Container> */}
      {/* </Box> */}
    </>
  );
};

export default TaheelOtp;
