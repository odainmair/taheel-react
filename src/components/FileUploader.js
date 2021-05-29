import React from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useContext } from 'react';
import localContext from 'src/localContext';
import { uploadDocumentApi } from 'src/pages/services/final-license/services/finalLicenseAPI'

const FileUploader = ({ handleFile, name, label, multiple, section, sectionFile }) => {
  const { documents, SetDocuments } = useContext(localContext);

  const hiddenFileInput = React.useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    if (multiple) {
      console.log("documents['requirements'][name]>>>>", section, documents['requirements'][sectionFile])
      documents[section][sectionFile] = [] // reset the value in case update the attachments
      SetDocuments(documents)
    }
    const fileUploaded = event.target.files;
    console.log('>>fileUploaded...', fileUploaded)
    for (let i = 0; i < fileUploaded.length; i++) {
      handleFile(fileUploaded[i]);
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
              <CloudUploadIcon />
            </InputAdornment>
          ),
        }}
      />
      <input
        multiple={multiple}
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
  multiple: PropTypes.bool.isRequired,
  section: PropTypes.string.isRequired,
  sectionFile: PropTypes.string.isRequired,
};
