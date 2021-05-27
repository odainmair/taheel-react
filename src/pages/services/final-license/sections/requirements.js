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


const Requirements = () => {

    const { documents, SetDocuments } = useContext(localContext);
    const [errMessage, SetErrMessage] = useState('')
    const uploadDocument = async (name, file) => {
        console.log('filefile...', file)
        console.log('namename...', name)
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async function () {
            var base64String = reader.result;
            var n = base64String.indexOf("base64,") + 7;
            base64String = reader.result.substr(n);
            const data = window.atob(base64String)
            const image = data
            const response = await uploadDocumentApi(name, image)
            if (!response.isSuccessful)
                SetErrMessage(response.message)
            else
                documents.push({ name:name, docId:response.responseBody.docID })
            SetDocuments(documents)
        }
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
                        handleFile={(file) => uploadDocument("الخطة التشغيلية", file[0])}
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
                        handleFile={(file) => uploadDocument("الخطة التنفيذية", file[0])}
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
                        handleFile={(file) => uploadDocument(" تقرير زيارة مكتب هندسي معتمد", file[0])}
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
                        handleFile={(file) => uploadDocument("تقرير المسح الأمني", file[0])}
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
                        handleFile={(file) => uploadDocument("صور الأثاث و الأجهزة الكهربائية", file[0])}
                        label="ارفاق صور الأثاث و الأجهزة الكهربائية"
                        name="Furniture"
                        multiple={true}
                    />
                </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                >
                    <FileUploader
                        handleFile={(file) => uploadDocument("الضمان المالي", file[0])}
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

