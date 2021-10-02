
import { getCurrentUser } from 'src/utils/UserLocalStorage';

const getFurnitures = (values) => {
	const furnitures = []
	values.Furniture.map((docId, index) => {
		furnitures.push({ Document: docId })
	})
	return furnitures
}

const centerLocationTransferAPIFunc = async (values, actionType, TaskID) => {
	const {  email } = getCurrentUser();

	const requestBody = {

		"isDraft": false,
		"userCreationEmail": email,
		"center": {
			"licenceNumber": values.temporaryLicenceNum,
			"centerInfo_r": {
				"ID": values.centerInfo_r,
				"buildingArea": values.buildingArea,
				"basementArea": values.basementArea,
				"carryingnumber": values.capacity,
				"furniturePhoto_r": [
					{
						"Document": values.docId,
					}
				],
				"fireDepartmentLicense": "///Document///",
				"expirarionDateForFireDepartmentLicenseGreg": "///Date Object///",
				"engineeringPlan": values.OfficeReport[0],
			},
			"centerLocation_r": {
				"city": values.city,
				"area": values.sub,
				"street": values.street,
				"buildNo": values.buildNo,
				"lat": values.lat,
				"lng": values.lng,
				"postalCode": values.postalCode,
				"additionalNo": values.additionalNo,
			}
		}
	}

let url = "taheel-apis-services-initiate-center-location-change-request";
// if (actionType === LICENSE_FORM_TYPES.RENEW) {
// 	url = "taheel-apis-services-renewLicenseV2";
// }
// else if (actionType === LICENSE_FORM_TYPES.EDIT) {
// 	requestBody.externalUserTaskID = TaskID
// 	requestBody.cancel = "false"
// 	url = "taheel-apis-services-continueFinalLicense-v2";
// }

console.log('#==> requestBody ' + JSON.stringify(requestBody))
// return '';
const response = await APIRequest({ requestBody, url });
return response;
}

export { centerLocationTransferAPIFunc };
