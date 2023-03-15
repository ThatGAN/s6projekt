import { createAsyncThunk, createThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  entries: [],
  error: "",
};

/*
ToDo:
1. Api Call für openWeatherComponent
    1.1 Location übergabe
2. Drop Down Menu von LocalStorage weg

*/
export const fetchOpenWeather = createAsyncThunk(
  "/openWeatherData/getData",
  (location) => {
    var data = [];
    console.log(location);
    return axios
      .post("http://localhost:5000/openWeatherData/getData", {
        location: location,
      })
      .then((response) => {
        return response.data;
      });
  }
);

const openWeather = createSlice({
  name: "entry",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchOpenWeather.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOpenWeather.fulfilled, (state, action) => {
      state.loading = false;
      state.stations = action.payload;
      state.error = "";
    });
    builder.addCase(fetchOpenWeather.rejected, (state, action) => {
      state.loading = false;
      state.stations = [];
      state.error = action.error.message;
    });
  },
});

export default openWeather.reducer;
