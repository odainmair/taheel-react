import { v4 as uuid } from 'uuid';
import IconsTypeEnum from 'src/Core/Utils/IconsTypeEnum';
import { useNavigate } from 'react-router';
import FilterOperationEnum from 'src/Core/Utils/FilterOperationEnum';
import FieldsEnum from 'src/Core/Utils/FieldsEnum';

const getCenterType = (data) => {
    if (data.type === '01') {
        return 'الرعاية النهارية';
    }
    return '_';
}
export function SchemaActions() {
    const navigateion = useNavigate()
    return {
        actions: {
            label: {
                ar: '',
                en: ''
            },
            type: 'MoreVertIcon',
            buttons: [{
                id: uuid(),
                label: {
                    ar: 'عرض التفاصيل',
                    en: 'More Details'
                },
                iconTag: IconsTypeEnum.KEYBOARD_RETURN_ICON,
                attrName: 'moreDetails',
                btnFun: async (data) => {
                    const licenceNumber = data['licenceNumber']
                    navigateion('/app/centersDetails', { state: { licenceNumber } })
                }
            },
            {
                id: uuid(),
                label: {
                    ar: 'ادارة المفوضين',
                    en: 'Commissioner managments'
                },
                iconTag: IconsTypeEnum.ADD_ICON,
                btnFun: async (data) => {
                    const licenceNumber = data['licenceNumber']
                    navigateion('/app/CommissionersManagement', { state: { licenceNumber } })
                }
            }]
        }
    }
}
export default {
    schema: [
        {
            id: uuid(),
            label: {
                ar: 'اسم المركز',
                en: 'Center Name'
            },
            name: 'name',
            type: FieldsEnum.TEXT_FIELD,
            gridSize: '6',
        },
        {
            id: uuid(),
            label: {
                ar: 'نوع المركز',
                en: 'Center Type'
            },
            name: 'type',
            attrFunc: getCenterType,
            type: FieldsEnum.TEXT_FIELD,
            gridSize: '6',
        },
        {
            id: uuid(),
            label: {
                ar: 'رقم رخصة',
                en: 'License No'
            },
            name: 'licenceNumber',
            type: FieldsEnum.TEXT_FIELD,
            gridSize: '6',
        },{
            id: uuid(),
            label: {
                ar: 'تاريخ انتهاء الرخصة',
                en: 'License expiration date'
            },
            name: 'expirationDate',
            type: FieldsEnum.TEXT_FIELD,
            gridSize: '6',
        },
        {
            id: uuid(),
            label: {
                ar: 'تاريخ اصدار الرخصة',
                en: 'License issue date'
            },
            name: 'creationDate',
            type: FieldsEnum.TEXT_FIELD,
            gridSize: '6',
        },
        ]
}
