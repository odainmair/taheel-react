/* eslint-disable */
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCurrentUser } from 'src/utils/UserLocalStorage';
import { useState, useEffect } from 'react';
import Summary from './sections/Summary'
import { getCenters, CentertDetails, getMunicipalLicenseNoApi, createFinalLicenseRenewalAPIFunc, validateCompanyFunc } from './services/finalLicenseAPI'
import { getStaff, CenterDetailsValidation } from './services/finalLicenseUtil';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Container,
  Alert,
  CircularProgress,
  Grid,
  MenuItem
} from '@material-ui/core';
import FinalFormSummary from '../../../components/summary/FinalFormSummary';
import AlertDialog from 'src/components/AlertDialog';
import { Field } from 'react-final-form';
import { TextField as TextFieldFinal, Select } from 'final-form-material-ui';
import { OnChange } from 'react-final-form-listeners';
import dateFormatter from 'src/utils/dateFormatter';

const CreateFinalLicenseRenewal = () => {
  const [renewableLicenses, setRenewableLicenses] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEnableNextBtn, setIsEnableNextBtn] = useState(true);
  const [dialogContent, setDialogContent] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [centerLicenceNumber, setCenterLicenceNumber] = useState(location.state ? location.state.centerLicenceNumber : "1");
  const [editMode, setEditMode] = useState(false);
  const [editInitValues, setEditInitValues] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showSummary, setShowSummary] = useState(false);
  const [errMessage, SetErrMessage] = useState('')
  const taskID = location.state ? location.state.taskID : null;

  useEffect(async () => {
    console.log(" ==> CreateFinalLicenseRenewal ")
    const { email } = await getCurrentUser();
    console.log("------------------------------- email " + email)
    const getCentersRs = await getCenters(email);

    SetErrMessage("");
    if (!getCentersRs.isSuccessful) {
      SetErrMessage(getCentersRs.message);
      setIsLoading(false);
    } else {
      const { Centers } = getCentersRs.responseBody.data;
      setRenewableLicenses(Centers);
      setIsLoading(false);
    }
    console.log("------------------------------- centerLicenceNumber: " + centerLicenceNumber)
  }, [])

  const getCentertDetails = async (licenceNumber) => {
    setIsLoading(true)
    SetErrMessage("");
    const response = await CentertDetails(licenceNumber)
    console.log("===> getCentertDetails response: " + JSON.stringify(response) )
    
    if(response.responseBody && response.responseBody.data && response.responseBody.data.center) {
      // const crNum = "654";
      const crNum = response.responseBody.data.center.crInfo_r.crNumber;

      if(crNum != ''){
        const validateMomraRs = await getMunicipalLicenseNoApi(crNum)
        if(!validateMomraRs.isSuccessful){
          console.log("===> getMunicipalLicenseNoApi ERROR!: " + validateMomraRs.message)
          SetErrMessage(validateMomraRs.message);
          setEditInitValues(response.responseBody.data);
          setIsLoading(false);
          setShowSummary(false);
          return response.responseBody.data;
        }
        const validateCompanyRs = await validateCompanyFunc(crNum)
        if (!validateCompanyRs.isSuccessful) {
          console.log("===> validateCompanyFunc ERROR!: " + validateCompanyRs.message)
          SetErrMessage(validateCompanyRs.message);
          setEditInitValues(response.responseBody.data);
          setIsLoading(false);
          setShowSummary(false);
          return response.responseBody.data;
        }
      }
      else {
        console.log(' ===> ERROR Wrong Data - No CrNumber, => response' + JSON.stringify(response))
        SetErrMessage("Wrong Data - No CrNumber");
        setEditInitValues(response.responseBody.data);
        setIsLoading(false);
        setShowSummary(false);
        return
      }
    }
    
    if (!response.isSuccessful){
      SetErrMessage(response.message);
    }
    else {
      setEditInitValues(response.responseBody.data);
      setEditMode(true);
      setIsLoading(false);
      setShowSummary(true);
      return response.responseBody.data;
    }
  }

  const onSubmit = async (values) => {
    console.log("===================== onSubmit")
    let response = null
    // if (!editMode) {
      response = await createFinalLicenseRenewalAPIFunc(values);
      handleClickOpen(`${response.responseBody.data[0]}`, '');
  };

  const handleClickOpen = (dialogContent, dialogTitle) => {
    setDialogContent(dialogContent);
    setDialogTitle(dialogTitle)
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    navigate('/app/dashboard', { replace: true });
  };

  const reverseRange = (s) => {
    const range = s.trim().split('-')
    return `${range[0]} - ${range[1]}`;
  }
  return (
    <Container maxWidth="md">
      <Card>
        <CardHeader
          title="طلب تجديد رخصة نهائية"
        />
        <Divider />
        {errMessage && (
          <Alert variant="outlined" severity="error">
            {errMessage}
          </Alert>
        )}
        <CardContent>
          {!isLoading ?
            <>
              {/* {!editMode &&
                <Alert severity="error" style={{ position: 'fixed', color: 'white', background: 'red', top: 50, right: 0, width: '100%', zIndex: 100, opacity: 0.8 }}>
                  {editInitValues.chairmanComment.comment}
                </Alert>
              } */}
              <FinalFormSummary
                initialValues={!editMode ? {
                  agree: [],
                  managersCount: 0,
                  teachersCount: 0,
                  beneficiariesNum: 0,
                  centerLicenceNumber: "1"
                } : {
                  centerLicenceNumber: editInitValues.center && editInitValues.center.licenceNumber,
                  agree: [],
                  managersCount: 0,
                  teachersCount: 0,
                  companyName: editInitValues.center && editInitValues.center.name,
                  temporaryLicenceNum: editInitValues.center && editInitValues.center.licenceNumber,
                  licenseCreationDate: editInitValues.center && dateFormatter(editInitValues.center.creationDate),
                  licenseExpiryDate: editInitValues.center && dateFormatter(editInitValues.center.expirationDate),
                  ownerName: editInitValues.center && editInitValues.center.ownerName,
                  ownerID: editInitValues.center && editInitValues.center.ownerID,
                  centerAgeGroup: editInitValues.center && reverseRange(editInitValues.center.ageGroup),
                  centerGenderGroup: editInitValues.center 
                  && editInitValues.center.targetedGender && 
                    (editInitValues.center.targetedGender === "m" ? "ذكر" : (editInitValues.center.targetedGender === "f" ? "انثى" :"كلا الجنسين")) ,
                  CRNumber: editInitValues.center && editInitValues.center.crInfo_r.crNumber,
                  activities: editInitValues.center && editInitValues.center.crInfo_r.crActivityType,
                  municipLicenseNo: editInitValues.center && editInitValues.center.crInfo_r.MoMRA_Licence,
                  beneficiariesNum: editInitValues.center && editInitValues.center.centerInfo_r.beneficiaryCount,
                  capacity: editInitValues.center && editInitValues.center.centerInfo_r.carryingnumber,
                  financialGuarantee: editInitValues.center && `${editInitValues.center.centerInfo_r.financialGuarantee} ر.س.`,
                  buildingArea: editInitValues.center && editInitValues.center.centerInfo_r.buildingArea,
                  basementArea: editInitValues.center && editInitValues.center.centerInfo_r.basementArea,
                  // OperationalPlan: [editInitValues.center.centerInfo_r.operationPlan.id],
                  OperationalPlan: [12403],
                  ExecutivePlan: [editInitValues.center && editInitValues.center.centerInfo_r.executivePlan && editInitValues.center.centerInfo_r.executivePlan.id],
                  OfficeReport: [editInitValues.center && editInitValues.center.centerInfo_r.engineeringPlan && editInitValues.center.centerInfo_r.engineeringPlan.id],
                  SecurityReport: [editInitValues.center && editInitValues.center.centerInfo_r.securityReport && editInitValues.center.centerInfo_r.securityReport.id],
                  Furniture: [editInitValues.center && editInitValues.center.centerInfo_r && editInitValues.center.centerInfo_r.carryingnumber],
                  // Furniture: [1202],
                  FinancialGuaranteeAtt: [editInitValues.center && editInitValues.center.centerInfo_r.financialGuarbteeAtt && editInitValues.center.centerInfo_r.financialGuarbteeAtt.id],
                  healthServices: editInitValues.center && editInitValues.center.isHealthCareServices ? "yes" : "no",
                  healthServiceType: editInitValues.center && editInitValues.center.healthCareServices_r && editInitValues.center.healthCareServices_r.type && editInitValues.center.healthCareServices_r.type,
                  healthServiceAttachment: [editInitValues.center.centerInfo_r && editInitValues.center.centerInfo_r.financialGuarbteeAtt && editInitValues.center.centerInfo_r.financialGuarbteeAtt.id],
                  // healthServiceAttachment: [1202],
                  // customers: editInitValues && editInitValues.staff,
                  customers: editInitValues && getStaff(editInitValues.staff),
                }}
                isEnableNextBtn={isEnableNextBtn}
                showSummary={showSummary}
                onSubmit={onSubmit}
                
              >
                <FinalFormRenewalSummary 
                  validate={CenterDetailsValidation}
                  renewableLicenses={renewableLicenses} 
                  setCenterLicenceNumber={setCenterLicenceNumber} 
                  showSummary={showSummary}
                  setShowSummary={setShowSummary}
                  getCentertDetails={getCentertDetails}/>
              </FinalFormSummary>
            </>
            :
            <CircularProgress size="15rem" style={{
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto', color: '#E2E8EB'
            }} />
          }
        </CardContent>
      </Card>
      <AlertDialog dialogContent={dialogContent} dialogTitle={dialogTitle} open={open} onClose={handleClose} acceptBtnName="تم" />
    </Container>
  );
};

