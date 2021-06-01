/* eslint-disable */
import React, { useEffect, useState } from 'react';
import FileUploader from 'src/components/FileUploader';
import moment from 'moment-hijri';
import {
    Grid,
    MenuItem,
} from '@material-ui/core';
import { Field } from 'react-final-form';
import { TextField as TextFieldFinal, Select } from 'final-form-material-ui';
import { uploadDocument } from '../../services/finalLicenseUtil'
import { useContext } from 'react';
import localContext from 'src/localContext';

const PersonForm = ({ MedicalPracticeCondition, fieldName, setField, pop, push, values, Condition, citizenInfo }) => {
    console.log("citizenInfo", citizenInfo)
    const { documents, SetDocuments } = useContext(localContext);
    useEffect(() => {
        setField('fullName', `${citizenInfo.Name.FirstName} ${citizenInfo.Name.LastName}`)
        setField('gender', citizenInfo.Gender === 'F' ? 'انثى' : "ذكر")
        setField('birthDate', citizenInfo.BirthDateH)
        // moment(`${citizenInfo.BirthHijriDate}`, 'iYYYYiMMiDD').format('iDD/iMM/iYYYY')
        
    }, [])

    const setDocument = (name, docID, multiple) => {
        setField(name,[docID])
    }

    const staffTypes = ["معلم تربية خاصة", "أخصائي اجتماعي", "مراقب اجتماعي", "حارس", "عامل تنظيفات", "مشرف فني عام", "اخصائي نفسي و توجيه اجتماعي", "عامل رعاية شخصية", "مدير", "سائق", "مرافق سائق", "أخصائي علاج طبيعي", "أخصائي علاج وظيفي", "أخصائي نطق و تخاطب", "ممرض"]
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
                        disabled
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
                        disabled
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
                        handleFile={(file) => uploadDocument(setDocument, "cv", file)}
                        label="السيرة الذاتية"
                        name={fieldName === null ? "cv" : `${fieldName}.cv`}
                        multiple={false}
                    />
                </Grid>

                <Grid
                    item
                    md={6}
                    xs={12}
                >
                    <FileUploader
                        handleFile={(file) => uploadDocument(setDocument, "EducationalQualification", file)}
                        label="المؤهلات التعليمية"
                        name={fieldName === null ? "EducationalQualification" : `${fieldName}.EducationalQualification`}
                        multiple={false}
                    />
                </Grid>
                <MedicalPracticeCondition when={fieldName === null ? "staffTypes" : `${fieldName}.staffTypes`} is={['أخصائي علاج طبيعي', 'أخصائي علاج وظيفي', 'أخصائي نطق و تخاطب']}>
                    <Grid
                        item
                        md={6}
                        xs={12}
                    >
                        <FileUploader
                            handleFile={(file) => uploadDocument(setDocument, "MedicalPractice", file)}
                            label="رخصة المزاولة"
                            name={fieldName === null ? "MedicalPractice" : `${fieldName}.MedicalPractice`}
                            // name="FinancialGuarantee"
                            multiple={false}
                        />
                    </Grid>
                </MedicalPracticeCondition>
            </Grid>
        </>
    )
}

export default PersonForm
