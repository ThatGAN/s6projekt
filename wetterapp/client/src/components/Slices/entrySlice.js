import { createAsyncThunk, createThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";

const initialState = {
  loading: false,
  entries: [],
  error: "",
};

export const fetchEntries = createAsyncThunk("/entry/allById", () => {
  const selectedStation = localStorage.getItem("selectedStation");
  const stationIds = "637e7149f0007e04d9e986aa";
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
