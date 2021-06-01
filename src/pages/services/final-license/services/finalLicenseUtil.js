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


const downloadFileFn = async (setLoading,loading, licenseNumber) => {
    setLoading(true)
    console.log("responseresponse", licenseNumber)
    const downloadDoc = await downloadDocument(licenseNumber, true)
    if (downloadDoc.isSuccessful){
        setLoading(false)
    }
    // else
    
}

const CenterDetailsValidation = values => {
    console.log("values", isNaN(values.CRNumber))
    var msg = {}
    if (!values.CRNumber)
        msg.CRNumber = required
    if (!values.temporaryLicenceNum)
        msg.temporaryLicenceNum = required
    // if (!values.municipLicenseNo)
    //     msg.municipLicenseNo = required

    if (values.CRNumber && isNaN(values.CRNumber))
        msg.CRNumber = "يجب ان يحتوي فقط على ارقام والا يزيد عددها عن 10 خانات"
    return msg
}

const uploadDocument = async (setDocument, name, file, multiple) => {
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
        else
            setDocument(name, response.responseBody.docID, multiple)
        // setDocument(name, response.docID, multiple)

    }
}

const capacityValidation = values => {
    var msg = {}
    console.log(' values.beneficiariesNum', typeof(values.beneficiariesNum) ,'values.capacity',typeof(values.capacity))
    console.log(' values.buildingArea',typeof( values.buildingArea),'values.basementArea',typeof(values.basementArea))
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

const personsValidation = values => {
    var msg = {}
    if (values.managersCount > 1 )
        msg.managersCount = ''
    if (values.beneficiariesNum/8 > values.teachersCount  )
        msg.managersCount = ''
    return msg
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



const DownloadButt = ({ docIDs, name, label }) => {
  const [loading,setLoading] = React.useState(false)
    return(
    <>
        { docIDs &&
            <>

                {/* { docIDs.map((docID, index) => ( */}
                {/* <Grid
                    container
                    spacing={3}
                    mt={3}
                    mb={3}
                > */}
                    <TableContainer >
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell> الرقم</TableCell>
                                    <TableCell> {label} </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {/* <Grid
                                    item
                                    lg={6}
                                    md={6}
                                    xs={12}
                                > */}
                                    {docIDs.map((docID, index) => (
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
                                                    // startIcon={<CloudDownloadIcon />}
                                                    onClick={() => downloadFileFn(setLoading,loading,docID)}
                                                >
                                                    تنزيل
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                {/* </Grid> */}
                            </TableBody>
                        </Table>
                    </TableContainer>

                {/* </Grid> */}
                <>
                    {/* <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                            {label}
                        </Typography>
                        <Button
                            key={index}
                            name={name}
                            variant="contained"
                            color="primary"
                            startIcon={<CloudDownloadIcon />}
                            onClick={() => downloadFileFn(docID)}
                        >
                            تنزيل
                       </Button> */}
                </>

            </>
        }
    </>
)

    }


export { CenterDetailsValidation, capacityValidation, ConditionComp, MedicalPracticeComp, calculationConditionComp, uploadDocument, DownloadButt, ContentField, personsValidation };