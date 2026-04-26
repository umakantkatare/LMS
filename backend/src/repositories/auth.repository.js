// src/repositories/auth.repository.js
import userModel from "./../models/nosql/user.model.js";

/**
 * Create New User
 */
export const createUserRepo = async (payload) => {
  return await userModel.create(payload);
};

/**
 * Find user by email
 */
export const findUserByEmailRepo = async (email, withPassword = false) => {
  let query = userModel.findOne({ email });

  if (withPassword) {
    query = query.select("+password");
  }

  return await query;
};

/**
 * Find user by id
 */
export const findUserByIdRepo = async (userId, withPassword = false) => {
  let query = userModel.findById(userId).lean();

  if (withPassword) {
    query = query.select("+password");
  }

  return await query;
};

/**
 * Update user by id
 */
export const updateUserByIdRepo = async (userId, payload) => {
  return await userModel.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });
};

/**
 * Save refresh token
 */
export const saveRefreshTokenRepo = async (userId, refreshToken) => {
  return await userModel.findByIdAndUpdate(
    userId,
    { refreshToken },
    { new: true },
  );
};

/**
 * Remove refresh token
 */
export const removeRefreshTokenRepo = async (userId) => {
  return await userModel.findByIdAndUpdate(
    userId,
    { refreshToken: null },
    { new: true },
  );
};

/**
 * Find user by reset token
 */
export const findUserByResetTokenRepo = async (token) => {
  return await userModel.findOne({
    resetPasswordToken: token,
    resetPasswordExpire: {
      $gt: Date.now(),
    },
  });
};

/**
 * Save reset password token
 */
export const saveResetTokenRepo = async (userId, token, expireTime) => {
  return await userModel.findByIdAndUpdate(
    userId,
    {
      resetPasswordToken: token,
      resetPasswordExpire: expireTime,
    },
    { new: true },
  );
};

/**
 * Clear reset password token
 */
export const clearResetTokenRepo = async (userId) => {
  return await userModel.findByIdAndUpdate(
    userId,
    {
      resetPasswordToken: null,
      resetPasswordExpire: null,
    },
    { new: true },
  );
};
