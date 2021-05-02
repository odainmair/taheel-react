/* eslint-disable */
import { Helmet } from 'react-helmet';
// import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { Field } from 'react-final-form';
import { TextField as TextFieldFinal, Select } from 'final-form-material-ui';
import PropTypes from 'prop-types';
import {
  Box,
  Container,
  TextField,
  Typography,
  MenuItem,
  // Select,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
    minWidth: 300,
    marginLeft: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CitizenInfo = () => {
  const classes = useStyles();
  const calendar = {
    days: [],
    months: [],
    years: []
  };

  const BirthdayDate = (type, start, end) => {
    for (let i = start; i <= end; i++) {
      type.push(i);
    }
  };
  BirthdayDate(calendar.days, 1, 30);
  BirthdayDate(calendar.months, 1, 12);
  BirthdayDate(calendar.years, 1324, 1500);

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          mt:5,
          maxWidth:"sm"
        }}
      >
        <Field
          fullWidth
          required
          label="رقم الهوية/الإقامة "
          name="idNumber"
          component={TextFieldFinal}
          type="text"
          variant="outlined"
          dir="rtl"
          className="custom-field"
        />
        <Box
          sx={{ mt: 5 }}
        >
          <Typography> تاريخ الميلاد</Typography>

          <Field
            sx={{ ml: 3, width: 100 }}
            fullWidth
            label="اليوم*"
            name="day"
            component={Select}
            // labelId="demo-simple-select-outlined-label"
            // id="demo-simple-select-outlined"
            required
            dir="rtl"
            className="custom-field"
          // formControlProps={{ fullWidth: true }}
          >
            <MenuItem value="">
              <em>  </em>
            </MenuItem>
            {calendar.days.map((day) => <MenuItem value={day}>{day}</MenuItem>)}
          </Field>

          <Field
            sx={{ ml: 5, width: 100 }}
            fullWidth
            label="الشهر*"
            name="month"
            component={Select}
            // labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            required
            dir="rtl"
            className="custom-field"
          // formControlProps={{ fullWidth: true }}
          >
            <MenuItem value="">
              <em>  </em>
            </MenuItem>
            {calendar.months.map((month) => <MenuItem value={month}>{month}</MenuItem>)}
          </Field>


          <Field
            sx={{ ml: 5, width: 100 }}
            fullWidth
            label="السنة*"
            name="year"
            component={Select}
            // labelId="demo-simple-select-outlined-label"
            // id="demo-simple-select-outlined"
            required
            dir="rtl"
            className="custom-field"
          // formControlProps={{ fullWidth: true }}
          >
            <MenuItem value="">
              <em>  </em>
            </MenuItem>
            {calendar.years.map((year) => <MenuItem value={year}>{year}</MenuItem>)}
          </Field>
        </Box>


        {/* <Container maxWidth="sm">
          <Formik
            initialValues={{
              id: '',
              policy: false
            }}
            validationSchema={
              Yup.object().shape({
                id: Yup.string().length(10, 'رقم الهوية / الإقامة يجب ان تحتوي فقط على ارقام والا يزيد عددها عن 10 رقم').required('يجب تعبئة الحقل'),
              })
            }
            onSubmit={() => {
              var data ={
                id: valy
              }
            }}
          >
            {({
              errors,
              handleBlur,
              handleSubmit,
              touched,
              handleChange,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  error={Boolean(touched.id && errors.id)}
                  fullWidth
                  helperText={touched.id && errors.id}
                  label="رقم الهوية/الإقامة "
                  margin="normal"
                  name="id"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.id}
                  variant="outlined"
                />

                <Box
                  sx={{ mt: 5 }}
                >
                  <Typography> تاريخ الميلاد</Typography>
                  <FormControl required  sx={{ ml: 5, width: 100 }} variant="outlined" className={classes.formControl} formControlProps={{ fullWidth: true }}>
                    <InputLabel id="demo-simple-select-outlined-label">اليوم</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      onChange={handleChange}
                      label="Day"
                    >
                      <MenuItem value="">
                        <em>  </em>
                      </MenuItem>
                      {calendar.days.map((day) => <MenuItem value={day}>{day}</MenuItem>)}
                    </Select>
                  </FormControl>

                  <FormControl sx={{ ml: 5, width: 100 }} variant="outlined" className={classes.formControl} formControlProps={{ fullWidth: true }}>
                    <InputLabel id="demo-simple-select-outlined-label">الشهر</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      onChange={handleChange}
                      label="Month"
                    >
                      <MenuItem value="">
                        <em> </em>
                      </MenuItem>
                      {calendar.months.map((month) => <MenuItem value={month}>{month}</MenuItem>)}
                    </Select>
                  </FormControl>

                  <FormControl sx={{ ml: 5, width: 100 }} variant="outlined" className={classes.formControl} formControlProps={{ fullWidth: true }}>
                    <InputLabel id="demo-simple-select-outlined-label">السنة</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      onChange={handleChange}
                      label="Year"
                    >
                      <MenuItem value="">
                        <em> </em>
                      </MenuItem>
                      {calendar.years.map((year) => <MenuItem value={year}>{year}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Box>
              </form>
            )}
          </Formik>
        </Container> */}
      </Box>
    </>
  );
};

export default CitizenInfo;
