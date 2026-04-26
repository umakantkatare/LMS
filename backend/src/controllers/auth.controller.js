// src/controllers/auth.controller.js

// import asyncHandler from "express-async-handler";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import {
  registerService,
  loginService,
  logoutService,
  getMeService,
  changePasswordService,
  refreshTokenService,
  forgotPasswordService,
  resetPasswordService,
} from "../services/auth.service.js";

/**
 * @desc Register User
 * @route POST /api/v1/auth/register
 */
export const register = asyncHandler(async (req, res, next) => {
  try {
    const data = await registerService(req.body, req.file);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @desc Login User
 * @route POST /api/v1/auth/login
 */
export const login = asyncHandler(async (req, res) => {
  const data = await loginService(req.body, res);

  return res.status(200).json({
    success: true,
    message: "Login successful",
    data,
  });
});

/**
 * @desc Logout User
 * @route POST /api/v1/auth/logout
 */
export const logout = asyncHandler(async (req, res) => {
  await logoutService(req.user, res);

  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
});

/**
 * @desc Current User Profile
 * @route GET /api/v1/auth/me
 */
export const me = asyncHandler(async (req, res) => {
  const user = await getMeService(req.user._id);

  return res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * @desc Change Password
 * @route PUT /api/v1/auth/change-password
 */
export const changePassword = asyncHandler(async (req, res, next) => {
  try {
    await changePasswordService(req.user._id, req.body);

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @desc Refresh Access Token
 * @route POST /api/v1/auth/refresh-token
 */
export const refreshToken = asyncHandler(async (req, res) => {
  const data = await refreshTokenService(req, res);

  return res.status(200).json({
    success: true,
    message: "Token refreshed successfully",
    data,
  });
});

/**
 * @desc Forgot Password
 * @route POST /api/v1/auth/forgot-password
 */
export const forgotPassword = asyncHandler(async (req, res) => {
  await forgotPasswordService(req.body.email);

  return res.status(200).json({
    success: true,
    message: "Password reset link sent to email",
  });
});

/**
 * @desc Reset Password
 * @route POST /api/v1/auth/reset-password/:token
 */
export const resetPassword = asyncHandler(async (req, res) => {
  await resetPasswordService(req.params.token, req.body.password);

  return res.status(200).json({
    success: true,
    message: "Password reset successfully",
  });
});
