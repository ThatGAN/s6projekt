import { configureStore } from "@reduxjs/toolkit";
import entryReducer from "../components/Slices/entrySlice.js";
import authReducer from "../components/Slices/authSlice.js";
import userReducer from "../components/Slices/userSlice.js";
import {
  stationReducer,
  singelStationReducer,
} from "../components/Slices/stationSlice.js";
import UserAddNewStationReducer from "../components/Slices/userCreateStationSlice.js";

const store = configureStore({
  reducer: {
    entry: entryReducer,
    auth: authReducer,
    user: userReducer,
    station: stationReducer,
    singleStation: singelStationReducer,
    userAddNewStation: UserAddNewStationReducer,
  },
});

export default store;
