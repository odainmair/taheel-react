import { checkIsfilled } from 'src/utils/inputValidator';
import { v4 as uuid } from 'uuid';
import moment from 'moment-hijri';

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
    Location: {
        id: 'LocaitonDetails',
        label: { ar: 'العنوان الوطني (للمبنى الجديد)', en: 'National Address' },
        order: 3
    },
    Attachments: {
        id: 'Attachments',
        label: { ar: 'المرفقات', en: 'Attachments' },
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
            name: 'center.name',
            valueFunc: (values) => { return values?.center?.name },
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
            name: 'center.crInfo_r.crNumber',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CenterDetails,
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'رقم رخصة البلدية',
                en: 'Municipal License'
            },
            name: 'center.crInfo_r.MoMRA_Licence',
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
            name: 'center.crInfo_r.crActivityType',
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
            name: 'NewCenterLocationData.centerInfo_r.carryingnumber',//here
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
            name: 'center.centerInfo_r.financialGuarantee',
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
            name: 'center.targetedBeneficiary',
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
            name: 'NewCenterLocationData.centerInfo_r.basementArea',
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
            name: 'NewCenterLocationData.centerInfo_r.buildingArea',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.Capacity,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'رقم المبنى',
                en: 'Building No'
            },
            name: 'NewCenterLocationData.centerLocation_r.buildNo',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.Location,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'اسم الشارع',
                en: 'Street Name'
            },
            name: 'NewCenterLocationData.centerLocation_r.street',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.Location,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'الحي',
                en: 'District'
            },
            name: 'NewCenterLocationData.centerLocation_r.area',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.Location,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'المدينة',
                en: 'city'
            },
            name: 'NewCenterLocationData.centerLocation_r.city',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.Location,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'الرمز البريدي',
                en: 'Postal Code'
            },
            name: 'NewCenterLocationData.centerLocation_r.postalCode',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.Location,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'الرقم الإضافي',
                en: 'Additional No'
            },
            name: 'NewCenterLocationData.centerLocation_r.additionalNo',
            valueFunc: (values) => (values?.NewCenterLocationData?.centerLocation_r),
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.Location,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'تاريخ انتهاء رخصة الدفاع المدني',
                en: 'Fire department License Expiry Date'
            },
            name: 'NewCenterLocationData.centerInfo_r.expirarionDateForFireDepartmentLicenseHijri',
            attrFunc:(value) => {return moment(`${value}`, 'iYYYYiMMiDD').format('iDD/iMM/iYYYY')},
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.Location,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'رخصة الدفاع المدني (المبنى الجديد)',
                en: 'Fire department License'
            },
            name: 'FireDepartmentLicense',
            valueFunc: (values) => (values?.NewCenterLocationData?.centerInfo_r?.fireDepartmentLicense),
            type: 'file',
            gridSize: '6',
            sectionName: Sections.Attachments,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'رخصة البلدية (للمبنى الجديد)',
                en: 'Municiplity License for the New building'
            },
            name: 'MoMRA_Licence',
            valueFunc: (values) => (values?.NewCenterLocationData?.centerInfo_r?.momraDoc),
            type: 'file',
            gridSize: '6',
            sectionName: Sections.Attachments,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'تقرير مكتب هندسي معتمد (للمبنى الجديد)',
                en: 'Engineering Report'
            },
            name: 'engineeringPlan',
            valueFunc: (values) => (values?.NewCenterLocationData?.centerInfo_r?.engineeringPlan),
            type: 'file',
            gridSize: '6',
            sectionName: Sections.Attachments,
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
            valueFunc: (values) => (values?.NewCenterLocationData?.centerInfo_r?.furniturePhoto_r?.Document?.id || values?.NewCenterLocationData?.centerInfo_r?.furniturePhoto_r?.map(d => d?.Document) || values?.NewCenterLocationData?.centerInfo_r?.furniturePhoto_r?.map(d => d?.Document?.id)),
            type: 'file',
            gridSize: '6',
            sectionName: Sections.Attachments,
            options: [],
            validators: [],
        },
    ]