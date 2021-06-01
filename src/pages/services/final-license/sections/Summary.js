import React from 'react';
import {
    Divider,
    Grid,
    FormControl,
    Typography,
    FormControlLabel,
    Link,
    TableContainer,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    Button,
    IconButton,
} from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { Field } from 'react-final-form';
import { FieldArray } from "react-final-form-arrays";
import PropTypes from 'prop-types';
import { TextField as TextFieldFinal, Checkbox } from 'final-form-material-ui';
import finalLicenseFieldSchema from '../models/finalLicenseFieldSchema';
import TermsContent from './TermsContent';
import TermsDialog from 'src/components/TermsDialog';
import { useContext } from 'react';
import localContext from 'src/localContext';
import { DownloadButt } from '../services/finalLicenseUtil'
import { downloadDocument } from '../services/finalLicenseAPI'
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';

const contentField = ({ input: { value, name }, label, type, inputType }) => (
    <>
        <Typography gutterBottom variant="body2" color="textSecondary" component="p">
            {label}
        </Typography>
        <Typography gutterBottom variant="h5" component="h2">
            {inputType !== 'Select' && inputType !== 'Radio' ? value : getFieldValue({ name, value })}
        </Typography>
    </>
)

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});


const termsLabel = (openDialog) => (
    <>
        <Typography gutterBottom variant="h5" component="span">
            انا اقر واتعهد بالالتزام بالشروط والاحكام الواردة والمتعلقه بالطلب
            <Link href="#" sx={{ color: '#147fbd' }} onClick={() => openDialog()}> (للاطلاع على الشروط والاحكام انقر هنا)</Link>
        </Typography>

    </>
)
const getFieldValue = ({ name, value }) => {
    if (value == '')
        return '';
    const filredFinal = finalLicenseFieldSchema.filter(fintalLicense => fintalLicense.name === name);
    if (filredFinal.length > 0) {
        const filteredvalue = filredFinal[0].options.filter(option => option.value == value);
        if (filteredvalue.length > 0)
            return filteredvalue[0].label.ar;
    }
    return '';
}
const downloadFileFn = async (licenseNumber) => {
    console.log("responseresponse", licenseNumber)
    const downloadDoc = downloadDocument(licenseNumber, true)
}


