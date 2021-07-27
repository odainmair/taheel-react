import { Field } from 'react-final-form';
import {
    FormControl,
    FormControlLabel,
} from '@material-ui/core';
import { Checkbox } from 'final-form-material-ui';
import PropTypes from 'prop-types'
import {
    Grid,
} from '@material-ui/core';

export default function CheckboxField(props) {

    let gridSize = !!props.gridSize ? props.gridSize : 12;

    return (
        <Grid
            item
            md={6}
            xs={gridSize}
            className="custom-label-field"
        >
            <Field name={props.name} mt={3}>
                {({ meta }) => ( // eslint-disable-line no-unused-vars
                    <FormControl component="fieldset" error={meta.error} required>
                        <FormControlLabel
                            label={props.tLabel}
                            control={
                                <Field
                                    name={props.name}
                                    component={Checkbox}
                                    type="checkbox"
                                    value={!!props.values[props.value][0]}
                                    onClick={() => {
                                        // props.setField("agree", props.values.agree ? [] : [true]);
                                    }}
                                />
                            }
                        />
                    </FormControl>
                )}
            </Field>
        </Grid>
    )
}
CheckboxField.propTypes = {
    tLabel: PropTypes.string,
    gridSize: PropTypes.number,
    name: PropTypes.string,
    value: PropTypes.string,
    required: PropTypes.bool,
    multiline: PropTypes.bool,
    values: PropTypes.object
}