import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  entries: [],
  error: "",
};

export const addExistingStation = createAsyncThunk(
  "/user/addExistingStation",
  (formdata) => {
    return axios
      .post("http://localhost:5000/user/addExistingStation", formdata)
      .then((response) => {});
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addExistingStation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addExistingStation.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = "";
    });
    builder.addCase(addExistingStation.rejected, (state, action) => {
      state.loading = false;
      state.user = [];
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
