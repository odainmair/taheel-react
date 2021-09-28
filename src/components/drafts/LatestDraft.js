// import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import VisibilityIcon from '@material-ui/icons/Visibility';

import {
  IconButton,
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  colors,
  TableSortLabel,
  Tooltip
} from '@material-ui/core';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import DraftsTwoToneIcon from '@material-ui/icons/DraftsTwoTone';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import DoneIcon from '@material-ui/icons/Done';
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { LICENSE_FORM_TYPES } from 'src/utils/enums'
import { useState } from 'react';

const getRequestValues = (taskType) => {
  console.log(`LatestDraft :: getDraftValues :: taskType: ${taskType}`)
  if(taskType.trim() === 'إنشاء رخصة نهائية') {
    return {navigatinURL:'/services/finallicense', draftFormType: LICENSE_FORM_TYPES.NEW}
  }
  else if(taskType.trim() === 'تجديد رخصة') {
    return {navigatinURL:'/services/updatefinallicenserenewal', draftFormType: LICENSE_FORM_TYPES.RENEW}
  }
  return {navigatinURL:'/services/finallicense', draftFormType: LICENSE_FORM_TYPES.NEW}
}

const getChipComponentsForDraft = () => {
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
};
const LatestDraft = (props) => {
  const navigate = useNavigate();
  const { loading = false, taheelRequests = [] } = props;
  
  const [navigatinURL, setNavigatinURL] = useState()
  const [draftFormType, setDraftFormType] = useState()

  return (
    <Card>
      <CardHeader title={
        loading ? (
          'المسودات'
        ) : (
          <Skeleton animation="wave" height={15} width="20%" style={{ marginBottom: 6 }} />
        )
      }
      />
      <Divider />
      <PerfectScrollbar>
        <Box sx={{ minHeight: 400 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  {loading ? 'رقم الطلب'
                    : (
                      <Skeleton />
                    )}
                </TableCell>
                <TableCell>
                  {loading ? 'اسم المركز'
                    : (
                      <Skeleton />
                    )}
                </TableCell>
                <TableCell>
                  {loading ? 'نوع الطلب'
                    : (
                      <Skeleton />
                    )}
                </TableCell>
                <TableCell sortDirection="desc">
                  {loading ? (
                    <Tooltip
                      enterDelay={300}
                      title="Sort"
                    >
                      <TableSortLabel
                        active
                        direction="desc"
                      >
                        تاريخ الطلب
                      </TableSortLabel>
                    </Tooltip>
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
                <TableCell>
                  {loading ? 'حالة الطلب'
                    : (
                      <Skeleton />
                    )}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(!loading ? Array.from(new Array(6)) : taheelRequests).map((request, index) => (
                <TableRow
                  hover
                  key={request ? request.ID : index}
                >
                  <TableCell>
                    {request ? (
                    <>
                    {/* {getRequestValues(request.type).navigatinURL} - {getRequestValues(request.type).draftFormType} */}
                    {request.requestNum}
                      <IconButton
                        color="primary"
                        component="span"
                        onClick={() => {
                          console.log(`LatestDraft :: navigate to: ${request.type}, taskID: ${request.ID}, requestNum: ${request.requestNum}`);
                          navigate(getRequestValues(request.type).navigatinURL, { 
                            state: { 
                              centerLicenceNumber: request.centerLicenceNumber, 
                              taskID: request.ID,
                              requestNum:request.requestNum, 
                              formType: getRequestValues(request.type).draftFormType, 
                              fromDraft: true
                            } });
                          // navigate('/services/editfinallicense', { 
                          //   state: { 
                          //     centerLicenceNumber: request.centerLicenceNumber, 
                          //     taskID: request.ID,
                          //     requestNum:request.requestNum, 
                          //     formType: LICENSE_FORM_TYPES.EDIT 
                          //   } });
                        }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      </>
                      )
                      : (
                        <Skeleton />
                      )}
                  </TableCell>
                  <TableCell>
                    {request ? request.centerName
                      : (
                        <Skeleton />
                      )}
                  </TableCell>
                  <TableCell>
                    {request ? request.type
                      : (
                        <Skeleton />
                      )}
                  </TableCell>
                  <TableCell>
                    {request ? request.requestDate
                      : (
                        <Skeleton />
                      )}
                  </TableCell>
                  <TableCell>
                    {request ? getChipComponentsForDraft() : (
                      <Skeleton />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

export default LatestDraft;

LatestDraft.propTypes = {
  loading: PropTypes.bool.isRequired,
  taheelRequests: PropTypes.array.isRequired
};
