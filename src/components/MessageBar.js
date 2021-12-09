import React, { useContext, forwardRef, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { GlobalContext } from "../GlobalState";
import { setMessage } from "../actions";

export default function MessageBar() {
  const { state, dispatch } = useContext(GlobalContext);
  const open = Boolean(state.message.text);
  const position = {
    vertical: "top",
    horizontal: "center",
  };

  const { vertical, horizontal } = position;
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  useEffect(() => {
    setTimeout(() => {
      dispatch(setMessage());
    }, 3000);
  }, [open, dispatch]);

  return (
    <div className="msg">
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        key={vertical + horizontal}
      >
        <Alert severity={state.message.variant} sx={{ width: "100%" }}>
          {state.message.text}!
        </Alert>
      </Snackbar>
    </div>
  );
}
