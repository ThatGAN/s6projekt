import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  entries: [],
  error: "",
};

export const addNewStation = createAsyncThunk(
  "/stationCollection/addNewStation",
  (formdata) => {
    return axios
      .post("http://localhost:5000/stationCollection/addNewStation", formdata)
      .then((response) => {
        console.log("got: ", response.data);
      });
  }
);
const userAddNewStationSlice = createSlice({
  name: "stationCollection",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addNewStation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addNewStation.fulfilled, (state, action) => {
      state.loading = false;
      state.stationCollection = action.payload;
      state.error = "";
    });
    builder.addCase(addNewStation.rejected, (state, action) => {
      state.loading = false;
      state.stationCollection = [];
      state.error = action.error.message;
    });
  },
});

export default userAddNewStationSlice.reducer;
