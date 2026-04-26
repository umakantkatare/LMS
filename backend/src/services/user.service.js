// src/services/user.service.js

import {
  findUserByIdRepo,
  updateUserByIdRepo,
  removeRefreshTokenRepo,
  deleteUserByIdRepo,
} from "../repositories/user.repository.js";
import { deleteFromImageKit, uploadToImageKit } from "../utils/avatar.util.js";
import ErrorHandler from "../utils/errorHandler.util.js";
import logger from "../utils/logger.util.js";

/**
 * Get Profile
 */
export const getProfileService = async (userId) => {
  const user = await findUserByIdRepo(userId);

  if (!user) {
    throw new ErrorHandler("User not found", 404);
  }

  return user;
};

/**
 * Update Profile
 */
export const updateProfileService = async (userId, body) => {
  const payload = {
    name: body.name,
  };

  const user = await updateUserByIdRepo(userId, payload);

  return user;
};

/**
 * Update Avatar
 */
export const updateAvatarService = async (userId, file) => {
  try {
    logger.info("updateAvatarService started", { userId });

    if (!file) {
      logger.warn("Avatar file missing", { userId });
      throw new ErrorHandler("Avatar file required", 400);
    }

    const user = await findUserByIdRepo(userId);

    if (!user) {
      logger.warn("User not found", { userId });
      throw new ErrorHandler("User not found", 404);
    }

    logger.info("User fetched successfully", {
      userId,
      oldAvatar: user.avatar?.secure_url || null,
    });

    const uploaded = await uploadToImageKit(file, "/lms/users/avatar");

    logger.info("Avatar uploaded successfully", {
      userId,
      public_id: uploaded.public_id,
      secure_url: uploaded.secure_url,
    });

    if (user.avatar?.secure_url) {
      logger.info("Deleting old avatar", {
        userId,
        oldAvatar: user.avatar.secure_url,
      });
      try {
        
        await deleteFromImageKit(user.avatar.secure_url);
        logger.info("Old avatar deleted successfully", { userId });
      } catch (error) {
         logger.error("Old avatar delete failed", error);
      }

    }

    const updated = await updateUserByIdRepo(userId, {
      avatar: {
        public_id: uploaded.public_id,
        secure_url: uploaded.secure_url,
      },
    });

    logger.info("User avatar updated successfully", { userId });

    return updated;
  } catch (error) {
    logger.error("updateAvatarService failed", {
      userId,
      message: error.message,
      stack: error.stack,
    });

    throw error;
  }
};
// export const updateAvatarService = async (userId, file) => {
//   if (!file) {
//     throw new ErrorHandler("Avatar file required", 400);
//   }

//   const user = await findUserByIdRepo(userId);

//   if (!user) {
//     throw new ErrorHandler("User not found", 404);
//   }

//   const uploaded = await uploadToImageKit(file, "/lms/users/avatar");

//   if (user.avatar?.secure_url) {
//     await deleteFromImageKit(user.avatar?.secure_url);
//   }

//   const updated = await updateUserByIdRepo(userId, {
//     avatar: {
//       public_id: uploaded.public_id,
//       secure_url: uploaded.secure_url,
//     },
//   });

//   return updated;
// };

/**
 * Delete Account
 */
export const deleteAccountService = async (userId) => {
  const user = await findUserByIdRepo(userId);

  if (!user) {
    throw new ErrorHandler("User not found", 404);
  }

  if (user.avatar?.fileId) {
    await deleteFromImageKit(user.avatar.fileId);
  }

  await deleteUserByIdRepo(userId);
};

/**
 * Dashboard
 */
export const getDashboardService = async (user) => {
  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    stats: {
      enrolledCourses: 0,
      completedCourses: 0,
      certificates: 0,
    },
  };
};

// import userModel from "../models/nosql/user.model.js";
// import {
//   createUser,
//   findByEmail,
//   findByEmailWithPassword,
//   findById,
//   saveUser,
//   updateUserById,
// } from "../repositories/user.repository.js";
// import { deleteFromImageKit, uploadToImageKit } from "../utils/avatar.util.js";
// import sendEmail from "../utils/sendEmail.util.js";
// import ApiError from "../utils/error.util.js";
// import {
//   generateToken,
//   generatePasswordResetToken,
// } from "../utils/jwt.util.js";
// import logger from "../utils/logger.util.js";
// import { comparePassword, hashPassword } from "../utils/password.util.js";

