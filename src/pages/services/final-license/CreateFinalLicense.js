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
} from '@material-ui/core';
import FinalFromWizard from '../../../components/wizard/FinalFormWizard';
import AlertDialog from 'src/components/AlertDialog';
import { CenterDetailsValidation } from './services/finalLicenseUtil';
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
  useEffect(async () => {
    const { email } = await getCurrentUser();
    const getCentersRs = await getTempLicense(email)
    const { Centers } = getCentersRs.responseBody.data;
    SetTemporaryLicenses(Centers)

    if (centerLicenceNumber) {
      const response = await getTaskDetails()
    }
    else
      setIsLoading(false)
  }, [])


  const getStaff = (data) => {
    const newKeys = {
      idNumIqamaNum: 'idNumber',
      birthDate: 'birthDate',
      name: 'fullName',
      gender: 'gender',
      nationality: 'nationality',
      StaffType: 'staffTypes',
      CV: 'cv',
      educationQualifications: 'EducationalQualification',
      professionalLicense: 'MedicalPractice',
    }

    const staffTypes = ["معلم تربية خاصة", "أخصائي اجتماعي", "مراقب اجتماعي", "حارس", "عامل تنظيفات", "مشرف فني عام", "اخصائي نفسي و توجيه اجتماعي", "عامل رعاية شخصية", "مدير", "سائق", "مرافق سائق", "أخصائي علاج طبيعي", "أخصائي علاج وظيفي", "أخصائي نطق و تخاطب", "ممرض"]
    var staff = JSON.parse(JSON.stringify(data))

    staff.map((customer) => {
      Object.keys(customer).map((key) => {
        if (customer[key]) {
          const newKey = newKeys[key] || key;
          if (key === 'gender')
            customer[newKey] = customer[key] === 'f' ? 'انثى' : 'ذكر'
          else if (key === 'idNumIqamaNum') {
            if (key === 'سعودي')
              customer['idNumber'] = customer[key]
            else
              customer['iqamaNo'] = customer[key]
          }
          else if (key === 'StaffType')
            customer[newKey] = staffTypes[customer[key] - 1]
          else if (['professionalLicense', 'educationQualifications', 'CV'].includes(key))
            customer[newKey] = [customer[key].id]
          else
            customer[newKey] = customer[key];
          if (!customer[newKey] || newKey !== key)
            delete customer[key]
        }
      })
    });
    return staff
  }

  const getTaskDetails = async () => {
    setEditMode(true)
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
    else
      response = await updateFinalLicenseAPIFunc(values, taskID);
    handleClickOpen(` تم تقديم طلب ${response.responseBody.data.requestNumber} لإصدار الترخيص النهائي رقم ${values.temporaryLicenceNum} يرجى تسليم أصل الضمان البنكي إلى وكالة التأهيل والتوجيه الإجتماعي بوزارة الموارد البشرية والتنمية الإجتماعية لانهاء إجراءات الطلب خلال 3 أيام عمل`, '');
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
        <CardHeader
          title="اصدار ترخيص نهائي لمركز تأهيل أهلي"
        />
        <Divider />
        {errMessage && (
          <Alert variant="outlined" severity="error">
            {errMessage}
          </Alert>
        )}

        <CardContent>
          {!isLoading ?
            <>
              {editMode &&
                <Alert severity="error" style={{ position: 'fixed', color:'white', background: 'red', top: 50, right: 0, width: '100%', zIndex: 100, opacity: 0.8 }}>
                  {editInitValues.chairmanComment.comment}
                </Alert>
              }
              <FinalFromWizard
                initialValues={!editMode ? {
                  agree: [],
                  isNextBtnDisabled: false,
                  managersCount: 0,
                  teachersCount: 0,
                  beneficiariesNum: 0, ////////
                }
                  :
                  {
                    agree: [],
                    isNextBtnDisabled: false,
                    managersCount: 0,
                    teachersCount: 0,
                    CRNumber: editInitValues.center[0].crInfo_r.crNumber,
                    temporaryLicenceNum: editInitValues.center[0].licenceNumber,
                    companyName: editInitValues.center[0].crInfo_r.entityName,
                    activities: editInitValues.center[0].crInfo_r.crActivityType,
                    municipLicenseNo: editInitValues.center[0].crInfo_r.MoMRA_Licence,

                    beneficiariesNum: editInitValues.center[0].centerInfo_r.beneficiaryCount, //////////////
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
                    healthServiceAttachment: [1202],
                    customers: getStaff(editInitValues.staff),
                  }
                }
                onSubmit={onSubmit}
              >

                <FinalFromWizardCenterDetailsPage
                  centerLicenceNumber={centerLicenceNumber}
                  validate={CenterDetailsValidation}
                  temporaryLicenses={temporaryLicenses}
                  editMode={editMode}
                  setEditMode={setEditMode}
                  label="معلومات المركز">
                </FinalFromWizardCenterDetailsPage>

                <FinalFromWizardCapacityPage
                  validate={capacityValidation}
                  editMode={editMode}
                  label="الطاقة الإستعابية والضمان المالي">
                </FinalFromWizardCapacityPage>

                <FinalFromWizardRequirements
                  nextFun={(values) => RequirementsValidation(values)}
                  label="المتطلبات">
                </FinalFromWizardRequirements>

                <FinalFromWizardHealthServices
                  nextFun={(values) => healthServicesValidation(values)}
                  label="الخدمات الضحية"
                  editMode={editMode}>
                </FinalFromWizardHealthServices>

                <FinalFromWizardPersonsPage
                  nextFun={(values) => personsValidation(values)}
                  label="معلومات الكوادر"
                  editMode={editMode}>
                </FinalFromWizardPersonsPage>

                <FinalFromWizardSummary
                  label="الملخص">
                </FinalFromWizardSummary>

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

const FinalFromWizardCenterDetailsPage = ({ setField, temporaryLicenses, editMode, setEditMode, values, centerLicenceNumber }) => (
  <Box>
    <CenterDetails
      Condition={calculationConditionComp}
      values={values}
      centerLicenceNumber={centerLicenceNumber}
      temporaryLicenses={temporaryLicenses}
      setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
      editMode={editMode}
      setEditMode={setEditMode}
    />
  </Box>
);

const FinalFromWizardCapacityPage = ({ editMode, values, setField }) => (
  <Box>
    <Capacity
      Condition={calculationConditionComp}
      values={values}
      setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
      editMode={editMode}
    />
  </Box>
);

const FinalFromWizardRequirements = ({ setField, temporaryLicenses, values }) => (
  <Box>
    <Requirements
      Condition={ConditionComp}
      values={values}
      temporaryLicenses={temporaryLicenses}
      setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
    />
  </Box>
)

const FinalFromWizardHealthServices = ({ editMode, setField, temporaryLicenses, values }) => (
  <Box>
    <HealthServices
      Condition={ConditionComp}
      values={values}
      temporaryLicenses={temporaryLicenses}
      setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
      editMode={editMode}
    />
  </Box>
);

const FinalFromWizardPersonsPage = ({ editMode, label, validate, setField, pop, push, values }) => (
  <Box>
    <PersonDetials
      MedicalPracticeCondition={MedicalPracticeComp}
      Condition={ConditionComp}
      setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
      pop={pop}
      push={push}
      values={values}
      editMode={editMode}
    />
  </Box>
);

const FinalFromWizardSummary = ({ setField, temporaryLicenses, values }) => (
  <Box>
    <Summary
      values={values}
      temporaryLicenses={temporaryLicenses}
      setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
    />
  </Box>
);

export default CreateFinalLicense;
