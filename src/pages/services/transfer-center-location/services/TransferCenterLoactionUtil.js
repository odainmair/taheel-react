import { checkIsNumber } from 'src/utils/inputValidator';
import moment from 'moment-hijri';
moment.locale('ar-SA');

const required = 'يجب تعبئة الحقل';
const FielsRequired = 'يرجى ارفاق هذا الملف';
const InvalidDate = 'تاريخ غير صالح';
const OldDate = 'لا يمكن أن يكون تاريخ الإنتهاء قبل تاريخ اليوم';

const AttachementValidation = (values) => {
  var msg = {};
  let currentDate = moment().format('iYYYY/iM/iD');
  let hijriDate = moment(
    `${values.year} / ${values.month} / ${values.day}`,
    'iYYYY/iM/iD'
  );
  let enteredDate = moment(hijriDate).format('iYYYY/iM/iD');

  if (!values.fireDepartmentLicense || !values.fireDepartmentLicense[0])
    msg.fireDepartmentLicense = FielsRequired;

  if (!values.OfficeReport || !values.OfficeReport[0])
    msg.OfficeReport = FielsRequired;

  if (!values.Furniture || !values.Furniture[0]) msg.Furniture = FielsRequired;

  if (!values.municipLicenseNo || !values.municipLicenseNo[0])
    msg.municipLicenseNo = FielsRequired;

  if (!values.day) {
    msg.day = required;
  
  }if(!values.month){
    msg.month=required
  } 
  if(!values.year){
    msg.year=required
  }
   if (!hijriDate.isValid() && !!values.day && !!values.month && !!values.year) {
    msg.day = InvalidDate;
    msg.month = InvalidDate;
    msg.year = InvalidDate;
    console.log(` hijriDate ================> ${values.year} / ${values.month} / ${values.day}`)
  }
  if (moment(enteredDate).isBefore(currentDate)) {
    msg.day = OldDate;
    msg.month = OldDate;
    msg.year = OldDate;
  }

  return msg;
};

const NewAddressValidation = (values) => {
  var msg = {};
  const format = /[^a-zA-Z \u0600-\u065F\u066A-\u06EF\u06FA-\u06FF]/;
  // const EnglishFormat = /[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF]/;

  if (!values.sub) {
    msg.sub = required;
  } else if (format.test(values.sub)) {
    msg.sub = 'يجب ان يحتوي على أحرف فقط';
  }

  if (!values.city) {
    msg.city = required;
  } else if (format.test(values.city)) {
    msg.city = 'يجب ان يحتوي على أحرف فقط';
  }
  if (!values.street) {
    msg.street = required;
  } else if (format.test(values.street)) {
    msg.street = 'يجب ان يحتوي على أحرف فقط';
  }
  if (!values.buildNo) {
    msg.buildNo = required;
  } else if (!checkIsNumber(values.buildNo)) {
    msg.buildNo = 'يجب ان يحتوي رقم المبنى على ارقام فقط';
  } else if (values.buildNo.length != 4) {
    msg.buildNo = 'يجب ان يحتوي الرقم المبنى على 4 خانات';
  }

  if (!values.postalCode) {
    msg.postalCode = required;
  }else if(values.postalCode.length!=5){
    msg.postalCode = 'يجب ان يحتوي الرمز البريدي على خمس أرقام فقط'
  }

  if (!values.additionalNo) {
    msg.additionalNo = required;
  } else if (!checkIsNumber(values.additionalNo)) {
    msg.additionalNo = 'يجب ان يحتوي الرقم الاضافي على ارقام فقط';
  } else if (values?.additionalNo?.length != 4) {
    msg.additionalNo = 'يجب ان يحتوي الرقم الاضافي على 4 خانات';
  }

  return msg;
};

export { AttachementValidation, NewAddressValidation };
