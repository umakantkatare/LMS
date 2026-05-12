import express from "express";
const router = express.Router();

import {
  register,
  login,
  logout,
  me,
  changePassword,
  refreshToken,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";

import validate from "../middlewares/validate.middleware.js";
import { loginSchema, registerSchema } from "../validations/auth.validation.js";
import { upload } from "./../middlewares/multer.middleware.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

router.post(
  "/register",
  validate(registerSchema),
  upload.single("avatar"),
  register,
);
router.post("/login", validate(loginSchema), login);
router.post("/logout", isAuthenticated, logout);
router.get("/me", isAuthenticated, me);
router.patch("/change-password",isAuthenticated, changePassword);
router.post("/refresh-token", refreshToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
