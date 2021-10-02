/* eslint-disable */

import {
  Grid,
  MenuItem
} from '@material-ui/core';
import { Field } from 'react-final-form';
import { TextField as TextFieldFinal, Select } from 'final-form-material-ui';
import { OnChange } from 'react-final-form-listeners';
import CenterSummary from './CenterSummary';
import { CardContent, CircularProgress } from '@mui/material';

const FinalLicenseData = ({ setField, renewableLicenses, values, setCenterLicenceNumber, getCentertDetails, showSummary, setShowSummary, isLoading }) => {
  console.log("======>values from final: " + JSON.stringify(values))
  console.log("======>valuesrenewableLicenses: " + JSON.stringify(renewableLicenses))


  return (
    <CardContent>
      {!isLoading ?
        <>
          <Grid
            container
            mt={4}
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
              className="custom-label-field"
            >
              <Field
                fullWidth
                label="رقم الترخيص النهائي"
                name="centerLicenceNumber"
                component={Select}
                required
                dir="rtl"
                variant="outlined"
                className="custom-field"
                formControlProps={{ fullWidth: true }}
                disabled={!Array.isArray(renewableLicenses) || !renewableLicenses.length}
              >
                <MenuItem value="1" key="1" selected={true}>اختيار</MenuItem>
                {renewableLicenses.map(item => (
                  <MenuItem key={item.licenceNumber} value={item.licenceNumber}>{item.licenceNumber}</MenuItem>
                ))}
              </Field>
              <OnChange name="centerLicenceNumber">
                {async (value) => {
                  console.log(`centerLicenceNumber + ${value}`);
                  if (value != 1) {
                    await getCentertDetails(value);

                  }
                  else {
                    setShowSummary(false);
                  }
                }}
              </OnChange>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
              className="custom-label-field"
            >
            </Grid>
          </Grid>
          {showSummary && <CenterSummary
            values={values}
            setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
          />
          }
        </>
        :
        <CircularProgress size="15rem" style={{
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto', color: '#E2E8EB'
        }} />
      }
    </CardContent>
  );
}
export default FinalLicenseData;
