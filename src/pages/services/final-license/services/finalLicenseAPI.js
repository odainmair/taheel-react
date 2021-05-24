/* eslint-disable */
import { APIRequest } from 'src/api/APIRequest';

const createFinalLicenseAPIFunc = async (values) => {
	const requestBody = {
		userEmail: email,
		temporaryLicenceNum: values.temporaryLicenceNum,
		commRegistrNo: values.commRegistrNo,
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

const validateCompanyFunc = async (commRegistrNo, municipLicenseNo) => {
	// const url = "taheel-apis-utilities-validateCompany-v2"
	const requestBody = {
		commRegistrNo: commRegistrNo,
		municipLicenseNo: municipLicenseNo,
	};
	const response = await APIRequest({ url, requestBody });
	return response;
}

const calculation = async (beneficiariesNum, buildingArea, basementArea) => {
	// const url = "taheel-apis-utilities-validateCompany-v2"
	const requestBody = {
		beneficiariesNum: beneficiariesNum,
		buildingArea: buildingArea,
		basementArea: basementArea,
	};
	const response = await APIRequest({ url, requestBody });
	return response;
}
export { validateCompanyFunc, createFinalLicenseAPIFunc, calculation };