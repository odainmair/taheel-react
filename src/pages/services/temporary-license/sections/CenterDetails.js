/* eslint-disable no-unused-vars */
import {
  Grid,
  RadioGroup,
  MenuItem,
  FormLabel,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from '@material-ui/core';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';
import { Radio, TextField as TextFieldFinal, Select } from 'final-form-material-ui';

const CenterDetails = ({ Condition }) => (
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
      >
        <Field
          fullWidth
          required
          label="اسم المركز"
          name="centerName"
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
          label="نوع المركز*"
          name="centerType"
          component={Select}
          required
          dir="rtl"
          variant="outlined"
          className="custom-field"
          formControlProps={{ fullWidth: true }}
        >
          <MenuItem value="1">الرعاية النهارية</MenuItem>
        </Field>
      </Grid>
      <Grid
        item
        md={6}
        xs={12}
        className="custom-label-field"
      >
        <Field
          fullWidth
          label="اختصاص المركز*"
          name="specialCenterType"
          component={Select}
          required
          dir="rtl"
          variant="outlined"
          className="custom-field"
          formControlProps={{ fullWidth: true }}
        >
          <MenuItem value="1">مركز تأهيل الاشخاص ذوي الاعاقات المتعددة</MenuItem>
          <MenuItem value="2">مراكز تأهيل الاشخاص ذوي الإعاقة العقلية والإعاقات الحركية</MenuItem>
          <MenuItem value="3">مركز تأهيل الاشخاص ذوي الإعاقة والحسية</MenuItem>
          <MenuItem value="4">مراكز تاهيل الاشخاص ذوي الاعاقة متوسط وشديدي الإعاقة </MenuItem>
        </Field>
      </Grid>
      <Grid
        item
        md={6}
        xs={12}
      >
        <Field
          fullWidth
          required
          label="الطاقة الاستعابية المحتملة"
          name="centerCap"
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
        <Field name="workingHours">
          {({ input, meta }) => ( // eslint-disable-line no-unused-vars
            <FormControl component="fieldset" error={meta.error} required>
              <FormLabel component="legend">فترة العمل</FormLabel>
              <RadioGroup row>
                <FormControlLabel
                  label="القترة الصباحية"
                  control={<Field name="workingHours" component={Radio} type="radio" value="1" />}

                />
                <FormControlLabel
                  label="الفترة المسائية"
                  control={<Field name="workingHours" component={Radio} type="radio" value="2" />}

                />
                <FormControlLabel
                  label="فترتين"
                  control={<Field name="workingHours" component={Radio} type="radio" value="3" />}
                />
              </RadioGroup>
              {meta.error && meta.touched && <FormHelperText dir="rtl">{meta.error}</FormHelperText>}
            </FormControl>
          )}
        </Field>
      </Grid>
      <Grid
        item
        md={6}
        xs={12}
      >
        <Field name="targetedGender">
          {({ input, meta }) => ( // eslint-disable-line no-unused-vars
            <FormControl component="fieldset" error={meta.error} required>
              <FormLabel component="legend">الفئة العمرية للمستفدين</FormLabel>
              <RadioGroup row>
                <FormControlLabel
                  label="سنتين - ١٢سنة"
                  control={<Field name="targetedGender" component={Radio} type="radio" value="1" />}

                />
                <FormControlLabel
                  label="١٣سنة - ١٨سنة"
                  control={<Field name="targetedGender" component={Radio} type="radio" value="2" />}

                />
                <FormControlLabel
                  label="١٩سنة -٤٥سنة"
                  control={<Field name="targetedGender" component={Radio} type="radio" value="3" />}
                />
              </RadioGroup>
              {meta.error && meta.touched && <FormHelperText dir="rtl">{meta.error}</FormHelperText>}
            </FormControl>
          )}
        </Field>
      </Grid>
      <Grid
        item
        md={6}
        xs={12}
      >
        <Field name="ageGroup">
          {({ input, meta }) => ( // eslint-disable-line no-unused-vars
            <FormControl component="fieldset" error={meta.error} required>
              <FormLabel component="legend">جنس المستفدين</FormLabel>
              <RadioGroup row>
                <FormControlLabel
                  label="ذكر"
                  control={<Field name="ageGroup" component={Radio} type="radio" value="1" />}

                />
                <FormControlLabel
                  label="انثى"
                  control={<Field name="ageGroup" component={Radio} type="radio" value="2" />}

                />
                <FormControlLabel
                  label="كلا الجنسين"
                  control={<Field name="ageGroup" component={Radio} type="radio" value="3" />}
                />
              </RadioGroup>
              {meta.error && meta.touched && <FormHelperText dir="rtl">{meta.error}</FormHelperText>}
            </FormControl>
          )}
        </Field>
      </Grid>
    </Grid>
  </>
);

export default CenterDetails;

CenterDetails.propTypes = {
  Condition: PropTypes.func.isRequired,
};
