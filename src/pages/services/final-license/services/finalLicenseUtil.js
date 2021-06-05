/* eslint-disable */
const required = 'يجب تعبئة الحقل'
import { Field } from 'react-final-form';
import React from 'react';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { uploadDocumentApi } from './finalLicenseAPI'
import { downloadDocument } from '../services/finalLicenseAPI'
import {
    Grid,
    Typography,
    TableContainer,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    Button,
    CircularProgress,
} from '@material-ui/core';




const CenterDetailsValidation = values => {
    console.log("values", isNaN(values.CRNumber))
    var msg = {}
    if (!values.CRNumber)
        msg.CRNumber = required
    if (!values.temporaryLicenceNum)
        msg.temporaryLicenceNum = required
    if (values.CRNumber && isNaN(values.CRNumber))
        msg.CRNumber = "يجب ان يحتوي فقط على ارقام والا يزيد عددها عن 10 خانات"
    return msg
}

const capacityValidation = values => {
    var msg = {}
    console.log(' values.beneficiariesNum', typeof (values.beneficiariesNum), 'values.capacity', typeof (values.capacity))
    console.log(' values.buildingArea', typeof (values.buildingArea), 'values.basementArea', typeof (values.basementArea))
    if (!values.beneficiariesNum)
        msg.beneficiariesNum = required
    if (!values.buildingArea)
        msg.buildingArea = required
    if (!values.basementArea)
        msg.basementArea = required
    if (parseInt(values.buildingArea) < parseInt(values.basementArea))
        msg.basementArea = 'مساحة القبو يجب ان تكون أقل من مساحة مسطح البناء'
    if (values.beneficiariesNum > parseInt(values.capacity))
        msg.beneficiariesNum = 'عدد المستفيدين يجب ان لا يتجاوز الطاقة الاستعابية'
    return msg
}

const RequirementsValidation = values => {
    const response = { isSuccessful: true, message: '' };
    if (!values.OperationalPlan || !values.ExecutivePlan || !values.OfficeReport || !values.SecurityReport || !values.Furniture || !values.FinancialGuaranteeAtt)
        return { isSuccessful: false, message: "يرجى ارفاق جميع المتطلبات المذكورة" };
    return response
}

const healthServicesValidation = async values => {
    const response = { isSuccessful: true, message: '' };
    if (!values.healthServices)
        return { isSuccessful: false, message: "يرجى تحديد ما ان كان المركز يقدم خدمات صحية ام لا" };
    if (values.healthServices === 'yes') {
        if (!values.healthServiceType)
            return { isSuccessful: false, message: "يرجى تحديد نوع الخدمة الصحية" };
        if (!values.healthServiceAttachment)
            if (values.healthServiceType === 1)
                return { isSuccessful: false, message: " يرجى ارفاق رخصة وزارة الصحة" };
            else
                return { isSuccessful: false, message: " يرجى ارفاق عقد الشراكة" };
    }
    return response

}

const personsValidation = async values => {
    const response = { isSuccessful: true, message: '' };
    if (!values.customers || values.customers.length === 0) {
        return { isSuccessful: false, message: "يرجى استيفاء الشروط" };

    }
    const TeachersCount = values.customers.filter(customer => customer.staffTypes === "معلم تربية خاصة ").length
    const managersCount = values.customers.filter(customer => customer.staffTypes === "مدير").length
    if (managersCount > 0 && managersCount !== 1)
        return { isSuccessful: false, message: "يرجى استيفاء الشروط" };

    if (values.beneficiariesNum / 8 >= TeachersCount && TeachersCount >= 1)
        return { isSuccessful: false, message: "يرجى استيفاء الشروط" };
    return response
}

const downloadFileFn = async (setLoading, loading, licenseNumber) => {
    setLoading(true)
    console.log("responseresponse", licenseNumber)
    const downloadDoc = await downloadDocument(licenseNumber, true)
    if (downloadDoc.isSuccessful) {
        setLoading(false)
    }
}

const uploadDocument = async (setDocument, name, file, multiple, setLoading) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async function () {
        var base64String = reader.result;
        var n = base64String.indexOf("base64,") + 7;
        base64String = reader.result.substr(n);
        const data = window.atob(base64String)
        const image = data

        const buf = new Uint8Array(image.length);
        for (let i = 0; i < image.length; i++) {
            buf[i] = image.charCodeAt(i);
        }

        const response = await uploadDocumentApi(name, buf)
        console.log('...response...', response)
        if (!response.isSuccessful)
            SetErrMessage(response.message)
        else {
            setDocument(name, response.responseBody.docID, multiple)
            setLoading(false)
        }
    }
}



const ConditionComp = ({ when, is, children }) => (
    <Field name={when} subscription={{ value: true }}>
        {({ input: { value } }) => (value == is ? children : null)}
    </Field>
)

const MedicalPracticeComp = ({ when, is, children }) => (
    <Field name={when} subscription={{ value: true }}>
        {({ input: { value } }) => (is.includes(value) ? children : null)}
    </Field>
)

const calculationConditionComp = ({ is, children }) => (
    <Field subscription={{ value: true }}>
        {(value) => (is ? children : null)}
    </Field>
)

const ContentField = ({ value, label }) => (
    <>
        <Typography gutterBottom variant="body2" color="textSecondary" component="p">
            {label}
        </Typography>
        <Typography gutterBottom variant="h5" component="h2">
            {value}
        </Typography>
    </>
)
const DownloadButt = ({ index, docID, name, label }) => {
    const [loading, setLoading] = React.useState(false)
    return (
        <>
            <TableRow>
                <TableCell> ملف رقم {index + 1} </TableCell>
                <TableCell>
                    <Button
                        startIcon={loading ? <CircularProgress size="1rem" /> : <CloudDownloadIcon />}
                        key={index}
                        name={name}
                        variant="contained"
                        color="primary"
                        sx={{
                            backgroundColor: '#3c8084',
                        }}
                        onClick={() => downloadFileFn(setLoading, loading, docID)}
                    >
                        تنزيل
                                                </Button>
                </TableCell>
            </TableRow>
        </>)
}
const DownloadButtTable = ({ docIDs, name, label }) => {

    return (
        <>
            { docIDs &&
                <>
                    <TableContainer >
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell> الرقم</TableCell>
                                    <TableCell> {label} </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {docIDs.map((docID, index) => (
                                    < DownloadButt index={index} docID={docID} name={name} label={label} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <>

                    </>

                </>
            }
        </>
    )

}





export { CenterDetailsValidation, capacityValidation, RequirementsValidation, healthServicesValidation, personsValidation, ConditionComp, MedicalPracticeComp, calculationConditionComp, uploadDocument, DownloadButt, ContentField, DownloadButtTable };