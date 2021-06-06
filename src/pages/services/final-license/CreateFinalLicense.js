/* eslint-disable */
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCurrentUser } from 'src/utils/UserLocalStorage';
import {  useEffect } from 'react';
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
  const editMode = centerLicenceNumber ? true :false



  React.useEffect(async () => {
    const userLicenses = []
    const { email } = getCurrentUser();
    const getCentersRs = await getTempLicense(email)
    const { Centers } = getCentersRs.responseBody.data;
    SetTemporaryLicenses(Centers)

  
		
		// if (editMode) {
		// 	const respone = await getCentertDetails()
		// 	setField('CRNumber', respone.center.crNumber)
		// 	setField('temporaryLicenceNum', respone.center.licenceNumber)
		// 	setField('companyName', respone.center.crInfo_r.entityName)
		// 	setField('activities', respone.center.crActivityType)
		// 	setField('municipLicenseNo', respone.center.crInfo_r.MoMRA_Licence)
		// 	setField('beneficiariesNum', respone.center.centerInfo_r.beneficiaryCount)
		// }
  }, [])


  const getCentertDetails = async () => {
		if (values.temporaryLicenceNum ||editMode ) {
			const response = await CentertDetails(values.temporaryLicenceNum ? values.temporaryLicenceNum  : centerLicenceNumber)
			if (!response.isSuccessful)
				SetErrMessage(response.message)
			else {
				setField('centerParentType', response.responseBody.data.center.centerParentType)
				setField('centerFirstSubType', response.responseBody.data.center.centerFirstSubType)
				setField('centerSecondSubType', response.responseBody.data.center.centerSecondSubType)
				setField('crInfo_r', response.responseBody.data.center.crInfo_r.ID)
				setField('centerInfo_r', response.responseBody.data.center.centerInfo_r.ID)
				// setField('healthCareServices_r', response.responseBody.data.center.healthCareServices_r.ID)
				setField('healthCareServices_r', response.responseBody.data.center.healthCareServices_r)
				return response.responseBody.data
			}
			
		}
		
	}


  // useEffect( async () => {
	// 	setField('isNextBtnDisabled',true)
	// 	console.log('>>>>>>>>editMode****************************************************************',editMode)
	// 	if (editMode) {
	// 		const respone = await getCentertDetails()
	// 		console.log('>>>>>>>>respone****************************************************************',respone)
	// 		setField('CRNumber', respone.center.crNumber)
	// 		setField('temporaryLicenceNum', respone.center.licenceNumber)
	// 		setField('companyName', respone.center.crInfo_r.entityName)
	// 		setField('activities', respone.center.crActivityType)
	// 		setField('municipLicenseNo', respone.center.crInfo_r.MoMRA_Licence)
	// 		setField('beneficiariesNum', respone.center.centerInfo_r.beneficiaryCount)
	// 	}
	// }, []);

  const onSubmit = async (values) => {
    console.log(JSON.stringify(values))
    const response = await createFinalLicenseAPIFunc(values);
    console.log(JSON.stringify(response));
    handleClickOpen(` تم تقديم طلب ${values.temporaryLicenceNum} لإصدار الترخيص النهائي رقم ${response.responseBody.data.requestNumber} يرجى تسليم أصل الضمان البنكي إلى وكالة التأهيل والتوجيه الإجتماعي بوزارة الموارد البشرية والتنمية الإجتماعية لانهاء إجراءات الطلب خلال 3 أيام عمل`, '');
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
          <FinalFromWizard
            initialValues={{
              agree: [],
              isNextBtnDisabled: false,
              managersCount: 0,
              teachersCount: 0,
              beneficiariesNum: 0,
              // centerParentType: response.responseBody.data.center.centerParentType
            }}
            onSubmit={onSubmit}
          >


            <FinalFromWizardCenterDetailsPage centerLicenceNumber={centerLicenceNumber} validate={CenterDetailsValidation} temporaryLicenses = {temporaryLicenses} label="معلومات المركز">

            </FinalFromWizardCenterDetailsPage>



            <FinalFromWizardCapacityPage  validate= {capacityValidation} label="الطاقة الإستعابية والضمان المالي">

            </FinalFromWizardCapacityPage>

            <FinalFromWizardRequirements  validate= {RequirementsValidation} label="المتطلبات">

            </FinalFromWizardRequirements>

    

            <FinalFromWizardHealthServices   label="الخدمات الضحية"></FinalFromWizardHealthServices>
      
            <FinalFromWizardPersonsPage nextFun= {(values) =>personsValidation(values)} label="معلومات الكوادر">

            </FinalFromWizardPersonsPage>

<FinalFromWizardSummary label="الملخص">

            </FinalFromWizardSummary>

          </FinalFromWizard>
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
