import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  axiosAuth,
  axiosWithKey,
  axiosWithOutAuth,
} from "../../config/axiosConfig";
import config from "../../config/config";

// mengirim rejected value use object
export const authRegister = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosWithKey.post(
        config.apiUrl + "/auth/register",
        payload
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response.data;
      return rejectWithValue(errorMessage);
    }
  }
);

export const authLogin = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosWithKey.post(
        config.apiUrl + "/auth/login",
        payload
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response.data;
      return rejectWithValue(errorMessage);
    }
  }
);

export const authLogout = createAsyncThunk(
  "auth/logout",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosAuth.get(config.apiUrl + "/auth/logout");
      return response.data;
    } catch (error) {
      const { data, status } = error.response;
      throw rejectWithValue({ data, status });
    }
  }
);
