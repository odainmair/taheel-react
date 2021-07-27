/* eslint-disable */
import { Helmet } from 'react-helmet';
import React, { useState, useEffect, useMemo } from 'react';

import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CentertDetails } from 'src/pages/services/final-license/services/finalLicenseAPI';
import { TablePaginationObject} from 'src/Core/Utils/TablePagination';
import CrewSchema , {SchemaActions} from '../Schema/CrewSchema';
import TableCreator from 'src/Core/Components/TableCreator';
import TableDataViewEnum from 'src/Core/Utils/TableDataViewEnum';

const AddCommissioner = (props) => {
    const location = useLocation();
    const licenceNumber = location.state.licenceNumber;
    console.log("licenceNumber+_+_+_+_+_+_+", licenceNumber)
    const [details, setDetails] = React.useState(true);
    const [errMessage, SetErrMessage] = useState('')
    const [loading, setLoading] = useState(true);
    const TPObject = TablePaginationObject(TableDataViewEnum.ALL_DATA)
    const paramData = useMemo(() => {
        return {
          batchSize: TPObject.pagination.batchSize,
          startIndex: TPObject.pagination.startIndex,
          filters: TPObject.pagination.filters
        }
      }, [TPObject.pagination.batchSize, TPObject.pagination.startIndex, TPObject.pagination.filters])

    const tableTitle = 'معلومات الكوادر'

    useEffect(async () => {
        const getCenterDetails = await CentertDetails(licenceNumber, paramData.startIndex, paramData.batchSize, paramData.filters);
        if (!getCenterDetails.isSuccessful) {
            const response = { isSuccessful: false, message: getCenterDetails.message };
            SetErrMessage(getCenterDetails.message)
            setLoading(true)
        } else {
            const Details = getCenterDetails.responseBody.data;
            setDetails(Details)
            console.log("Details+++++++++++++", Details);
            setLoading(false)
        }

    }, []);

    return (
    <TableCreator tableTitle={tableTitle} tableShcema={ {...CrewSchema, ...SchemaActions()} } dataTable={details.staff} loading={loading} errMessage={errMessage}/>
    )
    AddCommissioner.propTypes = {
        // centers: PropTypes.array.isRequired
    }
}

export default AddCommissioner;
