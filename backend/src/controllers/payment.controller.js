// controllers/payment.controller.js

import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import {
  createPaymentOrderService,
  verifyPaymentService,
} from "../services/payment.service.js";

/**
 * POST /api/v1/payment/create-order
 */
export const createPaymentOrder = asyncHandler(async (req, res) => {
  const { courseId } = req.body;

  const order = await createPaymentOrderService(req.user._id, courseId);

  res.status(201).json({
    success: true,
    message: "Payment order created successfully",
    data: order,
  });
});

/**
 * POST /api/v1/payment/verify
 */
export const verifyPayment = asyncHandler(async (req, res) => {
  const order = await verifyPaymentService(req.body, req.user._id);

  res.status(200).json({
    success: true,
    message: "Payment verified successfully",
    data: order,
  });
});

// import {
// import asyncHandler from './../middlewares/asyncHandler.middleware';
// createOrderService,
//   getPaymentsService,
//   verifyPaymentService,
// } from "../services/payment.service.js";

// const getRazorpayApiKey = (req, res, next) => {
//   try {
//     res.status(200).json({
//       success: true,
//       key: process.env.RAZORPAY_KEY_ID,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const buySubscription = async (req, res, next) => {
//   try {
//     const order = await createOrderService(req.user.id);
//     res.status(200).json({
//       success: true,
//       order,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const verifySubscription = async (req, res, next) => {
//   try {
//     const payment = await verifyPaymentService(req.body);
//     res.status(200).json({
//       success: true,
//       message: "payment verified",
//       payment,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
// const allPayments = async (req, res, next) => {
//   try {
//     const payments = await getPaymentsService();
//     res.status(200).json({
//       success: true,
//       payments: payments
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export { getRazorpayApiKey, buySubscription, verifySubscription, allPayments };
