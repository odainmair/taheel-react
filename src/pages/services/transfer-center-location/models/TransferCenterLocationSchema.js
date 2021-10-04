import { checkIsfilled } from 'src/utils/inputValidator';
import { v4 as uuid } from 'uuid';

const getCenterType = (value) => {
    if (value === '01') {
        return 'الرعاية النهارية';
    }
    return '_';
}
const Sections = {
    CenterDetails: {
        id: 'CenterDetails',
        label: { ar: 'معلومات المركز', en: 'Center Details' },
        order: 1
    },
    Capacity: {
        id: 'Capacity',
        label: { ar: 'الطاقة الإستعابية', en: 'Capacity' },
        order: 2
    },
    HealthServices: {
        id: 'HealthServices',
        label: { ar: 'الخدمات الصحية', en: 'Health Services' },
        order: 3
    },
    Requirements: {
        id: 'Requirements',
        label: { ar: 'المتطلبات', en: 'Requirements' },
        order: 4
    }
}
export default
    [
        {
            id: uuid(),
            label: {
                ar: 'اسم المركز',
                en: 'Temporary License Number'
            },
            name: 'name',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CenterDetails,
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'رقم السجل التجاري',
                en: 'Commercial Registration No'
            },
            name: 'crInfo_r.crNumber',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CenterDetails,
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
            name: 'crInfo_r.MoMRA_Licence',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CenterDetails,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'نشاط السجل التجاري',
                en: 'Commercial Registration Activity'
            },
            name: 'crInfo_r.crActivityType',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CenterDetails,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'الطاقة الإستعابية القصوى',
                en: 'Center Carrying Capacity'
            },
            name: 'CCC',//here
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.Capacity,
            options: [],
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
            sectionName: Sections.Capacity,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'عدد المستفيدين المطلوب',
                en: 'Ceneter Benificires Number'
            },
            name: 'CBN',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.Capacity,
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
            sectionName: Sections.Capacity,
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
            sectionName: Sections.Capacity,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'وثيقة الترخيص',
                en: 'License Documents'
            },
            name: 'operationPlan',
            valueFunc: (values) => (values?.licenseDoc),
            type: 'file',
            gridSize: '6',
            sectionName: Sections.Requirements,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: "صور الأثاث و الأجهزة الكهربائية",
                en: 'Furniture'
            },
            name: 'Furniture',
            valueFunc: (values) => (values?.furniturePhotoZippedFile?.id),
            type: 'file',
            gridSize: '6',
            sectionName: Sections.Requirements,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: "الضمان المالي",
                en: 'Financial Guarantee'
            },
            name: 'financialGuarbteeAtt.id',
            valueFunc: (values) => (values?.financialGuarbteeAtt?.id),
            type: 'file',
            gridSize: '6',
            sectionName: Sections.Requirements,
            options: [],
            validators: [],
        }
    ]