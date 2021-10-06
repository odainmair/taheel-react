/* eslint-disable */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import {
  CardContent,
  Typography,
  Box,
  Container
} from '@material-ui/core';
import FinalFromWizard from '../../components/wizard/FinalFormWizard';
import CitizenInfo from './copmonents/CitizenInfo';
import AbsherOtp from './copmonents/AbsherOtp';
import PasswordConfirmation from './copmonents/PasswordConfirmation';
import AlertDialog from 'src/components/AlertDialog';
import DashboardNavbar from '../../components/DashboardNavbar';
import MainNavbar from '../../components/MainNavbar';
import { CitizenValidate, absherValidate, confirmationValidate } from './ForgetPasswordUtils'
import { changePassword, AbsherOTP, AbsherOTPAuth } from './data/ForgetPasswordApi'
import TopHeader from '../Registration/components/TopHeader';

const ForgetPassword = () => {

  const [open, setOpen] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState('');
  const [dialogTitle, setDialogTitle] = React.useState('');
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [info, setInfo] = React.useState('');
  const navigate = useNavigate();

  const absherOTPRequest = async (values) => {
    const { IqamaNumber } = values;
    setInfo(IqamaNumber);
    const sendOTP = await AbsherOTP(IqamaNumber);
    console.log("qqqqqqqqqqqqq", sendOTP.isSuccessful)

    if (!sendOTP.isSuccessful) {
      return { isSuccessful: false, message: sendOTP.message };
    }
    return { isSuccessful: true, message: '' };
    // return { isSuccessful: true, message: '' }
  };

  const validateOtp = async (values) => {
    const { AbsherOtp } = values;
    const AbsherAuth = await AbsherOTPAuth(info, AbsherOtp);
    if (!AbsherAuth.isSuccessful) {
      return { isSuccessful: false, message: AbsherAuth.message };
    }
    return { isSuccessful: true, message: '' };
  };

  const onSubmit = async (values) => {
    const { oldPassword, password, passwordConfirmation } = values
    changePassword(info, oldPassword, password, passwordConfirmation);
    handleClickOpen('لقد تم تغيير كلمة السر بنجاح', '');
    return { isSuccessful: true, message: '' };
    return response
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
              <CardContent sx={{ padding: "0px" }}>
                <FinalFromWizard // pass initialValues, onSubmit and 4 childrens
                  initialValues={{
                    disabledBackButt: true,
                    lastPageErrorHandling: false,
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
                  <FinalAbsherPage
                    nextFun={(values) => validateOtp(values)}
                    validate={absherValidate}
                    label=""
                  />
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

const FinalAbsherPage = ({ values }) => (
  <>
    <AbsherOtp
      values={values}
    />
  </>
);


export default ForgetPassword;
