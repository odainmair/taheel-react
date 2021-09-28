/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import {
  Grid,
  Button,
  MenuItem,
  Typography,
  Alert,
  CircularProgress,
} from '@material-ui/core';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';
import { TextField as TextFieldFinal, Select } from 'final-form-material-ui';
import { useState } from 'react';
import { validateCompanyFunc } from '../services/finalLicenseAPI'
import { getMunicipalLicenseNoApi } from '../services/finalLicenseAPI'
import { CentertDetails } from '../services/finalLicenseAPI'
import { ContentField } from '../services/finalLicenseUtil'
import { OnChange } from 'react-final-form-listeners';

const CenterDetails = ({ editMode, setEditMode, Condition, values, temporaryLicenses, setField, setIsEnableNextBtn, fromDraft }) => {
  const [loading, setLoading] = useState(false);
  const [checkData, setCheckData] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  useEffect(() => {
    console.log(" -- CenterDetails -- useEffect");
    console.log(" -- CenterDetails -- fromDraft " + fromDraft);
    console.log(" -- CenterDetails -- useEffect" + JSON.stringify(values));
    if (values.municipLicenseNo) {
      console.log("-- CenterDetails -- useEffect  -- if");
      setCheckData(true);
      setIsEnableNextBtn(true);
    }
    if (fromDraft) {
      setIsEnableNextBtn(false);
      setCheckData(true)
    }
  }, []);

  const checkLicenseCert = async () => {
    setLoading(true);
    setErrMessage('');
    if (!values.temporaryLicenceNum) {
      setErrMessage('يرجى اختيار رقم الترخيص المؤقت');
      setLoading(false);
      return;
    }
    if (!values.CRNumber) {
      setErrMessage('يرجى إدخال رقم السجل تجاري');
      setLoading(false);
      return;
    }
    console.log(`CRNumber vaildate ${!isNaN(values.CRNumber) && values.CRNumber.length !== 10}`)
    if (values.CRNumber.length > 10) {
      setErrMessage('يجب ان لا يزيد رقم السجل تجاري عن 10 خانات');
      setLoading(false);
      return;
    }
    const getMunicipalLicenseRs = await getMunicipalLicenseNoApi(values.CRNumber);
    if (!getMunicipalLicenseRs.isSuccessful) {
      setErrMessage(getMunicipalLicenseRs.message);
      setLoading(false);
      return;
    }
    setField('municipLicenseNo', getMunicipalLicenseRs.responseBody.body.MomraLicense);

    const isSuccessgetCentertDetailsRs = await getCentertDetails();
    if (!isSuccessgetCentertDetailsRs) {
      setLoading(false);
      return;
    }



    const validateCompanyRs = await validateCompanyFunc(values.CRNumber)
    if (!validateCompanyRs.isSuccessful) {

      setErrMessage(validateCompanyRs.message);
      setCheckData(false);
    } else {
      const { CRName, Activities, IssueDate, ExpiryDate } = validateCompanyRs.responseBody.data;
      setField('companyName', CRName);
      setField('activities', Activities);
      setField('crIssueDate', IssueDate);
      setField('crExpirationDate', ExpiryDate);
      setCheckData(true);
      setIsEnableNextBtn(true);

    }

    setLoading(false);
  }


  const getCentertDetails = async () => {
    if (values.temporaryLicenceNum) {
      const response = await CentertDetails(values.temporaryLicenceNum)
      if (!response.isSuccessful) {
        setErrMessage(response.message)
        return false;
      } else {
        setField('centerParentType', response.responseBody.data.center.centerParentType)
        setField('centerFirstSubType', response.responseBody.data.center.centerFirstSubType)
        setField('centerSecondSubType', response.responseBody.data.center.centerSecondSubType)
        setField('crInfo_r', response.responseBody.data.center.crInfo_r.ID)
        setField('centerInfo_r', response.responseBody.data.center.centerInfo_r.ID)
        if (response.responseBody.data.center.healthCareServices_r) {
          setField('healthCareServices_r', response.responseBody.data.center.healthCareServices_r.ID)
        }
        // setField('healthCareServices_r', response.responseBody.data.center.healthCareServices_r)
        return true;
      }
    }
  }
  const handleOnChange = (val, nextVal) => {
    setIsEnableNextBtn(false);
  };

  return (
    <>
      <Grid
        container
        spacing={3}
        mt={3}
      >
        <Grid
          item
          md={12}
          xs={12}
        >
          {errMessage && (
            <Alert variant="outlined" severity="error">
              {errMessage}
            </Alert>
          )}
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
          className="custom-label-field"
        >
          {!editMode ?
            <Field
              fullWidth
              label="رقم الترخيص المؤقت"
              name="temporaryLicenceNum"
              component={Select}
              required
              dir="rtl"
              variant="outlined"
              className="custom-field"
              formControlProps={{ fullWidth: true }}
            >
              {temporaryLicenses.map((license, index) => <MenuItem key={index} value={license.licenceNumber}>{license.licenceNumber}</MenuItem>)}
            </Field>
            :
            <Field
              disabled={!fromDraft}
              fullWidth
              required
              label="رقم الترخيص المؤقت"
              name="temporaryLicenceNum"
              component={fromDraft ? Select : TextFieldFinal}
              type={fromDraft ? "" : "text"}
              variant="outlined"
              dir="rtl"
              className="custom-field"
              formControlProps={{ fullWidth: fromDraft ? true : false }}
            >
              {temporaryLicenses.map((license, index) => <MenuItem key={index} value={license.licenceNumber}>{license.licenceNumber}</MenuItem>)}
            </Field>
          }
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
          className="custom-label-field"
        >
          <Field
            fullWidth
            required
            label="رقم السجل التجاري"
            name="CRNumber"
            component={TextFieldFinal}
            type="number"
            variant="outlined"
            dir="rtl"
            className="custom-field"
          />
          <OnChange name="CRNumber">
            {(value, previous) => {
              handleOnChange(value, previous);
            }}
          </OnChange>
        </Grid>

        <Grid
          item
          md={6}
          xs={12}
        >
          <Button
            startIcon={loading ? <CircularProgress size="1rem" /> : null}
            variant='outlined'
            type="button"
            disabled={loading}
            sx={{
              height: 55,
              backgroundColor: 'white',
              width: '100%',
              color: '#3c8084',
              ':hover': {
                backgroundColor: '#3c8084',
                color: 'white',
              }
            }}
            onClick={checkLicenseCert}
          >
            تحقق
          </Button>
        </Grid>
        <Grid
          item
          md={12}
          xs={12}
        >
          <Condition is={checkData || editMode}>
            <Grid
              container
              mt={3}
              mb={3}
            >

              <Grid
                item
                md={6}
                xs={12}
                className="custom-label-field"
              >
                < ContentField label="رقم رخصة البلدية" value={values.municipLicenseNo} />
              </Grid>
              <Grid
                container
                spacing={3}
                mt={3}
                mb={3}
              >
                <Grid
                  item
                  lg={12}
                  md={12}
                  xs={12}
                >
                  < ContentField label='اسم المركز' value={values.companyName} />
                </Grid>
                <Grid
                  item
                  lg={12}
                  md={12}
                  xs={12}
                >
                  < ContentField label='نشاط السجل التجاري' value={values.activities} />
                </Grid>
              </Grid>
            </Grid>
          </Condition>
        </Grid>

      </Grid>
    </>
  )
};

export default CenterDetails;

CenterDetails.propTypes = {
  Condition: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  temporaryLicenses: PropTypes.array.isRequired,
  setField: PropTypes.func.isRequired,
  setIsEnableNextBtn: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  setEditMode: PropTypes.func.isRequired,
  fromDraft: PropTypes.bool,
};