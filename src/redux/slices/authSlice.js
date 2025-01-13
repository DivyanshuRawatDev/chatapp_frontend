import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../configs/common";

export const fetchSignupAPI = createAsyncThunk(
  "auth/signup",
  async function (credentials) {
    try {
      const response = await axios.post(`${BASE_URL}/signup`, credentials);
      toast.success(response?.data?.message);
      return response?.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Signup Failed! Please try again";
      toast.error(errorMessage);
      console.log("Error while singup : " + errorMessage);
    }
  }
);

export const fetchLoginAPI = createAsyncThunk(
  "auth/login",
  async function (credentials) {
    try {
      const response = await axios.post(`${BASE_URL}/login`, credentials,{withCredentials:true});
      return response?.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Login Failed! Please try again";
      toast.success(errorMessage);
      console.log("Error while Login : " + errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    isLoading: false,
    isSuccess:false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSignupAPI.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess=false
    });
    builder.addCase(fetchSignupAPI.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.isSuccess=true
    });
    builder.addCase(fetchSignupAPI.rejected, (state, action) => {
      state.isLoading = true;
    });


    // --------------------- Login -----------------------------

    builder.addCase(fetchLoginAPI.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess=false
      });
      builder.addCase(fetchLoginAPI.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isSuccess=true
        
      });
      builder.addCase(fetchLoginAPI.rejected, (state, action) => {
        state.isLoading = true;
      });
  },
});

export default authSlice.reducer;
