import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  getAllCourse,
  getCourseByCourseId,
  updateCourse,
} from "../controllers/course.controller.js";
import { authorizedRoles, isLoggedIn } from "../middlewares/auth.middleware.js";
import upload from "./../middlewares/multer.middleware.js";

const router = Router();

router.post(
  "/create",
  isLoggedIn,
  authorizedRoles("ADMIN"),
  upload.single("thumbnail"),
  createCourse,
);
router.put(
  "/update/:courseId",
  isLoggedIn,
  authorizedRoles("ADMIN"),
  upload.single("thumbnail"),
  updateCourse,
);
router.delete(
  "/delete/:courseId",
  isLoggedIn,
  authorizedRoles("ADMIN"),
  deleteCourse,
);
router.get("/", isLoggedIn, authorizedRoles("USER", "ADMIN"), getAllCourse);
router.get(
  "/:courseId",
  isLoggedIn,
  authorizedRoles("ADMIN"),
  getCourseByCourseId,
);

export default router;

// router another method
// router.route('/').get(getAllCourse).post(createPost).put(updateCourse)
// router.route('/:id').get(isLoggedIn, getCourseByCourseId).put(updateCourse)
