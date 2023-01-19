import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewStation } from "../Slices/UserCreateStationSlice.js";

export interface AddNewSationDialogProps {
  open: boolean;
  onClose: (value: string) => void;
}

const initialState = {
  name: "",
  location: "",
};

export function AddNewStationDialog(props: AddNewSationDialogProps) {
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

  const addNewStationLocal = () => {
    dispatch(addNewStation(form));
  };

  const handleChange = (event) => {
    // setStationId(event.target.value);
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Create New Station</DialogTitle>
      <TextField
        id="outlined-basic"
        label="Station Name"
        variant="outlined"
        onChange={handleChange}
        name="name"
      />
      <TextField
        id="outlided-basic"
        label="Station Location"
        variant="outlined"
        onChange={handleChange}
        name="location"
      />
      <span
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <Stack spacing={2} direction="row">
          <Button variant="contained" onClick={() => addNewStationLocal()}>
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
