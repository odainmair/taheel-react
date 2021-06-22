import React, { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogTitle,
	Box,
	Alert,
	CardContent,
	Typography,
	Container
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, setCurrentUser } from 'src/utils/UserLocalStorage';
import PropTypes from 'prop-types';
import { ChangePhoneNumValidate, smsOTPValidate } from '../AccountUtils';
import { AuthOTPPhoneNum, ownerInfoUpdate } from '../data/AccountApi';
import SmsOTP from './SmsOTP';
import AccountFinalFrom from './AccountFinalForm';
import AlertDialog from 'src/components/AlertDialog';

export default function ChangePhonenumberDialog(props) {
	const navigate = useNavigate();
	const [dialogCon, setDialogCon] = React.useState('');
	const [openDialog, setOpenDialog] = useState(false);
	const { onClose, dialogContent, open } = props;
	const [otp, setOtp] = useState('10000');
	const [errMessage, SetErrMessage] = useState('');

	const handleClose2 = () => {
		setOpenDialog(false);
	};

	const handleClickOpen2 = (dialogCon) => {
		setDialogCon(dialogCon);
		setOpenDialog(true);
	};
	props.parentCallback(otp);
	const handleClose = () => {
		onClose();
	};
	const onSubmit = async (values) => {
		const { SmsOTP } = values;
		// const SmsOTP = '100000';
		setOtp(SmsOTP);
		const response = { isSuccessful: true, message: '' };

		const OTPAuth = await AuthOTPPhoneNum(props.num, props.data.idNumIqamaNum, SmsOTP);
		if (!OTPAuth.isSuccessful) {
			return { isSuccessful: false, message: OTPAuth.message };
		}
		const ownerInfoUpdateRequest = await ownerInfoUpdate(props.data.idNumIqamaNum, props.updatedEmail, props.num, SmsOTP);
		if (!ownerInfoUpdateRequest.isSuccessful) {
			SetErrMessage(ownerInfoUpdateRequest.message);
			return { isSuccessful: false, message: ownerInfoUpdateRequest.message };
		}
		handleClose();
		setCurrentUser({
			...getCurrentUser(),
			email: props.updatedEmail,
			phoneNumber: props.num,
		});
		handleClickOpen2('لقد تم حفظ المعلومات بنجاح', '');
		// navigate('/app/dashboard', { replace: true });
		return response;
	};
	return (
		<>
		<Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
			<DialogContent>
				<>
					<Box>
						<Container >
							<Box >
								<Box sx={{ mb: 3, textAlign: 'center' }}>
									<Typography
										color="textPrimary"
										variant="h2"
									>
										رمز التحقق
									</Typography>
								</Box>
								<CardContent sx={{ padding: "0px" }}>
									{errMessage && (
										<Alert variant="outlined" severity="error">
											{errMessage}
										</Alert>
									)}
									<AccountFinalFrom // pass initialValues, onSubmit and 4 childrens
										initialValues={{
											disabledBackButt: true,
											lastPageErrorHandling: false,
											agree: [false]
										}}
										isDisable={true}

										onSubmit={onSubmit}
									>
										<AccountFinalFrom.Page
											label=""
											validate={smsOTPValidate}
										>
											<SmsOTP newNum={props.num} />
										</AccountFinalFrom.Page>
									</AccountFinalFrom>
								</CardContent>

							</Box>
						</Container>
					</Box>
				</>
			</DialogContent>

		</Dialog>
		<AlertDialog dialogContent={dialogCon} onClose={handleClose2} open={openDialog} acceptBtnName="تم" />

		</>
	);
}

ChangePhonenumberDialog.propTypes = {
	data: PropTypes.object.isRequired,
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	openDialog: PropTypes.bool.isRequired,
	num: PropTypes.string.isRequired,
	updatedEmail: PropTypes.string.isRequired,
	dialogContent: PropTypes.string.isRequired,
	parentCallback: PropTypes.func.isRequired,
};