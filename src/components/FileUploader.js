import React from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment, Typography, CircularProgress } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { uploadDocumentApi } from 'src/pages/services/final-license/services/finalLicenseAPI'

const FileUploader = ({ handleFile, name, label, inputType, fileName }) => {
  const [loading, setLoading] = React.useState(false)
  const hiddenFileInput = React.useRef(null);
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    setLoading(true)
    const fileUploaded = event.target.files;
    for (let i = 0; i < fileUploaded.length; i++) {
      { console.log('>>>>>>>hhhhhhhhhhhhhhhhhiiiii from fileUploaded', fileName) }
      handleFile(fileUploaded[i], setLoading);
      fileName = fileUploaded[i].name
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

    </>
  );
};

export default FileUploader;

FileUploader.propTypes = {
  handleFile: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  inputType: PropTypes.string,
  fileName: PropTypes.func,
}
