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
import { Field } from 'react-final-form';
import useRequest from '../../../hooks/use-request';
import CenterInfo from './sections/CenterInfo';
import CenterAddress from './sections/CenterAddress';
import CenterDetails from './sections/CenterDetails';
import OwnerInfo from './sections/OwnerInfo';
import APIRequest from 'src/api/APIRequest';
import Summary from './sections/Summary';
import AlertDialog from 'src/components/AlertDialog';

const CreateTemporaryLicense = () => {

  const [open, setOpen] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState("");
  const [dialogTitle, setDialogTitle] = React.useState("");
  const navigate = useNavigate();


  const { doRequest, errors } = useRequest({
    url: 'https://inspiredemo2.appiancloud.com/suite/webapi/taheel-apis-services-createTempLicense-v2',
    method: 'post',
    body: {

    },
    onSuccess: () => console.log('test')
  });
  const validateCompanyFunc = async (crNumber) => {
    const url= "https://inspiredemo2.appiancloud.com/suite/webapi/taheel-apis-utilities-validateCompany-v2"
    const requestBody= {CRNumber: crNumber};
    const response = await APIRequest({url,requestBody});
    return response;
  }
  const validateCitizenFunc = async (idNumber, birthDate) => {
    const url= "https://inspiredemo2.appiancloud.com/suite/webapi/taheel-apis-utilities-validateCitizen-v2"
    const requestBody= {
      IDNo: idNumber,
      HijriDateOfBirth: birthDate
    };
    const response = await APIRequest({requestBody,url});
    return response;
  }
  const validateAPIFunc = async values => {
    const {requestType, licenceNumber, idNumber, birthDate}= values;
    const response = {isSuccessful: true, message: ''};
    if (requestType === "1") {
      const validateCompRs = await validateCompanyFunc(licenceNumber);
      if(!validateCompRs.isSuccessful){
        return {isSuccessful: false, message: validateCompRs.message}
      }
      const data = validateCompRs.responseBody.data;
      console.log(JSON.stringify(data));
      values.centerName=data.CRName;

    } else {
      const validateCitRs = await validateCitizenFunc(idNumber,birthDate);
      if(!validateCitRs.isSuccessful){
        return {isSuccessful: false, message: validateCitRs.message}
      }
      const data = validateCitRs.responseBody.data.Body;
      console.log(JSON.stringify(data));
      const {FirstName, SecondName, ThirdName, LastName} = data.Name;
      values.ownerName=`${FirstName} ${SecondName} ${ThirdName} ${LastName}`;
    }
    return response;
  }
  const onSubmit = async (values) => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(300);
    console.log(JSON.stringify(values))
    const requestBody = {
      centerData: {
        name: values.name,
        type: '1',
        ownerType:values.requestType,
        workingHours:values.workingHours,
        targetedGender:values.targetedGender,
        ageGroup: values.ageGroup,
        licenseType: '1',
        licenceNumber: values.licenceNumber,
        IDNumber: values.idNumber,
        crInfo_r: {
          crNumber: values.licenceNumber,
          commissionerMobNum: values.compMobileNo
        },
        centerInfo_r: {
          estimatedCapacity: values.centerCap
        },
        addressInfo: {
          city: values.city,
          area: values.sub,
          street: values.street,
          buildNo: values.buildNo,
          postalCode: values.postalCodde,
          lat: values.lat,
          lng: values.lng
        }
      }
    };
    const url= "https://inspiredemo2.appiancloud.com/suite/webapi/taheel-apis-services-createTempLicense-v2"

    const response = await APIRequest({requestBody,url});
    console.log(JSON.stringify(response));
    handleClickOpen(`تم تقديم طلبك بنجاح، رقم الرخصة ${response.responseBody.data.ID} وتاريخ انتهاء الرخصة ${response.responseBody.data.expirationDate} هجري`,'تم تقديم طلبك بنجاح');
    //window.alert(` تم تقديم طلبك بنجاح، رقم الرخصة ${response.center.ID} وتاريخ انتهاء الرخصة ${response.center.expirationDate} هجري`);
  };

  const Condition = ({ when, is, children }) => (
    <Field name={when} subscription={{ value: true }}>
      {({ input: { value } }) => (value === is ? children : null)}
    </Field>
  )

  const handleClickOpen = (dialogContent,dialogTitle) => {
    setDialogContent(dialogContent);
    setDialogTitle(dialogTitle)
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    navigate('/app/products', { replace: true });
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
              centerType: '1', 
              beneficiaryCategory: '1',
              requestType: '1' 
            }}
            onSubmit={onSubmit}
          >
            <FinalFromWizard.Page 
              label="معلومات المركز"         
              nextFun={(values)=>validateAPIFunc(values)} 
            >
              <CenterInfo Condition={Condition} />
            </FinalFromWizard.Page>
            <FinalFromWizard.Page label="معلومات المالك">
              <OwnerInfo Condition={Condition} />
            </FinalFromWizard.Page>
            <FinalFromWizard.Page label="عنوان المركز">
              <CenterAddress Condition={Condition} />
            </FinalFromWizard.Page>
            <FinalFromWizard.Page label="تفاصيل المركز">
              <CenterDetails Condition={Condition} />
            </FinalFromWizard.Page>
            <FinalFromWizard.Page label="ملخص">
              <Summary Condition={Condition} />
            </FinalFromWizard.Page>
          </FinalFromWizard>
        </CardContent>
      </Card>
      <AlertDialog  dialogContent={dialogContent} dialogTitle={dialogTitle} open={open} onClose={handleClose} acceptBtnName="تم" />
    </Container>
  );
};

export default CreateTemporaryLicense;
