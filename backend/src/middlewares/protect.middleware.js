// src/middlewares/protect.middleware.js

import { findUserByIdRepo } from "../repositories/auth.repository.js";
import ErrorHandler from "../utils/errorHandler.util.js";
import { verifyAccessToken } from "../utils/jwt.util.js";
import asyncHandler from "./asyncHandler.middleware.js";


/**
 * Protect Middleware
 * Private Routes Only
 */
const protect = asyncHandler(async (req, res, next) => {
  let token = null;

  /**
   * Priority:
   * 1. Authorization Header
   * 2. Cookie
   */

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    throw new ErrorHandler("Access denied. No token provided", 401);
  }

  const decoded = verifyAccessToken(token);

  const user = await findUserByIdRepo(decoded.id);

  if (!user) {
    throw new ErrorHandler("User not found", 404);
  }

  req.user = user;

  next();
});

export default protect;
