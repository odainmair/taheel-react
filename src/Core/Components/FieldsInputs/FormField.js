import React, { useState } from 'react'
import { Grid, Typography } from '@material-ui/core';
import { TextField as TextFieldFinal } from 'final-form-material-ui';
import { Field } from 'react-final-form';
import PropTypes, { array } from 'prop-types'
import { DownloadButtTable } from 'src/pages/services/final-license/services/finalLicenseUtil';
import { MenuItem } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

const contentField = ({ input: { value, name }, label, props }) => {
    let options = props.options
    return !!''.concat(value) ? (
        <>
            <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                {label}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
                {
                    (props.type !== 'Select' && props.type !== 'Radio' ? (
                        (!!props.attrFunc && !!value) ?
                            props.attrFunc(value)
                            :
                            value
                    ) : getFieldValue({ value, options })
                    )
                }
            </Typography>
        </>
    ) : (null)
}
const getFieldValue = ({ value, options }) => {
    if (value === '')
        return ''
    const filteredvalue = options.filter(option => option.value == value)
    if (filteredvalue.length > 0)
        return filteredvalue[0].label.ar
    return '';
}
export default function FormField(props) {
    let gridSize = !!props.gridSize ? props.gridSize : 12;
    const inputName = props.name.includes('.') ? props.name.split('.') : props.name
    let value = ''
    if (!!props.valueFunc && !props.isLoading) {
        value = props.valueFunc(props.values)
    } else if (props.name.includes('.') && !props.isLoading && !!props.values) {
        value = props.values;
        inputName.forEach(iName => {
            value = !!value ? value[iName] : null;
        })
    } else {
        value = props.values[inputName]
    }
    if (!(value + '') && !props.isLoading) {
        return null;
    }
    if (props.type === 'Text') {
        return (
            <Grid item xs={gridSize} >
                {
                    !props.isLoading ?
                        (<Field
                            fullWidth
                            required={props.required}
                            label={props.tLabel}
                            name={props.name}
                            component={contentField}
                            type={props.fieldType}
                            props={props}
                            variant="outlined"
                            dir="rtl"
                            className="custom-field"
                        />)
                        : (<Skeleton animation="wave" height={15} width="20%" style={{ marginBottom: 6 }} />)
                }
            </Grid>);
    } else if (props.type === 'file') {
        return (
            (<Grid item xs={gridSize} >
                {
                    !props.isLoading ?
                        (<DownloadButtTable docIDs={!!props.valueFunc ? props.valueFunc(props.values) : props.values[props.name]} name={props.name} label={props.tLabel} />)
                        : (<Skeleton animation="wave" height={15} width="20%" style={{ marginBottom: 6 }} />)}
            </Grid>))
    } else {

        return (
            <Grid
                item
                md={6}
                xs={gridSize}
                className="custom-label-field"
            >
                {!props.isLoading ?
                    <Field
                        label={props.tLabel}
                        required={props.required}
                        name={props.name}
                        component={contentField}
                        props={props}
                    >
                    </Field>
                    : (<Skeleton animation="wave" height={15} width="20%" style={{ marginBottom: 6 }} />)
                }
            </Grid>

        )
    }
}
FormField.propTypes = {
    labelRootStyle: PropTypes.object,
    tLabel: PropTypes.string,
    handleChange: PropTypes.func,
    valueFunc: PropTypes.func,
    gridSize: PropTypes.string,
    rows: PropTypes.number,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    multiline: PropTypes.bool,
    disabled: PropTypes.bool,
}