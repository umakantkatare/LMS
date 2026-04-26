// routes/course.routes.js

import express from "express";

import {
  createCourse,
  getAllCourses,
  getPublishedCourses,
  getCourseBySlug,
  getCourseById,
  getInstructorCourses,
  updateCourse,
  publishCourse,
  unpublishCourse,
  deleteCourse,
} from "../controllers/course.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

/**
 * Public Routes
 */
router.get("/all", getAllCourses);
router.get("/published", getPublishedCourses);
router.get("/id/:id", getCourseById);
router.get("/:slug", getCourseBySlug);

/**
 * Instructor / Admin Routes
 */
router.post(
  "/create",
  isAuthenticated,
  authorizeRoles("instructor", "admin"),
  createCourse,
);

router.get(
  "/instructor/my-courses",
  isAuthenticated,
  authorizeRoles("instructor", "admin"),
  getInstructorCourses,
);

router.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("instructor", "admin"),
  updateCourse,
);

router.patch(
  "/:id/publish",
  isAuthenticated,
  authorizeRoles("instructor", "admin"),
  publishCourse,
);

router.patch(
  "/:id/unpublish",
  isAuthenticated,
  authorizeRoles("instructor", "admin"),
  unpublishCourse,
);

router.delete(
  "/:id",
  isAuthenticated,
  authorizeRoles("instructor", "admin"),
  deleteCourse,
);

export default router;

// import { Router } from "express";
// import {
//   addLecture,
//   addSection,
//   createCourse,
//   deleteCourse,
//   deleteLecture,
//   deleteSection,
//   getAllCourses,
//   getCourseById,
//   publishCourse,
//   updateCourse,
//   updateCourseThumbnail,
//   updateLecture,
//   updateLectureVideo,
//   updateSection,
// } from "../controllers/course.controller.js";
// import { authorizedRoles, isLoggedIn } from "../middlewares/auth.middleware.js";
// import {upload, uploadVideo,} from "./../middlewares/multer.middleware.js";

// const router = Router();

// router.get("/", getAllCourses);
// router.get("/:courseId", getCourseById);

// //  admin
// router.post(
//   "/create",
//   isLoggedIn,
//   authorizedRoles("ADMIN"),
//   upload.single("thumbnail"),
//   createCourse,
// );
// router.patch(
//   "/:courseId/thumbnail",
//   isLoggedIn,
//   authorizedRoles("ADMIN"),
//   upload.single("thumbnail"),
//   updateCourseThumbnail,
// );
// router.patch(
//   "/update/:courseId",
//   isLoggedIn,
//   authorizedRoles("ADMIN"),
//   updateCourse,
// );
// router.delete(
//   "/delete/:courseId",
//   isLoggedIn,
//   authorizedRoles("ADMIN"),
//   deleteCourse,
// );
// router.patch(
//   "/:courseId/publish",
//   isLoggedIn,
//   authorizedRoles("ADMIN"),
//   publishCourse,
// );

// // Add section
// router.post(
//   "/:courseId/sections",
//   isLoggedIn,
//   authorizedRoles("ADMIN"),
//   addSection,
// );

// // Update section
// router.patch(
//   "/:courseId/sections/:sectionId",
//   isLoggedIn,
//   authorizedRoles("ADMIN"),
//   updateSection,
// );

// // Delete section
// router.delete(
//   "/:courseId/sections/:sectionId",
//   isLoggedIn,
//   authorizedRoles("ADMIN"),
//   deleteSection,
// );

// // Add lecture inside section
// router.post(
//   "/:courseId/sections/:sectionId/lectures",
//   isLoggedIn,
//   authorizedRoles("ADMIN"),
//   uploadVideo.single("video"),
//   addLecture,
// );
// router.patch(
//   "/:courseId/sections/:sectionId/lectures/:lectureId/video",
//   isLoggedIn,
//   authorizedRoles("ADMIN"),
//   uploadVideo.single("video"),
//   updateLectureVideo,
// );
// // Update lecture
// router.patch(
//   "/:courseId/sections/:sectionId/lectures/:lectureId",
//   isLoggedIn,
//   authorizedRoles("ADMIN"),
//   updateLecture,
// );

// // Delete lecture
// router.delete(
//   "/:courseId/sections/:sectionId/lectures/:lectureId",
//   isLoggedIn,
//   authorizedRoles("ADMIN"),
//   deleteLecture,
// );

// export default router;
