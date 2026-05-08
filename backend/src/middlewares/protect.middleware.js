// src/middlewares/protect.middleware.js

import { findUserByIdRepo } from "../repositories/auth.repository.js";
import ErrorHandler from "../utils/errorHandler.util.js";
import { verifyAccessToken, verifyRefreshToken } from "../utils/jwt.util.js";
import asyncHandler from "./asyncHandler.middleware.js";

/**
 * Protect Middleware
 * Private Routes Only
 */
const protect = asyncHandler(async (req, res, next) => {
  let token = null;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
console.log('access token from protect middleware:', token);
  if (!token) {
    return next(new ErrorHandler("Access denied. No token provided", 401));
  }

  let decoded;

  try {
    decoded = verifyAccessToken(token);
    console.log('access verify token from protect middleware:', decoded);

  } catch (err) {
    return next(new ErrorHandler("Invalid or expired access token", 401));
  }

  const user = await findUserByIdRepo(decoded.id);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  req.user = user;

  next();
});

export default protect;
