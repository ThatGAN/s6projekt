import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialState = {
  loading: false,
  entries: [],
  error: "",
};

export const loginUser = createAsyncThunk(
  "/user/signin",
  (formdata, navigate) => {
    return axios
      .post("http://localhost:5000/user/signin", formdata)
      .then((response) => {
        localStorage.setItem("profile", JSON.stringify({ ...response?.data }));
        // navigate("/");
      });
  }
);

export const signupUser = createAsyncThunk(
  "/user/singup",
  (formdata, navigate) => {
    return axios
      .post("http://localhost:5000/user/signup", formdata)
      .then((response) => {
        localStorage.setItem("profile", JSON.stringify({ ...response?.data }));
        navigate("/");
      });
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = "";
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.user = [];
      state.error = action.error.message;
    });
  },
});
export default authSlice.reducer;
