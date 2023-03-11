import { createAsyncThunk, createThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  entries: [],
  error: "",
};

const profile = JSON.parse(localStorage.getItem("profile"));
/*
ToDo:
1. Api Call für openWeatherComponent
    1.1 Location übergabe
2. Drop Down Menu von LocalStorage weg

*/
export const  = createAsyncThunk(
  "/stationCollection/openWeatherData",
  () => {
    const stationIds = profile.result.stationIds;
    var data = [];
    return axios
      .post("http://localhost:5000/stationCollection/openWeatherData", {
        location: location,
      })
      .then((response) => {
        return response.data;
      });
  }
);

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

export default stationSlice.reducer;