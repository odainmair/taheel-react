import {
  Grid,
  MenuItem
} from '@material-ui/core';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';
import { TextField as TextFieldFinal, Select } from 'final-form-material-ui';
import { OnChange } from 'react-final-form-listeners';

const CenterInfo = ({ Condition }) => (
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
          label="صفة المالك*"
          name="requestType"
          component={Select}
          required
          dir="rtl"
          className="custom-field"
          formControlProps={{ fullWidth: true }}
        >
          <MenuItem value="2" selected>صفة طبيعية</MenuItem>
          <MenuItem value="1">صفة اعتباريه</MenuItem>
        </Field>
        <OnChange name="requestType">
          {(value, previous) => {
            console.log(`odai + ${value} + ${previous}`);
            // values.crNo = ''; // eslint-disable-line no-param-reassign
          }}
        </OnChange>
      </Grid>
      <Grid
        item
        md={6}
        xs={12}
        className="custom-label-field"
      >
        <Field
          fullWidth
          label="فئة المستفيد*"
          name="beneficiaryCategory"
          component={Select}
          required
          dir="rtl"
          className="custom-field"
          formControlProps={{ fullWidth: true }}
        >
          {/* <MenuItem value="Orphans">أيتام</MenuItem>
          <MenuItem value="Juveniles">الأحداث</MenuItem> */}
          <MenuItem value="1">ذوي الإعاقة </MenuItem>
          {/* <MenuItem value="Family">عائلة</MenuItem>
          <MenuItem value="Protection">حماية</MenuItem>
          <MenuItem value="Beggars">بيجار</MenuItem>
          <MenuItem value="Family Counseling">الإرشاد الأسري</MenuItem>
          <MenuItem value="Elderly">كبير</MenuItem> */}
        </Field>
      </Grid>
    </Grid>
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
          className="custom-label-field"

        >
          <Field
            fullWidth
            label="نوع رخصة*"
            name="licenseType"
            component={Select}
            required
            dir="rtl"
            className="custom-field"
            formControlProps={{ fullWidth: true }}
          >
            <MenuItem value="1">سجل تجاري</MenuItem>
            <MenuItem value="2">رخصة استثمار اجنبي</MenuItem>
            <MenuItem value="3">شهادة تسجيل للجمعيات والمؤسسات الاهليه</MenuItem>
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
            label="رقم"
            name="licenceNumber"
            component={TextFieldFinal}
            type="text"
            variant="outlined"
            dir="rtl"
            className="custom-field"
          />
        </Grid>
      </Grid>
    </Condition>
  </>
);

export default CenterInfo;

CenterInfo.propTypes = {
  Condition: PropTypes.func.isRequired,
};
