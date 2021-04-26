import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';

const states = [
  {
    value: '1',
    label: 'الرياض'
  },
  {
    value: '2',
    label: 'جدة'
  },
  {
    value: '3',
    label: 'مكة'
  }
];

const AccountProfileDetails = (props) => {
  const [values, setValues] = useState({
    firstName: 'عبدالله',
    lastName: 'بن محمد',
    email: 'abdallah@takamolholding.com',
    phone: '',
    state: '1',
    country: 'السعودية'
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          subheader="هذه المعلوما التي يمكنك ان تقوم في تعديلها"
          title="معلومات الشخصية"
        />
        <Divider />
        <CardContent>
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
                label="الاسم الاول"
                name="firstName"
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
                label="اسم العائلة"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
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
                label="البريد الاكتروني"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
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
                label="رقم الجوال"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
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
                label="الدولة"
                name="country"
                onChange={handleChange}
                required
                value={values.country}
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
                label="المدينة"
                name="state"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
                className="custom-field"

              >
                {states.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
          >
            حفظ المعلومات
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