// const registerService = async ({ fullName, email, password, file }) => {
//   let uploaded = null;

//   try {
//     if (!fullName || !email || !password) {
//       throw new ApiError("All fields are required", 400);
//     }

//     const existUser = await findByEmail(email);
//     if (existUser) {
//       throw new ApiError("Email already exists", 400);
//     }

//     const hashedPassword = await hashPassword(password);

//     const avatar = {
//       public_id: email,
//       secure_url: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
//     };

//     const user = await createUser({
//       fullName,
//       email,
//       password: hashedPassword,
//       avatar,
//     });

//     if (file) {
//       uploaded = await uploadToImageKit(file, "/lms/accounts");

//       if (uploaded) {
//         user.avatar = {
//           public_id: uploaded.public_id,
//           secure_url: uploaded.secure_url,
//         };
//       }
//     }

//     await saveUser(user);

//     user.password = undefined;

//     const token = generateToken({
//       id: user._id,
//       email: user.email,
//       subscription: user.subscription,
//       role: user.role,
//     });

//     return { user, token };
//   } catch (error) {
//     logger.error("Register Service Error", {
//       message: error.message,
//       email,
//       hasFile: !!file,
//     });

//     if (uploaded?.fileId) {
//       try {
//         await deleteFromImageKit(uploaded.fileId);
//       } catch (deleteError) {
//         logger.error("Image rollback failed", {
//           fileId: uploaded.fileId,
//         });
//       }
//     }

//     throw error;
//   }
// };

// const loginService = async ({ email, password }) => {
//   if (!email || !password) {
//     throw new ApiError("All fields are required", 400);
//   }

//   const user = await findByEmailWithPassword(email);

//   if (!user) {
//     throw new ApiError("Invalid credentials email", 400);
//   }

//   const isMatchPassword = await comparePassword(password, user.password);

//   if (!isMatchPassword) {
//     throw new ApiError("Invalid credentials password", 400);
//   }

//   const token = generateToken({
//     id: user._id,
//     role: user.role,
//   });

//   user.password = undefined;

//   return {
//     user,
//     token,
//   };
// };

// const getProfileService = async (userId) => {
//   const user = await findById(userId);

//   if (!user) {
//     throw new ApiError("User not found", 404);
//   }
//   user.password = undefined;

//   return user;
// };

// const forgotPasswordService = async ({ email }) => {
//   try {
//     if (!email) {
//       throw new ApiError("Email is required", 400);
//     }
//     const user = await findByEmail(email);
//     if (!user) {
//       throw new ApiError("Email does not exists", 404);
//     }
//     const { resetToken, hashedToken, expireTime } =
//       await generatePasswordResetToken();
//     userModel.forgotPasswordToken = hashedToken;
//     userModel.forgotPasswordExpiry = expireTime;

//     await saveUser(user);

//     const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

//     await sendEmail({
//       email: user.email,
//       subject: "Password Reset",
//       message: `Reset your password: ${resetUrl}`,
//     });
//     return true;
//   } catch (error) {
//     throw new ApiError(`something went wrong ${error.message}`, 500);
//   }
// };

// const editProfileService = async ({ userId, body, file }) => {
//   const user = await findById(userId);
//   console.log("user in service", user);
//   if (!user) throw new ApiError("User not found", 404);

//   let avatarData = user.avatar;

//   // If new image uploaded
//   if (file) {
//     if (user.avatar?.fileId) {
//       await deleteFromImageKit(user.avatar.fileId);
//     }

//     avatarData = await uploadToImageKit(file, "/lms/accounts");
//   }

//   // Email duplicate check
//   if (body.email && body.email !== user.email) {
//     const exists = await findByEmail(body.email);
//     if (exists) throw new ApiError("Email already exists", 400);
//   }

//   const updatedUser = await updateUserById(userId, {
//     fullName: body.fullName || user.fullName,
//     email: body.email || user.email,
//     avatar: avatarData,
//   });

//   return updatedUser;
// };

// export {
//   registerService,
//   loginService,
//   getProfileService,
//   forgotPasswordService,
//   editProfileService,
// };
