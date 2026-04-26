// src/utils/jwt.js

import jwt from "jsonwebtoken";
import ErrorHandler from "./errorHandler.util.js";

/**
 * Generate Access Token
 * Short Expiry
 */
export const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "15m",
  });
};

/**
 * Generate Refresh Token
 * Long Expiry
 */
export const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE || "7d",
  });
};

/**
 * Verify Access Token
 */
export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new ErrorHandler("Invalid access token", 401);
  }
};

/**
 * Verify Refresh Token
 */
export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    throw new ErrorHandler("Invalid refresh token", 401);
  }
};

// import JWT from "jsonwebtoken";
// import crypto from "crypto";

// const generateToken = (payload) => {
//   return JWT.sign(payload, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRY,
//   });
// };

// const generatePasswordResetToken = () => {
//   const resetToken = crypto.randomBytes(20).toString("hex");

//   const hashedToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   const expireTime = Date.now() + 10 * 60 * 1000;
//   return {
//     resetToken,
//     hashedToken,
//     expireTime,
//   };
// };
// export { generateToken, generatePasswordResetToken };
