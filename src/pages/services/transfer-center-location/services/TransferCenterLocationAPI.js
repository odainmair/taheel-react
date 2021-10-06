
import { getCurrentUser } from 'src/utils/UserLocalStorage';
import { APIRequest } from 'src/api/APIRequest';
import { calculation } from '../../final-license/services/finalLicenseAPI';

export const centerLocationTransferAPIFunc = async (values) => {
	console.log('#==> valuesvaluesvalues ' + JSON.stringify(values))


	function numberToDay(day) {
		return ('0' + day).slice(-2);
	}
	const { email } = getCurrentUser();
	const { day, month, year } = values;
	const expiryDate = year + '' + numberToDay(month) + numberToDay(day);


	const res = await calculation(values.buildingArea, values.basementArea);
	const financialGuarantee = res?.responseBody?.body?.financialGuarantee

	const requestBody = {
		serviceStatus: 1,
		isDraft: values.isDraft,
		userCreationEmail: email,
		center: {
			licenceNumber: values.centerLicenceNumber,
			centerInfo_r: {
				financialGuarantee: financialGuarantee,
				ID: values.centerInfo_r,
				buildingArea: values.buildingArea,
				basementArea: values.basementArea,
				carryingnumber: values.capacity,
				furniturePhoto_r: [
					{
						Document: !!values?.Furniture && values?.Furniture[0],
					}
				],
				fireDepartmentLicense: !!values?.fireDepartmentLicense && values?.fireDepartmentLicense[0],
				expirarionDateForFireDepartmentLicenseHijri: expiryDate,
				engineeringPlan: !!values?.OfficeReport && values?.OfficeReport[0],
				momraDoc: !!values?.municipLicenseNo && values?.municipLicenseNo[0],
			},
			centerLocation_r: {
				city: values.city,
				area: values.sub,
				street: values.street,
				buildNo: values.buildNo,
				lat: values.lat,
				lng: values.lng,
				postalCode: values.postalCode,
				additionalNo: values.additionalNo,
			}
		}
	}
	if (!!values.taskID) {
		requestBody.serviceStatus = 2
		requestBody.externalUserTaskID = values.taskID
	}
	if(values.isDraft) {
		requestBody.draft_values = {temporaryLicenceNum: values.licenceNumber, ...values}
		requestBody.requestNumber = values.requestNum ? values.requestNum : null
	}
	let url = "taheel-apis-services-initiate-center-location-change-request";

	console.log('#==> requestBody ' + JSON.stringify(requestBody))
	const response = await APIRequest({ requestBody, url });
	// const response = {isSuccessful:false, message:"DUMMY"}
return response;
}

// export { centerLocationTransferAPIFunc };
