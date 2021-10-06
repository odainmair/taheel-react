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
import { checkIsNumber } from 'src/utils/inputValidator';

const staffTypes = ["معلم تربية خاصة", "أخصائي اجتماعي", "مراقب اجتماعي", "حارس", "عامل تنظيفات", "مشرف فني عام", "اخصائي نفسي و توجيه اجتماعي", "عامل رعاية شخصية", "مدير", "سائق", "مرافق سائق", "أخصائي علاج طبيعي", "أخصائي علاج وظيفي", "أخصائي نطق و تخاطب", "ممرض"]
const medicalStaffTypes = ['أخصائي علاج طبيعي', 'أخصائي علاج وظيفي', 'ممرض', 'أخصائي نطق و تخاطب']

const CenterDetailsValidation = values => {
  console.log("values", isNaN(values.CRNumber))
  var msg = {}
  if (!values.CRNumber)
    msg.CRNumber = required
  if (!values.temporaryLicenceNum)
    msg.temporaryLicenceNum = required
  if (values.CRNumber && checkIsNumber(values.CRNumber) && values.CRNumber.length > 10)
    msg.CRNumber = "يجب ان يحتوي فقط على ارقام ولا يزيد عددها عن 10 خانات"
  return msg
}

const capacityValidation = values => {
  var msg = {}
  console.log('capacityValidation :: values.beneficiariesNum', typeof (values.beneficiariesNum), 'values.capacity', typeof (values.capacity))
  console.log('capacityValidation :: values.buildingArea', typeof (values.buildingArea), 'values.basementArea', typeof (values.basementArea))
  if (!values.beneficiariesNum)
    msg.beneficiariesNum = required
  else if (parseInt(values.beneficiariesNum) <= 0) {
      msg.beneficiariesNum = 'يجب ان يكون عدد المستفيدين اكبر من صفر'
    }
  else if (!checkIsNumber(values.beneficiariesNum)) {
    msg.beneficiariesNum = 'يجب ان يكون عدد المستفيدين عدد صحيح'
  }

  if (!values.buildingArea)
    msg.buildingArea = required
  else if (parseInt(values.buildingArea) <= 0) {
      msg.buildingArea = 'يجب ان يكون مساحة مسطح البناء اكبر من صفر'
    }
  else if (!checkIsNumber(values.buildingArea)) {
    msg.buildingArea = 'يجب ان يكون مساحة مسطح البناء عدد صحيح'
  }

  if (!values.basementArea && values.basementArea != 0)
    msg.basementArea = required
  else if (parseInt(values.basementArea) < 0) {
      msg.basementArea = 'يجب ان يكون مساحة القبو اكبر من صفر'
    }
  else if (!checkIsNumber(values.buildingArea)) {
    msg.basementArea = 'يجب ان يكون مساحة القبو عدد صحيح'
  }

  if (parseInt(values.buildingArea) <= parseInt(values.basementArea))
    msg.basementArea = 'مساحة القبو يجب ان تكون أقل من مساحة مسطح البناء'
  if (values.beneficiariesNum > parseInt(values.capacity))
    msg.beneficiariesNum = 'عدد المستفيدين يجب ان لا يتجاوز الطاقة الاستعابية'
  return msg
}

const RequirementsValidation = values => {
  var msg = {}
  if (!values.OperationalPlan || !values.OperationalPlan[0])
    msg.OperationalPlan = "يرجى ارفاق هذا الملف";

  if (!values.ExecutivePlan || !values.ExecutivePlan[0])
    msg.ExecutivePlan = "يرجى ارفاق هذا الملف";

  if (!values.OfficeReport || !values.OfficeReport[0])
    msg.OfficeReport = "يرجى ارفاق هذا الملف";

  if (!values.SecurityReport || !values.SecurityReport[0])
    msg.SecurityReport = "يرجى ارفاق هذا الملف";

  if (!values.Furniture || !values.Furniture[0])
    msg.Furniture = "يرجى ارفاق هذا الملف";

  if (!values.FinancialGuaranteeAtt || !values.FinancialGuaranteeAtt[0])
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
  if (managersCount !== 1)
    return { isSuccessful: false, message: "يرجى استيفاء الشروط" };

  if (Math.ceil(values.beneficiariesNum / 8) > TeachersCount || TeachersCount < 1)
    return { isSuccessful: false, message: "يرجى استيفاء الشروط" };
  return response
}

