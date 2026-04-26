import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import {
  createLectureService,
  getLectureByIdService,
  getLecturesBySectionService,
  updateLectureService,
  deleteLectureService,
  reorderLecturesService,
  publishLectureService,
  unpublishLectureService,
} from "../services/lecture.service.js";

/**
 * POST /api/v1/course/:id/lecture
 */
export const createLecture = asyncHandler(async (req, res) => {
  const lecture = await createLectureService(req.params.id, req.body, req.user);

  res.status(201).json({
    success: true,
    message: "Lecture created successfully",
    data: lecture,
  });
});

/**
 * GET /api/v1/lecture/:id
 */
export const getLectureById = asyncHandler(async (req, res) => {
  const lecture = await getLectureByIdService(req.params.id);

  res.status(200).json({
    success: true,
    data: lecture,
  });
});

/**
 * GET /api/v1/lecture/section/:sectionId
 */
export const getLecturesBySection = asyncHandler(async (req, res) => {
  const lectures = await getLecturesBySectionService(req.params.sectionId);

  res.status(200).json({
    success: true,
    count: lectures.length,
    data: lectures,
  });
});

/**
 * PUT /api/v1/lecture/:id
 */
export const updateLecture = asyncHandler(async (req, res) => {
  const lecture = await updateLectureService(req.params.id, req.body, req.user);

  res.status(200).json({
    success: true,
    message: "Lecture updated successfully",
    data: lecture,
  });
});

/**
 * DELETE /api/v1/lecture/:id
 */
export const deleteLecture = asyncHandler(async (req, res) => {
  await deleteLectureService(req.params.id, req.user);

  res.status(200).json({
    success: true,
    message: "Lecture deleted successfully",
  });
});

/**
 * PATCH /api/v1/lecture/reorder
 */
export const reorderLectures = asyncHandler(async (req, res) => {
  await reorderLecturesService(req.body.sectionId, req.body.items, req.user);

  res.status(200).json({
    success: true,
    message: "Lectures reordered successfully",
  });
});

/**
 * PATCH /api/v1/lecture/:id/publish
 */
export const publishLecture = asyncHandler(async (req, res) => {
  const lecture = await publishLectureService(req.params.id, req.user);

  res.status(200).json({
    success: true,
    message: "Lecture published successfully",
    data: lecture,
  });
});

/**
 * PATCH /api/v1/lecture/:id/unpublish
 */
export const unpublishLecture = asyncHandler(async (req, res) => {
  const lecture = await unpublishLectureService(req.params.id, req.user);

  res.status(200).json({
    success: true,
    message: "Lecture unpublished successfully",
    data: lecture,
  });
});
