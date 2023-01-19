import { createAsyncThunk, createThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  entries: [],
  error: "",
};

const profile = JSON.parse(localStorage.getItem("profile"));

// export const fetchEntries = createAsyncThunk("/entry/all", () => {
//   console.log("tesssst");
//   // const userObj = localStorage.get("profile");
//   // console.log("obj: ", userObj);

//   return axios.get("http://localhost:5000/entry/all").then((response) => {
//     console.log("got: ", response.data);

//     return response.data;
//   });
// });

export const fetchEntries = createAsyncThunk("/entry/allById", () => {
  const stationIds = profile.result.stationIds;
  var data = [];
  return axios
    .post("http://localhost:5000/entry/allById", { stationId: stationIds })
    .then((response) => {
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
