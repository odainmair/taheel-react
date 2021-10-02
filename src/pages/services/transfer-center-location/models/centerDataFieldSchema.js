import { checkIsfilled } from 'src/utils/inputValidator';
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
        ar: 'رقم السجل التجاري',
        en: 'Commercial Registration No'
      },
      name: 'CRNumber',
      type: 'Text',
      gridSize: '6',
      sectionName: 'CenterDetails',
      options: [
      ],
      validators: [],
    },
    {
      id: uuid(),
      label: {
        ar: 'نشاط السجل التجاري',
        en: 'activities'
      },
      name: 'activities',
      type: 'Text',
      gridSize: '6',
      sectionName: 'CenterDetails',
      validators: [],
    },
    {
      id: uuid(),
      label: {
        ar: 'الطاقة الاستعابية',
        en: 'capacity'
      },
      name: 'capacity',
      type: 'Text',
      gridSize: '6',
      sectionName: 'CenterDetails',
      options: [
      ],
      validators: [],
    },
    {
      id: uuid(),
      label: {
        ar: 'الضمان المالي',
        en: 'Financial Guarantee'
      },
      name: 'financialGuarantee',
      type: 'Text',
      gridSize: '6',
      sectionName: 'CenterDetails',
      options: [
      ],
      validators: [],
    },
    {
      id: uuid(),
      label: {
        ar: 'عدد المستفيدين',
        en: 'Beneficiaries Number'
      },
      name: 'beneficiariesNum',
      type: 'Text',
      gridSize: '6',
      sectionName: 'CenterDetails',
      options: [],
      validators: [],
    },
    {
      id: uuid(),
      label: {
        ar: "ارفاق صور الأثاث و الأجهزة الكهربائية (للمبنى الجديد)",
        en: 'Furniture'
      },
      name: 'furniture',
      type: 'file',
      gridSize: '6',
      sectionName: 'Requirements',
      options: [],
      validators: [],
    },

    {
      id: uuid(),
      label: {
        ar: "رخصة البلدية (للمبنى الجديد)",
        en: 'municip License'
      },
      name: 'municipLicense',
      type: 'file',
      gridSize: '6',
      sectionName: 'Requirements',
      options: [],
      validators: [],
    },
    {
      id: uuid(),
      label: {
        ar: "(للمبنى الجديد) تقرير مكتب هندسي معتمد",
        en: 'office Report'
      },
      name: 'OfficeReport',
      type: 'file',
      gridSize: '6',
      sectionName: 'Requirements',
      options: [],
      validators: [],
    },
    {
      id: uuid(),
      label: {
        ar: "رخصة دفاع المدني (للمبنى الجديد)",
        en: 'civil Defense License'
      },
      name: 'CivilDefenseLicense',
      type: 'file',
      gridSize: '6',
      sectionName: 'Requirements',
      options: [],
      validators: [],
    },

  ];
