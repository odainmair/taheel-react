/* eslint-disable */
import React, { useEffect, useState } from 'react';
import FileUploader from 'src/components/FileUploader';
import {
    Grid,
    MenuItem,
} from '@material-ui/core';
import { Field } from 'react-final-form';
import { TextField as TextFieldFinal, Select } from 'final-form-material-ui';

const PersonForm = ({StaffCondition, fieldName, setField, pop, push, values, Condition, citizenInfo }) => {
    console.log("citizenInfo",citizenInfo)
    useEffect(() => {
        setField('fullName',`${citizenInfo.Name.FirstName} ${citizenInfo.Name.LastName}` )
        setField('gender',citizenInfo.Gender === 'F' ? 'انثى' : "ذكر")
    },[])
   
    const staffTypes = ["معلم تربية خاصة ", "أخصائي اجتماعي", "مراقب اجتماعي", "حارس", "عامل تنظيفات", "مشرف فني عام", "اخصائي نفسي و توجيه اجتماعي", "عامل رعاية شخصية", "مدير", "سائق", "مرافق سائق", "أخصائي علاج طبيعي", "أخصائي علاج وظيفي", "أخصائي نطق و تخاطب", "ممرض"]
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
                className="custom-label-field"
            >
                <Field
                    fullWidth
                    required
                    label="الاسم الكامل"
                    name={fieldName === null ? "fullName" : `${fieldName}.fullName`}
                    component={TextFieldFinal}
                    type="text"
                    variant="outlined"
                    dir="rtl"
                    className="custom-field"
                />
            </Grid>

            <Grid
                item
                md={6}
                xs={12}
                className="custom-label-field"
            >
                <Field
                    fullWidth
                    required
                    label="الجنس"
                    name={fieldName === null ? "gender" : `${fieldName}.gender`}
                    component={TextFieldFinal}
                    type="text"
                    variant="outlined"
                    dir="rtl"
                    className="custom-field"
                />
            </Grid>

            <Grid
                item
                md={6}
                xs={12}
                className="custom-label-field"
            >
                <Field
                    fullWidth
                    required
                    label="نوع الكادر"
                    name={fieldName === null ? "staffTypes" : `${fieldName}.staffTypes`}
                    component={Select}
                    type="text"
                    variant="outlined"
                    dir="rtl"
                    className="custom-field"
                    formControlProps={{ fullWidth: true }}

                >
                    {staffTypes.map((staff, index) =>
                        <MenuItem key={index} value={staff}>{staff}</MenuItem>
                    )}

                </Field>
            </Grid>

            <Grid
                item
                md={6}
                xs={12}
            >
                <FileUploader
                    handleFile={(test) => console.log(test)}
                    label="السيرة الذاتية"
                    name="FinancialGuarantee"
                    multiple={false}
                />
            </Grid>

            <Grid
                item
                md={6}
                xs={12}
            >
                <FileUploader
                    handleFile={(test) => console.log(test)}
                    label="المؤهلات التعليمية"
                    name="FinancialGuarantee"
                    multiple={false}
                />
            </Grid>
            <StaffCondition when='staffTypes' is={['أخصائي علاج طبيعي', 'أخصائي علاج وظيفي', 'أخصائي نطق و تخاطب']}>
                <Grid
                    item
                    md={6}
                    xs={12}
                >
                    <FileUploader
                        handleFile={(test) => console.log(test)}
                        label="رخصة المزاولة"
                        name="FinancialGuarantee"
                        multiple={false}
                    />
                </Grid>
            </StaffCondition>
            </Grid>
        </>
    )
}

export default PersonForm
