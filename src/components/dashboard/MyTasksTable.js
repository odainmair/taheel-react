// import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

const MyTasksTable = (props) => {
  const navigate = useNavigate();
  const { loading = false, taskRequests = [] } = props;
  return (
    <Card>
      <CardHeader title={
        loading ? (
          'الطلبات المعادة'
        ) : (
          <Skeleton animation="wave" height={15} width="20%" style={{ marginBottom: 6 }} />
        )
      }
      />
      <Divider />
      <PerfectScrollbar>
        <Box sx={{ height: '100%' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  {loading ? 'اسم'
                    : (
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
                </TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {(!loading ? Array.from(new Array(6)) : taskRequests).map((request, index) => (
                <TableRow
                  hover
                  key={request ? request.ID : index}
                >
                  <TableCell>
                    {request ? request.name
                      : (
                        <Skeleton />
                      )}
                  </TableCell>
                  <TableCell>
                    {request ? request.centerLicenceNumber
                      : (
                        <Skeleton />
                      )}
                  </TableCell>
                  <TableCell>
                    {request && (
                      <IconButton
                        color="primary"
                        component="span"
                        onClick={() => {
                          console.log("edit function");
                          navigate('/services/finallicense', { state: { centerLicenceNumber: request.centerLicenceNumber, taskID: request.ID,requestNum:request.requestNum } });
                        }}
                      >
                        <VisibilityIcon />
                      </IconButton>
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

export default MyTasksTable;

MyTasksTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  taskRequests: PropTypes.array.isRequired
};