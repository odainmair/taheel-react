/* eslint-disable */
import { useState, useEffect } from 'react';
import {
	Grid,
	Button,
	Alert,
	Typography,
	Box,
	Link,
	CircularProgress,
} from '@material-ui/core';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';
import { TextField as TextFieldFinal, Select } from 'final-form-material-ui';
import { calculation } from '../services/finalLicenseAPI'
import { ContentField } from '../services/finalLicenseUtil'
import { LICENSE_FORM_TYPES } from 'src/utils/enums'
import { checkIsNumber } from 'src/utils/inputValidator';
import numeral from 'numeral';
import { OnChange } from 'react-final-form-listeners';
import FinancialGuaranteeTerms from './FinancialGuaranteeTerms';
import TermsDialog from 'src/components/TermsDialog';

const Capacity = ({ editMode, Condition, values, setField, setIsEnableNextBtn }) => {
	const [open, setOpen] = useState(false);
	const [calculatedData, setCalculatedData] = useState(false);
	const [errMessage, SetErrMessage] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		console.log(`Capacity :: values.capacity: ${values.capacity}`)
		console.log(`Capacity :: values.beneficiariesNum: ${values.beneficiariesNum}`)
		if (values.capacity) {
			setIsEnableNextBtn(true);
			setCalculatedData(true);
		} else {
			setIsEnableNextBtn(false);
		}
	}, []);

	const calculate = async () => {
		setLoading(true);
		SetErrMessage('');
		
		const response = await calculation(values.buildingArea, values.basementArea);
		const carryingCapacity = response?.responseBody?.body?.carryingCapacity
		console.log(`Capacity :: values.capacity: ${values.capacity}`)
		console.log(`Capacity :: response.responseBody.body.carryingCapacity ${(carryingCapacity)}`)
		console.log(`Capacity numeral :: ${numeral(carryingCapacity).value()}`)
		console.log(`Is Capacity >= 1 :: ${numeral(carryingCapacity) >= 1}`)
		if (!response.isSuccessful) {
			setIsEnableNextBtn(false);
			SetErrMessage(response.message);
			setCalculatedData(false);
		}
		else {
			setField('capacity', numeral(carryingCapacity).format('00'));
			setField('financialGuarantee', `${numeral(response.responseBody.body.financialGuarantee).format('0,0.00')} ر.س.`);
			setCalculatedData(true);

			if(numeral(carryingCapacity).value() >= 1) {
				//	setField('capacity', response.responseBody.body.carryingCapacity.toFixed(2).toLocaleString('en-US', {maximumFractionDigits:2}));
				//setField('financialGuarantee', `${response.responseBody.body.financialGuarantee.toFixed(2).toLocaleString('en-US', {maximumFractionDigits:2})} ر.س.`);
					// setField('capacity', numeral(response.responseBody.body.carryingCapacity).format('00'));
					// setField('financialGuarantee', `${numeral(response.responseBody.body.financialGuarantee).format('0,0.00')} ر.س.`);
					setIsEnableNextBtn(true);
			}
			else {
				setIsEnableNextBtn(false);
				SetErrMessage('يرجى ادخال عدد المستفيدين الفعلي عدد صحيح أكبر من صفر');
			}
		}
		setLoading(false);

		if (!values.beneficiariesNum || !checkIsNumber(values.beneficiariesNum) || values.beneficiariesNum <= 0) {
			SetErrMessage('يرجى ادخال عدد المستفيدين الفعلي عدد صحيح أكبر من صفر');
			setIsEnableNextBtn(false);
			return;
		}
		if (!values.buildingArea || !checkIsNumber(values.buildingArea) || values.buildingArea <= 0) {
			SetErrMessage('يرجى ادخال مساحة مسطح البناء عدد صحيح');
			setIsEnableNextBtn(false);
			return;
		}
		if (!values.basementArea || !checkIsNumber(values.basementArea) || values.basementArea < 0) {
			SetErrMessage('يرجى ادخال مساحة القبو عدد صحيح');
			setIsEnableNextBtn(false);
			return;
		}
		if (parseInt(values.buildingArea) <= parseInt(values.basementArea)) {
			SetErrMessage('مساحة القبو يجب ان تكون أقل من مساحة مسطح البناء');
			setIsEnableNextBtn(false);
			return
		}
		console.log(`Capacity :: values.capacity: ${values.capacity}`)
		console.log(`Capacity :: values.beneficiariesNum: ${values.beneficiariesNum}`)
		console.log(`Capacity :: values.beneficiariesNum > values.capacity : ${values.beneficiariesNum > parseInt(values.capacity)}`)
		if (values.beneficiariesNum > parseInt(numeral(carryingCapacity).value())) {
			SetErrMessage('عدد المستفيدين يجب ان لا يتجاوز الطاقة الاستعابية');
			setIsEnableNextBtn(false);
			return
		}

	}

	const handleClickOpen = (dialogContent, dialogTitle) => {
		setOpen(true);
	  };
	  const handleClose = (value) => {
		setOpen(false);
	  };
	const termsLabel = (openDialog) => (
		<>
		  <Typography gutterBottom variant="h5" component="span">
		  الضمان المالي 
			<Link href="#" sx={{ color: '#147fbd' }} onClick={() => openDialog()}> (للاطلاع على الشروط والاحكام انقر هنا) </Link>
		  </Typography>
	  
		</>
	  )

	const handleOnChange = (val, nextVal) => {
		setIsEnableNextBtn(false);
	};

	return (

		<>
			<Grid
				container
				spacing={3}
				mt={3}
			>
				<Grid
					item
					md={12}
					xs={12}
				>
					{errMessage && (
						<Alert variant="outlined" severity="error">
							{errMessage}
						</Alert>
					)}
				</Grid>
				<Grid
					item
					md={6}
					xs={12}
				>
					<Field
						fullWidth
						label="عدد المستفيدين الفعلي"
						required
						name="beneficiariesNum"
						component={TextFieldFinal}
						type="number"
						variant="outlined"
						dir="rtl"
						className="custom-field"
					/>
					<OnChange name="beneficiariesNum">
					{(value, previous) => {
						handleOnChange(value, previous);
					}}			
					</OnChange>		
				</Grid>
				<Grid
					item
					md={6}
					xs={12}
					className="custom-label-field"
				>
					<Field
						fullWidth
						required
						label="مساحة مسطح البناء"
						name="buildingArea"
						component={TextFieldFinal}
						type="number"
						variant="outlined"
						dir="rtl"
						className="custom-field"
					/>
					<OnChange name="buildingArea">
					{(value, previous) => {
						handleOnChange(value, previous);
					}}			
					</OnChange>	
				</Grid>
				<Grid
					item
					md={6}
					xs={12}
					className="custom-label-field"
				>
					<Field
						fullWidth
						required
						label="مساحة القبو"
						name="basementArea"
						component={TextFieldFinal}
						type="number"
						variant="outlined"
						dir="rtl"
						className="custom-field"
					/>
					<OnChange name="basementArea">
					{(value, previous) => {
						handleOnChange(value, previous);
					}}			
					</OnChange>	
				</Grid>

				<Grid
					item
					md={6}
					xs={12}
				>
					<Button
						startIcon={loading ? <CircularProgress size="1rem" /> : null}
						variant='outlined'
						type="button"
						sx={{
							height: 55,
							backgroundColor: 'white',
							width: '100%',
							color: '#3c8084',
							':hover': {
								backgroundColor: '#3c8084',
								color: 'white',
							}
						}}
						onClick={calculate}
					>
						احتساب
					</Button>
				</Grid>
				<Grid
					item
					md={12}
					xs={12}
				>
					<Condition is={calculatedData || editMode}>
						<Grid
							container
							spacing={3}
							mt={3}
							mb={3}
						>
							<Grid
								item
								lg={12}
								md={12}
								xs={12}
							>
								< ContentField label='الطاقة الاستعابية' value={values.capacity} />
								<Box
									direction='rtl'
									className="custom-label-field"
								>
									<Alert severity="info" size="small">
										يتم حسابه من قبل المنصة:
										(مساحة مسطح البناء - مساحة القبو)/10
									</Alert>
								</Box>
							</Grid>

							<Grid
								item
								lg={12}
								md={12}
								xs={12}
							>
								< ContentField label={termsLabel(handleClickOpen)} value={values.financialGuarantee} />
								<Box
									direction='rtl'
									className="custom-label-field"
								>
									<Alert severity="info" size="small" dir="rtl" >
										يتم حسابه من قبل المنصة: (2000 ريال * عدد حقل " الطاقة الاستيعابية للمركز" ) لكل مستفيد من مراكز الرعاية النهارية أو التأهيل المهني حسب الطاقة الاستيعابية للمركز
									</Alert>
								</Box>
							</Grid>
						</Grid>
					</Condition>
				</Grid>
			</Grid>
      <TermsDialog setAgreeValue={()=>{}} dialogContent={FinancialGuaranteeTerms()} dialogTitle={"الشروط والاحكام"} open={open} onClose={handleClose} acceptBtnName="اوافق" />
		</>
	)
};

export default Capacity;

Capacity.propTypes = {
	Condition: PropTypes.func.isRequired,
	values: PropTypes.object.isRequired,
	setField: PropTypes.func.isRequired,
	setIsEnableNextBtn: PropTypes.func.isRequired,
};