
/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    CircularProgress,
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Container,
    Alert,
} from '@material-ui/core';
import FinalFromWizard from 'src/components/wizard/FinalFormWizard';
import { ConditionComp, sectionValidateInput } from '../../temporary-license/services/temporayLicenseUtil';
import { validateAPIFunc, validateCompanyFunc } from '../../temporary-license/services/temporayLicenseAPI';
import { getCurrentUser } from 'src/utils/UserLocalStorage';
import FinalLicenseData from '../sections/FinalLicenseData';
import { CentertDetails, getCentersForFinal, getMunicipalLicenseNoApi } from '../../final-license/services/finalLicenseAPI';
import { getCentersForFinalNoExpired } from 'src/pages/services/data/servicesApi'
import NewLocationData from '../sections/NewLocationData';
import NewCenterAddress from '../sections/NewCenterAddress';
import Terms from '../sections/Terms';
import { CenterDetailsValidation, calculationConditionComp, centerTypeJSON, getStaff, RequirementsValidation } from '../../final-license/services/finalLicenseUtil';
import AlertDialog from 'src/components/AlertDialog';
import { dateFormatter, reverseRange } from 'src/utils/utilFunctions';
import { LICENSE_FORM_TYPES } from 'src/utils/enums'
import numeral from 'numeral';
import { centerLocationTransferAPIFunc } from './TransferCenterLocationAPI';
import { AttachementValidation, NewAddressValidation } from './TransferCenterLoactionUtil';
import { getRequestDetails } from 'src/pages/services/data/servicesApi'
import { getDateFromObject } from 'src/pages/services/transfer-center-location/services/TransferCenterLoactionUtil'


