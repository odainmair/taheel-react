/* eslint-disable */
import { useState, useEffect, useMemo } from 'react';

import { getCurrentUser } from 'src/utils/UserLocalStorage';
import { APIRequest } from 'src/api/APIRequest';
import OrdersSchema from './Modules/OrdersSchema'
import TableCreator from 'src/Core/Components/TableCreator';
import { TablePaginationObject } from 'src/Core/Utils/TablePagination';
import TableDataViewEnum from "src/Core/Utils/TableDataViewEnum";
import { LICENSE_FORM_TYPES, REQUEST_STATUS } from 'src/utils/enums'


const Orders = (props) => {
    const { type } = props
    const [loading, setLoading] = useState(true);
    const [totalCount, setTotalCount] = useState();
    const [taheelRequests, setTaheelRequests] = useState([]);
    const [errMessage, SetErrMessage] = useState('')
    const tableTitle = type === LICENSE_FORM_TYPES.DRAFT ? 'المسودات' : 'الطلبات المقدمة'
    const TPObject = TablePaginationObject(TableDataViewEnum.ONLY_FIVE)
    const paramData = useMemo(() => {
        return {
            batchSize: TPObject.pagination.batchSize,
            startIndex: TPObject.pagination.startIndex
        }
    }, [TPObject.pagination.batchSize, TPObject.pagination.startIndex])

    const getTaheelRequestsFun = async (email, startIndex, batchSize) => {
        const url = 'taheel-apis-records-getRequests-v2';
        let queryParams = { userEmail: email, startIndex, batchSize };
        console.log(`ORDERS ::1 queryParams ${JSON.stringify(queryParams)}`)
        if(type === LICENSE_FORM_TYPES.DRAFT){
            queryParams = {...queryParams, status: 4}
        }
        console.log(`ORDERS ::2 queryParams ${JSON.stringify(queryParams)}`)
        const response = await APIRequest({ url, queryParams });
        return response;
    };

    useEffect(async () => {
        setLoading(true)
        const { email } = getCurrentUser();
        const getTaheelRequestsRs = await getTaheelRequestsFun(email, paramData.startIndex, paramData.batchSize);
        let response = {};
        if (!getTaheelRequestsRs.isSuccessful) {
            setLoading(false);
            SetErrMessage(getTaheelRequestsRs.message )
            response = { isSuccessful: false, message: getTaheelRequestsRs.message };
        } else {
            setLoading(false);
            const data = getTaheelRequestsRs.responseBody.data;
            setTotalCount(data.totalCount)
            if(type === LICENSE_FORM_TYPES.DRAFT){
                setTaheelRequests(data.requests);
            }
            else {
                setTaheelRequests(data.requests.filter(r => r.status != REQUEST_STATUS.DRAFT));
            }
        }

        return response;
    }, [paramData.batchSize, paramData.startIndex, type]);
    return (
    <TableCreator tableTitle={tableTitle} tableShcema={ {...OrdersSchema, actions:''} } dataTable={taheelRequests} totalCount={totalCount} loading={loading} TPObject={TPObject} errMessage={errMessage}/>
    )
}

export default Orders;