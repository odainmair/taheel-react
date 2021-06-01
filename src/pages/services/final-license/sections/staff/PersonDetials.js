/* eslint-disable */
import React from 'react';
import {
  Button,
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  IconButton,
  Typography,
  Link,
  Box,
} from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import AlertDialog from 'src/components/AlertDialog';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FieldArray } from "react-final-form-arrays";
import FormDialog from 'src/components/FormDialog';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddPersonForm from './AddPersonForm';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { downloadDocument } from '../../services/finalLicenseAPI'
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { makeStyles } from '@material-ui/core/styles';
import { DownloadButt } from '../../services/finalLicenseUtil'
import moment from 'moment-hijri';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const Row = ({ managersCount, setManagersCount, SponsorName, setSponsorName, values, fromEdit, setFromEdit, fieldName, setFieldName, open, setOpen, setField, fields, name, index }) => {
  const classes = useRowStyles();
  const [showen, setShowen] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true);
  };
  const downloadFileFn = async (licenseNumber) => {
    console.log("responseresponse", licenseNumber)
    const downloadDoc = downloadDocument(licenseNumber, true)
  }





  return (
    <>

      <TableRow   >
        {console.log("name", fields.value[index].cv)}
        <Field
          label="fullName"
          name={`${name}.fullName`}
          component={CustomTableCell}
        />

        {!fields.value[index].idNumber ?
          <>
            {setSponsorName(true)}
            <Field
              label="iqamaNo"
              name={`${name}.iqamaNo`}
              component={CustomTableCell}
            />
          </>
          :
          <Field
            label="idNumber"
            name={`${name}.idNumber`}
            component={CustomTableCell}
          />
        }

        <TableCell >

          {moment(`${fields.value[index].birthDate}`, 'iYYYYiMMiDD').format('iDD/iMM/iYYYY')}
        </TableCell>

        <Field
          label="staffTypes"
          name={`${name}.staffTypes`}
          component={CustomTableCell}
        />
        <Field
          label="gender"
          name={`${name}.gender`}
          component={CustomTableCell}
        />

        <Field
          label="nationality"
          name={`${name}.nationality`}
          component={CustomTableCell}
        />

        {SponsorName &&
          <Field
            label="SponsorName"
            name={`${name}.SponsorName`}
            component={CustomTableCell}
          />

        }


        <TableCell>
          <IconButton onClick={() => setShowen(!showen)}>
            {showen ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </TableCell>

        <TableCell>
          <IconButton
            color="primary"
            component="span"
            onClick={() => {
              setFromEdit(true)
              console.log("-- name :" + name);
              setFieldName(name);
              console.log('fields.value[index]', JSON.stringify(fields));
              const { idNumber, iqamaNo, lastName, nationality, day, month, year, fullName, gender, birthDate, staffTypes, cv } = fields.value[index];

              // setField("fullName", fullName);
              setField("idNumber", idNumber);
              setField("iqamaNo", iqamaNo);
              setField("nationality", nationality)
              setField("day", day);
              setField("month", month);
              setField("year", year);
              setField("fullName", fullName)
              setField("gender", gender)
              setField("birthDate", birthDate)
              setField("staffTypes", staffTypes)
              setField("cv", cv)

              handleClickOpen();
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="primary"
            component="span"
            onClick={() => {
              var customers =[...values.customers]
              fields.remove(index);
              var managersCount = values.customers.filter(customer=>customer.staffTypes === "مدير" ).length
              {console.log('Delete  values.customers.', values.customers)}
              setField('managersCount', managersCount)
              setField("nationality", "")
              setField("idNumber", "");
              setField("iqamaNo", "");
              setField("day", "");
              setField("month", "");
              setField("year", "");
              
            }}
          >
            <DeleteForeverIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow className={classes.root}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={showen} timeout="auto" unmountOnExit  >

            <Grid
              container
              spacing={2}
            >
              <Grid
                item
                lg={4}
                md={6}
                xs={12}
              >
                < DownloadButt docIDs={fields.value[index].cv} name={`${name}.cv`} label='السيرة الذاتية' />


                {/* <Button
                name={`${name}.cv`}
                variant="contained"
                color="primary"
                startIcon={<CloudDownloadIcon />}
                onClick={() => downloadFileFn(fields.value[index].cv)}
              >
                تنزيل
          </Button> */}

              </Grid>
              <Grid
                item
                lg={4}
                md={6}
                xs={12}

              >
                < DownloadButt docIDs={fields.value[index].EducationalQualification} name={`${name}.EducationalQualification`} label='المؤهلات التعليمية' />

                {/* <Button
                name={`${name}.EducationalQualification`}
                variant="contained"
                color="primary"
                startIcon={<CloudDownloadIcon />}
                onClick={() => downloadFileFn(fields.value[index].EducationalQualification)}
              >
                تنزيل
          </Button> */}

              </Grid>
              <Grid
                item
                lg={4}
                md={6}
                xs={12}

              >
                {console.log('fields.value[index].staffTypes', fields.value[index].staffTypes)}
                {['أخصائي علاج طبيعي', 'أخصائي علاج وظيفي', 'أخصائي نطق و تخاطب'].includes(fields.value[index].staffTypes) &&
                  < DownloadButt docIDs={fields.value[index].MedicalPractice} name={`${name}.MedicalPractice`} label='رخضة المزاولة' />

                  //   <Button
                  //     name={`${name}.MedicalPractice`}
                  //     variant="contained"
                  //     color="primary"
                  //     startIcon={<CloudDownloadIcon />}
                  //     onClick={() => downloadFileFn(fields.value[index].MedicalPractice)}
                  //   >
                  //     تنزيل
                  //  </Button>
                }
              </Grid>
            </Grid>
          </Collapse >
        </TableCell>
      </TableRow>

    </>)

}

const PersonDetials = ({ Condition, MedicalPracticeCondition, setField, pop, push, values }) => {
  const [open, setOpen] = React.useState(false);
  const [fieldName, setFieldName] = React.useState(null);
  const [fromEdit, setFromEdit] = React.useState(false)
  const [SponsorName, setSponsorName] = React.useState(false)
  const [dialogContent, setDialogContent] = React.useState("");
  const [dialogTitle, setDialogTitle] = React.useState("");
  const [openInfo, setOpenInfo] = React.useState(false);
  var [managersCount, setManagersCount] = React.useState(0);

  // React.useEffect( () => {
  //   console.log("I'mmmm Here ppppppoooooooooooooopuuuuuuuup")
  //   handleClickOpenInfo(`في حال مطالبة المركز لأخذ الترخيص للعمل في فترتين (صباحية و مسائية) فيجب مراعاة أن يتم توفير كوادر مختلفة لكل فترة" قبل ادخال الكادر`, '')
  // })

  // const getMangersAcount = () => {
  //   if(values.customers){
  //    managersCount = values.customers.filter(customer => customer.staffTypes === "مدير").length
  //   console.log('Delete  values.customers.', values.customers) 
  //   // setManagersCount(managersCount)
  //             setField('managersCount', managersCount)
    
  //   }
  // }


  const managersCountComp = ({ input: { value, name }, label, type, inputType }) => (
    <span>
      <IconButton>
        {console.log('.......managersCount??',value)}
        {/* {value ==0  ?   < CheckCircleIcon style={{ color: '#04AA6D' }} />:  < CheckCircleIcon style={{ color: 'gray' }} />} */}

        {value > 0 ? <>  {value === 1 ? < CheckCircleIcon style={{ color: '#04AA6D' }} /> : < CheckCircleIcon style={{ color: 'red' }} />} </> : < CheckCircleIcon style={{ color: 'gray' }} />}
      </IconButton>
    </span>

  )

  const handleClickOpenInfo = (dialogContent, dialogTitle) => {
    setDialogContent(dialogContent);
    setDialogTitle(dialogTitle)
    setOpenInfo(true);
  };
  const handleCloseInfo = (value) => {
    setOpenInfo(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  // getMangersAcount()
  return (
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
        <Typography
          color="textSecondary"
          variant="h2"

        >متطلبات قائمة الكوادر</Typography>


        <Typography
          color="textSecondary"
          variant="body1"
          sx={{
            mt: 3
          }}

        >
               <Field
                            label={'manager'}
                            name={'managersCount'}
                            component={managersCountComp}
                        />
          مدير عدد 1
        <Link
            onClick={() => handleClickOpenInfo(`يسمح بتحديد عدد مدير #1 فقط  `, '')}
            sx={{
              mt: 3,
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
            variant="h6"
          >
            المزيد من المعلومات
        </Link>
        </Typography>

        <Typography
          color="textSecondary"
          variant="body1"

        >
          {/* '#04AA6D' */}
          <span>
            <IconButton>
            
            { values.teachersCount >=1  ? <>  {values.beneficiariesNum/8 <= values.teachersCount  ? < CheckCircleIcon style={{ color: '#04AA6D' }} /> : < CheckCircleIcon style={{ color: 'red' }} />} </> : < CheckCircleIcon style={{ color: 'gray' }} />}
            </IconButton>
          </span>
          معلم تربية خاصة نسبة 1 الى 8
        <Link
            onClick={() => handleClickOpenInfo(`-تقوم المنصة باحتساب عدد # كادر معلم تربية خاصة وذلك حسب : 

         (على الاقل 1 لكل 8 مستفيد من عدد المستفيدين المطلوب )`, '')}
            sx={{
              // paddingBottom: '16px',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
            variant="h6"
          >
            المزيد من المعلومات
        </Link>
        </Typography>
        <Button
          sx={{ mt: 5 }}
          variant="outlined"
          color="primary"
          fullWidth
          endIcon={<AddIcon style={{ marginRight: 10 }} />}
          onClick={() => {
            // setField("fullName", fullName);
            setFromEdit(false)
            setField("nationality", "")
            setField("idNumber", "");
            setField("iqamaNo", "");
            setField("day", "");
            setField("month", "");
            setField("year", "");
            setField("fullName", "")
            setField("gender", "")
            setField("birthDate", "")
            setField("staffTypes", "")
            setField("cv", "")
            setFieldName(null);
            handleClickOpen();
          }}
        >
          اضافة كادر
          </Button>
      </Grid>
      <Grid
        item
        md={12}
        xs={12}
        className="custom-label-field"
      >
        <TableContainer>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell > الاسم الكامل </TableCell>
                <TableCell > رقم الهوية/الاإقامة </TableCell>
                <TableCell > تاريخ الميلاد </TableCell>
                <TableCell > نوع الكادر </TableCell>
                <TableCell > الجنس </TableCell>
                <TableCell > الجنسية</TableCell>
                {SponsorName &&
                  <TableCell > اسم الكفيل</TableCell>
                }
                <TableCell >المرفقات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              <FieldArray name="customers">
                {({ fields }) => fields.map((name, index) => (
                  <Row managersCount={managersCount} setManagersCount={setManagersCount}  SponsorName={SponsorName} setSponsorName={setSponsorName} values={values} fromEdit={fromEdit} setFromEdit={setFromEdit} fieldName={fieldName} setFieldName={setFieldName} open={open} setOpen={setOpen} setField={setField} fields={fields} name={name} index={index} />
                ))}
              </FieldArray>

            </TableBody>
          </Table>
        </TableContainer>
        <AlertDialog dialogContent={dialogContent} dialogTitle={dialogTitle} open={openInfo} onClose={handleCloseInfo} acceptBtnName="تم" />

      </Grid>
      <Grid
        item
        md={6}
        xs={12}
        className="custom-label-field"
      />
      <FormDialog
        title=" اضافة كادر"
        openPopup={open}
        setOpenPopup={setOpen}
        onClose={() => {
          // setField("lastName", "");
          setField("nationality", "")
          setField("idNumber", "");
          setField("iqamaNo", "");
          setField("day", "");
          setField("month", "");
          setField("year", "");
          setField("fullName", "")
          setField("gender", "")
          setField("birthDate", "")
          setField("staffTypes", "")
          setField("cv", "")
        }}
      >
        <AddPersonForm fromEdit={fromEdit} MedicalPracticeCondition={MedicalPracticeCondition} setField={setField} pop={pop} push={push} values={values} setOpenPopup={setOpen} fieldName={fieldName} Condition={Condition} />
      </FormDialog>
    </Grid>
  );
};
const CustomTableCell = ({ input: { value, name }, label }) => (
  <>
    <TableCell component="th" scope="row">
      {value}
      {/* {name === 'customers[3].idNumber' && !value? 4 : value} */}
    </TableCell>
  </>
)
export default PersonDetials;
PersonDetials.propTypes = {
  Condition: PropTypes.func.isRequired,
  setField: PropTypes.func.isRequired,
  pop: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  values: PropTypes.func.isRequired,
  input: PropTypes.func.isRequired,
};
