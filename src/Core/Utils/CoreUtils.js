import FieldsEnum from "./FieldsEnum"


export function getOptions(lookupObject, field) {
    return !!lookupObject ? !!lookupObject?.field?.name ? lookupObject?.field?.name : field?.options : field?.options
}
export function arrangeFieldType(fieldType){
    if(fieldType === 'Select') return FieldsEnum.SELECT_FIELD
    if(fieldType === 'Radio') return FieldsEnum.RADIO_BUTTON_FIELD
    if(fieldType === 'file') return FieldsEnum.FILE_UPLOADER_FIELD
    if(fieldType === 'Text') return FieldsEnum.TEXT_FIELD
    
    return fieldType

}