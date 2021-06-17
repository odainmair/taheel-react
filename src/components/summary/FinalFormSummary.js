/* eslint-disable */
import React from 'react';
import { Form } from 'react-final-form';
import { Alert, Box, Button, Card, CardContent, CircularProgress, Grid, Step, StepLabel } from '@material-ui/core';
import arrayMutators from "final-form-arrays";
import { TramRounded } from '@material-ui/icons';

export default class FinalFormSummary extends React.Component {
  static Page = ({ children }) => children;

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      values: props.initialValues || {},
      completed: false,
      isValid: true,
      errMessage: ""
    };
  }

  /**
   * NOTE: Both validate and handleSubmit switching are implemented
   * here because 🏁 Redux Final Form does not accept changes to those
   * functions once the form has been defined.
   */

  validate = (values) => {
    console.log("--- validate  ----");
    const activePage = React.Children.toArray(this.props.children)[
      this.state.page
    ];
    const valid = activePage.props.validate ? activePage.props.validate(values) : {}
    console.log("------------ values : " + JSON.stringify(values))
    console.log("------------ validate : " + JSON.stringify(valid))
    return valid
  }

  handleSubmit = async (values) => {
    console.log("--- handleSubmit  ----");
    const errors = this.validate(values);
    if (Object.keys(errors).length > 0)
      return this.validate(values);
    const { children, onSubmit } = this.props;
    const { page } = this.state;
    // const isLastPage = page === React.Children.count(children) - 1;
    const activePage = React.Children.toArray(this.props.children)[
      this.state.page
    ];

    if (this.state.values.isValid) {
      const { isSuccessful, message } = await onSubmit(values)
      if (!isSuccessful) {
        this.setState((state) => ({
          // isNextCallBackFunSuccess: false,
          errMessage: message
        }));
        return;
      }
    }
    return onSubmit(values)

  }

  render() {
    const { children } = this.props;
    const childrenArray = React.Children.toArray(children);
    const { page, values, completed, errMessage } = this.state;
    const activePage = React.Children.toArray(children)[page];
    // const isLastPage = page === React.Children.count(children) - 1;
    return (
      <Form
        initialValues={values}
        validate={this.validate}
        onSubmit={this.handleSubmit}
        mutators={{
          // expect (field, value) args from the mutator
          ...arrayMutators,
          setValue: ([field, value], state, { changeValue }) => {
            changeValue(state, field, () => value)
          }
        }}
      >
        {({ handleSubmit, pristine, form, submitting, values }) => {
          return (
            <form onSubmit={handleSubmit} autoComplete="off" noValidate>
              {/* <Stepper className="custom-wizard" alternativeLabel activeStep={page}>
                {childrenArray.map((child, index) => (
                  <Step key={child.props.label||index} completed={page > index || completed}>
                    <StepLabel>{child.props.label}</StepLabel>
                  </Step>
                ))}
              </Stepper> */}
              {!this.state.isValid && (
                <Box mt={3}>
                  <Alert variant="outlined" severity="error">
                    {errMessage}
                  </Alert>
                </Box>
              )}
              {React.cloneElement(activePage, {
                setField: form.mutators.setValue,
                pop: form.mutators.pop,
                push: form.mutators.push,
                values: values
              })}

              <Grid container spacing={2} mt={3} justifyContent="space-between">
                  <Grid item>
                    <Button
                      startIcon={submitting ? <CircularProgress size="1rem" /> : null}
                      disabled={values.agree.length == 0 || submitting}
                      variant="contained"
                      color="primary"
                      type="submit"
                      sx={{
                        backgroundColor: '#3c8084',
                      }}
                    >
                      انشاء طلب تجديد الترخيص
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      startIcon={submitting ? <CircularProgress size="1rem" /> : null}
                      disabled={true}
                      variant="contained"
                      color="primary"
                      type="submit"
                      sx={{
                        backgroundColor: '#3c8084',
                      }}
                    >
                    تحديث بيانات طلب تجديد الترخيص
                    </Button>
                  </Grid>
              </Grid>
              {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
            </form>
          )
        }}
      </Form>
    )
  }
}
/* eslint-enable */