const FinalFormRenewalSummary = ({ setField, renewableLicenses, values, setCenterLicenceNumber, getCentertDetails, showSummary, setShowSummary }) => {
  return (
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
          label="رقم الترخيص النهائي"
          name="centerLicenceNumber"
          component={Select}
          required
          dir="rtl"
          variant="outlined"
          className="custom-field"
          formControlProps={{ fullWidth: true }}
          disabled={!Array.isArray(renewableLicenses) || !renewableLicenses.length}
        >
          <MenuItem value="1" key="1" selected={true}>اختيار</MenuItem>
          <MenuItem value="0101020060" key="0101020060" >0101020060</MenuItem>
          {renewableLicenses.map(item => (
            <MenuItem key={item.licenceNumber} value={item.licenceNumber}>{item.licenceNumber}</MenuItem>
          ))}
        </Field>
        <OnChange name="centerLicenceNumber">
          {async (value) => {
            console.log(`centerLicenceNumber + ${value}`);
            if(value != 1){
              await getCentertDetails(value);
            } 
            else {
              setShowSummary(false);
            }
          }}
        </OnChange>
      </Grid>
      <Grid
          item
          md={6}
          xs={12}
          className="custom-label-field"
        >
      </Grid>
    </Grid>
    { showSummary && <Summary
      values={values}
      renewableLicenses={renewableLicenses}
      setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
    />
    }
  </>
)}

export default CreateFinalLicenseRenewal;
