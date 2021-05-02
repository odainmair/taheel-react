/* eslint-disable */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Container,
} from '@material-ui/core';
import RegisterFromWizard from '../components/wizard/RegistrationFormWizard';
import { Field } from 'react-final-form';
import useRequest from '../hooks/use-request';
import CitizenInfo from './services/temporary-license/sections/Registration/CitizenInfo';
import AbsherOtp from './services/temporary-license/sections/Registration/AbsherOtp';
import TaheelOtp from './services/temporary-license/sections/Registration/TaheelOtp';
import RegistrationInfo from './services/temporary-license/sections/Registration/RegistrationInfo';
import APIRequest from 'src/api/APIRequest';
import Summary from './services/temporary-license/sections/Summary';
import AlertDialog from 'src/components/AlertDialog';

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
  const [dialogContent, setDialogContent] = React.useState("");
  const [dialogTitle, setDialogTitle] = React.useState("");
  const [counter, setCounter] = React.useState(1);
  // const [otp, setOtp] = React.useState(Math.floor(Math.random() * (1000000 - 100000) + 100000));
  const [otp, setOtp] = React.useState('000000');
  const [successful, setSuccessful] = React.useState(false);
  const [info, setInfo] = React.useState({});
  const [avtarColor, setColor] = React.useState({
    rightAvatar: '#c8d9d9',
    leftAvatar: '#c8d9d9',
  });
  const navigate = useNavigate();
  const { doRequest, errors } = useRequest({
    url: 'https://inspiredemo2.appiancloud.com/suite/webapi/taheel-apis-utilities-sendSms-v2',
    method: 'post',
    body: {

    },
    onSuccess: () => console.log('DOOOONNNNEEE')
  });
  const validateCitizenFunc = async (idNumber, birthDate) => {
    const url = "https://inspiredemo2.appiancloud.com/suite/webapi/taheel-apis-utilities-validateCitizen-v2"
    const requestBody = {
      IDNo: idNumber,
      HijriDateOfBirth: birthDate
    };
    const response = await APIRequest({ requestBody, url });
    return response;
  }
  const validateAPIFunc = async values => {
    const { idNumber, day, month, year } = values;
    console.log("idNumber", idNumber)

    function numberToDay(day) {
      return ('0' + day).slice(-2);
    }
    const birthDate = year + "" + numberToDay(month) + numberToDay(day)
    const response = { isSuccessful: true, message: '' };
    const validateCitRs = await validateCitizenFunc(idNumber, birthDate);
    if (!validateCitRs.isSuccessful) {
      return { isSuccessful: false, message: validateCitRs.message }
    }
    const data = validateCitRs.responseBody.data.Body;
    console.log("datadata:", JSON.stringify(data));
    setInfo(data)
    console.log("values.inf:", values.info);
    const { firstName, secondName, thirdName, lastName } = data.Name;
    console.log('OTP::', otp);
    sendSms('0527212403')
    return response;
  }

  // OTP Checking
  const validateOtp = async values => {
    console.log("values====>", values)
    const { AbsherOtp } = values;
    if (otp == AbsherOtp)
      return { isSuccessful: true, message: '' }
    else
      return { isSuccessful: false, message: 'رمز التحقق المدخل غير صحيح' }
  }

  const validateTaheelOtp = async values => {
    setCounter(0)
    return sendSms(values.phoneNumber)
  }

  const sendSms = async recipient => {
    const bodyRequest = {
      recipient: recipient,
      message: `Hi, use this OTP to validate your register: ${otp}.`
    };
    const url = 'https://inspiredemo2.appiancloud.com/suite/webapi/taheel-apis-utilities-sendSms-v2'
    const response = await doRequest(JSON.stringify(bodyRequest));
    console.log('response::', `Hi, use this OTP to validate your register: ${otp}.`, response);
    return response

  }

  // const validateTaheelOtp = async values => {
  //   console.log("values====>", values)
  //   const { taheelOtp, phoneNumber } = values;
  //   setCounter(0)
  //   console.log("counter", counter)
  //   // const realOtp = Math.floor(Math.random() * (1000000 - 100000) + 100000);
  //   const realOtp = '000000';
  //   console.log('OTP::', realOtp);

  //   const bodyRequest = {
  //     recipient: phoneNumber,
  //     message: `Hi, use this OTP to validate your login: ${realOtp}.`
  //   };
  //   const url = 'https://inspiredemo2.appiancloud.com/suite/webapi/taheel-apis-utilities-sendSms-v2'
  //   const response = await APIRequest({ bodyRequest, url });
  //   console.log('response::', response);
  //   if (realOtp == taheelOtp)
  //     return { isSuccessful: true, message: '' }

  //   else
  //     return { isSuccessful: false, message: 'رمز التحقق المدخل غير صحيح' }

  // }



  const onSubmit = async (values) => {
    // console.log("valuesvaluesvalues =>>>",.isSuccessful)
    const { taheelOtp } = values;
    //  console.log("successful",successful)
    console.log('otp == taheelOtp', otp == taheelOtp, "taheelOtp", taheelOtp);
    if (otp == taheelOtp) {
      // if (values.counter ===2) {
      // console.log("valuesvaluesvalues",values)
      const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      await sleep(300);
      // console.log(" values.ownerName", values.ownerName)
      const bodyRequest = {
        centerData: {
          firstName: info.Name.firstName,
          secondName: info.Name.secondName,
          thirdName: info.Name.thirdName,
          lastName: info.Name.lastName,
          email: values.email,
          idNumIqamaNum: info.IdExpiry.IdNo,
          sponsorName: 'sponsorName',
          appianUsername_r: 'appianUsername_r',
          phoneNumber: values.phoneNumber,
          DOB: info.BirthHijriDate,
          userType: 'userType',
          userPassword: values.password,
          expiryDate: info.IdExpiry,
          gender: info.Gender,
          profession: info.IdExpiry.Profession,
          maritalStatus: info.IdExpiry.MaritalStatus,
          placeOFBirth: info.BirthPlace,
          Nationality: 'Nationality'
        }
      };
      console.log("bodyRequest", bodyRequest)
      const url = 'https://inspiredemo2.appiancloud.com/suite/webapi/taheel-apis-users-registration-v2'
      const response = await APIRequest({ bodyRequest, url });
      if (!response.isSuccessful) {
        return { isSuccessful: false, message: validateCitRs.message }
      }
      // const response = await doRequest(bodyRequest);
      handleClickOpen('لقد تم تسجيلك بنجاح', 'هجري');
      //window.alert(` تم تقديم طلبك بنجاح، رقم الرخصة ${response.center.ID} وتاريخ انتهاء الرخصة ${response.center.expirationDate} هجري`);
      // }
      return { isSuccessful: true, message: '' }
    }
    else
      return { isSuccessful: false, message: 'رمز التحقق المدخل غير صحيح' }

  };

  // const Condition = ({ when, is, children }) => (
  //   <Field name={when} subscription={{ value: true }}>
  //     {({ input: { value } }) => (value === is ? children : null)}
  //   </Field>
  // )

  const handleClickOpen = (dialogContent, dialogTitle) => {
    setDialogContent(dialogContent);
    setDialogTitle(dialogTitle)
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    navigate('/login', { replace: true });
  };

  // console.log('ttest');
  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        // height: '100%',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="sm"
        sx={{
          mt: '2%',
          mb: '2%',
          backgroundColor: 'white',
          borderRadius: 5,
          padding: 3,
          boxShadow: '5px 10px 18px #ecf1f5'
        }}>

        {/* <Box
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: 5,
                    padding: 8,
                    boxShadow: '5px 10px 18px #ecf1f5'
                  }}
                > */}
        {/* <Card> */}

        <Box
          className={classes.root}
          sx={{ mb: 5, mr: 12, }}
        >
          <Avatar
            className={classes.large}
            onClick={() => setColor({ ...avtarColor, rightAvatar: '#214256', leftAvatar: '#c8d9d9' })}
            sx={{
              height: '70px', width: '70px', marginLeft: '40%', backgroundColor: avtarColor.rightAvatar
            }}
          >
            مستفيد
                    </Avatar>

          <Avatar
            className={classes.large}
            onClick={() => setColor({ ...avtarColor, leftAvatar: '#214256', rightAvatar: '#c8d9d9' })}
            sx={{
              height: '70px', width: '70px', marginLeft: '20%', backgroundColor: avtarColor.leftAvatar
            }}
          >
            مركز
                    </Avatar>
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
          <RegisterFromWizard    /// pass initialValues, onSubmit and 4 childrens
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
              label="">
              <AbsherOtp />
            </RegisterFromWizard.Page>
            <RegisterFromWizard.Page label="">
              <RegistrationInfo />
            </RegisterFromWizard.Page>
            <RegisterFromWizard.Page
              label=""
              nextFun={(values) => validateTaheelOtp(values)}
            >
              <TaheelOtp counter={counter}


              />
            </RegisterFromWizard.Page>
          </RegisterFromWizard>
        </CardContent>
        {/* </Card> */}

        <AlertDialog dialogContent={dialogContent} dialogTitle={dialogTitle} open={open} onClose={handleClose} acceptBtnName="تم" />
        {/* </Box> */}
      </Container>
    </Box>
  );
};

export default CreateTemporaryLicense;
