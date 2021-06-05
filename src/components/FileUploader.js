import React from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment, Typography, CircularProgress } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const FileUploader = ({ values, setField, handleFile, name, label, inputType, fileName }) => {
  const [loading, setLoading] = React.useState(false)
  const hiddenFileInput = React.useRef(null);
  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = async (event) => {
    setLoading(true)
    const fileUploaded = event.target.files;
    for (let i = 0; i < fileUploaded.length; i++) {
      handleFile(fileUploaded[i], setLoading);
      setField(`${name}Att`, fileUploaded[i].name)
    }
  };

  return (
    <>
      <TextField
        fullWidth
        label={label}
        name={name}
        onClick={handleClick}
        variant="outlined"
        dir="rtl"
        disabled
        className="custom-field"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {loading ? <CircularProgress size="1rem" /> : <CloudUploadIcon />}
            </InputAdornment>
          ),
        }}
      />
      <input
        multiple={inputType}
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: 'none' }}
      />

      { values && values[`${name}Att`] &&
        <>
          <Typography name= {`${name}Att`} variant="caption" display="block" color="error" gutterBottom> {values[`${name}Att`]} </Typography>
        </>
      }
    </>
  );
};
export default FileUploader;

FileUploader.propTypes = {
  handleFile: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  fileName: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
  setField: PropTypes.func.isRequired,
  values: PropTypes.func.isRequired,

};
