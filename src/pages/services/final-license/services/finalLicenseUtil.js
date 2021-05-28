/* eslint-disable */
const required = 'يجب تعبئة الحقل'
import { Field } from 'react-final-form';
import { Typography } from '@material-ui/core';

const CenterDetailsValidation = values => {
    console.log("values", isNaN(values.CRNumber))
    var msg = {}
    if (!values.CRNumber)
        msg.CRNumber = required
    if (!values.temporaryLicenceNum)
        msg.temporaryLicenceNum = required
    // if (!values.municipLicenseNo)
    //     msg.municipLicenseNo = required

    if (values.CRNumber && isNaN(values.CRNumber))
        msg.CRNumber = "يجب ان يحتوي فقط على ارقام والا يزيد عددها عن 10 خانات"
    return msg
}

const capacityValidation = values => {
    var msg = {}
    if (!values.beneficiariesNum)
        msg.beneficiariesNum = required
    if (!values.buildingArea)
        msg.buildingArea = required
    if (!values.basementArea)
        msg.basementArea = required
    if(values.buildingArea < values.basementArea)
    msg.basementArea = 'مساحة القبو يجب ان تكون أقل من مساحة مسطح البناء'
    return msg
}
const ConditionComp = ({ when, is, children }) => (
    <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => (value == is ? children : null)}
    </Field>
)

const ConditionStaffComp = ({ when, is, children }) => (
    <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => (is.includes(value) ? children : null)}
    </Field>
)

const calculationConditionComp = ({ is, children }) => (    
    <Field subscription={{ value: true }}>
        {(value) => (is ? children : null)}
    </Field>
)
export { CenterDetailsValidation, capacityValidation, ConditionComp, ConditionStaffComp, calculationConditionComp };