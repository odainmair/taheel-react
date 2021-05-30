/* eslint-disable */
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import localContext from '../localContext';
import { APIRequest } from 'src/api/APIRequest';
import DashboardNavbar from '../components/DashboardNavbar';
import MainNavbar from '../components/MainNavbar';

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

  avatarHover: {
    "&:hover": {
      backgroundColor: '#f6a923',
      border: 'solid 5px #f6a923'
    }
  },

  secondaryButton: {
    "&:hover": {
      color: 'white'
    }
  }
}));

const Login = (props) => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const navigate = useNavigate();
  const { users, setUser } = useContext(localContext);
  const [error, setError] = useState('')

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
      <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <MainNavbar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <Box
        sx={{
          backgroundColor: '#fafafa',
          width:'100%', 
           position: 'fixed',
           height:"100%",
           backgroundSize:"cover" 
        }}
      >
        <Container maxWidth="sm">

          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().required('يجب تعبئة الحقل').test('max', 'رقم الهوية/الاقامة يجب ان تحتوي فقط على 10 ارقام او البريد الالكتروني غير صالح', (value) => value && (value.includes('@') || value.length == 10)),
              password: Yup.string().required('يجب تعبئة الحقل')
            })}
            onSubmit={async (values) => {
              const requestBody = {
                username: values.email,
                password: values.password
              };
              const url = '/taheel-apis-users-login-v2'
              const response = await APIRequest({ requestBody, url });
              if (response.isSuccessful) {
                const otp = Math.floor(Math.random() * (1000000 - 100000) + 100000);

                const requestBody = {
                  recipient: response.responseBody.data.phoneNumber,
                  message: `Hello ${response.responseBody.data.firstName}, use this OTP to validate your login: ${otp}.`
                };
                setUser(response.responseBody.data)
                navigate('/otplogin', { state: { otp, requestBody } });
              } else {

                setError('كلمة المرور / اسم المستخدم غير صحيح  ')

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
              <form onSubmit={handleSubmit}>
                <Box
                  sx={{
                    // backgroundColor: 'white',
                    // borderRadius: 5,
                    // padding: 8,
                    mt: '2%',
                    // mb: '2%',
                    backgroundColor: 'white',
                    borderRadius: 5,
                    padding: 3,
                    boxShadow: '5px 10px 18px #ecf1f5'
                  }}
                >
                  <Grid
                    container
                  >
                    <Grid
                      item
                      xs={12}
                      md={12}
                    >
                      <Box
                        className={classes.root}
                        sx={{ mb: 5, mr: 1.5 }}
                      >
                        <Grid container spacing={3} sx={{margin: "0 auto", width:"auto"}}>
                        <Grid item xs={4}>

                        <Avatar
                          className={classes.large + ' ' + classes.avatarHover}
                          // onClick={() => setColor({ ...avtarColor, rightAvatar: '#214256', leftAvatar: '#c8d9d9' })}
                          sx={{
                            height: '85px', width: '85px', backgroundColor: '#c8d9d9', cursor: "pointer"
                          }}
                        >
                          أفراد
                        </Avatar>


                        </Grid>  
                        <Grid item xs={4}>
                        <Avatar
                          className={classes.large + ' ' + classes.avatarHover}
                          // onClick={() => setColor({ ...avtarColor, leftAvatar: '#214256', rightAvatar: '#c8d9d9' })}
                          sx={{
                            height: '85px', width: '85px', backgroundColor: '#214256', cursor: "pointer"
                          }}
                        >
                            مركز
                        </Avatar>
                        </Grid>  
                        <Grid item xs={4}>
                        <a href="https://inspiredemo2.appiancloud.com/suite/sites/takamol-taheel/page/request-Records" target="_blank">
                          <Avatar
                            className={classes.large + ' ' + classes.avatarHover}
                            // onClick={() => setColor({ ...avtarColor, leftAvatar: '#214256', rightAvatar: '#c8d9d9' })}
                            sx={{
                              height: '85px', width: '85px', backgroundColor: '#c8d9d9', cursor: "pointer"
                            }}
                          >
                            موظف
                        </Avatar>
                        </a>
                        </Grid>  
                        </Grid>  
                        
                        
                      </Box>
                      <Box sx={{ mb: 3, textAlign: 'center' }}>
                        <Typography
                          color="textPrimary"
                          variant="h2"
                        >
                          تسجيل دخول المركز
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
                        to="/forgetpassword"
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
                      ليس لديك حساب على المنصة ؟
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
                        تسجيل جديد
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



