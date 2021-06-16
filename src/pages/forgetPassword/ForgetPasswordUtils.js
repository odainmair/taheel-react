const required = 'يجب تعبئة الحقل'

const CitizenValidate = values => {
  var msg = {}
  if (!values.IqamaNumber)
    msg.IqamaNumber = required;
  return msg
}
const absherValidate = values => {
  var msg = {}
  if (!values.AbsherOtp)
    msg.AbsherOtp = required;
  return msg
}
const confirmationValidate = values => {
  var msg = {}
  const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (!values.oldPassword)
    msg.oldPassword = required;
  if (!values.password) {
    msg.password = required;
  } else if (values.password.length >= 8) {
    document.getElementById('digitsNo').style.color = '#04AA6D';
    if (!values.password.length <= 8 && values.password.length >= 0)
      document.getElementById('digitsNo').style.color = '04AA6D';
    if (/\d/.test(values.password))
      document.getElementById('digitExist').style.color = '#04AA6D';
    if (values.password.toUpperCase() !== values.password)
      document.getElementById('UpperCase').style.color = '#04AA6D';
    if (values.password.toLowerCase() !== values.password)
      document.getElementById('LowerCase').style.color = '#04AA6D';
    if (format.test(values.password))
      document.getElementById('symbol').style.color = '#04AA6D';
  } else {
    document.getElementById('symbol').style.color = 'red';
    msg.password = 'حقل كلمة المرور غير صحيح';
  }
  if (!values.passwordConfirmation)
    msg.passwordConfirmation = required;
  else if (values.passwordConfirmation !== values.password) {
    msg.passwordConfirmation = 'كلمة المرور  غير متماثلة ';
    document.getElementsByTagName('UL')[0].style.color = 'red';
  }
  console.log('msg', msg)
  return msg
}

export { CitizenValidate, absherValidate, confirmationValidate }