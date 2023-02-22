import { createSlice } from "@reduxjs/toolkit";

export const initialStateValue = "";

export const singleStation = createSlice({
  name: "singleStation",
  initialState: { value: initialStateValue },
  reducers: {
    getData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { getData } = singleStation.actions;

export default singleStation.reducer;
