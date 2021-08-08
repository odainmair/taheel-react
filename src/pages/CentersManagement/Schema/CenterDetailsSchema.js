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
                ar: 'نوع المركز',
                en: 'Center Type'
            },
            name: 'type',
            type: 'Text',
            gridSize: '6',
            attrFunc: getCenterType,
            sectionName: Sections.CenterDetails,
            validators: [],
        },
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
                ar: 'اسم مالك المركز',
                en: 'Owner Name'
            },
            name: 'ownerName',
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
                ar: 'تاريخ إصدار الترخيص',
                en: 'License Issue Date'
            },
            name: 'creationDate',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CenterDetails,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'تاريخ انتهاء الترخيص',
                en: 'License Expiry Date'
            },
            name: 'expirationDate',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CenterDetails,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'الفئة العمرية للمركز',
                en: 'Center Age Group'
            },
            name: 'ageGroup',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CenterDetails,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'جنس المستفيدين',
                en: 'Center Gender Group'
            },
            name: 'targetedGender',
            attrFunc: (value) => (value === "m" ? "ذكر" : (value === "f" ? "انثى" : "كلا الجنسين")),
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CenterDetails,
            options: [],
            validators: [],
        },
        ,

        {
            id: uuid(),
            label: {
                ar: 'عدد المستفيدين الفعلي',
                en: 'Beneficiaries Number'
            },
            name: 'beneficiaryCount',
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
                ar: 'الطاقة الاستعابية',
                en: 'capacity'
            },
            name: 'carryingnumber',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.Capacity,
            options: [],
            validators: [],
        },

        {
            id: uuid(),
            label: {
                ar: 'تقديم خدمات صحية',
                en: 'Providing Health Services'
            },
            name: 'isHealthCareServices',
            type: 'Radio',
            gridSize: '6',
            sectionName: Sections.HealthServices,
            options: [
                { value: true, label: { ar: 'نعم', en: 'Yes' } },
                { value: false, label: { ar: 'لا', en: 'No' } },
            ],
            validators: [{
                id: 'workingHours-required',
                isValidFun: checkIsfilled,
                alert: 'هذا الحقل مطلوب'
            }],
        },

        {
            id: uuid(),
            label: {
                ar: 'نوع الخدمة الصحية',
                en: 'Type of health service'
            },
            name: 'healthCareServices_r.type',
            type: 'Select',
            gridSize: '6',
            sectionName: Sections.HealthServices,
            options: [
                { value: 1, label: { ar: 'رخصة وزارة الصحة', en: 'MOH License' } },
                { value: 2, label: { ar: 'عقد شراكة مع منشأة رعاية صحية', en: 'Partnership contract with a Health Care Facility' } },
            ],
            dependOn: {
                fieldName: 'healthServices',
                value: 'yes'
            },
            validators: [],
        },


        {
            id: uuid(),
            label: {
                ar: 'الخطة التشغيلية',
                en: 'Operational Plan'
            },
            name: 'operationPlan',
            valueFunc: (values) => (values?.operationPlan?.id),
            type: 'file',
            gridSize: '12',
            sectionName: Sections.Requirements,
            options: [],
            validators: [],
        },

        {
            id: uuid(),
            label: {
                ar: 'الخطة التنفيذية',
                en: 'Executive Plan'
            },
            name: 'ExecutivePlan',
            valueFunc: (values) => (values?.executivePlan?.id),
            type: 'file',
            gridSize: '12',
            sectionName: Sections.Requirements,
            options: [],
            validators: [],
        },

        {
            id: uuid(),
            label: {
                ar: "تقرير زيارة مكتب هندسي معتمد",
                en: 'Office Report'
            },
            name: 'OfficeReport',
            valueFunc: (values) => (values?.engineeringPlan?.id), /// check in here !
            type: 'file',
            gridSize: '12',
            sectionName: Sections.Requirements,
            options: [],
            validators: [],
        },


        {
            id: uuid(),
            label: {
                ar: "تقرير المسح الأمني",
                en: 'Security Report'
            },
            name: 'SecurityReport',
            valueFunc: (values) => (values?.securityReport?.id),
            type: 'file',
            gridSize: '12',
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
            gridSize: '12',
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
            gridSize: '12',
            sectionName: Sections.Requirements,
            options: [],
            validators: [],
        }
    ]

