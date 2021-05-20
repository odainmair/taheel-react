/* eslint-disable no-unused-vars */
import {
    Grid,
    Typography,
    RadioGroup,
    FormControlLabel
} from '@material-ui/core';
import { Field } from 'react-final-form';
import { Radio } from 'final-form-material-ui';


const HealthServices = () => (
    <>
        <Grid
            container
            spacing={3}
            mt={3}
        >

            <Grid
                item
                md={12}
                xs={12}
            >
                <Typography> هل المركز يقدم خدمات صحية؟</Typography>
                <RadioGroup >
                    <FormControlLabel
                        label="نعم"
                        control={<Field name="healthServices" component={Radio} type="radio" value="yes" />}
                    />
                    <FormControlLabel
                        label="لا"
                        control={<Field name="healthServices" component={Radio} type="radio" value="no" />}
                    />
                </RadioGroup>
            </Grid>
        </Grid>
    </>

);

export default HealthServices;