const Summary = ({ values }) => {

    const [open, setOpen] = React.useState(false);
    const { documents, SetDocuments } = useContext(localContext);
    const { finalLicenseDetails, SetFinalLicenseDetails } = useContext(localContext);

    console.log('documents>>>', documents)
    const handleClickOpen = (dialogContent, dialogTitle) => {
        setOpen(true);
    };
    const handleClose = (value) => {
        setOpen(false);
    };



    const Row = ({ fields, name, index }) => {
        const classes = useRowStyles();
        const [showen, setShowen] = React.useState(false)
        return (
            <>
                <TableRow className={classes.root} key={name}>
                    {console.log("fields", fields.value)}

                    <TableCell component="th" scope="row">
                        {name.fullName}
                    </TableCell>

                    <TableCell component="th" scope="row">
                        {name.idNumber ? name.idNumber : name.iqamaNo}
                    </TableCell>

                    <TableCell component="th" scope="row">
                        {name.staffTypes}
                    </TableCell>

                    <TableCell component="th" scope="row">
                        {name.gender}
                    </TableCell>

                    <TableCell component="th" scope="row">
                        {name.nationality}
                    </TableCell>
                    <TableCell>
                        <IconButton onClick={() => setShowen(!showen)}>
                            {showen ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                    </TableCell>

                </TableRow>
                <TableRow >
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                    <Collapse in={showen} className={`Attach${index}`} timeout="auto" unmountOnExit  >

                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                item
                                lg={4}
                                md={6}
                                xs={12}
                            >
                                < DownloadButt docIDs={name.cv} name={`${name}.cv`} label='السيرة الذاتية' />
                                {/* <Button
                                    name={`${name}.cv`}
                                    variant="contained"
                                    color="primary"
                                    startIcon={<CloudDownloadIcon />}
                                    onClick={() => downloadFileFn(name.cv)}
                                >
                                    تنزيل
                            </Button> */}
                            </Grid>
                            <Grid
                                item
                                lg={4}
                                md={6}
                                xs={12}
                            >
                                < DownloadButt docIDs={name.EducationalQualification} name={`${name}.EducationalQualification`} label='السيرة الذاتية' />
                                {/* <Button
                                    name={`${name}.EducationalQualification`}
                                    variant="contained"
                                    color="primary"
                                    startIcon={<CloudDownloadIcon />}
                                    onClick={() => downloadFileFn(name.EducationalQualification)}
                                >
                                    تنزيل
                                </Button> */}
                            </Grid>
                            <Grid
                                item
                                lg={4}
                                md={6}
                                xs={12}
                            >
                                < DownloadButt docIDs={name.MedicalPractice} name={`${name}.MedicalPractice`} label='السيرة الذاتية' />

                                {/* <Button
                                    name={`${name}.MedicalPractice`}
                                    variant="contained"
                                    color="primary"
                                    startIcon={<CloudDownloadIcon />}
                                    onClick={() => downloadFileFn(name.MedicalPractice)}
                                >
                                    تنزيل
                                 </Button> */}
                            </Grid>
                        </Grid>                                                         {/* </TableCell> */}
                    </Collapse>
                    </TableCell>
                </TableRow>
            </>
        )
    }


    return (
        <>
            <Typography
                color="textPrimary"
                gutterBottom
                mb={4}
                mt={6}
                variant="h4"
            >
                معلومات المركز
            </Typography>
            <Grid
                container
                spacing={3}
                mt={3}
                mb={3}
            >

                {finalLicenseFieldSchema.filter(fintalLicense => fintalLicense.sectionName === "CenterDetails" && !fintalLicense.dependOn).map(filteredFinalLicense => (
                    <Grid
                        item
                        key={filteredFinalLicense.id}
                        lg={6}
                        md={6}
                        xs={12}
                    >


                        {console.log('finalLicenseDetails', finalLicenseDetails)}
                        <Field
                            label={filteredFinalLicense.label.ar}
                            name={filteredFinalLicense.name}
                            component={contentField}
                            inputType={filteredFinalLicense.type}
                        />
                    </Grid>
                ))}

            </Grid>
            <Divider />
            <Typography
                color="textPrimary"
                gutterBottom
                mb={4}
                mt={6}
                variant="h4"
            >
                الطاقة الإستعابية
            </Typography>
            <Grid
                container
                spacing={3}
                mt={3}
                mb={3}
            >
                {finalLicenseFieldSchema.filter(fintalLicense => fintalLicense.sectionName === "Capacity" && !fintalLicense.dependOn).map(filteredFinalLicense => (
                    <Grid
                        item
                        key={filteredFinalLicense.id}
                        lg={6}
                        md={6}
                        xs={12}
                    >
                        <Field
                            label={filteredFinalLicense.label.ar}
                            name={filteredFinalLicense.name}
                            component={contentField}
                            inputType={filteredFinalLicense.type}
                        />
                    </Grid>
                ))}
            </Grid>

            <Divider />
            <Typography
                color="textPrimary"
                gutterBottom
                mb={4}
                mt={6}
                variant="h4"
            >
                المتطلبات
            </Typography>
            <Grid
                container
                spacing={10}
                // mt={3}
                mb={3}
            >
                {finalLicenseFieldSchema.filter(fintalLicense => fintalLicense.sectionName === "Requirements" && !fintalLicense.dependOn).map(filteredFinalLicense => (
                    <Grid
                        item
                        key={filteredFinalLicense.id}
                        lg={6}
                        md={6}
                        xs={12}
                    >

                        {console.log('{values[filteredFinalLicense.name]', values[filteredFinalLicense.name])}
                        {console.log('values', values)}
                        {console.log('[filteredFinalLicense.name]', filteredFinalLicense.name)}
                        < DownloadButt docIDs={values[filteredFinalLicense.name]} name={filteredFinalLicense.name} label={filteredFinalLicense.label.ar} />
                    </Grid>
                ))}
            </Grid>

            <Divider />
            <Typography
                color="textPrimary"
                gutterBottom
                mb={4}
                mt={6}
                variant="h4"
            >
                الخدمات الصحية
            </Typography>
            <Grid
                container
                spacing={3}
                mt={3}
                mb={3}
            >
                {finalLicenseFieldSchema.filter(fintalLicense => fintalLicense.sectionName === "HealthServices" && !fintalLicense.dependOn).map(filteredFinalLicense => (
                    <Grid
                        item
                        key={filteredFinalLicense.id}
                        lg={6}
                        md={6}
                        xs={12}
                    >
                        <Field
                            label={filteredFinalLicense.label.ar}
                            name={filteredFinalLicense.name}
                            component={contentField}
                            inputType={filteredFinalLicense.type}
                        />
                    </Grid>
                ))}
                <Grid
                    item
                    lg={6}
                    md={6}
                    xs={12}
                >
                    < DownloadButt docIDs={values.healthServiceAttachment} name='healthServiceAttachment' label='مرفقات الخدمات الصحية' />
                </Grid>

            </Grid>
            <Divider />

            <Typography
                color="textPrimary"
                gutterBottom
                mb={4}
                mt={6}
                variant="h4"
            >
                معلومات الكوادر
            </Typography>
            <Grid
                container
                spacing={3}
                mt={3}
                mb={3}
            >

                <Grid
                    item
                    lg={12}
                    md={12}
                    xs={12}
                >
                    <TableContainer>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell> الاسم الكامل </TableCell>
                                    <TableCell> رقم الهوية/الاإقامة </TableCell>
                                    <TableCell> نوع الكادر </TableCell>
                                    <TableCell> الجنس </TableCell>
                                    <TableCell> الجنسية</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <FieldArray name="customers">

                                    {({ fields }) => fields.value.map((name, index) => (
                                        <Row key={index} fields={fields} name={name} index={index} />
                                    ))}
                                </FieldArray>
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Grid>
            </Grid>
            <Divider />

            <Grid
                container
                lg={12}
                md={12}
                xs={12}
                mt={3}
            >
                <Field name="agree" mt={3}>
                    {({ meta }) => ( // eslint-disable-line no-unused-vars
                        <FormControl component="fieldset" error={meta.error} required>
                            <FormControlLabel
                                label={termsLabel(handleClickOpen)}
                                control={
                                    <Field
                                        name="agree"
                                        component={Checkbox}
                                        type="checkbox"
                                        value="true"
                                    />
                                }
                            />
                        </FormControl>
                    )}
                </Field>
            </Grid>
            <TermsDialog dialogContent={TermsContent()} dialogTitle={"التعهد"} open={open} onClose={handleClose} acceptBtnName="اوافق" />
        </>
    )
}

export default Summary;
Summary.propTypes = {
    section: PropTypes.func.isRequired,
    label: PropTypes.func.isRequired,
    value: PropTypes.func.isRequired,
    values: PropTypes.func.isRequired,
    index: PropTypes.func.isRequired,
    name: PropTypes.func.isRequired,
    fields: PropTypes.func.isRequired,

};


