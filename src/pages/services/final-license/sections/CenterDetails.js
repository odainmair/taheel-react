/* eslint-disable no-unused-vars */
import {
	Grid,
	Button,
	MenuItem,
	Typography,
	Alert,
	Box,
} from '@material-ui/core';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';
import { TextField as TextFieldFinal, Select } from 'final-form-material-ui';
import { useState, useEffect } from 'react';
import { validateCompanyFunc } from '../services/finalLicenseAPI'
import { CenterDetailsValidation } from '../services/finalLicenseUtil'


const CenterDetails = ({ Condition }) => {
	useEffect(() => {
		// SetTemporaryLicenses(data)
	})
	const [temporaryLicenses, SetTemporaryLicenses] = useState(['42323551', '5444418', '4811551'])
	const [companyDetails, setCompanyDetails] = useState({ name: 'company name', description: 'description' })
	const [checkData, setCheckData] = useState(false)
	const [errMessage, SetErrMessage] = useState('')

	const check = () => {
		// response = validateCompanyFunc()

		// if (!response.isSuccessful)
		// 	SetErrMessage(validateCitRs.message)
		// else {
		// 	setCheckData(true)
		// 	setCompanyDetails(response)
		// }
setCheckData(true)
		// const checkValidation = CenterDetailsValidation()
		// const commRegistrNoError = checkValidation.commRegistrNo ? false : true
		// const temporaryLicenceNumError = checkValidation.temporaryLicenceNum ? false : true
		// const municipLicenseNoError = checkValidation.commRegistrNo ? false : true
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
						// error={temporaryLicenceNumError}
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
						// error={commRegistrNoError}
						fullWidth
						required
						label="رقم السجل التجاري"
						name="commRegistrNo"
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
					className="custom-label-field"
				>
					<Field
						// error={municipLicenseNoError}
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
					md={6}
					xs={12}
				>
					<Button
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
								lg={12}
								md={12}
								xs={12}
							>
								<Typography gutterBottom variant="body2" color="textSecondary" component="p">
									اسم المركز
							  </Typography>
								<Typography gutterBottom variant="h5" component="h2">
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
									{companyDetails.description}
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
};
