/* eslint-disable no-unused-vars */
import {
	Grid,
	Button,
	MenuItem,
	Typography,
	Alert,
	CircularProgress,
} from '@material-ui/core';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';
import { TextField as TextFieldFinal, Select } from 'final-form-material-ui';
import { useState, useEffect } from 'react';
import { validateCompanyFunc } from '../services/finalLicenseAPI'
import { getMunicipalLicenseNoApi } from '../services/finalLicenseAPI'
import { CentertDetails } from '../services/finalLicenseAPI'
import { ContentField } from '../services/finalLicenseUtil'


const CenterDetails = ({  centerLicenceNumber, Condition, values, temporaryLicenses, setField }) => {

	console.log("props", temporaryLicenses)
	const [loading, setLoading] = useState(false)
	const [checkData, setCheckData] = useState(false)
	const [errMessage, SetErrMessage] = useState('')
	const editMode = centerLicenceNumber ? true :false


	const check = async () => {
		setLoading(true)
		await getMunicipalLicenseNo()
		await getCentertDetails()
		const response = await validateCompanyFunc(values.CRNumber)
		if (!response.isSuccessful) {
			SetErrMessage(response.message)
			setCheckData(false)
		}
		else {
			setField('isNextBtnDisabled',false)
			console.log('temporaryLicenceNum', values.temporaryLicenceNum)
			setField('companyName', response.responseBody.data.CRName)
			setField('activities', response.responseBody.data.Activities)
			setField('crIssueDate', response.responseBody.data.IssueDate)
			setField('crExpirationDate', response.responseBody.data.ExpiryDate)
			setCheckData(true)
			SetErrMessage('')
		}

		setLoading(false)
	}

	const getMunicipalLicenseNo = async () => {
		const response = await getMunicipalLicenseNoApi(values.CRNumber)
		if (!response.isSuccessful)
			SetErrMessage(response.message)
		else
			setField('municipLicenseNo', response.responseBody.MomraLicense)
	}

	const getCentertDetails = async () => {
		if (values.temporaryLicenceNum ||editMode ) {
					console.log('>>>>>>>>alues.temporaryLicenceNum****************************************************************',values.temporaryLicenceNum)
			const response = await CentertDetails(values.temporaryLicenceNum ? values.temporaryLicenceNum  : centerLicenceNumber)
			if (!response.isSuccessful)
				SetErrMessage(response.message)
			else {
				setField('centerParentType', response.responseBody.data.center.centerParentType)
				setField('centerFirstSubType', response.responseBody.data.center.centerFirstSubType)
				setField('centerSecondSubType', response.responseBody.data.center.centerSecondSubType)
				setField('crInfo_r', response.responseBody.data.center.crInfo_r.ID)
				setField('centerInfo_r', response.responseBody.data.center.centerInfo_r.ID)
				// setField('healthCareServices_r', response.responseBody.data.center.healthCareServices_r.ID)
				setField('healthCareServices_r', response.responseBody.data.center.healthCareServices_r)
				return response.responseBody.data
			}
			
		}
		
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
					className="custom-label-field"
				>

					<Field
						fullWidth
						label="رقم الترخيص المؤقت"
						name="temporaryLicenceNum"
						component={Select}
						required
						dir="rtl"
						variant="outlined"
						className="custom-field"
						formControlProps={{ fullWidth: true }}
					>
						{temporaryLicenses.map((license, index) => <MenuItem key={index} value={license.licenceNumber}>{license.licenceNumber}</MenuItem>)}
					</Field>
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
						label="رقم السجل التجاري"
						name="CRNumber"
						component={TextFieldFinal}
						type="text"
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
						onClick={check}
					>
						تحقق
				</Button>
				</Grid>
				<Grid
					item
					md={12}
					xs={12}
				>
					<Condition is={checkData || editMode}>
						<Grid
							container
							spacing={3}
							mt={3}
							mb={3}
						>

							<Grid
								item
								md={6}
								xs={12}
								className="custom-label-field"
							>
								<Field
									fullWidth
									required
									disabled
									label="رقم رخصة البلدية"
									name="municipLicenseNo"
									component={TextFieldFinal}
									type="text"
									variant="outlined"
									dir="rtl"
									className="custom-field"
								/>
							</Grid>
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
									< ContentField label='اسم المركز' value={values.companyName} />
								</Grid>
								<Grid
									item
									lg={12}
									md={12}
									xs={12}
								>
									< ContentField label='نشاط السجل التجاري' value={values.activities} />

								</Grid>
							</Grid>
						</Grid>
					</Condition>
				</Grid>

			</Grid>
		</>
	)
};

export default CenterDetails;

CenterDetails.propTypes = {
	Condition: PropTypes.func.isRequired,
	values: PropTypes.func.isRequired,
	temporaryLicenses: PropTypes.func.isRequired,
	setField: PropTypes.func.isRequired,
	value: PropTypes.func.isRequired,
	label: PropTypes.func.isRequired,
	centerLicenceNumber: PropTypes.func.isRequired,
	editMode: PropTypes.bool.isRequired,
};
