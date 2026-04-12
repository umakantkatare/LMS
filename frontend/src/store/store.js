import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/auth/authSlice";
import courseSliceReducer from "./slices/course/courseSlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    course: courseSliceReducer,
  },
  devTools: true,
});

export default store;
