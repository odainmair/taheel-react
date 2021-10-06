import React from 'react'
import {
  FormLabel,
  Grid,
  RadioGroup,
  FormControlLabel,
  FormControl
} from '@material-ui/core';
import { Radio } from 'final-form-material-ui';
import { Field } from 'react-final-form';

import PropTypes from 'prop-types'
import { ClosedCaptionDisabledOutlined } from '@material-ui/icons';

export default function RadioButtonField(props) {
  console.log("props ===> ", props)
  props.options.forEach((option) => {
    console.log("props.options.forEach(option  ===> ", option.label.ar);
  }
  )

  let tOptionLabel = '';
  let gridSize = !!props.gridSize ? props.gridSize : 12;
  return (
    <Grid
      item
      md={6}
      xs={gridSize}
      className="custom-label-field"
    >
      <Field name="workingHours" >
        {({ input, meta }) => {
          const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched; return ( // eslint-disable-line no-unused-vars
            <FormControl component="fieldset" error={props.showError ? meta.error || meta.submitError : undefined} required>
              <FormLabel component="legend">{props.tLabel}</FormLabel>
              <RadioGroup >
                {props.options.map((option, idx) => (
                  <FormControlLabel
                    key={idx}
                    label={option.label.ar}
                    control={<Field name={props.tLabel} component={Radio} type="radio" value={option.value} />}
                  />
                )
                )}
              </RadioGroup>
            </FormControl>
          )
        }}
      </Field>
    </Grid>
  )
}
RadioButtonField.propTypes = {
  showError: PropTypes.bool,
  options: PropTypes.array,
  tLabel: PropTypes.string,
  gridSize: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  fieldLookUp: PropTypes.object,
}