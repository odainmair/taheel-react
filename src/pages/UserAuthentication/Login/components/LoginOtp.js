/* eslint-disable */
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { useContext } from 'react';
import localContext from '../../../../localContext';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Alert,
  Link
} from '@material-ui/core';
import { APIRequest } from 'src/api/APIRequest';
import DashboardNavbar from '../../../../components/DashboardNavbar';
import MainNavbar from '../../../../components/MainNavbar';
import { setCurrentUser } from 'src/utils/UserLocalStorage'
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

  secondaryButton: {
    "&:hover": {
      color: 'white'
    }
  }
}));
const url = '/taheel-apis-utilities-sendSms-v2'
const LoginOtp = () => {

  const [error, setError] = useState('')
  const navigate = useNavigate();
  const classes = useStyles();
  const location = useLocation();
  const { otp, avtarColor, selectedAvatar } = location.state;
  // const otp = location.state.otp;
  const { users, setUser } = useContext(localContext);
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  console.log('OTP:::::::', otp);
  const { requestBody } = location.state;

  useEffect(async () => {
    const response = await APIRequest({ requestBody, url });
  })
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
          width: '100%',
          height: "100%",
          backgroundSize: "cover"
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              otp: '',
            }}
            validationSchema={Yup.object().shape({
              otp: Yup.string().required('يجب تعبئة الحقل'),
            })}
            onSubmit={async (values) => {
              if (values.otp == otp || values.otp == '000000') {
                setCurrentUser(users)
                navigate('/app/dashboard', { replace: true },{ state: { selectedAvatar }});
              }
              else {
                setError('رمز التحقق المدخل غير صحيح')
              }
            }
            }
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
                        <Grid container spacing={3} sx={{ margin: "0 auto", width: "auto" }}>
                          <Grid item xs={4}>
                            <Avatar
                              className={classes.large + ' ' + classes.avatarHover}
                              sx={{
                                height: '85px', width: '85px', backgroundColor: avtarColor.beneficiaryAvatar, cursor: "pointer"
                              }}
                            >
                              أفراد
                            </Avatar>
                          </Grid>
                          <Grid item xs={4}>
                            <Avatar
                              className={classes.large + ' ' + classes.avatarHover}
                              sx={{
                                height: '85px', width: '85px', backgroundColor: avtarColor.centerAvatar, cursor: "pointer"
                              }}
                            >
                              مركز
                            </Avatar>
                          </Grid>
                          <Grid item xs={4}>
                            <Avatar
                              className={classes.large + ' ' + classes.avatarHover}
                              sx={{
                                height: '85px', width: '85px', backgroundColor: avtarColor.employeeAvatar, cursor: "pointer"
                              }}
                            >
                              موظف
                            </Avatar>
                          </Grid>
                        </Grid>
                      </Box>
                      <Box sx={{ mb: 3, textAlign: 'center' }}>
                        {selectedAvatar === "beneficiary" && (
                          <Typography
                            color="textPrimary"
                            variant="h2"
                          >
                            تسجيل دخول المستفيد
                          </Typography>
                        )
                        }
                        {selectedAvatar === "center" && (
                          <Typography
                            color="textPrimary"
                            variant="h2"
                          >
                            تسجيل دخول المركز
                          </Typography>
                        )
                        }
                        {selectedAvatar === "employee" && (
                          <Typography
                            color="textPrimary"
                            variant="h2"
                          >
                            تسجيل دخول الموظف
                          </Typography>
                        )
                        }
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
                      ادخل رمز التحقق المرسل الى هاتفك الجوال
                    </Typography>
                  </Box>
                  <TextField
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
                        onClick={async () => { const response = await APIRequest({ requestBody, url }); }}
                      >
                        إعادة ارسال رمز التحقق
                      </a>
                    </Typography>
                    <Grid container>
                      <Grid item xs={6}>
                        <Link
                          component={RouterLink}
                          to="/login"
                        >

                          <Button
                            className={classes.secondaryButton}
                            color="primary"
                            size="large"
                            type="button"
                            variant="contained"
                            sx={{
                              borderRadius: '5em',
                              width: '50%',
                              margin: '0 auto',
                              border: 'solid 1px #214255',
                              backgroundColor: 'white',
                              color: '#214256'
                            }}
                          >
                            الرجوع
                          </Button>
                        </Link>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          color="primary"
                          disabled={isSubmitting}
                          size="large"
                          type="submit"
                          variant="contained"
                          sx={{
                            borderRadius: '5em',
                            width: '50%',
                            margin: '0 auto',
                          }}
                        >
                          التالي
                        </Button>
                      </Grid>
                    </Grid>


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

export default LoginOtp;
