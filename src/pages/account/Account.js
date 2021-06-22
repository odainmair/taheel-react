import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Alert,
  CardContent
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import AccountProfileDetails from './components/AccountProfileDetails';
import FinalFromWizard from '../../components/wizard/FinalFormWizard';
import { PersonInfoValidate } from './AccountUtils';
import AccountFinalFrom from './components/AccountFinalForm';
import { ownerInfoUpdate, requestOTPPhoneNum } from './data/AccountApi';
import ChangePhonenumberDialog from './components/ChangePhonenumberDialog';
import { getCurrentUser, setCurrentUser } from 'src/utils/UserLocalStorage';
import { useNavigate } from 'react-router-dom';
import AlertDialog from 'src/components/AlertDialog';

const Account = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = React.useState('');
  const [dialogTitle, setDialogTitle] = React.useState('');
  const [errMessage, SetErrMessage] = useState('');
  const [OTP, setOTP] = useState('');
  const [isDisable, setIsDisable] = useState(false);

  const [num, setNum] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');

  const [open, setOpen] = useState(false);
  const { firstName, lastName, email, phoneNumber, idNumIqamaNum } = getCurrentUser();
  const [vals, setVals] = useState({
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phoneNumber,
    idNumIqamaNum: idNumIqamaNum,
  });


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClose2 = () => {
    setOpenDialog(false);
  };
 
  const handleClickOpen2 = (dialogContent, dialogTitle) => {
    setDialogContent(dialogContent);
    setDialogTitle(dialogTitle);
    setOpenDialog(true);
  };
  const handleCloseInfo = (value) => {
    setOpenDialog(false);
  };
  const callbackFunction2 = (childData) => {
    setIsDisable(childData);
    console.log(' is disable from parent ++++++++++++++++++', isDisable);

  }
  const callbackFunction = (childData) => {
    setOTP(childData);
  }

  const onSubmit = async (values) => {
    console.log("hiiiii222222222", vals.idNumIqamaNum);
    const response = { isSuccessful: true, message: '' };
    const { email, phoneNumber } = values;
    setNum(phoneNumber);
    setUpdatedEmail(email);
    if (vals.phone != phoneNumber) {

      const smsOTPRequest = await requestOTPPhoneNum(vals.idNumIqamaNum, phoneNumber);
      if (!smsOTPRequest.isSuccessful) {
        SetErrMessage(smsOTPRequest.message);
        return { isSuccessful: false, message: smsOTPRequest.message };
      }
      handleClickOpen();
    } else {
      const ownerInfoUpdateRequest = await ownerInfoUpdate(vals.idNumIqamaNum, email, vals.phone, '');
      if (!ownerInfoUpdateRequest.isSuccessful) {
        SetErrMessage(ownerInfoUpdateRequest.message);
        return { isSuccessful: false, message: ownerInfoUpdateRequest.message };
      }
      setCurrentUser({
        email: values.email,
        phoneNumber: values.phoneNumber,
      });
      handleClickOpen2('لقد تم حفظ المعلومات بنجاح', '');
      // navigate('/app/dashboard', { replace: true });

    }
    return response;
  }
  // useEffect (() => {
  //   getCurrentUser();
  // },[onSubmit]);
  return (
    <>
      <Helmet>
        <title>Account</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={3}
          >
            <Grid
              container
              lg={12}
              md={6}
              xs={12}
              marginTop={3}
            >
              <CardContent sx={{ padding: "0px", width: "98%" }}>
                {errMessage && (
                  <Alert variant="outlined" severity="error">
                    {errMessage}
                  </Alert>
                )}
                <AccountFinalFrom // pass initialValues, onSubmit and 4 childrens
                  initialValues={{
                    disabledBackButt: true,
                    lastPageErrorHandling: false,
                    agree: [false],
                  }}
                  isDisable={isDisable}
                  onSubmit={onSubmit}
                >
                  <AccountFinalFrom.Page
                    label=""
                    validate={PersonInfoValidate}
                  >
                    <AccountProfileDetails data={vals} setIsDisable={setIsDisable}
                    />
                  </AccountFinalFrom.Page>
                </AccountFinalFrom>

              </CardContent>
              <ChangePhonenumberDialog data={vals} num={num} updatedEmail={updatedEmail} parentCallback={callbackFunction} dialogContent={dialogContent} open={open} onClose={handleClose} />
              <AlertDialog dialogContent={dialogContent} onClose={handleClose2} open={openDialog} acceptBtnName="تم" />

            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}
export default Account;