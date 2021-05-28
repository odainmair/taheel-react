/* eslint-disable */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'src/utils/UserLocalStorage';
import CenterDetails from './sections/CenterDetails'
import Requirements from './sections/requirements'
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
import { ConditionComp } from './services/finalLicenseUtil'
import { ConditionStaffComp } from './services/finalLicenseUtil'
import { calculationConditionComp } from './services/finalLicenseUtil'
const CreateFinalLicense = () => {
	const [temporaryLicenses, SetTemporaryLicenses] = React.useState([])
  const [open, setOpen] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState("");
  const [dialogTitle, setDialogTitle] = React.useState("");
  const navigate = useNavigate();
	
  React.useEffect(async () => {
		const userLicenses = []
		const { email } = getCurrentUser();
		const data = await getTempLicense(email)
		data.responseBody.data.map((LicenceNumber) => {
			userLicenses.push(LicenceNumber.centerLicenceNumber)
		})
		SetTemporaryLicenses(userLicenses)
	}, [])

  const onSubmit = async (values) => {
    console.log(JSON.stringify(values))
    const response = await createFinalLicenseAPIFunc(values);
    console.log(JSON.stringify(response));
    handleClickOpen(`تم تقديم طلبك بنجاح، رقم الرخصة ${response.responseBody.data.licenceNumber}  هجري`, 'تم تقديم طلبك بنجاح');
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
              agree: []
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

            <FinalFromWizardCenterDetailsPage validate={CenterDetailsValidation} temporaryLicenses = {temporaryLicenses} label="معلومات المركز">

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

            <FinalFromWizard.Page
              label="المتطلبات"
            >
              <Requirements />
            </FinalFromWizard.Page>
            <FinalFromWizard.Page
              label="الخدمات الضحية"
            >
              <HealthServices
                Condition={ConditionComp} />
            </FinalFromWizard.Page>
            <FinalFromWizardPersonsPage label="معلومات الكوادر">

            </FinalFromWizardPersonsPage>

            {/* <FinalFromWizard.Page
              label="معلومات الكوادر"
            >
            </FinalFromWizard.Page> */}
            <FinalFromWizard.Page
              label="الملخص"
            >
              <Summary dialog={handleClickOpen} />
            </FinalFromWizard.Page>
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
      StaffCondition={ConditionStaffComp}
      Condition={ConditionComp}
      setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
      pop={pop}
      push={push}
      values={values}

    />
  </Box>

);

const FinalFromWizardCapacityPage = ({ values }) => (
  <Box>
    <Capacity
      Condition={calculationConditionComp}
      values={values}
    />
  </Box>

);

const FinalFromWizardCenterDetailsPage = ({temporaryLicenses, values }) => (
  <Box>
    <CenterDetails
      Condition={calculationConditionComp}
      values={values}
      temporaryLicenses = {temporaryLicenses} 
      setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
      
    />
  </Box>

);

export default CreateFinalLicense;
