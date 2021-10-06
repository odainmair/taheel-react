const required = 'يجب تعبئة الحقل';

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


  if (!values.day || !values.month || !values.year) {
    msg.day = required
    msg.month = required
    msg.year = required
  }
  return msg;
}

const NewAddressValidation = values => {
  var msg = {}
  if (!values.sub) {
    msg.sub = required
  }
  if (!values.city) {
    msg.city = required
  }
  if (!values.street) {
    msg.street = required
  }
  if (!values.buildNo) {
    msg.buildNo = required
  }
  if (!values.postalCode) {
    msg.postalCode = required
  }
  if (!values.additionalNo) {
    msg.additionalNo = required
  }
  // console.log("values.additionalNo++++ ", values.additionalNo)
  // console.log("length++++ ", values.additionalNo.length)

  if (values?.additionalNo?.length != 4) {
    // console.log("length++++ ", values.additionalNo.length)

    msg.additionalNo = 'يجب ان يحتوي الرقم الاضافي على 4 خانات'
  }
  return msg;
}

export { AttachementValidation, NewAddressValidation };