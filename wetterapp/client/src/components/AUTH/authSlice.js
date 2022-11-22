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
    console.log("tes123t");
    return axios
      .post("http://localhost:5000/user/signin", formdata)
      .then((response) => {
        console.log("got: ", response.data);
        localStorage.setItem("profile", JSON.stringify({ ...response?.data }));
        // navigate("/");
        console.log("redirect");
      });
  }
);

export const signupUser = createAsyncThunk(
  "/user/singup",
  (formdata, navigate) => {
    console.log("test1234");

    return axios
      .post("http://localhost:5000/user/signup", formdata)
      .then((response) => {
        localStorage.setItem("profile", JSON.stringify({ ...response?.data }));
        navigate("/");
      });
  }
);

const userSlice = createSlice({
  name: "user",
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
//   API.interceptors.request.use((req) => {
//     if (localStorage.getItem("profile")) {
//       req.headers.Authorization = `Bearer ${
//         JSON.parse(localStorage.getItem("profile")).token
//       }`;
//     }

//     return req;
//   });

export default userSlice.reducer;
