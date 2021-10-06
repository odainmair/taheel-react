/* eslint-disable */
const required = 'يجب تعبئة الحقل'
import { Field } from 'react-final-form';
import React from 'react';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import moment from 'moment-hijri';
import { downloadDocument } from '../services/finalLicenseAPI';
import {
  Grid,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
  CircularProgress,
} from '@material-ui/core';

const CenterDetailsValidation = values => {
  console.log("values", isNaN(values.CRNumber))
  var msg = {}
  if (!values.CRNumber)
    msg.CRNumber = required
  if (!values.temporaryLicenceNum)
    msg.temporaryLicenceNum = required
  if (values.CRNumber && isNaN(values.CRNumber) && values.CRNumber.length > 10)
    msg.CRNumber = "يجب ان يحتوي فقط على ارقام والا يزيد عددها عن 10 خانات"
  return msg
}

const capacityValidation = values => {
  var msg = {}
  console.log(' values.beneficiariesNum', typeof (values.beneficiariesNum), 'values.capacity', typeof (values.capacity))
  console.log(' values.buildingArea', typeof (values.buildingArea), 'values.basementArea', typeof (values.basementArea))
  if (!values.beneficiariesNum)
    msg.beneficiariesNum = required
  if (parseInt(values.beneficiariesNum) <= 0)
    msg.basementArea = 'يجب ان يكون عدد المستفيدين اكبر من صفر'

  if (!values.buildingArea)
    msg.buildingArea = required
  if (parseInt(values.buildingArea) <= 0)
    msg.basementArea = 'يجب ان يكون مساحة مسطح البناء اكبر من صفر'

  if (!values.basementArea)
    msg.basementArea = required
  if (parseInt(values.basementArea) <= 0)
    msg.basementArea = 'يجب ان يكون مساحة القبو اكبر من صفر'

  if (parseInt(values.buildingArea) <= parseInt(values.basementArea))
    msg.basementArea = 'مساحة القبو يجب ان تكون أقل من مساحة مسطح البناء'
  /*if (values.beneficiariesNum > parseInt(values.capacity))
    msg.beneficiariesNum = 'عدد المستفيدين يجب ان لا يتجاوز الطاقة الاستعابية'*/
  return msg
}

const RequirementsValidation = values => {
  var msg = {}
  if (!values.OperationalPlan)
    msg.OperationalPlan = "يرجى ارفاق هذا الملف";

  if (!values.ExecutivePlan)
    msg.ExecutivePlan = "يرجى ارفاق هذا الملف";

  if (!values.OfficeReport)
    msg.OfficeReport = "يرجى ارفاق هذا الملف";

  if (!values.SecurityReport)
    msg.SecurityReport = "يرجى ارفاق هذا الملف";

  if (!values.Furniture)
    msg.Furniture = "يرجى ارفاق هذا الملف";

  if (!values.FinancialGuaranteeAtt)
    msg.FinancialGuaranteeAtt = "يرجى ارفاق هذا الملف";

  return msg;
}

const healthServicesValidation = values => {
  var msg = {}
  console.log(JSON.stringify(values))
  if (!values.healthServices)
    msg.healthServices = "يرجى تحديد ما ان كان المركز يقدم خدمات صحية ام لا";
  if (values.healthServices && values.healthServices === 'yes') {
    if (!values.healthServiceType)
      msg.healthServiceType = "يرجى تحديد نوع الخدمة الصحية";
    if (!values.healthServiceAttachment) {
      if (values.healthServiceType === 1)
        msg.healthServiceAttachment = " يرجى ارفاق رخصة وزارة الصحة";
      else
        msg.healthServiceAttachment = " يرجى ارفاق عقد الشراكة";
    }
  }
  return msg

}

const personsValidation = async values => {
  console.log(`--personsValidation `)
  const response = { isSuccessful: true, message: '' };
  if (!values.customers || values.customers.length === 0) {
    return { isSuccessful: false, message: "يرجى استيفاء الشروط" };

  }
  const TeachersCount = values.customers.filter(customer => customer.staffTypes === "معلم تربية خاصة").length
  const managersCount = values.customers.filter(customer => customer.staffTypes === "مدير").length
  console.log(`--manager count ::: ${managersCount}`)
  if ( managersCount !== 1)
    return { isSuccessful: false, message: "يرجى استيفاء الشروط" };

  if (Math.round(values.beneficiariesNum / 8) > TeachersCount || TeachersCount < 1)
    return { isSuccessful: false, message: "يرجى استيفاء الشروط" };
  return response
}

const downloadFileFn = async (setLoading, loading, licenseNumber) => {
  setLoading(true)
  console.log("responseresponse", licenseNumber)
  const downloadDoc = await downloadDocument(licenseNumber, true)
  if (downloadDoc.isSuccessful) {
    setLoading(false)
  }
}

