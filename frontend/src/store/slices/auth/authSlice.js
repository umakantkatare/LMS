import axiosInstance from "@/services/axiosInstances";
import {
  asyncThunkCreator,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { toast } from "sonner";

const initialState = {
  isLoggedIn: false,
  role: "",
  data: null,
  loading: false,
  authChecked: false,
};

export const createAccount = createAsyncThunk(
  "/auth/signup",
  async (data, { rejectWithValue }) => {
    try {
      const resPromise = axiosInstance.post("user/register", data);

      toast.promise(resPromise, {
        loading: "Wait! Creating your account...",
        success: (res) => res?.data?.message,
        error: (err) => err?.response?.data?.message || "Signup failed",
      });

      const res = await resPromise;
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

export const loginAccount = createAsyncThunk(
  "/auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const resPromise = axiosInstance.post("user/login", data);
      toast.promise(resPromise, {
        loading: "loading...",
        success: (res) => res?.data?.message,
        error: (err) => err?.response?.data?.message || "login failed",
      });
      const res = await resPromise;
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

export const logoutAccount = createAsyncThunk(
  "/auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const resPromise = axiosInstance.get("user/logout");
      toast.promise(resPromise, {
        loading: "Wait! logout in progress...",
        success: (res) => res?.data?.message,
        error: (err) => err?.response?.data?.message || "Failed to log out",
      });
      const res = await resPromise;
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);
export const getProfile = createAsyncThunk(
  "/auth/profile",
  async (_, { rejectWithValue }) => {
    try {
      const resPromise = axiosInstance.get("user/me");
      toast.promise(resPromise, {
        loading: "Wait! logout in progress...",
        success: (res) => res?.data?.message,
        error: (err) => err?.response?.data?.message || "Failed to log out",
      });
      const res = await resPromise;
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);
export const editProfile = createAsyncThunk(
  "/user/edit-profile",
  async (data, { rejectWithValue }) => {
    try {
      const response = axiosInstance.put(
        `user/edit-profile/${data[0]}`,
        data[1],
      );
      const res = await response;
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAccount.pending, (state) => {
        state.error = null;
      })
      .addCase(loginAccount.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      })
      .addCase(logoutAccount.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.data = null;
        state.role = "";
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
        state.authChecked = true;
      })
      .addCase(getProfile.rejected, (state) => {
        state.isLoggedIn = false;
        state.data = null;
        state.role = "";
        state.authChecked = true;
      });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
