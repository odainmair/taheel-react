
import validator from 'validator'


export default {
    nameValidator: {
        id: 'nameValidator',
        massege: { ar: 'يرجى ادخال اسم صحيح', en: 'Please enter a correct Name' },
        validatorfn: (value) => {
            return validator.isAlpha(value.replaceAll(' ', ''))
        }
    },
    emailValidator: {
        id: 'emailValidator',
        massege: { ar: 'يرجى ادخال بريد الكتروني صحيح', en: 'Please enter a correct Email' },
        validatorfn: (value) => {
            return validator.isEmail(value)
        }
    },
    passwordStrength: {
        id: "passwordStrength",
        massege: {
            ar: 'كلمة السر غير قوية',
            en: 'Password is not Strong'
        },
        validatorfn: (value) => {
            return validator.isStrongPassword(value)
        }
    },
    phoneNumberValidator: {
        id: "passwordStrength",
        massege: {
            ar: 'رقم الهاتف غير صحيح',
            en: 'Phone Number is not correct'
        },
    }


}