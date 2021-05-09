/* eslint-disable */
import React from 'react';
import { Form } from 'react-final-form';
import { Alert, Box, Button, CircularProgress, Grid, Step, StepLabel, Stepper } from '@material-ui/core';

export default class RegisterFromWizard extends React.Component {
  static Page = ({ children }) => children;

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      values: props.initialValues || {}, // initialValues={  centerType: '1', beneficiaryCategory: '1', requestType: '1   }
      completed: false,
      isNextCallBackFunSuccess: true,
      errMessage: '',
    };
  }

  next = (values) => {
    this.setState((state) => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values
    }));
  }

  /**
   * NOTE: Both validate and handleSubmit switching are implemented
   * here because 🏁 Redux Final Form does not accept changes to those
   * functions once the form has been defined.
   */

  validate = (values) => {
    let { counter } = this.props;
    const activePage = React.Children.toArray(this.props.children)[
      this.state.page
    ];
    const errors = activePage.props.validate ? activePage.props.validate(values) : {};

    if (this.state.page === 0) {
      if (!values.idNumber)
        errors.idNumber = 'يجب تعبئة الحقل';

      if (!values.day)
        errors.day = 'يجب تعبئة الحقل';

      if (!values.month)
        errors.month = 'يجب تعبئة الحقل';

      if (!values.year)
        errors.year = 'يجب تعبئة الحقل';
    }
    if (this.state.page === 1) {
      if (!values.AbsherOtp)
        errors.AbsherOtp = 'يجب تعبئة الحقل';
      return errors;
    }
    if (this.state.page === 2) {

      const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      if (!values.email) {
        errors.email = 'يجب تعبئة الحقل';
      }
      if (!values.password) {
        errors.password = 'يجب تعبئة الحقل';
      }
      if (!values.passwordConfirmation) {
        errors.passwordConfirmation = 'يجب تعبئة الحقل';
      }
      if (values.passwordConfirmation && values.passwordConfirmation !== values.password) {
        errors.password = 'كلمة المرور لا تماثل التأكيد';
      }
      document.getElementsByTagName('UL')[0].style.color = 'red';

      if (values.password && values.password.length >= 8)
        document.getElementById('digitsNo').style.color = '#04AA6D';
      else {
        errors.password = 'حقل كلمة المرور غير صحيح';
        document.getElementById('digitsNo').style.color = 'red';
      }
      if (values.password && /\d/.test(values.password))
        document.getElementById('digitExist').style.color = '#04AA6D';
      else {
        errors.password = 'حقل كلمة المرور غير صحيح';
        document.getElementById('digitExist').style.color = 'red';
      }

      if (values.password && values.password.toUpperCase() !== values.password)
        document.getElementById('UpperCase').style.color = '#04AA6D';
      else {
        errors.password = 'حقل كلمة المرور غير صحيح';
        document.getElementById('UpperCase').style.color = 'red';
      }

      if (values.password && values.password.toLowerCase() !== values.password)
        document.getElementById('LowerCase').style.color = '#04AA6D';
      else {
        errors.password = 'حقل كلمة المرور غير صحيح';
        document.getElementById('LowerCase').style.color = 'red';
      }

      if (values.password && format.test(values.password))
        document.getElementById('symbol').style.color = '#04AA6D';
      else {
        errors.password = 'حقل كلمة المرور غير صحيح';
        document.getElementById('symbol').style.color = 'red';
      }
      return errors;
    }

    if (this.state.page === 3) {
      if (!values.phoneNumber){
        errors.phoneNumber = 'يجب تعبئة الحقل';
        counter  =0
      }
      return errors;
    }

    return activePage.props.validate ? activePage.props.validate(values) : {};
  }

  handleSubmit = async (values) => {
    let { children, onSubmit, counter } = this.props;
    const { page } = this.state;
    const isLastPage = page === React.Children.count(children) - 1;
    const activePage = React.Children.toArray(this.props.children)[
      this.state.page
    ];


    if (isLastPage && counter !== 1) {
      this.setState((state) => ({
        completed: true
      }));
      const { isSuccessful, message } = await onSubmit(values)
      if (!isSuccessful) {
        this.setState((state) => ({
          isNextCallBackFunSuccess: false,
          errMessage: message
        }));
        return;
      }
    } else {
      if (activePage.props.nextFun) {
        const { isSuccessful, message } = await activePage.props.nextFun(values);
        if (!isSuccessful) {
          this.setState((state) => ({
            isNextCallBackFunSuccess: false,
            errMessage: message
          }));
          return;
        }
      }
      this.setState((state) => ({
        isNextCallBackFunSuccess: true,
        errMessage: ''
      }));
      this.next(values);

    }

  }

  render() {
    const { children } = this.props;
    const childrenArray = React.Children.toArray(children); // Same of Chlldren with key values not null
    const { page, values, completed, isNextCallBackFunSuccess, errMessage } = this.state;
    const activePage = React.Children.toArray(children)[page];
    const isLastPage = page === React.Children.count(children) - 1;
    return (
      <Form
        initialValues={values} // initialValues={  centerType: '1', beneficiaryCategory: '1', requestType: '1   }
        validate={this.validate}
        onSubmit={this.handleSubmit} // onSubmit from Register file
      >
        {({
          handleSubmit,
          submitting,
        }) => (
          <form onSubmit={handleSubmit} autoComplete="off" noValidate>
            <Stepper className="custom-wizard" alternativeLabel activeStep={page}>
              {childrenArray.map((child, index) => (
                <Step key={index} completed={page > index || completed}>
                  <StepLabel>{child.props.label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activePage}
            {!isNextCallBackFunSuccess && (
              <Box mt={3}>
                <Alert severity="error">
                  {errMessage}
                </Alert>
              </Box>
            )}
            <Grid container spacing={2} mt={3} justifyContent="flex-end">
              {page > 0 && (
                <Grid item>  </Grid>
              )}
              {!isLastPage && (
                <Grid item>
                  <Button
                    startIcon={submitting ? <CircularProgress size="1rem" /> : null}
                    variant="contained"
                    disabled={submitting}
                    size="50%"
                    color="primary"
                    type="submit"
                    sx={{
                      backgroundColor: '#3c8084',
                    }}
                  >
                    التالي
                  </Button>
                </Grid>
              )}
              {isLastPage && (
                <Grid item>
                  <Button
                    startIcon={submitting ? <CircularProgress size="1rem" /> : null}
                    disabled={submitting}
                    variant="contained"
                    size="large"
                    color="primary"
                    type="submit"
                  >
                    ارسال
                  </Button>
                </Grid>
              )}
            </Grid>

          </form>
        )}
      </Form>
    );
  }
}
