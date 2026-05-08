import api from "@/api/axios";

export const uploadVideo = async (file, { onProgress } = {}) => {
  try {
    // 1) Validate input
    if (!file) throw new Error("File is required");

    if (!file.type.startsWith("video/")) {
      throw new Error("Invalid file type. Only video allowed.");
    }

    const MAX_SIZE_MB = 500;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      throw new Error(`File too large. Max ${MAX_SIZE_MB}MB allowed.`);
    }

    // 2) Get Cloudinary signature
    const res = await api.post("/upload/sign-video", {
      folder: "courses",
    });

    const { signature, timestamp, apiKey, cloudName, folder } = res.data.data;

    if (!signature || !cloudName || !timestamp || !apiKey) {
      throw new Error("Invalid upload credentials");
    }

    // 3) Prepare form-data
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    formData.append("folder", folder);

    // 4) Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(
        "POST",
        `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
      );

      // Progress tracking
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable && onProgress) {
          const percent = Math.round((event.loaded / event.total) * 100);
          onProgress(percent);
        }
      };

      xhr.onload = () => {
        try {
          const response = JSON.parse(xhr.responseText);

          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(response);
          } else {
            reject(new Error(response.error?.message || "Upload failed"));
          }
        } catch {
          reject(new Error("Invalid response from upload server"));
        }
      };

      xhr.onerror = () => reject(new Error("Network error during upload"));
      xhr.ontimeout = () => reject(new Error("Upload timeout"));

      xhr.timeout = 1000 * 60 * 10; // 10 min (videos need more time)

      xhr.send(formData);
    });

    // 5) Validate Cloudinary response
    if (!uploadResult.secure_url || !uploadResult.public_id) {
      throw new Error("Incomplete upload response");
    }

    return {
      success: true,
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      duration: uploadResult.duration,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Upload failed",
    };
  }
};
