// src/services/auth.service.js

import bcrypt from "bcryptjs";
import crypto from "crypto";

import ErrorHandler from "../utils/errorHandler.util.js";
import sendEmail from "../utils/sendEmail.util.js";
import sendToken from "../utils/sendToken.util.js";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.util.js";

import {
  createUserRepo,
  findUserByEmailRepo,
  findUserByIdRepo,
  updateUserByIdRepo,
  saveRefreshTokenRepo,
  removeRefreshTokenRepo,
  findUserByResetTokenRepo,
  saveResetTokenRepo,
  clearResetTokenRepo,
} from "../repositories/auth.repository.js";
import logger from "../utils/logger.util.js";
import { deleteFromImageKit, uploadToImageKit } from "../utils/avatar.util.js";

/**
 * Register Service
 */

export const registerService = async (body, file) => {
  console.warn("body", body);
  const { name, email, password } = body;

  const existingUser = await findUserByEmailRepo(email);

  if (existingUser) {
    throw new ErrorHandler("User already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  let uploadedFile = null;

  try {
    let avatar = {
      public_id: "",
      secure_url: "",
    };

    // Upload only after validations passed
    if (file) {
      uploadedFile = await uploadToImageKit(file, "/lms/users/avatar");

      avatar = {
        public_id: uploadedFile.public_id,
        secure_url: uploadedFile.secure_url,
      };
    }

    const user = await createUserRepo({
      name,
      email,
      password: hashedPassword,
      avatar,
    });

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    };
  } catch (error) {
    logger.error("Register Service Error", {
      message: error.message,
      name,
      email,
      hasFile: !!file,
    });
    // rollback cloud file
    if (uploadedFile?.fileId) {
      await deleteFromImageKit(uploadedFile.fileId);
    }

    throw error;
  }
};

/**
 * Login Service
 */
export const loginService = async (body, res) => {
  const { email, password } = body;

  const user = await findUserByEmailRepo(email, true);

  if (!user) {
    throw new ErrorHandler("Invalid credentials", 401);
  }

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    throw new ErrorHandler("Invalid credentials", 401);
  }

  const accessToken = generateAccessToken(user._id);

  const refreshToken = generateRefreshToken(user._id);

  await saveRefreshTokenRepo(user._id, refreshToken);

  sendToken(res, accessToken, refreshToken);

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

/**
 * Logout Service
 */
export const logoutService = async (user, res) => {
  await removeRefreshTokenRepo(user._id);

  res.cookie("accessToken", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.cookie("refreshToken", "", {
    httpOnly: true,
    expires: new Date(0),
  });
};

/**
 * Get Current User
 */
export const getMeService = async (userId) => {
  const user = await findUserByIdRepo(userId);

  if (!user) {
    throw new ErrorHandler("User not found", 404);
  }

  return user;
};

/**
 * Change Password
 */
export const changePasswordService = async (userId, body) => {
  const { oldPassword, newPassword } = body;

  const user = await findUserByIdRepo(userId, true);

  if (!user) {
    throw new ErrorHandler("User not found", 404);
  }

  const isMatched = await bcrypt.compare(oldPassword, user.password);

  if (!isMatched) {
    throw new ErrorHandler("Old password incorrect", 400);
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  await updateUserByIdRepo(userId, {
    password: hashedPassword,
  });
};

/**
 * Refresh Token
 */
export const refreshTokenService = async (req, res) => {
  const token = req.cookies?.refreshToken || req.body?.refreshToken;

  if (!token) {
    throw new ErrorHandler("Refresh token missing", 401);
  }

  const decoded = verifyRefreshToken(token);

  const user = await findUserByIdRepo(decoded.id);

  if (!user || user.refreshToken !== token) {
    throw new ErrorHandler("Invalid refresh token", 401);
  }

  const accessToken = generateAccessToken(user._id);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });

  return {
    accessToken,
  };
};

/**
 * Forgot Password
 */
export const forgotPasswordService = async (email) => {
  const user = await findUserByEmailRepo(email);

  if (!user) {
    throw new ErrorHandler("User not found", 404);
  }

  const resetToken = crypto.randomBytes(32).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const expireTime = Date.now() + 15 * 60 * 1000;

  await saveResetTokenRepo(user._id, hashedToken, expireTime);

  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  await sendEmail({
    to: user.email,
    subject: "Reset Password",
    text: `Reset your password here: ${resetUrl}`,
  });
};

/**
 * Reset Password
 */
export const resetPasswordService = async (token, password) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await findUserByResetTokenRepo(hashedToken);

  if (!user) {
    throw new ErrorHandler("Token expired or invalid", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await updateUserByIdRepo(user._id, {
    password: hashedPassword,
  });

  await clearResetTokenRepo(user._id);
};
