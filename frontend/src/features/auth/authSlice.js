import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, logoutThunk, profileThunk } from "./authThunk.js";

const initialState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
      })

      .addCase(profileThunk.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.isAuthenticated = true;
      })

      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setAccessToken } = authSlice.actions;

export default authSlice.reducer;
