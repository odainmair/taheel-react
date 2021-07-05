import { APIRequest } from "src/api/APIRequest";

const getCenters = async (email) => {
    const url = 'taheel-apis-records-getCenters-v2?';
    const queryParams = {
        userEmail: email,
        }
    const response = await APIRequest({ queryParams, url });
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