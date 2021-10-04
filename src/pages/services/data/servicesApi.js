import { APIRequest } from "src/api/APIRequest";

const getMyTasksFun = async (userEmail) => {
  const url = 'taheel-apis-utilities-GetGetExternalUserTasks-v2';
  const queryParams = { userEmail, taskStatus: 0 };
  const response = await APIRequest({ url, queryParams });
  return response;
};

const cancelTCRequest = async (externalUserTaskID, licenceNumber) => {
  const url = '/taheel-apis-services-initiate-center-location-change-request';
  const queryParams = { serviceStatus: 2, externalUserTaskID, cancel: true, center: { licenceNumber } };
  const response = await APIRequest({ url, queryParams });
  return response;
}

const getRequestDetails = async (reqNum) => {
  const url = '/taheel-apis-records-RequestDetails-v2';
  const queryParams = { reqNum };
  const response = await APIRequest({ url, queryParams });
  return response;
}
export { getMyTasksFun, cancelTCRequest, getRequestDetails }