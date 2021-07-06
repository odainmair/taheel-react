import FileUploader from 'src/components/FileUploader';
import { TextField, InputAdornment, Typography, CircularProgress, Tooltip } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { uploadDocument } from '../services/finalLicenseUtil'
import PropTypes from 'prop-types';
import React from 'react';
import { uploadDocumentApi } from '../services/finalLicenseAPI';
import InfoIcon from '@material-ui/icons/Info';
import { useEffect } from 'react';

const FileUploaderComp = ({ input: { value, name }, label, meta, setField, values, rowIndex = -1, multipleFile, tooltipText, resetAttachment=false }) => {
  const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched;
  const [loading, setLoading] = React.useState(false);
  const hiddenFileInput = React.useRef(null);
  const [uploadedFileName, setUploadedFileName] = React.useState();
  var multipleFileDocs = []
  useEffect(() => {
    console.log(`-- FileUploaderComp resetAttachment ${resetAttachment}`);
    console.log(`-- FileUploaderComp multipleFile ${multipleFile}`);
    console.log(`-- FileUploaderComp RowIndex ${name}`);
    console.log(`-- FileUploaderComp RowIndex ${rowIndex} ${rowIndex && rowIndex !== -1}`);

    setUploadedFileName("");

    let docId = ""
    /* if (rowIndex !== -1) {
       if (values) {
         docId = values.customers[rowIndex][name.split('.')[1]];
         console.log(`-- FileUploaderComp RowIndex ${name} ${JSON.stringify(values[name])} ${JSON.stringify(values.customers[rowIndex][name])}`);
       }
     }
     else */
    docId = (values) ? values[name] : "";

    if (docId) {
      setUploadedFileName(`تم رفع الملف ${values[`${name}FileName`]?values[`${name}FileName`]:""} بنجاح`);
    }

  }, [resetAttachment])

  const setDocument = (name, docID, multipleFile, fileName) => {
    if (!multipleFile) {
      setField(name, [docID])
      setField(`${name}FileName`, fileName);
    }
    else {
      multipleFileDocs.push(docID)
      setField(name, multipleFileDocs)
      setField(`${name}FileName`, fileName);
    }
  }
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const handleChange = async (event) => {
    setLoading(true)
    const fileUploaded = event.target.files;
    console.log(`--fileUploaded ${JSON.stringify(fileUploaded)}`);
    for (let i = 0; i < fileUploaded.length; i++) {
      console.log('...fileUploaded...', JSON.stringify(fileUploaded[i].name))
      const buf = await uploadDocument(fileUploaded[i]);
      const response = await uploadDocumentApi(fileUploaded[i].name, buf);

      console.log('...response...', response)
      if (!response.isSuccessful)
        SetErrMessage(response.message)
      else {
        setUploadedFileName(`تم رفع الملف ${fileUploaded[i].name} بنجاح`);
        setDocument(name, response.responseBody.docID, multipleFile, fileUploaded[i].name)
      }
    }
    event.target.value = "";
    setLoading(false);
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
        helperText={showError ? "يرجى ارفاق هذا الملف" : uploadedFileName}
        error={showError}
        className="custom-field"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {loading ? <CircularProgress size="1rem" /> : <CloudUploadIcon />}
            </InputAdornment>
          ),
          startAdornment: (
            tooltipText && (<InputAdornment position="start">
              <Tooltip title={tooltipText} style={{ maxWidth: 'none' }}>
                <InfoIcon />
              </Tooltip>
            </InputAdornment>)
          )
        }}
      />
      <input
        multiple={multipleFile}
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
  multipleFile: PropTypes.bool,
  setField: PropTypes.func,
  values: PropTypes.object,
  meta: PropTypes.object,
  tooltipText: PropTypes.string,
  resetAttachment: PropTypes.bool,
  rowIndex: PropTypes.number

}