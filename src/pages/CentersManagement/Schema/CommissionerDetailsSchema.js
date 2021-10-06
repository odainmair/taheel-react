import { v4 as uuid } from 'uuid';
import FieldsEnum from 'src/Core/Utils/FieldsEnum';

const infoSection= {
    id: 'Informaion',
    label: { ar: 'المعلومات العامة', en: 'Public informaion' },
    order: 1
}
export default [
    {
        id: uuid(),
        label: {
            ar: 'اختيار المفوض',
            en: 'Staff ID'
        },
        name: 'staffId',
        type: FieldsEnum.SELECT_FIELD,
        validators: ['selectRequieredValidator'],
        sectionName:infoSection,
        gridSize: 4,
    },
    {
        id: uuid(),
        label: {
            ar: 'المسمى الوظيفي',
            en: 'Job title'
        },
        name: 'jobTitle',
        type: FieldsEnum.TEXT_FIELD,
        sectionName:infoSection,
        gridSize: 4,
    },
    {
        id: uuid(),
        label: {
            ar: 'البربد الالكتروني',
            en: 'Email'
        },
        name: 'email',
        fieldType: 'email',
        type: FieldsEnum.TEXT_FIELD,
        sectionName:infoSection,
        gridSize: 8,
    },
    {
        id: uuid(),
        label: {
            ar: '',
            en: ''
        },
        sectionName: {
            id: 'CenterDetails',
            label: { ar: 'الصلاحيات', en: 'permissions' },
            order: 1
        },
        name: 'permissions',
        type: FieldsEnum.CHECKBOX_FIELD,
        gridSize: 12,
    }
]
