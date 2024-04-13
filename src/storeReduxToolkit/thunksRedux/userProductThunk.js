import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosWithKey } from "../../config/axiosConfig";
import config from "../../config/config";

export const getAllProductUser = createAsyncThunk(
  "getAllProductUser",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosWithKey.get(config.apiUserUrl + "/product", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
