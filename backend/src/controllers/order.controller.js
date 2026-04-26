import ApiError from "../utils/error.util.js";
import asyncHandler from "./../middlewares/asyncHandler.middleware.js";
import {
  getOrderByIdRepo,
  getUserOrdersRepo,
} from "./../repositories/payment.repository.js";

/**
 * GET /api/v1/order/my-orders
 */
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await getUserOrdersRepo(req.user._id);

  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders,
  });
});

/**
 * GET /api/v1/order/:id
 */
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await getOrderByIdRepo(req.params.id);

  if (!order) {
    throw new ApiError("Order not found", 404);
  }

  if (
    String(order.user._id) !== String(req.user._id) &&
    req.user.role !== "admin"
  ) {
    throw new ApiError("Unauthorized access", 403);
  }

  res.status(200).json({
    success: true,
    data: order,
  });
});
