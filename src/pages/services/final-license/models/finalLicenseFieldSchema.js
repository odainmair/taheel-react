import { checkIsfilled } from 'src/utils/inputValidator';
import { getCurrentUser } from 'src/utils/UserLocalStorage';
import { getTempLicense } from '../services/finalLicenseAPI'
import { v4 as uuid } from 'uuid';

export default

  [
    {
      id: uuid(),
      label: {
        ar: 'اسم المركز',
        en: 'Temporary License Number'
      },
      name: 'companyName',
      type: 'Text',
      gridSize: '6',
      sectionName: 'CenterDetails',
      validators: [],
    },
    {
      id: uuid(),
      label: {
        ar: 'رقم الترخيص المؤقت',
        en: 'Temporary License Number'
      },
      name: 'temporaryLicenceNum',
      type: 'Text',
      gridSize: '6',
      sectionName: 'CenterDetails',
      validators: [],
    },
    {
      id: uuid(),
      label: {
        ar: 'رقم السجل التجاري',
        en: 'Commercial Registration No'
      },
      name: 'CRNumber',
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
      options: [],
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
      options: [],
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
      options: [],
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
      options: [],
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
      options: [],
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




  ];
