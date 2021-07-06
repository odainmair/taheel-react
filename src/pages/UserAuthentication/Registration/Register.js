/* eslint-disable */
import React, { useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { Field } from 'react-final-form';
import { Helmet } from 'react-helmet';

import {
  CardContent,
  Typography,
  Box,
  Container,
  Grid,
  Link,
  Alert,
  Button
} from '@material-ui/core';
// import FinalFromWizard from '../../components/wizard/FinalFormWizard';
import CitizenInfo from './sections/CitizenInfo';
import AbsherOtp from './sections/AbsherOtp';
import TaheelOtp from './sections/TaheelOtp';
import RegistrationInfo from './sections/RegistrationInfo';
import { APIRequest } from 'src/api/APIRequest';
import AlertDialog from 'src/components/AlertDialog';
import localContext from 'src/localContext'
import moment from 'moment-hijri';
// import MainNavbar from '../../components/MainNavbar';
import { CitizenValidate } from './utils'
import { absherValidate } from './utils'
import { regitrationValidate } from './utils'
import { TaheelOtpValidate } from './utils'
import { AbsherOTPAuth, absherSms, validateCitizenFun, verifyEmailAndIqamaNum, AuthOTPPhoneNum, requestOTPPhoneNum } from './services/RegistrationAPI';
import DashboardNavbar from 'src/components/DashboardNavbar';
import MainNavbar from 'src/components/MainNavbar';
import FinalFromWizard from 'src/components/wizard/FinalFormWizard';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(40),
    height: theme.spacing(40),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

  avatarHover: {
    "&:hover": {
      backgroundColor: '#f6a923',
      border: 'solid 5px #f6a923'
    }
  }
}));

