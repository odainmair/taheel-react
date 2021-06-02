import React from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment,Typography, CircularProgress } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// import { useContext } from 'react';
// import localContext from 'src/localContext';
import { uploadDocumentApi } from 'src/pages/services/final-license/services/finalLicenseAPI'

const FileUploader = ({ handleFile, name, label, inputType, fileName }) => {
  // const { documents, SetDocuments } = useContext(localContext);
  const [loading, setLoading] = React.useState(false)

  const hiddenFileInput = React.useRef(null);
  // const [fileName,setFileName] = React.useState('')
  const handleClick = () => {
    hiddenFileInput.current.click();
    // setFileName(fileName)
  };
  const handleChange = (event) => {
    setLoading(true)
    // if (multiple) {
    //   console.log("documents['requirements'][name]>>>>", section, documents['requirements'][sectionFile])
    //   documents[section][sectionFile] = [] // reset the value in case update the attachments
    //   SetDocuments(documents)
    // }
    const fileUploaded = event.target.files;
    console.log('>>fileUploaded...', fileUploaded)
    for (let i = 0; i < fileUploaded.length; i++) {
      {console.log('>>>>>>>hhhhhhhhhhhhhhhhhiiiii from fileUploaded',fileName)}
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
              {/* <CloudUploadIcon /> */}
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
      {console.log('>>>>>>>fileName',fileName)}
    {/* <Typography variant="caption" display="block" color="error" gutterBottom>  {fileName}</Typography> */}
      
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

};
