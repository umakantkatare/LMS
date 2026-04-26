// models/order.model.js

import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    currency: {
      type: String,
      default: "INR",
    },

    provider: {
      type: String,
      default: "razorpay",
    },

    razorpayOrderId: {
      type: String,
      unique: true,
      sparse: true,
    },

    razorpayPaymentId: {
      type: String,
      unique: true,
      sparse: true,
    },

    razorpaySignature: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "created",
        "pending",
        "paid",
        "failed",
        "cancelled",
        "reversed",
        "refunded",
        "duplicate_refunded",
      ],
      default: "created",
      index: true,
    },

    failureReason: {
      type: String,
      default: "",
    },

    paidAt: Date,
    refundedAt: Date,

    meta: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  },
);

// Fast queries
paymentSchema.index({ user: 1, createdAt: -1 });
paymentSchema.index({ user: 1, course: 1 });

const paymentModel = mongoose.model("Payment", paymentSchema);

export default paymentModel;
// import { Schema, model } from "mongoose";

// const paymentSchema = new Schema(
//   {
//     user: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     orderId: {
//       type: String,
//       required: true,
//     },
//     paymentId: {
//       type: String,
//     },
//     signature: {
//       type: String,
//     },
//     amount: {
//       type: Number,
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ["created", "success", "failed"],
//       default: "created",
//     },
//   },
//   { timestamps: true },
// );

// const paymentModel = model("Payment", paymentSchema);

// export default paymentModel;
