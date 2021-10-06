import { values } from "lodash-es";
import { checkEmailPattern } from "src/utils/inputValidator";

const required = 'يجب تعبئة الحقل'

const CommissionerValidation = values => {
  var msg = {}
  if (!values.email)
    msg.email = required;
  else if (!checkEmailPattern(values.email)) {
    msg.email = 'يرجى ادخال البريد الكتروني صحيح';
  }
  if (!values.jobTitle)
    msg.jobTitle = required;

    if (!values.staffId)
    msg.staffId = required;
  return msg;
}

export { CommissionerValidation }