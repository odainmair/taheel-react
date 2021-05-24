/* eslint-disable */
const required = 'يجب تعبئة الحقل'
import { Field } from 'react-final-form';
import { Typography } from '@material-ui/core';

const CenterDetailsValidation = values => {
    console.log("values", isNaN(values.commRegistrNo))
    var msg = {}
    if (!values.commRegistrNo)
        msg.commRegistrNo = required
    if (!values.temporaryLicenceNum)
        msg.temporaryLicenceNum = required
    if (!values.municipLicenseNo)
        msg.municipLicenseNo = required

    if (values.commRegistrNo && isNaN(values.commRegistrNo))
        msg.commRegistrNo = "يجب ان يحتوي فقط على ارقام والا يزيد عددها عن 10 خانات"
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
    <Field subscription={{ value: true }}>
        {(value) => (is ? children : null)}
    </Field>
)
export { CenterDetailsValidation, capacityValidation, ConditionComp };