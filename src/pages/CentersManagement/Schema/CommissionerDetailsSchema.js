import { v4 as uuid } from 'uuid';
import FieldsEnum from 'src/Core/Utils/FieldsEnum';

export default [
    {
        id: uuid(),
        label: {
            ar: 'رقم الكادر',
            en: 'Staff ID'
        },
        name: 'staffId',
        type: FieldsEnum.SELECT_FIELD,
        gridSize: 7,
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
        gridSize: 7,
    },
    {
        id: uuid(),
        label: {
            ar: 'المسمى الوظيفي',
            en: 'Job title'
        },
        name: 'jobTitle',
        type: FieldsEnum.TEXT_FIELD,
        gridSize: 7,
    },
    {
        id: uuid(),
        label: {
            ar: 'الصلاحيات',
            en: 'permissions'
        },
        name: 'permissions',
        type: FieldsEnum.CHECKBOX_FIELD,
        gridSize: 12,
    }
]
