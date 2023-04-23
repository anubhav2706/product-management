import React from "react";
import Snackbar from "@material-ui/core/Snackbar";

const MySnackbar = ({ visible, message, duration, onClose }) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      open={visible}
      onClose={(e, reason) => onClose() }
      autoHideDuration={duration || 2000}
      ContentProps={{
        "aria-describedby": "message-id"
      }}
      message={<span id="message-id">{message}</span>}
    />
  );
};

export default MySnackbar;
