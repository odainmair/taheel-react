import { APIRequest } from "src/api/APIRequest";
import { LICENSE_FORM_TYPES } from 'src/utils/enums'

const getMyTasksFun = async (userEmail) => {
  const url = 'taheel-apis-utilities-GetGetExternalUserTasks-v2';
  const queryParams = { userEmail, taskStatus: 0 };
  const response = await APIRequest({ url, queryParams });
  return response;
};

const cancelTCRequest = async (externalUserTaskID, licenceNumber) => {
  const url = '/taheel-apis-services-initiate-center-location-change-request';
  const requestBody = { serviceStatus: 2, externalUserTaskID, cancel: true, center: { licenceNumber } };
  const response = await APIRequest({ url, requestBody });
  return response;
}

const getTaheelRequestsFun = async (email, startIndex, batchSize, type) => {
  const url = 'taheel-apis-records-getRequests-v2';
  let queryParams = { userEmail: email, startIndex, batchSize };
  console.log(`ORDERS ::1 queryParams ${JSON.stringify(queryParams)}`)
  if (type === LICENSE_FORM_TYPES.DRAFT) {
    queryParams = { ...queryParams, status: 4 }
  }
  console.log(`ORDERS ::2 queryParams ${JSON.stringify(queryParams)}`)
  const response = await APIRequest({ url, queryParams });
  return response;
};

const getRequestDetails = async (reqNum) => {
  const url = '/taheel-apis-records-RequestDetails-v2';
  const queryParams = { reqNum };
  const response = await APIRequest({ url, queryParams });
  return response;
}

const getCentersForFinalNoExpired = async (userEmail) => {
  const url = 'taheel-apis-records-getCenters-v2';
  // const queryParams = { userEmail, isExpired: false, licenseType: 'رخصة مؤقتة' };
  const queryParams = { userEmail, isExpired: false, isEligibleForFinal: true, licenseType: 'رخصة نهائية' };
  // const queryParams = { userEmail, forRenewal: true};
  const response = await APIRequest({ url, queryParams });
  // console.log("response===============> " + JSON.parse(response));
  return response;
};
export { getMyTasksFun, cancelTCRequest, getRequestDetails, getCentersForFinalNoExpired, getTaheelRequestsFun }