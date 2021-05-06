import { v4 as uuid } from 'uuid';

export default [
  {
    id: uuid(),
    label: {
      ar: 'صفة المالك',
      en: 'Request Type'
    },
    name: 'requestType',
    type: 'Select',
    gridSize: '6',
    sectionName: 'CenterInfo',
    options: [
      { value: '2', label: { ar: 'صفة طبيعية' } },
      { value: '1', label: { ar: 'صفة اعتباريه' } },
    ],
    validators: [],
  },
  {
    id: uuid(),
    label: {
      ar: 'فئة المستفيد',
      en: 'Beneficiary Category'
    },
    name: 'beneficiaryCategory',
    type: 'Select',
    gridSize: '6',
    sectionName: 'CenterInfo',
    options: [
      { value: '01', label: { ar: 'ذوي الإعاقة' } },
    ],
    validators: [],
  },
  {
    id: uuid(),
    label: {
      ar: 'رقم الهوية',
      en: 'ID Number'
    },
    name: 'idNumber',
    type: 'Text',
    gridSize: '6',
    sectionName: 'CenterInfo',
    options: [],
    validators: [],
    dependOn: {
      fieldName: 'requestType',
      value: '2'
    }
  },
  {
    id: uuid(),
    label: {
      ar: 'تاريخ الميلاد',
      en: 'Birthdate'
    },
    name: 'birthDate',
    type: 'Text',
    gridSize: '6',
    sectionName: 'CenterInfo',
    options: [],
    validators: [],
    dependOn: {
      fieldName: 'requestType',
      value: '2'
    }
  },
  {
    id: uuid(),
    label: {
      ar: 'نوع رخصة',
      en: 'License Type'
    },
    name: 'licenseType',
    type: 'Select',
    gridSize: '6',
    sectionName: 'CenterInfo',
    options: [
      { value: '1', label: { ar: 'سجل تجاري' } },
      { value: '2', label: { ar: 'رخصة استثمار اجنبي' } },
      { value: '3', label: { ar: 'شهادة تسجيل للجمعيات والمؤسسات الاهليه' } },
    ],
    validators: [],
    dependOn: {
      fieldName: 'requestType',
      value: '1'
    }
  },
  {
    id: uuid(),
    label: {
      ar: 'رقم',
      en: 'Licence Number'
    },
    name: 'licenceNumber',
    type: 'Text',
    gridSize: '6',
    sectionName: 'CenterInfo',
    options: [],
    validators: [],
    dependOn: {
      fieldName: 'requestType',
      value: '1'
    }
  },
  {
    id: uuid(),
    label: {
      ar: 'اسم مالك المركز',
      en: 'Owner Name'
    },
    name: 'ownerName',
    type: 'Text',
    gridSize: '6',
    sectionName: 'OwnerInfo',
    options: [],
    validators: [],
    dependOn: {
      fieldName: 'requestType',
      value: '2'
    }
  },
  {
    id: uuid(),
    label: {
      ar: 'رقم الجوال',
      en: 'Mobile No.'
    },
    name: 'mobileNo',
    type: 'Text',
    gridSize: '6',
    sectionName: 'OwnerInfo',
    options: [],
    validators: [],
    dependOn: {
      fieldName: 'requestType',
      value: '2'
    }
  },
  {
    id: uuid(),
    label: {
      ar: 'اسم الكيان',
      en: 'companyName'
    },
    name: 'companyName',
    type: 'Text',
    gridSize: '6',
    sectionName: 'OwnerInfo',
    options: [],
    validators: [],
    dependOn: {
      fieldName: 'requestType',
      value: '1'
    }
  },
  {
    id: uuid(),
    label: {
      ar: 'رقم الجوال المفوض',
      en: 'compMobileNo'
    },
    name: 'compMobileNo',
    type: 'MobileNo',
    gridSize: '6',
    sectionName: 'OwnerInfo',
    options: [],
    validators: [],
    dependOn: {
      fieldName: 'requestType',
      value: '1'
    }
  },
  {
    id: uuid(),
    label: {
      ar: 'المدينة',
      en: 'city'
    },
    name: 'city',
    type: 'Text',
    gridSize: '6',
    sectionName: 'CenterAddress',
    options: [],
    validators: [],
  },
  {
    id: uuid(),
    label: {
      ar: 'الحي',
      en: 'sub'
    },
    name: 'sub',
    type: 'Text',
    gridSize: '6',
    sectionName: 'CenterAddress',
    options: [],
    validators: [],
  },
  {
    id: uuid(),
    label: {
      ar: 'الشارع',
      en: 'street'
    },
    name: 'street',
    type: 'Text',
    gridSize: '6',
    sectionName: 'CenterAddress',
    options: [],
    validators: [],
  },
  {
    id: uuid(),
    label: {
      ar: 'رقم المبنى',
      en: 'buildNo'
    },
    name: 'buildNo',
    type: 'Text',
    gridSize: '6',
    sectionName: 'CenterAddress',
    options: [],
    validators: [],
  },
  {
    id: uuid(),
    label: {
      ar: 'الرمز البريدي',
      en: 'postalCode'
    },
    name: 'postalCode',
    type: 'Text',
    gridSize: '6',
    sectionName: 'CenterAddress',
    options: [],
    validators: [],
  },
  {
    id: uuid(),
    label: {
      ar: 'اسم المركز',
      en: 'centerName'
    },
    name: 'centerName',
    type: 'Text',
    gridSize: '6',
    sectionName: 'CenterDetails',
    options: [],
    validators: [],
  },
  {
    id: uuid(),
    label: {
      ar: 'نوع المركز',
      en: 'centerType'
    },
    name: 'centerType',
    type: 'Select',
    gridSize: '6',
    sectionName: 'CenterDetails',
    options: [
      { value: '01', label: { ar: 'الرعاية النهارية' } },
    ],
    validators: [],
  },
  {
    id: uuid(),
    label: {
      ar: 'اختصاص المركز',
      en: 'specialCenterType'
    },
    name: 'specialCenterType',
    type: 'Select',
    gridSize: '6',
    sectionName: 'CenterDetails',
    options: [
      { value: '01', label: { ar: 'مركز تأهيل الاشخاص ذوي الاعاقات المتعددة' } },
      { value: '02', label: { ar: 'مراكز تأهيل الاشخاص ذوي الإعاقة العقلية والإعاقات الحركية' } },
      { value: '03', label: { ar: 'مركز تأهيل الاشخاص ذوي الإعاقة والحسية' } },
      { value: '04', label: { ar: 'مراكز تاهيل الاشخاص ذوي الاعاقة متوسط وشديدي الإعاقة' } },
    ],
    validators: [],
  },
  {
    id: uuid(),
    label: {
      ar: 'الطاقة الاستعابية المحتملة',
      en: 'centerCap'
    },
    name: 'centerCap',
    type: 'Text',
    gridSize: '6',
    sectionName: 'CenterDetails',
    options: [],
    validators: [],
  },
  {
    id: uuid(),
    label: {
      ar: 'فترة العمل',
      en: 'workingHours'
    },
    name: 'workingHours',
    type: 'Radio',
    gridSize: '6',
    sectionName: 'CenterDetails',
    options: [
      { value: 'morning', label: { ar: 'القترة الصباحية' } },
      { value: 'evening', label: { ar: 'الفترة المسائية' } },
      { value: 'both', label: { ar: 'فترتين' } },
    ],
    validators: [],
  },
  {
    id: uuid(),
    label: {
      ar: 'الفئة العمرية للمستفدين',
      en: 'ageGroup'
    },
    name: 'ageGroup',
    type: 'Radio',
    gridSize: '6',
    sectionName: 'CenterDetails',
    options: [
      { value: '2-12', label: { ar: 'سنتين - ١٢سنة' } },
      { value: '13-18', label: { ar: '١٣سنة - ١٨سنة' } },
      { value: '19-45', label: { ar: '١٩سنة -٤٥سنة' } },
    ],
    validators: [],
  },
  {
    id: uuid(),
    label: {
      ar: 'الفئة العمرية للمستفدين',
      en: 'targetedGender'
    },
    name: 'targetedGender',
    type: 'Radio',
    gridSize: '6',
    sectionName: 'CenterDetails',
    options: [
      { value: 'm', label: { ar: 'ذكر' } },
      { value: 'f', label: { ar: 'انثى' } },
      { value: 'b', label: { ar: 'كلا الجنسين' } },
    ],
    validators: [],
  },
];
