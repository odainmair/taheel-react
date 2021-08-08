import TextField from './FieldsInputs/TextField'
import RadioButtonField from './FieldsInputs/RadioButtonField'
import CheckboxField from './FieldsInputs/CheckboxField'
import SelectField from './FieldsInputs/SelectField'
import ButtonField from './FieldsInputs/ButtonField'
import TypographyField from './FieldsInputs/TypographyField'
import PropTypes from 'prop-types'
import FormField from './FieldsInputs/FormField'
//import { useTranslation } from 'react-i18next'
//import { useStyles } from '../../../styles.js'
import { getOptions, arrangeFieldType } from '../Utils/CoreUtils'
import { ConditionComp } from 'src/pages/services/final-license/services/finalLicenseUtil'

export default function FieldsCreator({ lookupObject, schema, fieldsName, sectionNames, values, setField, isLoading, formType }) {
    //const [t] = useTranslation('common')
    //const classes = useStyles()

    let tLabel = '', style = '', labelRootStyle = '', labelshrinkStyle = '', fieldType = '', sectionName = ''
    let fieldComponents = []
    const Components = { TextField, RadioButtonField, CheckboxField, SelectField, ButtonField, TypographyField }
    let newSchema = []

    if (!!fieldsName) {
        [].concat(fieldsName).map(fieldName => {
            newSchema = newSchema.concat(schema.filter(field => field.name === fieldName)[0])
        })
    } else if (!!sectionNames) {
        [].concat(sectionNames).map(secName => {
            newSchema = newSchema.concat(schema.filter(field => field.sectionName.id === secName))
        })
    } else {
        newSchema = schema
    }
    newSchema.sort((a, b) => (!!a.sectionName?.order ? a.sectionName.order : 999) - (!!b.sectionName?.order ? b.sectionName.order : 999)).map(field => {
        if (!!field) {
            //if (t('lang') === 'ar') { // setting the properities for lang change
            tLabel = field.label.ar
            //style = classes.inputStyleAr
            //labelRootStyle = classes.labelRootAr
            //labelshrinkStyle = classes.shrinkAr
            /*} else {
                tLabel = field.label.en
                style = classes.inputStyleEn
                labelRootStyle = classes.labelRootEn
                labelshrinkStyle = classes.shrinkEn
            }*/
            if (!!field['sectionName'] && sectionName.id !== field.sectionName.id) {
                sectionName = field.sectionName
                fieldComponents.push(<TypographyField type='HeadText' tLabel={sectionName.label.ar} />)
            }
            field.options = !!lookupObject ? getOptions(lookupObject[field?.name], field) : field.options
            field = { ...field, tLabel, style, labelRootStyle, labelshrinkStyle, values, setField, isLoading }
            let Component
            fieldType = field['type']
            if (formType === 'view') {
                if (!!field.depndOn) {
                    fieldComponents.push(
                        <ConditionComp when={filteredTempLicense.dependOn.fieldName} is={filteredTempLicense.dependOn.value}>
                            <FormField {...field} />
                        </ConditionComp>
                    )
                } else {
                    fieldComponents.push(<FormField {...field} />)
                }
            } else {
                fieldType = arrangeFieldType(fieldType)
                Component = Components[fieldType]
                !!Component ? fieldComponents.push(<Component {...field} />) : fieldComponents.push(<TypographyField textTitle={'input type not recognized! ' + field['name'] + ' with type ' + field['type']} />)
            }
        }
    })

    return (fieldComponents)

}
FieldsCreator.propTypes = {
    labelRootStyle: PropTypes.object,
    tLabel: PropTypes.string,
    handleChange: PropTypes.func,
    gridSize: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    multiline: PropTypes.bool,
    isLoading: PropTypes.bool,
}