/* eslint-disable */
import { Helmet } from 'react-helmet';
import React, { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import {
    Box,
    Container,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { getCurrentUser } from 'src/utils/UserLocalStorage';
import { CentertDetails } from 'src/pages/services/final-license/services/finalLicenseAPI';

const CentersDetails = (props) => {
    const location = useLocation();
    const licenceNumber = location.state.licenceNumber;
    console.log("kholoud+_+_+_+_+_+_+", licenceNumber)
    const [open, setOpen] = React.useState(false);
    const [dialogContent, setDialogContent] = React.useState('');
    const [dialogTitle, setDialogTitle] = React.useState('');
    
    const { firstName, lastName, email, phoneNumber } = getCurrentUser();
    const [values, setValues] = useState({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phoneNumber,
    });
    useEffect(async () => {
        // const getCentersRs = await getCentersFun(email);
        const getCenterDetails = await CentertDetails(licenceNumber);
        if (!getCenterDetails.isSuccessful) {
          response = { isSuccessful: false, message: getCenterDetails.message };
        } else {
          const { Details } = getCenterDetails.data;
          setDetails(Details)
          console.log("Details+++++++++++++", Details);
        }
      }, []);

      const handleChange = () => {
    
      };

    return (

        <>
            <Helmet>
                <title>CenterDetails</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth="lg">
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            container
                            lg={12}
                            md={6}
                            xs={12}
                            marginTop={3}
                        >
                            <Grid item
                                lg={12}
                                md={12}
                                xs={12}
                                marginBottom={3}
                            >
                                <Card>
                                    <CardHeader
                                        title="معلومات المركز"
                                    />
                                    <Divider />
                                    <CardContent>
                                        {/* {centers.map((cent, index) => (
           <Grid   key={cent ? cent.requestNum : index}> */}
                                        <Grid
                                            container
                                            spacing={3}
                                        >
                                            <Grid
                                                item
                                                md={4}
                                                xs={12}
                                            >
                                                <TextField
                                                    fullWidth
                                                    label="اسم المركز"
                                                    name="firstName"
                                                    onChange={handleChange}
                                                    value="خلود"
                                                    variant="outlined"
                                                    dir="rtl"
                                                    className="custom-field"
                                                    disabled
                                                />
                                            </Grid>

                                            <Grid
                                                item
                                                md={4}
                                                xs={12}
                                            >
                                                <TextField
                                                    fullWidth
                                                    label="رقم السجل التجاري للمركز"
                                                    name="firstName"
                                                    onChange={handleChange}
                                                    value="خلود"
                                                    variant="outlined"
                                                    dir="rtl"
                                                    className="custom-field"
                                                    disabled
                                                />
                                            </Grid>

                                            <Grid
                                                item
                                                md={4}
                                                xs={12}
                                            >
                                                <TextField
                                                    fullWidth
                                                    label="نوع النشاط التجاري للمركز"
                                                    name="firstName"
                                                    onChange={handleChange}
                                                    value="خلود"
                                                    variant="outlined"
                                                    dir="rtl"
                                                    className="custom-field"
                                                    disabled
                                                />
                                            </Grid>

                                            <Grid
                                                item
                                                md={4}
                                                xs={12}
                                            >
                                                <TextField
                                                    fullWidth
                                                    label="رخصة البلدية"
                                                    name="firstName"
                                                    onChange={handleChange}
                                                    value="خلود"
                                                    variant="outlined"
                                                    dir="rtl"
                                                    className="custom-field"
                                                    disabled
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                md={4}
                                                xs={12}
                                            >
                                                <TextField
                                                    fullWidth
                                                    label="الطاقة الاستيعابيه القصوى للمركز"
                                                    name="firstName"
                                                    onChange={handleChange}
                                                    value="خلود"
                                                    variant="outlined"
                                                    dir="rtl"
                                                    className="custom-field"
                                                    disabled
                                                />
                                            </Grid>

                                            <Grid
                                                item
                                                md={4}
                                                xs={12}
                                            >
                                                <TextField
                                                    fullWidth
                                                    label="عدد المستفيدين المطلوب"
                                                    name="firstName"
                                                    onChange={handleChange}
                                                    value="خلود"
                                                    variant="outlined"
                                                    dir="rtl"
                                                    className="custom-field"
                                                    disabled
                                                />
                                            </Grid>

                                            <Grid
                                                item
                                                md={4}
                                                xs={12}
                                            >
                                                <TextField
                                                    fullWidth
                                                    label="حساب قيمة الضمان المالي "
                                                    name="firstName"
                                                    onChange={handleChange}
                                                    value="خلود"
                                                    variant="outlined"
                                                    dir="rtl"
                                                    className="custom-field"
                                                    disabled
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                md={4}
                                                xs={12}
                                            >
                                                <TextField
                                                    fullWidth
                                                    label="مساحة مسطح البناء"
                                                    name="firstName"
                                                    onChange={handleChange}
                                                    value="test"
                                                    variant="outlined"
                                                    dir="rtl"
                                                    className="custom-field"
                                                    disabled
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                md={4}
                                                xs={12}
                                            >
                                                <TextField
                                                    fullWidth
                                                    label="مساحة القبو"
                                                    name="firstName"
                                                    onChange={handleChange}
                                                    value="test"
                                                    variant="outlined"
                                                    dir="rtl"
                                                    className="custom-field"
                                                    disabled
                                                />
                                            </Grid>

                                            <Grid
                                                item
                                                md={4}
                                                xs={12}
                                            >
                                                <TextField
                                                    fullWidth
                                                    label="الخطة التشغيلية"
                                                    name=""
                                                    onChange={handleChange}
                                                    value="test"
                                                    variant="outlined"
                                                    dir="rtl"
                                                    className="custom-field"
                                                    disabled
                                                />
                                            </Grid>

                                            <Grid
                                                item
                                                md={4}
                                                xs={12}
                                            >
                                                <TextField
                                                    fullWidth
                                                    label="الخطة التنفيذية"
                                                    name=""
                                                    onChange={handleChange}
                                                    value="test"
                                                    variant="outlined"
                                                    dir="rtl"
                                                    className="custom-field"
                                                    disabled
                                                />
                                            </Grid>

                                            <Grid
                                                item
                                                md={4}
                                                xs={12}
                                            >
                                                <TextField
                                                    fullWidth
                                                    label="تقرير زيارة مكتب هندسي معتمد"
                                                    name=""
                                                    onChange={handleChange}
                                                    value="test"
                                                    variant="outlined"
                                                    dir="rtl"
                                                    className="custom-field"
                                                    disabled
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                md={4}
                                                xs={12}
                                            >
                                                <TextField
                                                    fullWidth
                                                    label="الضمان المالي"
                                                    name=""
                                                    onChange={handleChange}
                                                    value="test"
                                                    variant="outlined"
                                                    dir="rtl"
                                                    className="custom-field"
                                                    disabled
                                                />
                                            </Grid>
                                        </Grid>

                                        {/* </Grid>
                 ))} */}
                                    </CardContent>
                                    <Divider />
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            p: 2
                                        }}
                                    >
                                        <Button
                                            color="primary"
                                            variant="contained"
                                        >
                                            حفظ المعلومات
                                        </Button>
                                    </Box>
                                </Card>
                            </Grid >
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};
CentersDetails.propTypes = {
    // centers: PropTypes.array.isRequired
};

export default CentersDetails;
