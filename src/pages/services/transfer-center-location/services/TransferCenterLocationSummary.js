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
    const [taskID, setTaskID] = useState()
    const requestNum = location.state.requestNum
    console.log("licenceNumber+_+_+_+_+_+_+", licenceNumber)
    console.log("requestNum+_+_+_+_+_+_+", requestNum)
    console.log("taskID+_+_+_+_+_+_+", taskID)
    const [details, setDetails] = useState(false)
    const [isAgree, setIsAgree] = useState(false)
    const [errMessage, SetErrMessage] = useState('')
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [btnsOptions, setBtnsOptions] = useState({})
    const [dialogContent, setDialogContent] = useState("")
    const [dialogTitle, setDialogTitle] = useState("")
    const handleClickOpen = (data) => {
        SetErrMessage('')
        setOpen(true);
    };
    useEffect(async () => {
        setLoading(true)
        const getReqDetails = await getRequestDetails(requestNum)
        if (!getReqDetails.isSuccessful) {
            SetErrMessage(getReqDetails.message)
        } else {
            let Details = getReqDetails.responseBody.requestDetails.data
            setTaskID(Details?.externalTaskData?.ID)
            Details = { NewCenterLocationData: { ...Details.processVariablesDump.NewCenterLocationData }, center: { ...Details.center } }
            console.log("Details+++++++++++++", Details)
            setDetails(Details)
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
            setLoading(false)
            setBtnsOptions({
                acceptBtnName: "تم", onClose: () => {
                    navigate("/app/orders", {
                        state: {
                            centerLicenceNumber: licenceNumber,
                            taskID: taskID
                        }
                    })
                }
            });
            setDialogContent(`${deleteCommissioner.responseBody.data.message} `+reqNum);
            setDialogTitle('')
            setOpen(true);

            console.log('navegate');
        }
        return { isSquccessful: true, message: "تم الحذف بنجاح" };
    }
    const title = 'تفاصيل طلب نقل المركز'
    const additionalFields = (isAgree, setIsAgree) => {
        return !!taskID ?
            (
                <Grid container spacing={2} mt={3} justifyContent="space-between">
                    <Grid item>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                setBtnsOptions({ onClose: () => { setOpen(false) }, buttons: { leftBtn: { title: 'نعم', func: () => { setOpen(false); onCancelTCRequest(); } }, rightBtn: { title: 'لا', func: ()=>{setOpen(false)} } } });
                                setDialogContent('هل انت متأكد من الغاء طلب نقل المركز ؟ ');
                                setDialogTitle('إلغاء طلب نقل المركز')
                                setOpen(true);
                            }
                            }
                        >
                            <IconsList iconType={IconsTypeEnum.DELETE_ICON} label="إلغاء الطلب" color="info" />


                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                backgroundColor: '#3c8084',
                            }}
                            onClick={() => {
                                navigate("/services/transfercenter", {
                                    state: {
                                        centerLicenceNumber: licenceNumber,
                                        taskID,
                                        requestNum,
                                        formEdit:true
                                    }
                                })
                            }}
                        >
                            <IconsList iconType={IconsTypeEnum.EDIT_ICON} label="تعديل بيانات طلب نقل المركز" color="info" />
                        </Button>
                    </Grid>
                </Grid >
            ) : ''
    }
    return (
        <>
            <AlertDialog dialogContent={dialogContent} dialogTitle={dialogTitle} open={open} {...btnsOptions} />
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