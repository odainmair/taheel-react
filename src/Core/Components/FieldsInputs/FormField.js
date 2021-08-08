import React, { useState } from 'react'
import { Grid, Typography } from '@material-ui/core';
import { TextField as TextFieldFinal } from 'final-form-material-ui';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types'
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
                    !props.isLoading ?
                        (props.type !== 'Select' && props.type !== 'Radio' ? (
                            (!!props.attrFunc && !!value) ?
                                props.attrFunc(value)
                                :
                                value
                        ) : getFieldValue({ value, options })
                        ) :
                        (<Skeleton animation="wave" height={15} width="20%" style={{ marginBottom: 6 }} />)
                }
            </Typography>
        </>
    ) : ('')
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
    if (props.type === 'Text') {
        return (
            <Grid item xs={gridSize} >
                <Field
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
                />
            </Grid>);
    } else if (props.type === 'file') {
        return (
            <Grid item xs={gridSize} >
                <DownloadButtTable docIDs={!!props.valueFunc ? props.valueFunc(props.values) : props.values[props.name]} name={props.name} label={props.tLabel} />
            </Grid>)
    } else {

        return (
            <>
                <Grid
                    item
                    md={6}
                    xs={gridSize}
                    className="custom-label-field"
                >
                    <Field
                        label={props.tLabel}
                        name={props.name}
                        component={contentField}
                        props={props}
                    >
                    </Field>
                </Grid>
            </>
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