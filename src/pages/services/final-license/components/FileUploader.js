import FileUploader from 'src/components/FileUploader';
import { TextField, InputAdornment, Typography, CircularProgress } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { uploadDocument } from '../services/finalLicenseUtil'
import PropTypes from 'prop-types';
import React from 'react';
import { uploadDocumentApi } from '../services/finalLicenseAPI';
import { useEffect } from 'react';

const FileUploaderComp = ({ input: { value, name }, label, meta, inputType, setField, values, rowIndex = -1 }) => {
  const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched;
  const [loading, setLoading] = React.useState(false);
  const hiddenFileInput = React.useRef(null);
  const [uploadedFileName, setUploadedFileName] = React.useState("");
  useEffect(() => {

    console.log(`-- FileUploaderComp RowIndex ${name}`);
    console.log(`-- FileUploaderComp RowIndex ${rowIndex} ${rowIndex && rowIndex !== -1}`);
    let docId = ""
    if (rowIndex !== -1) {
      if (values) {
        docId = values.customers[rowIndex][name.split('.')[1]];
        console.log(`-- FileUploaderComp RowIndex ${name} ${JSON.stringify(values[name])} ${JSON.stringify(values.customers[rowIndex][name])}`);
      }
    }
    else docId = (values) ? values[name] : "";

    if (docId)
      setUploadedFileName(JSON.stringify(docId));

  }, [])

  const setDocument = (name, docID, multiple) => {
    if (!multiple)
      setField(name, [docID])
    else {
      multipleDocs.push(docID)
      setField(name, multipleDocs)
    }
  }
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const handleChange = async (event) => {
    setLoading(true)
    const fileUploaded = event.target.files;
    for (let i = 0; i < fileUploaded.length; i++) {
      const buf = await uploadDocument(fileUploaded[i]);
      const response = await uploadDocumentApi("test", buf);

      console.log('...response...', response)
      if (!response.isSuccessful)
        SetErrMessage(response.message)
      else {
        setUploadedFileName(response.responseBody.docID)
        setDocument(name, response.responseBody.docID, false)
      }
    }
    setLoading(false);
  };

  return (
    <>
      <TextField
        fullWidth
        label={`${label} ${uploadedFileName}`}
        name={name}
        onClick={handleClick}
        variant="outlined"
        dir="rtl"
        disabled
        helperText={meta.error}
        error={showError}
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
        onChange={(event) => { handleChange(event) }}
        style={{ display: 'none' }}
      />

    </>

  );
}
export default FileUploaderComp;

FileUploaderComp.propTypes = {
  input: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  inputType: PropTypes.bool,
  setField: PropTypes.func,
  values: PropTypes.object,
  meta: PropTypes.object,
  rowIndex: PropTypes.number

}
