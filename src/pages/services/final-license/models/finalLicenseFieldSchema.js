import { checkIsfilled } from 'src/utils/inputValidator';
import { v4 as uuid } from 'uuid';

export default [

  {
    id: uuid(),
    label: {
      ar: 'رقم الترخيص المؤقت',
      en: 'Temporary License Number'
    },
    name: 'temporaryLicenceNum',
    type: 'Select',
    gridSize: '6',
    sectionName: 'CenterDetails',
    options: [ ],
    validators: [],
  },
  {
    id: uuid(),
    label: {
      ar: 'رقم السجل التجاري',
      en: 'Commercial Registration No'
    },
    name: 'commRegistrNo',
    type: 'Text',
    gridSize: '6',
    sectionName: 'CenterDetails',
    options: [
      { value: '01', label: { ar: 'ذوي الإعاقة' } },
    ],
    validators: [],
  },
  {
    id: uuid(),
    label: {
      ar: 'رقم رخصة البلدية',
      en: 'Municipal License'
    },
    name: 'municipLicenseNo',
    type: 'Text',
    gridSize: '6',
    sectionName: 'CenterDetails',
    options: [ ],
    validators: [],
  },

  {
    id: uuid(),
    label: {
      ar: 'عدد المستفيدين الفعلي',
      en: 'Beneficiaries Number'
    },
    name: 'beneficiariesNum',
    type: 'Text',
    gridSize: '6',
    sectionName: 'Capacity',
    options: [ ],
    validators: [],
  },
  {
    id: uuid(),
    label: {
      ar: 'مساحة مسطح البناء',
      en: 'Construction Flat Area '
    },
    name: 'buildingArea',
    type: 'Text',
    gridSize: '6',
    sectionName: 'Capacity',
    options: [ ],
    validators: [],
  },
  {
    id: uuid(),
    label: {
      ar: 'مساحة القبو',
      en: 'Basement Space'
    },
    name: 'basementArea',
    type: 'Text',
    gridSize: '6',
    sectionName: 'Capacity',
    options: [ ],
    validators: [],
  },
  {
    id: uuid(),
    label: {
      ar: 'الضمان المالي',
      en: 'Financial Guarantee'
    },
    name: 'FinancialGuarantee',
    type: 'Text',
    gridSize: '6',
    sectionName: 'Capacity',
    options: [ ],
    validators: [],
  },
  {
    id: uuid(),
    label: {
      ar: 'تقديم خدمات صحية',
      en: 'Providing Health Services'
    },
    name: 'healthServices',
    type: 'Radio',
    gridSize: '6',
    sectionName: 'HealthServices',
    options: [
      { value: 'yes', label: { ar: 'نعم', en: 'Yes' } },
      { value: 'no', label: { ar: 'لا', en: 'No' } },
    ],
    validators: [{
      id: 'workingHours-required',
      isValidFun: checkIsfilled,
      alert: 'هذا الحقل مطلوب'
    }],
  },
 

 










  // {
  //   id: uuid(),
  //   label: {
  //     ar: 'نوع رخصة',
  //     en: 'License Type'
  //   },
  //   name: 'licenseType',
  //   type: 'Select',
  //   gridSize: '6',
  //   sectionName: 'CenterInfo',
  //   options: [
  //     { value: '1', label: { ar: 'سجل تجاري' } },
  //     { value: '2', label: { ar: 'رخصة استثمار اجنبي' } },
  //     { value: '3', label: { ar: 'شهادة تسجيل للجمعيات والمؤسسات الاهليه' } },
  //   ],
  //   validators: [{
  //     id: 'licenseType-required',
  //     isValidFun: checkIsfilled,
  //     alert: 'هذا الحقل مطلوب'
  //   }],
  //   dependOn: {
  //     fieldName: 'requestType',
  //     value: '1'
  //   }
  // },
 
  // {
  //   id: uuid(),
  //   label: {
  //     ar: 'فترة العمل',
  //     en: 'workingHours'
  //   },
  //   name: 'workingHours',
  //   type: 'Radio',
  //   gridSize: '6',
  //   sectionName: 'CenterDetails',
  //   options: [
  //     { value: 'morning', label: { ar: 'القترة الصباحية' } },
  //     { value: 'evening', label: { ar: 'الفترة المسائية' } },
  //     { value: 'both', label: { ar: 'فترتين' } },
  //   ],
  //   validators: [{
  //     id: 'workingHours-required',
  //     isValidFun: checkIsfilled,
  //     alert: 'هذا الحقل مطلوب'
  //   }],
  // },
  
];
