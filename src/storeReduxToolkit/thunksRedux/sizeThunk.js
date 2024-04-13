import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAuth } from "../../config/axiosConfig";
import config from "../../config/config";

export const getAllSize = createAsyncThunk(
  "getAllSize",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosAuth.get(config.apiUrl + "/size", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response.data || [];
      return rejectWithValue(errorMessage);
    }
  }
);

export const getOneSize = createAsyncThunk(
  "getOneSize",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosAuth.get(config.apiUrl + "/size/" + payload);
      return response.data;
    } catch (error) {
      const errorMessage = error.response.data || [];
      return rejectWithValue(errorMessage);
    }
  }
);

export const createSize = createAsyncThunk(
  "createSize",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosAuth.post(config.apiUrl + "/size", payload);
      return response.data;
    } catch (error) {
      const errorMessage = error.response.data || [];
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteSize = createAsyncThunk(
  "deleteSize",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosAuth.delete(
        config.apiUrl + "/size/" + payload
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response.data || [];
      return rejectWithValue(errorMessage);
    }
  }
);

export const getListSize = createAsyncThunk(
  "size/list",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosAuth.get(config.apiUrl + "/list/size");
      return response.data;
    } catch (error) {
      const errorMessage = error.response.data || [];
      return rejectWithValue(errorMessage);
    }
  }
);
