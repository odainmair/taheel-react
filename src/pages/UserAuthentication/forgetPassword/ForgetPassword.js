/* eslint-disable */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import {
  CardContent,
  Typography,
  Box,
  Alert,
  Container
} from '@material-ui/core';
import FinalFromWizard from '../../../components/wizard/FinalFormWizard';
import CitizenInfo from './copmonents/CitizenInfo';
import AbsherOtp from './copmonents/AbsherOtp';
import PasswordConfirmation from './copmonents/PasswordConfirmation';
import AlertDialog from 'src/components/AlertDialog';
import DashboardNavbar from '../../../components/DashboardNavbar';
import MainNavbar from '../../../components/MainNavbar';
import { CitizenValidate, absherValidate, confirmationValidate } from './ForgetPasswordUtils';
import { AbsherOTP, AbsherOTPAuth, ChangePassword  } from './data/ForgetPasswordApi';
import TopHeader from '../../Registration/components/TopHeader';

const ForgetPassword = () => {

  const [open, setOpen] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState('');
  const [dialogTitle, setDialogTitle] = React.useState('');
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [info, setInfo] = React.useState('');
  const [errMessage, SetErrMessage] = useState('');

  const navigate = useNavigate();

  const absherOTPRequest = async (values) => {
    const { IqamaNumber } = values;
    setInfo(IqamaNumber);
    const response = { isSuccessful: true, message: '' };
    const sendOTP = await AbsherOTP(IqamaNumber);
    if (!sendOTP.isSuccessful) {
      SetErrMessage(sendOTP.message);
      return { isSuccessful: false, message: sendOTP.message };
    }
    return response;
  };

  const validateOtp = async (values) => {
    const { AbsherOtp } = values;
    const AbsherAuth = await AbsherOTPAuth(info, AbsherOtp);
    if (!AbsherAuth.isSuccessful) {
      SetErrMessage(AbsherAuth.message);
      return { isSuccessful: false, message: AbsherAuth.message };
    }
    return { isSuccessful: true, message: '' };
  };

  const onSubmit = async (values) => {
    const { oldPassword, password, passwordConfirmation } = values;
    // const response = { isSuccessful: true, message: '' };
    const changePassword = await ChangePassword(info, oldPassword, password, passwordConfirmation);

    if (!changePassword.isSuccessful) {
      console.log("1111111111111111111", changePassword.message);
      // SetErrMessage("hiiiiiiiiiiiiiiiiiiiiiiiiii");
      SetErrMessage(changePassword.message);
      return { isSuccessful: false, message: changePassword.message };
    }
    handleClickOpen('لقد تم تغيير كلمة السر بنجاح', '');
    return { isSuccessful: true, message: '' };
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
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundSize: "cover"
      }}
    >
      <>
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
          <Container
            maxWidth="sm"
          >
            <Box sx={{
              mt: '2%',
              backgroundColor: 'white',
              borderRadius: 5,
              padding: 3,
              boxShadow: '5px 10px 18px #ecf1f5'
            }}>
              <TopHeader />

              <Box sx={{ mb: 3, textAlign: 'center' }}>
                <Typography
                  color="textPrimary"
                  variant="h2"
                >
                  إعادة تعيين كلمة السر الخاصة بك
                </Typography>
              </Box>
              <CardContent sx={{ padding: "3px" }}>
                <FinalFromWizard // pass initialValues, onSubmit and 4 childrens
                  initialValues={{
                    disabledBackButt: true,
                    lastPageErrorHandling: true,
                    agree: [false]
                  }}
                  onSubmit={onSubmit}
                >
                  <FinalFromWizard.Page
                    label=""
                    validate={CitizenValidate}
                    nextFun={(values) => absherOTPRequest(values)}
                  >
                    <CitizenInfo />
                  </FinalFromWizard.Page>
                  <FinalFromWizard.Page
                    label=""
                    validate={absherValidate}
                    nextFun={(values) => validateOtp(values)}
                  >
                    <AbsherOtp info={info} />
                  </FinalFromWizard.Page>
                  <FinalFromWizard.Page
                    label=""
                    validate={confirmationValidate}
                  >
                    <PasswordConfirmation />
                  </FinalFromWizard.Page>
                </FinalFromWizard>
              </CardContent>
              <AlertDialog dialogContent={dialogContent} dialogTitle={dialogTitle} open={open} onClose={handleClose} acceptBtnName="تم" />
            </Box>
          </Container>
        </Box>
      </>
    </Box>
  );
};

// const FinalAbsherPage = ({ values }) => (
//   <>
//     <AbsherOtp
//       values={values}
//     />
//   </>
// );
export default ForgetPassword;
