import { Field } from 'react-final-form';
import { TextField as TextFieldFinal, Select, Radio } from 'final-form-material-ui';
import PropTypes from 'prop-types';
import {
    Typography,
    MenuItem,
    Grid,
} from '@material-ui/core';


const Calendar = ({ FeiledWidth, fieldName  }) => {
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
            {/* <Grid
                container
                mt={4}
                spacing={1}
            > */}
                 {/* <Grid
              item
              md={6}
              xs={12}
            //   mx={50}
            > */}
              {/* <Typography> تاريخ الميلاد</Typography> */}
            {/* </Grid> */}
            <Grid
                item
                md={FeiledWidth}
                xs={FeiledWidth}
                className="custom-label-field"
            >
                <Field
                    fullWidth
                    label="اليوم*"
                    // name="day"
                    name={fieldName === null ? "day" : `${fieldName}.day`}
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
                md={FeiledWidth}
                xs={FeiledWidth}
                className="custom-label-field"
            >
                <Field
                    fullWidth
                    label="الشهر*"
                    // name="month"
                    name={fieldName === null ? "month" : `${fieldName}.month`}
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
                md={FeiledWidth}
                xs={FeiledWidth}
                className="custom-label-field"
            >
                <Field
                    fullWidth
                    label="السنة*"
                    // name="year"
                    name={fieldName === null ? "year" : `${fieldName}.year`}
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
            {/* </Grid> */}
        </>
    )
}


export default Calendar
Calendar.propTypes = {
    FeiledWidth: PropTypes.func.isRequired,
    fieldName : PropTypes.func.isRequired,
};
