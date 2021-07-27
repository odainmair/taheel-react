import React from 'react'
import { Select } from 'final-form-material-ui';
import { MenuItem } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types'

export default function SelectField(props) {
    //const [t] = useTranslation('common');
    console.log('props ===> ', props)
    console.log('props[attrName] ===> ', props['name'])
    let options = [];
    let tOptionLabel = '';
    if (!!props.fieldLookUp) {
        props.fieldLookUp.forEach(option => {
            tOptionLabel = option['name'];
            options.push({ label: tOptionLabel, value: option.ID })
        })
    } else {
        props.options.forEach(option => {
            //tOptionLabel = t('lang') === 'en' ? option.label.en : option.label.ar;
            tOptionLabel = option.label.ar;
            options.push({ label: tOptionLabel, value: option.value })
        });
    }
    let gridSize = !!props.gridSize ? props.gridSize : 12;
    return (
        <Grid
            item
            md={6}
            xs={gridSize}
            className="custom-label-field"
        >
            <Field
                fullWidth
                label={props.tLabel}
                name={props.name}
                component={Select}
                required={props.required}
                dir="rtl"
                variant="outlined"
                className="custom-field"
                formControlProps={{ fullWidth: true }}
            >
                {options.map((option, idx) => {
                    return <MenuItem value={option.value} className={props.style} key={idx}>{option.label}</MenuItem>
                })}
            </Field>
        </Grid>
    )
}
SelectField.propTypes = {
    options: PropTypes.array,
    tLabel: PropTypes.string,
    gridSize: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    style: PropTypes.object,
    value: PropTypes.string,
    required: PropTypes.bool,
    fieldLookUp: PropTypes.array,
  }