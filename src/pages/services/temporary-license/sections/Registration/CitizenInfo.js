/* eslint-disable */
import { Field } from 'react-final-form';
import { TextField as TextFieldFinal, Select } from 'final-form-material-ui';
import {
  Box,
  Typography,
  MenuItem,
  Grid,
} from '@material-ui/core';

const CitizenInfo = () => {
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
          mt: 5,
          maxWidth: 'sm'
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
        {/* <Box
          sx={{ mt: 5 }}
        > */}
         <Typography
         sx={{ mt: 5 }}
         > تاريخ الميلاد</Typography>
         <Grid container spacing={10} justifyContent="center">

         
          <Grid item xs={4}>
            <Field
              // sx={{width: 100 }}
              fullWidth
              label="اليوم*"
              name="day"
              component={Select}
              required
              dir="rtl"
              className="custom-field"
              formControlProps={{ fullWidth: true }}
            >

              <MenuItem value="">
                <em>  </em>
              </MenuItem>
              {calendar.days.map((day, index) => <MenuItem key={index} value={day}>{day}</MenuItem>)}
            </Field>
          </Grid>

          <Grid item  xs={4}>
            <Field
              //  sx={{ width: 100 }}
              fullWidth
              label="الشهر*"
              name="month"
              component={Select}
              id="demo-simple-select-outlined"
              required
              dir="rtl"
              className="custom-field"
              formControlProps={{ fullWidth: true }}
            >

              <MenuItem value="">
                <em>  </em>
              </MenuItem>
              {calendar.months.map((month, index) => <MenuItem key={index} value={month}>{month}</MenuItem>)}
            </Field>
          </Grid>

          <Grid item xs={4}>
            <Field
              //  sx={{width: 100}}
              // fullWidth
              label="السنة*"
              name="year"
              component={Select}
              required
              dir="rtl"
              className="custom-field"
              formControlProps={{ fullWidth: true }}
            >
              <MenuItem value="">
                <em>  </em>
              </MenuItem>
              {calendar.years.map((year, index) => <MenuItem key={index} value={year}>{year}</MenuItem>)}
            </Field>
          </Grid>
        </Grid>
      </Box>
      {/* </Box> */}
    </>
  );
};

export default CitizenInfo;
