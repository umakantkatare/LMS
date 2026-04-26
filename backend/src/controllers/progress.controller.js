import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import {
  completeLectureService,
  getCourseProgressService,
  resumeCourseService,
  getAllProgressService,
} from "../services/progress.service.js";

/**
 * POST /api/v1/progress/complete
 */
export const completeLecture = asyncHandler(async (req, res) => {
  const { courseId, lectureId } = req.body;

  const progress = await completeLectureService(
    req.user._id,
    courseId,
    lectureId,
  );

  res.status(200).json({
    success: true,
    message: "Lecture marked completed",
    data: progress,
  });
});

/**
 * GET /api/v1/progress/:courseId
 */
export const getCourseProgress = asyncHandler(async (req, res) => {
  const progress = await getCourseProgressService(
    req.user._id,
    req.params.courseId,
  );

  res.status(200).json({
    success: true,
    data: progress,
  });
});

/**
 * PATCH /api/v1/progress/resume/:courseId
 */
export const resumeCourse = asyncHandler(async (req, res) => {
  const progress = await resumeCourseService(
    req.user._id,
    req.params.courseId,
    req.body.lectureId,
  );

  res.status(200).json({
    success: true,
    message: "Resume position updated",
    data: progress,
  });
});

/**
 * GET /api/v1/progress/all
 */
export const getAllProgress = asyncHandler(async (req, res) => {
  const data = await getAllProgressService(req.user._id);

  res.status(200).json({
    success: true,
    count: data.length,
    data,
  });
});
