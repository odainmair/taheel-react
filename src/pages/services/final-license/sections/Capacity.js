/* eslint-disable */
import { useState, useEffect } from 'react';
import {
	Grid,
	Button,
	Alert,
	Typography,
	Box,
	CircularProgress,
} from '@material-ui/core';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';
import { TextField as TextFieldFinal, Select } from 'final-form-material-ui';
import { calculation } from '../services/finalLicenseAPI'
import { ContentField } from '../services/finalLicenseUtil'
import { checkIsNumber } from 'src/utils/inputValidator';
const Capacity = ({ editMode, Condition, values, setField, setIsEnableNextBtn }) => {

	const [calculatedData, setCalculatedData] = useState(false);
	const [errMessage, SetErrMessage] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
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
		if (!values.beneficiariesNum || values.beneficiariesNum <= 0 || !checkIsNumber(values.beneficiariesNum)) {
			SetErrMessage('يرجى ادخال عدد المستفيدين الفعلي صحيح');
			setLoading(false);
			return;
		}
		if (!values.buildingArea || values.buildingArea <= 0 || !checkIsNumber(values.buildingArea)) {
			SetErrMessage('يرجى ادخال مساحة مسطح البناء صحيح');
			setLoading(false);
			return;
		}
		if (!values.basementArea || values.basementArea <= 0 || !checkIsNumber(values.basementArea)) {
			SetErrMessage('يرجى ادخال مساحة القبو صحيح');
			setLoading(false);
			return;
		}
		if (parseInt(values.buildingArea) <= parseInt(values.basementArea)) {
			SetErrMessage('مساحة القبو يجب ان تكون أقل من مساحة مسطح البناء');
			setLoading(false);
			return
		}
	/*	if (values.beneficiariesNum > parseInt(values.capacity)) {
			SetErrMessage('عدد المستفيدين يجب ان لا يتجاوز الطاقة الاستعابية');
			setLoading(false);
			return
		}*/

		const response = await calculation(values.buildingArea, values.basementArea);
		if (!response.isSuccessful) {
			setIsEnableNextBtn(false);
			SetErrMessage(response.message);
			setCalculatedData(false);
		}
		else {
			setField('capacity', response.responseBody.body.carryingCapacity.toFixed(0));
			setField('financialGuarantee', `${response.responseBody.body.financialGuarantee.toFixed(3)} ر.س.`);
			setCalculatedData(true);
			setIsEnableNextBtn(true);

		}
		setLoading(false);
	}

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
										(مساحة مسطح البناء - مساحة القبو/10)
									</Alert>
								</Box>
							</Grid>

							<Grid
								item
								lg={12}
								md={12}
								xs={12}
							>
								< ContentField label='الضمان المالي' value={values.financialGuarantee} />
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