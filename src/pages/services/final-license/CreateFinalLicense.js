/* eslint-disable */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'src/utils/UserLocalStorage';
import CenterDetails from './sections/CenterDetails'
import Requirements from './sections/Requirements'
import Capacity from './sections/Capacity';
import HealthServices from './sections/HealthServices';
import Summary from './sections/Summary'
import { createFinalLicenseAPIFunc } from './services/finalLicenseAPI'
import {
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


const CreateFinalLicense = () => {

  const [open, setOpen] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState("");
  const [dialogTitle, setDialogTitle] = React.useState("");
  const navigate = useNavigate();

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
            <FinalFromWizard.Page
              label="معلومات المركز"
              validate= {CenterDetailsValidation}
            >
                <CenterDetails
                 Condition={ConditionComp} />
            </FinalFromWizard.Page>
            <FinalFromWizard.Page
              label="الطاقة الإستعابية والضمان المالي"
              validate= {capacityValidation}
            >
                <Capacity 
                  Condition={ConditionComp}/>
            </FinalFromWizard.Page>
            <FinalFromWizard.Page 
            label="المتطلبات"
            >
                <Requirements />
            </FinalFromWizard.Page>
            <FinalFromWizard.Page 
            label="الخدمات الضحية"
            >
                <HealthServices />
            </FinalFromWizard.Page>
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

export default CreateFinalLicense;
