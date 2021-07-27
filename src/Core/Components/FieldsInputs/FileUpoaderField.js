import React from 'react'
import { Grid, Box, TextField as TextFieldCore } from '@material-ui/core';
import FileUploader from 'src/components/FileUploader';
import PropTypes from 'prop-types'

export default function FileUploaderField(props) {
    const gridSize = !!props.gridSize ? props.gridSize : 12

    return (
        <Grid
            item
            md={6}
            xs={12}
        >
            <FileUploader
                handleFile={(test) => console.log(test)}
                label="نسخة من الهوية/ الاقامة"
                name="copyIDImage"
            />
        </Grid>
        )
}
FileUploaderField.propTypes = {
    labelRootStyle: PropTypes.object,
    tLabel: PropTypes.string,
    handleChange: PropTypes.func,
    gridSize: PropTypes.number,
    rows: PropTypes.number,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    multiline: PropTypes.bool,
    disabled: PropTypes.bool,
}