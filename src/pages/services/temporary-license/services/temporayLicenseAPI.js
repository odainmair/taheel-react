/* eslint-disable */
import moment from 'moment-hijri';
import { APIRequest } from 'src/api/APIRequest';
import { getCurrentUser } from 'src/utils/UserLocalStorage';


const createTempLicenseAPIFunc = async (values) => {
    const { email } = getCurrentUser();
    const requestBody = {
        userEmail: email,
        centerData: {
            name: values.centerName,
            type: values.centerType,
            targetedBeneficiary: values.beneficiaryCategory,
            targetedServices: values.specialCenterType,
            ownerID: (values.requestType === "2") ? values.idNumber : values.licenceNumber,
            ownerIDType: (values.requestType === "2") ? "الصفة الطبيعية" : "الصفة الاعتبارية",
            ownerType: (values.requestType === "2") ? "الصفة الطبيعية" : "الصفة الاعتبارية",
            ownerName: (values.requestType === "2") ? values.ownerName : values.companyName,
            workingHours: values.workingHours,
            targetedGender: values.targetedGender,
            ageGroup: values.ageGroup,
            crInfo_r: {
                crNumber: values.licenceNumber,
                commissionerMobNum: values.compMobileNo
            },
            centerInfo_r: {
                estimatedCapacity: values.centerCap
            },
            city: values.city,
            area: values.sub,
            street: values.street,
            buildNo: values.buildNo,
            postalCode: values.postalCode,
            lat: values.lat,
            lng: values.lng,
            questionnairesScore: values.questionnairesScore
        }
    };
    const url = "taheel-apis-services-createTempLicense-v2"
    const response = await APIRequest({ requestBody, url });
    return response;
}
const validateCompanyFunc = async (crNumber) => {
    const url = "taheel-apis-utilities-validateCompany-v2"
    const requestBody = { CRNumber: crNumber };
    const response = await APIRequest({ url, requestBody });
    return response;
}
const validateCitizenFunc = async (idNumber, birthDate) => {
    const url = "taheel-apis-utilities-validateCitizen-v3"
    const requestBody = {
        IDNo: idNumber,
        HijriDateOfBirth: moment(birthDate, 'iDD/iMM/iYYYY').format('iYYYYiMMiDD')
    };
    const response = await APIRequest({ requestBody, url });
    return response;
}
const validateAPIFunc = async values => {
    const { requestType, licenceNumber, idNumber, birthDate } = values;
    console.log(`idNumber[0] ${idNumber[0]}`);
    const response = { isSuccessful: true, message: '' };

    if(idNumber[0] === "2" && requestType === "2"){
        return { isSuccessful: false, message: 'عذرا لا يمكنك التقديم على هذه الخدمة حيث تشير سجلاتنا أن المتقدم غير سعودي/سعودية الجنسية' }
    }
    if (requestType === "1") {
        const validateCompRs = await validateCompanyFunc(licenceNumber);
        if (!validateCompRs.isSuccessful) {
            return { isSuccessful: false, message: validateCompRs.message }
        }
        const data = validateCompRs.responseBody.data;
        console.log(JSON.stringify(data));
        values.companyName = data.CRName;

    } else {
        const validateCitRs = await validateCitizenFunc(idNumber, birthDate);
        if (!validateCitRs.isSuccessful) {
            return { isSuccessful: false, message: validateCitRs.message }
        }
        const data = validateCitRs.responseBody.data;
        console.log(JSON.stringify(data));
        const { firstName, secondName, thirdName, fourthName } = data.name;
        values.ownerName = `${firstName} ${secondName} ${thirdName} ${fourthName}`;
    }
    return response;
}
export { validateCompanyFunc, validateCitizenFunc, validateAPIFunc, createTempLicenseAPIFunc };