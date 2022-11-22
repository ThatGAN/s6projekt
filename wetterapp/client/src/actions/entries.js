import { FETCH_ALL } from "../constants/actionTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import * as api from "../api/index.js";

const initialState = {
  loading: false,
  entries: [],
  error: "",
};

export const getEntries = (num) => async (dispatch) => {
  try {
    const dn = new Date();
    let dlm = new Date(dn.getTime());
    dlm.setDate(dn.getDate() - num);

    const { data } = await api.fetchEntries().then((val) => {
      console.log(val);
      val.data.data = val.data.data.filter((d) => {
        // console.log("d ", d.createdAt);
        let da = new Date(d.createdAt);
        return da.getTime() > dlm.getTime();
      });
    });

    dispatch({ type: "FETCH_ALL", payload: data });
    console.log(num);
  } catch (error) {
    console.log(error);
  }
};

// export const fetchEntries = createAsyncThunk("/entry/all", () => {
//   return axios.get("http://localhost:5000").then((response) => response.data);
// });

// const entrySlice = createSlice({
//   name: "entry",
//   initialState,
//   extraReducers: (builder) => {
//     builder.addCase(fetchEntries.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(fetchEntries.fulfilled, (state, action) => {
//       state.loading = false;
//       state.entries = action.payload;
//       state.error = "";
//     });
//     builder.addCase(fetchEntries.rejected, (state, action) => {
//       state.loading = false;
//       state.entries = [];
//       state.error = action.error.message;
//     });
//   },
// });
