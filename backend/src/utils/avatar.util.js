import imagekit from "../configs/imagekit.config.js";
import logger from "./logger.util.js";

const uploadToImageKit = async (file, folder = "/lms/students") => {
  if (!file) {
    logger.warn("No file provided for upload");
    return null;
  }

  try {
    logger.info("Uploading file to ImageKit", {
      fileName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
    });

    const result = await imagekit.files.upload({
      file: file.buffer.toString("base64"),
      fileName: file.originalname,
      folder,
    });

    logger.info("Upload success", {
      url: result.url,
      fileId: result.fileId,
    });

    return {
      public_id: result.fileId,
      secure_url: result.url,
    };
  } catch (error) {
    logger.error("Upload failed", {
      message: error.message,
      stack: error.stack,
    });

    throw error;
  }
};

const deleteFromImageKit = async (fileId) => {
  try {
    if (!fileId) {
      logger.warn("deleteFromImageKit called without fileId");
      return;
    }

    logger.info("Deleting file from ImageKit", { fileId });

    const response = await imagekit.files.delete(fileId);

    logger.info("File deleted from ImageKit successfully", {
      fileId,
      response,
    });

    return response;
  } catch (error) {
    logger.error("Error deleting file from ImageKit", {
      message: error.message,
      stack: error.stack,
      fileId,
    });

    throw error; 
  }
};

export { uploadToImageKit, deleteFromImageKit };
