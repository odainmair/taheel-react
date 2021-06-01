/* eslint-disable */
import { APIRequest } from 'src/api/APIRequest';
import { uploadFileAPI } from 'src/api/APIRequest';
import { downloadFileAPI } from 'src/api/APIRequest';
import moment from 'moment-hijri';
import { getCurrentUser } from 'src/utils/UserLocalStorage'

const staffTypesNo = {}

const newKeys = {
	idNumber: 'idNumIqamaNum',
	day: 'birthDate',
	fullName: 'name',
	gender: 'gender',
	nationality: 'nationality',
	staffTypes: 'StaffType',
	cv: 'CV',
	EducationalQualification: 'educationQualifications',
	MedicalPractice: 'professionalLicense',
}

const staffTypes = ["معلم تربية خاصة ", "أخصائي اجتماعي", "مراقب اجتماعي", "حارس", "عامل تنظيفات", "مشرف فني عام", "اخصائي نفسي و توجيه اجتماعي", "عامل رعاية شخصية", "مدير", "سائق", "مرافق سائق", "أخصائي علاج طبيعي", "أخصائي علاج وظيفي", "أخصائي نطق و تخاطب", "ممرض"]
staffTypes.map((staffType, index) => {
	staffTypesNo[staffType] = index + 1
})
const createFinalLicenseAPIFunc = async (values) => {
	var furnitures = []
	values.Furniture.map((docId, index) => {
		furnitures.push({ Document: { id: docId } })
	})


	var staff = JSON.parse(JSON.stringify(values.customers))

	staff.map((customer) => {
		Object.keys(customer).map((key) => {
			const newKey = newKeys[key] || key;
			if (key === 'gender')
				customer[newKey] = customer[key] === 'انثى' ? 'f' : 'm'
			else if (key === 'idNumber' || key === 'iqamaNo')
				customer[newKey] = customer.idNumber ? customer.idNumber : customer.iqamaNo
			else if (key === 'staffTypes')
				customer[newKey] = staffTypesNo[customer[key]]
			else if (key === 'day' || key === 'month' || key === 'year') {
				customer[newKey] = customer.birthDate
				delete customer.day
				delete customer.month
				delete customer.year
			}
			else
				customer[newKey] = customer[key];
			if (!customer[newKey] || newKey !== key)
				delete customer[key]
		})
	});

	console.log('values.customers', values.customers)
	console.log('staffstaff', staff)


	const requestBody = {
		"userCreationEmail": getCurrentUser().email,
		"staff": staff,
		"center": {
			"licenceNumber": values.temporaryLicenceNum,
			"centerParentType": values.centerParentType,
			"centerFirstSubType": values.centerFirstSubType,
			"centerSecondSubType": values.centerSecondSubType,
			"crInfo_r": {
				"ID": values.crInfo_r,
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
				"financialGuarantee": values.financialGuarantee.substring(0,values.financialGuarantee.length-5),
				"financialGuarbteeAtt": values.FinancialGuaranteeAtt[0],
				"executivePlan": values.ExecutivePlan[0],
				"engineeringPlan": values.OperationalPlan[0],
				"securityReport": values.SecurityReport[0],
				"beneficiaryCount": values.beneficiariesNum, 
				"furniturePhoto_r": furnitures
			},
			"isHealthCareServices": values.healthServices === 'yes' ? true : false,
			"healthCareServices_r": {
				"ID": values.healthCareServices_r,          
				"type": values.healthServiceType 
			}
		}
	}
console.log('>>>>>>>>>>>>>requestBody>>>>>>>>>',requestBody)
	const url = "taheel-apis-services-createFinalLicense-v2"
	const response = await APIRequest({ requestBody, url });
	return response;
}

const getTempLicense = async (userEmail) => {

	const url = 'taheel-apis-records-getCenters-v2';
    const queryParams = { userEmail };
	const requestBody={isExpired:false,licenseType:'رخصة مؤقتة'}
    const response = await APIRequest({ url, queryParams,requestBody });
    return response;
	// const url = 'taheel-apis-records-getRequests-v2';
	// const queryParams = { userEmail };
	// const response = await APIRequest({ url, queryParams });
	// return response;
};

const getMunicipalLicenseNoApi = async (CRNumber) => {
	const url = 'tt-api-utilities-getmomralicense';
	const requestBody = { CrNumber:CRNumber };
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
		// beneficiariesNum: beneficiariesNum,
		buildingArea: buildingArea,
		basementArea: basementArea,
	};
	const response = await APIRequest({ url, requestBody });
	return response;
}

const validateCitizenFunc = async (idNumber, birthDate) => {
	const url = "taheel-apis-utilities-validateCitizen-v3"
	const requestBody = {
		IDNo: idNumber,
		HijriDateOfBirth: birthDate
	};
	const response = await APIRequest({ requestBody, url });
	return response;
}

const CentertDetails = async (licenseNumber) => {
	const url = "taheel-apis-records-CentertDetails-v2"
	const queryParams = { licenseNumber };
	const response = await APIRequest({ url, queryParams });
	return response;
}

// const Request = (requestBody) => {
// 	var axios = require('axios');
// 	var data = '<file contents here>';
// 	console.log('requestBody', requestBody)
// 	var config = {
// 		method: 'post',
// 		url: 'https://inspiredemo2.appiancloud.com/suite/webapi/taheel-apis-utilities-uploadDocument-v2',
// 		headers: {
// 			'Appian-API-Key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2YWUxNjY4OC1kMjMxLTRmZTQtYWYyMy0yYjQ5MWUyMjk2NDkifQ.sVfHaN8hSbxpZuuhIjq1Dd9YOEh_ckc2Qk9pCrX_3Sw',
// 			'Appian-Document-Name': 'Profile Picture.jpg',
// 			'Content-Type': 'text/plain'
// 		},
// 		data: requestBody.src
// 	};

// 	axios(config)
// 		.then(function (response) {
// 			console.log(JSON.stringify(response.data));
// 		})
// 		.catch(function (error) {
// 			console.log(error);
// 		});
// }

const uploadDocumentApi = async (name, image) => {


	const url = "taheel-apis-utilities-uploadDocument-v2"
	const requestBody = {
		src: image
	};
	const response = await uploadFileAPI(requestBody, name);
	console.log('responseresponse...>>', response)
	// documents.push({[name]:response.responseBody.docID})
	// console.log('documentsdocuments...>>',documents)
	return response;

}


const downloadDocument = async (DocID, attachment) => {
	console.log('DocIDDocID', DocID)
	const url = "taheel-apis-utilities-downloadDocument-v2"

	const queryParams = {
		DocID: DocID,
		attachment: attachment
	};
	const response = await downloadFileAPI({ url, queryParams });
	return response;
}


export { validateCompanyFunc, createFinalLicenseAPIFunc, calculation, validateCitizenFunc, uploadDocumentApi, getTempLicense, getMunicipalLicenseNoApi, downloadDocument, CentertDetails };

