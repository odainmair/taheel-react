import moment from 'moment-hijri';
moment.locale('ar-SA');

const required = 'يجب تعبئة الحقل';
const FielsRequired = 'يرجى ارفاق هذا الملف';
const InvalidDate = 'تاريخ غير صالح';

const AttachementValidation = (values) => {
  var msg = {};
  if (!values.fireDepartmentLicense || !values.fireDepartmentLicense[0])
    msg.fireDepartmentLicense = FielsRequired;

  if (!values.OfficeReport || !values.OfficeReport[0])
    msg.OfficeReport = FielsRequired;

  if (!values.Furniture || !values.Furniture[0]) msg.Furniture = FielsRequired;

  if (!values.municipLicenseNo || !values.municipLicenseNo[0])
    msg.municipLicenseNo = FielsRequired;

  if (!values.day || !values.month || !values.year) {
    msg.day = required;
    msg.month = required;
    msg.year = required;
  }

  let currentDate = moment().format('iYYYY/iM/iD');
  let hijriDate = moment(
    `${values.year} / ${values.month} / ${values.day}`,
    'iYYYY/iM/iD'
  );
  let enteredDate = moment(hijriDate).format('iYYYY/iM/iD');
  if (moment(enteredDate).isBefore(currentDate)) {
    msg.day = InvalidDate;
    msg.month = InvalidDate;
    msg.year = InvalidDate;
  }

  if (!hijriDate.isValid()) {
    msg.day = 'day doesnt exist';
  }

  return msg;
};

const NewAddressValidation = (values) => {
  var msg = {};
  if (!values.sub) {
    msg.sub = required;
  }
  if (!values.city) {
    msg.city = required;
  }
  if (!values.street) {
    msg.street = required;
  }
  if (!values.buildNo) {
    msg.buildNo = required;
  }
  if (!values.postalCode) {
    msg.postalCode = required;
  }
  if (!values.additionalNo) {
    msg.additionalNo = required;
  }
  // console.log("values.additionalNo++++ ", values.additionalNo)
  // console.log("length++++ ", values.additionalNo.length)

  if (values?.additionalNo?.length != 4) {
    // console.log("length++++ ", values.additionalNo.length)

    msg.additionalNo = 'يجب ان يحتوي الرقم الاضافي على 4 خانات';
  }
  return msg;
};

const getDateFromObject = (date, format, req) => {
  return moment(date, format).format(req);
};

export { AttachementValidation, NewAddressValidation, getDateFromObject };
