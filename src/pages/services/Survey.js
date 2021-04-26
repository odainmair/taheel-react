import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Button,
  Container,
  Typography,
  Grid,
  TextField,
  RadioGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
} from '@material-ui/core';
import { Form, Field } from 'react-final-form';
import { Radio } from 'final-form-material-ui';
import FileUploader from 'src/components/FileUploader';
import useRequest from '../../hooks/use-request';

const Survey = () => {
  const { doRequest, errors } = useRequest({
    url: 'https://inspiredemo2.appiancloud.com/suite/webapi/CreateTemp',
    method: 'post',
    body: {

    },
    onSuccess: () => console.log('test')
  });
  const [fieldValues, setFieldValues] = useState({
    idNo: '',
    centerOwner: '',
    birthDate: '',
  });
  const handleChange = (event) => {
    setFieldValues({
      ...fieldValues,
      [event.target.name]: event.target.value
    });
  };
  const onSubmit = async () => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(300);
    const bodyRequest = {
      centerData: {
        name: fieldValues.centerOwner
      }
    };
    const response = await doRequest(bodyRequest);

    window.alert(` تم تقديم طلبك بنجاح، رقم الرخصة ${response.center.ID} وتاريخ انتهاء الرخصة ${response.center.expirationDate} هجري`);
  };

  console.log('ttest');
  return (
    <Container maxWidth="md">
      <Form
        onSubmit={onSubmit}
        initialValues={{ employed: true, stooge: 'larry' }}
        render={({
          handleSubmit,
          reset,
          submitting,
          pristine,
          values
        }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Card>
              <CardHeader
                title="اصدار ترخيص مؤقت لمركز تأهيل أهلي - صفة طبيعية"
              />
              <Divider />
              <CardContent>
                <Typography
                  color="textPrimary"
                  gutterBottom
                  mb={4}
                  mt={2}
                  variant="h4"
                >
                  معلومات المالك
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
                    <TextField
                      fullWidth
                      label="رقم الهوية"
                      name="idNo"
                      onChange={handleChange}
                      required
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
                    <TextField
                      fullWidth
                      label="اسم مالك المركز"
                      name="centerOwner"
                      onChange={handleChange}
                      required
                      variant="outlined"
                      className="custom-field"
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="تاريخ الميلاد"
                      name="birthDate"
                      onChange={handleChange}
                      required
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
                    <TextField
                      fullWidth
                      label="رقم الجوال"
                      name="mobileNo"
                      onChange={handleChange}
                      required
                      variant="outlined"
                      className="custom-field"
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
                        <TextField
                          fullWidth
                          label="رقم المبنى"
                          name="buildNo"
                          onChange={handleChange}
                          required
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
                        <TextField
                          fullWidth
                          label="الشارع"
                          name="street"
                          onChange={handleChange}
                          required
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
                        <TextField
                          fullWidth
                          label="الحي"
                          name="sub"
                          onChange={handleChange}
                          required
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
                        <TextField
                          fullWidth
                          label="المدينة"
                          name="city"
                          onChange={handleChange}
                          required
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
                        <TextField
                          fullWidth
                          label="الرمز البريدي"
                          name="postalCodde"
                          onChange={handleChange}
                          required
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
                    <img
                      alt="Logo"
                      src="/static/googlemap.png"
                      height="400"
                    />
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
                    <TextField
                      fullWidth
                      label="اسم المركز"
                      name="centerName"
                      onChange={handleChange}
                      required
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
                    <TextField
                      fullWidth
                      label="نوع المركز"
                      name="centerType"
                      onChange={handleChange}
                      required
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
                    <TextField
                      fullWidth
                      label="الطاقة الاستعابية المحتملة"
                      name="centerCap"
                      onChange={handleChange}
                      required
                      value={values.firstName}
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
                    <FormControl component="fieldset">
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
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <FormControl component="fieldset">
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
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <FormControl component="fieldset">
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
                    </FormControl>
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
                    <TextField
                      fullWidth
                      label="رقم الهوية"
                      name="idManagerNo"
                      onChange={handleChange}
                      required
                      value={values.firstName}
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
                    <TextField
                      fullWidth
                      label="نسخة من الهوية/ الاقامة"
                      name="copyIDImage"
                      onChange={handleChange}
                      required
                      value={values.firstName}
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
                    <TextField
                      fullWidth
                      label="اسم المدير كامل"
                      name="managerName"
                      onChange={handleChange}
                      required
                      value={values.firstName}
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
                    <TextField
                      fullWidth
                      label="موهلات المدير التعليمية"
                      name="managerExp"
                      onChange={handleChange}
                      required
                      value={values.firstName}
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
                    <FileUploader handleFile={(test) => console.log(test)} />
                    <TextField
                      fullWidth
                      label="خبرات المدير السابقة"
                      name="preManagerExp"
                      onChange={handleChange}
                      required
                      value={values.firstName}
                      variant="outlined"
                      dir="rtl"
                      className="custom-field"
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={3}
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
