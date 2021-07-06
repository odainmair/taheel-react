import { values } from "lodash-es";
import { checkEmailPattern } from "src/utils/inputValidator";

const required = 'يجب تعبئة الحقل'

const CredentialValidation = values => {
  var msg = {}
  if (!values.email)
    msg.email = required;
  else if (!checkEmailPattern(values.email)) {
    msg.email = 'يرجى ادخال البريد الكتروني صحيح';
  }
  if (!values.password)
    msg.password = required;
  return msg;
}

const smsOtpValidate = values => {
  var msg = {}
  if (!values.verificationCode)
    msg.verificationCode = required;
  return msg;
}

export { CredentialValidation, smsOtpValidate }