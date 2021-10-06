/* eslint-disable */
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { Field } from 'react-final-form';
import { TextField as TextFieldFinal } from 'final-form-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import { useContext } from 'react';
import localContext from '../../../../localContext';
import {
  Grid,
  Box,
  Typography ,
} from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//   },
//   large: {
//     width: theme.spacing(38),
//     height: theme.spacing(38),
//   },

//   secondaryButton: {
//     "&:hover": {
//       color: 'white'
//     }
//   }
// }));
const LoginOtp = (values) => {
  // const classes = useStyles();
  const location = useLocation();
  const { users, setUser } = useContext(localContext);

  return (

    <Box
      textAlign="center"
      sx={{
        py: 2,
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          pb: 3,
          pt:1
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

      <Field
        sx={{
          mb: 3
        }}
        fullWidth
        required
        label="رمز التحقق "
        name="verificationCode"
        component={TextFieldFinal}
        type="password"
        variant="outlined"
        dir="rtl"
        className="custom-field"
      />
    </Box>
  );
};

export default LoginOtp;
