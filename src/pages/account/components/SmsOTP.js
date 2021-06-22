/* eslint-disable */
import { Field } from 'react-final-form';
import { TextField as TextFieldFinal } from 'final-form-material-ui';
import {
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { requestOTPPhoneNum } from '../data/AccountApi';
import { getCurrentUser, setCurrentUser } from 'src/utils/UserLocalStorage';

const SmsOTP = (props) => {
  const { idNumIqamaNum } = getCurrentUser();
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
      {/* <img alt="Absher Logo" style={{ width: '10%', marginRight: '46%' }} src="https://proven-sa.com/wp-content/uploads/2016/09/Absher-logo.png" /> */}
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
          تم إرسال رمز التحقق الى رقم جوالك
        </Typography>
      </Box>
      <Field
        fullWidth
        required
        label="رمز التحقق"
        name="SmsOTP"
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
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          <a
          onClick= {()=> requestOTPPhoneNum(idNumIqamaNum,props.newNum)}
          //  onClick={() => AbsherOTP(IqamaNumber)}
          >
            إعادة ارسال رمز التحقق
          </a>
        </Typography>
      </Box>
    </>
  );
};

export default SmsOTP;
SmsOTP.propTypes = {
  newNum: PropTypes.string.isRequired,
};