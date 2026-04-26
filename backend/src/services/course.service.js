import {
  createCourseRepo,
  getAllCoursesRepo,
  getPublishedCoursesRepo,
  getCourseByIdRepo,
  getCourseBySlugRepo,
  getInstructorCoursesRepo,
  updateCourseRepo,
  publishCourseRepo,
  unpublishCourseRepo,
  deleteCourseRepo,
} from "../repositories/course.repository.js";
import  ApiError  from "../utils/error.util.js";

/**
 * Create Course
 */
export const createCourseService = async (payload, userId) => {
  if (!payload.title || !payload.description || !payload.category) {
    throw new ApiError("Title, description and category are required", 400);
  }

  payload.instructor = userId;

  if (payload.price === 0) {
    payload.isFree = true;
  }

  const course = await createCourseRepo(payload);

  return course;
};

/**
 * Get All Courses
 */
export const getAllCoursesService = async () => {
  return await getAllCoursesRepo({ isDeleted: false });
};

/**
 * Get Published Courses
 */
export const getPublishedCoursesService = async () => {
  return await getPublishedCoursesRepo();
};

/**
 * Get Single Course By ID
 */
export const getCourseByIdService = async (courseId) => {
  const course = await getCourseByIdRepo(courseId);

  if (!course) {
    throw new ApiError("Course not found", 404);
  }

  return course;
};

/**
 * Get Single Course By Slug
 */
export const getCourseBySlugService = async (slug) => {
  const course = await getCourseBySlugRepo(slug);

  if (!course) {
    throw new ApiError("Course not found", 404);
  }

  return course;
};

/**
 * Get Instructor Courses
 */
export const getInstructorCoursesService = async (userId) => {
  return await getInstructorCoursesRepo(userId);
};

/**
 * Update Course
 */
export const updateCourseService = async (courseId, payload, user) => {
  const course = await getCourseByIdRepo(courseId);

  if (!course) {
    throw new ApiError("Course not found", 404);
  }

  if (
    course.instructor._id.toString() !== user._id.toString() &&
    user.role !== "admin"
  ) {
    throw new ApiError("Unauthorized access", 403);
  }

  if (payload.price === 0) {
    payload.isFree = true;
  }

  const updatedCourse = await updateCourseRepo(courseId, payload);

  return updatedCourse;
};

/**
 * Publish Course
 */
export const publishCourseService = async (courseId, user) => {
  const course = await getCourseByIdRepo(courseId);

  if (!course) {
    throw new ApiError("Course not found", 404);
  }

  if (
    course.instructor._id.toString() !== user._id.toString() &&
    user.role !== "admin"
  ) {
    throw new ApiError("Unauthorized access", 403);
  }

  return await publishCourseRepo(courseId);
};

/**
 * Unpublish Course
 */
export const unpublishCourseService = async (courseId, user) => {
  const course = await getCourseByIdRepo(courseId);

  if (!course) {
    throw new ApiError("Course not found", 404);
  }

  if (
    course.instructor._id.toString() !== user._id.toString() &&
    user.role !== "admin"
  ) {
    throw new ApiError("Unauthorized access", 403);
  }

  return await unpublishCourseRepo(courseId);
};

/**
 * Delete Course
 */
export const deleteCourseService = async (courseId, user) => {
  const course = await getCourseByIdRepo(courseId);

  if (!course) {
    throw new ApiError("Course not found", 404);
  }

  if (
    course.instructor._id.toString() !== user._id.toString() &&
    user.role !== "admin"
  ) {
    throw new ApiError("Unauthorized access", 403);
  }

  return await deleteCourseRepo(courseId);
};
// import {
//   addLecture,
//   addSection,
//   createCourse,
//   deleteLecture,
//   deleteSection,
//   findCourseById,
//   getAllCourses,
//   getCourseByInstructure,
//   PubliceCourse,
//   softDeleteCourse,
//   updateCourseById,
//   updateCourseThumbnail,
//   updateLecture,
//   updateLectureVideo,
//   updateSection,
// } from "../repositories/course.repository.js";
// import { uploadToImageKit, deleteFromImageKit } from "../utils/avatar.util.js";
// import ApiError from "../utils/error.util.js";
// import logger from "../utils/logger.util.js";

// export const createCourseService = async (body, file) => {
//   logger.info("Create course service started");

//   if (!file) {
//     logger.warn("Thumbnail file missing while creating course");
//     throw new ApiError("Thumbnail is required");
//   }

//   logger.info("Uploading thumbnail to ImageKit");

//   const uploaded = await uploadToImageKit(file, "/lms/course");

//   logger.info("Thumbnail uploaded successfully", {
//     fileId: uploaded.public_id,
//     url: uploaded.secure_url,
//   });

//   const payload = {
//     ...body,
//     thumbnail: {
//       public_id: uploaded.public_id,
//       secure_url: uploaded.secure_url,
//     },
//   };

//   logger.info("Creating course in database", {
//     title: payload.title,
//     category: payload.category,
//   });

