import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  changePassword,
  forgotPassword,
  getProfile,
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
  resetPassword,
} from "@/api/authApi";

// Register
export const registerThunk = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await registerUser(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Registration failed",
      );
    }
  },
);

// Login
export const loginThunk = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await loginUser(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || "Login failed",
      );
    }
  },
);

// Get Profile
export const profileThunk = createAsyncThunk(
  "auth/profile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getProfile();
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch profile",
      );
    }
  },
);

// Logout
export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await logoutUser();
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || "Logout failed",
      );
    }
  },
);

// Forgot Password
export const forgotPasswordThunk = createAsyncThunk(
  "auth/forgotPassword",
  async (data, { rejectWithValue }) => {
    try {
      const res = await forgotPassword(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to send reset link",
      );
    }
  },
);

// Reset Password
export const resetPasswordThunk = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, data }, { rejectWithValue }) => {
    try {
      const res = await resetPassword(token, data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Password reset failed",
      );
    }
  },
);

// Change Password
export const changePasswordThunk = createAsyncThunk(
  "auth/changePassword",
  async (data, { rejectWithValue }) => {
    try {
      const res = await changePassword(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Password change failed",
      );
    }
  },
);

// Refresh Token
export const refreshTokenThunk = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const res = await refreshToken();
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || "Session expired",
      );
    }
  },
);
