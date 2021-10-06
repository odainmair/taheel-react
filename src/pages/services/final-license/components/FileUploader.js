
/* eslint-disable  */
import FileUploader from 'src/components/FileUploader';
import { TextField, InputAdornment, Typography, CircularProgress } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { uploadDocument } from '../services/finalLicenseUtil'
import PropTypes from 'prop-types';
import React from 'react';
import { uploadDocumentApi } from '../services/finalLicenseAPI';
import { useEffect } from 'react';

const FileUploaderComp = ({ input: { value, name }, label,imgOnly, meta, setField, values, rowIndex = -1, multipleFile, tooltipText, resetAttachment=false }) => {
  const showRequiredError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched
  const [showFileError, setShowFileError] = React.useState(false)
  const [loading, setLoading] = React.useState(false);
  const hiddenFileInput = React.useRef(null);
  const [uploadedFileName, setUploadedFileName] = React.useState("");
  var multipleFileDocs = []
  useEffect(() => {
    console.log(`-- FileUploaderComp multipleFile ${multipleFile}`);
    console.log(`-- FileUploaderComp RowIndex ${name}`);
    console.log(`-- FileUploaderComp RowIndex ${rowIndex} ${rowIndex && rowIndex !== -1}`);
    let docId = ""
    /* if (rowIndex !== -1) {
       if (values) {
         docId = values.customers[rowIndex][name.split('.')[1]];
         console.log(`-- FileUploaderComp RowIndex ${name} ${JSON.stringify(values[name])} ${JSON.stringify(values.customers[rowIndex][name])}`);
       }
     }
     else */
    docId = (values) ? values[name] : "";

    // console.log(`========================> docId.length: ${docId.length}`)
    if (Array.isArray(docId) && docId.length > 0 && !!docId[0]) {
      // console.log(`========================> docId: ${docId[0]}`)
      setUploadedFileName(`تم رفع الملف ${values[`${name}FileName`] ? values[`${name}FileName`] : ""} بنجاح`);
    }
    else docId = (values) ? values[name] : "";

    if (docId)
      setUploadedFileName("تم رفع هذا الملف في نجاح");

  }, [])

  const setDocument = (name, docID, multipleFile) => {
    if (!multipleFile)
      setField(name, [docID])
    else {
      multipleFileDocs.push(docID)
      setField(name, multipleFileDocs)
    }
  }
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const handleChange = async (event) => {
    setLoading(true)
    const fileUploaded = event.target.files;
    console.log(`--fileUploaded ${fileUploaded}`);
    for (let i = 0; i < fileUploaded.length; i++) {
      console.log('...fileUploaded...', JSON.stringify(fileUploaded[i].name))
      console.log('...fileUploaded :: SIZE: ', JSON.stringify(fileUploaded[i].size) <= (1024 * 1024 * 2))

      const fileValidation = validateFile(fileUploaded[i],imgOnly)

      if (fileValidation && !fileValidation.isValid) {
        setShowFileError(true)
        setLoading(false)
        setErrMessage(fileValidation.error)
        return
      }

      setShowFileError(false)
      const buf = await uploadDocument(fileUploaded[i]);
      const response = await uploadDocumentApi(encodeURIComponent(fileUploaded[i].name), buf);

      console.log('...response...', response)
      if (!response.isSuccessful)
        SetErrMessage(response.message)
      else {
        setUploadedFileName("تم رفع هذا الملف في نجاح");
        setDocument(name, response.responseBody.docID, multipleFile)
      }
    }
    setLoading(false);
  };

  return (
    <>
      <TextField
        fullWidth
        label={`${label}`}
        name={name}
        onClick={handleClick}
        variant="outlined"
        dir="rtl"
        disabled
        helperText={showError?"يرجى ارفاق هذا الملف":uploadedFileName}
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
  imgOnly: PropTypes.bool,
  rowIndex: PropTypes.number

}

function validateFile(file, imgOnly) {
  let allowedExtensions = [];
  if (!imgOnly) {
    allowedExtensions = ['pdf', 'png', 'jpg', 'jpeg', 'docx', 'doc'];
  } else {
    allowedExtensions = ['png', 'jpg', 'jpeg'];
  }
  console.log("allowedExtensionsallowedExtensionsallowedExtensions",allowedExtensions)
  if (!allowedExtensions.includes(file.name.split('.').pop().toLowerCase())) {
    return { isValid: false, error: "امتداد الملف المراد رفعه غير مسموح به" }
  }
  else if (file.size > (1024 * 1024 * 5)) {
    return { isValid: false, error: "الملف المراد رفعه تجاوز الحد الأقصى (5 ميجابايت)" }
  }
}

