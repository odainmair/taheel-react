

const AttachementValidation = values => {
    var msg = {}
    if (!values.fireDepartmentLicens || !values.fireDepartmentLicens[0])
    msg.fireDepartmentLicens = "يرجى ارفاق هذا الملف";

    if (!values.OfficeReport || !values.OfficeReport[0])
      msg.OfficeReport = "يرجى ارفاق هذا الملف";
  
      if (!values.Furniture || !values.Furniture[0])
      msg.Furniture = "يرجى ارفاق هذا الملف";
  
    if (!values.municipLicense || !values.municipLicense[0])
      msg.municipLicense = "يرجى ارفاق هذا الملف";
  

    return msg;
  }
  
  export {AttachementValidation} ;