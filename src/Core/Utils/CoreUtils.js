import FieldsEnum from "./FieldsEnum"


export function getOptions(lookupObject, field) {
    return !!lookupObject ? lookupObject : field?.options
}
export function arrangeFieldType(fieldType) {
    if (fieldType === 'Select') return FieldsEnum.SELECT_FIELD
    if (fieldType === 'Radio') return FieldsEnum.RADIO_BUTTON_FIELD
    if (fieldType === 'file') return FieldsEnum.FILE_UPLOADER_FIELD
    if (fieldType === 'Text') return FieldsEnum.TEXT_FIELD
    if (fieldType === 'Date') return FieldsEnum.DATE_PICKER_FIELD

    return fieldType

}

export function getValuesFromFilter(filterData) {
    const initValues = {}
    filterData?.map((fD) => {
        let fieldName = fD.fieldName, fieldValue = fD.fieldValue
        initValues[fieldName] = fieldValue
    })
    return initValues;
}