
import { staffTypes, dateFormatter } from "src/utils/TaheelUtils"
import { v4 as uuid } from 'uuid';
import IconsTypeEnum from 'src/Core/Utils/IconsTypeEnum';
import { useNavigate } from 'react-router';

export function SchemaActions() {
    const navigateion = useNavigate()
    return {
        actions: {
            label: {
                ar: '',
                en: ''
            },
            buttons: [
                /* {
                    id: uuid(),
                    label: {
                        ar: 'تعديل',
                        en: 'Edit'
                    },
                    iconTagFunc: (data)=>{return data.StaffType==='4'?'':IconsTypeEnum.EDIT_ICON},
                    iconTag: IconsTypeEnum.EDIT_ICON,
                    btnFun: async (data) => {
                        const licenceNumber = data['licenceNumber']
                        console.log('licenceNumber ===> ',licenceNumber)
                        console.log('data ===> ',data)

                        navigateion('/app/AddCommissioner', { state: { licenceNumber } })
                    }
                }, */
                {
                    id: uuid(),
                    label: {
                        ar: 'حذف',
                        en: 'Delete'
                    },
                    iconTag: IconsTypeEnum.DELETE_ICON,
                    color: 'secondary',
                    btnFun: async (data, otherFunc) => {
                        otherFunc(data)
                    }
                }]
        }
    }
}
export default {
    schema: [
        {
            inputType: 'TextField',
            type: 'text',
            label: { ar: 'الاسم الكامل', en: 'Full Name' },
            attrFunc: (data) => { return data['firstName'] + ' ' + data['lastName'] },
            name: 'name',
            gridSize: '6',
            disabled: true
        },
        {
            inputType: 'TextField',
            type: 'text',
            label: { ar: 'رقم الهوية/الاإقامة', en: 'Id number / Iqama number' },
            name: 'idNumIqamaNum',
            gridSize: '6',
            disabled: true
        },
        {
            inputType: 'TextField',
            type: 'text',
            label: { ar: 'تاريخ الميلاد', en: 'Birthday' },
            attrFunc: (d) => { return dateFormatter(d['DOB'], 'iDDiMMiYYYY') },
            name: 'birthDate',
            gridSize: '6',
            disabled: true
        },
        {
            inputType: 'TextField',
            type: 'text',
            label: { ar: 'البريد الاكتروني', en: 'Email' },
            name: 'email',
            gridSize: '6',
            disabled: true
        },
        {
            inputType: 'TextField',
            type: 'text',
            label: { ar: 'الجنس', en: 'Gender' },
            attrFunc: (data) => { return (data['gender'] === "m" ? "ذكر" : (data['gender'] ? "انثى" : "كلا الجنسين")) },
            name: 'gender',
            gridSize: '6',
            disabled: true
        },
        {
            inputType: 'TextField',
            type: 'text',
            label: { ar: 'الجنسية', en: 'Nationality' },
            name: 'nationality',
            gridSize: '6',
            disabled: true
        },
        {
            inputType: 'TextField',
            type: 'text',
            label: { ar: 'اسم الكفيل', en: 'Sponser Name' },
            name: 'sponsorName',
            gridSize: '6',
            disabled: true
        }
    ]
}

