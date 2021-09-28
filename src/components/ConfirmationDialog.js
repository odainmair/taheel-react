/* eslint-disable */
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ConfirmationDialog(props) {
  const { onCloseFn, onAcceptFn, dialogContent, dialogTitle, open, acceptBtnName,cancelBtnName, onEscapeKeyDown, onBackdropClick } = props;
  const handleClose = () => {
    onCloseFn();
  };
  const handleAccept = () => {
    onAcceptFn();
  };
  const handleBackdropClick = () => {
    onBackdropClick();
  };
  const handleEscapeKeyDown = () => {
    onEscapeKeyDown();
  };
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={(event, reason) => {
        console.log("reason :: " + reason)
           if (reason === 'backdropClick') {
            handleBackdropClick();
           }
           else if (reason === 'escapeKeyDown') {
            handleEscapeKeyDown();
           }
           else {
            handleClose();
           }
         }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      open={open}
    >
      <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
      {dialogContent && (<DialogContent>
        <DialogContentText style={{ textAlign: 'center' }} id="alert-dialog-description">
          {dialogContent}
        </DialogContentText>
      </DialogContent>)}
      <DialogActions>
        <Button
          onClick={handleAccept}
          color="primary"
          autoFocus
        >
          {acceptBtnName}
        </Button>
        <Button onClick={handleClose} color="primary">
          {cancelBtnName}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialog.propTypes = {
  onCloseFn: PropTypes.func.isRequired,
  onAcceptFn: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  dialogContent: PropTypes.string.isRequired,
  dialogTitle: PropTypes.string.isRequired,
  acceptBtnName: PropTypes.string.isRequired,
  cancelBtnName: PropTypes.string.isRequired,
};