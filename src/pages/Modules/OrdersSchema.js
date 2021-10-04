import { v4 as uuid } from 'uuid';
import {
    IconButton,
    Chip,
    colors
} from '@material-ui/core';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import DoneIcon from '@material-ui/icons/Done';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DraftsTwoToneIcon from '@material-ui/icons/DraftsTwoTone';
import { useNavigate } from 'react-router';
import { LICENSE_FORM_TYPES, REQUEST_STATUS } from 'src/utils/enums'

const getChipComponentsForStatus = (data) => {
    const status = data.status
    if (status === REQUEST_STATUS.COMPLETED) {
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
    else if (status === REQUEST_STATUS.REJECTED) {
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
    else if (status === REQUEST_STATUS.DRAFT) {
        return (
            <Chip
                label="مسودة"
                variant="outlined"
                size="medium"
                icon={<DraftsTwoToneIcon sx={{ color: 'grey !important' }} />}
                sx={{
                    color: colors.grey[600],
                    borderColor: colors.grey[600],
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

const getRequestValues = (navigate, taskType, data) => {
    console.log(`LatestDraft :: getDraftValues :: taskType: ${taskType}`)
    let navigatinURL = '', draftFormType = ''
    if (data.type === REQUEST_STATUS.DRAFT) {
        if (taskType.trim() === 'إنشاء رخصة نهائية') {
            navigatinURL = '/services/finallicense'
            draftFormType = LICENSE_FORM_TYPES.NEW
            //return { navigatinURL: '/services/finallicense', draftFormType: LICENSE_FORM_TYPES.NEW }
        }
        else if (taskType.trim() === 'تجديد رخصة') {
            navigatinURL = '/services/finallicense'
            draftFormType = LICENSE_FORM_TYPES.RENEW
            //return { navigatinURL: '/services/updatefinallicenserenewal', draftFormType: LICENSE_FORM_TYPES.RENEW }
        } else {
            navigatinURL = '/services/finallicense'
            draftFormType = LICENSE_FORM_TYPES.NEW
            //return { navigatinURL: '/services/finallicense', draftFormType: LICENSE_FORM_TYPES.NEW }
        }
    } else {
        navigatinURL = '/services/transfercentersummary'
        draftFormType = LICENSE_FORM_TYPES.NEW
    }

    navigate(navigatinURL, {
        state: {
            licenceNumber: data.centerLicenceNumber[0],
            taskID: data.id,
            requestNum: data.requestNum,
            formType: draftFormType,
            fromDraft: true
        }
    })
}

export default ({ navigate, taskRequests }) => {
    return {
        schema: [
            {
                id: uuid(),
                label: {
                    ar: 'رقم الطلب',
                    en: 'Orders Number'
                },
                name: 'requestNum',
                attrFunc: (data) => {
                    const req = taskRequests.filter(d => d.requestNum === data.requestNum)[0];
                    if (data.status === REQUEST_STATUS.DRAFT || !!req) {
                        data = { ...data, id: req?.ID }
                        return (
                            <>
                                {data.requestNum}
                                <IconButton
                                    color="primary"
                                    component="span"
                                    onClick={() => {
                                        console.log(`LatestDraft :: navigate to: ${data.type}, taskID: ${req?.ID}, requestNum: ${data.requestNum}`);
                                        getRequestValues(navigate, data.type, data);
                                    }}
                                >
                                    <VisibilityIcon />
                                </IconButton>
                            </>)
                    }
                    else {
                        return data.requestNum
                    }
                },
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
}
