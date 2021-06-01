import React from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment,Typography } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// import { useContext } from 'react';
// import localContext from 'src/localContext';
import { uploadDocumentApi } from 'src/pages/services/final-license/services/finalLicenseAPI'

const FileUploader = ({ handleFile, name, label, multiple }) => {
  // const { documents, SetDocuments } = useContext(localContext);

  const hiddenFileInput = React.useRef(null);
  const [fileName,setFileName] = React.useState('')
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    // if (multiple) {
    //   console.log("documents['requirements'][name]>>>>", section, documents['requirements'][sectionFile])
    //   documents[section][sectionFile] = [] // reset the value in case update the attachments
    //   SetDocuments(documents)
    // }
    const fileUploaded = event.target.files;
    console.log('>>fileUploaded...', fileUploaded)
    for (let i = 0; i < fileUploaded.length; i++) {
      setFileName(fileUploaded[i].name)
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
    <Typography variant="caption" display="block" color="error" gutterBottom>{fileName}</Typography>
      
    </>
  );
};
export default FileUploader;

FileUploader.propTypes = {
  handleFile: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  multiple: PropTypes.bool.isRequired,

};
