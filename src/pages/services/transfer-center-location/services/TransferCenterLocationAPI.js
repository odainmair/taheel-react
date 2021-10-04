
import { getCurrentUser } from 'src/utils/UserLocalStorage';
import { APIRequest } from 'src/api/APIRequest';

// const getFurnitures = (values) => {
// 	const furnitures = []
// 	values.Furniture.map((docId, index) => {
// 		furnitures.push({ Document: docId })
// 	})
// 	return furnitures
// }

export const centerLocationTransferAPIFunc = async (values) => {

	function numberToDay(day) {
		return ('0' + day).slice(-2);
	}
	const { email } = getCurrentUser();
	const { day, month, year } = values;
	const expiryDate = year + '' + numberToDay(month) + numberToDay(day);
	const requestBody = {
		serviceStatus: 1,
		isDraft: false,
		userCreationEmail: email,
		center: {
			licenceNumber: values.centerLicenceNumber,
			centerInfo_r: {
				ID: values.centerInfo_r,
				buildingArea: values.buildingArea,
				basementArea: values.basementArea,
				carryingnumber: values.capacity,
				furniturePhoto_r: [
					{
						Document: values.docId,
					}
				],
				fireDepartmentLicense: values.fireDepartmentLicense,
				expirarionDateForFireDepartmentLicenseGreg: expiryDate,
				engineeringPlan: values.OfficeReport[0],
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

	let url = "taheel-apis-services-initiate-center-location-change-request";

	console.log('#==> requestBody ' + JSON.stringify(requestBody))
	const response = await APIRequest({ requestBody, url });
	return response;
}

// export { centerLocationTransferAPIFunc };
