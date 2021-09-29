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

const getRequestValues = (taskType) => {
    const navigate = useNavigate();
    console.log(`LatestDraft :: getDraftValues :: taskType: ${taskType}`)
    if(taskType.trim() === 'إنشاء رخصة نهائية') {
      return {navigatinURL:'/services/finallicense', draftFormType: LICENSE_FORM_TYPES.NEW}
    }
    else if(taskType.trim() === 'تجديد رخصة') {
      return {navigatinURL:'/services/updatefinallicenserenewal', draftFormType: LICENSE_FORM_TYPES.RENEW}
    }
    return {navigatinURL:'/services/finallicense', draftFormType: LICENSE_FORM_TYPES.NEW}
}

export default {
    schema: [
        {
            id: uuid(),
            label: {
                ar: 'رقم الطلب',
                en: 'Orders Number'
            },
            name: 'requestNum',
            attrFunc: (data) => {
                if(data.status === REQUEST_STATUS.DRAFT) {
                    return (
                    <>
                    {data.requestNum}
                      <IconButton
                        color="primary"
                        component="span"
                        onClick={() => {
                          console.log(`LatestDraft :: navigate to: ${data.type}, taskID: ${data.ID}, requestNum: ${data.requestNum}`);
                          navigate(getRequestValues(data.type).navigatinURL, { 
                            state: { 
                              centerLicenceNumber: data.centerLicenceNumber, 
                              taskID: data.ID,
                              requestNum:data.requestNum, 
                              formType: getRequestValues(data.type).draftFormType, 
                              fromDraft: true
                            } });
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
