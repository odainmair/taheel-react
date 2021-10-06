import { checkIsNumber } from 'src/utils/inputValidator';

const required  ='يجب تعبئة الحقل';

const AttachementValidation = values => {
  var msg = {}
  if (!values.fireDepartmentLicense || !values.fireDepartmentLicense[0])
    msg.fireDepartmentLicense = "يرجى ارفاق هذا الملف";

  if (!values.OfficeReport || !values.OfficeReport[0])
    msg.OfficeReport = "يرجى ارفاق هذا الملف";

  if (!values.Furniture || !values.Furniture[0])
    msg.Furniture = "يرجى ارفاق هذا الملف";

  if (!values.municipLicenseNo || !values.municipLicenseNo[0])
    msg.municipLicenseNo = "يرجى ارفاق هذا الملف";


  if (!values.day || !values.month|| !values.year ) {
    msg.day = required
    msg.month =  required
    msg.year =  required
  }

  



  return msg;
}

const NewAddressValidation = values => {
  var msg = {}
  const format = /[^a-zA-Z \u0600-\u065F\u066A-\u06EF\u06FA-\u06FF]/;
  // const EnglishFormat = /[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF]/;

  if (!values.sub) {
    msg.sub = required
  }else if (format.test(values.sub)){
    msg.sub = 'يجب ان يحتوي على أحرف فقط'
  }

  if (!values.city) {
    msg.city = required
  }else if (format.test(values.city)){
    msg.city = 'يجب ان يحتوي على أحرف فقط'
  }
  if (!values.street) {
    msg.street = required
  }else if (format.test(values.street)){
    msg.street = 'يجب ان يحتوي على أحرف فقط'
  }
if (!values.buildNo) {
  msg.buildNo = required
}else if ( !checkIsNumber(values.buildNo)) {
  msg.buildNo ='يجب ان يحتوي رقم المبنى على ارقام فقط'
}

if (!values.postalCode) {
  msg.postalCode =required
}

if (!values.additionalNo) {
  msg.additionalNo = required
}else if ( !checkIsNumber(values.additionalNo)) {
  msg.additionalNo ='يجب ان يحتوي الرقم الاضافي على ارقام فقط'
}else if (values?.additionalNo?.length != 4 ) {
  msg.additionalNo ='يجب ان يحتوي الرقم الاضافي على 4 خانات'
}

return msg;
}

export { AttachementValidation, NewAddressValidation };