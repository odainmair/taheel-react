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
import { TabPanel } from 'src/Core/Components/FieldsInputs/TabPanel'

const Orders = (props) => {
    const location = useLocation()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [totalCount, setTotalCount] = useState();
    const [taheelRequests, setTaheelRequests] = useState([]);
    const [errMessage, SetErrMessage] = useState('')
    const TPObject = TablePaginationObject(TableDataViewEnum.ALL_DATA)
    const tabsInfo = [
        {
            tableTitle: 'عرض الجميع',
        },
        {
            tableTitle: 'المسودات',
        },
        {
            tableTitle: 'الطلبات المعادة',
        },
    ]
    const pageTitle = 'الطلبات'
    const [value, setValue] = useState(0);

    const paramData = useMemo(() => {
        return {
            batchSize: TPObject.pagination.batchSize,
            startIndex: TPObject.pagination.startIndex
        }
    }, [TPObject.pagination.batchSize, TPObject.pagination.startIndex])

    useEffect(async () => {
        SetErrMessage('')
        setLoading(true)
        const { email } = getCurrentUser();
        let getTaheelRequestsRs;

        getTaheelRequestsRs = await getTaheelRequestsFun(email, paramData.startIndex, paramData.batchSize);
        let response = {};
        if (!getTaheelRequestsRs.isSuccessful) {
            setLoading(false);
            SetErrMessage(getTaheelRequestsRs.message)
            response = { isSuccessful: false, message: getTaheelRequestsRs.message };
        } else {
            let allData = []
            const data = getTaheelRequestsRs.responseBody.data.requests;
            const drafts = data.filter(r => r.status === REQUEST_STATUS.DRAFT)
            const filteredExtReq = data.filter(d => d.status === REQUEST_STATUS.RETERNED_REQ);
            allData[0] = data
            allData[1] = drafts
            allData[2] = filteredExtReq
            setTaheelRequests(allData);
            setLoading(false);
        }

        return response;
    }, [paramData.batchSize, paramData.startIndex]);
    return (

        <>
            {tabsInfo.map((t, idx) => {
                return (
                    <TabPanel key={idx} value={value} index={idx}>
                        <TableCreator key={idx} pageTitle={pageTitle} tableTitle={tabsInfo} useValue={[value, setValue]} tableShcema={{ ...OrdersSchema({ navigate }), actions: '' }} dataTable={taheelRequests[idx]} totalCount={taheelRequests[idx]?.length} loading={loading} TPObject={TPObject} errMessage={errMessage} />
                    </TabPanel>
                )
            })}
        </>
    )
}

export default Orders;