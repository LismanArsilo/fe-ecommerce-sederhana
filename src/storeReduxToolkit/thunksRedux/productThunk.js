import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAuth } from "../../config/axiosConfig";
import config from "../../config/config";
import axios from "axios";

export const getAllProduct = createAsyncThunk(
  "getAllProduct",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosAuth.get(config.apiUrl + "/product", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      console.info(error);
      const errorMessage = error.response || [];
      return rejectWithValue(errorMessage);
    }
  }
);

export const getOneProduct = createAsyncThunk(
  "getOneProduct",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosAuth.get(
        config.apiUrl + "/product/" + payload
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response || [];
      return rejectWithValue(errorMessage);
    }
  }
);

export const createProduct = createAsyncThunk(
  "createProduct",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosAuth.post(
        config.apiUrl + "/product",
        payload
      );
      return response.data;
    } catch (error) {
      console.info(error);
      const errorMessage = error.response.data || [];
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosAuth.delete(
        config.apiUrl + "/product/" + payload
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response.data || [];
      return rejectWithValue(errorMessage);
    }
  }
);

export const uploadProduct = createAsyncThunk(
  "uploadProduct",
  async ({ payload, id }, { rejectWithValue }) => {
    try {
      const response = await axiosAuth.post(
        config.apiUrl + "/upload/images/" + id,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response.data || [];
      return rejectWithValue(errorMessage);
    }
  }
);
