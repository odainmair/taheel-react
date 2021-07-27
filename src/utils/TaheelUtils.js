
import moment from 'moment-hijri';


export const staffTypes =["معلم تربية خاصة", "أخصائي اجتماعي", "مراقب اجتماعي", "حارس", "عامل تنظيفات", "مشرف فني عام", "اخصائي نفسي و توجيه اجتماعي", "عامل رعاية شخصية", "مدير", "سائق", "مرافق سائق", "أخصائي علاج طبيعي", "أخصائي علاج وظيفي", "أخصائي نطق و تخاطب", "ممرض"]

export function dateFormatter(date,formate='iDD/iMM/iYYYY',formateTo='iDD iMMM iYYYY'){
    return moment(date, formate).format(formateTo)
}