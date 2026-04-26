// src/controllers/user.controller.js


import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import {
  getProfileService,
  updateProfileService,
  updateAvatarService,
  deleteAccountService,
  getDashboardService,
} from "../services/user.service.js";

export const getProfile = asyncHandler(async (req, res) => {
  const data = await getProfileService(req.user._id);

  res.status(200).json({
    success: true,
    data,
  });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const data = await updateProfileService(req.user._id, req.body);

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data,
  });
});

export const updateAvatar = asyncHandler(async (req, res) => {
  const data = await updateAvatarService(req.user._id, req.file);

  res.status(200).json({
    success: true,
    message: "Avatar updated successfully",
    data,
  });
});

export const deleteAccount = asyncHandler(async (req, res) => {
  await deleteAccountService(req.user._id);

  res.status(200).json({
    success: true,
    message: "Account deleted successfully",
  });
});

export const getDashboard = asyncHandler(async (req, res) => {
  const data = await getDashboardService(req.user);

  res.status(200).json({
    success: true,
    data,
  });
});

// import cookieOptions from "../configs/cookie.config.js";
// import {
//   editProfileService,
//   forgotPasswordService,
//   getProfileService,
//   loginService,
//   registerService,
// } from "../services/user.service.js";

// const register = async (req, res, next) => {
//   try {
//     const { user, token } = await registerService({
//       ...req.body,
//       file: req.file,
//     });
//     console.log("file_controller", req.file);

//     res.cookie("token", token, cookieOptions);
//     console.log("user", user);
//     res.status(201).json({
//       success: true,
//       message: "User registered successfully",
//       user: user,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const login = async (req, res, next) => {
//   try {
//     const { user, token } = await loginService(req.body);

//     res.cookie("token", token, cookieOptions);

//     res.status(200).json({
//       success: true,
//       message: "login successful",
//       data: user,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const logout = async (req, res, next) => {
//   try {
//     res.cookie("token", null, {
//       ...cookieOptions,
//       maxAge: 0,
//     });

//     res.status(200).json({
//       success: true,
//       message: "User logged out successfully",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const getProfile = async (req, res, next) => {
//   try {
//     const user = await getProfileService(req.user.id);

//     res.status(200).json({
//       success: true,
//       message: "User profile fetched successfully",
//       user,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const forgotPassword = async (req, res, next) => {
//   try {
//     const { email } = await forgotPasswordService(req.body);
//     res.status(200).json({
//       success: true,
//       message: "User profile fetched successfully",
//       email,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const editProfile = async (req, res, next) => {
//   try {
//     const userId = req.user.id;
//     // const userId = req.params.id;
//     console.log('userId', userId);

//     const updatedUser = await editProfileService({
//       userId,
//       body: req.body,
//       file: req.file,
//     });
//     console.log('update user', req.body);

//     return res.status(200).json({
//       success: true,
//       message: "Profile updated successfully",
//       data: updatedUser,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
// export { register, login, logout, getProfile, forgotPassword, editProfile };
