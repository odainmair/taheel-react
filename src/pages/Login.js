import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from '@material-ui/core';
import FacebookIcon from 'src/icons/Facebook';

const Login = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: 'abdallah@takamolholding.com',
              password: 'Password123'
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={() => {
              navigate('/app/products', { replace: true });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3, textAlign: 'center' }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    تسجيل الدخول
                  </Typography>
                </Box>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    xs={12}
                    md={12}
                  >
                    <Button
                      fullWidth
                      startIcon={<FacebookIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="contained"
                      sx={{
                        backgroundColor: '#3c8084',
                      }}
                    >
                      تسجيل دخول عن طريق AZURE AD
                    </Button>
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
                  type="email"
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
                      to="/login"
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
                    تسجيل دخول
                  </Button>
                  <Typography
                    color="textSecondary"
                    variant="body1"
                    sx={{
                      paddingTop: '16px',
                    }}
                  >
                    ليس لديك رقم حساب ؟
                    {' '}
                    <Link
                      component={RouterLink}
                      to="/login"
                      variant="h6"
                      sx={{
                        textDecoration: 'underline'
                      }}
                    >
                      إنشاء حساب
                    </Link>
                  </Typography>
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
