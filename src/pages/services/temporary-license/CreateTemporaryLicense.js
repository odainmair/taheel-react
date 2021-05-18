/* eslint-disable */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Container,
} from '@material-ui/core';
import FinalFromWizard from '../../../components/wizard/FinalFormWizard';
import CenterInfo from './sections/CenterInfo';
import CenterAddress from './sections/CenterAddress';
import CenterDetails from './sections/CenterDetails';
import OwnerInfo from './sections/OwnerInfo';
import Summary from './sections/Summary';
import AlertDialog from 'src/components/AlertDialog';
import QuestionnaireSection from './sections/QuestionnaireSection';
import { getCurrentUser } from 'src/utils/UserLocalStorage';
import tempLicenseFieldSchema from './models/tempLicenseFieldSchema';
import { calAnswerOfQuestionnaires, ConditionComp, sectionValidateInput } from './services/temporayLicenseUtil';
import { createTempLicenseAPIFunc, validateAPIFunc } from './services/temporayLicenseAPI';

const CreateTemporaryLicense = () => {

  const [open, setOpen] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState("");
  const [dialogTitle, setDialogTitle] = React.useState("");
  const { email, idNumIqamaNum, DOB, phoneNumber } = getCurrentUser();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    console.log(JSON.stringify(values))
    const response = await createTempLicenseAPIFunc(values);
    console.log(JSON.stringify(response));
    handleClickOpen(`تم تقديم طلبك بنجاح، رقم الرخصة ${response.responseBody.data.licenceNumber} وتاريخ انتهاء الرخصة ${response.responseBody.data.expirationDate} هجري`, 'تم تقديم طلبك بنجاح');
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
          title="اصدار ترخيص مؤقت لمركز تأهيل أهلي"
        />
        <Divider />
        <CardContent>
          <FinalFromWizard
            initialValues={{
              centerType: '01',
              beneficiaryCategory: '01',
              requestType: '1',
              idNumber: idNumIqamaNum,
              birthDate: DOB,
              mobileNo: phoneNumber,
              agree: []
            }}
            onSubmit={onSubmit}
          >
            <FinalFromWizard.Page
              label="معلومات المركز"
              validate={(values) => sectionValidateInput(tempLicenseFieldSchema, "CenterInfo", values)}
              nextFun={(values) => validateAPIFunc(values)}
            >
              <CenterInfo Condition={ConditionComp} />
            </FinalFromWizard.Page>
            <FinalFromWizard.Page
              label="معلومات المالك"
              validate={(values) => sectionValidateInput(tempLicenseFieldSchema, "OwnerInfo", values)}
            >
              <OwnerInfo Condition={ConditionComp} />
            </FinalFromWizard.Page>
            <FinalFromWizard.Page 
            label="عنوان المركز"
            validate={(values) => sectionValidateInput(tempLicenseFieldSchema, "CenterAddress", values)}
            >
              <CenterAddress Condition={ConditionComp} />
            </FinalFromWizard.Page>
            <FinalFromWizard.Page 
            label="تفاصيل المركز"
            validate={(values) => sectionValidateInput(tempLicenseFieldSchema, "CenterDetails", values)}
            >
              <CenterDetails Condition={ConditionComp} />
            </FinalFromWizard.Page>
            <FinalFromWizard.Page
              label="تقييم الجاهزية"
              nextFun={(values) => calAnswerOfQuestionnaires(values)}
            >
              <QuestionnaireSection Condition={ConditionComp} />
            </FinalFromWizard.Page>
            <FinalFromWizard.Page 
              label="ملخص"
            >
              <Summary Condition={ConditionComp} dialog={handleClickOpen} />
            </FinalFromWizard.Page>
          </FinalFromWizard>
        </CardContent>
      </Card>
      <AlertDialog dialogContent={dialogContent} dialogTitle={dialogTitle} open={open} onClose={handleClose} acceptBtnName="تم" />
    </Container>
  );
};

export default CreateTemporaryLicense;