const uploadDocument = (file) => {
  return new Promise((resolve) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      var base64String = reader.result;
      var n = base64String.indexOf("base64,") + 7;
      base64String = reader.result.substr(n);
      const data = window.atob(base64String)
      const image = data

      const buf = new Uint8Array(image.length);
      for (let i = 0; i < image.length; i++) {
        buf[i] = image.charCodeAt(i);
      }
      return resolve(buf);
    }

  })
}




const ConditionComp = ({ when, is, children }) => (
  <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => (value == is ? children : null)}
  </Field>
)

const MedicalPracticeComp = ({ when, is, children }) => (
  <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => (is.includes(value) ? children : null)}
  </Field>
)

const calculationConditionComp = ({ is, children }) => (
  <Field subscription={{ value: true }}>
    {(value) => (is ? children : null)}
  </Field>
)

const ContentField = ({ value, label }) => (
  <>
    <Typography gutterBottom variant="body2" color="textSecondary" component="p">
      {label}
    </Typography>
    <Typography gutterBottom variant="h5" component="h2">
      {value}
    </Typography>
  </>
)
const DownloadButt = ({ index, docID, name, label }) => {
  const [loading, setLoading] = React.useState(false)
  return (
    <>
      <TableRow>
        <TableCell> ملف رقم {index + 1} </TableCell>
        <TableCell>
          <Button
            startIcon={loading ? <CircularProgress size="1rem" /> : <CloudDownloadIcon />}
            key={index}
            name={name}
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: '#3c8084',
            }}
            onClick={() => downloadFileFn(setLoading, loading, docID)}
          >
            تنزيل
          </Button>
        </TableCell>
      </TableRow>
    </>)
}
const DownloadButtTable = ({ docIDs, name, label }) => {

  return (
    <>
      {docIDs &&
        <>
          <TableContainer >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell> الرقم</TableCell>
                  <TableCell> {label} </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {docIDs.map((docID, index) => (
                  < DownloadButt key={docID+"_"+index} index={index} docID={docID} name={name} label={label} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <>

          </>

        </>
      }
    </>
  )

}
const validateAddStaffForm = (values, rowIndex, SAForm, forignForm) => {
  console.log(`-- rowIndex :: ${rowIndex}`)
  console.log(`-- SAForm :: ${SAForm}`)
  console.log(`-- forignForm :: ${forignForm}`)
  console.log(`-- rowIndex :: ${!rowIndex || rowIndex !== -1 ? JSON.stringify(values.customers[rowIndex]) : values}`)
  const { nationality, year, month, day, idNumber, iqamaNo, staffTypes,EducationalQualification,cv } = !rowIndex || rowIndex !== -1 ? values.customers[rowIndex] : values;
  console.log(`-- nationality :: ${nationality}`);
  console.log(`-- idNumber :: ${idNumber}`);
  console.log(`-- year :: ${year}`);

  if (!nationality) {
    return "يرجى اختيار الجنسية";
  }
  if (nationality === "سعودي") {
    if (!idNumber) {
      return "يرجى ادخال رقم الهوية";
    }
    if (!year || !month || !day) {
      return "يرجى ادخال تاريخ ميلاد صحيح";
    }
  }
  if (nationality === "غير سعودي") {
    if (!iqamaNo) {
      return "يرجى ادخال رقم الاقامة";
    }
  }
  if (!SAForm && !forignForm) {

    return "يرجى تحقق من هوية الشخص";


  }
  if (SAForm || forignForm) {
    if (!staffTypes) {
      return "يرجى اختيار نوع الكادر";
    }
    if (!EducationalQualification) {
      return "يرجى رفع المؤهلات التعليمية";
    }
    if (!cv) {
      return "يرجى رفع السيرة الذاتية";
    }

  }
  return null;
}
const getStaff = (data) => {
  const newKeys = {
    id:'id',
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
          if (customer['nationality'] === 'سعودي')
            customer['idNumber'] = customer[key]
          else
            customer['iqamaNo'] = customer[key]
        }
        else if (key === 'birthDate'&&customer['nationality'] === 'سعودي') {
          const birthDateDay= moment(customer[key], 'iYYYYiMMiDD').format('iDD')
          const birthDateMonth=moment(customer[key], 'iYYYYiMMiDD').format('iMM')
          const birthDateYear=moment(customer[key], 'iYYYYiMMiDD').format('iYYYY')
          console.log(`odai odai ${birthDateDay} ${birthDateMonth} ${birthDateYear}`)
          customer['day']=parseInt(birthDateDay);
          customer['month']=parseInt(birthDateMonth);
          customer['year']=parseInt(birthDateYear);

        }
        else if (key === 'id'){
          if(customer[key])
            customer['id'] = customer[key];
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

export {
  CenterDetailsValidation,
  capacityValidation,
  RequirementsValidation,
  healthServicesValidation,
  personsValidation,
  ConditionComp,
  MedicalPracticeComp,
  calculationConditionComp,
  uploadDocument,
  DownloadButt,
  ContentField,
  DownloadButtTable,
  getStaff,
  validateAddStaffForm
};
