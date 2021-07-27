import { APIRequest } from "src/api/APIRequest";

const getCenters = async (email,startIndex,batchSize,filters) => {
    const url = 'taheel-apis-records-getCenters-v2?';
    const requestBody = filters
    const queryParams = {
        userEmail: email,
        startIndex:startIndex,
        batchSize:batchSize
        }
    const response = await APIRequest({requestBody, queryParams, url});
    return response;
}

const centerDetails = async (licenseNum) => {
    const url = 'taheel-apis-records-getCenters-v2?';
    const queryParams = {
        licenseNumber: licenseNum,
        }
    const response = await APIRequest({ queryParams, url });
    return response;
}

export {getCenters, centerDetails }