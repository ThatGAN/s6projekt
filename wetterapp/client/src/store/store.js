import { configureStore } from "@reduxjs/toolkit";
import entryReducer from "../components/Charts/entrySlice.js";
import authReducer from "../components/AUTH/authSlice.js";
import userReducer from "../components/Slices/UserSlice.js";
import UserAddNewStationReducer from "../components/Slices/UserCreateStationSlice.js";

const store = configureStore({
  reducer: {
    entry: entryReducer,
    auth: authReducer,
    user: userReducer,
    userAddNewStation: UserAddNewStationReducer,
  },
});

export default store;
