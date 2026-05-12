import jwt from "jsonwebtoken";
import ApiError from "../utils/error.util.js";
import userModel from "../models/nosql/user.model.js";
import asyncHandler from "./asyncHandler.middleware.js";
import { verifyAccessToken } from "../utils/jwt.util.js";
import { findUserByIdRepo } from "../repositories/user.repository.js";
import ErrorHandler from "../utils/errorHandler.util.js";

// export const isAuthenticated = asyncHandler(async (req, res, next) => {
//   let token = null;

//   // 1. Bearer Token
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer ")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   }

//   // 2. Cookie Token
//   if (!token && req.cookies?.accessToken) {
//     token = req.cookies.accessToken;
//   }

//   if (!token) {
//     console.log('token', token);
//     return next(new ApiError("Please login to access this resource", 401));
//   }

//   // Verify Token
//   const decoded = jwt.verify(token, process.env.JWT_SECRET);

//   const user = await userModel.findById(decoded.id).select("-password");

//   if (!user) {
//     return next(new ApiError("User not found", 404));
//   }

//   if (user.isBlocked) {
//     return next(new ApiError("Your account is blocked", 403));
//   }

//   req.user = user;

//   next();
// });


export const isAuthenticated = asyncHandler(async (req, res, next) => {
  let token = null;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token && req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    return next(new ErrorHandler("Access denied", 401));
  }

  let decoded;

  try {
    decoded = verifyAccessToken(token);
  } catch (err) {
    return next(new ErrorHandler("Invalid or expired token", 401));
  }

  const user = await findUserByIdRepo(decoded.id);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  if (user.isBlocked) {
    return next(new ErrorHandler("Account blocked", 403));
  }

  req.user = user;

  next();
});