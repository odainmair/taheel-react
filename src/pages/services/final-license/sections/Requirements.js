/* eslint-disable no-unused-vars */
import {
    Grid,
} from '@material-ui/core';
import { Field } from 'react-final-form';
import FileUploader from 'src/components/FileUploader';
import { uploadDocument } from '../services/finalLicenseUtil'
import PropTypes from 'prop-types';

const Requirements = ({ setField, values }) => {
    var multipleDocs = []
    const setDocument = (name, docID, multiple) => {
        if (!multiple)
            setField(name, [docID])
        else {
            multipleDocs.push(docID)
            setField(name, multipleDocs)
        }
    }

    const FileUploaderComp = ({ input: { value, name }, label, inputType, setField, values }) => (
        <>
            <FileUploader
                handleFile={(file, setLoading) => uploadDocument(setDocument, name, file, inputType, setLoading)}
                label={label}
                name={name}
                inputType={inputType}
                fileName={(file) => file}
                setField={setField}
                values={values}
            />
        </>
    )

    return (
        <>
            <Grid
                container
                spacing={3}
                mt={3}
            >
                <Grid
                    item
                    md={12}
                    xs={12}
                >
                </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                >
                    <Field
                        label="ارفاق الخطة التشغيلية"
                        name="OperationalPlan"
                        component={FileUploaderComp}
                        inputType={false}
                        setField={setField}
                        values={values}
                    />
                </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                >
                    <Field
                        label="ارفاق الخطة التنفيذية"
                        name="ExecutivePlan"
                        component={FileUploaderComp}
                        inputType={false}
                        setField={setField}
                        values={values}
                    />
                </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                >
                    <Field
                        label="ارفاق تقرير زيارة مكتب هندسي معتمد"
                        name="OfficeReport"
                        component={FileUploaderComp}
                        inputType={false}
                        setField={setField}
                        values={values}
                    />
                </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                >
                    <Field
                        label="ارفاق تقرير المسح الأمني"
                        name="SecurityReport"
                        component={FileUploaderComp}
                        inputType={false}
                        setField={setField}
                        values={values}
                    />
                </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                >
                    <Field
                        label="ارفاق صور الأثاث و الأجهزة الكهربائية"
                        name="Furniture"
                        component={FileUploaderComp}
                        inputType={true}
                        setField={setField}
                        values={values}
                    />

                </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                >
                    <Field
                        label="ارفاق الضمان المالي"
                        name="FinancialGuaranteeAtt"
                        component={FileUploaderComp}
                        inputType={false}
                        setField={setField}
                        values={values}
                    />
                </Grid>
            </Grid>
        </>
    )
};

export default Requirements;
Requirements.propTypes = {
    setField: PropTypes.func.isRequired,
    values: PropTypes.func.isRequired,
    label: PropTypes.func.isRequired,
    input: PropTypes.func.isRequired,
    inputType: PropTypes.bool.isRequired,
};