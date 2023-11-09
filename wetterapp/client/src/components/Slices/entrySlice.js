import { createAsyncThunk, createThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";

const initialState = {
  loading: false,
  entries: [],
  error: "",
};

export const fetchEntries = createAsyncThunk(
  "/entry/allByIdAndDate",
  (passedObject) => {
    const stationIds = passedObject[0];
    const dateArray = passedObject[1];
    console.log("Date", dateArray);
    var data = [];
    return axios
      .post("http://localhost:5000/entry/allByIdAndDate", {
        stationId: stationIds,
        date: dateArray,
      })
      .then((response) => {
        return response.data;
      });
  }
);

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
