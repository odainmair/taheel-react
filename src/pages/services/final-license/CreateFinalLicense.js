/* eslint-disable */
import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { getCurrentUser } from 'src/utils/UserLocalStorage';
import { useState, useEffect } from 'react';
import CenterDetails from './sections/CenterDetails'
import Requirements from './sections/Requirements'
import Capacity from './sections/Capacity';
import HealthServices from './sections/HealthServices';
import PersonDetials from './sections/staff/PersonDetials';
import Summary from './sections/Summary'
import RenewalSummary from './sections/RenewalSummary'
import { updateFinalLicenseAPIFunc } from './services/finalLicenseAPI'
import { getTempLicense } from './services/finalLicenseAPI'
import { TaskDetails, CentertDetails } from './services/finalLicenseAPI'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Container,
  Alert,
  CircularProgress,
  Grid,
  AlertTitle,
} from '@material-ui/core';
import FinalFromWizard from '../../../components/wizard/FinalFormWizard';
import AlertDialog from 'src/components/AlertDialog';
import { CenterDetailsValidation, getStaff } from './services/finalLicenseUtil';
import { capacityValidation } from './services/finalLicenseUtil'
import { RequirementsValidation } from './services/finalLicenseUtil'
import { healthServicesValidation } from './services/finalLicenseUtil'
import { personsValidation } from './services/finalLicenseUtil'
import { ConditionComp } from './services/finalLicenseUtil'
import { MedicalPracticeComp } from './services/finalLicenseUtil'
import { calculationConditionComp, centerTypeJSON } from './services/finalLicenseUtil'
import { dateFormatter, reverseRange } from 'src/utils/utilFunctions';
import { LICENSE_FORM_TYPES } from 'src/utils/enums'
import numeral from 'numeral';