const downloadFileFn = async (setLoading, loading, licenseNumber, name) => {
  setLoading(true)
  console.log(`finalLicenseUtil :: downloadFileFn: ${licenseNumber}`)
  const downloadDoc = await downloadDocument(licenseNumber, true, name)
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
        <TableCell style={{ width: '35%' }}>  {'ملف رقم'.concat(index + 1)} </TableCell>
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
            onClick={() => downloadFileFn(setLoading, loading, docID, name)}
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

                {[].concat(docIDs).map((docID, index) => (
                  <DownloadButt key={!!docID?.id ? docID.id : docID  + "_" + index} index={index} docID={docID?.id ? docID.id : docID} name={name} label={label} />
                ))
                }
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
  const { nationality, year, month, day, idNumber, iqamaNo, staffTypes, EducationalQualification, cv, MedicalPractice } = !rowIndex || rowIndex !== -1 ? values.customers[rowIndex] : values;
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
    console.log('finalLicenseAPI :: staffTypes :: ' + staffTypes)
    if (!staffTypes) {
      return "يرجى اختيار نوع الكادر";
    }
    if (!EducationalQualification) {
      return "يرجى رفع المؤهلات التعليمية";
    }
    if (!cv) {
      return "يرجى رفع السيرة الذاتية";
    }
    if (!MedicalPractice && medicalStaffTypes.includes(staffTypes)) {
      return "يرجى رفع رخصة المزاولة";
    }

  }
  return null;
}
const getStaff = (data) => {
  const newKeys = {
    id: 'id',
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

  var staff = JSON.parse(JSON.stringify(data))

  staff && staff.map((customer) => {
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
        else if (key === 'birthDate' && customer['nationality'] === 'سعودي') {
          const birthDateDay = moment(customer[key], 'iYYYYiMMiDD').format('iDD')
          const birthDateMonth = moment(customer[key], 'iYYYYiMMiDD').format('iMM')
          const birthDateYear = moment(customer[key], 'iYYYYiMMiDD').format('iYYYY')
          console.log(`odai odai ${birthDateDay} ${birthDateMonth} ${birthDateYear}`)
          customer['day'] = parseInt(birthDateDay);
          customer['month'] = parseInt(birthDateMonth);
          customer['year'] = parseInt(birthDateYear);

        }
        else if (key === 'id') {
          if (customer[key])
            customer['id'] = customer[key];
        }
        else if (key === 'StaffType')
          customer[newKey] = staffTypes[customer[key] - 1]
        else if (['professionalLicense', 'educationQualifications', 'CV'].includes(key)){
          customer[newKey] = [!!customer[key].id ? customer[key].id : customer[key]]
        }
        else
          customer[newKey] = customer[key];
        if (!customer[newKey] || newKey !== key)
          delete customer[key]
      }
    })
  });
  return staff
}

// TO BE REMOVED WHEN THE LOOKUP SERVICE IS READY
const centerTypeJSON = {
  "type": [
    {
      "name": "متسولين",
      "ID": 1
    },
    {
      "name": "ارشاد أسري",
      "ID": 2
    },
    {
      "name": "ذوي الإعاقة",
      "ID": 3
    },
    {
      "name": "أيتام",
      "ID": 4
    },
    {
      "name": "كبار السن",
      "ID": 5
    },
    {
      "name": "أحداث",
      "ID": 6
    },
    {
      "name": "حماية الأسرة",
      "ID": 7
    }
  ],
  "targetedBeneficiary": [
    {
      "name": "البيوت الإجتماعية",
      "ID": 1
    },
    {
      "name": "البيوت الإجتماعية",
      "ID": 2
    },
    {
      "name": "التدريب المهني",
      "ID": 3
    },
    {
      "name": "الرعاية النهارية",
      "ID": 4
    },
    {
      "name": "الرعاية الإجتماعية المنزلية",
      "ID": 5
    }
  ],
  "targetedServices": [
    {
      "name": "مراكز تأهيل الأشخاص ذوي الأعاقات المحددة",
      "ID": 1
    },
    {
      "name": "مراكز تأهيل الأشخاص ذوي الأعاقات المحددة",
      "ID": 2
    },
    {
      "name": " مراكز تأهيل الأشخاص ذوي الأعاقات العقلية والأعاقات الحركية",
      "ID": 3
    },
    {
      "name": "مراكز تأهيل الأسخاص ذوي الأعاقة العقلية",
      "ID": 4
    },
    {
      "name": "مراكز تأهيل الأشخاص ذوي الأعاقة متوسط وشديدي الإعاقة ",
      "ID": 5
    }
  ]
};

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
  validateAddStaffForm,
  centerTypeJSON
};
