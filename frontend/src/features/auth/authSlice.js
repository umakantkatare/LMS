import { createSlice } from "@reduxjs/toolkit";
import {
  loginThunk,
  logoutThunk,
  profileThunk,
  registerThunk,
} from "./authThunk";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        console.log('login slice:', action);
        state.user = action.payload.data;
        state.isAuthenticated = true;
      })
      .addCase(profileThunk.fulfilled, (state, action) => {
        console.log('profile', action);
        state.user = action.payload.data;
        state.isAuthenticated = true;
      })
      .addCase(logoutThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
