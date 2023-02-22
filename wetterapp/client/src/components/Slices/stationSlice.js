import { createAsyncThunk, createThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const initialStateValue = "";

const initialState = {
  loading: false,
  entries: [],
  error: "",
};

const profile = JSON.parse(localStorage.getItem("profile"));

export const fetchStations = createAsyncThunk(
  "/stationCollection/allById",
  () => {
    const stationIds = profile.result.stationIds;
    var data = [];
    return axios
      .post("http://localhost:5000/stationCollection/allById", {
        stationId: stationIds,
      })
      .then((response) => {
        return response.data;
      });
  }
);

export const singleStation = createSlice({
  name: "singleStation",
  initialState: { value: initialStateValue },
  reducers: {
    getData: (state, action) => {
      state.value = action.payload;
    },
  },
});

const stationSlice = createSlice({
  name: "entry",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchStations.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchStations.fulfilled, (state, action) => {
      state.loading = false;
      state.stations = action.payload;
      state.error = "";
    });
    builder.addCase(fetchStations.rejected, (state, action) => {
      state.loading = false;
      state.stations = [];
      state.error = action.error.message;
    });
  },
});

export const { getData } = singleStation.actions;

export  singleStation.reducer;

export default stationSlice.reducer; 
