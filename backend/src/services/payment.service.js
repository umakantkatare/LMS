import { razorpay } from "../configs/payment.config.js";
import {
  createPayment,
  getAllPayments,
  updatePayment,
} from "../repositories/payment.repository.js";
import crypto from "crypto";
import logger from "../utils/logger.util.js";
import ApiError from "../utils/error.util.js";

const createOrderService = async (userId) => {
  try {
    logger.info("createOrderService called", { userId });

    const options = {
      amount: 49999,
      currency: "INR", // ✅ fixed typo
      receipt: `receipt_${Date.now()}`,
    };

    logger.info("Creating Razorpay order", { options });

    const order = await razorpay.orders.create(options);

    logger.info("Razorpay order created", {
      orderId: order.id,
      amount: order.amount,
    });

    await createPayment({
      user: userId,
      orderId: order.id,
      amount: order.amount,
      status: "created",
    });

    logger.info("Payment record created in DB", {
      userId,
      orderId: order.id,
    });

    return order;
  } catch (error) {
    logger.error("Error in createOrderService", {
      message: error.message,
      stack: error.stack,
      userId,
    });

    throw error;
  }
};

const verifyPaymentService = async (data) => {
  try {
    logger.info("verifyPaymentService called", {
      razorpay_order_id: data.razorpay_order_id,
    });

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      logger.warn("Missing payment verification fields", data);
      throw new ApiError("Invalid payment data", 400);
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");
      console.log(expectedSignature, 'expectedsignature');

    logger.info("Generated signature for verification", {
      razorpay_order_id,
    });

    if (expectedSignature !== razorpay_signature) {
      logger.warn("Invalid payment signature", {
        razorpay_order_id,
        razorpay_payment_id,
      });
      throw new ApiError("Invalid signature", 400);
    }

    logger.info("Payment signature verified", {
      razorpay_order_id,
    });

    const payment = await updatePayment(razorpay_order_id, {
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
      status: "success",
    });

    logger.info("Payment updated successfully", {
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });

    return payment;
  } catch (error) {
    logger.error("Error in verifyPaymentService", {
      message: error.message,
      stack: error.stack,
      razorpay_order_id: data?.razorpay_order_id,
    });

    throw error;
  }
};

const getPaymentsService = async () => {
  try {
    logger.info("getPaymentsService called");

    const payments = await getAllPayments();

    logger.info("Payments fetched successfully", {
      count: payments.length,
    });

    return payments;
  } catch (error) {
    logger.error("Error in getPaymentsService", {
      message: error.message,
      stack: error.stack,
    });

    throw error;
  }
};

// const createOrderService = async (userId) => {
//   try {
//     const options = {
//       amount: 4999,
//       curreency: "INR",
//       receipt: `receipt_${Date.now()}`,
//     };

//     const order = await razorpay.orders.create(options);
//     await createPayment({
//       user: userId,
//       order: order.id,
//       amount: order.amount,
//       status: "created",
//     });
//     return order;
//   } catch (error) {
//     logger.error("payment failed", {
//       message: error.message,
//       courseId,
//     });
//   }
// };

// const verifyPaymentService = async (data) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;
//     const body = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_SECRET)
//       .update(body)
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       throw new Error("Invalid signature");
//     }

//     const payment = await updatePayment(razorpay_order_id, {
//       paymentId: razorpay_payment_id,
//       signature: razorpay_signature,
//       status: "success",
//     });

//     return payment;
//   } catch (error) {
//     logger.error("payment verify failed", {
//       message: error.message,
//       courseId,
//     });
//   }
// };

// const getPaymentsService = async () => {
//   return await getAllPayments();
// };

export { createOrderService, verifyPaymentService, getPaymentsService };
