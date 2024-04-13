import { createSlice } from "@reduxjs/toolkit";
import {
  createColor,
  deleteColor,
  getAllColor,
  getListColor,
  getOneColor,
} from "../thunksRedux/colorThunk";

const colorSlice = createSlice({
  name: "color",
  initialState: {
    colors: [],
    color: null,
    listColors: [],
    isLoadingAll: false,
    isErrorAll: null,
    isLoadingOne: false,
    isErrorOne: null,
    paginate: 1,
  },
  extraReducers: (builders) => {
    builders
      .addCase(getAllColor.pending, (state, action) => {
        state.isLoadingAll = true;
      })
      .addCase(getAllColor.fulfilled, (state, action) => {
        const colors = action.payload.data;
        state.isLoadingAll = false;
        state.colors = colors;
        state.paginate = colors.current_page;
      })
      .addCase(getAllColor.rejected, (state, action) => {
        state.isLoadingAll = false;
        state.isErrorAll = action.payload;
      });
    builders
      .addCase(getOneColor.pending, (state, action) => {
        state.isLoadingOne = true;
      })
      .addCase(getOneColor.fulfilled, (state, action) => {
        state.isLoadingOne = false;
        state.color = action.payload.data;
      })
      .addCase(getOneColor.rejected, (state, action) => {
        state.isLoadingOne = false;
        state.isErrorOne = action.payload;
      });
    builders
      .addCase(createColor.pending, (state, action) => {
        state.isLoadingAll = true;
      })
      .addCase(createColor.fulfilled, (state, action) => {
        const color = action.payload;
        state.isLoadingAll = false;
        state.colors.data.unshift(color.data);
        state.paginate = 1;
      })
      .addCase(createColor.rejected, (state, action) => {
        state.isLoadingAll = false;
        state.isErrorAll = action.payload;
      });
    builders
      .addCase(deleteColor.pending, (state, action) => {
        state.isLoadingAll = true;
      })
      .addCase(deleteColor.fulfilled, (state, action) => {
        const id = action.meta.arg;
        const filterColors = state.colors.data.filter((color) => {
          return color.id !== id;
        });
        state.isLoadingAll = false;
        state.colors = filterColors;
      })
      .addCase(deleteColor.rejected, (state, action) => {
        const error = action.payload;
        state.isLoadingAll = false;
        state.isErrorAll = error.message;
      });
    builders
      .addCase(getListColor.pending, (state) => {
        state.isLoadingAll = true;
      })
      .addCase(getListColor.fulfilled, (state, action) => {
        const colors = action.payload.data;
        state.isLoadingAll = false;
        state.listColors = colors.data.map((color) => ({
          value: color.id,
          label: color.color_name,
        }));
        state.paginate = colors.current_page;
      })
      .addCase(getListColor.rejected, (state, action) => {
        state.isLoadingAll = false;
        state.isError = action.payload;
      });
  },
});

export const colorReducer = colorSlice.reducer;
