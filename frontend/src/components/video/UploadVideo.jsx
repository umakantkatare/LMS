import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadLectureThunk } from "@/features/upload/uploadLectureThunk";

const UploadVideo = ({ courseId }) => {
  const dispatch = useDispatch();
  const { progress, status, error } = useSelector((s) => s.upload);

  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    await dispatch(
      uploadLectureThunk({
        file: selectedFile,
        courseId,
      }),
    );
  };

  const handleRetry = () => {
    if (!file) return;

    dispatch(
      uploadLectureThunk({
        file,
        courseId,
      }),
    );
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md space-y-4">
      {/* Title */}
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
        Upload Lecture Video
      </h2>

      {/* File Input */}
      <label className="block">
        <span className="sr-only">Choose video</span>
        <input
          type="file"
          accept="video/*"
          onChange={handleUpload}
          className="block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-lg file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-600 file:text-white
                     hover:file:bg-blue-700
                     cursor-pointer"
        />
      </label>

      {/* File Info */}
      {file && (
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 truncate">
          Selected: {file.name}
        </p>
      )}

      {/* Upload Progress */}
      {status === "uploading" && (
        <div className="space-y-2">
          <div className="flex justify-between text-xs sm:text-sm text-gray-600 dark:text-gray-300">
            <span>Uploading & creating lecture...</span>
            <span>{progress}%</span>
          </div>

          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-600 h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Success */}
      {status === "success" && (
        <p className="text-sm text-green-600">
          Lecture created successfully ✅
        </p>
      )}

      {/* Error */}
      {status === "error" && (
        <div className="space-y-2">
          <p className="text-sm text-red-500">{error}</p>

          <button
            onClick={handleRetry}
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg transition"
          >
            Retry Upload
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadVideo;
