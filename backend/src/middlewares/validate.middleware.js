// src/middlewares/validate.middleware.js

import ErrorHandler from "../utils/errorHandler.util.js";
import asyncHandler from "./asyncHandler.middleware.js";

/**
 * Joi / Zod Validation Middleware
 */
const validate = (schema) =>
  asyncHandler(async (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const message = error.details.map((item) => item.message).join(", ");

      throw new ErrorHandler(message, 400);
    }

    req.body = value;

    next();
  });

export default validate;
