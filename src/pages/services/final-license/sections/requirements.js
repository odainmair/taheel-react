/* eslint-disable no-unused-vars */
import {
    Grid,
} from '@material-ui/core';
import FileUploader from 'src/components/FileUploader';
const Requirements = () => {

    return (
        <>
            <Grid
                container
                spacing={3}
                mt={3}
            >
                <Grid
                    item
                    md={6}
                    xs={12}
                >
                    <FileUploader
                        handleFile={(test) => console.log(test)}
                        label="ارفاق الضمان المالي"
                        name="FinancialGuarantee"
                        multiple ={false}
                    />
                </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                >
                    <FileUploader
                        handleFile={(test) => console.log(test)}
                        label="ارفاق الخطة التشغيلية"
                        name="FinancialGuarantee"
                        multiple ={false}
                    />
                </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                >
                    <FileUploader
                        handleFile={(test) => console.log(test)}
                        label="ارفاق الخطة التنفيذية"
                        name="FinancialGuarantee"
                        multiple ={false}
                    />
                </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                >
                    <FileUploader
                        handleFile={(test) => console.log(test)}
                        label="ارفاق تقرير زيارة مكتب هندسي معتمد"
                        name="FinancialGuarantee"
                        multiple ={false}
                    />
                </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                >
                    <FileUploader
                        handleFile={(test) => console.log(test)}
                        label="ارفاق تقرير المسح الأمني"
                        name="FinancialGuarantee"
                        multiple ={false}
                    />
                </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                >
                    <FileUploader
                        handleFile={(test) => console.log(test)}
                        label="ارفاق صور الأثاث و الأجهزة الكهربائية"
                        name="FinancialGuarantee"
                        multiple ={false}
                    />
                </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                >
                    <FileUploader
                        handleFile={(test) => console.log(test)}
                        label="ارفاق الخطة التشغيلية"
                        name="FinancialGuarantee"
                        multiple ={true}
                    />
                </Grid>
            </Grid>

        </>
    ) 
};

export default Requirements;

