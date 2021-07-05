/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
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
import { getCurrentUser } from 'src/utils/UserLocalStorage';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import DoneIcon from '@material-ui/icons/Done';
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { APIRequest } from 'src/api/APIRequest';


const getChipComponentsForStatus = (status) => {
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
const Orders = () => {
    const [loading, setLoading] = useState(false);
    const [taheelRequests, setTaheelRequests] = useState([]);
    const [totalPendingRequests, setTotalPendingRequests] = useState(0);
    const [totalCompletedRequests, setTotalCompletedRequests] = useState(0);
    const [totalRejectedRequests, setTotalRejectedRequests] = useState(0);
    const [totalTahelRequests, setTotalTahelRequests] = useState(0);

    const getTaheelRequestsFun = async (email) => {
        const url = 'taheel-apis-records-getRequests-v2';
        const queryParams = { userEmail: email };
        const response = await APIRequest({ url, queryParams });
        console.log('response +++++++++++++++++++', JSON.stringify(response));

        return response;
    };

    useEffect(async () => {
        const { email } = getCurrentUser();
        const getTaheelRequestsRs = await getTaheelRequestsFun(email);
        console.log('getTaheelRequestsRs +++++++++++++++++++', JSON.stringify(getTaheelRequestsRs));

        let response = {};
        if (!getTaheelRequestsRs.isSuccessful) {
            setLoading(false);
            response = { isSuccessful: false, message: getTaheelRequestsRs.message };
        } else {
            setLoading(true);
            const { data } = getTaheelRequestsRs.responseBody;
            console.log(JSON.stringify(data));
            setTaheelRequests(data);
            setTotalTahelRequests(data.length);
            setTotalCompletedRequests(data.filter((request) => request.status === -1).length);
            setTotalRejectedRequests(data.filter((request) => request.status === -2).length);
            setTotalPendingRequests(data.filter((request) => request.status !== -1 && request.status !== -2).length);
        }
        return response;
    }, []);

    console.log('taheelRequests +++++++++++++++++++', JSON.stringify(taheelRequests));

    return (
        <>
            <Helmet>
                <title>Orders</title>
            </Helmet>

            <Card>
                <CardHeader title={
                    loading ? (
                        'الطلبات المقدمة'
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
                                        key={request ? request.requestNum : index}
                                    >
                                        <TableCell>
                                            {request ? request.requestNum
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
                                            {request ? getChipComponentsForStatus(request.status) : (
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

        </>
    )
}

export default Orders;

Orders.propTypes = {
    // loading: PropTypes.bool.isRequired,
    // taheelRequests: PropTypes.array.isRequired
};