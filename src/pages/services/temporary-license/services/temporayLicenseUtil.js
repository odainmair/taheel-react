/* eslint-disable */
import questionnaireSectionTwo from '../models/questionnaireSectionTwo';
import questionnaireSectionOne from '../models/questionnaireSectionOne';
import questionnaireSectionThree from '../models/questionnaireSectionThree';
import questionnaireSectionFour from '../models/questionnaireSectionFour';
import questionnaireSectionFive from '../models/questionnaireSectionFive';
import { Field } from 'react-final-form';

const calAnswerOfQuestionnaires = (values) => {
    const questionnairesArray = [questionnaireSectionOne, questionnaireSectionTwo, questionnaireSectionThree, questionnaireSectionFour, questionnaireSectionFive];
    console.log(JSON.stringify(values));
    let totalCorrectedAnswer = 0;
    let totalQuestions = 0;
    questionnairesArray.forEach((questionnaire) =>
        questionnaire.questions.forEach((question, index) => {
            totalQuestions++;
            if (values[`${questionnaire.sectionName}_q${index}`] === question.correctAnswer)
                totalCorrectedAnswer++;
        })
    );
    values.questionnairesScore = ((totalCorrectedAnswer / totalQuestions) * 100).toFixed(2) + "%";
    console.log(`totalCorrectedAnswer:${totalCorrectedAnswer} totalQuestions:${totalQuestions} questionnairesScore:${values.questionnairesScore}`);
    const response = { isSuccessful: true, message: '' };
    return response;
}
const validateInput = (input, value) => {
    let alert = null;
    input.validators && input.validators.forEach(v => alert = v.isValidFun && !v.isValidFun(value) ? v.alert : alert);
    return alert;
}
const sectionValidateInput = (inputsSchema, sectionName, values) => {
    const errors = {};
    inputsSchema.forEach(i => {
        if (sectionName === i.sectionName) {
            let canValidateInput = true;
            if (i.dependOn) {
                const { fieldName, value } = i.dependOn;
                canValidateInput = values[fieldName] === value;
            } 
            const alert = canValidateInput ? validateInput(i, values[i.name]) : null;
            if (alert !== null) {
                errors[i.name] = alert;
            }
        }
    });
    return errors;
}

const ConditionComp = ({ when, is, children }) => (
    <Field name={when} subscription={{ value: true }}>
        {({ input: { value } }) => (value === is ? children : null)}
    </Field>
)
export { calAnswerOfQuestionnaires, validateInput, sectionValidateInput, ConditionComp };