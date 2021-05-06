import {
  Grid,
  InputAdornment
} from '@material-ui/core';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';
import { TextField as TextFieldFinal } from 'final-form-material-ui';

const OwnerInfo = ({ Condition }) => (
  <>
    <Condition when="requestType" is="2">
      <Grid
        container
        spacing={3}
        mt={3}
        mb={3}
      >
        <Grid
          item
          md={6}
          xs={12}
        >
          <Field
            fullWidth
            required
            label="رقم الهوية"
            name="idNumber"
            component={TextFieldFinal}
            type="text"
            variant="outlined"
            dir="rtl"
            className="custom-field"
            disabled
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <Field
            fullWidth
            required
            label="اسم مالك المركز"
            name="ownerName"
            component={TextFieldFinal}
            type="text"
            variant="outlined"
            dir="rtl"
            className="custom-field"
            disabled
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <Field
            fullWidth
            required
            label="تاريخ الميلاد"
            name="birthDate"
            component={TextFieldFinal}
            type="text"
            variant="outlined"
            dir="rtl"
            className="custom-field"
            disabled
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <Field
            fullWidth
            required
            label="رقم الجوال"
            name="mobileNo"
            component={TextFieldFinal}
            type="text"
            variant="outlined"
            dir="rtl"
            className="custom-field"
            disabled
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  | 966+
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </Condition>
    <Condition when="requestType" is="1">
      <Grid
        container
        spacing={3}
        mt={3}
        mb={3}

      >
        <Grid
          item
          md={6}
          xs={12}

        >
          <Field
            fullWidth
            required
            label="رقم"
            name="licenceNumber"
            component={TextFieldFinal}
            type="text"
            variant="outlined"
            dir="rtl"
            disabled
            className="custom-field"
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <Field
            fullWidth
            required
            label="اسم الكيان"
            name="companyName"
            component={TextFieldFinal}
            type="text"
            variant="outlined"
            dir="rtl"
            disabled
            className="custom-field"
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <Field
            fullWidth
            required
            label="رقم الجوال المفوض"
            name="compMobileNo"
            component={TextFieldFinal}
            type="text"
            variant="outlined"
            dir="rtl"
            className="custom-field"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  | 966+
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </Condition>
  </>
);

export default OwnerInfo;

OwnerInfo.propTypes = {
  Condition: PropTypes.func.isRequired,
};
