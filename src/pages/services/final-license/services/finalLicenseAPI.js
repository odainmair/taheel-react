/* eslint-disable */
import { APIRequest } from 'src/api/APIRequest';

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



const uploadDocument = (image) => {

	var reader = new FileReader();
	reader.readAsDataURL(image);
	reader.onloadend = async function () {

		var base64String = reader.result;
		var n = base64String.indexOf("base64,") + 7;
		base64String = reader.result.substr(n);
		console.log("base64String", base64String)
		const data = window.atob(base64String)
		console.log("atob", data)
		image = data

		const url = "taheel-apis-utilities-uploadDocument-v2"
		const requestBody = {
			src: image
		};
		const response = await APIRequest({ requestBody, url });
		return response;
	}
}

export { validateCompanyFunc, createFinalLicenseAPIFunc, calculation, validateCitizenFunc, uploadDocument, getTempLicense, getMunicipalLicenseNoApi };

