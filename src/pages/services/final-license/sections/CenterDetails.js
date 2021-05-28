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

import { CenterDetailsValidation } from '../services/finalLicenseUtil'
import { getCurrentUser } from 'src/utils/UserLocalStorage';


const CenterDetails = ({ Condition, values, temporaryLicenses, setField }) => {

	console.log("props", temporaryLicenses)
	const [companyDetails, setCompanyDetails] = useState({ name: '', activities: '' })
	const [loading, setLoading] = useState(false)
	const [checkData, setCheckData] = useState(false)
	const [errMessage, SetErrMessage] = useState('')

	const check = async () => {
		setLoading(true)
		const response = await validateCompanyFunc(values.CRNumber)
		if (!response.isSuccessful) {
			SetErrMessage(response.message)
			setCheckData(false)
		}
		else {
			getMunicipalLicenseNo()
			setCompanyDetails({ ...companyDetails, name: response.responseBody.data.CRName, activities: response.responseBody.data.Activities })
			setCheckData(true)
			SetErrMessage('')
		}
		setLoading(false)
		values.companyName = companyDetails
	}

	const getMunicipalLicenseNo = async () => {
		const response = await getMunicipalLicenseNoApi(values.CRNumber)
		if (!response.isSuccessful) 
			SetErrMessage(response.message)
		else 
			setField('municipLicenseNo',response.responseBody.data.UnifiedLicenseNumber)
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
						{temporaryLicenses.map((license, index) => <MenuItem key={index} value={license}>{license}</MenuItem>)}
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
					<Condition is={checkData}>
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
								item
								lg={12}
								md={12}
								xs={12}
							>
								<Typography gutterBottom variant="body2" color="textSecondary" component="p">
									اسم المركز
							  </Typography>
								<Typography name='companyName' gutterBottom variant="h5" component="h2">
									{companyDetails.name}
								</Typography>
							</Grid>
							<Grid
								item
								lg={12}
								md={12}
								xs={12}
							>
								<Typography gutterBottom variant="body2" color="textSecondary" component="p">
									نشاط السجل التجاري
							  </Typography>
								<Typography gutterBottom variant="h5" component="h2">
									{companyDetails.activities}
								</Typography>
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
};