const TransferCenterLocationRequest = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [renewableLicenses, setRenewableLicenses] = useState([]);
    const [errMessage, SetErrMessage] = useState('');
    const [dialogContent, setDialogContent] = useState("");
    const [dialogTitle, setDialogTitle] = useState("");
    const [open, setOpen] = useState(false);
    const [isEnableNextBtn, setIsEnableNextBtn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [editInitValues, setEditInitValues] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [centerLicenceNumber, setCenterLicenceNumber] = useState(location.state ? location.state.centerLicenceNumber : "1");
    const reqNum = location.state?.reqNum;
    const taskID = location.state?.taskID;
    const formEdit = location.state?.formEdit
    const [showSummary, setShowSummary] = useState(false);
    const [expDate, setExpDate] = useState({});
    const formType = location.state ? location.state.formType : null;
    const [staffTypes, setStaffTypes] = useState([]);
    const [center, setCenter] = useState({});
    const [details, setDetails] = useState({});

    useEffect(async () => {
        console.log("TransferCenterLocationRequest :: centerLicenceNumber: " + centerLicenceNumber)
        const { email } = await getCurrentUser();
        if (!!formEdit) {
            setIsLoading(true);
            setRenewableLicenses([{ licenceNumber: centerLicenceNumber }]);
            await getCentertDetails(centerLicenceNumber);

            setIsLoading(true);
            const getReqDetails = await getRequestDetails(reqNum)
            if (!getReqDetails.isSuccessful) {
                SetErrMessage(getReqDetails.message)
            } else {
                let Details = getReqDetails.responseBody.requestDetails.data
                Details = { NewCenterLocationData: { ...Details.processVariablesDump.NewCenterLocationData }, center: { ...Details.center } }
                console.log("Details+++++++++++++", Details)
                const date = Details?.NewCenterLocationData?.centerInfo_r?.expirarionDateForFireDepartmentLicenseHijri;
                const expDate = {}
                if (!!date) {
                    let returned = getDateFromObject(date, 'iYYYYiMMiDD', 'iDD');
                    if (!isNaN(returned)) {
                        expDate.day = Number.parseInt(returned)
                    }
                    returned = getDateFromObject(date, 'iYYYYiMMiDD', 'iMM');
                    if (!isNaN(returned)) {
                        expDate.month = Number.parseInt(returned)
                    }
                    returned = getDateFromObject(date, 'iYYYYiMMiDD', 'iYYYY');
                    if (!isNaN(returned)) {
                        expDate.year = Number.parseInt(returned)
                    }
                }
                setExpDate(expDate)
                setDetails(Details)
                setIsEnableNextBtn(true)
                setIsLoading(false);
            }
        } else {
            console.log("------------------------------- email " + email)

            setIsLoading(true);
            const getCentersRs = await getCentersForFinalNoExpired(email);

            SetErrMessage("");
            if (!getCentersRs.isSuccessful) {
                SetErrMessage(getCentersRs.message);
                setIsLoading(false);
            } else {
                const { Centers } = getCentersRs.responseBody.data;
                setRenewableLicenses(Centers);
                setIsLoading(false);
            }
        }
    }, [])

    const getCentertDetails = async (licenceNumber) => {
        setIsLoading(true)
        SetErrMessage("");
        const response = await CentertDetails(licenceNumber)
        console.log("===> getCentertDetails response: " + JSON.stringify(response))

        if (response.responseBody && response.responseBody.data && response.responseBody.data.center) {
            const attach = response.responseBody.data.center && response.responseBody.data.center.centerInfo_r && response.responseBody.data.center.centerInfo_r.operationPlan && response.responseBody.data.center.centerInfo_r.operationPlan.id;
            console.log('===> attach: ' + JSON.stringify(attach))
            const crNum = response.responseBody.data.center.crInfo_r.crNumber;

            if (crNum != '') {
                const validateMomraRs = await getMunicipalLicenseNoApi(crNum)
                if (!validateMomraRs.isSuccessful) {
                    console.log("===> getMunicipalLicenseNoApi ERROR!: " + validateMomraRs.message)
                    SetErrMessage(validateMomraRs.message);
                    setEditInitValues(response.responseBody.data);
                    setIsLoading(false);
                    setShowSummary(false);
                    return response.responseBody.data;
                }
                const validateCompanyRs = await validateCompanyFunc(crNum)
                if (!validateCompanyRs.isSuccessful) {
                    console.log("===> validateCompanyFunc ERROR!: " + validateCompanyRs.message)
                    SetErrMessage(validateCompanyRs.message);
                    setEditInitValues(response.responseBody.data);
                    setIsLoading(false);
                    setShowSummary(false);
                    return response.responseBody.data;
                }
                // setIsEnableNextBtn(true);
            }
            else {
                console.log(' ===> ERROR Wrong Data - No CrNumber, => response' + JSON.stringify(response))
                SetErrMessage("لا يوجد رقم تسجيل");
                setEditInitValues(response.responseBody.data);
                setIsLoading(false);
                setShowSummary(false);
                return
            }
        }

        if (!response.isSuccessful) {
            SetErrMessage(response.message);
        }
        else {
            setEditInitValues(response.responseBody.data);
            setCenter(response.responseBody.data.center)
            setEditMode(true);
            setIsLoading(false);
            setShowSummary(true);
            return response.responseBody.data;
        }
    }
    const handleClickOpen = (dialogContent, dialogTitle) => {
        setDialogContent(dialogContent);
        setDialogTitle(dialogTitle)
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        navigate('/app/dashboard', { replace: true });
    };

    const onSubmit = async (values) => {
        console.log("values++++++++++++", JSON.stringify(values))
        const response = await centerLocationTransferAPIFunc(values, !!formEdit, taskID);
        console.log("response.isSuccessful", response.isSuccessful);
        if (response.isSuccessful) {
            handleClickOpen(`${response.responseBody.data.message}`, '');
        }
        else {
            SetErrMessage(`${response.message}`);
            setIsLoading(false)
        }
    };

    return (
        <Container maxWidth="md">
            <Card>
                <CardHeader
                    title="نقل مقر مركز أهلي"
                />
                <Divider />
                {errMessage && (
                    <Alert variant="outlined" severity="error">
                        {errMessage}
                    </Alert>
                )}
                <CardContent>
                    {!isLoading ?
                        <FinalFromWizard
                            initialValues={{
                                agree: [],
                                isNextBtnDisabled: false,
                                managersCount: 0,
                                teachersCount: 0,
                                centerType: center && center.type && center.targetedBeneficiary && center.targetedServices
                                    && centerTypeJSON.type[parseInt(center.type)] && centerTypeJSON.targetedBeneficiary[parseInt(center.targetedBeneficiary)] && centerTypeJSON.targetedBeneficiary[parseInt(center.targetedBeneficiary)] && centerTypeJSON.targetedServices[parseInt(center.targetedServices)]
                                    && centerTypeJSON.type[parseInt(center.type)].name + ' - ' + centerTypeJSON.targetedBeneficiary[parseInt(center.targetedBeneficiary)].name + ' - ' + centerTypeJSON.targetedServices[parseInt(center.targetedServices)].name,
                                CRNumber: center && center.crInfo_r && center.crInfo_r.crNumber,
                                centerLicenceNumber: center && center.licenceNumber,
                                temporaryLicenceNum: center && center.licenceNumber,
                                licenseCreationDate: center && dateFormatter(center.creationDate),
                                licenseExpiryDate: center && dateFormatter(center.expirationDate),
                                ownerName: center && center.ownerName,
                                ownerID: center && center.ownerID,
                                centerAgeGroup: center && center.ageGroup && reverseRange(center.ageGroup),
                                centerGenderGroup: center
                                    && center.targetedGender &&
                                    (center.targetedGender === "m" ? "ذكر" : (center.targetedGender === "f" ? "انثى" : "كلا الجنسين")),
                                CRNumber: center && center.crInfo_r && center.crInfo_r.crNumber,
                                companyName: center && center.crInfo_r && center.crInfo_r.entityName,
                                activities: center && center.crInfo_r && center.crInfo_r.crActivityType,
                                // municipLicenseNo: center && center.crInfo_r && center.crInfo_r.MoMRA_Licence,
                                beneficiariesNum: center && center.centerInfo_r && center.centerInfo_r.beneficiaryCount,
                                newCapacity: center && center.centerInfo_r && numeral(center.centerInfo_r.carryingnumber).format('0,0'),
                                financialGuarantee: center && center.centerInfo_r && `${numeral(center.centerInfo_r.financialGuarantee).format('0,0.00')} ر.س.`,

                                //getting the formEdit Data if exist
                                buildingArea: details?.NewCenterLocationData?.centerInfo_r?.buildingArea,
                                basementArea: details?.NewCenterLocationData?.centerInfo_r?.basementArea,
                                buildNo: details?.NewCenterLocationData?.centerLocation_r?.buildNo,
                                capacity: null,
                                ...expDate,
                                city: details?.NewCenterLocationData?.centerLocation_r?.city,
                                buildNo: details?.NewCenterLocationData?.centerLocation_r?.buildNo,
                                street: details?.NewCenterLocationData?.centerLocation_r?.street,
                                sub: details?.NewCenterLocationData?.centerLocation_r?.area,
                                postalCode: details?.NewCenterLocationData?.centerLocation_r?.postalCode,
                                additionalNo: details?.NewCenterLocationData?.centerLocation_r?.additionalNo,
                                // OfficeReport: [center && center.centerInfo_r && center.centerInfo_r.engineeringPlan && (center.centerInfo_r.engineeringPlan || center.centerInfo_r.engineeringPlan.id)],
                                Furniture: [details?.NewCenterLocationData?.centerInfo_r?.furniturePhoto_r.map(f => f.Document)],
                                municipLicenseNo: [details?.NewCenterLocationData?.centerInfo_r?.momraDoc],
                                fireDepartmentLicense: [details?.NewCenterLocationData?.centerInfo_r?.fireDepartmentLicense],
                                OfficeReport: [details?.NewCenterLocationData?.centerInfo_r?.engineeringPlan],

                                SecurityReport: center && center.centerInfo_r && [center.centerInfo_r.securityReport && (center.centerInfo_r.securityReport || center.centerInfo_r.securityReport.id)],
                                OperationalPlan: [center && center.centerInfo_r && center.centerInfo_r.operationPlan && (center.centerInfo_r.operationPlan || center.centerInfo_r.operationPlan.id)],
                                ExecutivePlan: [center && center.centerInfo_r && center.centerInfo_r.executivePlan && (center.centerInfo_r.executivePlan || center.centerInfo_r.executivePlan.id)],

                                // Furniture: center && center.centerInfo_r && center.centerInfo_r.furniturePhoto_r && (center.centerInfo_r.furniturePhoto_r.map(d => d.Document) || center.centerInfo_r.furniturePhoto_r.map(d => d.Document.id)),
                                FinancialGuaranteeAtt: [center && center.centerInfo_r && center.centerInfo_r.financialGuarbteeAtt && (center.centerInfo_r.financialGuarbteeAtt || center.centerInfo_r.financialGuarbteeAtt.id)],
                                healthServices: center && center.centerInfo_r && center.isHealthCareServices ? "yes" : "no",
                                healthServiceType: center && center.centerInfo_r && center.healthCareServices_r && center.healthCareServices_r.type,
                                // healthServiceAttachment: center.centerInfo_r.financialGuarbteeAtt,
                                healthServiceAttachment: [center && center.centerInfo_r && center.healthCareServices_r && center.healthCareServices_r.attachment && (center.healthCareServices_r.attachment || center.healthCareServices_r.attachment.id)],
                                customers: editInitValues?.staff && getStaff(editInitValues?.staff),
                                page: formType === LICENSE_FORM_TYPES.RENEW ? 1 : 0,
                                formType: formType

                            }}
                            cancelBtnFn={() => { navigate('/app/products', { replace: true }); }}
                            isEnableCancelBtn={true}
                            isEnableNextBtn={isEnableNextBtn}
                            showSummary={showSummary}
                            onSubmit={onSubmit}
                        >
                            <FinalFromWizardLicenseDataPage
                                label="بيانات الترخيص النهائي "
                                formEdit={!!formEdit}
                                validate={CenterDetailsValidation}
                                renewableLicenses={renewableLicenses}
                                setCenterLicenceNumber={setCenterLicenceNumber}
                                showSummary={showSummary}
                                setShowSummary={setShowSummary}
                                getCentertDetails={getCentertDetails}
                                setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
                            />
                            <FinalFromWizarLocationDataPage
                                label="بيانات المقر الجديد للمركز "
                                validate={(values) => AttachementValidation(values)}

                                setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
                            />
                            <FinalFromWizardAddressPage
                                label="تعبئة بيانات العنوان الوطني "
                                validate={(values) => NewAddressValidation(values)}
                                setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}

                            />
                            <FinalFromWizarTermsPage
                                label="الإقرار والتعهد"
                                setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
                            />
                        </FinalFromWizard>
                        :
                        <CircularProgress size="15rem" style={{
                            display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto', color: '#E2E8EB'
                        }} />
                    }
                </CardContent>
            </Card>
            <AlertDialog dialogContent={dialogContent} dialogTitle={dialogTitle} open={open} onClose={handleClose} acceptBtnName="تم" />

        </Container>
    );
}

