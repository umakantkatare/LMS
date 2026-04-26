// controllers/upload.controller.js

import asyncHandler from "../utils/asyncHandler.js";

import {
  uploadImageService,
  signVideoUploadService,
  deleteFileService,
} from "../services/upload.service.js";

/**
 * POST /api/v1/upload/image
 */
export const uploadImage = asyncHandler(async (req, res) => {
  const data = await uploadImageService(req.file, req.body.folder);

  res.status(200).json({
    success: true,
    message: "Image uploaded successfully",
    data,
  });
});

/**
 * POST /api/v1/upload/sign-video
 */
export const signVideoUpload = asyncHandler(async (req, res) => {
  const data = await signVideoUploadService(req.body.folder);

  res.status(200).json({
    success: true,
    data,
  });
});

/**
 * DELETE /api/v1/upload/:publicId
 */
export const deleteFile = asyncHandler(async (req, res) => {
  const data = await deleteFileService(req.params.publicId);

  res.status(200).json({
    success: true,
    message: "File deleted successfully",
    data,
  });
});
