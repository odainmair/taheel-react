/* eslint-disable */
import { APIRequest } from 'src/api/APIRequest';
const documents= []

const createFinalLicenseAPIFunc = async (values) => {
	const requestBody = {
		userEmail: email,
		temporaryLicenceNum: values.temporaryLicenceNum,
		CRNumber: values.CRNumber,
		municipLicenseNo: values.municipLicenseNo,
		beneficiariesNum: values.beneficiariesNum,
		buildingArea: values.buildingArea,
		basementArea: values.basementArea,
		healthServices: values.healthServices,
		FinancialGuarantee: values.FinancialGuarantee

	};
	// const url = "taheel-apis-services-createTempLicense-v2"
	const response = await APIRequest({ requestBody, url });
	return response;
}

const getTempLicense = async (userEmail) => {
	const url = 'taheel-apis-records-getRequests-v2';
	const queryParams = { userEmail };
	const response = await APIRequest({ url, queryParams });
	return response;
  };
  
  const getMunicipalLicenseNoApi = async (userEmail) => {
	const url = 'taheel-apis-records-getRequests-v2';
	const queryParams = { userEmail };
	const response = await APIRequest({ url, queryParams });
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

const calculation = async ( buildingArea, basementArea) => {
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
	const url = "taheel-apis-utilities-validateCitizen-v2"
	const requestBody = {
		IDNo: idNumber,
		HijriDateOfBirth: birthDate
	};
	const response = await APIRequest({ requestBody, url });
	return response;
}

// const CentertDetails = async (licenseNumber) => {
// 	const url = "taheel-apis-records-CentertDetails-v2"
// 	const queryParams = { licenseNumber };
// 	const response = await APIRequest({ url, queryParams });
// 	return response;
// }



const uploadDocumentApi = async(name,image) => {


		const url = "taheel-apis-utilities-uploadDocument-v2"
		const requestBody = {
			src: image
		};
		const response = await APIRequest({ requestBody, url });
		console.log('responseresponse...>>',response)
		// documents.push({[name]:response.responseBody.docID})
		// console.log('documentsdocuments...>>',documents)
		return response;
	
}


const downloadDocument = async (DocID,attachment) => {
	console.log('DocIDDocID',DocID)
		const url = "taheel-apis-utilities-downloadDocument-v2"

		const queryParams = {
			 DocID: DocID,
			attachment: attachment 
		};
		const response = await APIRequest({ url, queryParams });
		return response;
	}


export { validateCompanyFunc, createFinalLicenseAPIFunc, calculation, validateCitizenFunc, uploadDocumentApi, getTempLicense, getMunicipalLicenseNoApi, downloadDocument,documents };

