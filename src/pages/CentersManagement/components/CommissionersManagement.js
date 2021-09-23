/* eslint-disable */
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router';
import React, { useState, useEffect, useMemo } from 'react';
import { Button, Grid } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import { CentertDetails } from 'src/pages/services/final-license/services/finalLicenseAPI';
import { TablePaginationObject } from 'src/Core/Utils/TablePagination';
import CrewSchema, { SchemaActions } from '../Schema/CommissionersTableSchema';
import TableDataViewEnum from 'src/Core/Utils/TableDataViewEnum';
import IconsTypeEnum from 'src/Core/Utils/IconsTypeEnum';
import IconsList from 'src/Core/Components/FieldsInputs/IconsList';
import TableCreator from 'src/Core/Components/TableCreator';
import AlertDialog from 'src/components/AlertDialog';
import Fab from '@mui/material/Fab';
import { deleteCommissionerRs } from '../data/CentersApi';

const AddCommissioner = (props) => {
    const location = useLocation();
    const licenceNumber = location.state.licenceNumber;
    const navigateion = useNavigate()
    console.log("licenceNumber+_+_+_+_+_+_+", licenceNumber)
    const [commissioners, setCommissioners] = useState([]);
    const [staff, setStaff] = useState([]);
    const [candidateStaff, setCandidateStaff] = useState([]);
    const [errMessage, SetErrMessage] = useState(location.state.message)
    const [loading, setLoading] = useState(true);
    const TPObject = TablePaginationObject(TableDataViewEnum.ALL_DATA)
    const [open, setOpen] = useState(false);
    const [currentSelected, setCurrentSelected] = useState('');
    const paramData = useMemo(() => {
        return {
            batchSize: TPObject.pagination.batchSize,
            startIndex: TPObject.pagination.startIndex,
            filters: TPObject.pagination.filters
        }
    }, [TPObject.pagination.batchSize, TPObject.pagination.startIndex, TPObject.pagination.filters])

    const tableTitle = 'جدول المفوضين'
    const pageTitle = 'إدارة المفوضين'
    const tableAction = () => {
        return (
            candidateStaff.length > 0 ?
                (<>إضافة مفوض &nbsp;
                    < Fab size="small" color="primary" aria-label="add" onClick={() => navigateion('/app/AddCommissioner', { state: { licenceNumber, candidateStaff } })}>
                        <IconsList iconType={IconsTypeEnum.ADD_ICON} color="info" />
                    </Fab ></>
                )
                : ('')
        )
    }

    const handleClickOpen = (data) => {
        setCurrentSelected(data)
        SetErrMessage('')
        setOpen(true);
    };

    const handleClose = () => {
        setCurrentSelected('');
        setOpen(false);
    };
    async function deleteCommissioner() {
        const email = currentSelected['email']
        setLoading(true)
        const deleteCommissioner = await deleteCommissionerRs(email)
        if (!deleteCommissioner.isSuccessful) {
            SetErrMessage(deleteCommissioner.message);
            return { isSquccessful: false, message: deleteCommissioner.message };
        } else {
            candidateStaff.push(staff.filter(st => st.idNumIqamaNum === currentSelected.idNumIqamaNum)[0])
            setCommissioners(commissioners.filter(commissioner => commissioner.email !== email))
            SetErrMessage({ msg: email + " تم الحذف بنجاح", type: "success" });
            setLoading(false)
            return { isSquccessful: true, message: email + " تم الحذف بنجاح" };
        }
    }
    useEffect(async () => {
        const getCenterDetails = await CentertDetails(licenceNumber, paramData.startIndex, paramData.batchSize, paramData.filters);
        if (!getCenterDetails.isSuccessful) {
            const response = { isSuccessful: false, message: getCenterDetails.message };
            SetErrMessage(getCenterDetails.message)
            setLoading(true)
        } else {
            const Details = getCenterDetails.responseBody.data;
            Details.staff.map(data => data.licenceNumber = licenceNumber)
            setCommissioners(Details.commissioner)
            setCandidateStaff(Details.candidateStaff)
            setStaff(Details.staff)
            console.log('commissioner', Details.commissioner)
            console.log('candidateStaff', Details.candidateStaff)
            console.log("Details+++++++++++++", Details);
            setLoading(false)
        }

    }, []);

    return (
        <>
            <AlertDialog open={open} onClose={() => { setOpen(false) }} dialogTitle="حذف مفوض" dialogContent={" هل انت متأكد من حذف صاحب رقم الإقامة ' " + currentSelected["idNumIqamaNum"] + " ' من لائحة المفوضين ؟ "} buttons={{ leftBtn: { title: 'حذف', func: () => { setOpen(false); return deleteCommissioner() } }, rightBtn: { title: 'إلغاء', func: handleClose } }} />
            <TableCreator
                pageTitle={pageTitle}
                tableTitle={tableTitle}
                navBackUrl={{ url: '/app/centers', state: { licenceNumber: licenceNumber } }}
                tableShcema={{ ...CrewSchema, ...SchemaActions() }}
                dataTable={commissioners}
                loading={loading}
                otherFunc={handleClickOpen}
                SetErrMessage={SetErrMessage}
                action={tableAction()}
                errMessage={errMessage} />
        </>
    )
    AddCommissioner.propTypes = {
        // centers: PropTypes.array.isRequired
    }
}

export default AddCommissioner;
