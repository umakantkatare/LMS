import crypto from "crypto";
import Razorpay from "razorpay";
import ApiError from './../utils/error.util.js';

import { getCourseByIdRepo } from "../repositories/course.repository.js";
import {
  createOrderRepo,
  getPendingOrderRepo,
  getOrderByRazorpayOrderIdRepo,
  getOrderByPaymentIdRepo,
  updateOrderByRazorpayOrderIdRepo,
} from "../repositories/payment.repository.js";
import {
  getEnrollmentRepo,
  createEnrollmentRepo,
} from "../repositories/enrollment.repository.js";
import { razorpay } from "../configs/payment.config.js";

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

/**
 * Create Razorpay Order
 */
export const createPaymentOrderService = async (userId, courseId) => {
  // already enrolled
  const enrolled = await getEnrollmentRepo(userId, courseId);

  if (enrolled) {
    throw new ApiError("You are already enrolled in this course", 400);
  }

  // course exists
  const course = await getCourseByIdRepo(courseId);

  if (!course) {
    throw new ApiError("Course not found", 404);
  }

  // free course
  if (course.isFree || course.price === 0) {
    throw new ApiError("This is a free course. Payment not required", 400);
  }

  // prevent duplicate active order
  const pendingOrder = await getPendingOrderRepo(userId, courseId);

  if (pendingOrder) {
    return pendingOrder;
  }

  const amount =
    (course.discountPrice && course.discountPrice > 0
      ? course.discountPrice
      : course.price) * 100;

  const razorpayOrder = await razorpay.orders.create({
    amount,
    currency: "INR",
    receipt: `rcpt_${Date.now()}`,
    notes: {
      userId: String(userId),
      courseId: String(courseId),
    },
  });

  const order = await createOrderRepo({
    user: userId,
    course: courseId,
    amount: amount / 100,
    currency: "INR",
    provider: "razorpay",
    razorpayOrderId: razorpayOrder.id,
    status: "created",
    meta: razorpayOrder,
  });

  return order;
};

/**
 * Verify Payment + Enroll
 */
export const verifyPaymentService = async (payload, userId) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    payload;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    throw new ApiError("Payment verification data missing", 400);
  }

  // already processed?
  const paidByPaymentId = await getOrderByPaymentIdRepo(razorpay_payment_id);

  if (paidByPaymentId) {
    return paidByPaymentId;
  }

  const order = await getOrderByRazorpayOrderIdRepo(razorpay_order_id);

  if (!order) {
    throw new ApiError("Order not found", 404);
  }

  if (String(order.user) !== String(userId)) {
    throw new ApiError("Unauthorized payment access", 403);
  }

  if (order.status === "paid") {
    return order;
  }

  // signature verify
  const body = `${razorpay_order_id}|${razorpay_payment_id}`;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    await updateOrderByRazorpayOrderIdRepo(razorpay_order_id, {
      status: "failed",
      failureReason: "Invalid payment signature",
    });

    throw new ApiError("Payment verification failed", 400);
  }

  // mark paid
  const updatedOrder = await updateOrderByRazorpayOrderIdRepo(
    razorpay_order_id,
    {
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      status: "paid",
      paidAt: new Date(),
    },
  );

  // create enrollment (safe duplicate check)
  const enrolled = await getEnrollmentRepo(userId, order.course);

  if (!enrolled) {
    await createEnrollmentRepo({
      user: userId,
      course: order.course,
      order: updatedOrder._id,
    });
  }

  return updatedOrder;
};

// import { razorpay } from "../configs/payment.config.js";
// import {
//   createPayment,
//   getAllPayments,
//   updatePayment,
// } from "../repositories/payment.repository.js";
// import crypto from "crypto";
// import logger from "../utils/logger.util.js";
// import ApiError from "../utils/error.util.js";

// const createOrderService = async (userId) => {
//   try {
//     logger.info("createOrderService called", { userId });

//     const options = {
//       amount: 49999,
//       currency: "INR", // ✅ fixed typo
//       receipt: `receipt_${Date.now()}`,
//     };

//     logger.info("Creating Razorpay order", { options });

//     const order = await razorpay.orders.create(options);

//     logger.info("Razorpay order created", {
//       orderId: order.id,
//       amount: order.amount,
//     });

//     await createPayment({
//       user: userId,
//       orderId: order.id,
//       amount: order.amount,
//       status: "created",
//     });

//     logger.info("Payment record created in DB", {
//       userId,
//       orderId: order.id,
//     });

//     return order;
//   } catch (error) {
//     logger.error("Error in createOrderService", {
//       message: error.message,
//       stack: error.stack,
//       userId,
//     });

//     throw error;
//   }
// };

// const verifyPaymentService = async (data) => {
//   try {
//     logger.info("verifyPaymentService called", {
//       razorpay_order_id: data.razorpay_order_id,
//     });

//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;

//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//       logger.warn("Missing payment verification fields", data);
//       throw new ApiError("Invalid payment data", 400);
//     }

//     const body = razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_SECRET)
//       .update(body)
//       .digest("hex");
//       console.log(expectedSignature, 'expectedsignature');

//     logger.info("Generated signature for verification", {
//       razorpay_order_id,
//     });

//     if (expectedSignature !== razorpay_signature) {
//       logger.warn("Invalid payment signature", {
//         razorpay_order_id,
//         razorpay_payment_id,
//       });
//       throw new ApiError("Invalid signature", 400);
//     }

//     logger.info("Payment signature verified", {
//       razorpay_order_id,
//     });

//     const payment = await updatePayment(razorpay_order_id, {
//       paymentId: razorpay_payment_id,
//       signature: razorpay_signature,
//       status: "success",
//     });

//     logger.info("Payment updated successfully", {
//       orderId: razorpay_order_id,
//       paymentId: razorpay_payment_id,
//     });

//     return payment;
//   } catch (error) {
//     logger.error("Error in verifyPaymentService", {
//       message: error.message,
//       stack: error.stack,
//       razorpay_order_id: data?.razorpay_order_id,
//     });

//     throw error;
//   }
// };

// const getPaymentsService = async () => {
//   try {
//     logger.info("getPaymentsService called");

//     const payments = await getAllPayments();

//     logger.info("Payments fetched successfully", {
//       count: payments.length,
//     });

//     return payments;
//   } catch (error) {
//     logger.error("Error in getPaymentsService", {
//       message: error.message,
//       stack: error.stack,
//     });

//     throw error;
//   }
// };
