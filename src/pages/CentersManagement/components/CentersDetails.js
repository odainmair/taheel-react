/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { CentertDetails } from 'src/pages/services/final-license/services/finalLicenseAPI'
import CenterDetailsSchema from '../Schema/CenterDetailsSchema'
import FormCreator from 'src/Core/Components/FormCreator'

const CentersDetails = () => {
    const location = useLocation()
    const licenceNumber = location.state.licenceNumber
    console.log("licenceNumber+_+_+_+_+_+_+", licenceNumber)
    const [details, setDetails] = React.useState(false)
    const [errMessage, SetErrMessage] = useState('')
    const [loading, setLoading] = useState(true)
    useEffect(async () => {
        setLoading(true)
        const getCenterDetails = await CentertDetails(licenceNumber)
        if (!getCenterDetails.isSuccessful) {
            SetErrMessage(getCenterDetails.message)
        } else {
            const Details = getCenterDetails.responseBody.data.center
            setDetails({ ...Details, ...Details.centerInfo_r })
            console.log("Details+++++++++++++", Details)
            setLoading(false)
        }
    }, [])
    const title = 'تفاصيل المركز'
    return (
        <FormCreator
            title={title}
            schema={CenterDetailsSchema}
            errMessage={errMessage}
            initValues={details}
            isLoading={loading}
            navBackUrl={{ url: '/app/centers', state: { licenceNumber: licenceNumber } }}
            formType='view'
        />
    )
}
CentersDetails.propTypes = {
    // centers: PropTypes.array.isRequired
}

export default CentersDetails