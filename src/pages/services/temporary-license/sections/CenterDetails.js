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
          <MenuItem value="01">الرعاية النهارية</MenuItem>
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
          <MenuItem value="01">مركز تأهيل الاشخاص ذوي الاعاقات المتعددة</MenuItem>
          <MenuItem value="02">مراكز تأهيل الاشخاص ذوي الإعاقة العقلية والإعاقات الحركية</MenuItem>
          <MenuItem value="03">مركز تأهيل الاشخاص ذوي الإعاقة والحسية</MenuItem>
          <MenuItem value="04">مراكز تاهيل الاشخاص ذوي الاعاقة متوسط وشديدي الإعاقة </MenuItem>
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
        <Field name="workingHours" >
          {({ input, meta }) => {const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched; return ( // eslint-disable-line no-unused-vars

            <FormControl component="fieldset" error={showError ? meta.error || meta.submitError : undefined} required>
              <FormLabel component="legend">فترة العمل</FormLabel>
              <RadioGroup row>
                <FormControlLabel
                  label="الفترة الصباحية"
                  control={<Field name="workingHours" component={Radio} type="radio" value="morning" />}

                />
                <FormControlLabel
                  label="الفترة المسائية"
                  control={<Field name="workingHours" component={Radio} type="radio" value="evening" />}

                />
                <FormControlLabel
                  label="فترتين"
                  control={<Field name="workingHours" component={Radio} type="radio" value="both" />}
                />
              </RadioGroup>
              {showError && <FormHelperText dir="rtl">{showError ? meta.error || meta.submitError : undefined}</FormHelperText>}
            </FormControl>
          )}}
        </Field>
      </Grid>
      <Grid
        item
        md={6}
        xs={12}
      >
        <Field name="ageGroup">
        {({ input, meta }) => {const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched; return ( // eslint-disable-line no-unused-vars
            <FormControl component="fieldset" error={showError ? meta.error || meta.submitError : undefined} required>
              <FormLabel component="legend">{console.log(JSON.stringify(meta))}الفئة العمرية للمستفدين</FormLabel>
              <RadioGroup row>
                <FormControlLabel
                  label="سنتين - ١٢سنة"
                  control={<Field name="ageGroup" component={Radio} type="radio" value="2-12" />}

                />
                <FormControlLabel
                  label="١٣سنة - ١٨سنة"
                  control={<Field name="ageGroup" component={Radio} type="radio" value="13-18" />}

                />
                <FormControlLabel
                  label="١٩سنة -٤٥سنة"
                  control={<Field name="ageGroup" component={Radio} type="radio" value="19-45" />}
                />
              </RadioGroup>
              {showError && <FormHelperText dir="rtl">{showError ? meta.error || meta.submitError : undefined}</FormHelperText>}
            </FormControl>
          )}}
        </Field>
      </Grid>
      <Grid
        item
        md={6}
        xs={12}
      >
        <Field name="targetedGender">
        {({ input, meta }) => {const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched; return ( // eslint-disable-line no-unused-vars
            <FormControl component="fieldset" error={showError ? meta.error || meta.submitError : undefined}  required>
              <FormLabel component="legend">جنس المستفدين</FormLabel>
              <RadioGroup row>
                <FormControlLabel
                  label="ذكر"
                  control={<Field name="targetedGender" component={Radio} type="radio" value="m" />}

                />
                <FormControlLabel
                  label="انثى"
                  control={<Field name="targetedGender" component={Radio} type="radio" value="f" />}

                />
                <FormControlLabel
                  label="كلا الجنسين"
                  control={<Field name="targetedGender" component={Radio} type="radio" value="b" />}
                />
              </RadioGroup>
              {showError && <FormHelperText dir="rtl">{showError ? meta.error || meta.submitError : undefined}</FormHelperText>}
            </FormControl>
          )}}
        </Field>
      </Grid>
    </Grid>
  </>
);

export default CenterDetails;

CenterDetails.propTypes = {
  Condition: PropTypes.func.isRequired,
};
