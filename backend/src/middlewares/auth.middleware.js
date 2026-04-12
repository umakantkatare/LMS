import ApiError from "../utils/error.util.js";
import JWT from "jsonwebtoken";

const isLoggedIn = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ApiError("unauthorized, please login again"));
  }
  const userDetails = await JWT.verify(token, process.env.JWT_SECRET);

  req.user = userDetails;
  next();
};

const authorizedRoles =
  (...roles) =>
  async (req, res, next) => {
    const currentUserRole = req.user.role;
    if (!roles.includes(currentUserRole)) {
      return next(new ApiError("you do not have permission to access "));
    }
    next()
  };
export { isLoggedIn, authorizedRoles };
