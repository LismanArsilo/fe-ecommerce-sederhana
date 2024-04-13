import { createSlice } from "@reduxjs/toolkit";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getOneCategory,
} from "../thunksRedux/categoryThunk";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    category: null,
    listCategories: [
      {
        value: "",
        label: "",
      },
    ],
    isLoadingOne: false,
    isLoadingAll: false,
    isErrorOne: null,
    isErrorAll: null,
    paginate: null,
  },
  extraReducers(builders) {
    builders
      .addCase(getAllCategory.pending, (state) => {
        state.isLoadingAll = true;
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        const categories = action.payload.data;
        state.isLoadingAll = false;
        state.categories = categories;
        state.listCategories = categories.data.map((color) => ({
          value: color.id,
          label: color.name,
        }));
        state.paginate = categories.current_page;
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        state.isLoadingAll = false;
        state.isError = action.error;
      });
    builders
      .addCase(getOneCategory.pending, (state, action) => {
        state.isLoadingOne = true;
      })
      .addCase(getOneCategory.fulfilled, (state, action) => {
        state.isLoadingOne = false;
        state.category = action.payload.data;
      })
      .addCase(getOneCategory.rejected, (state, action) => {
        state.isLoadingOne = false;
        state.isError = action.payload;
      });
    builders
      .addCase(createCategory.pending, (state, action) => {
        state.isLoadingAll = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoadingAll = false;
        state.categories.unshift(action.payload.data);
        state.paginate = 1;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoadingAll = false;
        state.isError = action.payload;
      });
    builders
      .addCase(deleteCategory.pending, (state, action) => {
        state.isLoadingAll = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        const id = action.meta.arg;
        const filterCategories = state.categories.data.filter((category) => {
          return category.id !== id;
        });
        state.isLoadingAll = false;
        state.categories = filterCategories;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        const error = action.payload;
        state.isLoadingAll = false;
        state.isError = error.message;
      });
  },
});

export const categoryReducer = categorySlice.reducer;
