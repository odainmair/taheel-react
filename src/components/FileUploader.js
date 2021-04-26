import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

const FileUploader = ({ handleFile }) => {
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
      <Button onClick={handleClick}>
        Upload a file
      </Button>
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
  handleFile: PropTypes.string.isRequired,
};
