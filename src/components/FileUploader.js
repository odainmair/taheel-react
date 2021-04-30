import React from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const FileUploader = ({ handleFile, name, label }) => {
  const hiddenFileInput = React.useRef(null);
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    handleFile(fileUploaded);
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
              <CloudUploadIcon />
            </InputAdornment>
          ),
        }}
      />
      <input
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
  handleFile: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
