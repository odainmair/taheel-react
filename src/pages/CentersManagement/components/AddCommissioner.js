import React from 'react';
import { Helmet } from 'react-helmet';
import { Field } from 'react-final-form';
import { TextField as TextFieldFinal } from 'final-form-material-ui';
import {
    Box,
    Grid,
    Divider,
    CardContent,
    CardHeader,
    Card,
    Container,
} from '@material-ui/core';

const AddCommissioner = (props) => {

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
                                        title="اضافة مفوض" 
                                    />
                                    <Divider />
                                    <CardContent>
                                        <Grid
                                            container
                                            spacing={3}
                                        >
                                           <Grid
                                                item
                                                md={6}
                                                xs={12}
                                            >
                                                <Field
                                                    fullWidth
                                                    required
                                                    label="الاسم"
                                                    name="name"
                                                    component={TextFieldFinal}
                                                    type="input"
                                                    variant="outlined"
                                                    dir="rtl"
                                                    className="custom-field"
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                md={6}
                                                xs={12}
                                            >
                                                <Field
                                                    fullWidth
                                                    required
                                                    label="رقم الهوية / الاقامة"
                                                    name="id"
                                                    component={TextFieldFinal}
                                                    type="email"
                                                    variant="outlined"
                                                    dir="rtl"
                                                    className="custom-field"
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                md={6}
                                                xs={12}
                                            >
                                                <Field
                                                    fullWidth
                                                    required
                                                    label="المسمى الوظيفي"
                                                    name="position"
                                                    component={TextFieldFinal}
                                                    type="input"
                                                    variant="outlined"
                                                    dir="rtl"
                                                    className="custom-field"
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                md={6}
                                                xs={12}
                                            >
                                                <Field
                                                    fullWidth
                                                    required
                                                    label="رقم الجوال"
                                                    name="phoneNumber"
                                                    component={TextFieldFinal}
                                                    type="input"
                                                    variant="outlined"
                                                    dir="rtl"
                                                    className="custom-field"
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                md={6}
                                                xs={12}
                                            >
                                                <Field
                                                    fullWidth
                                                    required
                                                    label="البربد الالكتروني"
                                                    name="email"
                                                    component={TextFieldFinal}
                                                    type="email"
                                                    variant="outlined"
                                                    dir="rtl"
                                                    className="custom-field"
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                md={6}
                                                xs={12}
                                            >
                                                <Field
                                                    fullWidth
                                                    required
                                                    label="كلمة المرور"
                                                    name="password"
                                                    component={TextFieldFinal}
                                                    type="password"
                                                    variant="outlined"
                                                    dir="rtl"
                                                    className="custom-field"
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                md={6}
                                                xs={12}
                                            >
                                                <Field
                                                    fullWidth
                                                    required
                                                    label="تأكيد كلمة المرور"
                                                    name="confirmPassword"
                                                    component={TextFieldFinal}
                                                    type="password"
                                                    variant="outlined"
                                                    dir="rtl"
                                                    className="custom-field"
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                md={6}
                                                xs={12}
                                            >
                                                <Field
                                                    fullWidth
                                                    required
                                                    label="الصلاحيات"
                                                    name="permission"
                                                    component={TextFieldFinal}
                                                    type="input"
                                                    variant="outlined"
                                                    dir="rtl"
                                                    className="custom-field"
                                                />
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid >
                        </Grid>
                    </Grid>
                </Container>
            </Box>

        </>
    )

}

export default AddCommissioner;