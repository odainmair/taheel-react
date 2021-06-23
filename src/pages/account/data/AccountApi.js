
import { APIRequest } from 'src/api/APIRequest';
import { getCurrentUser } from 'src/utils/UserLocalStorage';


const requestOTPPhoneNum = async (PhoneNumber) => {
    const { idNumIqamaNum } = getCurrentUser();

    const url = '/taheel-apis-utilities-sms-otp-v2'
    const queryParams = {
        BeneficiaryId: idNumIqamaNum,
        phoneNumber: PhoneNumber,
    }
    const response = await APIRequest({ queryParams, url });
    if (!response.isSuccessful) {
        return { isSuccessful: false, message: response.message };
    }
    return { isSuccessful: true, message: '' }
}

const AuthOTPPhoneNum = async (phone, idNumIqamaNum, otp) => {
    const url = '/taheel-apis-utilities-AuthenticationSmsOTP-v2'
    const queryParams = {
        phoneNumber: phone,
        BeneficiaryId: idNumIqamaNum,
        OTP: otp,
    }
    const response = await APIRequest({ queryParams, url });
    if (!response.isSuccessful) {
        return { isSuccessful: false, message: response.message };
    }
    return { isSuccessful: true, message: '' }
}

const ownerInfoUpdate = async (idNumIqamaNum, email, phoneNumber, OTP) => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(300);
    const url = '/taheel-apis-services-update-center-owner-profile-v2';
    const queryParams = {
        BeneficiaryId: idNumIqamaNum,
        OTP: OTP,
        newEmail: email,
        newPhonenumber: phoneNumber,
    }
    const response = await APIRequest({ queryParams, url });
    if (!response.isSuccessful) {
        return { isSuccessful: false, message: response.message };
    }
    return { isSuccessful: true, message: '' };
}
export { requestOTPPhoneNum, AuthOTPPhoneNum, ownerInfoUpdate }