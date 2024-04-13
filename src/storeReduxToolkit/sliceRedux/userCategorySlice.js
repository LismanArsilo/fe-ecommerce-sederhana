import { createSlice } from "@reduxjs/toolkit";
import { getAllCategoryUser } from "../thunksRedux/userCategoryThunk";

const userCategorySlice = createSlice({
  name: "userCategory",
  initialState: {
    userCategories: [],
    isLoading: false,
    isError: null,
  },
  extraReducers: (builders) => {
    builders
      .addCase(getAllCategoryUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCategoryUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userCategories = action.payload.data;
      })
      .addCase(getAllCategoryUser.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export const userCategoryReducer = userCategorySlice.reducer;
