/* eslint-disable */
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// import { useState } from 'react';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { TextField as TextFieldFinal, Select } from 'final-form-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
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

const RegistrationInfo = () => {
  const navigate = useNavigate();
  const { doRequest, error } = useRequest({
    url: 'https://inspiredemo2.appiancloud.com/suite/webapi/taheel-apis-users-login-v2',
    method: 'post',
    body: {

    },
    onSuccess: async (value) => {
      if (value.status === 'SUCCESS') {
        const otp = Math.floor(Math.random() * (1000000 - 100000) + 100000);
        const bodyRequest = {
          recipient: value.data.phoneNumber,
          message: `Hello ${value.data.firstName}, use this OTP to validate your login: ${otp}.`
        };
        navigate('/otpLogin', { state: { otp, bodyRequest } });
      }
    },
  });

  const classes = useStyles();
  // const [avtarColor, setColor] = useState({
  //   rightAvatar: '#c8d9d9',
  //   leftAvatar: '#c8d9d9',
  // });

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
              email: ' ',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().test('max', 'رقم الهوية/الاقامة يجب ان تحتوي فقط على 10 ارقام او البريد الالكتروني غير صالح', (value) => value && (value.includes('@') || value.length == 8)).required('يجب تعبئة الحقل'),
              password: Yup.string().max(8, 'حقل كلمة المرور يجب أن يحتوي على ٨ احرف على الاقل').required('يجب تعبئة الحقل')
            })}
            onSubmit={async (values) => {
              const bodyRequest = {
                username: values.email,
                password: values.password
              };
              const response = await doRequest(JSON.stringify(bodyRequest));
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
                  }}
                > */}
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

      <Field
        sx ={{mb: 3}}
        fullWidth
        required
        label="البربد الالكتروني"
        name="email"
        component={TextFieldFinal}
        type="email"
        variant="outlined"
        dir="rtl"
        className="custom-field"
      />


      <Field
       sx ={{mb: 3}}
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
       sx ={{mb: 3}}
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
      {/* <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="البربد الالكتروني"
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.email}
                    variant="outlined"
                    className="custom-field"
                  />
                  {error}
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="كلمة المرور"
                    margin="normal"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                    className="custom-field"
                  />
                   <TextField
                    error={Boolean(touched.passwordConfirmation && errors.passwordConfirmation)}
                    fullWidth
                    helperText={touched.passwordConfirmation && errors.passwordConfirmation}
                    label="كلمة المرور"
                    margin="normal"
                    name="passwordConfirmation"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.passwordConfirmation}
                    variant="outlined"
                    className="custom-field"
                  />*/}
                  <Box 
                    sx={{
        color: "gray",
        py: 2,

      }}
                  >
      <ul>
        <li id='digitsNo' > 8 احرف على الاقل </li>
        <li id='digitExist'>رقم واحد على الاقل </li>
        <li id='UpperCase' > حرف واحد صغير على الاقل </li>
        <li id='LowerCase'> حرف واحد كبير على الاقل </li>
        <li id='symbol'> رمز على الاقل </li>
      </ul>
    </Box>
                {/* </Box> */ }
  {/* </form>
            )}
          </Formik> */}
  {/* </Container> */ }
  {/* </Box> */ }
    </>
  );
};

export default RegistrationInfo;
