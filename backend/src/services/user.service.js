import userModel from "../models/nosql/user.model.js";
import {
  createUser,
  findByEmail,
  findByEmailWithPassword,
  findById,
  saveUser,
} from "../repositories/user.repository.js";
import { deleteFromImageKit, uploadToImageKit } from "../utils/avatar.util.js";
import sendEmail from "../utils/email.util.js";
import ApiError from "../utils/error.util.js";
import {
  generateToken,
  generatePasswordResetToken,
} from "../utils/jwt.util.js";
import logger from "../utils/logger.util.js";
import { comparePassword, hashPassword } from "../utils/password.util.js";

const registerService = async ({ fullName, email, password, file }) => {
  let uploaded = null;

  try {
    if (!fullName || !email || !password) {
      throw new ApiError("All fields are required", 400);
    }

    const existUser = await findByEmail(email);
    if (existUser) {
      throw new ApiError("Email already exists", 400);
    }

    const hashedPassword = await hashPassword(password);

    const avatar = {
      public_id: email,
      secure_url: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
    };

    const user = await createUser({
      fullName,
      email,
      password: hashedPassword,
      avatar,
    });

    if (file) {
      uploaded = await uploadToImageKit(file, "/lms/accounts");

      if (uploaded) {
        user.avatar = {
          public_id: uploaded.public_id,
          secure_url: uploaded.secure_url,
        };
      }
    }

    await saveUser(user);

    user.password = undefined;

    const token = generateToken({
      id: user._id,
      email: user.email,
      subscription: user.subscription,
      role: user.role,
    });

    return { user, token };
  } catch (error) {
    logger.error("Register Service Error", {
      message: error.message,
      email,
      hasFile: !!file,
    });

    if (uploaded?.fileId) {
      try {
        await deleteFromImageKit(uploaded.fileId);
      } catch (deleteError) {
        logger.error("Image rollback failed", {
          fileId: uploaded.fileId,
        });
      }
    }

    throw error;
  }
};

const loginService = async ({ email, password }) => {
  if (!email || !password) {
    throw new ApiError("All fields are required", 400);
  }

  const user = await findByEmailWithPassword(email);

  if (!user) {
    throw new ApiError("Invalid credentials email", 400);
  }

  const isMatchPassword = await comparePassword(password, user.password);

  if (!isMatchPassword) {
    throw new ApiError("Invalid credentials password", 400);
  }

  const token = generateToken({
    id: user._id,
    role: user.role,
  });

  user.password = undefined;

  return {
    user,
    token,
  };
};

const getProfileService = async (userId) => {
  const user = await findById(userId);

  if (!user) {
    throw new ApiError("User not found", 404);
  }
  user.password = undefined;

  return user;
};

const forgotPasswordService = async ({ email }) => {
  try {
    if (!email) {
      throw new ApiError("Email is required", 400);
    }
    const user = await findByEmail(email);
    if (!user) {
      throw new ApiError("Email does not exists", 404);
    }
    const { resetToken, hashedToken, expireTime } =
      await generatePasswordResetToken();
    userModel.forgotPasswordToken = hashedToken;
    userModel.forgotPasswordExpiry = expireTime;

    await saveUser(user);

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await sendEmail({
      email: user.email,
      subject: "Password Reset",
      message: `Reset your password: ${resetUrl}`,
    });
    return true;
  } catch (error) {
    throw new ApiError(`something went wrong ${error.message}`, 500);
  }
};

const editProfileService = async ({ userId, fullName, email, file }) => {
  let uploaded = null;

  try {
    const user = await findById(userId);

    if (!user) {
      throw new ApiError("Invalid user id or user does not exist", 404);
    }

    // Update basic fields
    if (fullName) {
      user.fullName = fullName;
    }
    // Update email (with validation)
    if (email && email !== user.email) {
      const existingUser = await findByEmail(email);

      if (existingUser) {
        throw new ApiError("Email already in use", 400);
      }

      user.email = email;
    }

    // Handle avatar update
    if (file) {
      // Upload new image first
      uploaded = await uploadToImageKit(file, "/lms/accounts");

      if (uploaded) {
        // Delete old image (only if exists)
        if (user?.avatar?.public_id) {
          try {
            await deleteFromImageKit(user.avatar.public_id);
          } catch (deleteError) {
            logger.error("Old image delete failed", {
              fileId: user.avatar.public_id,
            });
          }
        }

        // Assign new avatar
        user.avatar = {
          public_id: uploaded.fileId, // ImageKit uses fileId
          secure_url: uploaded.url,
        };

        // Remove local file
        // await fs.rm(file.path);
      }
    }

    await saveUser(user);

    return user;
  } catch (error) {
    logger.error("Update User Service Error", {
      message: error.message,
      userId: id,
      hasFile: !!file,
    });

    // Rollback uploaded image if something fails
    if (uploaded?.fileId) {
      try {
        await deleteFromImageKit(uploaded.fileId);
      } catch (deleteError) {
        logger.error("Image rollback failed", {
          fileId: uploaded.fileId,
        });
      }
    }

    throw error;
  }
};

export {
  registerService,
  loginService,
  getProfileService,
  forgotPasswordService,
  editProfileService,
};
