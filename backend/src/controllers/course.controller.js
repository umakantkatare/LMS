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
    const course = await createCourseService(req.body, req.user._id);

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

// import {
//   addLectureService,
//   addSectionService,
//   createCourseService,
//   deleteCourseService,
//   deleteLectureService,
//   getAllCoursesService,
//   getCourseByIdService,
//   publishCourseService,
//   updateCourseService,
//   updateCourseThumbnailService,
//   updateLectureService,
//   updateLectureVideoService,
//   updateSectionService,
// } from "../services/course.service.js";
// import logger from "../utils/logger.util.js";

// export const createCourse = async (req, res, next) => {
//   try {
//     const data = await createCourseService(req.body, req.file);
//     res.status(201).json({
//       success: true,
//       message: "Course created successfully",
//       data,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateCourseThumbnail = async (req, res, next) => {
//   try {
//     const data = await updateCourseThumbnailService(req.params.courseId, req.file);
//     res.status(200).json({
//       success: true,
//       message: "Course thumbnail updated successfully",
//       data,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getAllCourses = async (req, res, next) => {
//   try {
//     const data = await getAllCoursesService(req.query);
//     res.status(200).json({
//       success: true,
//       data,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getCourseById = async (req, res, next) => {
//   try {
//     const data = await getCourseByIdService(req.params.courseId);
//     res.status(200).json({
//       success: true,
//       data,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateCourse = async (req, res, next) => {
//   try {
//     const data = await updateCourseService(req.params.courseId, req.body);
//     res.status(200).json({
//       success: true,
//       message: "Course updated successfully",
//       data,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteCourse = async (req, res, next) => {
//   try {
//     const { courseId } = req.params;

//     logger.info("Delete course controller called", {
//       courseId,
//       userId: req.user?._id,
//     });

//     const data = await deleteCourseService(courseId);

//     logger.info("Delete course controller success", {
//       courseId,
//       deletedId: data._id,
//     });

//     res.status(200).json({
//       success: true,
//       message: "Course deleted successfully",
//     });
//   } catch (error) {
//     logger.error("Delete course controller failed", {
//       courseId: req.params.courseId,
//       error: error.message,
//       stack: error.stack,
//     });

//     next(error);
//   }
// };

// // export const deleteCourse = async (req, res, next) => {
// //   try {
// //     const data = await deleteCourseService(req.params.courseId);
// //     res.status(200).json({
// //       success: true,
// //       message: "Course deleted successfully",
// //     });
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// export const publishCourse = async (req, res, next) => {
//   try {
//     const data = await publishCourseService(req.params.courseId);
//     res.status(200).json({
//       success: true,
//       message: "Course published successfully",
//       data,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const addSection = async (req, res, next) => {
//   try {
//     const data = await addSectionService(req.params.courseId, req.body.title);
//     res.status(201).json({
//       success: true,
//       message: "Section added successfully",
//       data,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateSection = async (req, res, next) => {
//   try {
//     const data = await updateSectionService(
//       req.params.courseId,
//       req.params.sectionId,
//       req.body,
//     );
//     res.status(200).json({
//       success: true,
//       message: "Section updated successfully",
//       data,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteSection = async (req, res, next) => {
//   try {
//     const data = await deleteCourseService(
//       req.params.courseId,
//       req.params.sectionId,
//     );
//     res.status(200).json({
//       success: true,
//       message: "Section deleted successfully",
//       data,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // lecture

// export const addLecture = async (req, res, next) => {
//   try {
//     const data = await addLectureService(
//       req.params.courseId,
//       req.params.sectionId,
//       req.body,
//       req.file,
//     );
//     res.status(201).json({
//       success: true,
//       message: "Lecture added successfully",
//       data,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateLectureVideo = async (req, res, next) => {
//   try {
//     const data = await updateLectureVideoService(
//       req.params.courseId,
//       req.params.sectionId,
//       req.lectureId,
//       req.file,
//     );
//     res.status(200).json({
//       success: true,
//       message: "Lecture video updated successfully",
//       data,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateLecture = async (req, res, next) => {
//   try {
//     const data = await updateLectureService(
//       req.params.courseId,
//       req.params.sectionId,
//       req.params.lectureId,
//       req.body,
//     );
//     res.status(200).json({
//       success: true,
//       message: "Lecture updated successfully",
//       data,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteLecture = async (req, res, next) => {
//   try {
//     const data = await deleteLectureService(
//       req.params.courseId,
//       req.params.sectionId,
//       req.params.lectureId,
//     );
//     res.status(200).json({
//       success: true,
//       message: "Lecture deleted successfully",
//       data,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
