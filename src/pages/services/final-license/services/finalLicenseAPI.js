/* eslint-disable */
import { APIRequest } from 'src/api/APIRequest';
import { uploadFileAPI } from 'src/api/APIRequest';
import { downloadFileAPI } from 'src/api/APIRequest';
import { getCurrentUser } from 'src/utils/UserLocalStorage'
import { LICENSE_FORM_TYPES } from 'src/utils/enums'

const getFurnitures = (values) => {
	const furnitures = []
	values.Furniture.map((docId, index) => {
		furnitures.push({ Document: docId })
	})
	return furnitures
}
const getStaff = (values) => {

	const staffTypesNo = {}
	const newKeys = {
		id: 'id',
		idNumber: 'idNumIqamaNum',
		day: 'birthDate',
		fullName: 'name',
		gender: 'gender',
		nationality: 'nationality',
		staffTypes: 'StaffType',
		cv: 'CV',
		EducationalQualification: 'educationQualifications',
		MedicalPractice: 'professionalLicense',
		sponsorName: 'sponsorName',
	}

	const staffTypes = ["معلم تربية خاصة", "أخصائي اجتماعي", "مراقب اجتماعي", "حارس", "عامل تنظيفات", "مشرف فني عام", "اخصائي نفسي و توجيه اجتماعي", "عامل رعاية شخصية", "مدير", "سائق", "مرافق سائق", "أخصائي علاج طبيعي", "أخصائي علاج وظيفي", "أخصائي نطق و تخاطب", "ممرض"]
	staffTypes.map((staffType, index) => {
		staffTypesNo[staffType] = index + 1
	})



	var staff = JSON.parse(JSON.stringify(values.customers))

	staff.map((customer) => {
		Object.keys(customer).map((key) => {
			const newKey = newKeys[key] || key;
			if (key === 'gender')
				customer[newKey] = customer[key] === 'انثى' ? 'f' : 'm'
			else if (key === 'idNumber' || key === 'iqamaNo') {
				console.log(`--getStaff::customer.idNumber ${customer.idNumber}`);
				console.log(`--getStaff::customer.iqamaNo ${customer.iqamaNo}`);
				if(customer.idNumber){
					customer[newKey] = customer.idNumber
				}
				if(customer.iqamaNo){
					customer[newKey] = customer.iqamaNo
				}
			}
			else if (key === 'staffTypes')
				customer[newKey] = staffTypesNo[customer[key]]
			else if (key === 'day' || key === 'month' || key === 'year') {
				customer[newKey] = customer.birthDate
				delete customer.day
				delete customer.month
				delete customer.year
			}
			else if (['MedicalPractice', 'EducationalQualification', 'cv'].includes(key)) {
				customer[newKey] = customer[key][0]
			}
			else
				customer[newKey] = customer[key];
			if (!customer[newKey] || newKey !== key)
				delete customer[key]
			if (!Object.values(newKeys).includes(key))
				delete customer[key]
		})
	});
	return staff
}

const updateFinalLicenseAPIFunc = async (values, actionType, TaskID) => {
	const requestBody = {
		"userCreationEmail": getCurrentUser().email,
		"staff": getStaff(values),
		"center": {
			"licenceNumber": values.temporaryLicenceNum,
			"centerParentType": values.centerParentType,
			"centerFirstSubType": values.centerFirstSubType,
			"centerSecondSubType": values.centerSecondSubType,
			"crInfo_r": {
				"ID": values.crInfo_r,
				// "ID": values.centerInfo_r,
				"idNumIqamaNum": values.idNumber,
				"crNumber": values.CRNumber,
				"crActivityType": values.activities,
				"commissionerMobNum": "",
				"entityName": values.companyName,
				"MoMRA_Licence": values.municipLicenseNo,
				"crIssueDate": values.crIssueDate,
				"crExpirationDate": values.crExpirationDate,
			},
			"centerInfo_r": {
				"ID": values.centerInfo_r,
				"buildingArea": values.buildingArea,
				"basementArea": values.basementArea,
				"carryingnumber": values.capacity,
				"financialGuarantee": values.financialGuarantee.substring(0, values.financialGuarantee.length - 5),
				"financialGuarbteeAtt": values.FinancialGuaranteeAtt[0],
				"executivePlan": values.ExecutivePlan[0],
				"operationPlan": values.OperationalPlan[0],
				"engineeringPlan": values.OfficeReport[0],
				"securityReport": values.SecurityReport[0],
				"beneficiaryCount": values.beneficiariesNum,
				"furniturePhoto_r": getFurnitures(values)
			},
			"isHealthCareServices": values.healthServices === 'yes' ? true : false,
			"healthCareServices_r": {
				"ID": values.healthCareServices_r,
				"type": values.healthServices === 'yes' ? values.healthServiceType : null,
				"attachment": values.healthServices === 'yes' ?
					values.healthServiceAttachment[0]
					: null
			}
		}
	}

	let url = "taheel-apis-services-createFinalLicense-v2";
	if (actionType === LICENSE_FORM_TYPES.RENEW) {
		url = "taheel-apis-services-renewLicenseV2";
	}
	else if (actionType === LICENSE_FORM_TYPES.EDIT) {
		requestBody.externalUserTaskID = TaskID
		requestBody.cancel = "false"
		url = "taheel-apis-services-continueFinalLicense-v2";
	}

	console.log('#==> requestBody ' + JSON.stringify(requestBody))
	// return '';
	const response = await APIRequest({ requestBody, url });
	return response;
}

