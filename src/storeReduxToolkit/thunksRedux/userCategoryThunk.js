import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAuth, axiosWithKey } from "../../config/axiosConfig";
import config from "../../config/config";

export const getAllCategoryUser = createAsyncThunk(
  "getAllCategoryUser",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosWithKey.get(config.apiUserUrl + "/category", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
