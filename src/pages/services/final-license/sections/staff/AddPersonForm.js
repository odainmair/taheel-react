/* eslint-disable */
import React, { useState } from 'react';
import {
  Button,
  Grid,
  FormControlLabel,
  RadioGroup,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from '@material-ui/core';
import { Field } from 'react-final-form';
import { TextField as TextFieldFinal, Radio } from 'final-form-material-ui';
import Calendar from 'src/components/calendar';
import { validateCitizenFunc } from '../../services/finalLicenseAPI'
import PersonForm from './PersonForm'

const AddPersonForm = ({ fromEdit, MedicalPracticeCondition, setField, pop, push, values, setOpenPopup, fieldName, Condition }) => {
  const [errMessage, setErrMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [forignForm, setForignForm] = useState(fromEdit ? true : false)
  const [SAForm, setSAForm] = useState(fromEdit ? true : false)
  const [citizenInfo, setCitizenInfo] = useState(values ? { Name: { FirstName: values.fullName.split(" ")[0], LastName: values.fullName.split(" ")[1], }, staffTypes: values.staffTypes, Gender: values.gender, birthDate: values.birthDate, cv: values.cv, cvAtt: values.cvAtt, EducationalQualification: values.EducationalQualification,  MedicalPractice: values.MedicalPractice,  EducationalQualificationAtt: values.EducationalQualificationAtt,  MedicalPracticeAtt: values.MedicalPracticeAtt, sponsorName: values.sponsorName } : {})

  const CitizenValidate_SA = async () => {

    setLoading(true)
    function numberToDay(day) {
      return ('0' + day).slice(-2);
    }
    const birthDate = values.year + '' + numberToDay(values.month) + numberToDay(values.day);
    const response = await validateCitizenFunc(values.idNumber, birthDate)
    if (!response.isSuccessful)
      setErrMessage(response.message)
    else {
      setCitizenInfo(response.responseBody.data.Body)
      setSAForm(true)
    }
    setLoading(false)
  }

  const CitizenValidate_Forign = async () => {
    setLoading(true)
    const response = await validateCitizenFunc(values.iqamaNo)
    if (!response.isSuccessful)
      setErrMessage(response.message)
    else {
      setCitizenInfo(response.responseBody.data.Body)
      setForignForm(true)
      setErrMessage('')
    }
    setLoading(false)
  }
  return (
    <>
      <Grid
        container
        mt={4}
        spacing={3}
      >
        <Grid
          item
          md={12}
          xs={12}
          className="custom-label-field"
        >
          {errMessage && (
            <Box >
              <Alert severity="error">
                {errMessage}
              </Alert>
            </Box>
          )}
        </Grid>

        <Grid
          item
          md={6}
          xs={12}
          className="custom-label-field"
        >
          <Typography> الجنسية</Typography>
          <RadioGroup row >
            <FormControlLabel
              label="سعودي"
              control={<Field
                name={fieldName === null ? "nationalityBtn" : `${fieldName}.nationalityBtn`}
                component={Radio} type="radio" value="سعودي" />}
            />
            <FormControlLabel
              label="غير سعودي"
              control={<Field
                name={fieldName === null ? "nationalityBtn" : `${fieldName}.nationalityBtn`}
                component={Radio} type="radio" value="غير سعودي" />}
            />
          </RadioGroup>
        </Grid>
        <Grid
          container
          mt={4}
          spacing={1}
          className="custom-label-field"
        >

          <Condition when="nationalityBtn" is='سعودي'>

            <Grid
              item
              md={6}
              xs={12}
              className="custom-label-field"
            >
              <Field
                fullWidth
                required
                label="رقم الهوية "
                name={fieldName === null ? "idNumber" : `${fieldName}.idNumber`}
                component={TextFieldFinal}
                type="text"
                variant="outlined"
                dir="rtl"
                className="custom-field"
              />
            </Grid>

            < Calendar FeiledWidth={2} fieldName={fieldName} />

            <Grid
              item
              md={6}
              xs={12}
            >
              <Button
                startIcon={loading ? <CircularProgress size="1rem" /> : null}
                variant='outlined'
                type="button"
                sx={{
                  height: 55,
                  backgroundColor: 'white',
                  width: '100%',
                  color: '#3c8084',
                  ':hover': {
                    backgroundColor: '#3c8084',
                    color: 'white',
                  }
                }}
                onClick={CitizenValidate_SA}
              >
                تحقق
				</Button>
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
              className="custom-label-field"
            >
            </Grid>

            {SAForm  &&
              < PersonForm fromEdit={fromEdit} isSaudi ={true} MedicalPracticeCondition={MedicalPracticeCondition} setField={setField} fieldName={fieldName} Condition={Condition} citizenInfo={citizenInfo} />
            }

          </Condition>
        </Grid>
        <Grid
          container
          mt={4}
          spacing={1}
          className="custom-label-field"
        >
          <Condition when="nationalityBtn" is='غير سعودي'>
            <Grid
              item
              md={6}
              xs={12}
              className="custom-label-field"
            >
              <Field
                fullWidth
                required
                label="رقم الإقامة "
                name={fieldName === null ? "iqamaNo" : `${fieldName}.iqamaNo`}
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
            >
              <Button
                startIcon={loading ? <CircularProgress size="1rem" /> : null}
                variant='outlined'
                type="button"
                sx={{
                  height: 55,
                  backgroundColor: 'white',
                  width: '100%',
                  color: '#3c8084',
                  ':hover': {
                    backgroundColor: '#3c8084',
                    color: 'white',
                  }
                }}
                onClick={CitizenValidate_Forign}
              >
                تحقق
				</Button>
            </Grid>
            {forignForm &&
              < PersonForm values={values}fromEdit={fromEdit} isSaudi ={false} MedicalPracticeCondition={MedicalPracticeCondition} setField={setField} fieldName={fieldName} Condition={Condition} citizenInfo={citizenInfo} />
            }
          </Condition>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2} mt={3} justifyContent="flex-end"
      >
        <Grid
          item
          md={3}
        >
          <Button
            style={{
              width: "100%",
              height: "3.4375em",
              backgroundColor: '#E2E8EB',
              color: '#000',
            }}
            variant='contained'
            onClick={() => {
              values.fullName = "";
              values.idNumber = "";
              values.iqamaNo = ""
              values.staffTypes = "";
              values.gender = "";
              values.birthDate = "";
              values.nationality = "";
              values.nationalityBtn = "";
              values.cv = "";
              values.cvAtt = "";
              values.EducationalQualification = "";
              values.MedicalPractice = "";
              values.EducationalQualificationAtt = "";
              values.MedicalPracticeAtt = "";
              values.sponsorName = "";
              setOpenPopup(false);
            }}
          >
            الغاء
        </Button>
        </Grid>

        <Grid
          item
          md={3}
        >
          <Button
            style={{
              width: "100%",
              height: "3.4375em"
            }}
            variant='contained'
            color="primary"
            onClick={() => {
              const { fullName, staffTypes, idNumber, gender, birthDate, iqamaNo, nationality,nationalityBtn, day, month, year, cv, cvAtt, EducationalQualification, MedicalPractice, EducationalQualificationAtt, MedicalPracticeAtt,sponsorName } = values;
              values.fullName = "";
              values.idNumber = "";
              values.iqamaNo = "";
              values.staffTypes = "";
              values.gender = "";
              values.nationality = "";
              values.nationalityBtn = "";
              values.day = "";
              values.month = "";
              values.year = "";
              values.cv = "";
              values.cvAtt = "";
              values.EducationalQualification = "";
              values.MedicalPractice = "";
              values.EducationalQualificationAtt = "";
              values.MedicalPracticeAtt = "";
              values.sponsorName = "";

            
              if (fieldName === null) {
                push("customers", { fullName: fullName, idNumber: idNumber, iqamaNo: iqamaNo, staffTypes: staffTypes, gender: gender, birthDate: birthDate, nationality: nationality, day: day, month: month, year: year,  sponsorName: sponsorName, cv: cv, cvAtt: cvAtt, EducationalQualification: EducationalQualification, MedicalPractice: MedicalPractice,  EducationalQualificationAtt: EducationalQualificationAtt, MedicalPracticeAtt: MedicalPracticeAtt });
              } 

              setOpenPopup(false);
           
            }}
          >
            اضافة
        </Button>
        </Grid>


      </Grid>
    </>
  )
}
export default AddPersonForm