const getCentersForFinal = async (userEmail) => {
	const url = 'taheel-apis-records-getCenters-v2';
	// const queryParams = { userEmail, isExpired: false, licenseType: 'رخصة مؤقتة' };
	const queryParams = { userEmail, forRenewal: true, isEligibleForFinal: true, licenseType: 'رخصة نهائية' };
	// const queryParams = { userEmail, forRenewal: true};
	const response = await APIRequest({ url, queryParams });
	// console.log("response===============> " + JSON.parse(response));
	return response;
};

const getTempLicense = async (userEmail) => {
	const url = 'taheel-apis-records-getCenters-v2';
	const queryParams = { userEmail, isExpired: false, licenseType: 'رخصة مؤقتة', isEligibleForFinal: true };
	const response = await APIRequest({ url, queryParams });
	return response;
};

const getMunicipalLicenseNoApi = async (CRNumber) => {
	const url = 'tt-api-utilities-getmomralicense';
	const requestBody = { CrNumber: CRNumber };
	const response = await APIRequest({ url, requestBody });
	return response;
};

const validateCompanyFunc = async (CRNumber) => {
	const url = "taheel-apis-utilities-validateCompany-v2"
	const requestBody = {
		CRNumber: CRNumber,
	};
	const response = await APIRequest({ url, requestBody });
	return response;
}

const calculation = async (buildingArea, basementArea) => {
	const url = "taheel-apis-utilities-CarryingCapacityAndFinancialGuarantee"
	const requestBody = {
		buildingArea: buildingArea,
		basementArea: basementArea,
	};
	const response = await APIRequest({ url, requestBody });
	return response;
}

const validateCitizenFunc = async (idNumber, birthDate, checkGovermental) => {
	const url = "taheel-apis-utilities-validateCitizen-v3"
	const requestBody = {
		IDNo: idNumber,
		HijriDateOfBirth: birthDate,
		checkGovermental: checkGovermental
	};
	const response = await APIRequest({ requestBody, url });
	return response;
}

const TaskDetails = async (taskID) => {
	const url = 'taheel-apis-utilities-GetExternalUserTaskDetails-v2'
	const queryParams = { taskID };
	const response = await APIRequest({ url, queryParams });
	return response;
}

const CentertDetails = async (licenseNumber) => {
	const url = "taheel-apis-records-CentertDetails-v2"
	const queryParams = { licenseNumber };
	const response = await APIRequest({ url, queryParams });
	return response;
}


const uploadDocumentApi = async (name, image) => {
	const url = "taheel-apis-utilities-uploadDocument-v2"
	const requestBody = {
		src: image
	};
	const response = await uploadFileAPI(requestBody, name);
	return response;
}


const downloadDocument = async (DocID, attachment, name) => {
	const url = "taheel-apis-utilities-downloadDocument-v2"
	console.log(`downloadDocument :: ${JSON.stringify(name)}`)
	const fileName = `${name}`;
	const queryParams = {
		DocID: DocID,
		attachment: attachment
	};
	const response = await downloadFileAPI({ url, queryParams, fileName });
	return response;
}


export { getCentersForFinal, validateCompanyFunc, updateFinalLicenseAPIFunc, calculation, validateCitizenFunc, uploadDocumentApi, getTempLicense, getMunicipalLicenseNoApi, downloadDocument, TaskDetails, CentertDetails };
