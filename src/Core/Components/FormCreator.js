import React, { useState } from 'react'
import FieldsCreator from "./FieldsCreator"
import { Form } from 'react-final-form'
import ButtonField from './FieldsInputs/ButtonField'
//import { useTranslation } from 'react-i18next'
import TypographyField from './FieldsInputs/TypographyField'
import FieldsValidator from '../Utils/FieldsValidator'
import {
    Button,
    Grid,
    Box,
    Card,
    Alert,
    CardContent,
    CardHeader,
    Divider,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { Navigate, useNavigate } from 'react-router'
import IconsTypeEnum from '../Utils/IconsTypeEnum'
import IconsList from './FieldsInputs/IconsList'

export default function FormCreator({ title, pageName, isLoading, submitInfo, schema, initValues, navBackUrl, sectionNames, cancel, formType, lookupObject, additionalFields, fieldsName, errMessage }) {
    //const [t] = useTranslation('common')
    const navigateion = useNavigate()
    const [loading, setLoading] = useState(false)
    const setField = (fieldName, fieldValue) => setField(fieldName, fieldValue)
    const handleSubmit = async values => {
        setLoading(true)
        if (!!handleSubmit)
            await submitInfo.onSubmit(values)
        setLoading(false)
    }
    console.log('==>> navBackUrl ', navBackUrl)
    return (
        <Box style={{ pointerEvents: loading ? "none" : '' }}>
            {<Form
                name={pageName}
                onSubmit={handleSubmit}
                validate={values => {
                    return FieldsValidator({ schema, values })
                }}
                initialValues={initValues}

                render={({ handleSubmit, values }) => (

                    <form onSubmit={handleSubmit}>
                        <Card>
                            <CardHeader
                                title={title}
                            />
                            <Divider />
                            <CardContent >
                                {errMessage && (
                                    <Alert variant="outlined" severity="error">
                                        {errMessage}
                                    </Alert>
                                )}
                                <Grid
                                    container
                                    spacing={3}
                                    mt={3}
                                    mb={3}
                                >
                                    {FieldsCreator({ schema, fieldsName, sectionNames, lookupObject, formType, values, isLoading, setField })}
                                </Grid>
                                {!!submitInfo ? <Box m={2} >
                                    <ButtonField btnName={submitInfo.btnName} loading={loading} />
                                    {additionalFields}
                                </Box>
                                    : ''
                                }
                                {!!navBackUrl ?
                                    (
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            onClick={() =>
                                                navigateion(navBackUrl.url, { state: navBackUrl.state })
                                            }
                                        >
                                            {IconsList(IconsTypeEnum.ARROW_FORWARD_ICON, "العودة للخلف")}
                                        </Button>)
                                    :
                                    ('')
                                }
                            </CardContent>
                        </Card>
                    </form>

                )}
            />
            }
        </Box>

    )
}
FormCreator.propTypes = {
    values: PropTypes.object,
    pageName: PropTypes.string,
    navBackUrl: PropTypes.string,
    formType: PropTypes.string,
    title: PropTypes.string,
    submitInfo: PropTypes.object,
    schema: PropTypes.array,
    initValues: PropTypes.object,
    sectionNames: PropTypes.array,
    cancel: PropTypes.object,
    lookupObject: PropTypes.object,
    additionalFields: PropTypes.object,
    fieldsName: PropTypes.object,
    errMessage: PropTypes.string,
    isLoading: PropTypes.bool,
}