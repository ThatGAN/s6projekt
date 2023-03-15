import { configureStore } from "@reduxjs/toolkit";
import entryReducer from "../components/Slices/entrySlice.js";
import authReducer from "../components/Slices/authSlice.js";
import userReducer from "../components/Slices/userSlice.js";
import stationReducer from "../components/Slices/stationSlice.js";
import UserAddNewStationReducer from "../components/Slices/userCreateStationSlice.js";
import openWeather from "../components/Slices/openWeather.js";

const store = configureStore({
  reducer: {
    entry: entryReducer,
    auth: authReducer,
    user: userReducer,
    station: stationReducer,
    userAddNewStation: UserAddNewStationReducer,
    openWeather: openWeather,
  },
});

export default store;
