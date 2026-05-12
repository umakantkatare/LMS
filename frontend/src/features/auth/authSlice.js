import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, logoutThunk, profileThunk, refreshTokenThunk } from "./authThunk.js";

const initialState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateToken: (state, action) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
    },
    setLogout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loginThunk.rejected, (state) => {
        state.loading = false;
      })

      .addCase(refreshTokenThunk.pending, (state) => {
        state.loading = true; 
      })
      .addCase(refreshTokenThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
        state.loading = false; // Check khatam
      })
      .addCase(refreshTokenThunk.rejected, (state) => {
        state.isAuthenticated = false;
        state.loading = false; 
      })

      .addCase(profileThunk.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.isAuthenticated = true;
        state.loading = false;
      })

      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
        state.loading = false;
      });
  },
});

export const { updateToken, setLogout } = authSlice.actions;

export default authSlice.reducer;