const Register = () => {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState('');
  const [dialogTitle, setDialogTitle] = React.useState('');
  let { otp, setOtp } = useContext(localContext);
  const { recipient, setRecipient } = useContext(localContext);
  const [errMessage, SetErrMessage] = useState('');
  const [idNum, setIdNum] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [userType, setUserType] = useState("4");
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [is, setIs] = useState(false)
  const [info, setInfo] = React.useState({});
  const [selectedAvatar, setSelectedAvatar] = useState('center');
  const [avtarColor, setColor] = useState({
    beneficiaryAvatar: '#c8d9d9',
    centerAvatar: '#214256' ,
  });

  const navigate = useNavigate();
  function numberToDay(day) {
    return ('0' + day).slice(-2);
  }
  const validateAPIFunc = async (values) => {
    const { idNumber, day, month, year } = values;
    setIdNum(idNumber);
    const verifyEmailAndIqamaNumRs = await verifyEmailAndIqamaNum({ idNumber });

    if (!verifyEmailAndIqamaNumRs.isSuccessful) {
      return { isSuccessful: false, message: verifyEmailAndIqamaNumRs.message };
    }

    const birthDate = year + '' + numberToDay(month) + numberToDay(day);
    console.log("birthDate++++++++++++++",birthDate)
    console.log
    const response = { isSuccessful: true, message: '' };
    const validateCitRs = await validateCitizenFun(idNumber, birthDate);
    if (!validateCitRs.isSuccessful) {
      return { isSuccessful: false, message: validateCitRs.message };
    }
    const data = validateCitRs.responseBody.data;
    setInfo(data);
    const absherSmsRe = await absherSms(idNumber);
    if (!absherSmsRe.isSuccessful) {
      return { isSuccessful: false, message: absherSmsRe.message };
    }
    return absherSmsRe;
  };

  // OTP Checking
  const validateOtp = async (values) => {
    const { AbsherOtp } = values;
    const resopnse = { isSuccessful: true, message: '' };
    const AbsherOTPAuthRs = await AbsherOTPAuth(idNum, AbsherOtp);
    if (!AbsherOTPAuthRs.isSuccessful) {
      return { isSuccessful: false, message: AbsherOTPAuthRs.message };
    }
    return AbsherOTPAuthRs;
  };

  const validateEmail = async (values) => {
    const { email } = values;
    const verifyEmailAndIqamaNumRs = await verifyEmailAndIqamaNum({ email });
    if (!verifyEmailAndIqamaNumRs.isSuccessful) {
      return { isSuccessful: false, message: verifyEmailAndIqamaNumRs.message };
    }
    return { isSuccessful: true, message: '' };
  }
  const onSubmit = async (values) => {
    const { taheelOtp, phoneNumber } = values;
    const { idNumber, day, month, year } = values;
    const response = { isSuccessful: true, message: '' };
    setPhoneNum(phoneNumber);
    const birthDate = year + '' + numberToDay(month) + numberToDay(day);
    if (phoneNumber && !taheelOtp && !is) {
      const sendSmsRs = await requestOTPPhoneNum(idNum, phoneNumber);
      if (!sendSmsRs.isSuccessful) {
        return { isSuccessful: false, message: sendSmsRs.message };
      }
      values.isTaheelValidate = true;
      setIs(true);
      return response;
    }

    if (taheelOtp) {
      const validateSmsRs = await AuthOTPPhoneNum(phoneNumber, idNum, taheelOtp);
      if (!validateSmsRs.isSuccessful) {
        SetErrMessage(validateSmsRs.message);
        return { isSuccessful: false, message: validateSmsRs.message };
      }
      const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      await sleep(300);
      const requestBody = {
        email: values.email,
        nationality: values.nationality,
        idNumIqamaNum: idNumber,
        phoneNumber: values.phoneNumber,
        DOB: birthDate,
        userType: userType,
        userPassword: values.password,
      };
      const url = '/taheel-apis-users-registration-v2';
      const res = await APIRequest({ requestBody, url });
      if (!res.isSuccessful) {
        return { isSuccessful: false, message: res.message };
      }
    }
    handleClickOpen('لقد تم تسجيلك بنجاح', '');
    return { isSuccessful: true, message: '' };
  };

  const Condition = ({ when, children }) => (
    <Field name={when} subscription={{ value: true }}>
      {(value) => (is ? children : null)}
    </Field>
  )
  const Condition2 = ({ when, children, is }) => (
    <Field name={when} subscription={{ value: true }}>
      {({ input: { value } }) => (value == is ? children : null)}
    </Field>
  )
  const handleClickOpen = (dialogContent, dialogTitle) => {
    setDialogContent(dialogContent);
    setDialogTitle(dialogTitle);
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    navigate('/login', { replace: true });
  };
  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundSize: "cover"
      }}
    >
      <>
      <Helmet>
        <title>Registration</title>
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

            backgroundSize: "cover"
          }}
        >
          <Container
            maxWidth="sm"
          >
            <Box sx={{
              mt: '2%',
              backgroundColor: 'white',
              borderRadius: 5,
              paddingRight: 3,
              paddingLeft: 3,
              boxShadow: '5px 10px 18px #ecf1f5'
            }}>
              <Box
                className={classes.root}
                sx={{ mb: 5, mr: 1.5 }}
              >
                <Grid container spacing={3} sx={{ margin: "0 auto", width: "auto" }}>
                  <Grid item xs={6}>
                    <Avatar
                      className={classes.large + ' ' + classes.avatarHover}
                      onClick={() => {
                        setUserType("4");
                        setSelectedAvatar('beneficiary'),
                          setColor({ ...avtarColor, beneficiaryAvatar: '#214256', centerAvatar: '#c8d9d9', employeeAvatar: '#c8d9d9' })
                      }}
                      sx={{
                        height: '85px', width: '85px', backgroundColor: avtarColor.beneficiaryAvatar, cursor: "pointer"
                      }}
                    >
                      أفراد
                    </Avatar>
                  </Grid>
                  <Grid item xs={6}>
                    <Avatar
                      className={classes.large + ' ' + classes.avatarHover}
                      onClick={() => {
                        setUserType("2");
                        setSelectedAvatar('center'),
                          setColor({ ...avtarColor, beneficiaryAvatar: '#c8d9d9', centerAvatar: '#214256', employeeAvatar: '#c8d9d9' })
                      }} sx={{
                        height: '85px', width: '85px', backgroundColor: avtarColor.centerAvatar, cursor: "pointer"
                      }}
                    >
                      مركز
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
                      تسجيل جديد لمستفيد
                    </Typography>

                  )
                  }
                  {selectedAvatar === "center" && (
                    <Typography
                      color="textPrimary"
                      variant="h2"
                    >
                      تسجيل جديد لمركز
                    </Typography>

                  )
                  }
              </Box>
              <CardContent sx={{ padding: "0px" }}>
                {errMessage && (
                  <Alert variant="outlined" severity="error">
                    {errMessage}
                  </Alert>
                )}
                <FinalFromWizard // pass initialValues, onSubmit and 4 childrens
                  initialValues={{
                    disabledBackButt: true,
                    lastPageErrorHandling: false,
                    agree: [false],
                    isTaheelValidate: false
                  }}
                  onSubmit={onSubmit}
                  enableValidate={true}
                >
                  <FinalFromWizard.Page
                    label=""
                    validate={CitizenValidate}
                    nextFun={(values) => validateAPIFunc(values)}
                  >
                    <CitizenInfo
                      Condition={Condition2}
                    />
                  </FinalFromWizard.Page>

                  <FinalFromWizard.Page
                    nextFun={(values) => validateOtp(values)}
                    validate={absherValidate}
                    label=""
                  >
                    <AbsherOtp data={idNum}
                      Condition={Condition} />
                  </FinalFromWizard.Page>

                  <FinalFromWizard.Page label=""
                    validate={regitrationValidate}
                    nextFun={(values) => validateEmail(values)}
                  >
                    <RegistrationInfo
                      Condition={Condition}
                    />
                  </FinalFromWizard.Page>

                  <FinalFromWizard.Page
                    nextFun={(values) => taheelOTPReq(values)}

                    validate={TaheelOtpValidate}
                    label=""
                  >
                    <TaheelOtp data={idNum} phoneNum={phoneNum}
                      Condition={Condition}
                    />
                  </FinalFromWizard.Page>
                </FinalFromWizard>
              </CardContent>
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
                    paddingTop: '16px',
                  }}
                >
                  لديك حساب على المنصة ؟
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                    sx={{
                      textDecoration: 'underline'
                    }}
                  >
                    تسجيل الدخول
                  </Link>
                </Typography>
              </Box>
              <AlertDialog dialogContent={dialogContent} dialogTitle={dialogTitle} open={open} onClose={handleClose} acceptBtnName="تم" />
            </Box>
          </Container>
        </Box>
      </>
    </Box>
  );
};

export default Register;