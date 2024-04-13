import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAuth } from "../../config/axiosConfig";
import config from "../../config/config";

export const getOneCart = createAsyncThunk(
  "getOneCart",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosAuth.get(
        config.apiUserUrl + "/cart/" + payload
      );
      return response.data;
    } catch (error) {
      const { data, status, ...rest } = error.response;
      throw rejectWithValue({ data, status });
    }
  }
);

export const createCart = createAsyncThunk(
  "createCart",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosAuth.get(config.apiUserUrl + "/cart");
      return response.data;
    } catch (error) {
      const { data, status, ...rest } = error.response;
      throw rejectWithValue({ data, status });
    }
  }
);

export const getAllCartItems = createAsyncThunk(
  "getAllCartItems",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosAuth.get(
        config.apiUserUrl + "/cart/items/" + payload
      );
      return response.data;
    } catch (error) {
      const { data, status, ...rest } = error.response;
      throw rejectWithValue({ data, status });
    }
  }
);

export const addItemToCart = createAsyncThunk(
  "createCartItem",
  async ({ payload, userId }, { rejectWithValue }) => {
    try {
      const response = await axiosAuth.post(
        config.apiUserUrl + "/cart/items/" + userId,
        payload
      );
      return response.data;
    } catch (error) {
      const { data, status, ...rest } = error.response;
      throw rejectWithValue({ data, status });
    }
  }
);

export const deleteItemCart = createAsyncThunk(
  "deleteCartItem",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosAuth.delete(
        config.apiUserUrl + "/cart/items/" + payload
      );
      return response.data;
    } catch (error) {
      const { data, status, ...rest } = error.response;
      throw rejectWithValue({ data, status });
    }
  }
);

export const updateStatusOrderItemCart = createAsyncThunk(
  "updateStatusOrderItemCart",
  async ({ itemId, payload }, { rejectWithValue }) => {
    try {
      const response = await axiosAuth.put(
        config.apiUserUrl + "/cart/items/status/" + itemId,
        payload
      );
      return response.data;
    } catch (error) {
      const { data, status, ...rest } = error.response;
      throw rejectWithValue({ data, status });
    }
  }
);

export const updateQtyOrderItemCart = createAsyncThunk(
  "updateQtyOrderItemCart",
  async ({ itemId, payload }, { rejectWithValue }) => {
    try {
      const response = await axiosAuth.put(
        config.apiUserUrl + "/cart/items/qty/" + itemId,
        payload
      );
      return response.data;
    } catch (error) {
      const { data, status, ...rest } = error.response;
      throw rejectWithValue({ data, status });
    }
  }
);
