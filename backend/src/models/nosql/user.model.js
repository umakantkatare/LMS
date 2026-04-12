import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "full name is required"],
      minLength: [5, "name must be at least 5 char"],
      maxLength: [50, "name should be less than 50 char"],
      lowercase: true,
      trim: true,
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
      required: [true, "password is required"],
      select: false,
      trim: true,
      minLength: [8, "password must be atleast 8 characters"],
    },
    avatar: {
      public_id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
    subscription: {
      id: String,
      status: String,
    },
  },
  {
    timestamps: true,
  },
);

const userModel = model("User", userSchema);

export default userModel;
