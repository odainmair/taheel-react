/* eslint-disable */
import { Field } from 'react-final-form';
import { TextField as TextFieldFinal, Select } from 'final-form-material-ui';
import { OnChange } from 'react-final-form-listeners';
import React from 'react';
import {
    Grid,
    MenuItem,
    Typography,
    FormControlLabel,
    Checkbox,
    FormControl,
} from '@material-ui/core';

const CommissionerDetails = ({ staffIds, setIsDisable, loading, lookupObject }) => {
    return (
        <Grid
            container
            spacing={3}
        >
            <Grid
                item
                md={12}
                xs={12}
            >
                <Field
                    fullWidth
                    label="رقم الكادر "
                    name="staffId"
                    component={Select}
                    required
                    dir="rtl"
                    variant="outlined"
                    className="custom-field"
                    formControlProps={{ fullWidth: true }}
                >
                    {staffIds.map((member, index) => <MenuItem key={index} value={member.id}>{member.id}</MenuItem>)}
                </Field>
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
                <OnChange name="email">
                    {(value, previous) => {
                        setIsDisable(true);
                    }}
                </OnChange>
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
                    name="jobTitle"
                    component={TextFieldFinal}
                    type="text"
                    variant="outlined"
                    dir="rtl"
                    className="custom-field"
                />

                <OnChange name="jobTitle">
                    {(value, previous) => {
                        setIsDisable(true);
                    }}
                </OnChange>
            </Grid>
            <Grid
                item
                md={12}
                xs={12}
            >
                <Grid
                    item
                    md={12}
                    sm={12}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                    xs={12}
                >
                    <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="h6"
                    >
                        الأذونات
                    </Typography>
                    <Field name="permissions" mt={3}>
                        {({ meta }) => ( // eslint-disable-line no-unused-vars
                            <FormControl component="fieldset" error={meta.error} required>
                                <FormControlLabel
                                    control={
                                        <Field
                                            name="permissions"
                                            component={Checkbox}
                                            type="checkbox"
                                            value='1'
                                            onClick={() => {
                                                // setField("agree", '2' ? [] : [true]);
                                                // setIsAgree(true)
                                            }}
                                        />
                                    } label="إضافة مستفيدين في المركز"
                                />
                                <FormControlLabel
                                    control={
                                        <Field
                                            name="permissions"
                                            component={Checkbox}
                                            type="checkbox"
                                            value='2'
                                            onClick={() => {
                                                // setField("agree", '2' ? [] : [true]);
                                                // setIsAgree(true)
                                            }}
                                        />
                                    }
                                    label="إصدار تراخيص مؤقتة"
                                />
                                <FormControlLabel
                                    control={
                                        <Field
                                            name="permissions"
                                            component={Checkbox}
                                            type="checkbox"
                                            value='3'
                                            onClick={() => {
                                                // setField("agree", '2' ? [] : [true]);
                                                // setIsAgree(true)
                                            }}
                                        />
                                    }
                                    label="إصدار تراخيص نهائية"
                                />
                                <FormControlLabel
                                    control={
                                        <Field
                                            name="permissions"
                                            component={Checkbox}
                                            type="checkbox"
                                            value='4'
                                            onClick={() => {
                                                // setField("agree", '2' ? [] : [true]);
                                                // setIsAgree(true)
                                            }}
                                        />
                                    }
                                    label="تعديل بيانات مستفيدين في المركز"
                                />
                                <FormControlLabel
                                    control={
                                        <Field
                                            name="permissions"
                                            component={Checkbox}
                                            type="checkbox"
                                            value='5'
                                            onClick={() => {
                                                // setField("agree", '2' ? [] : [true]);
                                                // setIsAgree(true)
                                            }}
                                        />
                                    }
                                    label="إضافة المركز في برنامج تحمل الدولة للرسوم"
                                />
                                <FormControlLabel
                                    control={
                                        <Field
                                            name="permissions"
                                            component={Checkbox}
                                            type="checkbox"
                                            value='6'
                                            onClick={() => {
                                                // setField("agree", '2' ? [] : [true]);
                                                // setIsAgree(true)
                                            }}
                                        />
                                    }
                                    label="إزالة مركز من برنامج تحمل الدولة للرسوم"
                                />
                            </FormControl>
                        )}

                    </Field>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CommissionerDetails;