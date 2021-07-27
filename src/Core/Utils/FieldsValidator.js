import DefualtValidatorsFunc from './DefualtValidatorsFunc'

class BreakException extends Error {
    constructor(message, cause) {
        super(message)
        this.cause = cause
        this.name = 'ReadError'
    }
}

export default function validateSchema({schema, values, t}) {
    const errors = {}
    console.log('schema',schema)
    schema?.forEach(element => {
        try {
            element?.validators?.forEach(validator => {
                if(!!DefualtValidatorsFunc[validator]){
                    validator = DefualtValidatorsFunc[validator]
                }
                if (!validator.validatorfn(values[element.name]))
                {
                    //errors[element.name] = t("lang") === "en" ? validator.massege.en : validator.massege.ar
                    errors[element.name] = validator.massege.ar
                    throw new BreakException('Break')
                }
            })
        } catch (e) {
            console.log(e.message)
        }
    })
    return errors
}