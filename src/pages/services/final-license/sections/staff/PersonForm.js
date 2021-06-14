/* eslint-disable */
import React, { useEffect, useState } from 'react';
import FileUploader from 'src/components/FileUploader';
import {
  Grid,
  MenuItem,
} from '@material-ui/core';
import { Field } from 'react-final-form';
import { TextField as TextFieldFinal, Select } from 'final-form-material-ui';
import FileUploaderComp from '../../components/FileUploader';
import { useContext } from 'react';
import localContext from 'src/localContext';

const PersonForm = ({ fromEdit, isSaudi, MedicalPracticeCondition, fieldName, setField, pop, push, values, Condition, citizenInfo,rowIndex}) => {

  const { documents, SetDocuments } = useContext(localContext);
  useEffect(() => {
    console.log(`-- PersonForm rowIndex ${rowIndex}`);
    setField('fullName', `${citizenInfo.name.firstName} ${citizenInfo.name.forthName}`);
    setField('gender', citizenInfo.gender === 'F' ? 'انثى' : "ذكر")
    setField('birthDate',citizenInfo.birthDate );
    setField('nationality', isSaudi || fromEdit ? 'سعودي' : 'غير سعودي');

    if (!isSaudi) {
      setField('sponsorName', citizenInfo.sponsorName)
    }
  }, [])

  const setDocument = (name, docID, multiple) => {
    if (!multiple)
      setField(name, [docID])
    else {
      multipleDocs.push(docID)
      setField(name, multipleDocs)
    }
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

        {!isSaudi &&
          <Grid
            item
            md={6}
            xs={12}
            className="custom-label-field"
          >
            <Field
              fullWidth
              required
              label="اسم الكفيل"
              disabled
              name={fieldName === null ? "sponsorName" : `${fieldName}.sponsorName`}
              component={TextFieldFinal}
              type="text"
              variant="outlined"
              dir="rtl"
              className="custom-field"
            />
          </Grid>
        }
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
          <Field
            label="السيرة الذاتية"
            name={fieldName === null ? "cv" : `${fieldName}.cv`}
            component={FileUploaderComp}
            inputType={false}
            setField={setField}
            values={values}
            rowIndex={rowIndex}
          />
        </Grid>

        <Grid
          item
          md={6}
          xs={12}
        >
          <Field
            label="المؤهلات التعليمية"
            name={fieldName === null ? "EducationalQualification" : `${fieldName}.EducationalQualification`}
            component={FileUploaderComp}
            inputType={false}
            setField={setField}
            setDocument={setDocument}
            values={values}
            rowIndex={rowIndex}
          />
        </Grid>

        <MedicalPracticeCondition when={fieldName === null ? "staffTypes" : `${fieldName}.staffTypes`} is={['أخصائي علاج طبيعي', 'أخصائي علاج وظيفي', 'أخصائي نطق و تخاطب']}>
          <Grid
            item
            md={6}
            xs={12}
          >
            <Field
              label="رخصة المزاولة"
              name={fieldName === null ? "MedicalPractice" : `${fieldName}.MedicalPractice`}
              component={FileUploaderComp}
              inputType={false}
              setField={setField}
              setDocument={setDocument}
              values={values}
              rowIndex={rowIndex}
            />
          </Grid>
        </MedicalPracticeCondition>
      </Grid>
    </>
  )
}

export default PersonForm