/* eslint-disable */
import { useState, useEffect, useMemo } from 'react';

import { getCurrentUser } from 'src/utils/UserLocalStorage';
import { APIRequest } from 'src/api/APIRequest';
import OrdersSchema from './Modules/OrdersSchema'
import TableCreator from 'src/Core/Components/TableCreator';
import { TablePaginationObject } from 'src/Core/Utils/TablePagination';
import TableDataViewEnum from "src/Core/Utils/TableDataViewEnum";


const Orders = () => {
    const [loading, setLoading] = useState(true);
    const [taheelRequests, setTaheelRequests] = useState([]);
    const [errMessage, SetErrMessage] = useState('')
    const tableTitle = 'الطلبات المقدمة'
    const TPObject = TablePaginationObject(TableDataViewEnum.ONLY_FIVE)
    const paramData = useMemo(() => {
        return {
            batchSize: TPObject.pagination.batchSize,
            startIndex: TPObject.pagination.startIndex
        }
    }, [TPObject.pagination.batchSize, TPObject.pagination.startIndex])

    const getTaheelRequestsFun = async (email, startIndex, batchSize) => {
        const url = 'taheel-apis-records-getRequests-v2';
        const queryParams = { userEmail: email, startIndex, batchSize };
        const response = await APIRequest({ url, queryParams });
        return response;
    };

    useEffect(async () => {
        setLoading(true)
        const { email } = getCurrentUser();
        const getTaheelRequestsRs = await getTaheelRequestsFun(email, paramData.startIndex, paramData.batchSize);
        let response = {};
        if (!getTaheelRequestsRs.isSuccessful) {
            setLoading(true);
            SetErrMessage(getTaheelRequestsRs.message )
            response = { isSuccessful: false, message: getTaheelRequestsRs.message };
        } else {
            setLoading(false);
            const data = getTaheelRequestsRs.responseBody.data;
            setTaheelRequests(data);
        }

        return response;
    }, [paramData.batchSize, paramData.startIndex]);
    return (
    <TableCreator tableTitle={tableTitle} tableShcema={ {...OrdersSchema, actions:''} } dataTable={taheelRequests.requests} totalCount={taheelRequests.totalCount} loading={loading} TPObject={TPObject} errMessage={errMessage}/>
    )
}

export default Orders;