const CreateFinalLicense = () => {
  const [temporaryLicenses, SetTemporaryLicenses] = useState([])
  const [open, setOpen] = useState(false);
  const [isEnableNextBtn, setIsEnableNextBtn] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const centerLicenceNumber = location.state ? location.state.centerLicenceNumber : null;
  const formType = location.state ? location.state.formType : null;
  const [editMode, setEditMode] = useState(false);
  const [center, setCenter] = useState({});
  const [editInitValues, setEditInitValues] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [canShowSection, setCanShowSection] = useState(true);
  const [errMessage, SetErrMessage] = useState('')
  const taskID = location.state ? location.state.taskID : null;
  const requestNum = location.state ? location.state.requestNum : "";

  useEffect(async () => {
    SetErrMessage("");
    setIsLoading(true);
    console.log("===> formType: " + formType)
    const { email } = await getCurrentUser();
    if (formType != LICENSE_FORM_TYPES.RENEW && formType != LICENSE_FORM_TYPES.EDIT) {
      const getCentersRs = await getTempLicense(email);
      if (!getCentersRs.isSuccessful) {
        SetErrMessage("لا يمكنك التقديم على الخدمة الترخيص النهائي في حال لا يوجد لديك ترخيص مؤقت");
        setCanShowSection(false);
        setIsLoading(false);
        return;
      } else {
        const { Centers } = getCentersRs.responseBody.data;
        SetTemporaryLicenses(Centers);
      }
    }
    if (centerLicenceNumber && formType === LICENSE_FORM_TYPES.EDIT) {
      const response = await getTaskDetails()
      // editInitValues.center[0]
      // setCenter(editInitValues.center[0])
    }
    if(centerLicenceNumber && formType === LICENSE_FORM_TYPES.RENEW) {
      const response = await getCentertDetails(centerLicenceNumber)
      setEditMode(false)
    }
    setIsLoading(false);
  }, [])

  const getTaskDetails = async () => {
    setEditMode(true)
    SetErrMessage("");
    const response = await TaskDetails(taskID)
    console.log("getTaskDetails ===============> response:" + JSON.stringify(response) )
    if (!response.isSuccessful)
      SetErrMessage(response.message)
    else {
      setEditInitValues(response.responseBody.data)
      setCenter(response.responseBody.data.center[0])
      setIsLoading(false)
      return response.responseBody.data
    }
  }

  const getCentertDetails = async (centerLicenceNumber) => {
    setIsLoading(true)
    SetErrMessage("");
    const response = await CentertDetails(centerLicenceNumber)
    console.log("getCentertDetails ===============> response:" + JSON.stringify(response) )
    if (!response.isSuccessful){
      SetErrMessage(response.message);
    }
    else {
      setEditInitValues(response.responseBody.data);
      setCenter(response.responseBody.data.center)
      setEditMode(true);
      setIsLoading(false);
      // setShowSummary(true);
      return response.responseBody.data;
    }
  }

  const onSubmit = async (values) => {
    let response = null
    if(values.formType === LICENSE_FORM_TYPES.RENEW) {
      response = await updateFinalLicenseAPIFunc(values, formType, 0);
      if (response.isSuccessful) {
        handleClickOpen(`${response.responseBody.data[0]}`, '');
      }
      else {
        SetErrMessage(`${response.message}`);
        setIsLoading(false)
      }
    }
    else if (!editMode) {
      response = await updateFinalLicenseAPIFunc(values, formType, 0);
      handleClickOpen(` تم تقديم طلب ${response.responseBody.data.requestNumber} لإصدار الترخيص النهائي رقم ${values.temporaryLicenceNum} يرجى تسليم أصل الضمان البنكي إلى وكالة التأهيل والتوجيه الإجتماعي بوزارة الموارد البشرية والتنمية الإجتماعية لانهاء إجراءات الطلب خلال 3 أيام عمل`, '');
    }
    else {
      response = await updateFinalLicenseAPIFunc(values, formType, taskID);
      handleClickOpen(` تم تقديم طلب ${requestNum} لإصدار الترخيص النهائي رقم ${values.temporaryLicenceNum} يرجى تسليم أصل الضمان البنكي إلى وكالة التأهيل والتوجيه الإجتماعي بوزارة الموارد البشرية والتنمية الإجتماعية لانهاء إجراءات الطلب خلال 3 أيام عمل`, '');
    }
  };

  const handleClickOpen = (dialogContent, dialogTitle) => {
    setDialogContent(dialogContent);
    setDialogTitle(dialogTitle)
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    navigate('/app/dashboard', { replace: true });
  };
  return (
    <Container maxWidth="md">
      <Card>
        {!isLoading && formType != LICENSE_FORM_TYPES.RENEW && (
        <CardHeader
          title={!editMode?"اصدار ترخيص نهائي لمركز تأهيل أهلي": `تعديل طلب ترخيص نهائي - ${requestNum}`}
        />    
        )}
        {!isLoading && formType === LICENSE_FORM_TYPES.RENEW && ( 
        <CardHeader
          title={`طلب تجديد رخصة نهائية`}
        />    
        )}
        <Divider />
        {!isLoading && editMode &&
          <Alert variant="outlined" severity="warning" sx={{ marginLeft: 2, marginRight: 2, marginTop: 1 }}>
            <AlertTitle> يرجى مراجعة طلب رقم {requestNum}</AlertTitle>
            {editInitValues.chairmanComment && editInitValues.chairmanComment.comment}
          </Alert>
        }
        {errMessage && (
          <Alert variant="outlined" severity="error">
            {errMessage}
          </Alert>
        )}
        <CardContent>
          {!isLoading ?
            <>

              <FinalFromWizard
                initialValues={!editMode ? {
                  agree: [],
                  isNextBtnDisabled: false,
                  managersCount: 0,
                  teachersCount: 0,
                  page: formType === LICENSE_FORM_TYPES.RENEW ? 1 : 0,
                  formType: formType
                } : {
                  agree: [],
                  isNextBtnDisabled: false,
                  managersCount: 0,
                  teachersCount: 0,
                  centerType: center && center.type && center.targetedBeneficiary && center.targetedServices 
                  && centerTypeJSON.type[parseInt(center.type)] && centerTypeJSON.targetedBeneficiary[parseInt(center.targetedBeneficiary)] && centerTypeJSON.targetedBeneficiary[parseInt(center.targetedBeneficiary)] && centerTypeJSON.targetedServices[parseInt(center.targetedServices)] 
                  && centerTypeJSON.type[parseInt(center.type)].name + ' - ' + centerTypeJSON.targetedBeneficiary[parseInt(center.targetedBeneficiary)].name + ' - ' + centerTypeJSON.targetedServices[parseInt(center.targetedServices)].name, 
                  CRNumber: center.crInfo_r.crNumber,
                  temporaryLicenceNum: center.licenceNumber,
                  licenseCreationDate: center && dateFormatter(center.creationDate),
                  licenseExpiryDate: center && dateFormatter(center.expirationDate),
                  ownerName: center && center.ownerName,
                  ownerID: center && center.ownerID,
                  centerAgeGroup: center && reverseRange(center.ageGroup),
                  centerGenderGroup: center 
                  && center.targetedGender && 
                    (center.targetedGender === "m" ? "ذكر" : (center.targetedGender === "f" ? "انثى" :"كلا الجنسين")) ,
                  CRNumber: center && center.crInfo_r.crNumber,
                  companyName: center.crInfo_r.entityName,
                  activities: center.crInfo_r.crActivityType,
                  municipLicenseNo: center.crInfo_r.MoMRA_Licence,
                  beneficiariesNum: center.centerInfo_r.beneficiaryCount,
                  capacity: numeral(center.centerInfo_r.carryingnumber).format('0,0'),
                  financialGuarantee: `${numeral(center.centerInfo_r.financialGuarantee).format('0,0.00')} ر.س.`,
                  buildingArea: center.centerInfo_r.buildingArea,
                  basementArea: center.centerInfo_r.basementArea,
                  OperationalPlan: [center.centerInfo_r.operationPlan && center.centerInfo_r.operationPlan.id],
                  ExecutivePlan: [center && center.centerInfo_r && center.centerInfo_r.executivePlan && center.centerInfo_r.executivePlan.id],
                  OfficeReport: [center && center.centerInfo_r && center.centerInfo_r.engineeringPlan && center.centerInfo_r.engineeringPlan.id],
                  SecurityReport: center && center.centerInfo_r && [center.centerInfo_r.securityReport && center.centerInfo_r.securityReport.id],
                  Furniture: center && center.centerInfo_r && center.centerInfo_r.furniturePhoto_r && center.centerInfo_r.furniturePhoto_r.map(d => d.Document.id),
                  // Furniture: [1202],
                  FinancialGuaranteeAtt: [center && center.centerInfo_r && center.centerInfo_r.financialGuarbteeAtt && center.centerInfo_r.financialGuarbteeAtt.id],
                  healthServices: center && center.centerInfo_r && center.isHealthCareServices ? "yes" : "no",
                  healthServiceType: center && center.centerInfo_r && center.healthCareServices_r && center.healthCareServices_r.type,
                  // healthServiceAttachment: center.centerInfo_r.financialGuarbteeAtt,
                  healthServiceAttachment: [center && center.centerInfo_r && center.healthCareServices_r && center.healthCareServices_r.attachment && center.healthCareServices_r.attachment.id],
                  customers: getStaff(editInitValues.staff),
                  page: formType === LICENSE_FORM_TYPES.RENEW ? 1 : 0,
                  formType: formType
                }}
                isEnableNextBtn={isEnableNextBtn}
                onSubmit={onSubmit}
                cancelBtnFn={()=>{  navigate('/app/products', { replace: true });}}
                isEnableCancelBtn={true} 
                canShowSection={canShowSection}   
              >
    
                <FinalFromWizardCenterDetailsPage
                  centerLicenceNumber={centerLicenceNumber}
                  validate={CenterDetailsValidation}
                  temporaryLicenses={temporaryLicenses}
                  editMode={editMode}
                  setEditMode={setEditMode}
                  setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
                  label="معلومات المركز" />
                <FinalFromWizardCapacityPage
                  validate={capacityValidation}
                  editMode={editMode}
                  setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
                  label="الطاقة الإستعابية والضمان المالي" />
                <FinalFromWizardRequirements
                  validate={(values) => RequirementsValidation(values)}
                  label="المتطلبات" />
                <FinalFromWizardHealthServices
                  validate={(values) => healthServicesValidation(values)}
                  label="الخدمات الصحية"
                  editMode={editMode} />
                <FinalFromWizardPersonsPage
                  nextFun={(values) => personsValidation(values)}
                  label="معلومات الكوادر"
                  editMode={editMode} />
                <FinalFromWizardSummary
                  label="الملخص" />
              </FinalFromWizard>
            </>
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
};

const FinalFromWizardCenterDetailsPage = ({
  setField,
  temporaryLicenses,
  editMode,
  setEditMode,
  values,
  centerLicenceNumber,
  setIsEnableNextBtn }) => (
  <>
    <CenterDetails
      Condition={calculationConditionComp}
      values={values}
      centerLicenceNumber={centerLicenceNumber}
      temporaryLicenses={temporaryLicenses}
      setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
      editMode={editMode}
      setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
      setEditMode={setEditMode}
    />
  </>
);

const FinalFromWizardCapacityPage = ({ editMode, values, setField, setIsEnableNextBtn }) => (
  <>
    <Capacity
      Condition={calculationConditionComp}
      values={values}
      setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
      setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
      editMode={editMode}
    />
  </>
);

const FinalFromWizardRequirements = ({ setField, temporaryLicenses, values }) => (
  <>
    <Requirements
      Condition={ConditionComp}
      values={values}
      temporaryLicenses={temporaryLicenses}
      setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
    />
  </>
)

const FinalFromWizardHealthServices = ({ editMode, setField, temporaryLicenses, values }) => (
  <>
    <HealthServices
      Condition={ConditionComp}
      values={values}
      temporaryLicenses={temporaryLicenses}
      setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
      editMode={editMode}
    />
  </>
);

const FinalFromWizardPersonsPage = ({ editMode, label, validate, setField, pop, push, values }) => (
  <>
    <PersonDetials
      MedicalPracticeCondition={MedicalPracticeComp}
      Condition={ConditionComp}
      setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
      pop={pop}
      push={push}
      values={values}
      editMode={editMode}
    />
  </>
);

const FinalFromWizardSummary = ({ setField, temporaryLicenses, values }) => (
  <>
  { values.formType != LICENSE_FORM_TYPES.RENEW ?
    <Summary
      values={values}
      temporaryLicenses={temporaryLicenses}
      setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
      />
      :
    <RenewalSummary
      values={values}
      setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
      />
  }
  </>
);

export default CreateFinalLicense;
