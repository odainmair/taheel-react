// import React from 'react';
// import {
//   Box,
//   CardContent,
//   Typography,
//   Container
// } from '@material-ui/core';
// import PropTypes from 'prop-types';
// import FinalFromWizard from 'src/components/wizard/FinalFormWizard';
// import AlertDialog from 'src/components/AlertDialog';
// import AbsherOtp from 'src/pages/forgetPassword/copmonents/AbsherOtp';
// import PhoneNumberInfo from './PhonNumberInfo';
// import { ChangePhoneNumValidate, smsOTPValidate } from '../AccountUtils';
// import { AuthOTPPhoneNum, requestOTPPhoneNum } from '../data/AccountApi';
// import SmsOTP from './SmsOTP';

// const ChangePhonenumber = () => {
//   const [info, setInfo] = React.useState('');
//   const [open, setOpen] = React.useState(false);

//   const OTPRequest = async (values) => {
//     const { newPhoneNumber } = values;
//     const response = { isSuccessful: true, message: '' };
//     setInfo(newPhoneNumber);
//     const smsOTP = await requestOTPPhoneNum(newPhoneNumber);
//     if (!smsOTP.isSuccessful) {
//       return { isSuccessful: false, message: smsOTP.message };
//     }
//     return response;
//     // return { isSuccessful: true, message: '' }
//   };
//   const validateOtp = async (values) => {
//     const { SmsOTP } = values;
//     const response = { isSuccessful: true, message: '' };
//     // const OTPAuth = await AuthOTPPhoneNum(info, SmsOTP);
//     // if (!OTPAuth.isSuccessful) {
//     //   return { isSuccessful: false, message: OTPAuth.message };
//     // }
//     console.log("qwqwqwqwqwqwqw");
//     return response;
//   };
//   // const handleClickOpen = () => {
//   //   setOpen(true);
//   // };
//   const handleClose = () => {
//     onClose();
//   };
//   const onSubmit = async (values) => {
//     const { SmsOTP } = values;
//     validateOtp(SmsOTP);
//     handleClose();
//     // handleClickOpen('لقد تم تغيير كلمة السر بنجاح', '');

//   };

//   return (
//     <>
//       <Box>
//         <Container >
//           <Box >
//             <Box sx={{ mb: 3, textAlign: 'center' }}>
//               <Typography
//                 color="textPrimary"
//                 variant="h2"
//               >
//                 تغيير رقم الجوال
//               </Typography>
//             </Box>
//             <CardContent sx={{ padding: "0px" }}>
//               <FinalFromWizard // pass initialValues, onSubmit and 4 childrens
//                 initialValues={{
//                   disabledBackButt: true,
//                   lastPageErrorHandling: false,
//                   agree: [false]
//                 }}
//                 onSubmit={onSubmit}
//               >
//                 <FinalFromWizard.Page
//                   label=""
//                   nextFun={(values) => OTPRequest(values)}
//                   validate={ChangePhoneNumValidate}
//                 >
//                   <PhoneNumberInfo />
//                 </FinalFromWizard.Page>

//                 <FinalFromWizard.Page
//                   label=""
//                   validate={smsOTPValidate}
//                 >
//                   <SmsOTP />
//                 </FinalFromWizard.Page>
//               </FinalFromWizard>
//             </CardContent>
//             {/* <AlertDialog dialogContent={dialogContent} dialogTitle={dialogTitle} open={open} onClose={handleClose} acceptBtnName="تم" /> */}
//           </Box>
//         </Container>
//       </Box>

//     </>
//   );
// };
// export default ChangePhonenumber;
// // ChangePhonenumber.propTypes = {
// //   values: PropTypes.object.isRequired,
// // };
// // const FinalAbsherPage = ({ values }) => (
// //   <>
// //     <AbsherOtp
// //       values={values}
// //     />
// //   </>
// // );



