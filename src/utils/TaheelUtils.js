
import moment from 'moment-hijri';
import { isValidElement } from 'react';


const staffTypes = ["معلم تربية خاصة", "أخصائي اجتماعي", "مراقب اجتماعي", "حارس", "عامل تنظيفات", "مشرف فني عام", "اخصائي نفسي و توجيه اجتماعي", "عامل رعاية شخصية", "مدير", "سائق", "مرافق سائق", "أخصائي علاج طبيعي", "أخصائي علاج وظيفي", "أخصائي نطق و تخاطب", "ممرض"]

const dateFormatter = (date, formate = 'iDD/iMM/iYYYY', formateTo = 'iDD iMMM iYYYY') => {
    return moment(date, formate).format(formateTo)
}

const getDocId = (docs) => {
    console.log('Samer=--->', docs)
    if (!!docs) {
        if (docs.length > 0) {
            if (!!docs?.Document?.id || !!docs?.Document?.map(d => d?.id)[0] || !!docs?.map(d => d?.Document)[0] || !!docs?.map(d => d?.Document?.id)[0] || !!docs?.id) {
                console.log('Samer2=--->', docs)
                return docs?.Document?.id || docs?.Document?.map(d => d?.id) || docs?.map(d => d?.Document) || docs?.map(d => d?.Document?.id) || docs?.id
            } else if (!!docs[0] && docs[0] != '') {
                console.log('Samer3=--->', docs)
                return docs
            } else {
                console.log('Samer4=--->', docs)
                return null
            }
        } else if (!!docs?.id) {
            return docs.id
        } else {
            return null
        }
    }
    return null
}

const getDateFromObject = (date, format, req) => {
    return moment(date, format).format(req);
}

const extractDate = (dateObject) => {
    console.log(`extractDate =============================> ${dateObject}`)
    const expDate = {}
    if (!!dateObject) {
        let returned = getDateFromObject(dateObject, 'iYYYYiMMiDD', 'iDD');
        if (!isNaN(returned)) {
            expDate.day = Number.parseInt(returned)
        }
        returned = getDateFromObject(dateObject, 'iYYYYiMMiDD', 'iMM');
        if (!isNaN(returned)) {
            expDate.month = Number.parseInt(returned)
        }
        returned = getDateFromObject(dateObject, 'iYYYYiMMiDD', 'iYYYY');
        if (!isNaN(returned)) {
            expDate.year = Number.parseInt(returned)
        }
    }
    console.log(`expDate =============================> ${JSON.stringify(expDate)}`)
    return expDate
}

export { staffTypes, dateFormatter, extractDate, getDocId, getDateFromObject };