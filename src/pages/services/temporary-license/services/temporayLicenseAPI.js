/* eslint-disable */
import moment from 'moment-hijri';
import { APIRequest } from 'src/api/APIRequest';

const createTempLicenseAPIFunc = async (values) => {
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
    const url = "taheel-apis-utilities-validateCitizen-v2"
    const requestBody = {
        IDNo: idNumber,
        HijriDateOfBirth: moment(birthDate, 'iDD/iMM/iYYYY').format('iYYYYiMMiDD')
    };
    const response = await APIRequest({ requestBody, url });
    return response;
}
const validateAPIFunc = async values => {
    const { requestType, licenceNumber, idNumber, birthDate } = values;
    const response = { isSuccessful: true, message: '' };
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
        const data = validateCitRs.responseBody.data.Body;
        console.log(JSON.stringify(data));
        const { FirstName, SecondName, ThirdName, LastName } = data.Name;
        values.ownerName = `${FirstName} ${SecondName} ${ThirdName} ${LastName}`;
    }
    return response;
}
export { validateCompanyFunc, validateCitizenFunc, validateAPIFunc, createTempLicenseAPIFunc };