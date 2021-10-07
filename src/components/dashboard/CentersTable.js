// import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { downloadFileAPI } from 'src/api/APIRequest';
import React,{ useState } from 'react';
import { Navigate, useNavigate } from 'react-router';

const CentersTable = (props) => {
  const Navigate=useNavigate();
  const { loading = false, centerRequests = [] } = props;
  const getCenterType = (centerType) => {
    if (centerType === '01') {
      return 'الرعاية النهارية';
    }
    return '_';
  };
  const downloadFileFn = async (licenseDoc, name, licenceNumber) => {
    const url = 'taheel-apis-utilities-downloadDocument-v2';
    const fileName = `${name}-${licenceNumber}`;
    const queryParams = {
      DocID: licenseDoc,
      attachment: true,
    };
    try{
      await downloadFileAPI({ queryParams, url, fileName });
    } catch {

    }
    return;
  };
  return (
    <Card>
      <CardHeader title={
        loading ? (
          'المراكز'
        ) : (
          <Skeleton animation="wave" height={15} width="20%" style={{ marginBottom: 6 }} />
        )
      }
      />
      <Divider />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800, minHeight: 400 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  {loading ? 'اسم المركز'
                    : (
                      <Skeleton />
                    )}
                </TableCell>
                <TableCell>
                  {loading ? 'نوع المركز'
                    : (
                      <Skeleton />
                    )}
                </TableCell>
                <TableCell>
                  {loading ? 'تاريخ انتهاء الرخصة'
                    : (
                      <Skeleton />
                    )}
                </TableCell>
                <TableCell sortDirection="desc">
                  {loading ? 'نوع الرخصة' : (
                    <Skeleton />
                  )}
                </TableCell>
                <TableCell>
                  {loading ? 'رقم رخصة'
                    : (
                      <Skeleton />
                    )}
                </TableCell>
                <TableCell>
                  {loading ? 'تنزيل الرخصة'
                    : (
                      <Skeleton />
                    )}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(!loading ? Array.from(new Array(6)) : centerRequests).map((request, index) => (
                <TableRow
                  hover
                  key={ index+"center"}
                >
                  <TableCell>
                    {request ? request.name
                      : (
                        <Skeleton />
                      )}
                  </TableCell>
                  <TableCell>
                    {request ? getCenterType(request.type)
                      : (
                        <Skeleton />
                      )}
                  </TableCell>
                  <TableCell>
                    {request ? request.expirationDate
                      : (
                        <Skeleton />
                      )}
                  </TableCell>
                  <TableCell>
                    {request ? request.licenseType
                      : (
                        <Skeleton />
                      )}
                  </TableCell>
                  <TableCell>
                    {request ? request.licenceNumber
                      : (
                        <Skeleton />
                      )}
                  </TableCell>
                  <TableCell>
                    {request && request.licenseDoc !== null ? (
                      <ButtonWithLoading
                        callBackFn={() => downloadFileFn(request.licenseDoc, request.name, request.licenceNumber)}
                      >
                      </ButtonWithLoading>
                    ) : (
                      <Skeleton />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        {
          loading ? (
            <Button
              color="primary"
              endIcon={<ArrowLeftIcon />}
              size="large"
              variant="text"
              onClick={(e)=>
              Navigate('/app/centers')
              }
            >
              عرض جميع المراكز
            </Button>
          ) : (
            <Skeleton animation="wave" width="10%" />
          )
        }
      </Box>
    </Card>
  );
};


const ButtonWithLoading = ({ callBackFn }) => {
  const [loading, setLoading] = useState(false);
  const handleOnClickFn = async () => {
    console.log(`loading ${loading}`);
    setLoading(true);
    await callBackFn();
    console.log(`loading ${loading}`);
    setLoading(false);
    console.log(`loading ${loading}`);
  }
  return (
    <>
      {
        !loading ? (
          <Button
            variant="contained"
            color="primary"
            startIcon={<CloudDownloadIcon />}
            onClick={() => handleOnClickFn()}
          >
            تنزيل الشهادة
          </Button>
        ) : (
          <Skeleton />
          )
      }
    </>
  )
}
export default CentersTable;

CentersTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  centerRequests: PropTypes.array.isRequired
};

ButtonWithLoading.propTypes = {
  callBackFn: PropTypes.func.isRequired,
};
