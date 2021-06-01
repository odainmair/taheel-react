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
  console.log("fromEdit", fromEdit)
  const [errMessage, setErrMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [forignForm, setForignForm] = useState(fromEdit ? true : false)
  const [SAForm, setSAForm] = useState(fromEdit ? true : false)
  var [managersCount, setManagersCount] = React.useState(0);

  // fromEdit ? true : false
  const [citizenInfo, setCitizenInfo] = useState(values ? { Name: { FirstName: values.fullName.split(" ")[0], LastName: values.fullName.split(" ")[1], }, staffTypes: values.staffTypes, Gender: values.gender, birthDate: values.birthDate, cv: values.cv, EducationalQualification: values.EducationalQualification, MedicalPractice: values.MedicalPractice } : {})

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
      console.log('response =>>>>>', response.responseBody.data.Body)

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
                name={fieldName === null ? "nationality" : `${fieldName}.nationality`}
                component={Radio} type="radio" value="سعودي" />}
            />
            <FormControlLabel
              label="غير سعودي"
              control={<Field
                name={fieldName === null ? "nationality" : `${fieldName}.nationality`}
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

          <Condition when="nationality" is='سعودي'>

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
                // name="idNumber"
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

            {SAForm &&
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
          <Condition when="nationality" is='غير سعودي'>
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
                // name="idNumber"
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
              < PersonForm fromEdit={fromEdit} isSaudi ={false} MedicalPracticeCondition={MedicalPracticeCondition} setField={setField} fieldName={fieldName} Condition={Condition} citizenInfo={citizenInfo} />
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
              values.cv = "";
              values.EducationalQualification = "";
              values.MedicalPractice = "";
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
              const { fullName, staffTypes, idNumber, gender, birthDate, iqamaNo, nationality, day, month, year, cv, EducationalQualification, MedicalPractice,sponsorName } = values;
              values.fullName = "";
              values.idNumber = "";
              values.iqamaNo = "";
              values.staffTypes = "";
              values.gender = "";
              // values.birthDate = "";
              values.nationality = "";
              values.day = "";
              values.month = "";
              values.year = "";
              values.cv = "";
              values.EducationalQualification = "";
              values.MedicalPractice = "";
              values.sponsorName = "";


              if (fieldName === null) {
                push("customers", { fullName: fullName, idNumber: idNumber, iqamaNo: iqamaNo, staffTypes: staffTypes, gender: gender, birthDate: birthDate, nationality: nationality, day: day, month: month, year: year, cv: cv, EducationalQualification: EducationalQualification, MedicalPractice: MedicalPractice, sponsorName: sponsorName });
              }
             
              setOpenPopup(false);
              setField('managersCount', values.managersCount++)
              console.log('--customers',values.customers)
              // if (values.customers) {
              //   var managersCount = values.customers.filter(customer => customer.staffTypes === "مدير").length
              //   setField('managersCount', managersCount)
              //   var teachersCount = values.customers.filter(customer => customer.staffTypes === "معلم تربية خاصة ").length
                
              //   setField('teachersCount',teachersCount)
              // }
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
