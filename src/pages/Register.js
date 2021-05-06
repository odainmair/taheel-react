/* eslint-disable */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import {
  CardContent,
  Typography,
  Box,
  Container,
} from '@material-ui/core';
import RegisterFromWizard from '../components/wizard/RegistrationFormWizard';
import useRequest from '../hooks/use-request';
import CitizenInfo from './services/temporary-license/sections/Registration/CitizenInfo';
import AbsherOtp from './services/temporary-license/sections/Registration/AbsherOtp';
import TaheelOtp from './services/temporary-license/sections/Registration/TaheelOtp';
import RegistrationInfo from './services/temporary-license/sections/Registration/RegistrationInfo';
import {APIRequest} from 'src/api/APIRequest';
import AlertDialog from 'src/components/AlertDialog';
import moment from 'moment-hijri';

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
}));

const CreateTemporaryLicense = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState('');
  const [dialogTitle, setDialogTitle] = React.useState('');
  const [counter, setCounter] = React.useState(1);
  // const [otp, setOtp] = React.useState(Math.floor(Math.random() * (1000000 - 100000) + 100000));
  const [otp, setOtp] = React.useState('000000');
  const [info, setInfo] = React.useState({});
  const [avtarColor, setColor] = React.useState({
    rightAvatar: '#c8d9d9',
    leftAvatar: '#214256',
  });
  const navigate = useNavigate();
  const { doRequest, errors } = useRequest({
    url: 'https://inspiredemo2.appiancloud.com/suite/webapi/taheel-apis-utilities-sendSms-v2',
    method: 'post',
    body: {
    },
    onSuccess: (value) => console.log('DOOOONNNNEEE',value)
  });
  const validateCitizenFunc = async (idNumber, birthDate) => {
    const url = 'https://inspiredemo2.appiancloud.com/suite/webapi/taheel-apis-utilities-validateCitizen-v2';
    const requestBody = {
      IDNo: idNumber,
      HijriDateOfBirth: birthDate
    };
    const response = await APIRequest({ requestBody, url });
    return response;
  };
  const validateAPIFunc = async (values) => {
    const { idNumber, day, month, year } = values;;
    function numberToDay(day) {
      return ('0' + day).slice(-2);
    }
    const birthDate = year + '' + numberToDay(month) + numberToDay(day);
    const response = { isSuccessful: true, message: '' };
    const validateCitRs = await validateCitizenFunc(idNumber, birthDate);
    if (!validateCitRs.isSuccessful) {
      return { isSuccessful: false, message: validateCitRs.message };
    }
    const data = validateCitRs.responseBody.data.Body;
    console.log(JSON.stringify(data))
    setInfo(data);
    sendSms('0527212403');
    return response;
  };

  // OTP Checking
  const validateOtp = async (values) => {
    const { AbsherOtp } = values;
    if (otp == AbsherOtp)
      return { isSuccessful: true, message: '' }
    return { isSuccessful: false, message: 'رمز التحقق المدخل غير صحيح' };
  };

  const sendSms = async (recipient) => {
    const bodyRequest = {
      recipient: recipient,
      message: `Hi, use this OTP to validate your register: ${otp}.`
    };
    const response = await doRequest(JSON.stringify(bodyRequest));
    return response;
  };

  const validateTaheelOtp = async values => {
     setCounter(0)
     await sendSms(values.phoneNumber);
     return { isSuccessful: true, message: '' };
  };

  const onSubmit = async (values) => {
    const { taheelOtp } = values
    console.log("otp == taheelOtp",otp == taheelOtp,"taheelOtp",taheelOtp);
    if (otp == taheelOtp) { 
      const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      await sleep(300);
      const requestBody = {
          firstName: info.Name.FirstName,
          secondName: info.Name.SecondName,
          thirdName: info.Name.ThirdName,
          lastName: info.Name.LastName,
          email: values.email,
          idNumIqamaNum: info.IdExpiry.IdNo,
          phoneNumber: values.phoneNumber,
          DOB: moment(info.BirthHijriDate,'iYYYYiMMiDD').format('iDD/iMM/iYYYY'),
          userType: 'center owner',
          userPassword: values.password,
          expiryDate: moment(info.IdExpiry.HijriDate, 'iYYYYiMMiDD').format('iDD/iMM/iYYYY'), 
          gender: info.Gender,
          profession: info.IdExpiry.Profession,
          maritalStatus: info.IdExpiry.MaritalStatus,
          placeOFBirth: info.BirthPlace
      };
      const url = 'https://inspiredemo2.appiancloud.com/suite/webapi/taheel-apis-users-registration-v2';
      const response = await APIRequest({ requestBody, url });
      if (!response.isSuccessful) {
        return { isSuccessful: false, message: validateCitRs.message };
      }
      handleClickOpen('لقد تم تسجيلك بنجاح', '');
      return { isSuccessful: true, message: '' };
    }
    return { isSuccessful: false, message: 'رمز التحقق المدخل غير صحيح' };
  };

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
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center'
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          mt: '2%',
          mb: '2%',
          backgroundColor: 'white',
          borderRadius: 5,
          padding: 3,
          boxShadow: '5px 10px 18px #ecf1f5'
        }}
      >
        <Box
          className={classes.root}
          sx={{ mb: 5, mt:5, mr: 8,textAlign: 'center' }}
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
            التسجيل
          </Typography>
        </Box>
        {/* <Divider /> */}
        <CardContent>
          <RegisterFromWizard // pass initialValues, onSubmit and 4 childrens
            initialValues={{
              centerType: '1',
              beneficiaryCategory: '1',
              requestType: '1'
            }}
            onSubmit={onSubmit}
            counter={counter}
          >
            <RegisterFromWizard.Page
              label=""
              nextFun={(values) => validateAPIFunc(values)}
            >
              <CitizenInfo />
            </RegisterFromWizard.Page>
            <RegisterFromWizard.Page
              nextFun={(values) => validateOtp(values)}
              label=""
            >
              <AbsherOtp />
            </RegisterFromWizard.Page>
            <RegisterFromWizard.Page label="">
              <RegistrationInfo />
            </RegisterFromWizard.Page>
            <RegisterFromWizard.Page
              label=""
              nextFun={(values) => validateTaheelOtp(values)}
            >
              <TaheelOtp counter={counter} />
            </RegisterFromWizard.Page>
          </RegisterFromWizard>
        </CardContent>
        <AlertDialog dialogContent={dialogContent} dialogTitle={dialogTitle} open={open} onClose={handleClose} acceptBtnName="تم" />
      </Container>
    </Box>
  );
};

export default CreateTemporaryLicense;
