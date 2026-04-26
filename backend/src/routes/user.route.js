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

// import { Router } from "express";
// import {
//   forgotPassword,
//   getProfile,
//   login,
//   logout,
//   register,
//   editProfile,
// } from "../controllers/user.controller.js";
// import { isLoggedIn } from "../middlewares/auth.middleware.js";
// import {upload} from "../middlewares/multer.middleware.js";

// const router = Router();

// router.post("/register", upload.single("avatar"), register);
// router.post("/login", login);
// router.get("/logout", logout);
// router.get("/me", isLoggedIn, getProfile);
// router.patch(
//   "/edit-profile/:id",
//   isLoggedIn,
//   upload.single("avatar"),
//   editProfile,
// );
// router.post("/forgot-password", forgotPassword);
// // router.post("/reset-password", resetPassword);
// export default router;
