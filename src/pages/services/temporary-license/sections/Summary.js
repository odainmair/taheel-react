/* eslint-disable*/
import React from 'react';
import {
    Divider,
    Grid,
    InputAdornment,
    FormControl,
    Typography,
    FormControlLabel,
    Link
} from '@material-ui/core';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';
import { TextField as TextFieldFinal, Checkbox } from 'final-form-material-ui';
import tempLicenseFieldSchema from '../util/tempLicenseFieldSchema';
import TermsContent from './TermsContent';
import TermsDialog from 'src/components/TermsDialog';

const contentField = ({ input: { value, name }, label, type }) => (
    <>
        <Typography gutterBottom variant="body2" color="textSecondary" component="p">

            {label}

        </Typography>
        <Typography gutterBottom variant="h5" component="h2">
            {type != 'Select' && type != 'Radio' ? value : getFieldValue({ name, value })}
        </Typography>
    </>
)
const termsLabel = (openDialog) => (
    <>
        <Typography gutterBottom variant="h5" component="span">
            انا اقر واتعهد بالالتزام بالشروط والاحكام الواردة والمتعلقه بالطلب
            <Link href="#" sx={{ color: '#147fbd' }} onClick={() => openDialog()}> (للاطلاع على الشروط والاحكام انقر هنا)</Link>
        </Typography>

    </>
)
const getFieldValue = ({ name, value }) => {
    if (value == '')
        return '';
    const filredTemp = tempLicenseFieldSchema.filter(tempLicense => tempLicense.name === name);
    if (filredTemp.length > 0) {
        const filteredvalue = filredTemp[0].options.filter(option => option.value == value);
        if (filteredvalue.length > 0)
            return filteredvalue[0].label.ar;
    }
    return '';
}

const Summary = ({ Condition, dialog }) => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = (dialogContent, dialogTitle) => {
        setOpen(true);
    };
    const handleClose = (value) => {
        setOpen(false);
    };
    return (
        <>
            <Typography
                color="textPrimary"
                gutterBottom
                mb={4}
                mt={6}
                variant="h4"
            >
                معلومات المركز و معلومات المالك
            </Typography>
            <Grid
                container
                spacing={3}
                mt={3}
                mb={3}
            >
                {tempLicenseFieldSchema.filter(tempLicense => tempLicense.sectionName === "CenterInfo" && !tempLicense.dependOn).map(filteredTempLicense => (
                    <Grid
                        item
                        key={filteredTempLicense.id}
                        lg={6}
                        md={6}
                        xs={12}
                    >
                        <Field
                            label={filteredTempLicense.label.ar}
                            name={filteredTempLicense.name}
                            component={contentField}
                            type={filteredTempLicense.type}
                        />
                    </Grid>
                ))}
                {tempLicenseFieldSchema.filter(tempLicense => tempLicense.sectionName === "CenterInfo" && tempLicense.dependOn).map(filteredTempLicense => (
                    <Condition when={filteredTempLicense.dependOn.fieldName} is={filteredTempLicense.dependOn.value} >
                        <Grid
                            item
                            key={filteredTempLicense.id}
                            lg={6}
                            md={6}
                            xs={12}
                        >
                            <Field
                                label={filteredTempLicense.label.ar}
                                name={filteredTempLicense.name}
                                component={contentField}
                                type={filteredTempLicense.type}
                            />
                        </Grid>
                    </Condition>
                ))}
                {tempLicenseFieldSchema.filter(tempLicense => tempLicense.sectionName === "OwnerInfo" && tempLicense.dependOn).map(filteredTempLicense => (
                    <Condition when={filteredTempLicense.dependOn.fieldName} is={filteredTempLicense.dependOn.value} >
                        <Grid
                            item
                            key={filteredTempLicense.id}
                            lg={6}
                            md={6}
                            xs={12}
                        >
                            <Field
                                label={filteredTempLicense.label.ar}
                                name={filteredTempLicense.name}
                                component={contentField}
                                type={filteredTempLicense.type}
                            />
                        </Grid>
                    </Condition>
                ))}
            </Grid>
            <Divider />
            <Typography
                color="textPrimary"
                gutterBottom
                mb={4}
                mt={6}
                variant="h4"
            >
                عنوان المركز
            </Typography>

            <Grid
                container
                spacing={3}
                mt={3}
                mb={3}
            >
                {tempLicenseFieldSchema.filter(tempLicense => tempLicense.sectionName === "CenterAddress" && !tempLicense.dependOn).map(filteredTempLicense => (
                    <Grid
                        item
                        key={filteredTempLicense.id}
                        lg={6}
                        md={6}
                        xs={12}
                    >
                        <Field
                            label={filteredTempLicense.label.ar}
                            name={filteredTempLicense.name}
                            component={contentField}
                            type={filteredTempLicense.type}
                        />
                    </Grid>
                ))}
            </Grid>
            <Divider />
            <Typography
                color="textPrimary"
                gutterBottom
                mb={4}
                mt={6}
                variant="h4"
            >
                تفاصيل المركز
            </Typography>
            <Grid
                container
                spacing={3}
                mt={3}
                mb={3}
            >
                {tempLicenseFieldSchema.filter(tempLicense => tempLicense.sectionName === "CenterDetails" && !tempLicense.dependOn).map(filteredTempLicense => (
                    <Grid
                        item
                        key={filteredTempLicense.id}
                        lg={6}
                        md={6}
                        xs={12}
                    >
                        <Field
                            label={filteredTempLicense.label.ar}
                            name={filteredTempLicense.name}
                            component={contentField}
                            type={filteredTempLicense.type}
                        />
                    </Grid>
                ))}

            </Grid>
            <Divider />
            <Typography
                color="textPrimary"
                gutterBottom
                mb={4}
                mt={6}
                variant="h4"
            >
                تقييم الجاهزية
            </Typography>
            <Grid
                container
                lg={12}
                md={12}
                xs={12}
                mt={3}
            >
                <Grid
                    item
                    lg={6}
                    md={6}
                    xs={12}
                >
                    <Field
                        label="نتيجة التقييم:"
                        name="questionnairesScore"
                        component={contentField}
                        type="Text"
                    />
                </Grid>
            </Grid>
            <Grid
                container
                lg={12}
                md={12}
                xs={12}
                mt={3}
            >
                <Field name="agree" mt={3}>
                    {({ input, meta }) => ( // eslint-disable-line no-unused-vars
                        <FormControl component="fieldset" error={meta.error} required>
                            {meta.error && meta.touched && <FormHelperText dir="rtl">{meta.error}</FormHelperText>}
                            <FormControlLabel
                                label={termsLabel(handleClickOpen)}
                                control={
                                    <Field
                                        name="agree"
                                        component={Checkbox}
                                        type="checkbox"
                                        value="true"
                                    />
                                }
                            />
                        </FormControl>
                    )}
                </Field>
            </Grid>
            <TermsDialog dialogContent={TermsContent()} dialogTitle={"التعهد"} open={open} onClose={handleClose} acceptBtnName="اوافق" />

        </>
    )
};

export default Summary;

Summary.propTypes = {
    Condition: PropTypes.func.isRequired,
    dialog: PropTypes.func.isRequired,
};
