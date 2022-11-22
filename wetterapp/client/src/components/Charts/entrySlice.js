import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  entries: [],
  error: "",
};

export const fetchEntries = createAsyncThunk("/entry/all", () => {
  console.log("test");
  return axios.get("http://localhost:5000/entry/all").then((response) => {
    console.log("got: ", response.data);

    return response.data;
  });
});

const entrySlice = createSlice({
  name: "entry",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchEntries.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchEntries.fulfilled, (state, action) => {
      state.loading = false;
      state.entries = action.payload;
      state.error = "";
    });
    builder.addCase(fetchEntries.rejected, (state, action) => {
      state.loading = false;
      state.entries = [];
      state.error = action.error.message;
    });
  },
});

export default entrySlice.reducer;
