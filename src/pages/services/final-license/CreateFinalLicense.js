/* eslint-disable */
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCurrentUser } from 'src/utils/UserLocalStorage';
import CenterDetails from './sections/CenterDetails'
import Requirements from './sections/Requirements'
import Capacity from './sections/Capacity';
import HealthServices from './sections/HealthServices';
import PersonDetials from './sections/staff/PersonDetials';
import Summary from './sections/Summary'
import { createFinalLicenseAPIFunc } from './services/finalLicenseAPI'
import { getTempLicense } from './services/finalLicenseAPI'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Container,
} from '@material-ui/core';
import FinalFromWizard from '../../../components/wizard/FinalFormWizard';
import AlertDialog from 'src/components/AlertDialog';
import { CenterDetailsValidation } from './services/finalLicenseUtil';
import { capacityValidation } from './services/finalLicenseUtil'
import { personsValidation } from './services/finalLicenseUtil'
import { ConditionComp } from './services/finalLicenseUtil'
import { MedicalPracticeComp } from './services/finalLicenseUtil'
import { calculationConditionComp } from './services/finalLicenseUtil'

const CreateFinalLicense = () => {
	const [temporaryLicenses, SetTemporaryLicenses] = React.useState([])
  const [open, setOpen] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState("");
  const [dialogTitle, setDialogTitle] = React.useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const centerLicenceNumber  = location.state ? location.state.centerLicenceNumber : null;


  React.useEffect(async () => {
		const userLicenses = []
		const { email } = getCurrentUser();
		const getCentersRs = await getTempLicense(email)
    const { Centers } = getCentersRs.responseBody.data;
		// data.responseBody.data.map((LicenceNumber) => {
		// 	userLicenses.push(LicenceNumber.centerLicenceNumber)
		// })
		SetTemporaryLicenses(Centers)
	}, [])

  const onSubmit = async (values) => {
    console.log(JSON.stringify(values))
    const response = await createFinalLicenseAPIFunc(values);
    console.log(JSON.stringify(response));
    handleClickOpen('تم تقديم طلبك بنجاح', '');
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

  console.log('ttest');
  return (
    <Container maxWidth="md">
      <Card>
        <CardHeader
          title="اصدار ترخيص نهائي لمركز تأهيل أهلي"
        />
        <Divider />
        <CardContent>
          <FinalFromWizard
            initialValues={{
              agree: [],
              isNextBtnDisabled:false,
              managersCount:0
            }}
            onSubmit={onSubmit}
          >
            {/* <FinalFromWizard.Page
              label="معلومات المركز"
              validate={CenterDetailsValidation}
            >
              <CenterDetails
                Condition={calculationConditionComp} />
            </FinalFromWizard.Page> */}

            <FinalFromWizardCenterDetailsPage centerLicenceNumber={centerLicenceNumber} validate={CenterDetailsValidation} temporaryLicenses = {temporaryLicenses} label="معلومات المركز">

            </FinalFromWizardCenterDetailsPage>


            {/* <FinalFromWizard.Page
              label="الطاقة الإستعابية والضمان المالي"
              validate= {capacityValidation}
            >
                <Capacity 
                  values={values}
                  Condition={calculationConditionComp}/>
            </FinalFromWizard.Page> */}

            <FinalFromWizardCapacityPage  validate= {capacityValidation} label="الطاقة الإستعابية والضمان المالي">

            </FinalFromWizardCapacityPage>

            <FinalFromWizardRequirements  label="المتطلبات">

            </FinalFromWizardRequirements>

            {/* <FinalFromWizard.Page
              label="المتطلبات"
            >
              <Requirements />
            </FinalFromWizard.Page> */}

            <FinalFromWizardHealthServices   label="الخدمات الضحية"></FinalFromWizardHealthServices>
            {/* <FinalFromWizard.Page
              label="الخدمات الضحية"
            >
              <HealthServices
                Condition={ConditionComp} />
            </FinalFromWizard.Page> */}
            <FinalFromWizardPersonsPage validate= {personsValidation} label="معلومات الكوادر">

            </FinalFromWizardPersonsPage>

            {/* <FinalFromWizard.Page
              label="معلومات الكوادر"
            >
            </FinalFromWizard.Page> */}

<FinalFromWizardSummary label="الملخص">

            </FinalFromWizardSummary>

            {/* <FinalFromWizard.Page
              label="الملخص"
            >
              <Summary dialog={handleClickOpen} />
            </FinalFromWizard.Page> */}

          </FinalFromWizard>
        </CardContent>
      </Card>
      <AlertDialog dialogContent={dialogContent} dialogTitle={dialogTitle} open={open} onClose={handleClose} acceptBtnName="تم" />
    </Container>
  );
};
const FinalFromWizardPersonsPage = ({ label, validate, setField, pop, push, values }) => (
  <Box>
    <PersonDetials
      MedicalPracticeCondition={MedicalPracticeComp}
      Condition={ConditionComp}
      setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
      pop={pop}
      push={push}
      values={values}

    />
  </Box>

);

const FinalFromWizardCapacityPage = ({ values, setField }) => (
  <Box>
    <Capacity
      Condition={calculationConditionComp}
      values={values}
      setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
    />
  </Box>

);

const FinalFromWizardCenterDetailsPage = ({setField,temporaryLicenses, values, centerLicenceNumber}) => (
  <Box>
    <CenterDetails
      Condition={calculationConditionComp}
      values={values}
      centerLicenceNumber ={centerLicenceNumber}
      temporaryLicenses = {temporaryLicenses} 
      setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
      
    />
  </Box>

);


const FinalFromWizardRequirements = ({setField,temporaryLicenses, values }) => (
  <Box>
    <Requirements
      Condition={ConditionComp}
      values={values}
      temporaryLicenses = {temporaryLicenses} 
      setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
      
    />
  </Box>
)

const FinalFromWizardHealthServices = ({setField,temporaryLicenses, values }) => (
  <Box>
    <HealthServices
      Condition={ConditionComp}
      values={values}
      temporaryLicenses = {temporaryLicenses} 
      setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
      
    />
  </Box>

);

const FinalFromWizardSummary = ({setField,temporaryLicenses, values }) => (
  <Box>
    <Summary
      // dialog={handleClickOpen}
      values={values}
      temporaryLicenses = {temporaryLicenses} 
      setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
      
    />
  </Box>

);

export default CreateFinalLicense;
