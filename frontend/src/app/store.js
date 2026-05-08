import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import courseReducer from "../features/course/courseSlice";
import uploadReducer from "../features/upload/uploadVideoSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
    upload: uploadReducer
  },
});
