const required ='يجب تعبئة الحقل'

const CitizenValidate = values =>{
    var msg = {}
    if (!values.idNumber) 
      msg.idNumber = required;
    if (!values.day) 
      msg.day = required;
    if (!values.month) 
      msg.month = required;
    if (!values.year) 
      msg.year = required;
    console.log(`mssssss ${JSON.stringify(msg)}`);
    return msg
  }
  const absherValidate = values =>{
    var msg ={}
    if (!values.AbsherOtp) 
      msg.AbsherOtp = required;
    return msg
  }
  const regitrationValidate = values => {
    var msg = {}
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (!values.email) 
      msg.email = required;
    if (!values.password) 
      msg.password = required;
    if (!values.passwordConfirmation) 
      msg.passwordConfirmation = required;
    if (values.passwordConfirmation && values.passwordConfirmation !== values.password) 
      msg.passwordConfirmation = 'كلمة المرور لا تماثل التأكيد';
    document.getElementsByTagName('UL')[0].style.color = 'red';
    if (values.password && values.password.length >= 8)
      document.getElementById('digitsNo').style.color = '#04AA6D';
    else {
      document.getElementById('digitsNo').style.color = 'red';
      msg.password = 'حقل كلمة المرور غير صحيح';
    }
    if (values.password && /\d/.test(values.password))
      document.getElementById('digitExist').style.color = '#04AA6D';
    else {
      document.getElementById('digitExist').style.color = 'red';
      msg.password = 'حقل كلمة المرور غير صحيح';
    }
    if (values.password && values.password.toUpperCase() !== values.password)
      document.getElementById('UpperCase').style.color = '#04AA6D';
    else {
      document.getElementById('UpperCase').style.color = 'red';
      msg.password = 'حقل كلمة المرور غير صحيح';
    }
    if (values.password && values.password.toLowerCase() !== values.password)
      document.getElementById('LowerCase').style.color = '#04AA6D';
    else {
      document.getElementById('LowerCase').style.color = 'red';
      msg.password = 'حقل كلمة المرور غير صحيح';
    }
    if (values.password && format.test(values.password))
      document.getElementById('symbol').style.color = '#04AA6D';
    else {
      document.getElementById('symbol').style.color = 'red';
      msg.password = 'حقل كلمة المرور غير صحيح';
    }
    console.log('msg',msg)
    return msg 
  }

  const TaheelOtpValidate = (values) => {
    var msg ={}
    if(!values.phoneNumber)
      msg.phoneNumber = required
    return msg
  }

  export {CitizenValidate, absherValidate, regitrationValidate, TaheelOtpValidate}