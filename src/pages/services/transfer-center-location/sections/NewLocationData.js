/* eslint-disable */
import { useState, useEffect } from 'react';
import {
    Grid,
    Button,
    Alert,
    Typography,
    Box,
    Divider,
    Link,
    CircularProgress,
} from '@material-ui/core';
import { OnChange } from 'react-final-form-listeners';
import { Field } from 'react-final-form';
import { TextField as TextFieldFinal } from 'final-form-material-ui';
import { calculation } from '../../final-license/services/finalLicenseAPI';
import Attachements from './Attachements';
import numeral from 'numeral';
import { checkIsNumber } from 'src/utils/inputValidator';

const NewLocationData = ({ setField, values, setIsEnableNextBtn }) => {
    const [calculatedData, setCalculatedData] = useState(false);
    const [errMessage, SetErrMessage] = useState('');
    const [loading, setLoading] = useState(false);
    // const [isEnableNextBtn, setIsEnableNextBtn] = useState(false);

    useEffect(() => {
        if (values.capacity) {
            setIsEnableNextBtn(false);
            setCalculatedData(true);
        } else {
            setIsEnableNextBtn(false);
        }
    }, []);

    const calculate = async () => {
        setLoading(true);
        SetErrMessage('');
        console.log('hiiiiiiiiiiiii', values.buildingArea, values.basementArea)

        const response = await calculation(values.buildingArea, values.basementArea);
        const carryingCapacity = response?.responseBody?.body?.carryingCapacity
        console.log(`Capacity :: values.capacity: ${values.capacity}`)
        console.log(`Capacity :: response.responseBody.body.carryingCapacity ${(carryingCapacity)}`)
        console.log(`Capacity numeral :: ${numeral(carryingCapacity).value()}`)
        console.log(`Is Capacity >= 1 :: ${numeral(carryingCapacity) >= 1}`)
        if (!response.isSuccessful) {
            setIsEnableNextBtn(false);
            SetErrMessage(response.message);
            setCalculatedData(false);
        }
        else {
            setField('capacity', numeral(carryingCapacity).format('00'));
            setField('financialGuarantee', `${numeral(response.responseBody.body.financialGuarantee).format('0,0.00')} ر.س.`);
            setCalculatedData(true);
        }
        setLoading(false);
        if (!values.basementArea || !checkIsNumber(values.basementArea) || values.basementArea < 0) {
            SetErrMessage('يرجى ادخال مساحة القبو عدد صحيح');
            setIsEnableNextBtn(false);
            return;
        }
        if (!values.buildingArea || !checkIsNumber(values.buildingArea) || values.buildingArea <= 0) {
            SetErrMessage('يرجى ادخال مساحة مسطح البناء عدد صحيح أكبر من صفر');
            setIsEnableNextBtn(false);
            return;
        }

        if (parseInt(values.buildingArea) <= parseInt(values.basementArea)) {
            SetErrMessage('مساحة القبو يجب ان تكون أقل من مساحة مسطح البناء');
            setIsEnableNextBtn(false);
            return
        }
    }

    const handleOnChange = (val, nextVal) => {
        setIsEnableNextBtn(false);
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
                بيانات الموقع الجديد
            </Typography>
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
                    {errMessage && (
                        <Alert variant="outlined" severity="error">
                            {errMessage}
                        </Alert>
                    )}
                </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                    className="custom-label-field"
                >
                    <Field
                        fullWidth
                        required
                        label=" مساحة القبو ( للمبنى الجديد)"
                        name="basementArea"
                        component={TextFieldFinal}
                        type="number"
                        variant="outlined"
                        dir="rtl"
                        className="custom-field"
                    />
                    <OnChange name="basementArea">
                        {(value, previous) => {
                            handleOnChange(value, previous);
                        }}
                    </OnChange>
                </Grid>

                <Grid
                    item
                    md={6}
                    xs={12}
                    className="custom-label-field"
                >
                    <Field
                        fullWidth
                        required
                        label="مساحة سطح البناء ( للمبنى الجديد)"
                        name="buildingArea"
                        component={TextFieldFinal}
                        type="number"
                        variant="outlined"
                        dir="rtl"
                        className="custom-field"
                    />
                    <OnChange name="buildingArea">
                        {(value, previous) => {
                            handleOnChange(value, previous);
                        }}
                    </OnChange>
                </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                >
                    <Button
                        startIcon={loading ? <CircularProgress size="1rem" /> : null}
                        variant='outlined'
                        type="button"
                        sx={{
                            height: 55,
                            backgroundColor: '#3c8084',
                            width: '100%',
                            color: 'white',
                        }}
                        onClick={calculate}
                    >
                        احتساب الطاقة الاستيعابية
                    </Button>
                </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                >
                    <Field
                        fullWidth
                        label=" الطاقه الاستيعابيه ( للمبنى الجديد) "
                        required
                        name="capacity"
                        component={TextFieldFinal}
                        type="number"
                        variant="outlined"
                        dir="rtl"
                        className="custom-field"
                    />
                    <OnChange name="capacity">
                        {(value, previous) => {
                            handleOnChange(value, previous);
                        }}
                    </OnChange>
                </Grid>
                <Divider />
                <Typography
                    color="textPrimary"
                    gutterBottom
                    mb={4}
                    mt={6}
                    variant="h4"
                >
                    المرفقات
                </Typography>
                <Grid
                    container
                    spacing={10}
                    mb={3}
                >
                    <Attachements
                        values={values}
                        setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
                    />
                </Grid>
            </Grid>
        </>
    )
};

export default NewLocationData;