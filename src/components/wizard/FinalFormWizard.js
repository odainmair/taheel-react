/* eslint-disable */
import React from 'react';
import { Form } from 'react-final-form';
import { Alert, Box, Button, Card, CardContent, CircularProgress, Grid, Step, StepLabel, Stepper } from '@material-ui/core';
import arrayMutators from "final-form-arrays";
import { LICENSE_FORM_TYPES } from 'src/utils/enums'
import ConfirmationDialog from '../ConfirmationDialog';
import { SettingsPowerRounded } from '@material-ui/icons';
import { stubTrue } from 'lodash-es';

export default class FinalFromWizard extends React.Component {
  static Page = ({ children }) => children;

  constructor(props) {
    super(props);
    this.state = {
      page: props.initialValues.page ? props.initialValues.page : 0,
      values: props.initialValues || {},
      completed: false,
      open: false,
      isNextCallBackFunSuccess: true,
      isDraft: false,
      errMessage: ""
    };
  }

  end = (values) => {
    const { onSubmit } = this.props;
    console.log("--- end  ----");
    this.setState((state) => ({ open: false, isDraft: true }))
    console.log("--- values  ----" + JSON.stringify(values));
    this.handleSubmit(values)
    console.log("FINALFORMWIZARD :: return onSubmit  ");
    return onSubmit({ ...values, isDraft: true })
  }

