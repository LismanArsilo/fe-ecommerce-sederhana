import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAuth } from "../../config/axiosConfig";
import config from "../../config/config";

export const getAllCategory = createAsyncThunk(
  "category",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosAuth.get(config.apiUrl + "/category", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response || [];
      return rejectWithValue(errorMessage);
    }
  }
);

export const getOneCategory = createAsyncThunk(
  "getOneCategory",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosAuth.get(
        config.apiUrl + "/category/" + payload
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response || [];
      return rejectWithValue(errorMessage);
    }
  }
);

export const createCategory = createAsyncThunk(
  "category/create",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosAuth.post(
        config.apiUrl + "/category",
        payload
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response.data || [];
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosAuth.delete(
        config.apiUrl + "/category/" + payload
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response.data || [];
      return rejectWithValue(errorMessage);
    }
  }
);
