import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAuth } from "../../config/axiosConfig";
import config from "../../config/config";

export const getAllColor = createAsyncThunk(
  "color",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosAuth.get(config.apiUrl + "/color", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const getListColor = createAsyncThunk(
  "listColor",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosAuth.get(config.apiUrl + "/list/color", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const createColor = createAsyncThunk(
  "createColor",
  async (payload, { rejectWithValue }) => {
    console.info(payload);
    try {
      const response = await axiosAuth.post(config.apiUrl + "/color", payload);
      return response.data;
    } catch (error) {
      const errorMessage = error.response.data || [];
      return rejectWithValue(errorMessage);
    }
  }
);

export const getOneColor = createAsyncThunk(
  "getOneColor",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosAuth.get(config.apiUrl + "/color/" + payload);
      return response.data;
    } catch (error) {
      const errorMessage = error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteColor = createAsyncThunk(
  "deleteColor",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosAuth.delete(
        config.apiUrl + "/color/" + payload
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response.data || [];
      return rejectWithValue(errorMessage);
    }
  }
);
