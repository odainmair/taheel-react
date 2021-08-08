import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const CentersTableComponent = (props) => {
    const navigate = useNavigate();
    const { loading = false, centerRequests = [] } = props;
    const handleOnClickFn = async (licenceNumber) => {
        navigate('/app/AddCommissioner', { state: { licenceNumber } });
    };
    const getCenterType = (centerType) => {
        if (centerType === '01') {
            return 'الرعاية النهارية';
        }
        return '_';
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
                                    {loading ? 'تاريخ اصدار الرخصة' : (
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
                                    {loading ? ''
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
                                        {request ? request.creationDate
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


export default CentersTableComponent;

CentersTableComponent.propTypes = {
    loading: PropTypes.bool.isRequired,
    centerRequests: PropTypes.array.isRequired
};

// ButtonWithLoading.propTypes = {
//     callBackFn: PropTypes.func.isRequired,
// };
