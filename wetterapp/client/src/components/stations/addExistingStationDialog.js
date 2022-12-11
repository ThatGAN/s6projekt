import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addExistingStation } from "../Slices/UserSlice.js";

export interface AddExistingStationDialogProps {
  open: boolean;
  onClose: (value: string) => void;
}

const initialState = {
  stationId: "",
  token: "",
};

export function AddExistingStationDialog(props: AddExistingStationDialogProps) {
  const [form, setForm] = useState(initialState);
  const { onClose, selectedValue, open } = props;
  // const [stationId, setStationId] = useState("");
  const dispatch = useDispatch();

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  const addStationById = () => {
    console.log("test");
    console.log("id: ", form.stationId);
    form.token = JSON.parse(localStorage.getItem("profile")).token;
    console.log("form token: ", form.token);
    dispatch(addExistingStation(form));
  };

  const handleChange = (event) => {
    // setStationId(event.target.value);
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Add Existing Station</DialogTitle>
      <TextField
        id="outlined-basic"
        label="Station ID"
        variant="outlined"
        onChange={handleChange}
        name="stationId"
      />
      <span
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <Stack spacing={2} direction="row">
          <Button variant="contained" onClick={() => addStationById()}>
            Add
          </Button>
          <Button variant="outlined" onClick={() => handleClose()}>
            Cancel
          </Button>
        </Stack>
      </span>
    </Dialog>
  );
}
