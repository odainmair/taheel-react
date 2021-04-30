/* eslint-disable no-unused-vars */
import { Grid } from '@material-ui/core';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';
import MapContainer from 'src/components/MapContainer';
import { TextField as TextFieldFinal } from 'final-form-material-ui';

const CenterAddress = ({ Condition }) => (
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
        <Grid
          container
          md={12}
          xs={12}
          spacing={3}
          className="customGrid"
        >
          <Grid
            item
            md={12}
            xs={12}
          >
            <Field
              fullWidth
              required
              label="رقم المبنى"
              name="buildNo"
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
            <Field
              fullWidth
              required
              label="الشارع"
              name="street"
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
            <Field
              fullWidth
              required
              label="الحي"
              name="sub"
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
            <Field
              fullWidth
              required
              label="المدينة"
              name="city"
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
            <Field
              fullWidth
              required
              label="الرمز البريدي"
              name="postalCodde"
              component={TextFieldFinal}
              type="text"
              variant="outlined"
              dir="rtl"
              className="custom-field"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        md={6}
        xs={12}
      >
        <MapContainer />
      </Grid>
    </Grid>
  </>
);

export default CenterAddress;

CenterAddress.propTypes = {
  Condition: PropTypes.func.isRequired,
};
