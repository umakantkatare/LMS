// features/upload/uploadSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  progress: 0,
  status: "idle", // idle | uploading | success | error
  error: null,
  video: null,
};

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    startUpload: (state) => {
      state.status = "uploading";
      state.progress = 0;
      state.error = null;
    },
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
    uploadSuccess: (state, action) => {
      state.status = "success";
      state.video = action.payload;
    },
    uploadError: (state, action) => {
      state.status = "error";
      state.error = action.payload;
    },
    resetUpload: () => initialState,
  },
});

export const {
  startUpload,
  setProgress,
  uploadSuccess,
  uploadError,
  resetUpload,
} = uploadSlice.actions;

export default uploadSlice.reducer;
