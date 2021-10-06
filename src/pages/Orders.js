/* eslint-disable */
import { useState, useEffect, useMemo } from 'react';

import { getCurrentUser } from 'src/utils/UserLocalStorage';
import { APIRequest } from 'src/api/APIRequest';
import OrdersSchema from './Modules/OrdersSchema'
import TableCreator from 'src/Core/Components/TableCreator';
import { TablePaginationObject } from 'src/Core/Utils/TablePagination';
import TableDataViewEnum from "src/Core/Utils/TableDataViewEnum";
import { LICENSE_FORM_TYPES, REQUEST_STATUS } from 'src/utils/enums'
import { useNavigate } from 'react-router';
import { getMyTasksFun } from 'src/pages/services/data/servicesApi'
import { useLocation } from 'react-router-dom'
import { getTaheelRequestsFun } from 'src/pages/services/data/servicesApi'
const Orders = (props) => {
    const location = useLocation()
    const navigate = useNavigate();
    const { type } = props
    const [loading, setLoading] = useState(true);
    const [totalCount, setTotalCount] = useState();
    const [taheelRequests, setTaheelRequests] = useState([]);
    const [errMessage, SetErrMessage] = useState('')
    const tableTitle = type === LICENSE_FORM_TYPES.DRAFT ? 'المسودات' : 'الطلبات المقدمة'
    const TPObject = TablePaginationObject(TableDataViewEnum.ALL_DATA)
    const paramData = useMemo(() => {
        return {
            batchSize: TPObject.pagination.batchSize,
            startIndex: TPObject.pagination.startIndex
        }
    }, [TPObject.pagination.batchSize, TPObject.pagination.startIndex])

    useEffect(async () => {
        setLoading(true)
        const { email } = getCurrentUser();
        const getTaheelRequestsRs = await getTaheelRequestsFun(email, paramData.startIndex, paramData.batchSize, type);
        let response = {};
        if (!getTaheelRequestsRs.isSuccessful) {
            setLoading(false);
            SetErrMessage(getTaheelRequestsRs.message)
            response = { isSuccessful: false, message: getTaheelRequestsRs.message };
        } else {
            const data = getTaheelRequestsRs.responseBody.data;
            setTotalCount(data.totalCount)
            if (type === LICENSE_FORM_TYPES.DRAFT) {
                setTaheelRequests(data.requests);
            }
            else {
                const { data } = getTaheelRequestsRs.responseBody;
                setTaheelRequests(data.requests.filter(r => r.status != REQUEST_STATUS.DRAFT));
            }
            setLoading(false);
        }

        return response;
    }, [paramData.batchSize, paramData.startIndex, type]);
    return (
        <TableCreator tableTitle={tableTitle} tableShcema={{ ...OrdersSchema({ navigate }), actions: '' }} dataTable={taheelRequests} totalCount={totalCount} loading={loading} TPObject={TPObject} errMessage={errMessage} />
    )
}

export default Orders;