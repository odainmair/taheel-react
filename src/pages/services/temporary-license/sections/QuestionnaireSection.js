/* eslint-disable*/
import React from 'react';
import {
    Grid,
    RadioGroup,
    Typography,
    FormLabel,
    FormControl,
    FormControlLabel,
    FormHelperText,
} from '@material-ui/core';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';
import { Radio, TextField as TextFieldFinal, Select } from 'final-form-material-ui';
import questionnaireSectionOne from '../models/questionnaireSectionOne';
import questionnaireSectionTwo from '../models/questionnaireSectionTwo';
import questionnaireSectionThree from '../models/questionnaireSectionThree';
import questionnaireSectionFour from '../models/questionnaireSectionFour';
import questionnaireSectionFive from '../models/questionnaireSectionFive';

const questionComponent = (name, label) => (
    <Grid
        key={name}
        item
        mt={0}
        md={12}
        xs={12}
    >
        <Field name={name}>
            {({ input, meta }) => ( // eslint-disable-line no-unused-vars
                <Grid
                    container
                    mt={0}
                >
                    <Grid
                        item
                        md={9}
                        xs={9}
                        pl={2}
                    >
                        <FormLabel component="legend">{label}</FormLabel>
                        {meta.error && meta.touched && <FormHelperText dir="rtl">{meta.error}</FormHelperText>}
                    </Grid>
                    <Grid
                        item
                        md={3}
                        xs={3}
                    >
                        <RadioGroup row >
                            <FormControlLabel
                                control={<Field name={name} component={Radio} type="radio" value="yes" />}
                            />
                            <FormControlLabel
                                control={<Field name={name} component={Radio} type="radio" value="no" />}
                            />
                            <FormControlLabel
                                control={<Field name={name} component={Radio} type="radio" value="notapply" />}
                            />
                        </RadioGroup>
                    </Grid>
                </Grid>
            )}
        </Field>
    </Grid>
);
const questionnaireSectionComponent = (questionnaire) => (
    <>
        <Grid
            container
            mt={6}
            mb={4}
            spacing={0}
        >
            <Grid
                item
                md={9}
                xs={9}
            >
                <Typography
                    gutterBottom
                    variant="h4"
                    sx={{
                        color: '#eeb741'
                    }}
                >
                    {questionnaire.sectionlabelAr[0]}
                </Typography>
            </Grid>
            <Grid
                container
                md={3}
                xs={3}
                justifyContent='space-between'
                alignItems='center'
            >
                <Typography
                    variant="h4"
                >
                    نعم
                </Typography>
                <Typography
                    variant="h4"

                >
                    لا
                </Typography>
                <Typography
                    variant="h4"
                >
                    لا ينطبق
                </Typography>

            </Grid>

        </Grid>

        <Grid
            container
            mt={0}
            spacing={1}
        >
            {questionnaire.questions.map((question, index) => questionComponent(`${questionnaire.sectionName}_q${index}`, question.label.ar))}
        </Grid>
    </>
);

const QuestionnaireSection = ({ Condition }) => {
    return (
        <>

            {questionnaireSectionComponent(questionnaireSectionOne)}
            {questionnaireSectionComponent(questionnaireSectionTwo)}
            {questionnaireSectionComponent(questionnaireSectionThree)}
            {questionnaireSectionComponent(questionnaireSectionFour)}
            {questionnaireSectionComponent(questionnaireSectionFive)}
        </>
    )
};

export default QuestionnaireSection;

QuestionnaireSection.propTypes = {
    Condition: PropTypes.func.isRequired,
};
