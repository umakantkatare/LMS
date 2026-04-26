import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import {
  createReviewService,
  updateReviewService,
  deleteReviewService,
  getCourseReviewsService,
} from "../services/review.service.js";

/**
 * POST /api/v1/review/:courseId
 */
export const createReview = asyncHandler(async (req, res) => {
  const review = await createReviewService(
    req.user._id,
    req.params.courseId,
    req.body,
  );

  res.status(201).json({
    success: true,
    message: "Review submitted successfully",
    data: review,
  });
});

/**
 * PUT /api/v1/review/:id
 */
export const updateReview = asyncHandler(async (req, res) => {
  const review = await updateReviewService(req.params.id, req.user, req.body);

  res.status(200).json({
    success: true,
    message: "Review updated successfully",
    data: review,
  });
});

/**
 * DELETE /api/v1/review/:id
 */
export const deleteReview = asyncHandler(async (req, res) => {
  await deleteReviewService(req.params.id, req.user);

  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
  });
});

/**
 * GET /api/v1/review/course/:courseId
 */
export const getCourseReviews = asyncHandler(async (req, res) => {
  const data = await getCourseReviewsService(req.params.courseId);

  res.status(200).json({
    success: true,
    ...data,
  });
});
