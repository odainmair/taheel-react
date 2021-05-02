/* eslint-disable */
import React from 'react';
import { Form } from 'react-final-form';
import { Alert, Box, Button, Card, CardContent, CircularProgress, Grid, Step, StepLabel, Stepper } from '@material-ui/core';

export default class RegisterFromWizard extends React.Component {
  static Page = ({ children }) => children;

  constructor(props) {
    super(props);
    // console.log("prrrooops:",props)  // { children: (4) [{…}, {…}, {…}, {…}], initialValues: {centerType: "1", beneficiaryCategory: "1", requestType: "1"},  onSubmit: async values => {…}}
    // console.log("Page =>>>:",RegisterFromWizard.Page)  
    // console.log("props.initialValues:",props.initialValues)  // { beneficiaryCategory: "1"  centerType: "1",  requestType: "1"}
    this.state = {
      page: 0,
      values: props.initialValues || {},    //initialValues={  centerType: '1', beneficiaryCategory: '1', requestType: '1   }
      completed: false,
      isNextCallBackFunSuccess: true,
      errMessage: "",
      // counter:1,
    };
  }

  next = (values) => {
    this.setState((state) => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values
    }));
  }

  // previous = () =>
  //   this.setState((state) => ({
  //     page: Math.max(state.page - 1, 0)
  //   }));

  /**
   * NOTE: Both validate and handleSubmit switching are implemented
   * here because 🏁 Redux Final Form does not accept changes to those
   * functions once the form has been defined.
   */

  validate = (values) => {
    // console.log("values=>",values)  ///{centerType: "1", beneficiaryCategory: "1", requestType: "1"}
    const activePage = React.Children.toArray(this.props.children)[
      this.state.page
    ];


    if (this.state.page === 2) {
      const errors = activePage.props.validate ? activePage.props.validate(values) : {};
      var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
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
      document.getElementsByTagName("UL")[0].style.color = "red";
      console.log("document.getElementsByTagName[0", document.getElementsByTagName("LI")[0].style.color)
      console.log("document.getElementsByTagName[1]", document.getElementsByTagName("LI")[1].style.color)

      if (values.password && values.password.length >= 8)
        document.getElementById("digitsNo").style.color = "#04AA6D";
      else {
        errors.password = 'حقل كلمة المرور غير صحيح'
        document.getElementById("digitsNo").style.color = "red";
      }
      if (values.password && /\d/.test(values.password))
        document.getElementById("digitExist").style.color = "#04AA6D";
      else {
        errors.password = 'حقل كلمة المرور غير صحيح'
        document.getElementById("digitExist").style.color = "red";
      }

      if (values.password && values.password.toUpperCase() != values.password)
        document.getElementById("UpperCase").style.color = "#04AA6D";
      else {
        errors.password = 'حقل كلمة المرور غير صحيح'
        document.getElementById("UpperCase").style.color = "red";
      }

      if (values.password && values.password.toLowerCase() != values.password)
        document.getElementById("LowerCase").style.color = "#04AA6D";
      else {
        errors.password = 'حقل كلمة المرور غير صحيح'
        document.getElementById("LowerCase").style.color = "red";
      }

      if (values.password && format.test(values.password))
        document.getElementById("symbol").style.color = "#04AA6D";
      else {
        errors.password = 'حقل كلمة المرور غير صحيح'
        document.getElementById("symbol").style.color = "red";
      }

      return errors;
    }
    return activePage.props.validate ? activePage.props.validate(values) : {}
  }

  handleSubmit = async (values) => {
    // console.log("valuessssssss::",values)  ///{centerType: "1", beneficiaryCategory: "1", requestType: "1"}
    let { children, onSubmit, counter } = this.props;
    const { page } = this.state;
    const isLastPage = page === React.Children.count(children) - 1;
    const activePage = React.Children.toArray(this.props.children)[
      this.state.page
    ];
    if (isLastPage) {
      
      // console.log("counter",counter++)
      // To make a conditional rendering for Taheel OTP
      // counter++
     
      this.setState((state) => ({
        completed: true,
        // counter: this.state.counter++
      }));
      // values.counter= this.state.counter 
      // values.counter= this.setState({counter: this.state.counter++})
      if ( counter  === 1) {
        console.log("Helllooooooo FRooooooooom 2222222222",counter)
        console.log("activePage.props.nextFun",activePage.props.nextFun)
        if (activePage.props.nextFun) {
          const { isSuccessful, message } = await activePage.props.nextFun(values); /// nextFun come from validateAPIFunc in register file
          console.log("isSuccessful", isSuccessful, "message", message)
          if (!isSuccessful) {
            this.setState((state) => ({
              // isNextCallBackFunSuccess: false,
              errMessage: message
            }));
            return;
          }
        }
      }else{
        console.log("Helllooooooo FRooooooooom 333333333333333333333333",counter)
        // return onSubmit(values)}
        const { isSuccessful, message } = await onSubmit(values)
        console.log("isSuccessfulllll",isSuccessful,"messageeeee",message)
        if (!isSuccessful) {
          console.log("I'''MMMM0   HEREEEEEE ", !isSuccessful)
          this.setState((state) => ({
            // isNextCallBackFunSuccess: false,
            errMessage: message
          }));
          // return;
        }
      }
        
    } else {
     
      if (activePage.props.nextFun) {
        console.log("activePage.props.nextFun",activePage.props.nextFun)   /// {label: "", children: {…}}
        const { isSuccessful, message } = await activePage.props.nextFun(values); /// nextFun come from validateAPIFunc in register file
        console.log("isSuccessful", isSuccessful, "message", message)
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
    const childrenArray = React.Children.toArray(children);    /// Same of Chlldren with key values not null 
    const { page, values, completed, isNextCallBackFunSuccess, errMessage } = this.state;
    const activePage = React.Children.toArray(children)[page];
    const isLastPage = page === React.Children.count(children) - 1;
    return (
      <Form
        initialValues={values}   //initialValues={  centerType: '1', beneficiaryCategory: '1', requestType: '1   }
        validate={this.validate}
        onSubmit={this.handleSubmit} /// onSubmit from Register file
      >

        {({ handleSubmit, pristine, form, submitting, values }) => (
          <form onSubmit={handleSubmit} autoComplete="off" noValidate>

            <Stepper className="custom-wizard" alternativeLabel activeStep={page}>
              {childrenArray.map((child, index) => (
                <Step key={child.props.label} completed={page > index || completed}>
                  {/* { console.log("child.props.label",child.props.label)} */}
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
                <Grid item>
                  {/* <Button
                    variant="contained"
                    onClick={this.previous}
                    sx={{
                      backgroundColor: '#E2E8EB',
                      color: '#000'
                    }}
                  >
                    رجوع
                  </Button> */}
                </Grid>
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

            {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}

          </form>
        )}

      </Form>
      //  </Box>
    )
  }
}
/* eslint-enable */
