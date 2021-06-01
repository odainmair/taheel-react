/* eslint-disable no-unused-vars */
import {
    Grid,
    Alert
} from '@material-ui/core';
import { Field } from 'react-final-form';
import { useState } from 'react';
import FileUploader from 'src/components/FileUploader';
import { uploadDocumentApi } from '../services/finalLicenseAPI'
import { useContext } from 'react';
import localContext from 'src/localContext';
import { uploadDocument } from '../services/finalLicenseUtil'
import PropTypes from 'prop-types';

const Requirements = ({ setField, values }) => {

    const { documents, SetDocuments } = useContext(localContext);
    const [errMessage, SetErrMessage] = useState('')

    // const uploadDocument = async (name, file) => {
    //     console.log('filefile...', file)
    //     console.log('namename...', name)
    //         var reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         reader.onloadend = async function () {
    //             var base64String = reader.result;
    //             var n = base64String.indexOf("base64,") + 7;
    //             base64String = reader.result.substr(n);
    //             // const data = window.atob(base64String)
    //             const image = base64String
    //             const response = await uploadDocumentApi(name, image)
    //             if (!response.isSuccessful)
    //                 SetErrMessage(response.message)
    //             else
    //                 documents[name] = response.responseBody.docID 
    //             SetDocuments(documents)
    //         }
    // }
    var multipleDocs = []
    const setDocument = (name, docID, multiple) => {
        if (!multiple)
            setField(name, [docID])
        else {
            multipleDocs.push(docID)
            setField(name, multipleDocs)
        }
    }

    const FileUploaderComp = ({ input: { value, name }, label, inputType }) => (
        <>

            <FileUploader
                handleFile={(file,setLoading) => uploadDocument(setDocument, name, file, inputType , setLoading)}
                label={label}
                name= {name} 
                inputType={inputType}
                fileName= {(file) => file}
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
                    {errMessage && (
                        <Alert variant="outlined" severity="error">
                            {errMessage}
                        </Alert>
                    )}
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