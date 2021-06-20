/* eslint-disable */
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCurrentUser } from 'src/utils/UserLocalStorage';
import { useState, useEffect } from 'react';
import CenterDetails from './sections/CenterDetails'
import Requirements from './sections/Requirements'
import Capacity from './sections/Capacity';
import HealthServices from './sections/HealthServices';
import PersonDetials from './sections/staff/PersonDetials';
import Summary from './sections/Summary'
import { createFinalLicenseAPIFunc } from './services/finalLicenseAPI'
import { updateFinalLicenseAPIFunc } from './services/finalLicenseAPI'
import { getTempLicense } from './services/finalLicenseAPI'
import { TaskDetails } from './services/finalLicenseAPI'
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
import { calculationConditionComp } from './services/finalLicenseUtil'
import zIndex from '@material-ui/core/styles/zIndex';

const CreateFinalLicense = () => {
  const [temporaryLicenses, SetTemporaryLicenses] = useState([])
  const [open, setOpen] = useState(false);
  const [isEnableNextBtn, setIsEnableNextBtn] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const centerLicenceNumber = location.state ? location.state.centerLicenceNumber : null;
  const [editMode, setEditMode] = useState(false);
  const [editInitValues, setEditInitValues] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errMessage, SetErrMessage] = useState('')
  const taskID = location.state ? location.state.taskID : null;
  const requestNum = location.state ? location.state.requestNum : "";
  useEffect(async () => {
    const { email } = await getCurrentUser();
    const getCentersRs = await getTempLicense(email);
    SetErrMessage("");
    if (!getCentersRs.isSuccessful) {
      SetErrMessage(getCentersRs.message);
    } else {
      const { Centers } = getCentersRs.responseBody.data;
      SetTemporaryLicenses(Centers);
    }
    if (centerLicenceNumber) {
      const response = await getTaskDetails()
    }
    else
      setIsLoading(false)
  }, [])

  const getTaskDetails = async () => {
    setEditMode(true)
    SetErrMessage("");
    const response = await TaskDetails(taskID)
    if (!response.isSuccessful)
      SetErrMessage(response.message)
    else {
      setEditInitValues(response.responseBody.data)
      setIsLoading(false)
      return response.responseBody.data
    }
  }

  const onSubmit = async (values) => {
    let response = null
    if (!editMode) {
      response = await createFinalLicenseAPIFunc(values);
      handleClickOpen(` تم تقديم طلب ${response.responseBody.data.requestNumber} لإصدار الترخيص النهائي رقم ${values.temporaryLicenceNum} يرجى تسليم أصل الضمان البنكي إلى وكالة التأهيل والتوجيه الإجتماعي بوزارة الموارد البشرية والتنمية الإجتماعية لانهاء إجراءات الطلب خلال 3 أيام عمل`, '');
    }
    else {
      response = await updateFinalLicenseAPIFunc(values, taskID);
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
        {!isLoading && (
        <CardHeader
          title={!editMode?"اصدار ترخيص نهائي لمركز تأهيل أهلي":
          `تعديل طلب ترخيص نهائي - ${requestNum}`}
        />    
        )}
        <Divider />
        {!isLoading && editMode &&
          <Alert variant="outlined" severity="warning" sx={{ marginLeft: 2, marginRight: 2, marginTop: 1 }}>
            <AlertTitle> يرجى مراجعة طلب رقم {requestNum}</AlertTitle>
            {editInitValues.chairmanComment.comment}
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
                } : {
                  agree: [],
                  isNextBtnDisabled: false,
                  managersCount: 0,
                  teachersCount: 0,
                  CRNumber: editInitValues.center[0].crInfo_r.crNumber,
                  temporaryLicenceNum: editInitValues.center[0].licenceNumber,
                  companyName: editInitValues.center[0].crInfo_r.entityName,
                  activities: editInitValues.center[0].crInfo_r.crActivityType,
                  municipLicenseNo: editInitValues.center[0].crInfo_r.MoMRA_Licence,
                  beneficiariesNum: editInitValues.center[0].centerInfo_r.beneficiaryCount,
                  capacity: editInitValues.center[0].centerInfo_r.carryingnumber,
                  financialGuarantee: `${editInitValues.center[0].centerInfo_r.financialGuarantee} ر.س.`,
                  buildingArea: editInitValues.center[0].centerInfo_r.buildingArea,
                  basementArea: editInitValues.center[0].centerInfo_r.basementArea,
                  // OperationalPlan: [editInitValues.center[0].centerInfo_r.operationPlan.id],
                  OperationalPlan: [12403],
                  ExecutivePlan: [editInitValues.center[0].centerInfo_r.executivePlan.id],
                  OfficeReport: [editInitValues.center[0].centerInfo_r.engineeringPlan.id],
                  SecurityReport: [editInitValues.center[0].centerInfo_r.securityReport.id],
                  // Furniture: editInitValues.center[0].centerInfo_r.carryingnumber,
                  Furniture: [1202],
                  FinancialGuaranteeAtt: [editInitValues.center[0].centerInfo_r.financialGuarbteeAtt.id],
                  healthServices: editInitValues.center[0].isHealthCareServices ? "yes" : "no",
                  healthServiceType: editInitValues.center[0].healthCareServices_r.type,
                  // healthServiceAttachment: editInitValues.center[0].centerInfo_r.financialGuarbteeAtt,
                  healthServiceAttachment:editInitValues.center[0].healthCareServices_r.attachment ? [editInitValues.center[0].healthCareServices_r.attachment.id]:null,
                  customers: getStaff(editInitValues.staff),
                }}
                isEnableNextBtn={isEnableNextBtn}
                onSubmit={onSubmit}
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
    <Summary
      values={values}
      temporaryLicenses={temporaryLicenses}
      setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
    />
  </>
);

export default CreateFinalLicense;
