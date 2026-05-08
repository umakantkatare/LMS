// src/routes/user.routes.js

import express from "express";

import protect from "../middlewares/protect.middleware.js";

import {
  getProfile,
  updateProfile,
  updateAvatar,
  deleteAccount,
  getDashboard,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

/**
 * User Routes
 */
router.get("/profile", protect, getProfile);

router.patch("/profile", protect, updateProfile);

router.patch("/avatar", protect, upload.single("avatar"), updateAvatar);

router.delete("/account", protect, deleteAccount);

router.get("/dashboard", protect, getDashboard);

export default router;
