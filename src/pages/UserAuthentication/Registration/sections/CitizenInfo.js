/* eslint-disable */
import { Field } from 'react-final-form';
import { TextField as TextFieldFinal, Radio } from 'final-form-material-ui';
import {
  Typography,
  Grid,
  FormControlLabel,
  RadioGroup,
  FormControl,
  FormLabel,
  FormHelperText,
} from '@material-ui/core';

import Calendar from 'src/components/calendar'

const CitizenInfo = ({ Condition }) => {

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
          <Field name="nationality" >
            {({ input, meta }) => {
              const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched; return ( // eslint-disable-line no-unused-vars
                <FormControl component="fieldset" error={showError ? meta.error || meta.submitError : undefined} required>
                  <FormLabel component="legend">الجنسية</FormLabel>
                  <RadioGroup row>
                    <FormControlLabel
                      label="سعودي"
                      control={<Field name="nationality" component={Radio} type="radio" value="SA" />}
                    />
                    <FormControlLabel
                      label="غير سعودي"
                      control={<Field name="nationality" component={Radio} type="radio" value="forign" />}
                    />
                  </RadioGroup>
                  {showError && <FormHelperText dir="rtl">{showError ? meta.error || meta.submitError : undefined}</FormHelperText>}
                </FormControl>
              )
            }}
          </Field>
        </Grid>
        <Condition when="nationality" is='SA'>
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
              <Field
                fullWidth
                required
                label="رقم الهوية "
                name="idNumber"
                component={TextFieldFinal}
                type="text"
                variant="outlined"
                dir="rtl"
                className="custom-field"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <Typography> تاريخ الميلاد</Typography>
            </Grid>
            < Calendar FeiledWidth={4} fieldName={null} />

          </Grid>
        </Condition>
        <Condition when="nationality" is='forign'>
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
              <Field
                fullWidth
                required
                label="رقم الإقامة "
                name="idNumber"
                component={TextFieldFinal}
                type="text"
                variant="outlined"
                dir="rtl"
                className="custom-field"
              />
            </Grid>
          </Grid>
        </Condition>
      </Grid>
    </>
  );
};

export default CitizenInfo;
