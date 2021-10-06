/* eslint-disable no-unused-vars */
import {
  Grid,
  RadioGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
  FormHelperText,
  MenuItem,
} from '@material-ui/core';
import { Field } from 'react-final-form';
import { Radio, Select } from 'final-form-material-ui';
import { OnChange } from 'react-final-form-listeners';
import PropTypes from 'prop-types';
import FileUploaderComp from '../components/FileUploader';



const HealthServices = ({ Condition, values, setField }) => {

  var multipleDocs = []
  const setDocument = (name, docID, multiple) => {
    if (!multiple)
      setField(name, [docID])
    else {
      multipleDocs.push(docID)
      setField(name, multipleDocs)
    }
  }
  return (
    <>
      <Grid
        container
        spacing={3}
        mt={3}
      >

        <Grid
          item
          md={12}
          xs={12}
        >
          <Field name="healthServices" >
            {({ input, meta }) => {
              const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched; return ( // eslint-disable-line no-unused-vars

                <FormControl component="fieldset" error={showError ? meta.error || meta.submitError : undefined} required>
                  <FormLabel component="legend">هل المركز يقدم خدمات صحية؟</FormLabel>
                  <RadioGroup >
                    <FormControlLabel
                      label="نعم"
                      control={<Field name="healthServices" component={Radio} type="radio" value="yes" />}
                    />
                    <FormControlLabel
                      label="لا"
                      control={<Field name="healthServices" component={Radio} type="radio" value="no" />}
                    />
                  </RadioGroup>
                  {showError && <FormHelperText dir="rtl">{showError ? meta.error || meta.submitError : undefined}</FormHelperText>}
                </FormControl>
              )
            }}
          </Field>
          <OnChange name="healthServices">
            {(value, previous) => {
              if (value === "no"){
                setField("healthServiceType","");
                setField("healthServiceAttachment","");
              }
            }}
          </OnChange>
        </Grid>
        <Condition when='healthServices' is='yes' >
          <Grid
            item
            md={6}
            xs={12}
            className="custom-label-field"
          >

            <Field
              fullWidth
              label="نوع الخدمة الصحية"
              name="healthServiceType"
              component={Select}
              required
              dir="rtl"
              variant="outlined"
              className="custom-field"
              formControlProps={{ fullWidth: true }}
            >
              <MenuItem value={1}> رخصة وزارة الصحة </MenuItem>
              <MenuItem value={2}> عقد شراكة مع منشأة رعاية صحية </MenuItem>
            </Field>
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <Field
              label={values.healthServiceType ? values.healthServiceType === 1 ? 'ارفاق رخصة وزارة الصحة' : 'ارفاق عقد الشراكة' : 'ارفاق الخدمة الصحية'}
              name="healthServiceAttachment"
              component={FileUploaderComp}
              multipleDocs={false}
              setField={setField}
              setDocument={setDocument}
              values={values}
            />
          </Grid>
        </Condition>
      </Grid>
    </>

  );
}
export default HealthServices;

HealthServices.propTypes = {
  Condition: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  setField: PropTypes.func.isRequired,
};