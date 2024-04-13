import { createSlice } from "@reduxjs/toolkit";
import { getAllProductUser } from "../thunksRedux/userProductThunk";

const userProductSlice = createSlice({
  name: "userProduct",
  initialState: {
    userProducts: [],
    isLoadingProduct: false,
    isErrorProduct: null,
  },
  extraReducers: (builders) => {
    builders
      .addCase(getAllProductUser.pending, (state) => {
        state.isLoadingProduct = true;
      })
      .addCase(getAllProductUser.fulfilled, (state, action) => {
        state.isLoadingProduct = false;
        state.userProducts = action.payload.data;
      })
      .addCase(getAllProductUser.rejected, (state, action) => {
        state.isLoadingProduct = false;
        state.isError = action.payload;
      });
  },
});

export const userProductReducer = userProductSlice.reducer;
