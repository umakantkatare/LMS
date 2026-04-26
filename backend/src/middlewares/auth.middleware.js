import jwt from "jsonwebtoken";
import  ApiError  from "../utils/error.util.js";
import userModel from "../models/nosql/user.model.js";
import asyncHandler from "./asyncHandler.middleware.js";

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  let token = null;

  // 1. Bearer Token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // 2. Cookie Token
  if (!token && req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    return next(new ApiError("Please login to access this resource", 401));
  }

  // Verify Token
  const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

  const user = await userModel.findById(decoded.id).select("-password");

  if (!user) {
    return next(new ApiError("User not found", 404));
  }

  if (user.isBlocked) {
    return next(new ApiError("Your account is blocked", 403));
  }

  req.user = user;

  next();
});

// import ApiError from "../utils/error.util.js";
// import JWT from "jsonwebtoken";

// const isLoggedIn = async (req, res, next) => {
//   const { token } = req.cookies;
//   if (!token) {
//     return next(new ApiError("unauthorized, please login again"));
//   }
//   const userDetails = await JWT.verify(token, process.env.JWT_SECRET);

//   req.user = userDetails;
//   next();
// };

// const authorizedRoles =
//   (...roles) =>
//   async (req, res, next) => {
//     const currentUserRole = req.user.role;
//     if (!roles.includes(currentUserRole)) {
//       return next(new ApiError("you do not have permission to access "));
//     }
//     next()
//   };
// export { isLoggedIn, authorizedRoles };