  next = (values) => {
    console.log("--- next  ----");
    console.log("--- values  ----" + JSON.stringify(values));
    this.setState((state) => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values
    }));
  }

  previous = () =>
    this.setState((state) => ({
      page: Math.max(state.page - 1, 0)
    }));

  /**
   * NOTE: Both validate and handleSubmit switching are implemented
   * here because 🏁 Redux Final Form does not accept changes to those
   * functions once the form has been defined.
   */

  validate = (values) => {
    console.log("FINALFORMWIZARD :: --- validate  ----" + JSON.stringify(values));
    const activePage = React.Children.toArray(this.props.children)[
      this.state.page
    ];
    return activePage.props.validate ? activePage.props.validate(values) : {}
  }

  handleSubmit = async (values) => {
    const { children, onSubmit } = this.props;
    const { page, isDraft } = this.state;

    console.log("FINALFORMWIZARD :: handleSubmit  isDraft: " + isDraft);
    console.log("FINALFORMWIZARD :: handleSubmit  values.isDraft: " + values.isDraft);
    console.log("FINALFORMWIZARD :: handleSubmit  values.managersCount: " + values.managersCount);
    console.log("FINALFORMWIZARD :: handleSubmit " + JSON.stringify(values));

    if (isDraft) {
      console.log("FINALFORMWIZARD :: return onSubmit  ");
      return onSubmit({ ...values, isDraft: true })
    }
    const errors = this.validate(values);
    if (Object.keys(errors).length > 0) {
      console.log(`FINALFORMWIZARD :: Object.keys(errors).length ${Object.keys(errors).length}`)
      return this.validate(values);
    }
    const isLastPage = page === React.Children.count(children) - 1;
    const activePage = React.Children.toArray(this.props.children)[
      this.state.page
    ];
    if (isLastPage) {
      this.setState((state) => ({
        completed: true
      }));
      if (this.state.values.lastPageErrorHandling) {
        console.log("this.state.values.lastPageErrorHandling");
        const { isSuccessful, message } = await onSubmit(values);
        if (!isSuccessful) {
          this.setState((state) => ({
            isNextCallBackFunSuccess: false,
            errMessage: message
          }));
          return;
        }
      }
      return onSubmit(values)
    } else {
      console.log('before if--- activePage.props.nextFun ----')
      if (activePage.props.nextFun) {
        console.log('if--- activePage.props.nextFun ----')
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
    const { children, isEnableNextBtn = true, isEnableCancelBtn = false, isEnableEndBtn = false, cancelBtnFn, canShowSection = true, enableValidate = false } = this.props;
    const childrenArray = React.Children.toArray(children);
    const { page, values, completed, isNextCallBackFunSuccess, errMessage } = this.state;
    const activePage = React.Children.toArray(children)[page];
    const isLastPage = page === React.Children.count(children) - 1;
    return (
      <>
        <Form
          initialValues={values}
          validate={enableValidate && this.validate}
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
                <Stepper className="custom-wizard" alternativeLabel activeStep={page}>
                  {childrenArray.map((child, index) => (
                    <Step key={child.props.label || index} completed={page > index || completed}>
                      <StepLabel>{child.props.label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                {!isNextCallBackFunSuccess && (
                  <Box mt={3}>
                    <Alert variant="outlined" severity="error">
                      {errMessage}
                    </Alert>
                  </Box>
                )}
                {canShowSection ? React.cloneElement(activePage, {
                  setField: form.mutators.setValue,
                  pop: form.mutators.pop,
                  push: form.mutators.push,
                  values: values
                }) : ""}
                <Grid container direction="row" spacing={2} mt={3} justifyContent={isEnableCancelBtn || isEnableEndBtn ? "space-between" : "flex-end"}>
                  {isEnableCancelBtn && (
                    <Grid item>
                      <Button
                        variant="contained"
                        onClick={() => { this.setState((state) => ({ open: true })) }}
                        sx={{
                          backgroundColor: '#E2E8EB',
                          color: '#000'
                        }}
                      >
                        الغاء
                      </Button>
                    </Grid>
                  )}
                  {isEnableEndBtn && (
                    <Grid item>
                      <Button
                        variant="contained"
                        onClick={() => { this.setState((state) => ({ open: true })) }}
                        sx={{
                          backgroundColor: '#E2E8EB',
                          color: '#000'
                        }}
                      >
                        إنهاء
                      </Button>
                    </Grid>
                  )}
                  <Grid item>
                    <Grid container direction="row" spacing={2} justifyContent="flex-end">
                      {(page > 0 && !this.state.values.disabledBackButt) && (
                        <Grid item>
                          <Button
                            variant="contained"
                            disabled={page === 1 && this.state.values.formType === LICENSE_FORM_TYPES.RENEW}
                            onClick={this.previous}
                            sx={{
                              backgroundColor: '#E2E8EB',
                              color: '#000'
                            }}
                          >
                            رجوع
                          </Button>
                        </Grid>
                      )}
                      {!isLastPage && (
                        <Grid item>
                          <Button
                            startIcon={submitting ? <CircularProgress size="1rem" /> : null}
                            disabled={!isEnableNextBtn || submitting}
                            variant="contained"
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
                            disabled={values.agree.length == 0 || submitting}
                            variant="contained"
                            color="primary"
                            type="submit"
                          >
                            ارسال
                          </Button>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                {/* {<pre dir="ltr">{JSON.stringify(values, 0, 2)}</pre>}  */}

                {isEnableCancelBtn && (
                  <ConfirmationDialog
                    acceptBtnName="نعم"
                    cancelBtnName="لا"
                    dialogTitle="هل انت متأكد من إلغاء الطلب؟"
                    open={this.state.open}
                    onCloseFn={() => this.setState((state) => ({ open: false }))}
                    onAcceptFn={() => cancelBtnFn()}></ConfirmationDialog>)}
                {isEnableEndBtn && (
                  <ConfirmationDialog
                    acceptBtnName="حفظ مسودة"
                    cancelBtnName="إلغاء الطلب"
                    dialogTitle="هل انت متأكد من إنهاء الطلب؟"
                    open={this.state.open}
                    onEscapeKeyDown={() => {
                      console.log("===================== onEscapeKeyDown")
                      this.setState((state) => ({ open: false }))
                    }
                    }
                    onBackdropClick={() => {
                      console.log("===================== onBackdropClick")
                      console.log(`values: ${JSON.stringify(values)}`)
                      this.setState((state) => ({ open: false }))
                    }
                    }
                    onAcceptFn={() => this.end(values)}
                    onCloseFn={() => {
                      console.log("===================== onCloseFn")
                      this.setState((state) => ({ open: false }))
                      cancelBtnFn()
                    }
                    }></ConfirmationDialog>)}
              </form>
            )
          }}

        </Form>
      </>
    )
  }
}
/* eslint-enable */
