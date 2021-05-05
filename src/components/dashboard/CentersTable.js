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

const CentersTable = (props) => {
  const { loading = false, centerRequests = [] } = props;
  const getCenterType = (centerType) => {
    if (centerType === '01') {
      return 'الرعاية النهارية';
    }
    return '_';
  };
  const downloadFileFn = (licenseDoc, name, licenceNumber) => {
    const url = 'https://inspiredemo2.appiancloud.com/suite/webapi/taheel-apis-utilities-downloadDocument-v2';
    const fileName = `${name}-${licenceNumber}`;
    const queryParams = {
      DocID: licenseDoc.id,
      attachment: true,
    };
    downloadFileAPI({ queryParams, url, fileName });
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
                  key={request ? request.requestNum : index}
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
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<CloudDownloadIcon />}
                        onClick={() => downloadFileFn(request.licenseDoc, request.name, request.licenceNumber)}
                      >
                        تنزيل الشهادة
                      </Button>
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

export default CentersTable;

CentersTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  centerRequests: PropTypes.array.isRequired
};
