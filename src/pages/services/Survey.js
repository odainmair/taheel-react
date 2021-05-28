import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Button,
  Container,
  Typography,
  Grid,
  RadioGroup,
  MenuItem,
  FormLabel,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputAdornment
} from '@material-ui/core';
import { Form, Field } from 'react-final-form';
import { Radio, TextField as TextFieldFinal, Select } from 'final-form-material-ui';
import FileUploader from 'src/components/FileUploader';
import MapContainer from 'src/components/MapContainer';
import { OnChange } from 'react-final-form-listeners';
import useRequest from '../../hooks/use-request';

const Survey = () => {
  const { doRequest, errors } = useRequest({
    url: 'CreateTempt',
    method: 'post',
    body: {

    },
    onSuccess: () => console.log('test')
  });
  const onSubmit = async (values) => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(300);
    const bodyRequest = {
      centerData: {
        name: values.centerOwner
      }
    };
    const response = await doRequest(bodyRequest);

    window.alert(` تم تقديم طلبك بنجاح، رقم الرخصة ${response.center.ID} وتاريخ انتهاء الرخصة ${response.center.expirationDate} هجري`);
  };
 
  const validate = (values) => {
    // console.log(JSON.stringify(values));
    const fieldErrors = {};
    if (!values.idNo) {
      fieldErrors.idNo = 'Required';
    }
    if (!values.centerOwner) {
      fieldErrors.centerOwner = 'Required';
    }
    if (!values.birthDate) {
      fieldErrors.birthDate = 'Required';
    }
    if (!values.durationWork) {
      fieldErrors.durationWork = 'Required';
    }
    if (!values.age) {
      fieldErrors.age = 'Required';
    }
    if (!values.gender) {
      fieldErrors.gender = 'Required';
    }
    if (!values.centerType) {
      fieldErrors.centerType = 'Required';
    }
    console.log('ttest');
    return fieldErrors;
  };

  console.log('ttest');
  return (
    <Container maxWidth="md">
      <Form
        onSubmit={onSubmit}
        initialValues={{
          employed: true,
          firstName: '',
          stooge: 'larry',
          durationWork: '1',
          age: '1',
          gender: '1',
          requestType: '2',
          licenseType: '1'
        }}
        validate={validate}
        render={({
          handleSubmit,
          reset,
          submitting,
          pristine,
          values // eslint-disable-line no-unused-vars
        }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Card>
              <CardHeader
                title="اصدار ترخيص مؤقت لمركز تأهيل أهلي - صفة طبيعية"
              />
              <Divider />
              <CardContent>
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
                      onChange={() => console.log('odai')}
                    >
                      <MenuItem value="2" selected>صفة طبيعية</MenuItem>
                      <MenuItem value="1">صفة اعتباريه</MenuItem>
                    </Field>
                    <OnChange name="requestType">
                      {(value, previous) => {
                        console.log(`odai + ${value} + ${previous}`);
                        values.crNo = ''; // eslint-disable-line no-param-reassign
                      }}
                    </OnChange>
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                    className="custom-label-field"
                  />
                </Grid>
                <Typography
                  color="textPrimary"
                  gutterBottom
                  mb={4}
                  mt={6}
                  variant="h4"
                >
                  معلومات المالك
                </Typography>
                <Grid
                  container
                  spacing={3}
                  display={(values.requestType === '1') ? 'none' : 'flex'}
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
                      name="idNo"
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
                      label="اسم مالك المركز"
                      name="centerOwner"
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
                <Grid
                  container
                  spacing={3}
                  display={(values.requestType !== '1') ? 'none' : 'flex'}
                >
                  <Grid
                    item
                    md={6}
                    xs={12}
                    className="custom-label-field"
                    display={(values.requestType !== '1') ? 'none' : 'flex'}
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
                    display={(values.requestType !== '1') ? 'none' : 'flex'}
                  >
                    <Field
                      fullWidth
                      required
                      label="رقم"
                      name="crNo"
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
                      label="اسم الكيان"
                      name="centerOwner"
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
                      label="رقم الجوال المفوض"
                      name="mobileNo"
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
                <Typography
                  color="textPrimary"
                  gutterBottom
                  mb={4}
                  mt={10}
                  variant="h4"
                >
                  عنوان المركز
                </Typography>
                <Grid
                  container
                  spacing={3}
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
                <Typography
                  color="textPrimary"
                  gutterBottom
                  mb={4}
                  mt={6}
                  variant="h4"
                >
                  معلومات المركز
                </Typography>
                <Grid
                  container
                  spacing={3}
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
                      className="custom-field"
                      formControlProps={{ fullWidth: true }}
                    >
                      <MenuItem value="London">London</MenuItem>
                      <MenuItem value="Paris">Paris</MenuItem>
                      <MenuItem value="Budapest">
                        A city with a very long Name
                      </MenuItem>
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
                    <Field name="durationWork">
                      {({ input, meta }) => ( // eslint-disable-line no-unused-vars
                        <FormControl component="fieldset" error={meta.error} required>
                          <FormLabel component="legend">فترة العمل</FormLabel>
                          <RadioGroup row>
                            <FormControlLabel
                              label="القترة الصباحية"
                              control={<Field name="durationWork" component={Radio} type="radio" value="1" />}

                            />
                            <FormControlLabel
                              label="الفترة المسائية"
                              control={<Field name="durationWork" component={Radio} type="radio" value="2" />}

                            />
                            <FormControlLabel
                              label="فترتين"
                              control={<Field name="durationWork" component={Radio} type="radio" value="3" />}
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
                    <Field name="age">
                      {({ input, meta }) => ( // eslint-disable-line no-unused-vars
                        <FormControl component="fieldset" error={meta.error} required>
                          <FormLabel component="legend">الفئة العمرية للمستفدين</FormLabel>
                          <RadioGroup row>
                            <FormControlLabel
                              label="سنتين - ١٢سنة"
                              control={<Field name="age" component={Radio} type="radio" value="1" />}

                            />
                            <FormControlLabel
                              label="١٣سنة - ١٨سنة"
                              control={<Field name="age" component={Radio} type="radio" value="2" />}

                            />
                            <FormControlLabel
                              label="١٩سنة -٤٥سنة"
                              control={<Field name="age" component={Radio} type="radio" value="3" />}
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
                    <Field name="age">
                      {({ input, meta }) => ( // eslint-disable-line no-unused-vars
                        <FormControl component="fieldset" error={meta.error} required>
                          <FormLabel component="legend">جنس المستفدين</FormLabel>
                          <RadioGroup row>
                            <FormControlLabel
                              label="ذكر"
                              control={<Field name="gender" component={Radio} type="radio" value="1" />}

                            />
                            <FormControlLabel
                              label="انثى"
                              control={<Field name="gender" component={Radio} type="radio" value="2" />}

                            />
                            <FormControlLabel
                              label="كلا الجنسين"
                              control={<Field name="gender" component={Radio} type="radio" value="3" />}
                            />
                          </RadioGroup>
                          {meta.error && meta.touched && <FormHelperText dir="rtl">{meta.error}</FormHelperText>}
                        </FormControl>
                      )}
                    </Field>
                  </Grid>
                </Grid>
                <Typography
                  color="textPrimary"
                  gutterBottom
                  mb={4}
                  mt={6}
                  variant="h4"
                >
                  معلومات مدير المركز
                </Typography>
                <Grid
                  container
                  spacing={3}
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
                      name="idManagerNo"
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
                    <FileUploader
                      handleFile={(test) => console.log(test)}
                      label="نسخة من الهوية/ الاقامة"
                      name="copyIDImage"
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
                      label="اسم المدير كامل"
                      name="managerName"
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
                    <FileUploader
                      handleFile={(test) => console.log(test)}
                      label="موهلات المدير التعليمية"
                      name="managerExp"
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <FileUploader
                      handleFile={(test) => console.log(test)}
                      label="خبرات المدير السابقة"
                      name="preManagerExp"
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={3}
                  justifyContent="flex-end"
                >
                  <Grid item style={{ marginTop: 20 }}>
                    <Button
                      type="button"
                      variant="contained"
                      onClick={reset}
                      disabled={submitting || pristine}
                    >
                      الغاء
                    </Button>
                  </Grid>
                  <Grid item style={{ marginTop: 20 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={submitting}
                    >
                      ارسال
                    </Button>
                  </Grid>
                </Grid>
                {errors}
              </CardContent>
            </Card>
          </form>
        )}
      />
    </Container>
  );
};

export default Survey;
