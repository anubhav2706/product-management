import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { CircularProgress } from "@material-ui/core";

const RenderButton = ({ handleClose, onDelete, disableClose }) => {
  if (disableClose) {
    return <CircularProgress />;
  }
  return (
    <div>
      <Button onClick={handleClose} style={{ color: "red" }}>
        Cancel
      </Button>
      <Button onClick={onDelete} color="primary" autoFocus>
        Continue
      </Button>
    </div>
  );
};

export default function ConfirmationDialog({
  id,
  handleClose,
  showDialog,
  onDelete,
  disableClose
}) {
  return (
    <div>
      <Dialog
        open={showDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableBackdropClick={disableClose}
        disableEscapeKeyDown={disableClose}
      >
        <DialogTitle id="alert-dialog-title">Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You will delete this data. Continue ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <RenderButton handleClose={handleClose} onDelete={onDelete} disableClose={disableClose} />
        </DialogActions>
      </Dialog>
    </div>
  );
}
