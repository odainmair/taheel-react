import { v4 as uuid } from 'uuid';
import IconsList from '../../Core/Components/FieldsInputs/IconsList';
import {
    Chip,
    colors
} from '@material-ui/core';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import DoneIcon from '@material-ui/icons/Done';

const getChipComponentsForStatus = (data) => {
    const status = data.status
    if (status === -1) {
        return (
            <Chip
                label="مكتمل"
                variant="outlined"
                size="medium"
                icon={<DoneIcon sx={{ color: '#43A047 !important' }} />}
                sx={{
                    color: colors.green[600],
                    borderColor: colors.green[600],
                }}
            />
        );
    }
    if (status === -2) {
        return (
            <Chip
                label="مرفوض"
                variant="outlined"
                size="medium"
                icon={<ErrorOutlineIcon sx={{ color: '#e53935 !important' }} />}
                sx={{
                    color: colors.red[600],
                    borderColor: colors.red[600],
                }}
            />
        );
    }
    return (
        <Chip
            label="قيد المراجعة"
            variant="outlined"
            size="medium"
            icon={<HistoryOutlinedIcon sx={{ color: '#fb8c00 !important' }} />}
            sx={{
                color: colors.orange[600],
                borderColor: colors.orange[600],
            }}
        />
    );
};

export default {
    schema: [
        {
            id: uuid(),
            label: {
                ar: 'رقم الطلب',
                en: 'Orders Number'
            },
            name: 'requestNum',
            type: 'Text',
        },
        {
            id: uuid(),
            label: {
                ar: 'اسم المركز',
                en: 'Center Name'
            },
            name: 'centerName',
            type: 'Text',
        },
        {
            id: uuid(),
            label: {
                ar: 'نوع الطلب',
                en: 'Request Type'
            },
            name: 'type',
            type: 'Text',
        },
        {
            id: uuid(),
            label: {
                ar: 'تاريخ الطلب',
                en: 'Order request date'
            },
            name: 'requestDate',
            type: 'Text',
        },
        {
            id: uuid(),
            label: {
                ar: 'حالة الطلب',
                en: 'Order status'
            },
            attrFunc: getChipComponentsForStatus,
            type: 'Text'
        }],
}
