import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import "./ManageActivityModal.css";

// api imports
import { postActivityType } from "../api/API";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ManageActivityModal({ open, setOpen }) {
  const [name, setName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    postActivityType({ name }).then((response) => {
      setName("");
      console.log(response);
    });
  };
  return (
    <div className="manageActivityForm">
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className="manageActivityModal__form" onSubmit={handleSubmit}>
            <TextField
              id="activityName"
              type="text"
              label="Add Activity Type"
              variant="standard"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button type="submit">Save</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default ManageActivityModal;
