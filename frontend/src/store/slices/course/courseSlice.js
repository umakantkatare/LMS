import axiosInstance from "@/services/axiosInstances";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";

const initialState = {
  courseData: [],
};

export const getAllCourses = createAsyncThunk(
  "/courses/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = axiosInstance.get("course");
      toast.promise(response, {
        loading: "loading course data...",
        success: "Courses loaded successfully",
        error: "Failed to get the courses",
      });
      const res = await response;
      return res?.data?.data?.courses;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

export const createCourse = createAsyncThunk(
  "/create-course",
  async (data, { rejectWithValue }) => {
    try {
      const response = axiosInstance.post("course/create", data);

      toast.promise(response, {
        loading: "Wait! Creating new course...",
        success: (res) => res?.data?.message,
        error: (err) =>
          err?.response?.data?.message || "course creatation failed",
      });

      const res = await response;
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      state.courseData = action.payload || [];
    });
  },
});

export default courseSlice.reducer;
