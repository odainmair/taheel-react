/* eslint-disable */
import { Field } from 'react-final-form';
import { TextField as TextFieldFinal, Radio } from 'final-form-material-ui';
import {
  Typography,
  Grid,
  FormControlLabel,
  RadioGroup,
} from '@material-ui/core';

const PhoneNumberInfo = () => {
  return (
    <>
      <Grid
        container
        spacing={0}
        mt={6}
      >
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
              label="رقم الجوال الجديد"
              name="newPhoneNumber"
              component={TextFieldFinal}
              type="text"
              variant="outlined"
              dir="rtl"
              className="custom-field"
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default PhoneNumberInfo;
