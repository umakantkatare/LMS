// routes/section.routes.js

import express from "express";

import {
  getSectionById,
  getSectionsByCourse,
  updateSection,
  deleteSection,
  reorderSections,
} from "../controllers/section.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";

import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

/**
 * Public Routes
 */
router.get("/:id", getSectionById);

router.get("/course/:courseId", getSectionsByCourse);

/**
 * Protected Routes
 */
router.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("instructor", "admin"),
  updateSection,
);

router.delete(
  "/:id",
  isAuthenticated,
  authorizeRoles("instructor", "admin"),
  deleteSection,
);

router.patch(
  "/reorder",
  isAuthenticated,
  authorizeRoles("instructor", "admin"),
  reorderSections,
);

export default router;
