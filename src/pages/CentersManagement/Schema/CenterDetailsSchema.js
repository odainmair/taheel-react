import { checkIsfilled } from 'src/utils/inputValidator';
import { v4 as uuid } from 'uuid';
import FieldsEnum from 'src/Core/Utils/FieldsEnum';

const getCenterType = (value) => {
    if (value === '01') {
        return 'الرعاية النهارية';
    }
    return '_';
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
            sectionName: 'CenterDetails',
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
            sectionName: 'CenterDetails',
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
            sectionName: 'CenterDetails',
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
            name: 'crInfo_r.MoMRA_Licence',
            type: 'Text',
            gridSize: '6',
            sectionName: 'CenterDetails',
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
            sectionName: 'CenterDetails',
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
            sectionName: 'CenterDetails',
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
            sectionName: 'CenterDetails',
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
            sectionName: 'CenterDetails',
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
            sectionName: 'CenterDetails',
            options: [],
            validators: [],
        },

    ]

