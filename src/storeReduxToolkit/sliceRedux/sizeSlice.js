import { createSlice } from "@reduxjs/toolkit";
import {
  createSize,
  deleteSize,
  getAllSize,
  getListSize,
  getOneSize,
} from "../thunksRedux/sizeThunk";

const sizeSlice = createSlice({
  name: "size",
  initialState: {
    sizes: [],
    size: null,
    listSizes: [],
    isLoadingAll: false,
    isErrorAll: null,
    isLoadingOne: false,
    isErrorOne: null,
    paginate: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSize.pending, (state, action) => {
        state.isLoadingAll = true;
      })
      .addCase(getAllSize.fulfilled, (state, action) => {
        const sizes = action.payload.data;
        state.isLoadingAll = false;
        state.sizes = sizes;
        state.paginate = sizes.current_page;
      })
      .addCase(getAllSize.rejected, (state, action) => {
        state.isLoadingAll = false;
        state.isErrorAll = action.payload;
      });
    builder
      .addCase(getOneSize.pending, (state, action) => {
        state.isLoadingOne = true;
      })
      .addCase(getOneSize.fulfilled, (state, action) => {
        state.isLoadingOne = false;
        state.size = action.payload.data;
      })
      .addCase(getOneSize.rejected, (state, action) => {
        state.isLoadingOne = false;
        state.isErrorOne = action.payload;
      });
    builder
      .addCase(createSize.pending, (state, action) => {
        state.isLoadingAll = true;
      })
      .addCase(createSize.fulfilled, (state, action) => {
        state.isLoadingAll = false;
        state.sizes.unshift(action.payload.data);
        state.paginate = 1;
      })
      .addCase(createSize.rejected, (state, action) => {
        state.isLoadingAll = false;
        state.isError = action.payload;
      });
    builder
      .addCase(deleteSize.pending, (state, action) => {
        state.isLoadingAll = true;
      })
      .addCase(deleteSize.fulfilled, (state, action) => {
        const id = action.meta.arg;
        const filterSizes = state.sizes.data.filter((size) => {
          return size.id !== id;
        });
        state.isLoadingAll = false;
        state.sizes.data = filterSizes;
      })
      .addCase(deleteSize.rejected, (state, action) => {
        state.isLoadingAll = false;
        state.isError = action.payload;
      });
    builder
      .addCase(getListSize.pending, (state) => {
        state.isLoadingAll = true;
      })
      .addCase(getListSize.fulfilled, (state, action) => {
        const listSizes = action.payload.data;
        state.isLoadingAll = false;
        state.sizes = listSizes.data;
        state.listSizes = listSizes.data.map((size) => ({
          value: size.id,
          label: size.size_name,
        }));
      })
      .addCase(getListSize.rejected, (state, action) => {
        state.isLoadingAll = false;
        state.isError = action.payload;
      });
  },
});

export const sizeReducer = sizeSlice.reducer;
