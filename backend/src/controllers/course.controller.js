import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import {
  createCourseService,
  getAllCoursesService,
  getPublishedCoursesService,
  getCourseByIdService,
  getCourseBySlugService,
  getInstructorCoursesService,
  updateCourseService,
  publishCourseService,
  unpublishCourseService,
  deleteCourseService,
} from "../services/course.service.js";

/**
 * POST /api/v1/course/create
 */
export const createCourse = asyncHandler(async (req, res, next) => {
  try {
    const course = await createCourseService(req.body, req.user._id, req.file);

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: course,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/v1/course/all
 */
export const getAllCourses = asyncHandler(async (req, res, next) => {
  try {
    const courses = await getAllCoursesService();

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/v1/course/published
 */
export const getPublishedCourses = asyncHandler(async (req, res, next) => {
  try {
    const courses = await getPublishedCoursesService();

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/v1/course/:slug
 */
export const getCourseBySlug = asyncHandler(async (req, res, next) => {
  try {
    const course = await getCourseBySlugService(req.params.slug);

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/v1/course/id/:id
 */
export const getCourseById = asyncHandler(async (req, res, next) => {
  try {
    const course = await getCourseByIdService(req.params.id);

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/v1/course/instructor/my-courses
 */
export const getInstructorCourses = asyncHandler(async (req, res, next) => {
  try {
    const courses = await getInstructorCoursesService(req.user._id);

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/v1/course/:id
 */
export const updateCourse = asyncHandler(async (req, res, next) => {
  try {
    const course = await updateCourseService(req.params.id, req.body, req.user);

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: course,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * PATCH /api/v1/course/:id/publish
 */
export const publishCourse = asyncHandler(async (req, res, next) => {
  try {
    const course = await publishCourseService(req.params.id, req.user);

    res.status(200).json({
      success: true,
      message: "Course published successfully",
      data: course,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * PATCH /api/v1/course/:id/unpublish
 */
export const unpublishCourse = asyncHandler(async (req, res, next) => {
  try {
    const course = await unpublishCourseService(req.params.id, req.user);

    res.status(200).json({
      success: true,
      message: "Course unpublished successfully",
      data: course,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/v1/course/:id
 */
export const deleteCourse = asyncHandler(async (req, res, next) => {
  try {
    await deleteCourseService(req.params.id, req.user);

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});
