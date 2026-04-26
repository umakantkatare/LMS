// src/models/user.model.js

import mongoose from "mongoose";

const avatarSchema = new mongoose.Schema(
  {
    public_id: {
      type: String,
      default: "",
    },
    secure_url: {
      type: String,
      default: "",
    },
  },
  { _id: false },
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, "email is required"],
      lowercase: true,
      unique: true,
      index: true,
      trim: true,
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "Please fill a valid email address",
      ],
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    role: {
      type: String,
      enum: ["student", "instructor", "admin"],
      default: "student",
    },

    avatar: avatarSchema,

    refreshToken: {
      type: String,
      default: null,
      select: false,
    },

    resetPasswordToken: {
      type: String,
      default: null,
      select: false,
    },

    resetPasswordExpire: {
      type: Date,
      default: null,
      select: false,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["active", "blocked", "deleted"],
      default: "active",
    },

    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);


/**
 * Hide sensitive fields
 */
userSchema.methods.toJSON = function () {
  const obj = this.toObject();

  delete obj.password;
  delete obj.refreshToken;
  delete obj.resetPasswordToken;
  delete obj.resetPasswordExpire;

  return obj;
};

const userModel = mongoose.model("User", userSchema);

export default userModel;

// import { model, Schema } from "mongoose";

// const userSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "name is required"],
//       minLength: [5, "name must be at least 5 char"],
//       maxLength: [50, "name should be less than 50 char"],
//       lowercase: true,
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: [true, "email is required"],
//       lowercase: true,
//       unique: true,
//       index: true,
//       trim: true,
//       match: [
//         /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
//         "Please fill a valid email address",
//       ],
//     },
//     password: {
//       type: String,
//       required: [true, "password is required"],
//       select: false,
//       trim: true,
//       minLength: [8, "password must be atleast 8 characters"],
//     },
//     avatar: {
//       public_id: {
//         type: String,
//       },
//       secure_url: {
//         type: String,
//       },
//     },
//     role: {
//       type: String,
//       enum: ["USER", "ADMIN"],
//       default: "USER",
//     },
//     forgotPasswordToken: {
//       type: String,
//     },
//     forgotPasswordExpiry: {
//       type: Date,
//     },
//     subscription: {
//       id: String,
//       status: String,
//     },
//     refreshToken: String,
//     resetPasswordToken: String,
//     resetPasswordExpire: Date,
//   },
//   {
//     timestamps: true,
//   },
// );

// const userModel = model("User", userSchema);

// export default userModel;
