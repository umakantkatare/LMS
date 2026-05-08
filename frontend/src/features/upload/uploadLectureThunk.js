import { uploadVideo } from "@/api/uploadVideo";
import {
  startUpload,
  setProgress,
  uploadSuccess,
  uploadError,
} from "./uploadVideoSlice";
import { createLecture } from "@/api/lectureApi";

export const uploadLectureThunk =
  ({ file, courseId }) =>
  async (dispatch) => {
    dispatch(startUpload());

    try {
      // 1. Upload video
      const uploadResult = await uploadVideo(file, {
        onProgress: (p) => dispatch(setProgress(p)),
      });

      if (!uploadResult?.url) {
        throw new Error(uploadResult.error || "Upload failed");
      }

      // 2. Create lecture
      const lecture = await createLecture(courseId, {
        title: file.name,
        videoUrl: uploadResult.url,
        videoFileId: uploadResult.fileId,
      });

        // const lecture = res.data?.data || res.data;

      // 3. Update UI (important)
      dispatch(addLectureToCourse(lecture)); 

      // 3. Success
      dispatch(
        uploadSuccess({
          video: uploadResult,
          lecture,
        }),
      );

      return { video: uploadResult, lecture };
    } catch (error) {
      dispatch(uploadError(error.message));
      return { success: false, error: error.message };
    }
  };
