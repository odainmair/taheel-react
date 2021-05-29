/* eslint-disable no-unused-vars */
import {
    Grid,
    Alert
} from '@material-ui/core';
import { useState } from 'react';
import FileUploader from 'src/components/FileUploader';
import { uploadDocumentApi } from '../services/finalLicenseAPI'
import { useContext } from 'react';
import localContext from 'src/localContext';
import { uploadDocument } from '../services/finalLicenseUtil'


const Requirements = () => {

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

    const setDocument = (name, docID, multiple) => {
        if (!documents['requirements'][name])
            documents['requirements'][name] = []
        if (!multiple)
            documents['requirements'][name] = [docID]
        else
            documents['requirements'][name].push(docID)

        SetDocuments(documents)
    }

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
                    <FileUploader
                        handleFile={(file) => uploadDocument(setDocument, "الخطة التشغيلية", file)}
                        label="ارفاق الخطة التشغيلية"
                        name="OperationalPlan "
                        multiple={false}
                    />
                </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                >
                    <FileUploader
                        handleFile={(file) => uploadDocument(setDocument, "الخطة التنفيذية", file)}
                        label="ارفاق الخطة التنفيذية"
                        name="ExecutivePlan"
                        multiple={false}
                    />
                </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                >
                    <FileUploader
                        handleFile={(file) => uploadDocument(setDocument, "تقرير زيارة مكتب هندسي معتمد", file)}
                        label="ارفاق تقرير زيارة مكتب هندسي معتمد"
                        name="OfficeReport"
                        multiple={false}
                    />
                </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                >
                    <FileUploader
                        handleFile={(file) => uploadDocument(setDocument, "تقرير المسح الأمني", file)}
                        label="ارفاق تقرير المسح الأمني"
                        name="SecurityReport"
                        multiple={false}
                    />
                </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                >
                    <FileUploader
                        handleFile={(file) => uploadDocument(setDocument,"صور الأثاث و الأجهزة الكهربائية", file, true)}
                        // handleFile={(test) => console.log(test)}
                        label="ارفاق صور الأثاث و الأجهزة الكهربائية"
                        name="Furniture"
                        multiple={true}
                        section= 'requirements'
                        sectionFile = 'صور الأثاث و الأجهزة الكهربائية'
                        
                    />
                </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                >
                    <FileUploader
                        handleFile={(file) => uploadDocument(setDocument, "الضمان المالي", file)}
                        label="ارفاق الضمان المالي"
                        name="FinancialGuarantee"
                        multiple={false}
                    />
                </Grid>
            </Grid>

        </>
    )
};

export default Requirements;

