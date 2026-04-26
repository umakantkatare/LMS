import  ApiError  from "../utils/error.util.js";

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError("Unauthorized access", 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(
          `Role (${req.user.role}) is not allowed to access this route`,
          403,
        ),
      );
    }

    next();
  };
};
