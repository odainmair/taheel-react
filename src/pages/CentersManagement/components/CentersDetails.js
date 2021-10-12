/* eslint-disable */
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { CentertDetails } from 'src/pages/services/final-license/services/finalLicenseAPI'
import CenterDetailsSchema from '../Schema/CenterDetailsSchema'
import FormCreator from 'src/Core/Components/FormCreator'
import { getRequestDetails } from 'src/pages/services/data/servicesApi'
import { REQUEST_TYPES, LICENSE_FORM_TYPES } from 'src/utils/enums'
import {
    Grid,
    Button,
} from '@material-ui/core';
import IconsTypeEnum from 'src/Core/Utils/IconsTypeEnum'
import IconsList from 'src/Core/Components/FieldsInputs/IconsList'
import { useNavigate } from 'react-router';

const CentersDetails = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const licenceNumber = location.state.licenceNumber
    const requestNum = location.state.requestNum
    console.log("licenceNumber+_+_+_+_+_+_+", licenceNumber)
    const [taskID, setTaskID] = useState()
    const [alertComment, setAlertComment] = useState()
    const [details, setDetails] = useState(false)
    const [navInfo, setNavInfo] = useState('')
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
        }
        if (!!requestNum) {
            const getReqDetails = await getRequestDetails(requestNum)
            if (getReqDetails.isSuccessful) {

                let reqDetails = getReqDetails.responseBody.requestDetails.data
                setAlertComment({ msg: reqDetails.chairmanComment?.comment, title: 'تعليق الرئيس' })
                setTaskID(reqDetails?.externalTaskData?.ID)
                console.log("reqDetails+++++++++++++", reqDetails)
                setLoading(false)
                if (reqDetails.externalTaskData?.type === REQUEST_TYPES.FINAL) {
                    setNavInfo({ url: '/services/editfinallicense', btnName: 'تعديل طلب ترخيص نهائي' })
                } else if (reqDetails.externalTaskData?.type === REQUEST_TYPES.RENEW) {
                    setNavInfo({ url: '/services/editfinallicense', btnName: 'تعديل طلب تجديد رخصة' })
                }
            }
        }
        setLoading(false)
    }, [])
    const title = 'تفاصيل المركز'
    const additionalFields = () => {
        return !!taskID &&
            (
                <Grid container
                    p={5}
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center">
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                backgroundColor: '#3c8084',
                            }}
                            onClick={() => {
                                navigate(navInfo.url, {
                                    state: {
                                        licenceNumber: licenceNumber,
                                        centerLicenceNumber: licenceNumber,
                                        taskID,
                                        requestNum,
                                        formType: LICENSE_FORM_TYPES.EDIT
                                    }
                                })
                            }}
                        >
                            <IconsList iconType={IconsTypeEnum.EDIT_ICON} label={navInfo.btnName} color="info" />
                        </Button>
                    </Grid>
                </Grid >
            )
    }
    return (
        <FormCreator
            title={title}
            schema={CenterDetailsSchema}
            errMessage={errMessage}
            initValues={details}
            additionalFields={additionalFields()}
            alertComment={alertComment}
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