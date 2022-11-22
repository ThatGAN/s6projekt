import { configureStore } from "@reduxjs/toolkit";
import entryReducer from "../components/Charts/entrySlice.js";
import userReducer from "../components/AUTH/authSlice.js";

const store = configureStore({
  reducer: {
    entry: entryReducer,
    user: userReducer,
  },
});

export default store;
