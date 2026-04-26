import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import {
  getDashboardService,
  getAllUsersService,
  getAllCoursesService,
  getAllOrdersService,
  updateUserRoleService,
  updateUserStatusService,
  deleteCourseAdminService,
  getAnalyticsService,
} from "../services/admin.service.js";

/**
 * GET /api/v1/admin/dashboard
 */
export const getDashboard = asyncHandler(async (req, res) => {
  const data = await getDashboardService();

  res.status(200).json({
    success: true,
    data,
  });
});

/**
 * GET /api/v1/admin/users
 */
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await getAllUsersService();

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

/**
 * GET /api/v1/admin/courses
 */
export const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await getAllCoursesService();

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});

/**
 * GET /api/v1/admin/orders
 */
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await getAllOrdersService();

  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders,
  });
});

/**
 * PATCH /api/v1/admin/user/:id/role
 */
export const updateUserRole = asyncHandler(async (req, res) => {
  const user = await updateUserRoleService(req.params.id, req.body.role);

  res.status(200).json({
    success: true,
    message: "User role updated successfully",
    data: user,
  });
});

/**
 * PATCH /api/v1/admin/user/:id/status
 */
export const updateUserStatus = asyncHandler(async (req, res) => {
  const user = await updateUserStatusService(req.params.id, req.body.isBlocked);

  res.status(200).json({
    success: true,
    message: "User status updated successfully",
    data: user,
  });
});

/**
 * DELETE /api/v1/admin/course/:id
 */
export const deleteCourse = asyncHandler(async (req, res) => {
  await deleteCourseAdminService(req.params.id);

  res.status(200).json({
    success: true,
    message: "Course deleted successfully",
  });
});

/**
 * GET /api/v1/admin/analytics
 */
export const getAnalytics = asyncHandler(async (req, res) => {
  const data = await getAnalyticsService();

  res.status(200).json({
    success: true,
    data,
  });
});
