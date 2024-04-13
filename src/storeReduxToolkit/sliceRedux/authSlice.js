import { createSlice } from "@reduxjs/toolkit";
import { authRegister, authLogin, authLogout } from "../thunksRedux/authThunk";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    authToken: localStorage.getItem("authToken") || null,
    isLoading: false,
    isError: null,
  },
  extraReducers(builders) {
    builders
      .addCase(authRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authRegister.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(authRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
    builders
      .addCase(authLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
        state.authToken = action.payload.token;
        localStorage.setItem("authToken", action.payload.token);
        localStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(authLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
    builders
      .addCase(authLogout.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(authLogout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.authToken = null;
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
      })
      .addCase(authLogout.rejected, (state, action) => {
        const { status, data, ...rest } = action.payload;
        state.isLoading = false;
        state.isError = { status, data };
      });
  },
});

export const authReducer = authSlice.reducer;
