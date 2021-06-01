/* eslint-disable no-unused-vars */
import {
    Grid,
    Typography,
    RadioGroup,
    FormControlLabel,
    MenuItem,
} from '@material-ui/core';
import { Field } from 'react-final-form';
import { Radio, Select } from 'final-form-material-ui';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { uploadDocument } from '../services/finalLicenseUtil'
import localContext from 'src/localContext';
import FileUploader from 'src/components/FileUploader';


const HealthServices = ({ Condition, values, setField }) => {
    const { documents, SetDocuments } = useContext(localContext);

    const setDocument = (name, docID, multiple) => {
        setField(name,[docID])
    }

    return (
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
                <Condition when='healthServices' is='yes' >
                    <Grid
                        item
                        md={6}
                        xs={12}
                        className="custom-label-field"
                    >

                        <Field
                            fullWidth
                            label="نوع الخدمة الصحية"
                            name="healthServiceType"
                            component={Select}
                            required
                            dir="rtl"
                            variant="outlined"
                            className="custom-field"
                            formControlProps={{ fullWidth: true }}
                        >
                            <MenuItem value= {1}> رخصة وزارة الصحة </MenuItem>
                            <MenuItem value= {2}> عقد شراكة مع منشأة رعاية صحية </MenuItem>
                        </Field>
                    </Grid>
                    <Grid
                        item
                        md={6}
                        xs={12}
                    >
                        <FileUploader
                            handleFile={(file) => uploadDocument(setDocument, "healthServiceAttachment", file)}
                            label={values.healthServiceType ? values.healthServiceType === 1? 'ارفاق رخصة وزارة الصحة' : 'ارفاق عقد الشراكة' : 'ارفاق الخدمة الصحية'}
                            name="healthServiceAttachment"
                            multiple={false}
                        />
                    </Grid>
                </Condition>
            </Grid>
        </>

    );
}
export default HealthServices;

HealthServices.propTypes = {
    Condition: PropTypes.func.isRequired,
    values: PropTypes.func.isRequired,
    setField: PropTypes.func.isRequired,
};