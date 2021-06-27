import { APIRequest } from "src/api/APIRequest";

const getCenters = async (email) => {
    const res = { isSuccessful: true, message: '' };
    const url = 'taheel-apis-records-getCenters-v2?';
    const queryParams = {
        userEmail: email,
        }
    const response = await APIRequest({ queryParams, url });
    console.log("response++++++++++", JSON.stringify(response.responseBody.data.Centers[0].name));
    return response;

    if (!res.isSuccessful) {
        return { isSuccessful: false, message: response.message };
    }
}

const centerDetails = async (licenseNum) => {
    const res = { isSuccessful: true, message: '' };
    const url = 'taheel-apis-records-getCenters-v2?';
    const queryParams = {
        licenseNumber: licenseNum,
        }
    const response = await APIRequest({ queryParams, url });
    return response;

    if (!res.isSuccessful) {
        return { isSuccessful: false, message: response.message };
    }
}

export {getCenters, centerDetails }