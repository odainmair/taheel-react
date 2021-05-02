/* eslint-disable */
import { useNavigate } from 'react-router-dom';
import { Field } from 'react-final-form';
import { TextField as TextFieldFinal } from 'final-form-material-ui';
import {
  Box,
  Grid,
  Typography,
  InputAdornment,
} from '@material-ui/core';
import useRequest from '../../../../../hooks/use-request';

const TaheelOtp = (props) => {
  const { doRequest, error } = useRequest({
    url: 'https://inspiredemo2.appiancloud.com/suite/webapi/taheel-apis-utilities-sendSms-v2',
    method: 'post',
    body: {

    },
    onSuccess: (value) => console.log('DONE', value)
  });

  const navigate = useNavigate();

  return (
    <>
      <Grid
        container
        spacing={3}
      >
      </Grid>
      <Box
        sx={{
          pb: 1,
          pt: 3,
          my: 3 
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
        sx={{ my: 3 }}
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
      {(props && props.counter === 0) &&
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
        </Box>}
    </>
  );
};

export default TaheelOtp;
