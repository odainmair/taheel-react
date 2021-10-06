
import { APIRequest } from 'src/api/APIRequest';


const AbsherOTP = async (IqamaNumber) => {
    const url = '/taheel-apis-utilities-AbsherOTP-v2'
    const queryParams = {
        BeneficiaryId: IqamaNumber,
    }
    const response = await APIRequest({ queryParams, url });
    if (!response.isSuccessful) {
        return { isSuccessful: false, message: response.message };
    }
    return { isSuccessful: true, message: '' }

}


const AbsherOTPAuth = async (IqamaNumber, OTP) => {
    const url = '/taheel-apis-utilities-AuthenticationAbsherOTP-v2?'
    const queryParams = {
        BeneficiaryId: IqamaNumber,
        OTP: OTP,
        serviceType: 1,
    }
    const response = await APIRequest({ queryParams, url });
    if (!response.isSuccessful) {
        return { isSuccessful: false, message: response.message };
    }
    return { isSuccessful: true, message: '' }
}



const changePassword = async (IqamaNumber, oldPassword, password, passwordConfirmation) => {
    // const response = { isSuccessful: true, message: '' };
    // const { oldPassword, password, passwordConfirmation } = values
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(300);
    const requestBody = {
        IqamaNumber: IqamaNumber,
        oldPassword: oldPassword,
        newPassword: password,
        confirmPassword: passwordConfirmation,
    };
    const url = '/taheel-apis-users-changePassword-v2';
    const response = await APIRequest({ requestBody, url });
    if (!response.isSuccessful) {
        return { isSuccessful: false, message: response.message };
    }
    return { isSuccessful: true, message: response.message };
}

export { AbsherOTP, changePassword, AbsherOTPAuth }