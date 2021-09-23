import React, { useState, useEffect, useMemo } from 'react';
import { getCurrentUser } from 'src/utils/UserLocalStorage';
import { getCenters } from './data/CentersApi';
import TableCreator from 'src/Core/Components/TableCreator';
import CentersTableSchema, { SchemaActions } from './Schema/CentersTableSchema';
import { TablePaginationObject } from 'src/Core/Utils/TablePagination';
import TableDataViewEnum from 'src/Core/Utils/TableDataViewEnum';
const Centers = () => {
  const { email } = getCurrentUser();
  console.log("email+++++++++++++", email);
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMessage, SetErrMessage] = useState('')
  const TPObject = TablePaginationObject(TableDataViewEnum.PAGINATION_DATA)
  const paramData = useMemo(() => {
    return {
      batchSize: TPObject.pagination.batchSize,
      startIndex: TPObject.pagination.startIndex,
      filters: TPObject.pagination.filters
    }
  }, [TPObject.pagination.batchSize, TPObject.pagination.startIndex, TPObject.pagination.filters])
  const tableTitle = 'جدول المراكز'
  const pageTitle = 'المراكز'
  useEffect(async () => {
    // const getCentersRs = await getCentersFun(email);
    setLoading(true)
    let response = ''
    const getCentersDetails = await getCenters(email, paramData.startIndex, paramData.batchSize, paramData.filters);
    if (!getCentersDetails.isSuccessful) {
      response = { isSuccessful: false, message: getCentersDetails.message };
      setCenters('')
      SetErrMessage(getCentersDetails.message)
      setLoading(false)
    } else {
      const CentersData = getCentersDetails.responseBody;
      SetErrMessage('')
      setCenters(CentersData.data)
      setLoading(false)
    }
  }, [paramData]);
  return (
    <TableCreator pageTitle={pageTitle} tableTitle={tableTitle} tableShcema={ {...CentersTableSchema, ...SchemaActions()} } dataTable={centers.Centers} totalCount={centers.totalCount} loading={loading} TPObject={TPObject} errMessage={errMessage}/>
  );
}

export default Centers;