//   const course = await createCourse(payload);

//   logger.info("Course created successfully", {
//     courseId: course._id,
//   });

//   return course;
// };
// export const updateCourseThumbnailService = async (courseId, file) => {
//   if (!file) {
//     throw new ApiError("Thumbnail file is required");
//   }
//   const course = await findCourseById(courseId);
//   if (!course) {
//     throw new ApiError("course not found");
//   }
//   if (course.thumbnail?.public_id) {
//     await deleteFromImageKit(course.thumbnail.public_id);
//   }
//   const uploaded = await uploadToImageKit(file, "/lms/course");
//   return await updateCourseThumbnail(courseId, {
//     public_id: uploaded.public_id,
//     secure_url: uploaded.secure_url,
//   });
// };
// export const getAllCoursesService = async (query) => {
//   return await getAllCourses(query);
// };

// export const getCourseByIdService = async (courseId) => {
//   const course = await findCourseById(courseId);
//   if (!course) {
//     throw new ApiError("course not found");
//   }
//   return course;
// };

// export const updateCourseService = async (courseId, payload) => {
//   const updated = await updateCourseById(courseId, payload);
//   if (!updated) {
//     throw new ApiError("course not found");
//   }
//   return updated;
// };

// export const deleteCourseService = async (courseId) => {
//   logger.info("Delete course service started", { courseId });

//   const deleted = await softDeleteCourse(courseId);

//   if (!deleted) {
//     logger.warn("Course not found for delete", { courseId });
//     throw new ApiError("course not found");
//   }

//   logger.info("Course deleted successfully", {
//     courseId,
//     title: deleted.title,
//     deletedAt: deleted.deletedAt,
//   });

//   return deleted;
// };
// // export const deleteCourseService = async (courseId) => {
// //   const deleted = await softDeleteCourse(courseId);
// //   if (!deleted) {
// //     throw new ApiError("course not found");
// //   }
// //   return deleted;
// // };

// export const publishCourseService = async (courseId) => {
//   const course = await PubliceCourse(courseId);
//   if (!course) {
//     throw new ApiError("course not found");
//   }
//   return course;
// };

// export const getInstructorCoursesService = async (userId) => {
//   return await getCourseByInstructure(userId);
// };

// // section
// export const addSectionService = async (courseId, title) => {
//   const course = await addSection(courseId, title);
//   if (!course) {
//     throw new ApiError("course not found");
//   }
//   return course;
// };

// export const updateSectionService = async (courseId, sectionId, payload) => {
//   const course = await updateSection(courseId, sectionId, payload);
//   if (!course) {
//     throw new ApiError("Course / Section not found");
//   }
//   return course;
// };

// export const deleteSectionService = async (courseId, sectionId) => {
//   const course = await deleteSection(courseId, sectionId);
//   if (!course) {
//     throw new ApiError("Course / Section not found");
//   }
//   return course;
// };

// // lecture
// export const addLectureService = async (courseId, sectionId, body, file) => {
//   if (!file) {
//     throw new ApiError("video file not found");
//   }
//   const uploaded = await uploadToImageKit(file, "/lms/course/lecture");
//   const lectureData = {
//     ...body,
//     duration: Number(uploaded.duration),
//     video: {
//       public_id: uploaded.public_id,
//       secure_url: uploaded.secure_url,
//     },
//   };
//   const course = await addLecture(courseId, sectionId, lectureData);
//   if (!course) {
//     throw new ApiError("Course / Section not found");
//   }
//   return course;
// };

// export const updateLectureVideoService = async (
//   courseId,
//   sectionId,
//   lectureId,
//   file,
// ) => {
//   if (!file) {
//     throw new ApiError("video file is required");
//   }
//   const course = await findCourseById(courseId);
//   if (!course) {
//     throw new ApiError("course not found");
//   }
//   const section = course.sections.id(sectionId);
//   if (!section) {
//     throw new ApiError("section not found");
//   }
//   const lecture = section.lectures.id(lectureId);
//   if (!lecture) {
//     throw new ApiError("lecture not found");
//   }
//   if (lecture.video?.public_id) {
//     await deleteFromImageKit(lecture.video.public_id);
//   }
//   const uploaded = uploadToImageKit(file, "/lms/course/lecture");
//   return await updateLectureVideo(courseId, sectionId, lectureId, {
//     public_id: uploaded.fileId,
//     secure_url: uploaded.url,
//   });
// };

// export const updateLectureService = async (
//   courseId,
//   sectionId,
//   lectureId,
//   payload,
// ) => {
//   const course = await updateLecture(courseId, sectionId, lectureId, payload);
//   if (!course) {
//     throw new ApiError("Course / Section / Lecture not found");
//   }
//   return course;
// };

// export const deleteLectureService = async (courseId, sectionId, lectureId) => {
//   const course = await deleteLecture(courseId, sectionId, lectureId);
//   if (!course) {
//     throw new ApiError("Course / Section / Lecture not found");
//   }
//   return course;
// };
