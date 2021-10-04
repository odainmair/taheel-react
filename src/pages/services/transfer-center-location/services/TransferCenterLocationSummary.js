/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { CentertDetails } from 'src/pages/services/final-license/services/finalLicenseAPI'
import TransferCenterLocationSchema from '../models/TransferCenterLocationSchema'
import FormCreator from 'src/Core/Components/FormCreator'
import {
    Grid,
    Button,
    CircularProgress,
} from '@material-ui/core';
import IconsTypeEnum from 'src/Core/Utils/IconsTypeEnum'
import IconsList from 'src/Core/Components/FieldsInputs/IconsList'
import AlertDialog from 'src/components/AlertDialog';
import { cancelTCRequest, getRequestDetails } from 'src/pages/services/data/servicesApi'
import { useNavigate } from 'react-router';

const TransferCenterLocationSummary = () => {
    const location = useLocation()
    const navigate = useNavigate();
    const licenceNumber = location.state.licenceNumber
    const taskID = location.state.taskID
    const reqNum = location.state.requestNum
    console.log("licenceNumber+_+_+_+_+_+_+", licenceNumber)
    console.log("taskID+_+_+_+_+_+_+", taskID)
    console.log("reqNum+_+_+_+_+_+_+", reqNum)
    const [details, setDetails] = useState(false)
    const [isAgree, setIsAgree] = useState(false)
    const [errMessage, SetErrMessage] = useState('')
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false);
    const handleClickOpen = (data) => {
        SetErrMessage('')
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(async () => {
        setLoading(true)
        const getCenterDetails = await getRequestDetails(reqNum)
        if (!getCenterDetails.isSuccessful) {
            SetErrMessage(getCenterDetails.message)
        } else {
            const Details = getCenterDetails.responseBody.requestDetails.data.center
            setDetails({ ...Details, ...Details.centerInfo_r })
            console.log("Details+++++++++++++", Details)
            setLoading(false)
        }
    }, [])
    async function onCancelTCRequest() {
        setLoading(true)
        const deleteCommissioner = await cancelTCRequest(taskID, licenceNumber)
        if (!deleteCommissioner.isSuccessful) {
            SetErrMessage(deleteCommissioner.message);
            return { isSquccessful: false, message: deleteCommissioner.message };
        } else {
            candidateStaff.push(staff.filter(st => st.idNumIqamaNum === currentSelected.idNumIqamaNum)[0])
            setLoading(false)
            navigate("/app/orders", {
                state: {
                    centerLicenceNumber: licenceNumber,
                    taskID: taskID,
                    successDeleted: true
                }
            })
            return { isSquccessful: true, message: email + " تم الحذف بنجاح" };
        }
    }
    const title = 'تفاصيل طلب نفل المركز'
    const additionalFields = (isAgree, setIsAgree) => {
        return (
            <Grid container spacing={2} mt={3} justifyContent="space-between">
                <Grid item>
                    <Button
                        startIcon={loading ? <CircularProgress size="1rem" /> : null}
                        variant="contained"
                        color="secondary"
                        onClick={() => setOpen(true)}
                    >
                        <IconsList iconType={IconsTypeEnum.DELETE_ICON} label="إلغاء الطلب" color="info" />


                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        startIcon={loading ? <CircularProgress size="1rem" /> : null}
                        variant="contained"
                        color="primary"
                        sx={{
                            backgroundColor: '#3c8084',
                        }}
                        onClick={() => {
                            navigate("/services/transfercenter", {
                                state: {
                                    centerLicenceNumber: licenceNumber,
                                    taskID: taskID,
                                }
                            })
                        }}
                    >
                        <IconsList iconType={IconsTypeEnum.EDIT_ICON} label="تعديل بيانات طلب نقل المركز" color="info" />
                    </Button>
                </Grid>
            </Grid>
        )
    }
    return (
        <>
            <AlertDialog open={open} onClose={() => { setOpen(false) }} dialogTitle="إلغاء طلب نقل المركز" dialogContent={"هل انت متأكد من الغاء طلب نقل المركز ؟ "} buttons={{ leftBtn: { title: 'نعم', func: () => { setOpen(false); onCancelTCRequest(); } }, rightBtn: { title: 'لا', func: handleClose } }} />
            <FormCreator
                title={title}
                schema={TransferCenterLocationSchema}
                errMessage={errMessage}
                initValues={details}
                additionalFields={additionalFields(isAgree, setIsAgree)}
                isLoading={loading}
                navBackUrl={{ url: '/app/orders', state: { licenceNumber: licenceNumber } }}
                formType='view'
            />
        </>
    )
}
TransferCenterLocationSummary.propTypes = {
    // centers: PropTypes.array.isRequired
}

export default TransferCenterLocationSummary