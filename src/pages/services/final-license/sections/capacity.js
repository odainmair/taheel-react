/* eslint-disable no-unused-vars */
import {
	Grid,
	Button,
	Alert,
	Typography,
	Box,
} from '@material-ui/core';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';
import { TextField as TextFieldFinal, Select } from 'final-form-material-ui';
import { useState, useEffect } from 'react';
import { validateCompanyFunc } from '../services/finalLicenseAPI'
import FileUploader from 'src/components/FileUploader';


const Capacity = ({ Condition }) => {

	const [companyDetails, setCompanyDetails] = useState({ Capacity: '10', FinancialGuarantee: '200,000,000' })
	const [calculatedData, setCalculatedData] = useState(false)
	const [errMessage, SetErrMessage] = useState('')
	const calculate = () => {
		// response = validateCompanyFunc()
		// setCompanyDetails(response)

		setCalculatedData(true)
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
						fullWidth
						required
						label="مساحة مسطح البناء"
						name="buildingArea"
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
						fullWidth
						required
						label="مساحة القبو"
						name="basementArea"
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
					<Condition is={calculatedData}>
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
									الطاقة الاستعابية
								</Typography>
								<Typography gutterBottom variant="h5" component="h2">
									{companyDetails.Capacity}
								</Typography>
								<Box
									direction='rtl'
									className="custom-label-field"
								>
									<Alert severity="info" size="small">
										الحد الأقصى لكل المستفيدين 10% من مساحة مسطح البناء ناقص الفبو حسب اللائحة التنفيذية
									</Alert>
								</Box>
							</Grid>

							<Grid
								item
								lg={12}
								md={12}
								xs={12}
							>
								<Typography gutterBottom variant="body2" color="textSecondary" component="p">
									الضمان المالي
								</Typography>
								<Typography gutterBottom variant="h5" component="h2">
									{companyDetails.FinancialGuarantee} ر.س.
								</Typography>
								<Box
									direction='rtl'
									className="custom-label-field"
								>
									<Alert severity="info" size="small" dir="rtl" >
										2000 ريال لكل مستفيدفي مراكز الرعاية النهارية حسب اللائحة التنفيذية
									</Alert>
								</Box>
							</Grid>

							<Grid
								item
								lg={6}
								md={12}
								xs={12}
							>
								<FileUploader
									handleFile={(test) => console.log(test)}
									label="ارفاق الضمان المالي"
									name="FinancialGuarantee"
									multiple={false}
								/>
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
};
