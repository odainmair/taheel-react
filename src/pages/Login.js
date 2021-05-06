/* eslint-disable */
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import localContext from '../localContext';
import APIRequest from 'src/api/APIRequest';

import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Alert,
  TextField,
  Typography,
} from '@material-ui/core';
import useRequest from '../hooks/use-request Login';
import { setCurrentUser } from 'src/utils/UserLocalStorage';

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

const Login = (props) => {

  const navigate = useNavigate();
  const { user, setUser } = useContext(localContext);
  const { doRequest, error } = useRequest({
    url: 'https://inspiredemo2.appiancloud.com/suite/webapi/taheel-apis-users-login-v2',
    method: 'post',
    body: {

    },
    onSuccess: async (value) => {
      if (value.status === 'SUCCESS') {
        const otp = Math.floor(Math.random() * (1000000 - 100000) + 100000);
        const requestBody = {
          recipient: value.data.phoneNumber,
          message: `Hello ${value.data.firstName}, use this OTP to validate your login: ${otp}.`
        };

        setCurrentUser(value.data);
        console.log(JSON.stringify(value.data));
        navigate('/otplogin', { state: { user, otp, requestBody } });
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
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: '#fafafa',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">

          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              // email: Yup.string().required('يجب تعبئة الحقل').test('max', 'رقم الهوية/الاقامة يجب ان تحتوي فقط على 10 ارقام او البريد الالكتروني غير صالح', (value) => value && (value.includes('@') || value.length == 10)),
              // password: Yup.string().min(8, 'حقل كلمة المرور يجب أن يحتوي على ٨ احرف على الاقل').required('يجب تعبئة الحقل')
            })}
            onSubmit={async (values) => {
              const bodyRequest = {
                username: values.email,
                password: values.password
              };

              const response = await doRequest(JSON.stringify(bodyRequest));
              // const url= 'https://inspiredemo2.appiancloud.com/suite/webapi/taheel-apis-users-login-v2'
              // const response = await APIRequest({ requestBody, url });
              // console.log("response=========>>>>>>>>",response)
              // if (response.isSuccessful) {
              //   console.log("response=========>>>>>>>>",response.data.responseBody.data.firstName)
              //   const otp = Math.floor(Math.random() * (1000000 - 100000) + 100000);
              //   const requestBody = {
              //     recipient: response.data.phoneNumber,
              //     message: `Hello ${response.data.responseBody.data.firstName}, use this OTP to validate your login: ${otp}.`
              //   };
              //   setUser(response.data)
              //   navigate('/otplogin', { state: { otp, requestBody } });
              // }
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
              <form onSubmit={handleSubmit}>
                <Box
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: 5,
                    padding: 8,
                    boxShadow: '5px 10px 18px #ecf1f5'
                  }}
                >
                  <Grid
                    container
                    spacing={3}
                  >
                    <Grid
                      item
                      xs={12}
                      md={12}
                    >
                      <Box
                        className={classes.root}
                        sx={{ mb: 5, mr: 2 }}
                      >
                        <Avatar
                          className={classes.large}
                          // onClick={() => setColor({ ...avtarColor, rightAvatar: '#214256', leftAvatar: '#c8d9d9' })}
                          sx={{
                            height: '85px', width: '85px', marginLeft: '15%', backgroundColor: '#c8d9d9'
                          }}
                        >
                          مستفيد
                        </Avatar>

                        <Avatar
                          className={classes.large}
                          // onClick={() => setColor({ ...avtarColor, leftAvatar: '#214256', rightAvatar: '#c8d9d9' })}
                          sx={{
                            height: '85px', width: '85px', marginLeft: '15%', backgroundColor: '#214256'
                          }}
                        >
                          <a href="/login" style={{color:'white'}}>
                          مركز
                          </a>
                        </Avatar>
                        <a href="https://inspiredemo2.appiancloud.com/suite/sites/takamol-taheel/page/request-Records">
                        <Avatar
                          className={classes.large}
                          // onClick={() => setColor({ ...avtarColor, leftAvatar: '#214256', rightAvatar: '#c8d9d9' })}
                          sx={{
                            height: '85px', width: '85px', marginLeft: '15%', backgroundColor: '#f4a523'
                          }}
                        >
                          موظف
                        </Avatar>
                        </a>
                      </Box>
                      <Box sx={{ mb: 3, textAlign: 'center' }}>
                        <Typography
                          color="textPrimary"
                          variant="h2"
                        >
                          تسجيل الدخول
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
                      تسجيل دخول عن طريق رقم الهوية/الاقامة أو البربد الالكتروني
                    </Typography>
                  </Box>
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="رقم الهوية/الاقامة أو البربد الالكتروني"
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.email}
                    variant="outlined"
                    className="custom-field"
                  />

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
                  {error && (
                    <Box mt={3}>
                      <Alert severity="error">
                        {error}
                      </Alert>
                    </Box>
                  )}
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
                        textDecoration: 'underline'
                      }}
                    >
                      <Link
                        component={RouterLink}
                        to="/ForgetPwd"
                        variant="h6"
                      >
                        نسيت كلمة المرور
                      </Link>
                    </Typography>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
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
                    </Button>
                    <Typography
                      color="textSecondary"
                      variant="body1"
                      sx={{
                        paddingTop: '16px',
                      }}
                    >
                      ليس لديك رقم حساب ؟
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="body1"
                    >
                      <Link
                        component={RouterLink}
                        to="/register"
                        variant="h6"
                        sx={{
                          textDecoration: 'underline'
                        }}
                      >
                        إنشاء حساب
                      </Link>
                    </Typography>
                  </Box>
                </Box>
              </form>
            )}
          </Formik>

        </Container>
      </Box>
    </>
  );
};

export default Login;