const FinalFromWizardLicenseDataPage = ({ validate, formEdit, setIsEnableNextBtn, setCenterLicenceNumber, values, showSummary, isLoading, getCentertDetails, setShowSummary, renewableLicenses, setField }) => (
    <Box>
        <FinalLicenseData
            values={values}
            formEdit={formEdit}
            setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
            validate={CenterDetailsValidation}
            renewableLicenses={renewableLicenses}
            setCenterLicenceNumber={setCenterLicenceNumber}
            showSummary={showSummary}
            setShowSummary={setShowSummary}
            setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
            isLoading={isLoading}
            getCentertDetails={getCentertDetails}
        />
    </Box>

);

const FinalFromWizarLocationDataPage = ({ values, validate, setField, setIsEnableNextBtn }) => (
    <Box>
        <NewLocationData
            values={values}
            setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
            setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
        />
    </Box>
);

const FinalFromWizardAddressPage = ({ validate, setField, setIsEnableNextBtn }) => (
    <Box>
        <NewCenterAddress
            Condition={ConditionComp}
            setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
            setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
        />
    </Box>
);

const FinalFromWizarTermsPage = ({ values, validate, setField, setIsEnableNextBtn }) => (
    <Box>
        <Terms
            values={values}
            setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
            setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
        />
    </Box>

);

export default TransferCenterLocationRequest;

