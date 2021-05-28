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
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FieldArray } from "react-final-form-arrays";
import FormDialog from 'src/components/FormDialog';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddPersonForm from './AddPersonForm';
const PersonDetials = ({ Condition, StaffCondition, setField, pop, push, values }) => {
  const [open, setOpen] = React.useState(false);
  const [fieldName, setFieldName] = React.useState(null);
  const [fromEdit, setFromEdit] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true);
  };
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
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          endIcon={<AddIcon />}
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
            setField("staffTypes", "")
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
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell> الاسم الكامل </TableCell>
                <TableCell> رقم الهوية/الاإقامة </TableCell>
                <TableCell> نوع الكادر </TableCell>
                <TableCell> الجنس </TableCell>
                <TableCell> الجنسية</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <FieldArray name="customers">
                {({ fields }) => fields.map((name, index) => (
                  <TableRow key={name}>
                    {console.log("name", fields.value[index].idNumber)}
                    <Field
                      label="fullName"
                      name={`${name}.fullName`}
                      component={CustomTableCell}
                    />

                    {!fields.value[index].idNumber ?  
                        <Field
                        label="iqamaNo"
                        name={`${name}.iqamaNo`}
                        component={CustomTableCell}
                      />
                      :
                      <Field
                      label="idNumber"
                      name={`${name}.idNumber`}
                      component={CustomTableCell}
                    />
                  
                    }
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


                    <TableCell>
                      <IconButton
                        color="primary"
                        component="span"
                        onClick={() => {
                          setFromEdit(true)
                          console.log("-- name :" + name);
                          // setFieldName(name);
                          console.log('fields.value[index]', JSON.stringify(fields));
                          const { idNumber, iqamaNo, lastName, nationality, day, month, year, fullName, gender, staffTypes } = fields.value[index];

                          // setField("fullName", fullName);
                          setField("idNumber", idNumber);
                          setField("iqamaNo", iqamaNo);
                          setField("nationality", nationality)
                          setField("day", day);
                          setField("month", month);
                          setField("year", year);
                          setField("fullName", fullName)
                          setField("gender", gender)
                          setField("staffTypes", staffTypes)

                          handleClickOpen();
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        component="span"
                        onClick={() => {
                          fields.remove(index);
                          // setField("lastName", "");
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
                ))}
              </FieldArray>
            </TableBody>
          </Table>
        </TableContainer>
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
          setField("staffTypes", "")
        }}
      >
        <AddPersonForm fromEdit={fromEdit} StaffCondition={StaffCondition} setField={setField} pop={pop} push={push} values={values} setOpenPopup={setOpen} fieldName={fieldName} Condition={Condition} />
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
