// controllers/section.controller.js


import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import {
  createSectionService,
  getSectionByIdService,
  getSectionsByCourseService,
  updateSectionService,
  deleteSectionService,
  reorderSectionsService,
} from "../services/section.service.js";

/**
 * POST /api/v1/course/:id/section
 */
export const createSection = asyncHandler(async (req, res) => {
  const section = await createSectionService(req.params.id, req.body, req.user);

  res.status(201).json({
    success: true,
    message: "Section created successfully",
    data: section,
  });
});

/**
 * GET /api/v1/section/:id
 */
export const getSectionById = asyncHandler(async (req, res) => {
  const section = await getSectionByIdService(req.params.id);

  res.status(200).json({
    success: true,
    data: section,
  });
});

/**
 * GET /api/v1/section/course/:courseId
 */
export const getSectionsByCourse = asyncHandler(async (req, res) => {
  const sections = await getSectionsByCourseService(req.params.courseId);

  res.status(200).json({
    success: true,
    count: sections.length,
    data: sections,
  });
});

/**
 * PUT /api/v1/section/:id
 */
export const updateSection = asyncHandler(async (req, res) => {
  const section = await updateSectionService(req.params.id, req.body, req.user);

  res.status(200).json({
    success: true,
    message: "Section updated successfully",
    data: section,
  });
});

/**
 * DELETE /api/v1/section/:id
 */
export const deleteSection = asyncHandler(async (req, res) => {
  await deleteSectionService(req.params.id, req.user);

  res.status(200).json({
    success: true,
    message: "Section deleted successfully",
  });
});

/**
 * PATCH /api/v1/section/reorder
 */
export const reorderSections = asyncHandler(async (req, res) => {
  await reorderSectionsService(req.body.courseId, req.body.items, req.user);

  res.status(200).json({
    success: true,
    message: "Sections reordered successfully",
  });
});
