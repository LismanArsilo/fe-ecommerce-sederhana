import { createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getOneProduct,
  uploadProduct,
} from "../thunksRedux/productThunk";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    product: null,
    isLoadingAll: false,
    isErrorAll: null,
    isLoadingOne: false,
    isErrorOne: null,
    isLoadingUpload: false,
    isErrorUpload: null,
    paginate: null,
  },
  extraReducers(builders) {
    builders
      .addCase(getAllProduct.pending, (state) => {
        state.isLoadingAll = true;
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        const product = action.payload.data;
        state.isLoadingAll = false;
        state.products = product;
        state.paginate = product.current_page;
      })
      .addCase(getAllProduct.rejected, (state, action) => {
        console.info(action.payload);
        state.isLoadingAll = false;
        state.isError = action.payload.data;
      });
    builders
      .addCase(getOneProduct.pending, (state, action) => {
        state.isLoadingOne = true;
      })
      .addCase(getOneProduct.fulfilled, (state, action) => {
        console.info(action);
        state.isLoadingOne = false;
        state.product = action.payload.data;
      })
      .addCase(getOneProduct.rejected, (state, action) => {
        state.isLoadingOne = false;
        state.isError = action.payload;
      });
    builders
      .addCase(createProduct.pending, (state) => {
        state.isLoadingAll = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        const product = action.payload;
        state.isLoadingAll = false;
        state.products.data.unshift(product.data);
      })
      .addCase(createProduct.rejected, (state, action) => {
        const error = action.payload;
        state.isLoadingAll = false;
        state.isError = error.message;
      });
    builders
      .addCase(deleteProduct.pending, (state, action) => {
        state.isLoadingAll = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const id = action.meta.arg;
        const filter = state.products.data.filter((product) => {
          return product.id !== id;
        });
        state.isLoadingAll = false;
        state.products.data = filter;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        const error = action.payload;
        state.isLoadingAll = false;
        state.isError = error.message;
      });
    builders
      .addCase(uploadProduct.pending, (state, action) => {
        state.isLoadingUpload = true;
      })
      .addCase(uploadProduct.fulfilled, (state, action) => {
        state.isLoadingUpload = false;
      })
      .addCase(uploadProduct.rejected, (state, action) => {
        state.isLoadingUpload = false;
        state.isErrorUpload = action.payload;
      });
  },
});

export const productReducer = productSlice.reducer;
