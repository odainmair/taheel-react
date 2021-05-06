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
      <Grid
        container
        spacing={0}
        mt={6}
      >
        <Grid
          item
          md={12}
          xs={12}
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
        </Grid>

        <Grid
          container
          spacing={3}
          mt={2}
        >
          <Grid
            item
            md={12}
            xs={12}
          >
            <Typography> تاريخ الميلاد</Typography>
          </Grid>

          <Grid
            item
            md={4}
            xs={4}
            className="custom-label-field"
          >
            <Field
              fullWidth
              label="اليوم*"
              name="day"
              component={Select}
              required
              dir="rtl"
              className="custom-field"
              variant="outlined"
              formControlProps={{ fullWidth: true }}
            >
              {calendar.days.map((day, index) => <MenuItem key={index} value={day}>{day}</MenuItem>)}
            </Field>
          </Grid>
          <Grid
            item
            md={4}
            xs={4}
            className="custom-label-field"
          >
            <Field
              fullWidth
              label="الشهر*"
              name="month"
              component={Select}
              id="demo-simple-select-outlined"
              required
              dir="rtl"
              className="custom-field"
              variant="outlined"
              formControlProps={{ fullWidth: true }}
            >
              {calendar.months.map((month, index) => <MenuItem key={index} value={month}>{month}</MenuItem>)}
            </Field>
          </Grid>
          <Grid
            item
            md={4}
            xs={4}
            className="custom-label-field"
          >
            <Field
              fullWidth
              label="السنة*"
              name="year"
              component={Select}
              required
              dir="rtl"
              className="custom-field"
              variant="outlined"
              formControlProps={{ fullWidth: true }}
            >
              {calendar.years.map((year, index) => <MenuItem key={index} value={year}>{year}</MenuItem>)}
            </Field>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default CitizenInfo;
