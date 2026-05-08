// features/upload/uploadThunk.js
import { uploadVideo } from "@/api/uploadVideo";
import {
  startUpload,
  setProgress,
  uploadSuccess,
  uploadError,
} from "./uploadVideoSlice";

export const uploadVideoThunk = (file) => async (dispatch) => {
  dispatch(startUpload());

  let attempts = 0;
  const MAX_RETRY = 2;

  while (attempts <= MAX_RETRY) {
    try {
      const result = await uploadVideo(file, {
        onProgress: (p) => dispatch(setProgress(p)),
      });

      if (result.success === false) {
        throw new Error(result.error);
      }

      dispatch(uploadSuccess(result));
      return result;
    } catch (error) {
      attempts++;

      if (attempts > MAX_RETRY) {
        dispatch(uploadError(error.message));
        return;
      }
    }
  }
};
