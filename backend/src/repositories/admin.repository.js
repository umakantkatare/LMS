import courseModel from '../models/nosql/course.model.js';
import paymentModel from '../models/nosql/payment.model.js';
import userModel from './../models/nosql/user.model.js';

/**
 * Dashboard Stats
 */
export const getDashboardStatsRepo = async () => {
  const [
    totalUsers,
    totalStudents,
    totalInstructors,
    totalAdmins,
    totalCourses,
    totalOrders,
    paidOrders,
    revenueResult,
    recentOrders,
  ] = await Promise.all([
    userModel.countDocuments(),

    userModel.countDocuments({
      role: "student",
    }),

    userModel.countDocuments({
      role: "instructor",
    }),

    userModel.countDocuments({
      role: "admin",
    }),

    courseModel.countDocuments({
      isDeleted: false,
    }),

    paymentModel.countDocuments(),

    paymentModel.countDocuments({
      status: "paid",
    }),

    paymentModel.aggregate([
      {
        $match: {
          status: "paid",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$amount",
          },
        },
      },
    ]),

    paymentModel.find({
      status: "paid",
    })
      .populate("userModel", "name email")
      .populate("courseModel", "title slug")
      .sort({
        createdAt: -1,
      })
      .limit(5),
  ]);

  return {
    totalUsers,
    totalStudents,
    totalInstructors,
    totalAdmins,
    totalCourses,
    totalOrders,
    paidOrders,
    totalRevenue: revenueResult[0]?.totalRevenue || 0,
    recentOrders,
  };
};

/**
 * Get All Users
 */
export const getAllUsersRepo = async () => {
  return await userModel.find().select("-password").sort({
    createdAt: -1,
  });
};

/**
 * Get All Courses
 */
export const getAllCoursesAdminRepo = async () => {
  return await courseModel.find().populate("instructor", "name email").sort({
    createdAt: -1,
  });
};

/**
 * Get All Orders
 */
export const getAllOrdersRepo = async () => {
  return await paymentModel.find()
    .populate("userModel", "name email")
    .populate("courseModel", "title slug")
    .sort({
      createdAt: -1,
    });
};

/**
 * Get userModel By Id
 */
export const getUserByIdAdminRepo = async (userId) => {
  return await userModel.findById(userId).select("-password");
};

/**
 * Update userModel
 */
export const updateUserAdminRepo = async (userId, payload) => {
  return await userModel.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  }).select("-password");
};
